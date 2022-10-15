const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const {SECRET_KEY} = process.env;
const { User, registerValidation, loginValidation } = require('../../models/modelUsers');
const { logout, getCurrent } = require('../../controllers/auth/index');
const authenticate = require('../../middlewares/authenticate');
const { ctrlWrapper } = require('../../helpers/index');

router.post('/register', async (req, res, next) => { 
    const { name, email, password } = req.body;;

    const user = await User.findOne({ email });
    if (user) {
        return res.status(409).json({ message: 'Email in use' });
    }

    const validation = registerValidation(req.body)
    if (validation.error) {
        return res.status(400).json({ message: `Failed because ${validation.error}` });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const result = await User.create({name, email, password: hashPassword});
    return res.status(201).json({
        "user": {
            "email": result.email,
            // "subscription": "starter"
        },
        message: 'User registered successfully'
    })
})

router.post('/login', async (req, res, next) => { 
const {email, password} = req.body;
    const user = await User.findOne({email});
    if (!user) {
        return res.status(401).json({ message: 'Email or password is wrong' });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        return res.status(401).json({ message: 'Email or password is wrong' });
    }

    const validation = loginValidation(req.body)
    if (validation.error) {
        return res.status(400).json({ message: `Failed because ${validation.error}` });
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '1h'});
    await User.findByIdAndUpdate(user._id, {token})
    return res.status(200).json({
        "token": token,
        "user": {
            "email": email,
            // "subscription": "starter"
        },
        message: 'User logged in successfully'
    })
})

router.get("/logout", authenticate, ctrlWrapper(logout));

router.get("/current", authenticate, ctrlWrapper(getCurrent));


module.exports = router;
