/**
 * @link https://developers.line.me/media/messaging-api/sticker_list.pdf
 */
export default class Stickers {

  /* メニューボタン系 */
  static askReminder() {
    return Stickers._create(164) // キラキラ目
  }

  static showReminder() {
    return Stickers._create(34) // 穴からひょっこり
  }

  static cancel() {
    return Stickers._create(165) // 口に人差し指
  }

  static help() {
    return Stickers._create(160) // 化粧してる
  }

  /* 処理完了系 */
  static registered() {
    return Stickers._create(179) // OKAYの札を掲げる
  }

  static edited() {
    return Stickers._create(22) // サングラス
  }

  static deleted() {
    return Stickers._create(175) // ニヤリ
  }

  static done() {
    return Stickers._create(172) // ハートを出してねだるポーズ
  }

  /* 異常系 */
  static badMessage() {
    return Stickers._create(169) // 混乱してる
  }

  static notExist() {
    return Stickers._create(26) // 寝てる
  }

  /* 通知 */
  static notify() {
    return Stickers._create(166) // 応援
  }

  /* 振り返り */
  static perfect() {
    return Stickers._create(100) // KISS ME
  }

  static great() {
    return Stickers._create(22) // サングラス
  }

  static good() {
    return Stickers._create(34) // 穴からひょっこり
  }

  static zero() {
    return Stickers._create(164) // キラキラ目
  }

  static _create(stickerId) {
    return {
      type: 'sticker',
      packageId: '2',
      stickerId: String(stickerId)
    }
  }
}