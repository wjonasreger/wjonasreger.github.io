import React from 'react';
import katex from 'katex';

const LaTex = ({ children, displayMode=false }) => {
    const html = katex.renderToString(children, {
      displayMode: displayMode,
      throwOnError: false
    });
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

export default LaTex;