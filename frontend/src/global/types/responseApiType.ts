
export type ApiErrorDetail = {
    code: string,
    description:string
};

export interface ApiResponse {
  message: string;
  errors?: ApiErrorDetail[] | null;
}