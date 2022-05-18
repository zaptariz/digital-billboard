//required modules and packages
const router = require('express').Router();
const bcrypt = require('bcrypt');
const { model } = require('./schema');

//create a Registration API
router.post('/signup', async (req, res) => {
    try {
        // Encrypt the password
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const request = req.body
        //Check the user is exists
        let email_check = await model.findOne({ email_id: req.body.email_id })
        if (!email_check) {
            //insert to DB
            const response = await new model(request).save()
            console.log('response : \n', response)
            return res.json(response).status(200)
        }
        else {
            res.json('Bad Request Email already found').status(400)
        }
    }
    catch (error) {
        console.log("error.message", error.message)
        res.json(error.message)
    }
})

//create a  signin ( login ) API
router.post('/signin', async (req, res) => {
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
            if (psswd_vald)
                res.json('log in successfull').status(200)
            else
                res.json('credential not matched').status(400)
        }
        else
            res.json('Email Id not found signup with your mail').status(400)
    }
    catch (error) {
        res.send(error.message).status(400)
    }
})

//export the router 
module.exports = router
