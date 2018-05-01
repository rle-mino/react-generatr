'use babel';

export default (name = 'MyComp', semi = true) => `\
import React, { Component } from 'react'__S__
import PropTypes from 'prop-types'__S__
import { connect } from 'react-redux'__S__
import { bindActionCreators } from 'redux'__S__


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


const mapStateToProps = () => ({

})__S__

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(, dispatch),
})__S__

export default ${name}__S__
`.replace('__S__', semi ? ';' : '');
