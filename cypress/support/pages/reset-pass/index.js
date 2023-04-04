class ResetPassPage {
    go(token) {
        cy.visit('/reset-password?token=' + token)
        cy.get('form h1')
            .should('have.text', 'Resetar senha')
    }

    submit(newPass, confirmPass) {
        cy.get('input[placeholder="Nova senha"]')
            .type(newPass)
        cy.get('input[placeholder="Confirmação de senha"]')
            .type(confirmPass)
        cy.contains('button', 'Alterar senha')
            .click()
    }

    noticeShouldBe(expectText) {
        cy.get('.notice p', { timeout: 10000 })
            .should('be.visible')
            .should('have.text', expectText)
    }
}

export default new ResetPassPage()