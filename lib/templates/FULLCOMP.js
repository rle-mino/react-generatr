'use babel';

export default (name = 'MyComp', semi = true) => `\
import React, { Component } from 'react'__S__
import PropTypes from 'prop-types'__S__

class ${name} extends Component {
  state = {

  }

  static propTypes = {

  }

  render() {
    return (

    )__S__
  }
}

export default ${name}__S__
`.replace('__S__', semi ? ';' : '');
