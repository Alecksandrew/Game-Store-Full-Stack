import { useState } from "react";
import { type warningState } from "../types/warningType";
import { type ApiResponse } from "../types/responseApiType";

const emptyWarningState: warningState = {
  message: "",
  type: "success",
};

export function useApi<TData, TResponse>(
  apiRequest: (data: TData) => Promise<TResponse>
) {
  const [warning, setWarning] = useState<warningState>(emptyWarningState);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<TResponse | null>(null);

  const execute = async (requestData: TData) => {
    setIsLoading(true);
    setWarning(emptyWarningState);

    try {
      const response = await apiRequest(requestData);

      setData(response);

      const successMessage =
        (response as ApiResponse)?.message || "Operation successful!";

      setWarning({ message: successMessage, type: "success" });
    } catch (error) {
      if (error instanceof Error) {
        setWarning({ message: error.message, type: "error" });
      } else {
        setWarning({ message: "An unknown error occurred.", type: "error" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { data, warning, isLoading, execute, setWarning, emptyWarningState };
}
