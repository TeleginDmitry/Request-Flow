/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

// Установить токен в localStorage
Cypress.Commands.add("setToken", (token) => {
  cy.window().then((win) => {
    win.localStorage.setItem("supplyToken", token);
  });
});

// Проверить редирект на указанный URL
Cypress.Commands.add("assertRedirect", (expectedUrl) => {
  cy.url().should("eq", `${Cypress.config().baseUrl}${expectedUrl}`);
});

// Мокировать запрос на верификацию
Cypress.Commands.add("verify", (statusCode, body) => {
  cy.intercept("GET", "http://127.0.0.1:8000/api/verify", {
    statusCode,
    body,
  }).as("verify");
});

// Мокировать запрос на авторизацию
Cypress.Commands.add("login", (statusCode, body) => {
  cy.intercept("POST", "http://127.0.0.1:8000/api/login", {
    statusCode,
    body,
  }).as("login");
});

// Мокировать запрос на создание заявки
Cypress.Commands.add("createRequest", (statusCode, body) => {
  cy.intercept("POST", "http://127.0.0.1:8000/api/requests", {
    statusCode,
    body,
  }).as("createRequest");
});
