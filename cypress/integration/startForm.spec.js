context("Multistep form", () => {
	
	describe('Fill in the form', () => {
		beforeEach(() => {
			cy.visit('http://localhost:8080/')
		})
	
		it('should exist intro', () => {
			cy.get('.l-column')
			.should('be.visible')
		}) 
		it('click button and start the form', () => {
			cy.get('[data-cy="btn-start"]')
			.click()
			.get('[data-cy="intro"]').should("not.exist")
			cy.get('form').should('be.exist')
		}) 
		it('fill in the fields and enable next', () => {
			cy.get('[data-cy="btn-start"]')
			.click()
			cy.get('[data-cy="btn-next"]')
			.should("be.disabled")
			cy.get('input#firstName').type("John")
			cy.get('input#lastName').type("Doe")
			cy.get('input#username').type("github")
			.should("be.visible")
			cy.get('[data-cy="btn-next"]')
			.should("be.enabled")
			.click()
		}) 
		
	})
})