import express from 'express'
import {courseForm } from '../forms/courses.mjs'
import { loginRequiredMiddleware } from "../middlewares/auth.mjs";
import { accessRequiredMiddleware } from '../middlewares/auth.mjs';
import constants from '../constants.mjs'

const router =   express.Router()

router.get('/', loginRequiredMiddleware, accessRequiredMiddleware(constants.faculty), async (req, res) => {

    res.render( 'toasty', {form: courseForm })


})

router.post('/', loginRequiredMiddleware,  accessRequiredMiddleware(constants.faculty), async (req, res) => {
    cons
    res.render('toasty', {form: {  values: req.body, ...courseForm, } } )

})

export default router