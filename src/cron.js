const CronJob = require('cron').CronJob
const mealController = require('./controllers/meal')
const remindController = require('./controllers/remind')

console.log('start cron')

const MEAL_BREAKFAST = mealController.TYPE_BREAKFAST
const MEAL_LUNCH = mealController.TYPE_LUNCH
const MEAL_DINNER = mealController.TYPE_DINNER

const REMIND_MORNING = remindController.TYPE_MORNING
const REMIND_NIGHT = remindController.TYPE_NIGHT

const breakfastJob = new CronJob({
  cronTime: '0 0 9 * * *',
  onTick: () => {
    console.log('Ask breakfast')
    mealController.ask(MEAL_BREAKFAST)
  },
  start: false,
  timeZone: 'Asia/Tokyo'
})
breakfastJob.start()

const lunchJob = new CronJob({
  cronTime: '0 0 12 * * *',
  onTick: () => {
    mealController.ask(MEAL_LUNCH)
  },
  start: false,
  timeZone: 'Asia/Tokyo'
})
lunchJob.start()

const dinnerJob = new CronJob({
  cronTime: '0 0 18 * * *',
  onTick: () => {
    mealController.ask(MEAL_DINNER)
  },
  start: false,
  timeZone: 'Asia/Tokyo'
})
dinnerJob.start()

const mealJob = new CronJob({
  cronTime: '0 0 20 * * *',
  onTick: () => {
    console.log('Send report')
    mealController.send()
  },
  start: false,
  timeZone: 'Asia/Tokyo'
})
mealJob.start()

const morningRemindJob = new CronJob({
  cronTime: '0 0 8 * * *',
  onTick: () => {
    console.log('Moring remind')
    remindController.ask(REMIND_MORNING)
  },
  start: false,
  timeZone: 'Asia/Tokyo'
})
morningRemindJob.start()

const nightRemindJob = new CronJob({
  cronTime: '0 0 23 * * *',
  onTick: () => {
    remindController.ask(REMIND_NIGHT)
  },
  start: false,
  timeZone: 'Asia/Tokyo'
})
nightRemindJob.start()
