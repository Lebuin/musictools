import * as React from 'react';

import Tool from './Tool';


export default class Tuner extends Tool<{}, {}> {
  static title = 'Tuner';
  static stub = true;

  render() {
    return (
      <div>
        Tuner
      </div>
    );
  }
}
