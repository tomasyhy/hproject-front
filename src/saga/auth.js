import * as api from '../connectivity/api'
import {call, put} from 'redux-saga/effects'
import {takeEvery} from 'redux-saga'
import actionTypes from '../constants/actionTypes'
import {push} from 'react-router-redux'
import jwtDecode from 'jwt-decode'

export function *doLogin(action) {

  try {
    const {username, password} = action.payload
    const responseBody = yield call(api.login, username, password)

    yield put({
      type: actionTypes.auth.LOGIN_SUCCESS,
      payload: {
        idToken: responseBody.token
      }
    });
  } catch (e) {
    yield put({
      type: actionTypes.auth.LOGIN_FAILED,
      payload: {
        message: e.message,
        statusCode: e.statusCode
      }
    });
  }
}

export function *doLoginFailed(action) {
  // e.g. trigger a Toast notification
}

export function *watchLogin() {
  yield takeEvery(actionTypes.auth.LOGIN_REQUEST, doLogin);
}

export function *doLoginSucceeded(action) {
  const {idToken} = action.payload;

  const {id, username} = yield call(jwtDecode, idToken);

  yield put({
    type: actionTypes.auth.LOGIN_COMPLETED,
    payload: {
      id,
      username
    }
  });
  yield put(
    push('/')
  );
}

export function *watchLoginSucceeded() {
  yield takeEvery(actionTypes.auth.LOGIN_SUCCESS, doLoginSucceeded);
}

export function *watchLoginFailed() {
  yield takeEvery(actionTypes.auth.LOGIN_FAILED, doLoginFailed);
}

export function *doLogoutRequested() {
  yield put({
    type: actionTypes.auth.LOGOUT_COMPLETED
  });

  yield put(
    push('/test')
  );

}

export function *watchLogoutRequested() {
  yield takeEvery(actionTypes.auth.LOGOUT_REQUEST, doLogoutRequested);
}