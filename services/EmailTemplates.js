export const ForgotPasswordEmail = (user, resetPasswordLink, EMAIL_FROM) => {
  return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Password reset</title>
                <style>
                    .btn {
                    background-color: #04AA6D;
                    border: none;
                    color: white;
                    padding: 8px 20px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    margin: 2px 2px; 
                    border-radius: 5px;
                    }
                    .btn a {
                    color: white;
                    text-decoration: none;
                    }

                    .btn:hover {
                    background-color: green;
                    }

                </style>
            </head>
            <body>
                <div>
                    <p>Hi, <span style="font-weight: bold;">${user.name}</span>,</p> 

                    <p>You are receiving this because you (or someone else) requested 
                    the reset of your <a href="https://user-crud-app-prakash.netlify.app/"> User Management App </a> account.
                    <br>
                    Select the button to reset your password.</p>

                    <button class = "btn"><a href=${resetPasswordLink}>Reset Password</a></button>
                    
                    <p>If this was you, you can safely ignore this email.<br>
                    If not, please reach out to us at <a href="mailto:${EMAIL_FROM}">email us</a> for help.</p>

                    <p>Thanks & Regards,<br>
                    Prakash & Company Pvt. Ltd.</p>

                </div>
            </body> `; // Html Body Ending Here;
};

export const ResetPasswordSuccessEmail = (user, EMAIL_FROM) => {
  return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Password reset successful</title>
            </head>
            <body>
                <div>
                    <p>Hi, <span style="font-weight: bold;">${user.name}</span>,</p> 

                    <p>Your password has been reset successfully.<br> 
                    Go to <a href="https://user-crud-app-prakash.netlify.app/"> User Management App </a> and login with your new login credentials.</p>
                    
                    <p>If this was you, you can safely ignore this email.<br>
                    If not, please reach out to us at <a href="mailto:${EMAIL_FROM}">email us</a> for help.</p>

                    <p>Thanks & Regards,<br>
                    Prakash & Company Pvt. Ltd.</p>

                </div>
            </body>`; // Html Body Ending Here.
};

export const UserRegistrationEmail = (user, EMAIL_FROM) => {
  return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>User Registration</title>
            </head>
            <body>
                <div>
                    <p>Hi, <span style="font-weight: bold;">${user.name}</span>,</p> 

                    <p>You are receiving this because you have successfully registered with 
                    <a href="https://user-crud-app-prakash.netlify.app/"> User Management App </a> user account.</p>
                    
                    <p>
                    If you have any query, please reach out to us at <a href="mailto:${EMAIL_FROM}">email us</a> for help.</p>

                    <p>Thanks & Regards,<br>
                    Prakash & Company Pvt. Ltd.</p>

                </div>
            </body>`; // Html Body Ending Here.
};

export const EmailVerificationThroughOTPEmail = (user, OTP, EMAIL_FROM) => {
  return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>email verification OTP</title>
            </head>
            <body>
                <div>
                    <p>Hi, <span style="font-weight: bold;">${user.email}!</span>, Welcome to User Management App.</p> 

                    <p>You are receiving this because you have created the 
                    new user account on <a href="https://user-crud-app-prakash.netlify.app/"> User Management App </a>.<br>
                    
                    You are requested to enter the one-time password (OTP) provided in this email.</p>
                    <p>Your OTP is : <span style="font-weight: bold; font-size: 20px; letter-spacing: 2px;">${OTP}</span>.</p>
                    <p>Your OTP will expire in <span style="font-weight: bold;">10 min.</span><br>
                    
                    For any query please reach out to us at <a href="mailto:${EMAIL_FROM}">email us</a>.</p>

                    <p>Thanks & Regards,<br>
                    Prakash & Company Pvt. Ltd.</p>

                </div>
            </body>`; // Html Body Ending Here.
};

