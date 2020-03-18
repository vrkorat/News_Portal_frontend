const express= require('express');
const cors=require('cors');
const multer=require('multer');

const mongoose=require('mongoose');
const app=express();
const port =process.env.port||3000;
const uniqid=require('uniqid');
const bodyParser=require('body-parser')
app.use(cors());
app.use(bodyParser.json())
mongoose.connect('mongodb://127.0.0.1:27017/virat');

app.use('/uploads', express.static('uploads'))

let PostModel=mongoose.model('post',{
    postid:{
        type:String,
        index:true
    },
    rname:String,
    dateAdded:String,
    text:String,
    headline:{
        type:String,
        unique:true
    },
    poster:[],
    likes:Number,
    visits:Number,
    genre:[]
});

let reporterModel=mongoose.model('reporter',{
    reporterid:String,
    rname:{type:String,unique:true},
    password:String,
    dob:String,
    fname:String,
    lname:String,
    email:String,
    photo:String,
});

let userModel=mongoose.model('user',{
    userid:String,
    uname:{type:String,unique:true},
    password:String,
    dob:String,
    fname:String,
    lname:String,
    photo:String,
    email:String,
    notifications:[],
    tags:[]
});

let adminModel=mongoose.model('admin',{
    adminid:String,
    adminname:{type:String,unique:true},
    password:String,
    dob:String,
    fname:String,
    lname:String,
    email:String,
    photo:String,
});


app.post('/uLogin',(req,res)=>{
    console.log("User Login");

    console.log(req.body.name);

    userModel.findOne({uname:req.body.name,password:req.body.pass},(e,docs)=>{
       res.send(docs); 
        console.log(docs)
    });

   // res.send(req.body.rname);
});

app.post('/adminLogin',(req,res)=>{
    console.log("Admin Login");

    console.log(req.body.name);

    adminModel.findOne({adminname:req.body.name,password:req.body.pass},(e,docs)=>{
       res.send(docs);
        console.log(docs)
    });

   // res.send(req.body.rname);
});

app.post('/rLogin',(req,res)=>{

    console.log("Reporter Login");
    
    // console.log(req.body)
    reporterModel.findOne({rname:req.body.name,password:req.body.pass},(e,docs)=>{
        //console.log(docs.rname)
        console.log(docs)
        res.send(docs);
    });

    
    
});

//reporter register:
app.post('/rSignup',(req,res)=>{
    var newReporter=new reporterModel({
        reporterid:uniqid(),
        rname:req.body.username,
        password:req.body.password,
        dob:req.body.date,
        fname:req.body.fname,
        lname:req.body.lname,
        email:req.body.email,
        photo:""
    });
    res.end("hii");
    newReporter.save().then(data=>{
        console.log("reporter added");
    },(e)=>{
        console.log(e);
    });
})

//user registration
app.post('/uSignup',(req,res)=>{
    var newUser=new userModel({
        userid:uniqid(),
        uname:req.body.username,
        password:req.body.password,
        dob:req.body.date,
        fname:req.body.fname,
        lname:req.body.lname,
        email:req.body.email,
    });
    res.end("hii");
    newUser.save().then(data=>{
        console.log("user added");
    },(e)=>{
        console.log(e);
    });
})

let imageLink;    
const imageStorage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        let temp = file.originalname;
        imageLink = "/uploads/"+temp;
        cb(null,temp);
    }
});
const imageStore = multer({
    storage: imageStorage, limits: {
        fileSize: 60000000
    },
    fileFilter: ''
});

app.put('/uploadPost',imageStore.single('img'),(req,res)=>{
    console.log(imageLink);
  
    var newPost=new PostModel({
        postid:uniqid(),
        rname:req.body.name,
        dateAdded: req.body.date,
        text:req.body.desc,
        headline:req.body.headline,
        poster:[{imageLink}],
        likes:0,
        visits:0,
        genre:req.body.genre.split(',')
    });
    newPost.save().then(khantil=>{
        console.log(khantil," post uploaded")
        res.send("Post added successfully!!")
    },(e)=>{
        console.log(e);
    })

});



app.get('/deletePost',(req,res)=>{

    //req.body.keyname

    res.end("hii");
    PostModel.deleteOne({}, (err)=>{
        console.log("post deleted");
    })

    

});

app.post('/fetchNews',(req,res)=>{
    PostModel.find({},(e,docs)=>{
        res.send(docs); 
        //  console.log(docs)
     });
});

app.post('/fetchTrending',(req,res)=>{
    PostModel.find({},(e,docs)=>{
        res.send(docs); 
        //  console.log(docs)
     });
});

app.post('/userprofile',(req,res)=>{
    userModel.findOne({uname:req.body.name},(e,docs)=>{
        res.send(docs); 
         console.log(docs)
     });
});

app.post('/reporterprofile',(req,res)=>{
    reporterModel.findOne({rname:req.body.name},(e,docs)=>{
        res.send(docs); 
         console.log(docs)
     });
});


app.post('/getReporterNews',(req,res)=>{
    PostModel.find({rname:req.body.name},(e,docs)=>{
        res.send(docs); 
        //  console.log(docs)
     });
});

app.post('/deleteThisPost',(req,res)=>{
    PostModel.deleteOne({postid:req.body.postid},(e,docs)=>{
        res.send(docs); 
        //  console.log(docs)
     });
});

app.post('/deleteReporter',(req,res)=>{
    PostModel.deleteMany({rname:req.body.name},(e,docs)=>{
        console.log("posts for given reporter deleted")

        

        // res.send(docs); 
         console.log(docs)
     });

     reporterModel.deleteOne({rname:req.body.name},(e,docs1)=>{
        res.send(docs1); 
          console.log("reporter deleted")
     });

    
});

app.post('/getReporters',(req,res)=>{
    reporterModel.find({},(e,docs)=>{
        res.send(docs); 
        //  console.log(docs)
     });
});

app.listen(port,()=>{
    console.log("Server is live");

});