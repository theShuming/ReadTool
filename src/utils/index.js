// 封装一个函数，求 n-m之间随机整数
function randomNumber(n, m) {
    if (n > m) {
        return parseInt(Math.random() * (n - m + 1) + m)
    } else {
        return parseInt(Math.random() * (m - n + 1) + n)
    }
}

// 封装一个随机颜色函数
function randomColor() {
    return "rgb(" + randomNumber(0, 255) + "," + randomNumber(0, 255) + "," + randomNumber(0, 255) + ")";
}

export function randomColor16(){
    // RGB颜色值的正则
    var reg = /^(rgb|RGB)/;
    var color = randomColor();
    if (reg.test(color)) {
      var strHex = "#";
      // 把RGB的3个数值变成数组
      var colorArr = color.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      // 转成16进制
      for (var i = 0; i < colorArr.length; i++) {
        var hex = Number(colorArr[i]).toString(16);
        if (hex === "0") {
          hex += hex;
        }
        strHex += hex;
      }
      return strHex;
    } else {
      return String(color);
    }
}
        