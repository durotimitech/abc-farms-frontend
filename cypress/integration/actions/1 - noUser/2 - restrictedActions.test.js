/// <reference types="cypress" />

describe("These actions are prohibited", () => {
  it("should not add to cart", () => {
    cy.visit("/");
    cy.get(".ant-image-img").first().click();
    cy.get('[data-testid="addToCartBtn"]', { timeout: 10000 }).click();
    cy.url().should("contain", "/auth/login");
  });
});
