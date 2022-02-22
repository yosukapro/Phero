import config from 'config';

export const postAlert = (token, alertType, lng = 43.6460154, lat = 14.489167, content = 'alert') => (
  fetch(`${config.API_URL}alerts`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      alertType,
      content,
      lng,
      lat,
      user: '/api/users/3',
    }),
  })
);
