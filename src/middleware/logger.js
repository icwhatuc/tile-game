const logger = store => next => action => {
  let result = next(action);
  console.log('dispatching', action);
  console.log('next state', store.getState());
  console.log('result', result);
  return result;
};

export default logger;
