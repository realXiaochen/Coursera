var express = require('express');
var bodyParser = require('body-parser');
var Verify = require('./verify');
var promoRouter = express.Router();
promoRouter.use(bodyParser.json());

//GET, POST and DELETE operations on '/promotions'
promoRouter.route('/')
.get(Verify.verifyAdmin,function(req,res,next){
        res.end('Will send all the promotions to you!');
})
.post(Verify.verifyAdmin, function(req, res, next){
     res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
})
.delete(Verify.verifyAdmin, function(req, res, next){
        res.end('Deleting all promotions');
});

//GET, PUT and DELETE operations on /promotiones/:id
promoRouter.route('/:id')
.get(Verify.verifyOrdinaryUser,function(req,res,next){
        res.end('Will send details of the promotion: ' + req.params.id +' to you!');
})
.put(Verify.verifyAdmin, function(req, res, next){
    res.write('Updating the promotion: ' + req.params.id + '\n');
    res.end('Will update the promotion: ' + req.body.name + 
            ' with details: ' + req.body.description);
})
.delete(Verify.verifyAdmin, function(req, res, next){
        res.end('Deleting promotion: ' + req.params.id);
});

module.exports = promoRouter;