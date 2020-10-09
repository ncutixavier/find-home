import chaiHttp from 'chai-http'
import chai from 'chai'
import genPwd from '../utils/generatePassword'
// import emailSend from '../utils/email'

chai.use(chaiHttp)
const expect = chai.expect;

describe('Test Utils', () => {
    it('it should return a string', (done) => {
        expect(genPwd.generatePassword()).to.be.a('string')
        done()
    });

    // it('it should send email', (done) => {
    //     const Options = {email:"ncuty@yahh.com",password:"password"}
    //     expect(emailSend.sendEmail(Options)).to.be.a('function')
    //     done()
    // });
})