exports.signUpMessage = (email, password, role) => {
    return `
    <div style="font-size:15px;box-shadow:4px 4px 2px;padding:10px;color:#000">
    <h1 style="font-size:25px;color:#2E86C1;">Find Home App - Registration</h1>
    <p style="color:#000;font-size:17px">Thank you for registering on find-home as <b>${role}</b>, we're looking for you to be a good partner.
    You should use the credentials below to sign in:<p>
    
    Email: <b style="color:#2E86C1">${email}</b><br>
    Password: <b style="background-color:#2E86C1;color:#fff">${password}</b>
    </div>
    `
}

exports.resetPasswordMessage = resetUrl =>{
    return `
    <div style="font-size:15px;box-shadow:4px 4px 2px;padding:10px;color:#000">
    <h1 style="font-size:25px;color:#2E86C1;">Find Home App - Reset Password</h1>
    <p style="color:#000;font-size:17px">You have received email with this link ${resetUrl} to reset your password.
    If you did not forgot your password, please ignore this message.<p>
    </div>
    `
}