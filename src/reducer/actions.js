import {create, all} from 'mathjs';

const math = create(all, {number: 'BigNumber'});

export const input = (state, action) => {
  switch (action.action) {
    case 'keyboard':
      if (state.last === '=') {
        return {
          input: numberWithComma(action.value),
          result: result(action.value),
          history: state.result + state.input + '\n',
          last: '',
        };
      }
      return {
        input: action.value,
        result: result(action.value),
        last: '',
      };

    case 'C':
      return {
        input: numberWithComma(state.input.toString().slice(0, -1)),
        result: result(state.input.toString().slice(0, -1)),
      };

    case 'CC':
      return {
        input: '',
        result: '',
        rerouted: '',
      };

    case '=':
      if (state.last === '=') return {};
      return {
        input: state.result.replace('= ', ''),
        result: state.input + ' = ',
        last: '=',
      };

    default:
      if (state.last === '=') {
        state.history.push(state.result + state.input);
        return {
          input: numberWithComma(action.action),
          result: result(action.action),
          last: '',
        };
      }
      return {
        input: numberWithComma(state.input + action.action),
        result: result(state.input + action.action),
        last: '',
      };
  }
};

export const result = x => {
  if (!x) {
    return '';
  }
  try {
    return '= ' + math.evaluate(map(x.toString())).toString();
  } catch (error) {
    return '...';
  }
};

function numberWithComma(x) {
  x = x.toString().replace(/,/g, '');
  var parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

function map(x) {
  return x
    .replace(/,/g, '')
    .replace('×', '*')
    .replace('÷', '/')
    .replace('π', 'pi');
}
