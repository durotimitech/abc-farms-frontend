/// <reference types="cypress" />

let prevCartvalue;
const user = Cypress.env("testUser");

describe("Actions related to cart", () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("Should add to cart", () => {
    cy.wait(5000);
    cy.get('[alt="Logo"]').first().click();
    cy.wait(5000);
    cy.get(".ant-image-img").first().click({ force: true });
    cy.wait(5000);
    cy.get("[data-testid='addToCartBtn']", { timeout: 10000 }).click();
    cy.wait(5000);
    cy.get("[data-testid=cartCounter]")
      .invoke("text")
      .then((count) => {
        if (count) {
          prevCartvalue = count;
        } else {
          prevCartvalue = 0;
        }
      });
    cy.contains("has been added to cart").should("exist");
    cy.wait(2000);
    cy.get("[data-testid=cartCounter]")
      .invoke("text")
      .then((count) => {
        expect(parseInt(count)).to.gt(parseInt(prevCartvalue));
      });
  });

  it("Should increase cart quantity", () => {
    cy.get('[data-testid="cartCounter"] > a > .anticon > svg').click();
    cy.contains("Cart").should("exist");
    cy.get("[data-testid=cartCounter]")
      .invoke("text")
      .then((count) => {
        prevCartvalue = count;
      });
    cy.get(":nth-child(3) > .ant-btn").click();
    cy.contains("has been added to cart").should("exist");
    cy.wait(2000);
    cy.get("[data-testid=cartCounter]")
      .invoke("text")
      .then((count) => {
        expect(parseInt(count)).to.gt(parseInt(prevCartvalue));
      });
  });

  it("Should reduce cart quantity", () => {
    cy.get('[data-testid="cartCounter"] > a > .anticon > svg').click();
    cy.contains("Cart").should("exist");
    cy.get("[data-testid=cartCounter]")
      .invoke("text")
      .then((count) => {
        prevCartvalue = count;
      });
    cy.get(":nth-child(1) > .ant-btn").click();
    cy.wait(2000);
    cy.get("[data-testid=cartCounter]")
      .invoke("text")
      .then((count) => {
        expect(parseInt(count)).to.lt(parseInt(prevCartvalue));
      });
  });

  it("Should remove item from cart", () => {
    cy.get('[data-testid="cartCounter"] > a > .anticon > svg').click();
    cy.contains("Cart").should("exist");
    cy.get(":nth-child(2) > .anticon > svg").click();
    cy.contains("Empty").should("exist");
  });
});
