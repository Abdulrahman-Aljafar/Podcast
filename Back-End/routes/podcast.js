const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Podcast = require("../models/podcast");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { populate } = require("../models/user");
require("dotenv").config();

// router.get("/:id", (req , res) => {
//   Mansion.findById(req.params.id)
//   .populate('ower')
//   .then(mansion => res.json(mansion))
// })
// http://localhost:5000/api/mansion/:${id}

router.get("/", (req, res) => {
  Podcast.find()
    .then((podcast) => {
      res.json({ podcast: podcast });
    })
    .catch((err) => res.json({ msg: err }));
});
router.get("/:id", (req, res) => {

  let id = req.params.id

  Podcast.find({user:id})
    .then((podcast) => {
      res.json({ podcast: podcast });
    })
    .catch((err) => res.json({ msg: err }));
});

router.post("/new", (req, res) => {

  const newPodcast = {
    title: req.body.title,
    image: req.body.image,
    audio: req.body.audio,
    description: req.body.description,
    user: req.body.user
  };
  Podcast.create(newPodcast)
    // .populate('User')
    .then((podcast) => {
      res.json({ msg: "podcast has added", podcast: podcast });
    })

});

router.post("/record/:id", (req, res) => {
  let id = req.params.id

  let audio = req.body.audio
  Mansion.findByIdAndUpdate(id,{audio:audio} )
    .then(editUser => {
      console.log("audio",audio)
      console.log("id", id)
      res.json({ msg: "Profile is editing", audio })
    })
});

// AddComment
router.post("/AddComment/:Id", (req, res) => {
  let Id = req.params.Id

  let comment = req.body.comment

  Podcast.findByIdAndUpdate(Id,{$push:{comment:comment}} )
    .then(editUser => {
      console.log("comment".comment)
      res.json({ msg: "comment is added", comment })
    })
});
//deletedpod
router.delete('/deletedComment/:podId/:ele', (req, res) => {


  let podId = req.params.podId
  let ele = req.params.ele

  console.log("ele", ele)
  console.log('podId',podId)
 
  Podcast.findByIdAndUpdate(podId,{$pull:{comment:ele}})
    .then(deletedComment => {
      res.json({ msg: "pod deleted", deletedComment })
    })
})


router.delete('/deletePodcast/:podcastId', (req, res) => {

  let podcastId = req.params.podcastId


  Podcast.deleteOne({ _id: podcastId })
    .then(deletedPodcast => {
      res.json({ msg: "Podcast deleted", deletedPodcast })
    })
});

router.post("/addrating/:podcastId", (req, res) => {
  const podcastId  = req.params.podcastId ;
  console.log(
    " brate "+req.body.rate ,
    "// book idd "+ podcastId )
if(req.body.rate !=null){
    Podcast.findByIdAndUpdate(podcastId, 
      { $push: { rate: req.body.rate} }
        )
        .then((Podcast) => {
          res.json({msg : "Book Updated" , Podcast : Podcast });
            })
        .catch((err) => console.log("Error: User not found ", err));
          }
});


router.post("/addrating/:podcastId", (req, res) => {
  const podcastId  = req.params.podcastId ;
  console.log(
    " brate "+req.body.rate ,
    "// book idd "+ podcastId )
if(req.body.rate !=null){
    Podcast.findByIdAndUpdate(podcastId, 
      { $push: { rate: req.body.rate} }
        )
          
        .then((Podcast) => {
          res.json({msg : "Book Updated" , Podcast : Podcast });
            })
        .catch((err) => console.log("Error: User not found ", err));
          }
 
     
});

router.get("/:id", (req, res) => {
  let id = req.params.id
  Podcast.find({user:id})
    .then((podcast) => {
      res.json({ podcast: podcast });
    })
    .catch((err) => res.json({ msg: err }));
});

module.exports = router;
