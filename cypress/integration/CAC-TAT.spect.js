/**
 *A referencia a baixo, ajuda no autocomplete
 */
/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", function () {
  //Visita o site primeiro, depois executa o teste
  beforeEach(function () {
    cy.visit("./src/index.html");
  });

  it("verifica o título da aplicação", function () {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatórios e envia o formulário", function () {
    cy.get("#firstName").type("John");

    cy.get("#lastName").type("Doe");

    cy.get("#email").type("johndoe@teste.com");

    cy.get("#open-text-area").type("Lorem Ipsum");

    cy.contains("button", "Enviar").click();

    cy.get(".success").should("be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", function () {
    cy.get("#firstName").type("John");

    cy.get("#lastName").type("Doe");

    cy.get("#email").type("johndoe@testecom");

    cy.get("#open-text-area").type("Lorem Ipsum");

    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });

  it("verifica se o campo telefone está vazio", function () {
    cy.get("#phone").type("lorem ipsum").should("have.value", "");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function () {
    cy.get("#firstName").type("John");

    cy.get("#lastName").type("Doe");

    cy.get("#email").type("johndoe@teste.com");

    cy.get("#phone-checkbox").click();

    cy.get("#open-text-area").type("Lorem Ipsum");

    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", function () {
    cy.get("#firstName")
      .type("John")
      .should("have.value", "John")
      .clear()
      .should("have.value", "");

    cy.get("#lastName")
      .type("Doe")
      .should("have.value", "Doe")
      .clear()
      .should("have.value", "");

    cy.get("#email")
      .type("johndoe@teste.com")
      .should("have.value", "johndoe@teste.com")
      .clear()
      .should("have.value", "");

    cy.get("#phone")
      .type("12345678")
      .should("have.value", "12345678")
      .clear()
      .should("have.value", "");
  });

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", function () {
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });

  it("envia o formuário com sucesso usando um comando customizado", function () {
    cy.fillMandatoryFieldsAndSubmit();

    cy.get(".success").should("be.visible");
  });
});
