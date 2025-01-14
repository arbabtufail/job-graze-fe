export type talentInfo = {
  id: string;
  firstName: string;
  lastName: string;
  profileScore: number;
  experience: number;
  createdAt: string;
  updatedAt: string;
  specialties: string[];
  status?: 'active' | 'inProgress' | 'onHold' | 'inActive';
  address1: string;
};
