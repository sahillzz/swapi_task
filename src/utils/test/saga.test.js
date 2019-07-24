import {put, call} from 'redux-saga/effects';
import {cloneableGenerator} from '@redux-saga/testing-utils';
import {login as loginActionCreator, search as searchActionCreator, nextPage as nextPageActionCreator} from '../../components/store/actions';
import {login, search, nextPage} from '../saga'
import {loading, error} from '../../redux/actions'
import {loginToken, searchResult, nextPageResult} from '../../components/store/actions'
import {api} from '../saga'
import { push } from 'connected-react-router'

const loginApi = 'http://localhost:8080/login';
const seachApi = 'https://swapi.co/api/planets';
const nextPageApi = 'https://swapi.co/api/planets/?search=a&page=2';
const credentials = {
  name: 'Luke skywalker',
  password: '19BBY'
};
const loginAction = loginActionCreator(credentials);
const searchAction = searchActionCreator({search: 'luke'});
const nextPageAction = nextPageActionCreator(nextPageApi);

describe('login flow', () => {
  const generator = cloneableGenerator(login)(loginAction);
  expect(generator.next().value).toEqual(put(loading(true)));
  expect(generator.next().value).toEqual(call(api, loginApi, 'post', credentials));

  test('credentials success', () => {
    const clone = generator.clone();
    expect(clone.next({data: "success"}).value).toEqual(put(loginToken({data: "success"})));
    expect(clone.next(true).value).toEqual(put(error({})));
    expect(clone.next('/').value).toEqual(put(push('/')));
    expect(clone.next().value).toEqual(put(loading(false)));
    expect(clone.next().done).toEqual(true);
  });

  test('credentials fail --no user', () => {
    const clone = generator.clone();
    expect(clone.next({
      data: {
        error: "No match"
      }
    }).value).toEqual(put(loginToken({
      data: {
        error: "No match"
      }
    })));
    expect(clone.next(false).value).toEqual(put(error("No match")));
    expect(clone.next().value).toEqual(put(loading(false)));
    expect(clone.next().done).toEqual(true);
  });

  test('credentials fail --no user', () => {
    const clone = generator.clone();
    expect(clone.next({
      data: {
        error: "Incorrect Password"
      }
    }).value).toEqual(put(loginToken({
      data: {
        error: "Incorrect Password"
      }
    })));
    expect(clone.next(false).value).toEqual(put(error("Incorrect Password")));
    expect(clone.next().value).toEqual(put(loading(false)));
    expect(clone.next().done).toEqual(true);
  });
});

describe('search flow', () => {
  const generator = cloneableGenerator(search)(searchAction);
  expect(generator.next().value).toEqual(put(loading(true)));
  expect(generator.next().value).toEqual(call(api, seachApi, 'get', {search: "luke"}));

  test('Search', () => {
    const clone = generator.clone();
    expect(clone.next({search: "luke"}).value).toEqual(put(searchResult({search: "luke"})));
    expect(clone.next().value).toEqual(put(loading(false)));
    expect(clone.next().done).toEqual(true);
  });
});

describe('Next page', () => {
  const generator = cloneableGenerator(nextPage)(nextPageAction);
  expect(generator.next(nextPageApi).value).toEqual(call(api, nextPageApi, 'get'));

  test('Next Page', () => {
    const clone = generator.clone();
    expect(clone.next(nextPageApi).value).toEqual(put(nextPageResult(nextPageApi)));
  });
});
