import * as React from 'react';
import { Button } from 'antd';
export interface HomeProps {}

export default class Home extends React.Component<HomeProps, {}> {
  render() {
    return (
      <div>
        <div>Home</div>
        <Button type="primary">Button</Button>
      </div>
    );
  }
}
