import type { ApiResponse } from "../../../shared/api/types";

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
};

export type SignUpResponse = ApiResponse<User>;

export type LoginResponse = ApiResponse<{
  access: string;
  refresh: string;
}>;