/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/locales`)
 */

import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { I18nextProvider } from 'react-i18next';
import * as i18n from 'i18next';
import * as LngDetector from 'i18next-browser-languagedetector';
import * as locales from 'locales';

// tslint:disable-next-line:no-any
const mapping = (stores: any) => ({
  locale: stores.rootStore.locale,
});

export interface LanguageProviderProps {
  locale: string;
  children: JSX.Element[] | JSX.Element;
}

export class LanguageProvider extends React.Component<
  LanguageProviderProps,
  {}
> {
  public render() {
    i18n.use(LngDetector).init({
      whitelist: ['en', 'en-US', 'fr'],
      fallbackLng: this.props.locale,
      ns: ['common', 'errors'],
      defaultNS: 'common',
      debug: false,
      resources: {
        en: locales.en,
        'en-US': locales.en,
        fr: locales.fr,
      },
      detection: {
        order: ['navigator'],
      },
    });
    return (
      <I18nextProvider i18n={i18n}>
        {React.Children.only(this.props.children)}
      </I18nextProvider>
    );
  }
}

export default inject(mapping)(observer(LanguageProvider));
