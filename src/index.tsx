import * as React from 'react';

export default class Hoge extends React.Component {
  private name: string;

  constructor(props: any) {
    super(props);
    this.name = 'foo';
  }

  static say = () => {
    const a = [1 ,2];
    const b = [...a, 3];
    console.log('hoge');
  }

  render() {
    return <div></div>;
  }
}