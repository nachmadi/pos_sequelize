if (typeof(localStorage) !== "undefined") {
    if (localStorage.userData === undefined){
		var detailTransaksi = {
							  'harga':[],
							  'jml_beli':[],
							  'sub_total':[],
							  'TransaksisId':[],
							  'BarangsId':[]
							}
		  localStorage.setItem('detailTransaksi', JSON.stringify(detailTransaksi));
    }
} else {
	alert("Oop's browser anda tidak mendukung penyimpanan lokal!");
}
class Transaksi{
  constructor(harga,jml_beli,sub_total,TransaksisId,BarangsId){
    this.harga=harga;
    this.jml_beli=jml_beli;
    this.sub_total=sub_total;
    this.TransaksisId=TransaksisId;
    
  }
}
function setQty(BarangId){
  let id=document.getElementById('BarangId'+BarangId)
  if(!id.checked){
    alert("hapus")
  }else{
    let qty=prompt('Masukan jumlah barang');
    if(qty){
      if(qty!==null){
        addItem(BarangId,qty)
      }else{
        return
      }
    }else{
      return
    }
  }
}
function addItem(BarangId,qty){
  itemStorage=window.localStorage;
  dbItem='detailTransaksi';
	getItem=itemStorage.getItem(dbItem);
	objItem=JSON.parse(getItem);

	var item=objItem;
  item.harga.push(qty);
  item.jml_beli.push(qty);
  item.sub_total.push(qty);
  item.TransaksisId.push(qty);
  alert(item.harga)
}
