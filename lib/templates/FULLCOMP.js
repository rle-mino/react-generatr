'use babel';

export default (name = 'MyComp', semi = true) => {
  const S = semi ? ';' : '';

  return (`\
import React, { Component } from 'react'${S}
import PropTypes from 'prop-types'${S}

class ${name} extends Component {
  state = {

  }

  static propTypes = {

  }

  render() {
    return (

    )${S}
  }
}

export default ${name}${S}
`);
};
