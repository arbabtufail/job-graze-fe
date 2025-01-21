export type talentInfo = {
  id: string;
  firstName: string;
  lastName: string;
  profileScore: number;
  experience: number;
  createdAt: string;
  updatedAt: string;
  specialties: string[];
  status?: 'complete' | 'inProgress' | 'onHold' | 'inActive';
  address1: string;
};
