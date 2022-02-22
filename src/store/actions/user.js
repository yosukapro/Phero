export const ActionTypes = {
  SET_USER: 'SET_USER',
  DEL_USER: 'DEL_USER',
  SET_TOKEN: 'SET_TOKEN',
  DEL_TOKEN: 'DEL_TOKEN',
};

export const setUser = user => ({
  type: ActionTypes.SET_USER,
  user,
});

export const delUser = () => ({
  type: ActionTypes.DEL_USER,
});
