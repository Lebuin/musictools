import * as React from 'react';

import Tool from './Tool';


export default class Piano extends Tool<{}, {}> {
  static title = 'Piano';
  static stub = true;

  render() {
    return (
      <div>
        Spectogram
      </div>
    );
  }
}
