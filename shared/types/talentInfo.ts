export type talentInfo = {
  id: string;
  firstName: string;
  lastName: string;
  profileScore: number;
  experience: number;
  createdAt: string;
  updatedAt: string;
  specialties: string[];
  status?: 'Active' | 'In Progress' | 'On Hold' | 'Inactive';
  address1: string;
};
