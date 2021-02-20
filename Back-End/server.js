/* ====== Requires ===== */
require('dotenv').config()
const User = require("./models/user")
const Podcast = require("./models/podcast")
var express = require("express");
const mongoose = require('mongoose')
var cors = require("cors");
const path = require('path')
const PORT = process.env.PORT || 4000

const AdminBro = require('admin-bro')
const AdminBroExpressjs = require('admin-bro-expressjs')
AdminBro.registerAdapter(require('admin-bro-mongoose'))
/* ====== DataBaseConnection ===== */

mongoose.connect(
  process.env.MONGO_CONNECTION_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log(`MongoDb connected `)
);

const adminBro = new AdminBro({
  resources: [User , Podcast],
  rootPath: '/admin',
})


/* ====== Routes ===== */
// var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");


/* ====== MiddelWare ===== */
var app = express();
app.use(cors());
// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname , "build")))
const router = AdminBroExpressjs.buildRouter(adminBro)
app.use(adminBro.options.rootPath, router)

// app.use("/api/books", require("./routes/books"));


/* ====== Routes ===== */

app.use("/api/users", require("./routes/users"));
app.use("/api/podcast", require("./routes/podcast"));




app.get("*" , (req,res)=>{
  res.sendFile(path.join(__dirname , "build" ,"index.html"))

})

app.listen(PORT , ()=> console.log(`server running in ${PORT}`))



module.exports = app;