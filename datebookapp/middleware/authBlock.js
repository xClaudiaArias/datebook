const authBlock = (req, res, next) => {
    console.log(req.session, " :req.session")
    if(req.session && req.session.user) {
        res.redirect('/dashboard')
    } else {
        next()
    }
}

module.exports = authBlock