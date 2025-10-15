import { useCallback, useState } from "react";
import { type ApiResponse } from "../types/responseApiType";
import { Modal } from "../components/Modal";

export type NotificationState = {
  message: string;
  type: "success" | "error";
};

const emptyWarningState: NotificationState = {
  message: "",
  type: "success",
};

//Fetch general api -> this custom hook controls loading, data and warning states
export function useApi<TData, TResponse>(
  apiRequest: (data: TData) => Promise<TResponse>
) {
  const [warning, setWarning] = useState<NotificationState>(emptyWarningState);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<TResponse | null>(null);

  const execute = useCallback(
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
    execute,
    warningComponent,
    warningType: warning.type,
    setData,
  };
}
