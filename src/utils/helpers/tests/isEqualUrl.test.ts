import { isEqualUrl } from "../isEqualUrl";

describe("isEqualUrl", () => {
  it("/ and / should return true", () => {
    expect(isEqualUrl("/", "/")).toBe(true);
  });

  it("/users and /users should return true", () => {
    expect(isEqualUrl("/users", "/users")).toBe(true);
  });

  it("/edit/:requestId and /edit/1 should return true", () => {
    expect(isEqualUrl("/edit/:requestId", "/edit/1")).toBe(true);
  });

  it("/edit/:requestId and /edit/request should return true", () => {
    expect(isEqualUrl("/edit/:requestId", "/edit/request")).toBe(true);
  });

  it("/edit/:requestId and /edit/1/request should return false", () => {
    expect(isEqualUrl("/edit/:requestId", "/edit/1/request")).toBe(false);
  });

  it("/edit/:requestId and /edit should return false", () => {
    expect(isEqualUrl("/edit/:requestId", "/edit")).toBe(false);
  });

  it("/profile and /profile should return true", () => {
    expect(isEqualUrl("/profile", "/profile")).toBe(true);
  });

  it(" and  should return true", () => {
    expect(isEqualUrl("", "")).toBe(true);
  });

  it("/ and /users should return false", () => {
    expect(isEqualUrl("/", "/users")).toBe(false);
  });
});
