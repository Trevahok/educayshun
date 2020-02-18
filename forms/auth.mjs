import constants from '../constants.mjs'

var loginForm =  {
    title: 'Login Page',
    fields:[
        {
            name: 'Email',
            type: 'email',
            attrs:{
                placeholder: 'Enter your email id... '
            }
        },
        {
            name: 'password',
            type: 'password',
            attrs:{
                placeholder: 'Enter your password... '
            }
        }
    ]
}

var signupForm = {
    title: "Signup Page",
    fields : [
        {
            name: 'name',
        },
        {
            name: 'Email',
            type: 'email'
        },
        {
            name: 'Password',
            type: 'password'
        },
        {
            name: 'Confirm Password',
            type: 'password'
        },
        {
            name: 'Address',
            widget: 'textarea'

        },
        {
            name: 'Role',
            widget:'select',
            values : [constants.faculty ,constants.student]
        }
    ]


}

export {loginForm, signupForm}
