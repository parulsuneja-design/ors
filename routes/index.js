var express = require('express');
var router = express.Router();
var userModule=require('../modules/user');
var crudModel=require('../modules/crud');
var bcrypt=require('bcryptjs');
var jwt = require('jsonwebtoken');
var getCrud= crudModel.find({});

const{check, validationResult} = require('express-validator');

/* GET home page. */{
 if(typeof localstorage ==="undefined" || localstorage === null){
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

function checkEmail(req,res,next){
  var email=req.body.email;
  var checkexistemail=userModule.findOne({email:email});
  checkexistemail.exec((err,data)=>{
  if(err) throw err;
  if(data){
  return res.render('signup',{ title: 'Online Reservation System' , msg:'Email Already exist'})

  }
  next();
  })
}
}





router.get('/', function(req, res, next) {
  res.render('index', { title: 'Online Reservation System',msg:'' })
});
router.post('/', function(req, res, next) {
   var username=req.body.uname;
   var password=req.body.password;
   var checkUser=userModule.findOne({username:username});

   checkUser.exec((err,data)=>{
  if(err) throw err;
  var getUserID = data._id;
  var getPassword = data.password;

  if(bcrypt.compareSync(password,getPassword)){
    var token = jwt.sign({userID: getUserID}, 'loginToken' );
    localStorage.setItem('userToken', token);
    localStorage.setItem('loginUser', username);
    res.redirect('/dashboard')
  }
  else{
    res.render('index', { title:'Online Reservation System', msg:"Invalid  Username and Password"})
}
   });
  
  });

  router.get('/dashboard', function(req, res, next) {
    var loginUser=localStorage.getItem('loginUser');
    getCrud.exec(function(err,data){
      if(err) throw err;
      res.render('dashboard', { title: 'Online Reservation System',loginUser:loginUser, msg: '',})
    });
  });

  router.post('/dashboard', function(req, res, next) {
    var name = req.body.name;
    var date = req.body.date;
    var time = req.body.time;
    var phone = req.body.phone;
    var service = req.body.Service;

    var crudDetails = new crudModel({
         name:name,
         date:date,
         time:time,
         phone:phone,
         service:service
    })
    crudDetails.save(function(err,doc){
      if(err) throw err;
      res.render('dashboard',{ title: 'Online Reservation System' , msg:'Appintment created Successfully'})
  });
  }),
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Online Reservation System', msg: ''})
});
router.post('/signup',checkEmail,function(req, res, next) {
  var username= req.body.uname;
  var email= req.body.email;
  var password= req.body.password;
  var confpassword= req.body.confpassword;
  if(password !=confpassword){
    res.render('signup',{ title: 'Online Reservation System' , msg:'Password not matched'});

  }else{

  password =bcrypt.hashSync(req.body.password,10)
   var userDetails=new userModule({
    username:username,
    email:email,
    password:password
  });

  userDetails.save((err,doc)=>{
    if(err) throw err;
    res.render('signup',{ title: 'Online Reservation System' , msg:'User Registered Successfully'})
});
  }

});
router.get('/bookingAppointment', function(req, res, next) {
  var loginUser=localStorage.getItem('loginUser');
  getCrud.exec(function(err,data){
    if(err) throw err;
  res.render('booking_Appointment', { title: 'Online Reservation System', msg:'' , records : 'data' })
});
});
router.get('/addNewAppointment', function(req, res, next) {
  var loginUser=localStorage.getItem('loginUser');
  res.render('addNewAppointment', { title: 'Online Reservation System',loginUser: loginUser })
});
router.post('/addNewAppointment',function(req, res, next) {
  var loginUser=localStorage.getItem('loginUser');
  res.render('addNewAppointment', { title: 'Online Reservation System',loginUser: loginUser })
});


module.exports = router;
