import line from './line'

export default async (platform, arg) => {
  switch (platform) {
    case 'line':
      await line(arg)
      break
    default:
      console.log(Error('Invalid platform: ' + platform))
      break
  }
  return 'OK'
}
