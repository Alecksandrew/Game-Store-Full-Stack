import { useCallback, useState } from "react";
import type { NotificationState } from "./types";
import type { ApiResponse } from "@/global/types/responseApiType";
import { Modal } from "@/global/components/Modal";



const emptyWarningState: NotificationState = {
  message: "",
  type: "success",
};

//Fetch general api -> this custom hook controls loading, data and warning states
export function useRequestHandler<TData, TResponse>(
  apiRequest: (data: TData) => Promise<TResponse>
) {
  const [warning, setWarning] = useState<NotificationState>(emptyWarningState);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<TResponse | null>(null);

  const executeRequest = useCallback(
    async (requestData: TData) => {
      setIsLoading(true);
      setWarning(emptyWarningState);

      try {
        const response = await apiRequest(requestData);
        console.log(
          "%cAPI Call Succeeded:",
          "color: green; font-weight: bold;",
          response
        );
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
    },
    [apiRequest]
  );

  const warningComponent = (
    <Modal.Preset.Notification
      isOpen={warning.message !== ""}
      message={warning.message}
      type={warning.type}
      onClose={() => setWarning(emptyWarningState)}
    />
  );
  return {
    data,
    isLoading,
    executeRequest,
    warningComponent,
    warningType: warning.type,
    setData,
  };
}
