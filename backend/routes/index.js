var express = require('express');
var router = express.Router();
var mongo = require ('mongodb');
var assert = require ('assert');

var url='mongodb://localhost:27017/test'

// router.get('/',function(req,res,next){
//   res.render('index')
// });

router.get('/',(req,res,next)=>{
  res.status(200).json({
    message: 'get request'
  })
  mongo.connect(url,function(err,db){
    assert.equal(null,err);
    var cursor = db.collection('post-data').find();
    cursor.forEach(function(doc,err){
      assert.equal(null,err);
      resultArray.push(doc);
    },function(){
        db.close();
        res.render('index',{posts:resultArray})
    })
  })
});

router.post('/insert',function(req,res,next){
  var post = {
    title:req.body.title,
    body:req.body.body
  };
  mongo.connect(url,function(err,db){
    assert.equal(null,err);
    db.collection('post-data').insertOne({post,function(err,result){
      assert.equal(null,error);
      console.log('post inseted');
      db.close();


    }})
  })

});

router.post('/update',function(req,res,next){

});
router.post('/delete',function(req,res,next){

});
module.export = router;