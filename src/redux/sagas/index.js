import { takeLatest, all, put } from 'redux-saga/effects';
import { Types } from '../actionCreators';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import ActionCreator from '../actionCreators';

import { createRuns, getRuns } from './runs'

function* login(action) {
  let token = localStorage.getItem('token');
  const login = yield axios.post('http://localhost:3001/users/login', {
    email: action.email,
    passwd: action.passwd,
  });

  if (login.data.token) {
    token = login.data.token;
    localStorage.setItem('token', token);

    const user = jwtDecode(token);
    localStorage.setItem('user', user);
    yield put(ActionCreator.signinSuccess(user));
  } else {
    yield put(ActionCreator.signinFailure(login.data.message));
  }
}

function* auth() {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const user = jwtDecode(token);
      yield put(ActionCreator.authSuccess(user));
    } catch (err) {
      yield put(ActionCreator.authFailure('invalid token'));
    }
  } else {
    yield put(ActionCreator.authFailure('no token'));
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(Types.SIGNIN_REQUEST, login),
    takeLatest(Types.AUTH_REQUEST, auth),
    takeLatest(Types.GET_RUNS_REQUEST, getRuns),
    takeLatest(Types.CREATE_RUN_REQUEST, createRuns),
    put(ActionCreator.authRequest())
  ]);
}