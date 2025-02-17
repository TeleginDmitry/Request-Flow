describe("Authorization Tests", () => {
  it("should redirect to auth page", () => {
    cy.visit("/");

    cy.assertRedirect("/auth");
  });

  it("should check user auth and redirect to auth page", () => {
    cy.setToken("mock-token");

    cy.visit("/");

    cy.verify(400, { message: "Invalid token" });

    cy.wait("@verify");

    cy.assertRedirect("/auth");
  });

  it("should check user auth and redirect to main page", () => {
    cy.setToken("110|OlPVMwOthFV1J0KRQHXcYyVU1fhjxTSWmgu02Zss4783f230");

    cy.visit("/");

    cy.fixture("user.json").then((user) => {
      cy.verify(200, user);
    });

    cy.wait("@verify");

    cy.assertRedirect("/");
  });

  it("should redirect to main page if user is logged in", () => {
    cy.setToken("110|OlPVMwOthFV1J0KRQHXcYyVU1fhjxTSWmgu02Zss4783f230");

    cy.visit("/auth");

    cy.fixture("user.json").then((user) => {
      cy.verify(200, user);
    });

    cy.wait("@verify");

    cy.assertRedirect("/");
  });

  it("should login user and redirect to main page", () => {
    cy.visit("/");

    cy.assertRedirect("/auth");

    cy.get('[data-testid="email-input"]').type("thl.wbr@mail.ru");
    cy.get('[data-testid="password-input"]').type("TehnoLine2011");

    cy.get('[data-testid="sign-in-button"]').click();

    cy.fixture("user.json").then((user) => {
      cy.login(200, user);
    });

    cy.wait("@login");

    cy.assertRedirect("/");
  });

  it("should logout user and redirect to auth page", () => {
    cy.setToken("110|OlPVMwOthFV1J0KRQHXcYyVU1fhjxTSWmgu02Zss4783f230");

    cy.visit("/");

    cy.fixture("user.json").then((user) => {
      cy.verify(200, user);
    });

    cy.wait("@verify");

    cy.assertRedirect("/");

    cy.get(".MuiAvatar-root").click();

    cy.get(
      ".src-components-Account-AccountWindow-style-module__buttonsWrapper--WoH6x > :nth-child(2)"
    ).click();

    cy.assertRedirect("/auth");
  });
});
