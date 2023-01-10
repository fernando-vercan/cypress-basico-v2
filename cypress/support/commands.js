Cypress.Commands.add("fillMandatoryFieldsAndSubmit", function () {
  cy.get("#firstName").type("John");

  cy.get("#lastName").type("Doe");

  cy.get("#email").type("johndoe@teste.com");

  cy.get("#open-text-area").type("Lorem Ipsum");

  cy.contains("button", "Enviar").click();
});
