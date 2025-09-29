export interface ICreateUserDto {
  firstName: string;
  middleName?: string;
  lastName: string;
  secondLastName?: string;
  email: string;
  address: string;
  postalCode: string;
  countryId: number;
  departmentId: number;
  municipalityId: number;
}
