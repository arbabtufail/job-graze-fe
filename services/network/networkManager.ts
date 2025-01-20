import axios from './axios';
import { AxiosResponse } from 'axios';
import { ProfessionalLicense } from '@/shared/types/professionalLicense';
import { ProfileDetail } from '@/shared/types/profileDetail';
import { EducationAndExperience } from '@/shared/types/educationAndExperience';
import { PersonalInfo } from '@/shared/types/personalInformation';

export const updateProfessionalLicense = (
  talentId: string,
  data: ProfessionalLicense
): Promise<AxiosResponse<any>> => {
  return axios.patch(`/talent-profiles/${talentId}/ProfessionalLicense`, data);
};

export const updateProfileDetails = (
  talentId: string,
  data: ProfileDetail
): Promise<AxiosResponse<any>> => {
  return axios.patch(`/talent-profiles/${talentId}/profileDetails`, data);
};

export const updateEducationAndExperience = (
  talentId: string,
  data: EducationAndExperience
): Promise<AxiosResponse<any>> => {
  return axios.patch(
    `/talent-profiles/${talentId}/educationAndExperience`,
    data
  );
};

export const updatePersonalInformation = (
  talentId: string,
  data: PersonalInfo<File>
): Promise<AxiosResponse<any>> => {
  const formData = new FormData();

  for (const key in data) {
    const value = data[key as keyof typeof data];
    formData.append(key, value as string | Blob);
  }

  return axios.patch(
    `/talent-profiles/${talentId}/personalInformation`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};

export const bulkCreateTalentProfiles = (
  data: File
): Promise<AxiosResponse<any>> => {
  const formData = new FormData();
  formData.append('bulkFile', data);

  return axios.post(`/talent-profiles/bulkUpload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getAllTalentProfiles = (): Promise<AxiosResponse<any>> => {
  return axios.get(`/talent-profiles`);
};

export const getTalentProfileById = (
  talendId: string
): Promise<AxiosResponse<any>> => {
  return axios.get(`/talent-profiles/${talendId}`);
};

export const getRecentUpdates = (): Promise<AxiosResponse<any>> => {
  return axios.get(`/talent-profiles/recentUpdates`);
};

export const getProfileCount = (): Promise<AxiosResponse<any>> => {
  return axios.get(`/talent-profiles/totalProfileCount`);
};

export const getMonthlyTalentAcquisitionCount = (): Promise<
  AxiosResponse<any>
> => {
  return axios.get(`/talent-profiles/monthlyTalentAcquisitionCount`);
};

export const getTalentSpecializations = (): Promise<AxiosResponse<any>> => {
  return axios.get(`/talent-profiles/talentSpecializations`);
};

export const getRecentActivity = (
  startDate?: string
): Promise<AxiosResponse<any>> => {
  return axios.post(`/talent-profiles/recentActivity`, {
    startDate,
  });
};

export const deleteTalentProfileById = (
  talendId: string
): Promise<AxiosResponse<any>> => {
  return axios.delete(`/talent-profiles/${talendId}`);
};
