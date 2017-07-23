const CronJob = require('cron').CronJob
const reportController = require('./controllers/report')

const workerJob = new CronJob({
  cronTime: '*/30 * * * * *', //毎10秒実行
  onTick: () => {
    reportController.send()
  },
  start: true, //newした後即時実行するかどうか
  timeZone: 'Asia/Tokyo'
})
workerJob.start()
