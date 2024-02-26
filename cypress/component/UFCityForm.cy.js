import UFCityForm from "../../src/containers/UFCityForm";

describe('UFCityForm', () => {
    beforeEach(() => {
        cy.mount(<UFCityForm />);
    });

    it('Formulário sendo renderizado', () => {
        cy.contains('Selecione um estado (UF)').should('exist');
        cy.contains('Selecione uma cidade').should('exist');
        cy.contains('Enviar').should('exist');
    });

    it('Envio com campos vazios', () => {
        cy.contains('Enviar').click();
        cy.contains('Seleção obrigatória').should('exist');
    });

    it('Selecionando opções', () => {
        cy.get('input').contains('São Paulo (SP)').select();
        cy.get('input').contains('Campinas').select();

        cy.get('input').should('have.value', 'São Paulo (SP)');
        cy.get('input').should('have.value', 'Campinas');
    });
});
