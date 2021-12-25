/// <reference types="cypress" />

describe("Tests users navigation links", () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  // Test Top Navigation links
  it("Goes to my orders route", () => {
    cy.get(".ant-dropdown-trigger").click({ force: true });
    cy.contains("Orders").click();
    cy.url().should("contain", "/account/orders");
  });

  it("Goes to my account route", () => {
    cy.get(".ant-dropdown-trigger").click({ force: true });
    cy.contains("My Account").click();
    cy.url().should("contain", "/account");
  });

  // Test account side menu navigation
  it("Goes to my account route", () => {
    cy.contains("My Orders").click();
    cy.url().should("contain", "/account/orders");
  });

  it("Goes to change password route", () => {
    cy.contains("Change Password").click();
    cy.url().should("contain", "/account/change-password");
  });
});
