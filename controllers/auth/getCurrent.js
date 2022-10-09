const getCurrent = (req, res, next) => {
    const {email} = req.user;
    res.status(200).json({
        email,
        // "subscription": "starter"
    })
}

module.exports = getCurrent;

