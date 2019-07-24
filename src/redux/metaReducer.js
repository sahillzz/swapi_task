// import initialState from '../../utils/redux';
import {
  combineActions,
  handleActions
} from 'redux-actions';

const initialState = {
  error: {},
  isLoading: false
}
export const error = handleActions({
    LOADING: (state, action) => ({
      error: state.error,
      isLoading: action.payload
    }),

    ERROR: (state, action) => {
      console.log(action, 'ssss');
      return ({
        error: action.data,
        isLoading: state.isLoading
      })
    },
  },
  initialState
);
