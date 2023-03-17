describe('login', () => {

    context('quando submeto o formulário', () => {
        it('deve logar com sucesso', () => {
            const user = {
                name: 'Hellen',
                email: 'hellenmagalhaes@yahoo.com.br',
                password: 'pwd123'
            }
            cy.visit('http://localhost:3000')
            cy.get('input[placeholder$="email"]').type(user.email)
            cy.get('input[placeholder*="senha"]').type(user.password)

            cy.contains('button', 'Entrar')
                .click()

            cy.get('.logged-user div a')
                .should('be.visible')
                .should('have.text', 'Olá, ' + user.name)

        })

        it('Não deve logar com senha incorreta', () => {
            const user = {
                name: 'Hellen',
                email: 'hellenmagalhaes@yahoo.com.br',
                password: '123456'
            }

            const mensagem = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            cy.visit('http://localhost:3000')
            cy.get('input[placeholder$="email"]').type(user.email)
            cy.get('input[placeholder*="senha"]').type(user.password)

            cy.contains('button', 'Entrar')
                .click()

            cy.get('.notice-container')
                .should('be.visible')
                .find('.error p')
                .should('have.text', mensagem)

        })

        it('Não deve logar com email não cadastrado', () => {
            const user = {
                name: 'Hellen',
                email: 'hellenmagalhaes@404.com',
                password: '123456'
            }

            const mensagem = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            cy.visit('http://localhost:3000')
            cy.get('input[placeholder$="email"]').type(user.email)
            cy.get('input[placeholder*="senha"]').type(user.password)

            cy.contains('button', 'Entrar')
                .click()

            cy.get('.notice-container')
                .should('be.visible')
                .find('.error p')
                .should('have.text', mensagem)

        })

    })

})