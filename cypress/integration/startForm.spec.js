context("Multistep form", () => {
	beforeEach(() => {
    cy.visit('http://localhost:8080/')
	})
	describe.only('Intro step', () => {
		it('should not exist first step', () => {
			cy.get('#step-1')
			.should('not.exist')
		}) 
		it('should have instruction text', () => {
			cy.get('.form__step .step__text')
			.should('have.text', "Start checkout process")
		}) 
		it('should have button with text', () => {
			cy.get('.form__step button')
			.should('have.text', "Start")
		}) 
		it('click button and start the form', () => {
			cy.get('.form__step button')
			.click()
			.get(".form__step").should("be.hidden")
			cy.get('#step-1').should('be.exist')
		}) 
	})
	describe('First step', () => {
		it('should have step one visible', () => {
			cy.get('#step-1')
			.should("be.visible")
		}) 
		it('should have next button disabled', () => {
			cy.get('[data-cy="btn-next"]')
			.should('have.text', "Next")
		}) 
	})
})