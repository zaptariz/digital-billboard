//required Models
const router = require('express').Router()
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')
const { model } = require('../models/UserModel');
const { usertoken } = require('../models/JwtToken');

/*********************************
 * User registration.
 *
 * @param {string}      firstName
 * @param {string}      lastName
 * @param {string}      email
 * @param {string}      password
 * 
 * @returns {function}
 *********************************/

exports.signup = router.post('/signup', async (req, res) => {
    try {
        // Encrypt the password
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const request = req.body
        //Check the user is exists
        let email_check = await model.findOne({
            email_id: req.body.email_id
        })
        if (!email_check) {
            //insert to DB
            const response = await new model(request).save()
            return res.status(200).json(response)
        } else res.status(400).send(' Email already registered ')
    } catch (error) {
        res.status(401).json(error.message)
    }
})

/********************************
 * User login.
 *
 * @param {string}      email
 * @param {string}      password
 *
 * @returns {function}
 ********************************/

exports.signin = router.post('/signin', async (req, res) => {
    try {
        let email_check = await model.findOne({ email_id: req.body.email_id })
        let email_password = email_check.password
        if (email_check) {
            //this password from request
            let pas_from_user = req.body.password
            // this password from DB
            let pas_fromm_db = email_password
            //encrypt the password and save to psswd_vald for validation purpose
            let psswd_vald = await bcrypt.compare(pas_from_user, pas_fromm_db);
            if (psswd_vald) {
                let payload = {
                    id: email_check._id,
                    email: email_check.email_id
                }
                let token = jwt.sign(payload, "secret")
                // console.log('payload : ',payload, token)
                let tokenPayload = {
                    user: email_check._id,
                    token: token
                }
                //save the tokan in usertoken
                await new usertoken(tokenPayload).save()
                res.status(200).json(tokenPayload)
                console.log("logged in Successfully ", tokenPayload.user)
            }
            else
                return res.status(400).json('credential not matched')
        }
        else
            return res.status(400).json('Email Id not found signup with your mail')
    }
    catch (error) {
        return res.status(404).send(error.message)
    }
})