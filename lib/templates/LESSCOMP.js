'use babel';

export default (name = 'MyComp', semi = true) => `\
import React from 'react'__S__
import PropTypes from 'prop-types'__S__

const ${name} = () => (

)__S__

${name}.propTypes = {

}__S__

export default ${name}__S__
`.replace('__S__', semi ? ';' : '');
