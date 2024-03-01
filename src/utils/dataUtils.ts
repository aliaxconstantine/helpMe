export function getTimeElapsedString(timestampString: string): string {
  const past = new Date(timestampString);
  const now = new Date();

  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (seconds < 60) {
    return seconds + "秒前";
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return minutes + "分钟前";
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return hours + "小时前";
  } else if (seconds < 2592000) {
    const days = Math.floor(seconds / 86400);
    return days + "天前";
  } else if (seconds < 31536000) {
    const months = Math.floor(seconds / 2592000);
    return months + "月前";
  } else {
    const years = Math.floor(seconds / 31536000);
    return years + "年前";
  }
}

export function getType(type: number):string|undefined{
  const typeList = new Map<number, string>()
   .set(1, "未完成")
   .set(2, "未承接")
   .set(3, "已完成")
  return typeList.get(type)
}

export class Emoji {
  static readonly emojis: Map<string, string> = new Map([
    ["开心", "😀"],
    ["笑脸", "😃"],
    ["微笑", "😄"],
    ["大笑", "😁"],
    ["哈哈", "😆"],
    ["汗笑", "😅"],
    ["捧腹大笑", "🤣"],
    ["快乐", "😂"],
    ["微微一笑", "🙂"],
    ["颠倒脸", "🙃"],
    ["眨眼", "😉"],
    ["害羞", "😊"],
    ["天真", "😇"],
    ["满心欢喜", "🥰"],
    ["色迷迷", "😍"],
    ["星星眼", "🤩"],
    ["飞吻", "😘"],
    ["亲亲", "😗"],
    ["放松", "☺️"],
    ["拥抱", "🤗"],
    ["捂嘴笑", "🤭"],
    ["嘘声", "🤫"],
    ["思考", "🤔"],
    ["拉链嘴", "🤐"]
  ]);
}

export function formatToYMDHM(date:Date|undefined) {
  if (!date) return "";
  var d = new Date(date);
  var year = d.getFullYear();
  var month = ('0' + (d.getMonth() + 1)).slice(-2); // 月份从0开始，因此要加1
  var day = ('0' + d.getDate()).slice(-2);
  var hours = ('0' + d.getHours()).slice(-2);
  var minutes = ('0' + d.getMinutes()).slice(-2);

  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;
}
