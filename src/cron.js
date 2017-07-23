const CronJob = require('cron').CronJob
const reportController = require('./controllers/report')

console.log('start cron')

const breakfastJob = new CronJob({
  cronTime: '* * 9 * * *',
  onTick: () => {
    console.log('Ask breakfast')
    const type = reportController.TYPE_BREAKFAST
    reportController.ask(type)
  },
  start: false,
  timeZone: 'Asia/Tokyo'
})
breakfastJob.start()

const lunchJob = new CronJob({
  cronTime: '0 0 12 * * *',
  onTick: () => {
    const type = reportController.TYPE_LUNCH
    reportController.ask(type)
  },
  start: false,
  timeZone: 'Asia/Tokyo'
})
lunchJob.start()

const dinnerJob = new CronJob({
  cronTime: '* * 18 * * *',
  onTick: () => {
    const type = reportController.TYPE_DINNER
    reportController.ask(type)
  },
  start: false,
  timeZone: 'Asia/Tokyo'
})
dinnerJob.start()

const reportJob = new CronJob({
  cronTime: '* * 20 * * *',
  onTick: () => {
    console.log('Send report')
    reportController.send()
  },
  start: false,
  timeZone: 'Asia/Tokyo'
})
reportJob.start()
