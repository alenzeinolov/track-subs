export interface APIResponse {
  status: "success" | "fail" | "error";
  data?: any;
  message?: string;
}
