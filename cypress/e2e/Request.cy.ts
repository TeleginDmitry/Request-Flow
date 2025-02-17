import { selectors } from "../support/selectors";

describe("Request", () => {
  let user;
  let request;

  before(() => {
    // Загружаем фикстуры перед всеми тестами
    cy.fixture("user.json").then((data) => {
      user = data;
    });
    cy.fixture("request.json").then((data) => {
      request = data;
    });
  });

  beforeEach(() => {
    cy.visit("/");

    cy.setToken("110|OlPVMwOthFV1J0KRQHXcYyVU1fhjxTSWmgu02Zss4783f230");

    cy.verify(200, user);
    cy.wait("@verify");

    cy.assertRedirect("/");
  });

  it("should be able to create a new request", () => {
    // Переход на страницу создания заявки
    cy.get(selectors.createRequestButton).click();
    cy.assertRedirect("/create-request");

    // Заполнение полей формы
    cy.get(selectors.textInput).eq(0).type("Test request");
    cy.get(selectors.descriptionAccordion).click();
    cy.get(selectors.textInput).eq(1).type("Test description");

    // Отправка заявки
    cy.get(selectors.submitButton).click();
    cy.createRequest(200, request);

    cy.assertRedirect("/");

    // Проверка сообщения о результате
    cy.get(selectors.successBanner).contains(/Успешно|Произошла ошибка/i);
  });

  it("should not be able to create a new request", () => {
    cy.get(selectors.createRequestButton).click();
    cy.assertRedirect("/create-request");

    cy.get(selectors.textInput).eq(0).type("Test request");
    cy.get(selectors.descriptionAccordion).click();
    cy.get(selectors.textInput).eq(1).type("Test description");

    cy.get(selectors.submitButton).click();
    cy.createRequest(400, { message: "Cannot create request" });

    cy.wait("@createRequest");

    cy.get(selectors.successBanner).contains(/Произошла ошибка/i);
  });

  it("should require validation of inputs", () => {
    cy.get(selectors.createRequestButton).click();
    cy.assertRedirect("/create-request");

    cy.get(selectors.submitButton).click();

    // Проверка, что форма не отправлена, и мы остались на той же странице
    cy.assertRedirect("/create-request");
  });
});
