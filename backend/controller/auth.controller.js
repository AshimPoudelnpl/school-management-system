import db from "../config/dbconnect.js"
export const  getAllUSers=async (req,res) => {
    try {
        const [users]=await db.query("Select * from users")
            res.status(200).json({
                data:users,
                Result:"Suceesful data Fetched"
            })
        
    } catch (error) {
        console.log(error);
        
    }
    
}
//login Api
export const login=async (req,res)=>{
    
    try {
   // 1.get email and passwords from user side
    const{email,password}=req.body;
    console.log(req.body)
    if (!email || !password) {
         res.status(400).json({message:"Email and passwrd required"});
    }
     const [result]=await db.execute("Select * FROM users WHERE email=? AND password =?",[email,password])
    
     // 2. users found?
     if(result.length===0)
     {
        res.status (400).json({
            message:"Invalid credentials",
           

        });
     }
     
     //3.sucess
     const user=result[0]
     res.status(200).json({
        message:"Login Successful",
       user:{
        id:user.id,
        email: user.email,
       },

     })


        
    } catch (error) {
        console.log(error);  
        
    }

    
}