'use strict';

import React from 'react';

export default class Icon extends React.Component {
  render() {
    return <i className="material-icons">{this.props.children}</i>;
  }
}