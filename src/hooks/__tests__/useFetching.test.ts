import useFetching from "../useFetching";
import { renderHook, act } from "@testing-library/react-hooks";

const mockSuccessResponse = async () => Promise.resolve("success data");
const mockErrorResponse = async () => Promise.reject(new Error("fetch error"));

describe("useFetching", () => {
  it("should fetch data successfully", async () => {
    const mockOnSuccess = jest.fn();
    const { result } = renderHook(() =>
      useFetching({
        callback: mockSuccessResponse,
        onSuccess: mockOnSuccess,
      })
    );

    await act(async () => {
      await result.current.fetchQuery();
    });

    expect(result.current.data).toEqual("success data");
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBeUndefined();
    expect(mockOnSuccess).toHaveBeenCalledWith("success data");
  });

  it("should fetch data error", async () => {
    const mockOnError = jest.fn();
    const { result } = renderHook(() =>
      useFetching({
        callback: mockErrorResponse,
        onError: mockOnError,
      })
    );

    await act(async () => {
      await result.current.fetchQuery();
    });

    expect(result.current.data).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBeDefined();
    expect(mockOnError).toHaveBeenCalledWith(new Error("fetch error"));
  });

  it("should return initial state", () => {
    const { result } = renderHook(() =>
      useFetching({
        callback: mockSuccessResponse,
      })
    );

    expect(result.current.data).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it('should call "onSuccess"', async () => {
    const mockOnSuccess = jest.fn();
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetching({
        callback: mockSuccessResponse,
        onSuccess: mockOnSuccess,
        defaultValue: null,
      })
    );

    act(() => {
      result.current.fetchQuery();
    });

    await waitForNextUpdate();

    expect(result.current.data).toBe("success data");

    act(() => {
      result.current.refetch();
    });

    await waitForNextUpdate();

    expect(mockOnSuccess).toHaveBeenCalledTimes(2);
    expect(result.current.data).toBe("success data");
  });

  it("should not to call onSuccess if condition is false", async () => {
    const mockOnSuccess = jest.fn();
    const { result } = renderHook(() =>
      useFetching({
        callback: mockSuccessResponse,
        onSuccess: mockOnSuccess,
        condition: false,
      })
    );

    await act(async () => {
      await result.current.fetchQuery();
    });

    expect(mockOnSuccess).not.toHaveBeenCalled();
  });
});
