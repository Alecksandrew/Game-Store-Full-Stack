import { useState } from "react";
import { type warningState } from "../types/warningType";
import { type ApiResponse } from "../types/responseApiType";
import { Warning } from "@/global/components/Warning";

const emptyWarningState: warningState = {
  message: "",
  type: "success",
};

//Fetch general api -> this custom hook controls loading, data and warning states
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

      return response;
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

  const warningComponent =
    warning.message !== "" ? (
      <Warning
        message={warning.message}
        type={warning.type}
        onClose={() => setWarning(emptyWarningState)}
      />
    ) : null;

  return { data, isLoading, execute, warningComponent };
}
