export type Activity = {
  id: string;
  type: 'added' | 'updated' | 'deleted';
  date: string;
  firstName: string;
  lastName: string;
};
