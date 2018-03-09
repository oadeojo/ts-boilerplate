import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { translate, InjectedTranslateProps } from 'react-i18next';

export interface HomeProps  // tslint:disable-next-line:no-any
  extends RouteComponentProps<any>,
    InjectedTranslateProps {}

class Home extends React.Component<HomeProps, {}> {
  render() {
    return (
      <div>
        <div>{this.props.t('home')}</div>
        <button onClick={() => this.props.history.push('login')}>Login</button>
      </div>
    );
  }
}

export default translate('common')(Home);
