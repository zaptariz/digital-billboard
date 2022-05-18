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

//export the router 
module.exports = router
