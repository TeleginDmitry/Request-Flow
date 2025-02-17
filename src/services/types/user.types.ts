export interface UserModificationType {
  id: number;
  name: string;
  email: string;
  password: string;
  role_id: number;
  division_id: number;
}

export interface UserCreationType {
  name: string;
  email: string;
  password: string;
  role_id: number;
  division_id: number;
}
