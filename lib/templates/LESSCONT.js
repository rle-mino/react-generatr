'use babel';

export default (name = 'MyComp', semi = true) => {
  const S = semi ? ';' : '';

  return (`\
import React from 'react'${S}
import PropTypes from 'prop-types'${S}
import { connect } from 'react-redux'${S}
import { bindActionCreators } from 'redux'${S}

const ${name} = () => (

)${S}

${name}.propTypes = {

}${S}

const mapStateToProps = () => ({

})${S}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(, dispatch),
})${S}

export default ${name}${S}
`);
};
