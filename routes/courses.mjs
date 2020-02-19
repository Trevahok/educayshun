import express from 'express'
import {courseForm } from '../forms/courses.mjs'
import { loginRequiredMiddleware } from "../middlewares/auth.mjs";
import { accessRequiredMiddleware } from '../middlewares/auth.mjs';
import constants from '../constants.mjs'
import { Course } from '../models/courses.mjs';
import { Student, Faculty } from '../models/auth.mjs';
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
        var fac = await  Faculty.findOne({_id: req.session.user.id})

        fac.courses.push(course)
        fac.save()
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }

    req.flash('Edited successfully !')
    res.redirect('/courses')

})

router.get('/:id/edit', loginRequiredMiddleware,  accessRequiredMiddleware(constants.faculty), async (req, res) => {
    const instance = await Course.findOne({_id: req.params.id})
    console.log(instance);
    
    if( !instance )
        res.sendStatus( 404 )
    res.render('toasty' , { form: { values: instance ,...courseForm}})

})
router.post('/:id/edit', loginRequiredMiddleware,  accessRequiredMiddleware(constants.faculty), async (req, res) => {

    const {error, value}  = await courseValidator.validate({  instructor: req.session.user.name,  ...req.body})
    if(error) return res.render('toasty', {form: {  values: value, ...courseForm } , errors: error.details.map( o=> o.message)} )

    try {
        var doc = await Course.findOneAndUpdate({_id : req.params.id}, {
                title: value.title,
                from: value.from,
                to: value.to,
                capacity: value.capacity,
                instructor: value.instructor
        });
        var instance = await doc.save()
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
    req.flash('Edited successfully !')
    res.redirect('/courses')
})
router.get('/:id/delete', loginRequiredMiddleware,  accessRequiredMiddleware(constants.faculty), async (req, res) => {
    try {
        var doc = await Course.findOneAndDelete({_id: req.params.id})
        if(!doc) return res.statusCode(404)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
        
    }
    req.flash('Deleted successfully !')
    res.redirect('/courses')

})
router.get('/:id/enroll', loginRequiredMiddleware,  accessRequiredMiddleware(constants.student), async (req, res) => {

    try {
        const course =  await Course.findOne({_id: req.params.id})
        console.log(course)
        if( !course )
            res.sendStatus( 404 )
        const stud =  await Student.findOne({_id: req.session.user.id})
        console.log(req.session.user.id)
        console.log('stud', stud)
        course.students.push(stud)
        course.save()
        stud.courses.push(course)
        stud.save()

    
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
        
    }
    req.flash('Successfully Enrolled !')
    res.redirect('/courses')

})
router.get('/:id/detail', loginRequiredMiddleware , async (req, res) => {
    try {
        const course =  await Course.findOne({_id: req.params.id})
        console.log(course)
        if( !course )
            res.sendStatus( 404 )
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
        
    }

    res.render('courseDetail', {course})
})
export default router