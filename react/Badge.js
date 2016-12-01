'use strict';

import React from 'react';
import classnames from 'classnames';

export default class Badge extends React.Component {
  render() {
    const classes = classnames(this.props.className, 'badge', {
      'new': this.props.newHighlight
    });
    return <span className={classes}>{this.props.children}</span>;
  }
}

Badge.defaultProps = {
  newHighlight: false
};

Badge.propTypes = {
  newHighlight: React.PropTypes.bool
};