import {put, call} from 'redux-saga/effects';
import {cloneableGenerator} from '@redux-saga/testing-utils';
import {login as loginActionCreator} from '../../components/store/actions';
import {login} from '../saga'
import {loading} from '../../redux/actions'
import {loginToken} from '../../components/store/actions'
import {api} from '../saga'
const loginApi = 'http://localhost:8080/login';
const credentials = {
  name: 'sahil',
  password: '123456'
};
const loginAction = loginActionCreator(credentials);

describe('login flow', () => {
  const generator = cloneableGenerator(login)(loginAction);
    // console.log(generator.next(), '=====');
  expect(generator.next().value).toEqual(put(loading(true)));
   expect(generator.next().value).toEqual(call(api, loginApi, 'post', credentials));
   const x = call(api, loginApi, 'post', credentials);
   console.log(x, '--------------');
  //  test('credentials success', () => {
  //   const clone = generator.clone();
  //    expect(clone.next(true).value).toEqual(put(loginToken()));
  //   expect(clone.next().done).toEqual(true);
  // });
});
