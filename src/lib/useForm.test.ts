import { renderHook, act } from "@testing-library/react";
import useForm from "./useForm";

describe("useForm", () => {
  test("should return inputs.title with blank values for keys", () => {
    const { result } = renderHook(useForm);
    expect(result.current.inputs.title).toMatch("");
  });

  test("should return inputs.description with blank values for keys", () => {
    const { result } = renderHook(useForm);
    expect(result.current.inputs.description).toMatch("");
  });

  test("should return inputs.title matching passed value", () => {
    const { result } = renderHook(useForm, {
      initialProps: {
        title: "Yoga",
        description: "Go to Yoga",
      },
    });
    expect(result.current.inputs.title).toMatch("Yoga");
  });

  test("should return inputs.description matching passed value", () => {
    const { result } = renderHook(useForm, {
      initialProps: {
        title: "Yoga",
        description: "Go to Yoga",
      },
    });
    expect(result.current.inputs.description).toMatch("Go to Yoga");
  });

  test("clearForm() should clear inputs values", () => {
    const { result } = renderHook(useForm, {
      initialProps: {
        title: "Yoga",
        description: "Go to Yoga",
      },
    });
    act(() => result.current.clearForm());
    expect(result.current.inputs.title).toMatch("");
  });

  test("clearForm() should clear inputs values", () => {
    const { result } = renderHook(useForm, {
      initialProps: {
        title: "Yoga",
        description: "Go to Yoga",
      },
    });
    act(() => result.current.clearForm());
    expect(result.current.inputs.title).toMatch("");

    act(() => result.current.resetForm());
    expect(result.current.inputs.title).toMatch("Yoga");
  });
});
