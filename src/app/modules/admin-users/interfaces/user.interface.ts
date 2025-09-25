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

export interface Country {
  id: number;
  name: string;
  isoCode: string;
}

export interface Department {
  id: number;
  name: string;
  countryId: number;
}

export interface City {
  id: number;
  name: string;
  departmentId: number;
}
