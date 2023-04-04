import signupPage from "../support/pages/signup"
import data from '../fixtures/users-signup.json'
import loginPage from "../support/pages/login"
import shaversPage from "../support/pages/shavers"

describe('signup', () => {

    context('quando submeto o formulário', () => {

        it('deve criar um novo usuário e logar com sucesso', () => {
            const user = data.success
            const message = 'Boas vindas, faça login para solicitar serviços!'

            cy.deleteUser(user.email)
            signupPage.go()
            signupPage.submit(user.name, user.email, user.password)
            signupPage.noticeShouldBe(message)
            loginPage.submit(user.email, user.password)
            shaversPage.header.shouldBeLoggedIn(user.name)
        })

        it('não deve permitir cadastro de usuário duplicado', () => {
            const user = data.duplicated
            const message = 'Oops! E-mail já cadastrado.'

            cy.createUser(user)
            signupPage.go()
            signupPage.submit(user.name, user.email, user.password)
            signupPage.noticeErrorShouldBe(message)
        })

        it('campos obrigatórios', () => {
            signupPage.go()
            signupPage.submit()
            signupPage.requiredFields('Nome é obrigatório', 'E-mail é obrigatório', 'Senha é obrigatória')
        })

        context('senha muito curta', () => {

            data.shortpass.forEach((p) => {

                it(`não deve cadastrar com a senha: ${p}`, () => {
                    signupPage.go()
                    signupPage.submit('Hellen', 'senhamuitocurta@yahoo.com.br', p)
                    signupPage.alertShouldBe('Pelo menos 6 caracteres')
                })
            })

        })

        context('email inválido', () => {

            data.invemail.forEach((e) => {
                it(`email no formato incorreto: ${e}`, () => {
                    signupPage.go()
                    signupPage.submit('Hellen', e, 'pwd123')
                    signupPage.alertShouldBe('Informe um email válido')
                })
            })

        })

    })

})