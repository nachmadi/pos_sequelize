
var md5 = require('md5');

module.exports = {
    cleanText:function(text) {
        console.log("clean it and return" + text);
    },
    isWithinRange(text, min, max) {
        console.log("check if text is between min and max length");
    },
    getRandom:function(number){
      return Math.floor(Math.random() * number);
    },
    getMd5:function(text, salt){
      return md5(text+salt);
    }
}
