if (typeof(localStorage) !== "undefined") {
    if (localStorage.userData === undefined){
		var tempPenjualan = {}
		  localStorage.setItem('detailTransaksi', JSON.stringify(detailTransaksi));
    }
} else {
	alert("Oop's browser anda tidak mendukung penyimpanan lokal!");
}
function setQty(BarangId){
  let id=document.getElementById('BarangId'+BarangId)
  if(!id.checked){
    alert("hapus")
  }else{
    let qty=prompt('Masukan jumlah barang');
    if(qty){
      if(qty!==null){
        let arrItem=[];
        let harga=1500;
        let jml_beli=qty;
        let sub_total=harga*jml_beli;
        let TransaksisId=1;
        let BarangsId=BarangId;
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
