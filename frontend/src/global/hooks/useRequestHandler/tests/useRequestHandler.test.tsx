import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { useRequestHandler } from "../useRequestHandler";

type RequestPayload = { some: string };

type MockSuccessResponseType = {
  message: string;
  id: number;
  name: string;
};

const mockApiRequest =
  vi.fn<(data: RequestPayload) => Promise<MockSuccessResponseType | any>>();

const mockSuccessData = { id: 1, name: "Test Data" };
const mockSuccessResponse = {
  message: "Operação bem-sucedida",
  ...mockSuccessData,
};
const mockError = new Error("API fail");

describe("useRequestHandler", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("It should handle with a sucessufull request", async () => {
    mockApiRequest.mockResolvedValue(mockSuccessResponse);

    const { result } = renderHook(() =>
      useRequestHandler<RequestPayload, MockSuccessResponseType>(mockApiRequest)
    );

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.warningType).toBe("success");

    let promise: Promise<MockSuccessResponseType | undefined>;
    act(() => {
      promise = result.current.executeRequest({ some: "payload" });
    });

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      await promise;
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual(mockSuccessResponse);
    expect(result.current.warningType).toBe("success");
    expect(result.current.warningComponent.props.message).toBe(
      "Operação bem-sucedida"
    );

    expect(mockApiRequest).toHaveBeenCalledTimes(1);
    expect(mockApiRequest).toHaveBeenCalledWith({ some: "payload" });
  });

  it("It should handle with a failed request", async () => {
    mockApiRequest.mockRejectedValue(mockError);

    const { result } = renderHook(() => useRequestHandler(mockApiRequest));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeNull();

    let promise: Promise<MockSuccessResponseType | undefined>;
    act(() => {
      promise = result.current.executeRequest({ some: "payload" });
    });

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      try {
        await promise;
      } catch {
        /* empty */
      }
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.warningType).toBe("error");
    expect(result.current.warningComponent.props.message).toBe("API fail");

    expect(mockApiRequest).toHaveBeenCalledTimes(1);
    expect(mockApiRequest).toHaveBeenCalledWith({ some: "payload" });
  });

  it("should handle a failure call after a success call, preserving the last successful data", async () => {
    const { result } = renderHook(() => useRequestHandler(mockApiRequest));

    //Good request
    mockApiRequest.mockResolvedValue(mockSuccessResponse);
    await act(async () => {
      await result.current.executeRequest({ some: "payload-1" });
    });

    expect(result.current.data).toEqual(mockSuccessResponse);
    expect(result.current.warningType).toBe("success");

    // Bad request
    mockApiRequest.mockRejectedValue(mockError);

    let promise: Promise<MockSuccessResponseType | undefined>;
    act(() => {
      promise = result.current.executeRequest({ some: "payload" });
    });

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      await promise;
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.warningType).toBe("error");
    expect(result.current.warningComponent.props.message).toBe("API fail");
    expect(result.current.data).toEqual(mockSuccessResponse); //Last successfull state should be kept -> It is useful for example for a forms
  });

  it("should clear the warning state when the warningComponent's onClose is called", async () => {
    mockApiRequest.mockRejectedValue(mockError);
    const { result } = renderHook(() => useRequestHandler(mockApiRequest));

    await act(async () => {
      await result.current.executeRequest({ some: "payload" });
    });

    expect(result.current.warningType).toBe("error");
    expect(result.current.warningComponent.props.isOpen).toBe(true);
    expect(result.current.warningComponent.props.message).toBe("API fail");

    act(() => {
      result.current.warningComponent.props.onClose();
    });

    expect(result.current.warningType).toBe("success"); // standard state of warning type
    expect(result.current.warningComponent.props.isOpen).toBe(false);
    expect(result.current.warningComponent.props.message).toBe("");
  });

  it("should use a default success message if the API response has no 'message' property", async () => {
    const mockSuccessNoMessage = { id: 2, name: "Data without message" };
    mockApiRequest.mockResolvedValue(mockSuccessNoMessage);

    const { result } = renderHook(() => useRequestHandler(mockApiRequest));

    await act(async () => {
      await result.current.executeRequest({ some: "payload" });
    });

    expect(result.current.warningType).toBe("success");
    expect(result.current.warningComponent.props.message).toBe(
      "Operation successful!"
    );
    expect(result.current.data).toEqual(mockSuccessNoMessage);
  });

  it("should use a default error message if the API rejects with a non-Error value (e.g., a string)", async () => {
    const mockStringError = "API is offline";
    mockApiRequest.mockRejectedValue(mockStringError);

    const { result } = renderHook(() => useRequestHandler(mockApiRequest));

    await act(async () => {
      await result.current.executeRequest({ some: "payload" });
    });

    expect(result.current.warningType).toBe("error");
    expect(result.current.warningComponent.props.message).toBe(
      "An unknown error occurred."
    );
    expect(result.current.data).toBeNull();
  });

  it("should handle multiple sequential successful requests", async () => {
    const response1 = { message: "First", id: 1, name: "Data 1" };
    const response2 = { message: "Second", id: 2, name: "Data 2" };

    mockApiRequest
      .mockResolvedValueOnce(response1)
      .mockResolvedValueOnce(response2);

    const { result } = renderHook(() => useRequestHandler(mockApiRequest));

    await act(async () => {
      await result.current.executeRequest({ some: "payload-1" });
    });

    expect(result.current.data).toEqual(response1);

    await act(async () => {
      await result.current.executeRequest({ some: "payload-2" });
    });
    expect(result.current.data).toEqual(response2);

    expect(mockApiRequest).toHaveBeenCalledTimes(2);
  });

  it("should clear previous error warning on a new successful request", async () => {
    mockApiRequest.mockRejectedValueOnce(mockError);
    const { result } = renderHook(() => useRequestHandler(mockApiRequest));

    await act(async () => {
      await result.current.executeRequest({ some: "payload" });
    });

    expect(result.current.warningType).toBe("error");
    expect(result.current.warningComponent.props.isOpen).toBe(true);

    mockApiRequest.mockResolvedValueOnce(mockSuccessResponse);
    await act(async () => {
      await result.current.executeRequest({ some: "payload" });
    });

    expect(result.current.warningType).toBe("success");
    expect(result.current.warningComponent.props.message).toBe(
      "Operação bem-sucedida"
    );
    expect(result.current.data).toEqual(mockSuccessResponse);
  });

  it("should have correct initial state for warningComponent", () => {
    const { result } = renderHook(() => useRequestHandler(mockApiRequest));

    expect(result.current.warningComponent.props.isOpen).toBe(false);
    expect(result.current.warningComponent.props.message).toBe("");
    expect(result.current.warningType).toBe("success");
  });
  /*--
 it("should reflect the state of the *last* completed request in a race condition", async () => {
  let resolveSlow: (value: MockSuccessResponseType) => void;
  let resolveFast: (value: MockSuccessResponseType) => void;

  const slowPromise = new Promise<MockSuccessResponseType>(
    (res) => (resolveSlow = res)
  );
  const fastPromise = new Promise<MockSuccessResponseType>(
    (res) => (resolveFast = res)
  );

  mockApiRequest
    .mockImplementationOnce(() => slowPromise) // 1ª chamada (lenta)
    .mockImplementationOnce(() => fastPromise); // 2ª chamada (rápida)

  const { result } = renderHook(() => useRequestHandler(mockApiRequest));

  // 2. Dispara as duas chamadas E ARMAZENA AS PROMISES DE EXECUÇÃO
  let slowExecutionPromise: Promise<any>;
  let fastExecutionPromise: Promise<any>;

  act(() => {
    // Armazena a promise retornada pelo *hook*
    slowExecutionPromise = result.current.executeRequest({ some: "slow-payload" });
  });
  act(() => {
    // Armazena a promise retornada pelo *hook*
    fastExecutionPromise = result.current.executeRequest({ some: "fast-payload" });
  });

  // Estado intermediário (correto)
  expect(result.current.isLoading).toBe(true);

  // 3. Resolve a chamada RÁPIDA (2ª) primeiro
  const fastResponse = {
    message: "Fast response",
    id: 2,
    name: "Fast",
  };

  // AQUI ESTÁ A CORREÇÃO:
  await act(async () => {
    resolveFast(fastResponse); // 1. Libera a promise interna da API
    await fastExecutionPromise;  // 2. Espera o hook processar o .then() e .finally()
  });

  // Verificação Intermediária 2 (Agora funciona 100%)
  expect(result.current.isLoading).toBe(true); // 'slowPromise' ainda está pendente
  expect(result.current.data).toEqual(fastResponse);
  expect(result.current.warningComponent.props.message).toBe("Fast response");

  // 4. Resolve a chamada LENTA (1ª) por último
  const slowResponse = {
    message: "Slow response",
    id: 1,
    name: "Slow",
  };

  // AQUI ESTÁ A SEGUNDA CORREÇÃO:
  await act(async () => {
    resolveSlow(slowResponse); // 1. Libera a promise interna da API
    await slowExecutionPromise; // 2. Espera o hook processar
  });

  // Verificação Final (Agora funciona 100%)
  expect(result.current.isLoading).toBe(false); // Agora tudo terminou
  expect(result.current.data).toEqual(slowResponse);
  expect(result.current.warningComponent.props.message).toBe("Slow response");
}); */
});
