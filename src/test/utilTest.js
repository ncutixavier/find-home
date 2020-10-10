import chaiHttp from 'chai-http'
import chai from 'chai'
import genPwd from '../utils/generatePassword'
import comparePassword from '../utils/comparePassword'
// import emailSend from '../utils/email'
// import nodemailer from 'nodemailer'

chai.use(chaiHttp)
const expect = chai.expect;

describe('Test Utils', () => {
    it('it should return a string', (done) => {
        expect(genPwd.generatePassword()).to.be.a('string')
        done()
    });

    it('it should compare password', async() => {
        let password = 'pf4ziB5w'
        let hashedPwd = '5r4fyyt566t56'
        expect(await comparePassword.correctPassword(password,hashedPwd)).to.be.false
    });
    
})