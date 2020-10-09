import bcrypt from 'bcrypt'

exports.correctPassword = async function(candidatepassword, userPassword){
    return await bcrypt.compare(candidatepassword, userPassword)
}