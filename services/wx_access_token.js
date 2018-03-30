const axios = require('axios')

const axiosWX = axios.create()
const APPID = process.env.APPID
const APPSECRET = process.env.APPSECRET

console.log(`APPID:${APPID};\nAPPSECRET:${APPSECRET}`)

// axiosWX
//   .get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`)
//   .then(res => {
//     if (!res.data.errcode) {
//       let access_token = res.data.access_token,
//         expires_in = res.data.expires_in,
//         expires_time = new Date().getTime() + expires_in
//     } else {
//       let errcode = res.data.errcode,
//         errmsg = res.data.errmsg
//       console.error(`${errcode}:${errmsg}`);
//     }
//   })
//   .catch(err => {
//     console.error(err);
//   })