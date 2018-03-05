import { types } from 'mobx-state-tree';
import { RouterStore } from './RouterStore';

export const RootModel = types.model({
  router: RouterStore,
  locale: types.optional(types.string, 'en'),
});

export type RootStore = typeof RootModel.Type;
