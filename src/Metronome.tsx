import * as React from 'react';

import Tool from './Tool';


export default class Metronome extends Tool<{}, {}> {
  static title = 'Metronome';
  static stub = true;

  render() {
    return (
      <div>
        Metronome
      </div>
    );
  }
}
