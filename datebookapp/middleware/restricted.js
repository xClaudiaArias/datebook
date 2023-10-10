const restricted = (req, res, next) => {
    console.log(req.session, " :req.session")
    if(req.session && req.session.user) {
        next()
    } else {
        res.status(401).json({ message: "SORRY, cant let you in"})
    }
}

module.exports = restricted