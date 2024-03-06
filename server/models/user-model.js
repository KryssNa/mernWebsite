const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
})

//
userSchema.pre('save', async function () {
    const user = this;
    if (!user.isModified('password')) {
        next();
    }
    try {
        //hash the password
        const saltRound = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(user.password, saltRound);
        user.password = hashed_password;

    } catch (error) {
        console.log(error);
    }
})

//token
userSchema.methods.generateToken = function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "30d",
            }
        )
    } catch (error) {
        console.log(error)
    }
}

//compare password

userSchema.methods.comparePassword=function(password){
    try {
        return bcrypt.compare(password,this.password);
        
    } catch (error) {
        console.log(error)
        
    }
}

//model or collection name
const User = new mongoose.model('User', userSchema);

module.exports = User;