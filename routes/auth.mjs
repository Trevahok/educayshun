import express from 'express'
import { signupForm, loginForm } from '../forms/auth.mjs'
import { loginValidator, signupValidator } from '../validators/auth.mjs'
import { Student, Faculty } from '../models/auth.mjs'
import bcrypt from 'bcrypt'
import constants from '../constants.mjs'

import { loginRequiredMiddleware} from '../middlewares/auth.mjs'
const router = express.Router()

async function passwordHasher( password ){
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(  password, salt ) 
    return hashed
}

router.get('/login', async (req, res) => {
    res.render('toasty', { form: loginForm })
})

router.post('/login', async (req, res) => {
    const { error, value } = await loginValidator.validate(req.body, { abortEarly: false })

    if (error) return res.render('toasty', { form: {values: req.body, ...loginForm}, errors: error.details.map(o => o.message), })

    const student = await Student.findOne({ email: value.email })
    const faculty = await Faculty.findOne({ email: value.email })

    var user = {}
    var model ;
    if (student){

        user = {
            id: student.id, 
            role: constants.student,
            name: student.name
        }
        model = student
    }
    
    else if (faculty) {

        user = {
            id: faculty.id, 
            role: constants.faculty,
            name: faculty.name
        }
        model = faculty
    }
    else
        return res.render('toasty', { form: loginForm, errors: ['No such user found! Please enter valid email address. '] })

    const validpass = await bcrypt.compare( req.body.password, model.password)

    if( !validpass ) 
        return res.render('toasty', { form: {values: req.body, ...loginForm}, errors: ['Invalid Password!'] })

    req.session.user = user
    req.session.save()

    if( req.query['next'] )
        return res.redirect(req.query['next'])
    else
        return res.redirect('/')

})

router.get('/signup', async (req, res) => {
    res.render('toasty', { form: signupForm })

})

router.post('/signup', async (req, res) => {
    const { error, value } = await signupValidator.validate(req.body, { abortEarly: false })
    console.log(req.body)
    if (error) return res.render('toasty', { form: { values: req.body, ...signupForm }, errors: error.details.map(o => o.message) })

    if (value.role === constants.student) {
        try {

            const st = await new Student({
                email: value.email,
                name: value.name,
                address: value.address,
                password: await passwordHasher( value.confirmPassword ) ,
            })
            var instance = await st.save()
            req.session.user = {
                id: instance.id,
                role: constants.student,
                name: instance.name
            }
            req.session.save()
            return res.redirect('/')
        } catch (err) {
            console.log(err)
            return res.statusCode(500)
        }

    }
    else {
        try {
            const fac = await new Faculty({
                email: value.email,
                name: value.name,
                address: value.address,
                password: await passwordHasher( value.confirmPassword ),
            })
            var instance = await fac.save()

            req.session.user = {
                id: instance.id,
                role: constants.faculty,
                name: instance.name
            }
            req.session.save()
            return res.redirect('/')
        } catch (err) {
            console.log(err)
            return res.statusCode(500)
        }

    }

})

router.get('/logout', async (req, res) =>{
    req.session.destroy()
    return res.redirect('/')
})

router.get('/profile', loginRequiredMiddleware, async (req, res) =>{
    try {
        
        var student = await Student.findOne({ _id :  req.session.user.id }).populate('courses')
        var faculty = await Faculty.findOne({ _id :  req.session.user.id }).populate('courses')

        if( !student && !faculty  ) res.sendStatus(404)


    } catch (error) {
        console.log(error)
        res.sendStatus(500)
        
    }
    res.render('profile' , {profile: student || faculty})
})

export default router