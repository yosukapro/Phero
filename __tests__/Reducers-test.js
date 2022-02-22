import { ActionTypes } from '../src/store/actions/user';
import { userReducer } from '../src/store/reducers';

describe('test userReducer', () => {
  it('should return the initial state', () => {
    const data = userReducer(undefined, {});
    const expected = {};

    expect(data).toMatchObject(expected);
  });

  it('should return an user', () => {
    const data = userReducer(
      {},
      { type: ActionTypes.SET_USER, user: { name: 'toto' } },
    );
    const expected = { name: 'toto' };

    expect(data).toStrictEqual(expected);
  });
});
