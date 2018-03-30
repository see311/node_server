var express = require('express')
var router = express.Router()
var crypto = require('crypto')
var xmlParser = require('xml2js').parseString
var js2xml = require('js2xml').Js2Xml

// 中间件：检查该路由下每个请求是否是微信发来的
router.use((req, res, next) => {
  let data = req.query

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
    let xmlData = req.rawBody,
      jsData
    let myXml = (xmlData) => {
      return new Promise((resolve, reject) => {
        xmlParser(xmlData, (err, result) => {
          if (err) {
            reject(err)
          } else {
            resolve(result)
          }
        })
      })
    }

    myXml(xmlData).then((result) => {
      jsData = result.xml
      if (jsData.MsgType == 'text') {
        // let resData = '<xml>' +
        //   '<ToUserName><![CDATA[' + jsData.FromUserName[0] + ']]></ToUserName>' +
        //   '<FromUserName><![CDATA[' + message.ToUserName[0] + ']]></FromUserName>' +
        //   '<CreateTime>' + new Date().getTime() + '</CreateTime>' +
        //   '<MsgType><![CDATA[text]]></MsgType>' +
        //   '<Content><![CDATA[' +
        //   jsData.Content + ']]></Content>' +
        //   '</xml>'

        // res.send(resData)
      }
    })
  })

module.exports = router;