export type PersonalInfo<T> = {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: number;
  country: string;
  stateOrProvince: string;
  city: string;
  zipCode: string;
  address1: string;
  address2: string;
  eligibility: string;
  photo?: T;
};
