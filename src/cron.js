import cron from 'cron'
import Notifier from './tools/Notifier'
import SummaryNotifier from './tools/SummaryNotifier'

console.log('start cron')

new cron.CronJob({
  cronTime: '0 * * * * *', // 1分ごと
  onTick: Notifier.checkOrSend,
  start: true
})

new cron.CronJob({
  cronTime: '0 0 * * * *', // 1時間ごと
  onTick: SummaryNotifier.checkOrSend,
  start: true
})

// promiceでのエラー内容を見られるようにする
process.on('unhandledRejection', console.dir)
