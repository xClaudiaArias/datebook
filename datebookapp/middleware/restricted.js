const restricted = (req, res, next) => {
    // console.log(req.session, " :req.session")
    // if(req.session && req.session.user) {
    //     next()
    // } else {
    //     res.status(401).json({ message: "SORRY, cant let you in"})
    // }
    console.log(req.session, " :req.session")
    console.log(req.session.user, " :req.session.user")

    next()

}

module.exports = restricted