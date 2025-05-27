export interface IPersonWithUser {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  secondLastName?: string;
  email: string;
  createdAt: string;
  updatedAt: string;

  user?: {
    roles: string[];
  };
}
