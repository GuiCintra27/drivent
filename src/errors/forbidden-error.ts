import { ApplicationError } from "@/protocols";

export function forbiddenError(): ApplicationError {
  return {
    name: "Forbidden",
    message: "This request violate business rule",
  };
}
