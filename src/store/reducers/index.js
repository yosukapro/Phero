import { ActionTypes as ActionUser } from 'store/actions/user';
import { ActionTypes as ActionNav } from 'store/actions/nav';

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionUser.SET_USER:
      return action.user;
    case ActionUser.DEL_USER:
      return {};
    default:
      return state;
  }
};

export const navReducer = (state = false, action) => {
  switch (action.type) {
    case ActionNav.OPEN_NAV:
      return true;
    case ActionNav.CLOSE_NAV:
      return false;
    default:
      return state;
  }
};
