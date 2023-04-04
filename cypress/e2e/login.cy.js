import loginPage from "../support/pages/login"
import shaversPage from "../support/pages/shavers"
import data from '../fixtures/users-login.json'

describe('login', () => {

    context('quando submeto o formulário', () => {

        it('deve logar com sucesso', () => {
            const user = data.success

            cy.createUser(user)
            loginPage.submit(user.email, user.password)
            shaversPage.header.shouldBeLoggedIn(user.name)
        })

        it('Não deve logar com senha incorreta', () => {
            const user = data.invpass
            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            loginPage.submit(user.email, user.password)
            loginPage.noticeShouldBe(message)
        })

        it('Não deve logar com email não cadastrado', () => {
            const user = data.email404
            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            loginPage.submit(user.email, user.password)
            loginPage.noticeShouldBe(message)
        })

        it('campos obrigatórios', () => {
            loginPage.submit()
            loginPage.requiredFields('E-mail é obrigatório', 'Senha é obrigatória')
        })

    })

    context('senha muito curta', () => {

        data.shortpass.forEach((p) => {

            it(`não deve logar com a senha: ${p}`, () => {
                loginPage.submit('hellenmagalhaes@yahoo.com.br', p)
                loginPage.alertShouldBe('Pelo menos 6 caracteres')
            })
        })

    })

    context('email inválido', () => {

        data.invemail.forEach((e) => {
            it(`email no formato incorreto: ${e}`, () => {
                loginPage.submit(e, 'pwd123')
                loginPage.alertShouldBe('Informe um email válido')
            })
        })

    })

})