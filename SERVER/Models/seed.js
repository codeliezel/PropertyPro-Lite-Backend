const Seed = {
  account: {
    email: 'funmijohn@hotmail.com',
    first_name: 'Funmilola',
    last_name: 'John',
    password: 'fuDd3457',
    phone_number: '08039873675',
    address: 'No. 4, Tade Ayade Close, New Bodija, Ibadan',
    is_admin: 'false',
  },
  incompleteFields: {
    email: '',
    first_name: 'Tade',
    last_name: 'Aderenle',
    password: 'TadeOgi8',
    phone_number: '',
    address: 'No. 4, Adesope Ileri Close, Lekki, Lagos',
    is_admin: 'false',
  },
  invalidEmail: {
    email: 'TadeAdegmail.com',
    first_name: 'Tade',
    last_name: 'Aderenle',
    password: 'TadeOgi8',
    phone_number: '08039867565',
    address: 'No. 4, Adesope Ileri Close, Lekki, Lagos',
    is_admin: 'false',
  },
  noValidNames: {
    email: 'TadeAde@gmail.com',
    first_name: 'Tad5',
    last_name: 'Aderenle7',
    password: 'TadeOgi8',
    phone_number: '08039867565',
    address: 'No. 4, Adesope Ileri Close, Lekki, Lagos',
    is_admin: 'false',
  },
  noValidNumber: {
    email: 'TadeAde@gmail.com',
    first_name: 'Tade',
    last_name: 'Aderenle',
    password: 'TadeOgi8',
    phone_number: '08039867565r',
    address: 'No. 4, Adesope Ileri Close, Lekki, Lagos',
    is_admin: 'false',
  },
  noValidPassword: {
    email: 'TadeAde@gmail.com',
    first_name: 'Tade',
    last_name: 'Aderenle',
    password: 'TadeOgi8yy',
    phone_number: '08039867565',
    address: 'No. 4, Adesope Ileri Close, Lekki, Lagos',
    is_admin: 'false',
  },
  signIn: {
    email: 'funmijohn@hotmail.com',
    password: 'fuDd3457',
  },
  incompleteSignInDetails: {
    email: '',
    password: '',
  },
  wrongEmail: {
    email: 'funmijon@hotmail.com',
    password: 'fuDd3457',
  },
  wrongPassword: {
    email: 'funmijohn@hotmail.com',
    password: 'fuD3457',
  },
};

export default Seed;
