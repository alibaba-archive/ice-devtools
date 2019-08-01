import React, { Component } from 'react';

export default class <%= className %> extends Component {
  static displayName = '<%= className %>';

  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <div className="<%= name %>">Hello <%= className %></div>
    );
  }
}
