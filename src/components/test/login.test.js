import React, { useState } from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux'
import _ from 'lodash';

// Actions to be tested
import * as selectActions from '../store/actions';

const mockStore = configureStore();
const initialState = {reducer:{token:{}}, meta:{isLoading:false}}
const store = mockStore(initialState);
import Login from '../Login';;

configure({ adapter: new Adapter() });

describe('select_actions', () => {
  beforeEach(() => { // Runs before each test in the suite
    store.clearActions();
  });

});
