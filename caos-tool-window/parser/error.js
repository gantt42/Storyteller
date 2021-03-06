module.exports = {
  CheckForEof: _checkForEof,
  ErrorOrEof: _errorOrEof,
  Error: _error,
  TypedError: _typedError,
  Eof: _eof,
}

const assert = require('assert');
const { State } = require('./tokens.js');

function _checkForEof(expecting){
  if (State.tokens.length === 0){
    return _eof(expecting);
  }else{
    return null;
  }
}

function _errorOrEof(expecting){
  if (State.tokens.length === 0){
    return _eof(expecting);
  }else{
    let name = State.tokens[0];
    State.tokens = State.tokens.slice(1);
    return _error(expecting, name);
  }
}

function _error(expecting, foundName){
  //console.log(State.tokens);
  //assert(false);
  return {
    type: expecting,
    variant: 'error',
    name: foundName,
    message: `Expected ${expecting}, but found ${foundName} instead.`
  };
}

function _typedError(type, expecting, foundName){
  //console.log(State.tokens);
  //assert(false);
  return {
    type: type,
    variant: 'error',
    name: foundName,
    message: `Expected ${expecting}, but found ${foundName} instead.`
  };
}

function _eof(expecting){
  //console.log(State.tokens);
  //assert(false);
  return {
    type: 'end-of-file',
    variant: 'error',
    name: expecting,
    message: `Expected ${expecting}, but found end of file instead.`
  };
}
