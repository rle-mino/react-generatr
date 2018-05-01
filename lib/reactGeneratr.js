'use babel';

import { TextEditor, File } from 'atom';
import path from 'path';
import get from 'lodash/get';

import templates from './templates';
import {
  ESCAPE,
  ENTER,
  FULLCOMP,
  LESSCOMP,
  FULLCONT,
  LESSCONT,
  CONFIG_BINDER,
  CASE_BINDER,
} from './constants';

class ReactGeneratr {

  // Generates the path to the new component / container.
  // If shouldCreateOnAFolder equals true, we write the file
  // inside a folder
  static generatePath(projectPath, folderPath, name) {
    const shouldCreateOnAFolder = atom.config.get('react-generatr.createOnAFolder');

    if (shouldCreateOnAFolder) {
      return path.resolve(projectPath, folderPath, name, 'index.js');
    }
    return path.resolve(projectPath, folderPath, `${name}.js`);
  }

  // Takes all the opened projects and returns the one
  // that matches the actually opened file
  static getProjectPath(projects, actualFilePath) {
    return projects.find(project => actualFilePath.includes(project)) || '';
  }

  static firstToUpperCase(name) {
    return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
  }

  constructor() {
    this.setupTextEditor();
    this.setupMessageSpan();
    this.setupContainer();
    this.addCommands();

    this.panel = atom.workspace.addModalPanel({
      item: this,
      visible: false,
    });
  }

  // Creates a mini textEditor and
  // subscribe to his events
  setupTextEditor() {
    this.editor = new TextEditor({ mini: true });
    this.editor.element.addEventListener('blur', this.close);
    this.editor.element.addEventListener('keydown', this.handleInsert);
  }

  // Creates the message div that is just
  // under the textEditor
  setupMessageSpan() {
    this.message = document.createElement('span');
    this.message.className = 'message';
  }

  // Creates the container that wraps the message
  // and the textEditor. It should be named "element"
  setupContainer() {
    this.element = document.createElement('div');
    this.element.appendChild(this.editor.element);
    this.element.appendChild(this.message);
  }

  // Registers atom commands
  addCommands() {
    atom.commands.add('atom-text-editor', 'react-generatr:new statefull component', () => {
      this.display(FULLCOMP, 'Create new statefull component');
    });

    atom.commands.add('atom-text-editor', 'react-generatr:new stateless component', () => {
      this.display(LESSCOMP, 'Create new stateless component');
    });

    atom.commands.add('atom-text-editor', 'react-generatr:new statefull container', () => {
      this.display(FULLCONT, 'Create new statefull container');
    });

    atom.commands.add('atom-text-editor', 'react-generatr:new stateless container', () => {
      this.display(LESSCONT, 'Create new stateless container');
    });
  }

  // displays the textEditor
  display(type, message) {
    this.saveActive();
    this.selected = type;
    if (this.panel.isVisible() || !atom.workspace.getActiveTextEditor()) {
      return false;
    }
    this.panel.show();
    this.editor.element.focus();
    this.message.innerText = message;
    return true;
  }

  // Handle key down. It closes the textEditor
  // on ESCAPE and generates a component / container on ENTER
  handleInsert = (e) => {
    if (e.keyCode === ESCAPE) {
      this.close();
    } else if (e.keyCode === ENTER) {
      this.create(this.editor.getText())
        .then(() => {
          this.close();
        })
        .catch((err) => {
          this.message.innerText = err;
        });
    }
  };

  // closes the textEditor
  close = () => {
    if (!this.panel.isVisible()) return false;
    this.editor.setText('');
    this.panel.hide();
    this.restoreActive();
    return true;
  };

  // Stores the activeElement before opening the
  // textEditor in order to restore the focus after
  // closing the textEditor
  saveActive() {
    this.activeElement = document.activeElement;
  }

  // restores the focus after closing the textEditor
  restoreActive() {
    if (this.activeElement) {
      this.activeElement.focus();
    } else {
      atom.views.getView(atom.workspace).focus();
    }
    this.activeElement = null;
  }

  // returns the path to component / setupContainer
  // based on this.selected
  getPathToComponentOrContainer() {
    return atom.config.get(`react-generatr.${get(
      CONFIG_BINDER,
      this.selected,
      '',
    )}`);
  }

  create(name) {
    return new Promise((resolve, reject) => {
      const projects = atom.project.getPaths();
      const editor = atom.workspace.getActiveTextEditor();

      if (!get(editor, 'buffer.file.path', false)) {
        return reject('You must open a file inside your project');
      }

      const actualFilePath = get(editor, 'buffer.file.path', '');
      const projectPath = ReactGeneratr.getProjectPath(projects, actualFilePath);
      const pathToCo = this.getPathToComponentOrContainer();

      const format = atom.config.get('react-generatr.format');
      const formattedName = CASE_BINDER[format](name);

      const newPath = ReactGeneratr.generatePath(projectPath, pathToCo, formattedName);
      const newFile = new File(newPath);
      return newFile.create()
        .then((created) => {
          if (created === false) {
            this.message.innerText = 'file already exists';
          }
          const semi = atom.config.get('react-generatr.useSemi');
          const content = templates[this.selected](formattedName, semi);
          return newFile.write(content);
        })
        .then(() => atom.workspace.open(newPath))
        .then(resolve);
    });
  }
}

export default ReactGeneratr;
