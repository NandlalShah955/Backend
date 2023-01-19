const express=require('express')
const Users=require("../model/user.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const app=express.Router();

const bcryptedpass=async(password)=>{
    return await bcrypt.hash(password,10);
}

// Get all user 
app.get("/",async(req,res)=>{
    let user=await Users.find()
    res.send(user)
    // console.log(user)
})

// Post user request 

app.post("/signup", async (req, res) => {
    let { email, password } = req.body;

	let user = await Users.findOne({ email });
	try {
		if (user) {
			return res.status(400).send("Oops User already exists Please create a new account.");
		}

		let nayaUser = new Users({
			email,
			password: await bcryptedpass(password),
		});
		await nayaUser.save();
		return res.status(201).send(nayaUser);
	} catch (error) {
		return res.
        status(500)
        .send(error.message);
	}
    
  });

// Post signin request 

  app.post("/signin", async (req, res) => {
	const { email, password } = req.body;

    try {
      const user = await Users.findOne({ email });
      bcrypt.compare(password, user.password, function (error,answer) {
        if (answer) {
            const temp = jwt.sign({ user }, "SECRET_KEY");
            return res.send({ user, temp });
        }
        else {
            return res.send('Oops Wrong password or email')
        }
    });
    } catch (error) {
        return res.send(error.message)
    }
	
});


module.exports=app;