import express from 'express'
import {signupForm , loginForm } from '../forms/auth.mjs'
import {loginValidator, signupValidator} from '../validators/auth.mjs'
const router = express.Router()

router.get('/login', async (req, res ) =>{
    res.render('toasty', {form: loginForm})
})

router.post('/login', async (req, res ) =>{
    const {error, value} = await loginValidator.validate(req.body, {abortEarly: false})

    if(error) return res.render('toasty', {form: loginForm, errors: error.details.map( o => o.message) })

    res.json(req.body)

})

router.get('/signup', async (req, res ) =>{
    res.render('toasty', {form: signupForm })

})

router.post('/signup', async (req, res ) =>{
    const {error } = await signupValidator.validate(req.body, {abortEarly: false})
    if(error) return res.render('toasty', {form: signupForm, errors: error.details.map( o => o.message )} )

    res.json(req.body)

})


export default router