'use babel';

export default (name = 'MyComp', semi = true) => {
  const S = semi ? ';' : '';

  return (`\
import React from 'react'${S}
import PropTypes from 'prop-types'${S}

const ${name} = () => (

)${S}

${name}.propTypes = {

}${S}

export default ${name}${S}
`);
};
