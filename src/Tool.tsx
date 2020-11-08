import * as React from 'react';


export default abstract class Tool<P, S> extends React.Component<P, S> {
  static title: string;
  static stub: boolean;
};
