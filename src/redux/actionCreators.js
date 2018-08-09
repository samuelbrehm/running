import { createActions } from 'reduxsauce';

export const {
  Types,
  Creators
} = createActions({
  signinRequest: ['email', 'passwd'],
  signinSuccess: ['user'],
  signinFailure: ['error'],

  authRequest: null,
  authSuccess: ['user'],
  authFailure: null,

  getRunsRequest: null,
  getRunsSuccess: ['runs'],
  getRunsFailure: null,

  createRunRequest: ['run'],
  createRunSuccess: ['run'],
  createRunFailure: ['error']
});

export default Creators