const { Console } = require("console");
const express = require("express");
const path =require("path");
const app = express();
//const hbs=require("hbs");

require("./db/conn");
const Register=require("./models/registers");
const port = process.env.PORT || 3000;
const static_path = path.join(__dirname,"../public");
const templates_path =path.join(__dirname,"../templates/views");
//const partials_path =path.join(__dirname,"../templates/partials");
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views",templates_path);
//hbs.registerPartials(partials_path);

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.get("/",(req,res)=>{
    res.render("front");
});

app.get("/login",(req,res)=>{
    res.render("login");
});

app.get("/index",(req,res)=>{
    res.render("index");
});

app.get("/register",(req,res)=>{
    res.render("register");
});

app.get("/about",(req,res)=>{
    res.render("about");
});

app.get("/courses",(req,res)=>{
    res.render("courses");
});

app.get("/quizes",(req,res)=>{
    res.render("quizes");
});

app.get("/chat",(req,res)=>{
    res.render("chat");
});


app.post("/register",async(req,res)=>{
    try{
        const password=req.body.pass;
        const cpassword=req.body.re_pass;
        if(password===cpassword){
const registerEmployee =new Register({

    name:req.body.name,
    email:req.body.email,
    pass:req.body.pass,
    re_pass:req.body.re_pass,

})

const registered =await registerEmployee.save();

res.status(201).render("index");

        }else{
           res.render("register",{
          massage:"Password is not match",
           });    
        }
    }
    catch(error){
        //res.status(400).send("Email already Exit");
        res.render("register",{
            massage:"Email already Exist",
             });
    }

})

app.post("/login",async(req,res)=>{

    try{
        const email=req.body.email;
        const password=req.body.pass;
    const useremail = await Register.findOne({email:email})
if(useremail.pass===password){
    res.status(201).render("index");
}
else{
    res.render("login",{
        massage:" Wrong Password ",
         });
}

    }
    catch(error){
       // res.status(400).send("invalid login Details");
       res.render("login",{
        massage:"invalid login Details",
         });
    }

})
app.listen(port ,() =>{
    console.log(`server is runing now ${port}`);
})


