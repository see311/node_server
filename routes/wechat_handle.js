var express = require('express');
var router = express.Router();
var crypto = require('crypto')

// 中间件：检查该路由下每个请求是否是微信发来的
router.use((req, res, next) => {
  let data = req.query
  console.log(data);

  let signature = data.signature,
    timestamp = data.timestamp,
    nonce = data.nonce,
    token = 'weddinginvitationsecrettoken'
  let list = [token, timestamp, nonce]
  list.sort()
  let hash = crypto.createHash('sha1')
  hash.update(list.join(''))
  let encode = hash.digest('hex')
  if (encode == signature) {
    next()
  } else {
    throw new Error('Permission Denied')
  }
})

router
  .get('/', (req, res, next) => {
    console.log('get');
    
  })
  .post('/', (req, res, next) => {
    console.log('post');
    
  })

module.exports = router;