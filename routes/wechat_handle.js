var express = require('express');
var router = express.Router();
var crypto = require('crypto')

router
  .get('/', (req, res, next) => {
    let data = req.query
    console.log(data);
    
    let signature = data.signature,
      timestamp = data.timestamp,
      nonce = data.nonce,
      token = 'weddinginvitationsecrettoken',
      echostr = data.echostr
    let list = [token, timestamp, nonce]
    list.sort()
    let hash = crypto.createHash('sha1')
    hash.update(list.join(''))
    let encode = hash.digest('hex')
    console.log(`encode:${encode}`);
    console.log(`signature:${signature}`);
    
    if (encode == signature){
      console.log(echostr);
      
      res.send(echostr) 
    }else{
      console.log('failed');
      res.send('failed')
    }
  })

module.exports = router;