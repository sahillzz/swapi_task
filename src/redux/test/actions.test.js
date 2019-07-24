import {error, loading} from '../actions';

describe('ACTIONS', () => {
  it('should create an action with correct type', () => {
    const expectedAction = {
      type: 'ERROR'
    }
    expect(error()).toEqual(expectedAction)
  })
})
