import { useState } from "react";
import { AUTH_URL } from "../../../BACKEND_URL";
import { type warningState } from "../../../types/warningType";
import { type errorResponseApi } from "../../../types/responseApiType";

const emptyWarningState: warningState = {
  message: "",
  type: "success",
};

export function useAuthForm<TFormData>(endpoint: "/login" | "/register" | "/forgot-password" | "/reset-password") {
  const [warning, setWarning] = useState<warningState>(emptyWarningState);
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: TFormData) {
    setIsLoading(true);
    setWarning(emptyWarningState);

    try {
      const response = await fetch(`${AUTH_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        let errorMessage =
          responseData.message || "An unexpected error occurred.";
        if (responseData.errors) {
          errorMessage = responseData.errors.map(
            (err: errorResponseApi) => err.description
          ).join("\n");
        }
        throw new Error(errorMessage);
      }

      const successObj: warningState = {
        message: responseData.message,
        type: "success",
      };
      setWarning(successObj);
    } catch (error) {
      const errorObj: warningState = {
        message: "",
        type: "error",
      };
      if (error instanceof Error) {
        errorObj.message = error.message;
        setWarning(errorObj);
      } else {
        errorObj.message = "An unknown error occurred.";
        setWarning(errorObj);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return {
    warning,
    isLoading,
    onSubmit,
    emptyWarningState,
    setWarning,
  };
}
