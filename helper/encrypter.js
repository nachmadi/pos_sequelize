var cryptorjs = require('cryptorjs');
class Tools{
  static rand(){
    let str='ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    let rand='';
    for (var i = 0; i < 6; i++){
      rand+=str.charAt(Math.floor(Math.random() * str.length));
    }
    return rand;
  }
  static crypt(pass,rand){
    let Encrypt=new cryptorjs(rand);
    var encoded = Encrypt.encode(pass);
    return encoded;
  }
}
module.exports=Tools
