//required modules and packages
const router = require('express').Router();
const {adds} = require('../models/AddsModel');

const createadds = async (req, res) => {
    try {
        
        let request = req.body
        let payload = {
            title: request.title ? request.title : "",
            content: request.content,
            starttime: request.starttime,
            endtime: request.endtime
        }
        
        await new adds(payload).save()
        return res.status(200).send('Add created successfully')
    }
    catch (error) {
        console.log(error.message)
        return res.status(400).json(error.message)
    }
}
//to show the adds
const showAdd = async (req, res) => {
    try {
        let date = new Date();
        let advertisements = await adds.find({
            //aggregation were used for checking the adds times
            'starttime': { $lte: date },
            'endtime': { $gte: date },
            is_active: true
        });
        //to check there 'advertisements' is empty or not
        if (advertisements.length == 0) {
            return res.status(200).json([{ title: 'There is no ads, Contact to show your ad here' }])
        }
        return res.status(200).json(advertisements)
    }
    catch (error) {
        return res.status(200).send(error.message)
    }
}
//Update the exisiting adds using the _id
const updateAdd = async (req, res) => {
    try {
        let params = req.params.id
        let payload = req.body
        await adds.findOneAndUpdate({ _id: params }, payload)
        return res.status(200).json('update successfully')
    } catch (error) {
        return res.status(400).send(error.message)
    }
}
//delete the add 
const deleteAdd = async (req, res) => {
    try {
        let params = req.body
        console.log(params)
        if(req.body.title){
        let response = await adds.deleteOne({title:req.body.title})
        if(response.deletedCount == 0){
            res.status(404).send('There is no add in the name ')
        }
        else res.status(200).send(' add deleted successfully ')}
    } catch (error) {
        return res.send(error.message).status(400)
    }
}

module.exports = {
    createadds,
    showAdd,
    updateAdd,
    deleteAdd
}