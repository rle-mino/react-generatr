'use babel';

export default (name = 'MyComp', semi = true) => {
  const S = semi ? ';' : '';

  return (`\
import React, { Component } from 'react'${S}
import PropTypes from 'prop-types'${S}
import { connect } from 'react-redux'${S}
import { bindActionCreators } from 'redux'${S}


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


const mapStateToProps = () => ({

})${S}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(, dispatch),
})${S}

export default ${name}${S}
`);
};
