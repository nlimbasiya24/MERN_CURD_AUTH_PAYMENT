var jwt = require("jsonwebtoken");//get the token
const JWT_SECRET = process.env.JWTPRIVATEKEY;

const fetchuser = async (req, res, next) => {
// call the next function
//get the user from the jwt token and add id to req object
  const token = await req.header("token"); //get token from header
 // console.log("fecth-user",token);
  if (!token) {// if the token is not present
    res.status(401).send({ error: "Please authenicate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
   // console.log(data);
    req.user = data._id;
  //  console.log("Nivid",req.user)
    next();
  } catch (error) {
    console.log("Nicvisd error")
    res.status(401).send({ error: "Please authenicate using a valid token" });
  }
};
module.exports = fetchuser;//export the fetchuser
