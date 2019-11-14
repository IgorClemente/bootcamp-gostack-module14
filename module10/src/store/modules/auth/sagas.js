import { all, takeLatest, call, put } from 'redux-saga/effects';
import { signInSuccess, signFailure } from './actions';

import { Alert } from 'react-native';

import api from '~/services/api';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });
    console.tron.warn(response);
    const { token, user } = response.data;

    if (user.provider) {
      Alert.alert(
        'Usuário é provedor',
        'Não é permitido login para provedor de serviços'
      );
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    //history.push('/dashboard');
  } catch (err) {
    Alert.alert('Falha ao logar', 'Falha no login, verifique seus dados');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
      provider: true,
    });

    //history.push('/');
  } catch (err) {
    Alert.alert('Falha ao criar conta, verifique seus dados');
    yield put(signFailure());
  }
}

export function authToken({ payload }) {
  const { token } = payload.auth;

  api.defaults.headers.Authorization = `Bearer ${token}`;
}

export function signOut() {
  //history.push('/');
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
  takeLatest('persist/REHYDRATE', authToken),
]);
