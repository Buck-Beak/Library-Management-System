const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

// static signup method
userSchema.statics.signup = async function(firstname,lastname,email,password){
    //validation
    if(!firstname || !lastname || !email || !password){
        throw Error('All fields must be filled');
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid');
    }
    /*if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough');
    }*/

    const exists = await this.findOne({email});
    if(exists){
        throw Error('Email already in use');
    }

    const salt = await bcrypt.genSalt(10); 
    const hash = await bcrypt.hash(password,salt); //hashing the password

    const user = await this.create({firstname,lastname,email,password:hash});
    return user;
}

// static login method

userSchema.statics.login = async function(email,password){
    if(!email || !password){
        throw Error('All fields must be filled');
    }
    const user = await this.findOne({email});
    if(!user){
        throw Error('Incorrect email');
    }
    const match = await bcrypt.compare(password,user.password);
    if(!match){
        throw Error('Incorrect password');
    }
    return user;
}

module.exports = mongoose.model('User',userSchema);