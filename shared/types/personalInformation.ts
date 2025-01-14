export type PersonalInfo<T> = {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  country: string;
  stateOrProvince: string;
  city: string;
  zipCode: string;
  address1: string;
  address2: string;
  eligibility: boolean;
  photo?: T;
};
