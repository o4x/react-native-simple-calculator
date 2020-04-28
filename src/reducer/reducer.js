import {input, result} from './actions';

const initialState = {
  input: '',
  result: '',
  history: [],
  last: '',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'INPUT':
      return {
        ...state,
        ...input(state, action),
      };

    case 'SETINPUT':
      return {
        ...state,
        input: action.value,
        ...result(action.value),
      };

    default:
      return state;
  }
}

export default reducer;
