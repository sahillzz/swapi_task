import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import axios from "axios";
import {searchResult, loginToken, nextPageResult} from "../components/store/actions";
import {error, loading} from '../redux/actions';
import {push} from 'connected-react-router'
import _ from 'lodash';

export const api = (api, type, params) => {
  switch (type) {
    case 'get':
      return axios.get(api, {params}).then(res => res).catch(error => {
        throw error
      })

    case 'post':
      return axios.post(api, params).then(res => res).catch(error => {
        throw error
      })
    default:
      return null;
  }
}

export function* login(action) {
  try {
    yield put(loading(true));
    const data = yield call(api, 'http://localhost:8080/login', 'post', action.payload);
    yield put(loginToken(data));
    !_.has(data.data, 'error')
      ? (yield put(error({})), yield put(push('/')))
      : yield put(error(data.data.error))
  } catch (e) {
    yield put(error(e.response.data.error));
  }
  yield put(loading(false));
}

export function* search(action) {
  try {
    yield put(loading(true));
    const data = yield call(api, 'https://swapi.co/api/planets', 'get', action.payload);
    yield put(searchResult(data));
    yield put(loading(false));
  } catch (e) {
    yield put(error(e));
    yield put(loading(false));
  }
}

export function* nextPage(action) {
  try {
    const data = yield call(api, action.payload, 'get');
    yield put(nextPageResult(data));

  } catch (e) {
    yield put(error(e));
  }
}

export function* saga() {
  yield takeEvery('LOGIN', login);
  yield takeEvery('SEARCH', search);
  yield takeEvery('NEXT_PAGE', nextPage);
}
