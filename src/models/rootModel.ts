import { types } from 'mobx-state-tree';

export const RootModel = types.model({
    router: types.frozen,
    locale: types.optional(types.string, 'en'),
});

export type RootStore = typeof RootModel.Type;