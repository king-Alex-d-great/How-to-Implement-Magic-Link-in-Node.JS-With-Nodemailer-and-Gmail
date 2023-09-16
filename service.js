const nodeMailer = require("nodemailer");
const jwt = require("jsonwebtoken");

exports.getTransport = () => nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});

exports.generateToken = (email) => {
    const expirationDate = new Date();
    expirationDate.setMinutes(new Date().getMinutes() + 45);
    return jwt.sign({ email, expirationDate }, process.env.JWT_SECRET_KEY);
};

exports.getMailOptions = (email, link) => {
    let body = `
  <h2>Hey ${email}</h2>
  <p>Here's the special magic link you requested:</p>
  <p>${link}</p>
  <p>Please note that for added security this link becomes invalid after 45 minutes</p>
  <p>Stay Jiggy</p>`;

    return {
        body,
        subject: "Urgent: Super Secret Magic Link",
        to: email,
        html: body,
        from: process.env.EMAIL_ADDRESS,
    };
};