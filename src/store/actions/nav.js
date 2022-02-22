export const ActionTypes = {
  OPEN_NAV: 'OPEN_NAV',
  CLOSE_NAV: 'CLOSE_NAV',
};

export const openNav = () => ({
  type: ActionTypes.OPEN_NAV,
});

export const closeNav = () => ({
  type: ActionTypes.CLOSE_NAV,
});
