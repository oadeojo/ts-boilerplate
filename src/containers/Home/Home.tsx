import * as React from 'react';
import { Button } from 'antd';
import { RouteComponentProps } from 'react-router';

// tslint:disable-next-line:no-any
export interface HomeProps extends RouteComponentProps<any> {}

export default class Home extends React.Component<HomeProps, {}> {
  render() {
    return (
      <div>
        <div>Home</div>
        <Button type="primary" onClick={() => this.props.history.push('login')}>
          Button
        </Button>
      </div>
    );
  }
}
