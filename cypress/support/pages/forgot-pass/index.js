class ForgotPassPage {
    go() {

        cy.visit('/forgot-password')

        // checkpoint
        cy.get('form h1')
            .should('have.text', 'Recuperar senha')
    }

    submit(email) {

        cy.get('input[placeholder$=mail]')
            .type(email)

        cy.contains('button', 'Recuperar')
            .click()
    }

    noticeShouldBe(expectText) {

        cy.get('.notice p', { timeout: 10000 })
            .should('be.visible')
            .should('have.text', expectText)
    }

}

export default new ForgotPassPage