
interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}



export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type FormFieldProps = {
  type: string,
  placeholder: string,
  name: string,
  register: any,
  error: any,
  valueAsNumber?: any
}

export type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};