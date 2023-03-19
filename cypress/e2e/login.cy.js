import loginPage from "../support/pages/login"
import shaversPage from "../support/pages/shavers"

describe('login', () => {

    context('quando submeto o formulário', () => {
        it('deve logar com sucesso', () => {
            const user = {
                name: 'Hellen',
                email: 'hellenmagalhaes@yahoo.com.br',
                password: 'pwd123'
            }

            loginPage.submit(user.email, user.password)
            shaversPage.header.shouldBeLoggedIn(user.name)


        })

        it('Não deve logar com senha incorreta', () => {
            const user = {
                name: 'Hellen',
                email: 'hellenmagalhaes@yahoo.com.br',
                password: '123456'
            }

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            loginPage.submit(user.email, user.password)
            loginPage.noticeShouldBe(message)

        })

        it('Não deve logar com email não cadastrado', () => {
            const user = {
                name: 'Hellen',
                email: 'hellenmagalhaes@404.com',
                password: '123456'
            }

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            loginPage.submit(user.email, user.password)
            loginPage.noticeShouldBe(message)

        })

        it('campos obrigatórios', () => {
            loginPage.submit()
            loginPage.requiredFields('E-mail é obrigatório','Senha é obrigatória')

        })

    })

    context('senha muito curta', () => {
        const passwords = [
            '1',
            '12',
            '123',
            '1234',
            '12345'
        ]

        passwords.forEach((p) => {
            it(`não deve logar com a senha: ${p}`, () => {
                loginPage.submit('hellenmagalhaes@yahoo.com.br', p)
                loginPage.alertShouldBe('Pelo menos 6 caracteres')

            })

        })

    })

    context('email inválido', () => {
        const email = [
            'hellen_magalhaes&yahoo.com.br',
            'hellen_magalhaes.com.br',
            '@yahoo.com.br',
            '@',
            'hellen_magalhaes@',
            '123131313',
            '@#$%&*'
        ]

        email.forEach((e) => {
            it(`email no formato incorreto: ${e}`, () => {
                loginPage.submit(e, 'pwd123')
                loginPage.alertShouldBe('Informe um email válido')

            })

        })

    })

})