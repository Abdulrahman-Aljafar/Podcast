const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/", (req, res) => {
  User.find()
    .then((users) => {
      res.json({ users: users });
    })
    .catch((err) => res.json({ msg: err }));
});


router.post("/register", (req, res) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    image: req.body.image,
    bio:req.body.bio,
    password:req.body.password,
    ConfirmPassword:req.body.ConfirmPassword,

  };
  newUser.email = newUser.email.toLowerCase();
  User.findOne({ email: newUser.email })
    .then((user) => {
      // if the email in the database !
      if (user) {
        res.json({
          msg: "the email was used change it plz ! ",
        });
      }
      // if the email is not insaid the database
      else {
        var salt = bcrypt.genSaltSync(10);
        newUser.password = bcrypt.hashSync(req.body.password, salt);
        newUser.ConfirmPassword = bcrypt.hashSync(req.body.ConfirmPassword, salt);
        newUser.email = newUser.email.toLowerCase();
        User.create(newUser).then((user) => {
          res.json({ msg: "user hasbeen register", user: user });
        });
      }
    })
    .catch((err) => res.json({ msg: err }));
});

  router.post("/login", async (req, res) => {
    let { email, password } = req.body;
    //  let email = req.body.email ; let password = req.body.password
    email = email.toLowerCase();
    const user = await User.findOne({ email: email }); // its same to =>  User.findOne({email:email}).then(user => { })
    // if email is  not exist
    if (!user) {
      res.json({ msg: "email is not exist" });
    }
    // if email is  exist
    else {
      // if password is currect
      if (bcrypt.compareSync(password, user.password)) {
        user.password = undefined;
        let payload = { user };
        let token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: 1000 * 60 * 60,
        }); // to the user info
        res.json({ msg: "user login ", token });
      }
      // / if password is not currect
      else {
        res.json({ msg: "password is not currect" });
      }
    }
  });
  
  // edit
  router.put("/EditProfile/:userId", (req, res) => {
    let userId = req.params.userId 
  //  let  password= req.body.password
   let  name= req.body.name
   let  email= req.body.email 
   let  bio= req.body.bio 
   let image=req.body.image
    User.findByIdAndUpdate(userId ,{name:name,email:email,bio:bio,image:image})
          .then(editUser =>{
            console.log(editUser)
              res.json({msg : "Profile is editing", editUser})
          })
  });

  router.get("/:token", (req, res) => {
    let token = req.params.token;
  
    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
      if (err) return res.json({ msg: err });
  
      let user = decode;
  
      res.json({ msg: "user decoded", user });
    });
  });


  router.get("/profile/:id", async(req,res)=>{
    const userId = req.params.id
    try{
      const user = await User.findById(userId)
      res.json({msg: "user found", user})
    }catch{
      res.json({msg: "error finding user"})
    }
})

router.put("/Editpassword/:userId", (req, res) => {
  const userId  = req.params.userId ;
  let updateUserProfile = {
  
  };
  console.log(
              "// idd "+ userId   ,
  )
console.log(req.body.password)
  if( !req.body.password || req.body.password.length == 0 ){
      console.log("Updated Profile WITHOUT PASSWORD"+ updateUserProfile)
      User.findByIdAndUpdate(userId, updateUserProfile)
          
        .then((user) => {
          res.json({msg : "Profile Updated" , user : user });
            })
        .catch((err) => console.log("Error: User not found ", err));
  }
  else{
    console.log("Updated Profile WITH PASSWORD"+ updateUserProfile)
    var salt = bcrypt.genSaltSync(10);
    updateUserProfile.password=bcrypt.hashSync(req.body.password, salt);
    User.findByIdAndUpdate(userId, updateUserProfile)
      
      .then((user) => {
        res.json({msg : "Profile Updated" , user : user })}   )
      .catch((err) => console.log("Error: User not found ", err));
    }


  
  
 
});

router.post("/sub/:chaneelId/:userId", (req, res) => {

  let chaneelId = req.params.chaneelId
  let userId = req.params.userId
  console.log("back end chaneelId",chaneelId)
  console.log("back end userId",userId)

  

  User.findByIdAndUpdate(userId, { $addToSet: { subscribe: chaneelId } }, { new: true })
      .then(user => {
          res.json({ msg: "the book im your list now, Enjoy reading it", subscribe: user.subscribe })

      })

 

})

router.post("/Mysub/:chaneelId/:userId", (req, res) => {

  let chaneelId = req.params.chaneelId
  let userId = req.params.userId
  console.log("back end chaneelId",chaneelId)
  console.log("back end userId",userId)

  User.findByIdAndUpdate(chaneelId, { $addToSet: { Mysubscribe: userId } }, { new: true })
  .then(user => {
      res.json({ msg: "new subscribe", Mysubscribe: user.Mysubscribe })

  })

 

 

})

router.post("/Mysub/:chaneelId/:userId", (req, res) => {

  let chaneelId = req.params.chaneelId
  let userId = req.params.userId
  console.log("back end chaneelId",chaneelId)
  console.log("back end userId",userId)

  User.findByIdAndUpdate(chaneelId, { $addToSet: { Mysubscribe: userId } }, { new: true })
  .then(user => {
      res.json({ msg: "new subscribe", Mysubscribe: user.Mysubscribe })

  })

  router.post("/Myunsub/:chaneelId/:userId", (req, res) => {
    let chaneelId = req.params.chaneelId
    let userId = req.params.userId
    console.log("usub chaneelId",chaneelId)
    console.log("usub userId",userId)
    User.findByIdAndUpdate(chaneelId, { $pull: { Mysubscribe: userId } })
        .then(user => {
            res.json({ msg: "MyUnsub", Mysubscribe: user.Mysubscribe })
        })
  })

 

 

})

router.post("/unsub/:chaneelId/:userId", (req, res) => {
  let chaneelId = req.params.chaneelId
  let userId = req.params.userId
  console.log("usub chaneelId",chaneelId)
  console.log("usub userId",userId)
  User.findByIdAndUpdate(userId, { $pull: { subscribe: chaneelId } })
      .then(user => {
          res.json({ msg: "Unsub", subscribe: user.subscribe })
      })
})


router.post("/Myunsub/:chaneelId/:userId", (req, res) => {
  let chaneelId = req.params.chaneelId
  let userId = req.params.userId
  console.log("usub chaneelId",chaneelId)
  console.log("usub userId",userId)
  User.findByIdAndUpdate(chaneelId, { $pull: { Mysubscribe: userId } })
      .then(user => {
          res.json({ msg: "MyUnsub", Mysubscribe: user.Mysubscribe })
      })
})

module.exports = router;