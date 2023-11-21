import { Action } from '../../types/interfaces';

const initialState = {
  tag: '',
};

const sidebarReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'SET_TAG':
      return {
        ...state,
        tag: action.payload,
      };
    default:
      return state;
  }
};

export default sidebarReducer;
