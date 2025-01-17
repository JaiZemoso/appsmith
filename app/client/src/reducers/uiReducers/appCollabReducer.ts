import type { ReduxAction } from "@appsmith/constants/ReduxActionConstants";
import { ReduxActionTypes } from "@appsmith/constants/ReduxActionConstants";
import { createReducer } from "utils/ReducerUtils";
import type { User } from "entities/AppCollab/CollabInterfaces";
import { klona } from "klona";  

const initialState: AppCollabReducerState = {
  editors: [],
  pointerData: {},
  pageEditors: [],
};

const appCollabReducer = createReducer(initialState, {
  [ReduxActionTypes.APP_COLLAB_LIST_EDITORS]: (
    state: AppCollabReducerState,
    action: ReduxAction<any>,
  ) => {
    return { ...state, editors: action.payload.users };
  },
  [ReduxActionTypes.APP_COLLAB_RESET_EDITORS]: (
    state: AppCollabReducerState,
  ) => {
    return { ...state, editors: [] };
  },
  [ReduxActionTypes.APP_COLLAB_SET_EDITORS_POINTER_DATA]: (
    state: AppCollabReducerState,
    action: ReduxAction<any>,
  ) => {
    return {
      ...state,
      pointerData: {
        ...state.pointerData,
        [action.payload.socketId]: action.payload,
      },
    };
  },
  [ReduxActionTypes.APP_COLLAB_UNSET_EDITORS_POINTER_DATA]: (
    state: AppCollabReducerState,
    action: ReduxAction<any>,
  ) => {
    const clonedPointerData = klona(state.pointerData);
    delete clonedPointerData[action.payload];
    return {
      ...state,
      clonedPointerData,
    };
  },
  [ReduxActionTypes.APP_COLLAB_RESET_EDITORS_POINTER_DATA]: (
    state: AppCollabReducerState,
  ) => {
    return {
      ...state,
      pointerData: {},
    };
  },
  [ReduxActionTypes.APP_COLLAB_SET_CONCURRENT_PAGE_EDITORS]: (
    state: AppCollabReducerState,
    action: ReduxAction<any>,
  ) => ({
    ...state,
    pageEditors: action.payload,
  }),
});

interface PointerDataType {
  [s: string]: any;
}

export interface AppCollabReducerState {
  editors: User[];
  pointerData: PointerDataType;
  pageEditors: User[];
}

export default appCollabReducer;
