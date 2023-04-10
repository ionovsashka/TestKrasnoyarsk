import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import {tokenReducer, TokenState} from "./token";

export interface State {
  token: TokenState
}

export const reducers: ActionReducerMap<State> = {
  token: tokenReducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
