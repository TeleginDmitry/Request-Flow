import { getUrlByParametrs } from "../getUrlByParametrs";

describe("getUrlByParametrs", () => {
  it("should return url with params", () => {
    const defaultUrl = "https://example.com";
    const params = {
      param1: "value1",
      param2: "value2",
    };
    const url = getUrlByParametrs(defaultUrl, params);
    expect(url.href).toBe("https://example.com/?param1=value1&param2=value2");
  });

  it("should return url with empty params", () => {
    const defaultUrl = "https://example.com";
    const params = {};
    const url = getUrlByParametrs(defaultUrl, params);
    expect(url.href).toBe("https://example.com/");
  });

  it("should return url with validated params", () => {
    const defaultUrl = "https://example.com";
    const params = {
      param1: "value1",
      param3: null,
      param2: "",
    };
    const url = getUrlByParametrs(defaultUrl, params);
    expect(url.href).toBe(
      "https://example.com/?param1=value1&param3=null&param2="
    );
  });
});
