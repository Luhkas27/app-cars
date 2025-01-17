export interface SignInResponse {
  error: boolean;
  user: {
    id: number;
    name: string;
    token: string;
  };
}
