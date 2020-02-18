import express from 'express'
import {courseForm } from '../forms/courses.mjs'
import { loginRequiredMiddleware } from "../middlewares/auth.mjs";
import { accessRequiredMiddleware } from '../middlewares/auth.mjs';
import constants from '../constants.mjs'
import { Course } from '../models/courses.mjs';
import { courseValidator } from '../validators/courses.mjs';

const router =   express.Router()

router.get('/', loginRequiredMiddleware, async(req, res) =>{
    const courses  = await Course.find()
    
    res.render('courses/courses',{ courses })

})
router.get('/add', loginRequiredMiddleware, accessRequiredMiddleware(constants.faculty), async (req, res) => {
    res.render( 'toasty', {form: courseForm })

})

router.post('/add', loginRequiredMiddleware,  accessRequiredMiddleware(constants.faculty), async (req, res) => {
    const {error, value}  = await courseValidator.validate({  instructor: req.session.user.name,  ...req.body})
    if(error) return res.render('toasty', {form: {  values: value, ...courseForm } , errors: error.details.map( o=> o.message)} )
    try {
        const course = await new Course({
            title: value.title,
            from: value.from,
            to: value.to,
            capacity: value.capacity,
            instructor: value.instructor
        })

        var instance = await course.save()
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
        
        
    }

    res.render('toasty', {form: courseForm, messages:[ 'Success!']})
})

export default router