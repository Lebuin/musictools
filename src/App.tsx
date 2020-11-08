import * as React from 'react';
import * as Icon from 'react-feather';


import Tool from './Tool';
import Metronome from './Metronome';
import Tuner from './Tuner';
import Spectogram from './Spectogram';
import Piano from './Piano';
import AudioSplitter from './AudioSplitter';

interface ToolMap {
  [key: string]: typeof Tool,
};

interface AppState {
  activeTool: typeof Tool,
}



export default class App extends React.Component<{}, AppState> {
  readonly tools: ToolMap;

  constructor(props: {}) {
    super(props);

    this.tools = {
      metronome: Metronome,
      tuner: Tuner,
      spectogram: Spectogram,
      piano: Piano,
      audioSplitter: AudioSplitter,
    };

    this.state = {
      activeTool: null,
    }
  }


  public render() {
    if(this.state.activeTool) {
      return this.renderActiveTool();
    } else {
      return this.renderToolList();
    }
  }


  private renderActiveTool() {
    let ToolCls: typeof Tool = this.state.activeTool;
    return (
      <React.Fragment>
        <ToolCls />
        <div
          className="btn btn--round absolute top-0 right-0 m-2"
          onClick={this.selectTool.bind(this, null)}
        >
          <Icon.X />
        </div>
      </React.Fragment>
    );
  }


  private renderToolList() {
    return (
      <div className="mx-2 my-2 sm:mx-4 sm:my-4">
        <div className="flex-1 flex-col -my-1">
          {Object.values(this.tools).map((ToolCls, key) => {
            return (
              <div
                key={key}
                className={`
                  btn
                  btn--primary
                  my-1
                  ${ToolCls.stub ? 'disabled' : ''}
                `}
                onClick={ToolCls.stub ? null : this.selectTool.bind(this, ToolCls)}
              >
                {ToolCls.title}
                {ToolCls.stub &&
                  <span className="text-sm ml-1">(Not implemented)</span>
                }
              </div>
            );
          })}
        </div>
      </div>
    );
  }


  private selectTool(ToolCls: typeof Tool) {
    this.setState({
      activeTool: ToolCls,
    });
  }
}
