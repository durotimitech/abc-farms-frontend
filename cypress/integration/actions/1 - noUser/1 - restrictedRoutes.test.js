/// <reference types="cypress" />

describe("Routes Should be restricted to unauthenticated customer", () => {
  // User Routes
  it("Account route should be restricted to user", () => {
    cy.visit("/account");
    cy.url({ timeout: 5000 }).should("not.contain", "/account");
  });

  it("Wishlist route should be restricted to user", () => {
    cy.visit("/account/wishlist");
    cy.url({ timeout: 5000 }).should("not.contain", "/account");
  });

  it("Payment route should be restricted to user", () => {
    cy.visit("/account/payment");
    cy.url({ timeout: 5000 }).should("not.contain", "/account");
  });

  it("Checkout route should be restricted to user", () => {
    cy.visit("/account/checkout");
    cy.url({ timeout: 5000 }).should("not.contain", "/account");
  });

  it("Change password route should be restricted to user", () => {
    cy.visit("/account/change-password");
    cy.url({ timeout: 5000 }).should("not.contain", "/account");
  });

  it("Cart route should be restricted to user", () => {
    cy.visit("/account/cart");
    cy.url({ timeout: 5000 }).should("not.contain", "/account");
  });

  it("Orders route should be restricted to user", () => {
    cy.visit("/account/orders");
    cy.url({ timeout: 5000 }).should("not.contain", "/account");
  });

  it("Single order route should be restricted to user", () => {
    cy.visit("/account/orders/1");
    cy.url({ timeout: 5000 }).should("not.contain", "/account");
  });

  // Admin Routes
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
