import { Action } from '../../types/interfaces';

const initialState = {
  tag: '',
};

// Reducer for the tag in the sidebar
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
