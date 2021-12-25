/// <reference types="cypress" />

const user = Cypress.env("testUser");

describe("Should login a user", () => {
  before(() => {
    cy.visit("/auth/login");
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("should not login bad user", () => {
    cy.get("#login_email").type("wrong@wrong.com");
    cy.get("#login_password").type("worstpwever");
    cy.get(".ant-btn").click();

    cy.contains("Email or password incorrect", { timeout: 8000 }).should(
      "exist"
    );
  });

  it("logs user in", () => {
    cy.get("#login_email").type(user.email);
    cy.get("#login_password").type(user.password);
    cy.get(".ant-btn").click();
    cy.contains("Login Successful", { timeout: 8000 }).should("exist");
  });
});
