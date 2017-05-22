'use babel';

import { TextEditor, File } from 'atom';
import pascalCase from 'pascal-case';
import camelCase from 'camel-case';

import templates from './templates';
import { ESCAPE, ENTER, FULLCOMP, LESSCOMP, FULLCONT, LESSCONT } from './constants';

class ReactGeneratr {
  constructor() {
    this.editor = new TextEditor({ mini: true });
    this.editor.element.addEventListener('blur', this.close);
    this.editor.element.addEventListener('keydown', this.handleInsert);

    this.message = document.createElement('span');
    this.message.className = 'message';

    this.element = document.createElement('div');
    this.element.appendChild(this.editor.element);
    this.element.appendChild(this.message);

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

    this.panel = atom.workspace.addModalPanel({
      item: this,
      visible: false,
    });
  }

  display = (type, message) => {
    this.saveActive();
    this.selected = type;
    if (this.panel.isVisible() || !atom.workspace.getActiveTextEditor()) {
      return false;
    }
    this.panel.show();
    this.editor.element.focus();
    this.message.innerText = message;
    return true;
  };

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

  close = () => {
    if (!this.panel.isVisible()) return false;
    this.editor.setText('');
    this.panel.hide();
    this.restoreActive();
    return true;
  };

  getConfigForSelected = () => {
    switch (this.selected) {
      case FULLCOMP:
      case LESSCOMP:
        return 'pathToComponents';
      case FULLCONT:
      case LESSCONT:
        return 'pathToContainers';
      default:
        return '';
    }
  };

  firstToUpperCase = name => name.charAt(0).toUpperCase() + name.slice(1);

  saveActive = () => {
    this.activeElement = document.activeElement;
  };

  restoreActive = () => {
    if (this.activeElement) {
      this.activeElement.focus();
    } else {
      atom.views.getView(atom.workspace).focus();
    }
    this.activeElement = null;
  };

  create = name =>
    new Promise((resolve, reject) => {
      const projects = atom.project.getPaths();
      const editor = atom.workspace.getActiveTextEditor();

      if (!editor || !editor.buffer || !editor.buffer.file || !editor.buffer.file.path) {
        return reject('You must open a file inside your project');
      }
      const actualFilePath = editor && editor.buffer && editor.buffer.file
        ? editor.buffer.file.path
        : '';
      const projectPath = projects.find(project => actualFilePath.includes(project)) || '';
      const separator = atom.config.get(`react-generatr.${this.getConfigForSelected()}`);
      const slash = separator[separator.length - 1] === '/' ? '' : '/';

      const format = atom.config.get('react-generatr.format');
      const formattedName = format === 'pascal-case' ? pascalCase(name) : camelCase(name);

      const newPath = `${projectPath}/${separator}${slash}${formattedName}/index.js`;
      const newFile = new File(newPath);
      return newFile
        .create()
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

export default ReactGeneratr;
