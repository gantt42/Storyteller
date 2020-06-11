const assert = require('assert');
const {
  NumberOrString,
  Number,
  PossibleNumber,
  String,
  PossibleString,
} = require('./literal.js');
const {
  ErrorOrEof,
  Error,
  Eof,
} = require('./error.js');
const { PossibleVariable, Variable } = require('./variable.js');
const { State } = require('./tokens.js');

module.exports = {
  Command: _command,
}

function _command() {
  if (['inst'].includes(State.tokens[0].toLowerCase())){
    let variant = State.tokens[0].toLowerCase();
    let name = State.tokens[0];
    State.tokens = State.tokens.slice(1);
    return {
      type: 'command',
      variant: variant,
      name: name
    };
  }else if (['setv', 'addv'].includes(State.tokens[0].toLowerCase())){
    return _setvAddsEtc();
  }else{
    let name = State.tokens[0];
    State.tokens = State.tokens.slice(1);
    return Error('command', name);
  }
}

function _setvAddsEtc() {
  var commandName = State.tokens[0];
  State.tokens = State.tokens.slice(1);
  var argument1 = Variable();
  if (argument1.type === 'end-of-file'){
    return {
      type: 'command',
      variant: commandName.toLowerCase(),
      name: commandName,
      arguments: [argument1]
    };
  }
  if (['setv', 'addv'].includes(commandName.toLowerCase())){
    argument2 = Number();
    return {
      type: 'command',
      variant: commandName.toLowerCase(),
      name: commandName,
      arguments: [argument1, argument2]
    };
  }else{
    console.log(State.tokens);
    assert(false);
  }
}