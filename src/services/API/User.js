import API from 'services/API';

export const userInformations = () => (
  API.get('user/light', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
);

export const userContact = () => (
  API.get('contacts', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
);

export const fetchAddContact = contact => (
  API.post('contacts/user', {
    firstname: contact.firstname,
    lastname: contact.lastname,
    phone1: contact.phone,
    phone2: '',
    email1: contact.email,
    email2: '',
  })
);

export const fetchUpdateContact = (contact, id) => (
  API.patch(`contacts/users/${id}`, {
    headers: {
      'Content-Type': 'application/merge-patch+json',
    },
    email: contact.email,
    phone1: contact.phone,
    email1: contact.email,
    firstname: contact.firstname,
    lastname: contact.lastname,
  })
);

export const fetchDeleteContact = id => (
  API.delete(`contacts/users/${id}`)
);
