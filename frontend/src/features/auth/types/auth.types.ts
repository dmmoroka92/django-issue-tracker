import type { ApiResponse } from "../../../shared/api/types";

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
};

export type LoginResponse = ApiResponse<{
  access: string;
}>;

export type SignUpResponse = ApiResponse<User>;