
var loginForm =  {
    title: 'Login Page',
    fields:[
        {
            name: 'Email',
            type: 'email'
        },
        {
            name: 'password',
            type: 'password'
        }
    ]
}

var signupForm = {
    title: "Signup Page",
    fields : [
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
            values : ['faculty', 'student']
        }
    ]


}

export {loginForm, signupForm}
