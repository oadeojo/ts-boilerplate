/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { inject, observer } from 'mobx-react';
// import { RootStore } from '../../models/rootModel';

// tslint:disable-next-line:interface-name
export interface ILanguageProviderProps {
    locale: string;
    // tslint:disable-next-line:no-any
    messages: any;
    // tslint:disable-next-line:no-any
    children: any;
}

// tslint:disable-next-line:no-any
const mapping = (stores: any) => ({
    locale: stores.rootStore.locale,
});

export class LanguageProvider extends React.Component<
    ILanguageProviderProps,
    {}
    > {
    constructor(props: ILanguageProviderProps) {
        super(props);
    }

    public render() {
        return (
            <IntlProvider
                locale={this.props.locale}
                key={this.props.locale}
                messages={this.props.messages[this.props.locale]}
            >
                {React.Children.only(this.props.children)}
            </IntlProvider>
        );
    }
}

export default inject(mapping)(observer(LanguageProvider));
