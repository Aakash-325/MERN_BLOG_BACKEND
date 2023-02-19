import User from "../model/User";
import bcrypt from "bcryptjs";

export const getAllUser = async (req, res, next) => {
    let users;
    try{
        users = await User.find();
    }catch(err){
        console.log(err);
    }
    if(!users){
        return res.status(404).json({message:"user not found!"})
    }
    return res.status(200).json({users})
}

export const signup = async (req, res, next) => {
    const{name, email, password} = req.body;
// receiving data from frontend from user


    let existingUser;
    try{
        existingUser = await User.findOne({email});
    }catch(err){
        return console.log(err);
    }

// checking if user already exist in database using email as filter

    if(existingUser){
        return res.status(400).json({message:"User already Exists! Login instead."})
    }

// if user already exist in db then sending already exist

    const hashedpassword = bcrypt.hashSync(password);

    const user = new User({
        name,
        email,
        password: hashedpassword,
        blogs:[]
    });

// if user does not exist in db then creating new user

    try{
        await user.save();
    }catch(err){
        return console.log(err);
    }
    
    return res.status(201).json({user})
}


export const login = async (req, res, next) => {
    const {email, password} = req.body

// receiving data from frontend from user

    let existingUser;
    try{
        existingUser = await User.findOne({email});
    }catch(err){
        return console.log(err);
    }

// checking if user exist in db 

    if(!existingUser){
        return res.status(404).json({message:"couldn't find user with this email."})
    }

// if user does not exist in db sending could not find the user

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)
    if(!isPasswordCorrect){
        return res.status(400).json({message:"Incorrect password"})
    }
    return res.status(200).json({
        message: "Login successfully",
        id: existingUser.id,
    })

}