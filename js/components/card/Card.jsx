'use strict';

import React from 'react';
import classnames from 'classnames';

export default class Card extends React.Component {
  render() {
    const classes = classnames('card', this.props.size || '');
    return <div className={classes}>{this.props.children}</div>;
  }
}

Card.propTypes = {
  card: React.PropTypes.string
};