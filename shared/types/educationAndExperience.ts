export type EducationAndExperience = {
  education: EducationDegree[];
  jobExperiences: JobExperience[];
  languages: string[];
};

export type EducationDegree = {
  degree: string;
  year: number;
  school: string;
};
export type JobExperience = {
  jobTitle: string;
  rolesAndResponsibilities: string;
  startDate: string;
  endDate: string;
};
