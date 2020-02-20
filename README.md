# Educayshun 
### Learn what you couldn't learn in class, online
---- 

## Features:

- Enroll as teacher
- Enroll as student
- Add courses , if teacher
- Enroll for a course as a student 

## Tech Stack: 
---
- Custom Generic Form rendering  - i'm gonna call it Toasty Forms , in loving memory of Django Crispy Forms
- Custom Auth framework based on Sessions for Server Side Rendering - could have used Passport.js , but really wanted to re-learn things from scratch in JS this time. 
- Custom flash messages framework. 
- @hapi/joi - Form validation
- express - base web framework
- bootstrap/ bootswatch - UI framework
- Pug - Templating Engine
- bcrypt - for salted hashing of password
- mongoose - for storing data in MongoDB 
- datatables - for sorting and filtering Tables in HTML

---

## To run: 

```bash

npm install
npm start

```
### Flash messages framework
---
Flash messages using `req.session.messages` and `req.session.errors` which can be accessed by Pug as `messages` and `errors` context variables.

It can be used using `req.flash('message', type='error')` for viewing a flash message in any template. Required `include messages` pug template for message rendering or can use custom message rendering.

Note: Include express-sessions, then authContextMiddleware and then flashMessagesMiddleware. In that order for it to work properly

Usage Example :
```js
// routes.js 
app.get('/' , (req, res)=>{
    // ... content 
    req.flash('this is an error', 'error')
    req.flash('this is a message')
    res.redirect('/')
})
```

## Misc Framework features
---

- constants.mjs files contains names like 'faculty' or 'student' for internationalisation/ localisation purposes in the future.
- All redirects take an optional `?next=` Query parameter that will redirect to current page or specified page after the redirection is complete.
- Request logging using Morgan.
- All tables can be sorted and searched. 

## Auth Module
---

Express-session is used to maintain server side sessions. It can be configured to use persistent MongoStore sessions.
- 10 rounds of salted Hashes using bcrypt to store and compared passwords.
- Authentication using `loginRequiredMiddleware`.
- Authorization using `accessRequiredMiddleware` is based on a higher-order function that takes in `role` to return a middleware.
- authContextMiddleware provides context data like `path` , `user`, `isAuthenticated()` and flash messages `messages`  for Pug and other routes. 
- `req.session.user` object is set on successful login and contains :

```js
req.session.user  = {
    id: user.id,
    name: user.name,
    role : 'student' || 'faculty'
}
```



#### Endpoints: 
Endpoints | Methods | Purpose
--- | --- | --- |
 /auth/login?next=/ | GET, POST | Login and set req.session.user and redirects |
 /auth/signup | GET, POST | Signup as faculty or student
 /auth/logout | GET | Destroys session and redirect to home
 /auth/profile | GET | Displays profile data and registered course
 /courses     | GET |  List of courses to edit / enroll
 /courses/:id/add| GET, POST |  To add a course using toasty forms
 /courses/:id/edit| GET, POST |  To edit a given course based on ID
 /courses/:id/delete| GET | To delete a course based on ID
 /course/:id/enroll | GET | For student to enroll in a course




## Toasty Forms - Generic Form rendering engine
---

Salient features: 
- Automatic handling of select, textarea, input types.
- On error, the form is filled with last submitted data along with flash messages and errors. 
- Simple JSON based Schema.

The provided attributes are used like so: 

- `name` is used for Label as such. 
- `name` is converted into camelCase version of it for HTML name and ID
- `name` is Title Cased for HTML label
- `widget` can be one of : 
    - select
    - checkbox
    - text ( default if not provided )
    - textarea
    - radio
- `type` is given to make the input one of : 
    - email 
    - password 
    - number 
    - date
    - tel ... or other accepted HTML type attribute values 

- `title` attribute is for the form's title after Title Casing 
- `action` attribute sets the post method's URL which defaults to current url.
- If type is `select` or `checkbox` , Toasty expects an accompanying `values` attribute for options and values. 
- For `select` type of widgets , an additional `multiple` attribute can be passed for multiple select.
- `errors` is an array of strings that can be attached to the form to render errors as bootstrap alerts at the top.
- `submitText` attribute changes the submit button's text. Defaults to 'Submit'.
- `default` attribute within `fields` is used to prepopulate the data. 
- `values` attribute inside the form contains camelCased key created from the `name` attribute of the field. 
- Toasty also renders flash messages using `messages` variable in res.locals. Or can be provided by context. 

### Example : 
```js

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
            widget: 'textarea',
            default: 'Default address',

        },
        {
            name: 'Role',
            widget:'select',
            multiple: true,
            values : ['faculty', 'student']
        }
    ],
    values: {
        email:'default email to show' ,
        confirmPassword: 'auto camelcased names are used' ,
    }


}

```

### Usage : 

   Use toasty like so: 
   ```js
   res.render( 'toasty' ,
        { form: { 
                values: {defaultValues, ...formName} ,
                errors: [ 'array' , 'of', 'errors'] 
            }
        }
    )
   ```

## Todo:
---
- Make Objects for Forms that can automatically inherit validation , form rendering and default endpoints from Models.
