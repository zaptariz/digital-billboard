const jwt = require('jsonwebtoken')
const { model, usertoken } = require('../schema')

module.exports = async (req, res, next) => {
    try {
        let header = req.headers.authorization
        let verify_token = await jwt.verify(header, "secret")
        let check_token = await usertoken.findOne({ token: header, user: verify_token.id })
        if (!check_token && check_token.is_deleted) {
            throw new Error(" Token not found ")
        }
        else {
            let find_mail = await model.findOne({ email_id: verify_token.email })
            if (find_mail) {
                if (find_mail.role == 2) {
                    req.user = find_mail
                    next()
                }
                else throw new Error("Authentication failed. Your request could not be authenticated.")
            }
            else throw new Error("email id not found")
        }
    }
    catch (error) {
        return res.status(401).json(error.message);
    }
};