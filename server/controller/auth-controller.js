const User = require('../models/user-model');

const home = async (req, res) => {
    try {
        await res.status(200).send("welcome to home from controller");
    } catch (error) {
        console.log(error);
    }
}
const register = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;
        const useExits = await User.findOne({ email });
        if (useExits) {
            return res.status(400).json({ msg: "email already exitst" });
        }
        const UserCreated = await User.create({ username, email, phone, password })
        console.log(UserCreated)
        res.status(200).json({ msg: "Registration successfull", token: UserCreated.generateToken(), userId: UserCreated._id.toString() });
    } catch (error) {
        console.log(error);
    }
}

//user login logic

const login = async (req, res) => {

    try {
        const {email,password}=req.body;

        const userExists= await User.findOne({email});

        if(!userExists){
            return res.status(400).json({message:"Invalid email or password"});
        }

        const user= await userExists.comparePassword(password,userExists.password);
        // const user=await bcrypt.compare(password,userExists.password);

        if(user){
            res.status(200).json({ 
                msg: "Login successfull", 
                token: userExists.generateToken(), 
                userId: userExists._id.toString() });
        }else{
            res.status(401).json({message:"Invalid email or password"})
        }

    } catch (error) {
        res.status(500).json('internal server error');

    }
}

// user logic

const user=async(req,res)=>{
    try {
        const userData=req.user;
        res.status(200).json({userData})
    } catch (error) {
        console.log(`error form user route ${error}`)
    }
}

module.exports = { home, register,login,user };