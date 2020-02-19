
export const flashMessageMiddleware = (req, res, next) =>{
    req.flash = (message, type ='message')=> {
        if ( type === 'message')
            if( req.session.messages )
                req.session.messages.push( message ) 
            else 
                req.session.messages = [ message ]
        else
            if( req.session.errors )
                req.session.errors.push( message ) 
            else 
                req.session.errors = [ error ]
    }
    next()

}
export const authContextMiddleware = (req, res, next)=>{
    res.locals.isAuthenticated = ()=> req.session.user !== undefined
    res.locals.user = req.session.user;
    res.locals.path = req.path
    res.locals.messages = req.session.messages
    res.locals.errors = req.session.errors
    delete req.session.errors
    delete req.session.messages
    next()
}

export const loginRequiredMiddleware = (req, res, next)=>{
    if( req.session.user ) 
        next()
    else{
        req.flash('Please Login to continue!')
        res.redirect('/auth/login?next=' + req.originalUrl)
    }

}

export const accessRequiredMiddleware = (role)=>{
    return  (req, res , next) =>{
        console.log(role)
        if( req.session.user.role !== role ){

            req.flash( 'Sorry, you do not have the clearance for this operation. Please re-login with Required role: ' +role ) 
            res.redirect('/auth/login?next=' + req.originalUrl)
        }
        else
            next()
    }
}