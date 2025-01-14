export type EducationAndExperience = {
  degree: string;
  year: string;
  school: string;
  jobExperiences: JobExperience[];
  languages: string[];
};

export type JobExperience = {
  jobTitle: string;
  rolesAndResponsibilities: string;
  startDate: string;
  endDate: string;
};
