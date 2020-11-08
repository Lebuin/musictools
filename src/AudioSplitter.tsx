import * as React from 'react';

import Tool from './Tool';


export default class AudioSplitter extends Tool<{}, {}> {
  static title = 'Audio Splitter';
  static stub = true;

  render() {
    return (
      <div>
        Audio Splitter
      </div>
    );
  }
}
