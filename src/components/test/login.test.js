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

// describe("MyComponent", () => {
// it("should render my component", () => {
// const tree = renderer.create(<Login />).toJSON();
// });
// it('calls onSubmit prop function when form is submitted', () => {
//   const onSubmitFn = jest.fn();
//   const wrapper = mount(
//     <Provider store={store}>
//       <Login onSubmit={(onSubmitFn)}/>
//     </Provider>
//   );
//   console.log(wrapper.find(handleSubmit), 'adasdasdasd');
//     expect(wrapper.find('input').length).toEqual(2);
//     expect(wrapper.props().children.props.onSubmit).toBeDefined();
//   const form = wrapper.find('form');
//   const input = wrapper.find('input');
//   expect(form).toHaveLength(1);
//   expect(input).toHaveLength(2);
//   input.at(0).simulate('change', {target:{value: 'Luke skywalker'}});
//     input.at(1).simulate('change', {target:{value: '19BBY'}});
//   form.simulate("change", {username: "Luke skywalker", password: "19BBY"});
//   form.simulate('submit');
//   expect(input.find(input.at(0)).prop('value')).toEqual("Luke skywalker");
// });
//
// it('onsub', ()=>{
//   const onSubmitFn = jest.fn();
//   const wrapper = mount(
//     <Provider store={store}>
//       <Login onSubmit={(onSubmitFn)}/>
//     </Provider>);
//        expect(wrapper.props().children.props.onSubmit).toBeDefined();
// })
//
// })
