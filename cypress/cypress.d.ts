export {};

declare global {
  namespace Cypress {
    interface Chainable {
      setToken(token: string): Chainable<void>;
      assertRedirect(expectedUrl: string): Chainable<void>;
      verify(statusCode: number, body: any): Chainable<void>;
      login(statusCode: number, body: any): Chainable<void>;
      createRequest(statusCode: number, body: any): Chainable<void>;
    }
  }
}
