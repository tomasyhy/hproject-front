import actionTypes from '../constants/actionTypes';

const defaults = {
  isAuthenticated: false,
  id: undefined,
  username: undefined
}

export default function auth(state = defaults, action) {

  switch (action.type) {

    case actionTypes.auth.LOGIN_COMPLETED: {
      const { id, username } = action.payload;
      return Object.assign({}, state, {
        isAuthenticated: true,
        id,
        username
      })
    }

    case actionTypes.auth.LOGOUT_COMPLETED: {
      return Object.assign({}, state, {
        isAuthenticated: false,
        id: undefined,
        username: undefined
      })
    }

    default: {
      // console.log('authReducer hit default', action.type);
      return state;
    }
  }
}