/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */
import { addLocaleData } from 'react-intl';
// tslint:disable-next-line:no-submodule-imports
import * as enLocaleData from 'react-intl/locale-data/en';

import enTranslationMessages from './translations/en';

export const appLocales = ['en'];

addLocaleData(enLocaleData);

const DEFAULT_LOCALE = 'en';

// tslint:disable-next-line:no-any
export const formatTranslationMessages = (locale: any, messages: any) => {
    const defaultFormattedMessages =
        locale !== DEFAULT_LOCALE
            ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
            : {};
    return Object.keys(messages).reduce((formattedMessages, key) => {
        let message = messages[key];
        if (!message && locale !== DEFAULT_LOCALE) {
            message = defaultFormattedMessages[key];
        }
        // tslint:disable-next-line:prefer-object-spread
        return Object.assign(formattedMessages, { [key]: message });
        // tslint:disable-next-line:align
    }, {});
};

export const translationMessages = {
    en: formatTranslationMessages('en', enTranslationMessages),
};
