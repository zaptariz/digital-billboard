//required modules and packages
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const adminAuth = require('./middleware/admin_auth')
const { model, ads, usertoken } = require('./schema');


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
                res.json(tokenPayload).status(200)
                console.log("logged in Successfully ", tokenPayload.user)
            }
            else
                return res.json('credential not matched').status(400)
        }
        else
            return res.json('Email Id not found signup with your mail').status(400)
    }
    catch (error) {
        return res.status(404).send(error.message)
    }
})
//create a new add here
//adminAuth is a middileware to check the user were right user or not
router.post('/create_add', adminAuth, async (req, res) => {
    try {
        let request = req.body
        let payload = {
            title: request.title ? request.title : "",
            content: request.content,
            starttime: request.starttime,
            endtime: request.endtime
        }
        await new ads(payload).save()
        return res.json('Add created successfully').status(200)
    }
    catch (error) {
        console.log(error.message)
        return res.status(400).json(error.message)
    }
})
//to show the adds
router.get('/show_add', adminAuth, async (req, res) => {
    try {
        let date = new Date();
        let advertisements = await ads.find({
            //aggregation were used for checking the adds times
            'starttime': { $lte: date },
            'endtime': { $gte: date },
            is_active: true
        });
        //to check there 'advertisements' is empty or not
        if (advertisements.length == 0) {
            return res.json([{ title: 'There is no ads, Contact to show your ad here' }]).status(200)
        }
        return res.json(advertisements).status(200)
    }
    catch (error) {
        return res.json(error.message).status(200)
    }
})
//Update the exisiting adds using the _id
router.patch('/update_ads/:id', adminAuth, async (req, res) => {
    try {
        let params = req.params.id
        let payload = req.body
        await ads.findOneAndUpdate({ _id: params }, payload)
        return res.json('update successfully').status(200)
    } catch (error) {
        return res.json(error.message).status(400)
    }
})
//delete the add 
router.delete('/delete', adminAuth, async (req, res) => {
    try {
        let params = req.body
        await model.deleteOne({ name: params })
        return res.json('update successfully').status(200)
    } catch (error) {
        return res.json(error.message).status(400)
    }
})

//export the router 
module.exports = router
