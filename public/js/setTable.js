if (typeof(localStorage) !== "undefined") {
    if (localStorage.userData === undefined){
		var tempItem = {
             'no':[],
						 'noTrx':[],
						 'id':[],
						 'nama':[],
						 'harga':[],
						 'qty':[],
						 'jumlah':[]
						}

  		localStorage.setItem('tempItem', JSON.stringify(tempItem));
    }
} else {
	alert("Oop's browser anda tidak mendukung penyimpanan lokal!");
}

//list variabel data transaksi item temp
