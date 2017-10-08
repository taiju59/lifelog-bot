import cron from 'cron'
import Notifier from './tools/Notifier'

console.log('start cron')

new cron.CronJob({
  cronTime: '0 * * * * *', // 1分ごと
  onTick: Notifier.checkOrSend,
  start: true
})

// promiceでのエラー内容を見られるようにする
process.on('unhandledRejection', console.dir)
