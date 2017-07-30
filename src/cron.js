const CronJob = require('cron').CronJob
const mealController = require('./controllers/meal')
const remindController = require('./controllers/remind')

console.log('start cron')

const breakfastJob = new CronJob({
  cronTime: '* * 9 * * *',
  onTick: () => {
    console.log('Ask breakfast')
    const type = mealController.TYPE_BREAKFAST
    mealController.ask(type)
  },
  start: false,
  timeZone: 'Asia/Tokyo'
})
breakfastJob.start()

const lunchJob = new CronJob({
  cronTime: '0 0 12 * * *',
  onTick: () => {
    const type = mealController.TYPE_LUNCH
    mealController.ask(type)
  },
  start: false,
  timeZone: 'Asia/Tokyo'
})
lunchJob.start()

const dinnerJob = new CronJob({
  cronTime: '* * 18 * * *',
  onTick: () => {
    const type = mealController.TYPE_DINNER
    mealController.ask(type)
  },
  start: false,
  timeZone: 'Asia/Tokyo'
})
dinnerJob.start()

const mealJob = new CronJob({
  cronTime: '* * 20 * * *',
  onTick: () => {
    console.log('Send report')
    mealController.send()
  },
  start: false,
  timeZone: 'Asia/Tokyo'
})
mealJob.start()

const morningRemindJob = new CronJob({
  cronTime: '* * 8 * * *',
  onTick: () => {
    console.log('Moring remind')
    remindController.askMorning()
  },
  start: false,
  timeZone: 'Asia/Tokyo'
})
morningRemindJob.start()

const nightRemindJob = new CronJob({
  cronTime: '* * 23 * * *',
  onTick: () => {
    console.log('Night remind')
    remindController.askNight()
  },
  start: false,
  timeZone: 'Asia/Tokyo'
})
nightRemindJob.start()
