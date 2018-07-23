const express = require('express')

const app = express()
const historyData = require('./mockdata/history/index.json')
const apiRoutes = express.Router();

app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});
apiRoutes.get('/superVipRead/purchase/history', function(req, res) {
  res.json(historyData)
})

apiRoutes.get('/superVipRead/purchase/saved',function (req, res) {

  res.json({
    "code": "0",
    "data": {
      "totalSave":"1000.00",
      "monthLeft":"300.00"
    }
  })
})

apiRoutes.get('/superVipRead/memberInfo',function (req,res) {
  res.json({
    "code": "0",
    "data": {
      "headUrl": "www.baidu.com/img/bd_logo1.png",
      "memberId": "007",
      "nickName":"田小九",
      "periodEnd": "2019-04-26"
    }
  })
})




app.use('/ouser-center/', apiRoutes)

console.log('mockdata:server localhost:' + 3000)

app.listen(3000)
