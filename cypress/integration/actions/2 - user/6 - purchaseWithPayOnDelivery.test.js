/// <reference types="cypress" />

const user = Cypress.env("testUser");

describe("Purchase a product with PAY ON DELIVERY method", () => {
  beforeEach(() => {});

  // it("Should add to cart", () => {
  //   cy.login({ email: user.email, password: user.password });
  //   cy.get(".ant-image-img").first().click();
  //   cy.get("[data-testid=addToCartBtn]").click();
  //   cy.contains("has been added to cart").should("exist");
  //   cy.wait(2000);
  // });

  // it("Should increase cart quantity", () => {
  //   cy.get('[data-testid="cartCounter"] > a > .anticon > svg').click();
  //   cy.contains("Cart").should("exist");
  //   cy.get(":nth-child(3) > .ant-btn").click();
  //   cy.contains("has been added to cart").should("exist");
  //   cy.wait(2000);
  //   cy.visit('/account')
  // });

  //   it("Should reduce cart quantity", () => {
  //     cy.get('[data-testid="cartCounter"] > a > .anticon > svg').click();
  //     cy.contains("Cart").should("exist");
  //     cy.get("[data-testid=cartCounter]")
  //       .invoke("text")
  //       .then((count) => {
  //         prevCartvalue = count;
  //       });
  //     cy.get(":nth-child(1) > .ant-btn").click();
  //     cy.wait(2000);
  //     cy.get("[data-testid=cartCounter]")
  //       .invoke("text")
  //       .then((count) => {
  //         expect(parseInt(count)).to.lt(parseInt(prevCartvalue));
  //       });
  //   });

  //   it.only("Should remove item from cart", () => {
  //     cy.get('[data-testid="cartCounter"] > a > .anticon > svg').click();
  //     cy.contains("Cart").should("exist");
  //     cy.get(":nth-child(2) > .anticon > svg").click();
  //     cy.contains('Empty').should('exist')
  //   });
});
