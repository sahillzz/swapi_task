import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import {reducer} from '../components/store/reducer'
import {error} from './metaReducer'

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  reducer:reducer,
  meta:error
})

export default rootReducer
