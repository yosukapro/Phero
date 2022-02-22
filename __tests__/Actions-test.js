import { ActionTypes, setUser } from '../src/store/actions/user';

it('setUser sets user correctly', () => {
  const data = setUser({ name: 'toto' });
  const expected = {
    type: ActionTypes.SET_USER,
    user: { name: 'toto' },
  };

  expect(data).toMatchObject(expected);
});
