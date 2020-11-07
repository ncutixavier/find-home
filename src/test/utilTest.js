import chaiHttp from 'chai-http'
import chai from 'chai'
import genPwd from '../utils/generatePassword'
import comparePassword from '../utils/comparePassword'
import passwordResetToken from '../utils/passwordResetToken'
import messageMock from '../utils/messageMocks'
import paginator from '../utils/paginate'
// import emailSend from '../utils/email'
// import nodemailer from 'nodemailer'

chai.use(chaiHttp)
const expect = chai.expect;

describe('Test Utils', () => {
    it('it should return a string', (done) => {
        expect(genPwd.generatePassword()).to.be.a('string')
        done()
    });

    it('it should compare password', async () => {
        let password = 'pf4ziB5w'
        let hashedPwd = '5r4fyyt566t56'
        expect(await comparePassword.correctPassword(password, hashedPwd)).to.be.false
    });

    it('it should return reset token', async () => {
        let email = 'ncuti65@gmail.com'
        expect(await passwordResetToken.createPasswordResetToken(email)).to.be.a('string')
    });

    it('it should return reset password message', async () => {
        let url = 'http://localhost:3002/api/v1/users'
        expect(messageMock.resetPasswordMessage(url)).to.be.a('string')
    });

    it('it should return sign up message', async () => {
        let email = 'ncuti@yahoo.fr'
        expect(messageMock.signUpMessage(email)).to.be.a('string')
    });

    it('it should return pagination', async () => {
        let query = {where: {userId: 1}}
        let paging = {page: 1, limit: 10}
        expect(paginator.paginate(query, paging)).to.be.an('object')
    });
})