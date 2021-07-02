const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/Users');
const Buses = require('../../models/Buses');
const { JsonWebTokenError } = require('jsonwebtoken');
const { findOneAndUpdate, findOne, findByIdAndDelete, findOneAndDelete } = require('../../models/Users');

// get current user profile

router.get('/me', auth, async (req, res) => {
    try {
        const profile = await (await User.findById(req.user.id))


        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' })

        }

        res.json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }

});

// get all profiles

router.get('/', async (req, res) => {
    try {
        const profiles = await User.find();
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private

router.post('/', [
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email', 'Please add a valid email').isEmail(),
    check('password', 'please enter a password').isLength({ min: 6 })
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, company, email, password, contact, gst } = req.body;

        try {

            let user = await User.findOne({ email });

            if (user) {
                res.status(400).json({ errors: [{ msg: 'User already exists' }] });
            }



            user = new User({
                name,
                company,
                email,
                password,
                contact,
                gst

            });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                config.get('jwtSecret'), { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token })
                });

            // res.send('User registered');
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    }
);


// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete('/', auth, async (req, res) => {
    try {
        // Remove profile
        // Remove user
        await Promise.all([
            User.findOneAndRemove({ _id: req.user.id })
        ]);

        res.json({ msg: 'User deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route    PUT api/users/buses
// @desc     Add Buses
// @access   Private
router.put(
    '/buses',
    auth,
    check('name', 'name is required').notEmpty(),
    check('company', 'Company is required').notEmpty(),
    check('stops', 'Stops are required')
        .notEmpty(),
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, company, stops } = req.body;
        let k = stops.split(",")
        let stops_=k.map(x=>x.trim())
        try {
            const profile = await User.findById(req.user.id);
            profile.buses.unshift({name,company,stops:stops_});
            await profile.save();

            res.json(profile);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);


// @route    POST api/users/buses
// @desc     Add Buses
// @access   Private


router.post(
    '/buses',
    auth,
    async (req, res) => {

        const { name, company, stops } = req.body;
        let k = stops.split(",")
        let stops_=k.map(x=>x.trim())
        try {

            let user = await Buses.findOne({ name });

            if (user) {
                res.status(400).json({ errors: [{ msg: 'Bus already exists' }] });
            } else {



                user = new Buses({
                    name,
                    company,
                    stops:stops_

                });

                await user.save();

                const payload = {
                    user: {
                        id: user.id
                    }
                }
            }

            // res.send('User registered');
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

router.get('/roshan',auth,async(req,res)=>{
const k = await User.findOneAndUpdate(req.user.id,{"$pull":{"buses":{"_id":"60db028f4f437f4649395aed"}}},{safe:true},(err,obj)=>{
    console.log(obj)
})    
})



// @route    DELETE api/profile/:bus_id
// @desc     Delete Buses
// @access   Private

router.delete('/:busid',auth,async(req,res)=>{
// const l =await Buses.findByIdAndDelete(req.params.busid)
try{

    const k = await User.findOneAndUpdate(req.user.id,{"$pull":{"buses":{"_id":req.params.busid}}},{safe:true},async(err,obj)=>{
    const buses_ = obj.buses
    for (i of buses_){
        if (i._id==req.params.busid){
            await Buses.findOneAndDelete({name:i.name})
            return res.send("deleted successfully")
        }
    }
    })
    

}catch(err){
    console.error(err)
    res.status(400).send("server error b")

}});

module.exports = router;