export type ProfessionalLicense = {
  licenses: Licenses[];
  nclexRn: string;
  euRn: string;
  englishLanguageExam: string;
  spanishLanguageExam: string;
};

export type Licenses = {
  licenseType: string;
  licenseState: string;
  licenseCountry: string;
  licenseNumber: string;
  licenseIssuedBy: string;
  licenseEffectiveDate: string;
  licenseExpirationDate: string;
};
