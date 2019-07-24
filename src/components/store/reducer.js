// import initialState from '../../utils/redux';
import { combineActions, handleActions } from 'redux-actions';

const initialState = {
  searchResult:{
    results:[],
    next:null,
    previous:null
  },
  token:false
}
export const reducer = handleActions(
  {
    SEARCH_SUCCESS:(state, action) =>{
      const {next, previous, results} = action.data.data;
      return{
      searchResult:{results:results, next:next, previous:previous},
      token:state.token
    }},
    NEXT_PAGE_RESULT:(state, action) =>{
      const {next, previous, results} = action.payload.data;
      return{
      searchResult:{results:[...state.searchResult.results, ...results], next:next, previous:previous},
      token:state.token
    }
  },
    LOGIN_TOKEN:(state, action) =>{
      const { data } = action.data;
      console.log(action);
      if (data==="success") {
        return({
          token:true,
        searchResult:state.searchResult })
      }else{
        return({
          token:false,
        searchResult:state.searchResult})
      }

    },
    LOGOUT:(state, action) =>({
      token:false,
      searchResult:state.searchResult
    }),
  },
  initialState
);
