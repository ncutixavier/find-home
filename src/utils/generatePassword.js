// import bcrypt from 'bcrypt'

exports.generatePassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&?"

    let password = ''
    for (let i = 0; i < 8; i++) {
        let index = Math.floor(Math.random() * Math.floor(chars.length))
        password = password + chars[index]
    }
    return password
}