import React from 'react';
import './Heading.scss';

function Heading({ noMargin, children }) {
  return <h2 className={`heading${noMargin ? ' heading_no-margin' : ''}`}>{children}</h2>;
}

export default Heading;
