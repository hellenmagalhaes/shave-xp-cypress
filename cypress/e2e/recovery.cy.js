import forgotPassPage from "../support/pages/forgot-pass"
import resetPassPage from "../support/pages/reset-pass"
import loginPage from "../support/pages/login"
import shaversPage from "../support/pages/shavers"

describe('esqueci minha senha', () => {

    it('deve poder solicitar o resgate de senha', () => {
        const user = {
            name: "João Esquecido",
            email: "joao@gmail.com",
            password: "pwd123",
            is_shaver: false
        }

        cy.createUser(user)
        forgotPassPage.go()
        forgotPassPage.submit(user.email)
        const message = 'Enviamos um e-mail para confirmar a recuperação de senha, verifique sua caixa de entrada.'
        forgotPassPage.noticeSuccessShouldBe(message)
    })

    context.only('quando o usuário solicita o resgate de senha', () => {

        const user = {
            name: "João Esquecido",
            email: "joao@gmail.com",
            password: "pwd123",
            is_shaver: false
        }

        beforeEach(() => {
            cy.createUser(user)
            cy.recoveryPass(user.email)
            cy.getToken(user.email)
            console.log();
        })

        it('deve poder cadastrar uma nova senha', () => {
            resetPassPage.go(Cypress.env('passToken'))
            resetPassPage.submit('abc123', 'abc123')
            const message = 'Agora você já pode logar com a sua nova senha secreta.'
            resetPassPage.noticeSuccessShouldBe(message)
        })

        afterEach(() => {
            loginPage.submit(user.email, 'abc123')
            shaversPage.header.shouldBeLoggedIn(user.name)
        })

    })
})