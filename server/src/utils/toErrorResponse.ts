import { ValidationError } from "express-validator";

export const toErrorResponse = (errors: ValidationError[]) => {
  const data = errors.map((error) => ({
    field: error.param,
    message: error.msg,
  }));
  return {
    status: "fail",
    data,
  };
};
