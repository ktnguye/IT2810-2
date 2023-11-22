import { Action } from '../../types/interfaces';

interface SidebarState {
  tag: string;
  showFavorites: boolean;
}

const initialState: SidebarState = {
  tag: '',
  showFavorites: false,
};

const sidebarReducer = (state: SidebarState = initialState, action: Action) => {
  switch (action.type) {
    case 'SET_TAG':
      return {
        ...state,
        tag: action.payload,
      };
    case 'TOGGLE_SHOW_FAVORITES':
      return {
        ...state,
        showFavorites: !state.showFavorites,
      };
    default:
      return state;
  }
};

export default sidebarReducer;
