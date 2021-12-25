/// <reference types="cypress" />

describe("Routes Should be restricted to user", () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("Admin route should be restricted to user", () => {
    cy.visit("/admin");
    cy.url({ timeout: 5000 }).should("not.contain", "/admin");
  });

  it("Admin Products route should be restricted to user", () => {
    cy.visit("/admin/products");
    cy.url({ timeout: 5000 }).should("not.contain", "/admin");
  });

  it("Admin orders route should be restricted to user", () => {
    cy.visit("/admin/orders");
    cy.url({ timeout: 5000 }).should("not.contain", "/admin");
  });

  it("Admin single order route should be restricted to user", () => {
    cy.visit("/admin/orders/1");
    cy.url({ timeout: 5000 }).should("not.contain", "/admin");
  });

  it("Admin add/edit product route should be restricted to user", () => {
    cy.visit("/admin/add-edit-product");
    cy.url({ timeout: 5000 }).should("not.contain", "/admin");
  });

  it("Admin manage access route should be restricted to user", () => {
    cy.visit("/admin/access-control");
    cy.url({ timeout: 5000 }).should("not.contain", "/admin");
  });
});
