"use strict";
var ventanas = []; // Variable que almacenara todas las ventanas abiertas
var divShopsMenu = document.getElementById("ShopsMenu");

function closeAllWindows()
/*Funcion que cierra todas las ventanas abiertas. Si no hay alguna abierta, lanza un mensaje por consola*/
{
  if(ventanas){
    while(ventanas.length > 0){
      ventanas[0].close();
      ventanas.shift();
      console.log(ventanas.length);
    }
  }else{
    console.log("No hay ventanas abiertas");
  }

}
function btnCloseWindows()
/*Funcion que crea un boton para borrar las ventanas y le asocia un evento */
{
  var btnCloseWindows = document.createElement("button");
  btnCloseWindows.className = "btn btn-danger";
  btnCloseWindows.appendChild(document.createTextNode("Cerrar Ventanas"));
  btnCloseWindows.addEventListener("click",closeAllWindows);
  return btnCloseWindows;
}


function ProductInWindowFromShop(shop,itemID)
/*Funcion que abre una nueva ventana del producto seccionado en determinada tienda*/
{
  var tienda = shop;
  var proId = itemID;
  
  return function(){
    var item = shop.getProduct(itemID)
    var ventana = window.open("html_product.html",
              item.producto.nombre + " en al tienda " + tienda.nombre,
              "scrollbars=yes,resizable=yes,,width=800,height=800");
    ventanas.push(ventana);
    ventana.onload = WindowShopPopulate(ventana,shop,proId);
  }
}



function WindowShopPopulate(ventana,shop,IdPro)
/*Funcion que muestra los detalles de un producto en una tienda una vez se ha seleccionado el producto en dicha tienda*/
{ 

  return function(){
    var IdMainCont = ventana.document.getElementById("main-cont");
    var tienda = shop;
    var item = tienda.getProduct(IdPro);
    var divCab = ventana.document.createElement("div");
    divCab.setAttribute("id","cabecera");
    divCab.className = "row";
    IdMainCont.appendChild(divCab);
  
    var h2Cab = ventana.document.createElement("h2");
    h2Cab.setAttribute("id","titleStore");
    h2Cab.className = "col-md-12";
    h2Cab.appendChild(ventana.document.createTextNode(tienda.nombre));
    divCab.appendChild(h2Cab);
    
    var infoTienda = ventana.document.createElement("p");
    infoTienda.className = "infoTienda";
    infoTienda.innerHTML = "Cif: "+tienda.cif;
    IdMainCont.appendChild(infoTienda);
  
    var infoTienda1 = ventana.document.createElement("p");
    infoTienda1.className = "infoTienda";
    infoTienda1.innerHTML = "Direccion: "+tienda.direccion;
    IdMainCont.appendChild(infoTienda1);
  
    var infoTienda2 = ventana.document.createElement("p");
    infoTienda2.className = "infoTienda";
    infoTienda2.innerHTML = "Telefono: "+tienda.telefono;
    IdMainCont.appendChild(infoTienda2);
  
    var divProducto = ventana.document.createElement("div");
    divProducto.setAttribute("id","items");
    IdMainCont.appendChild(divProducto);
  
    var detPro = ventana.document.createElement("div");
    detPro.className = "col-sm-12 detProd";
    detPro.borderBottom = "1px solid rgba(3, 33, 55, 1)";
    divProducto.appendChild(detPro);
    
    var NomPro = ventana.document.createElement("h3");
    NomPro.className = "cabProd";
    NomPro.appendChild(ventana.document.createTextNode(item.producto.nombre + " en la tienda \"" + tienda.nombre + "\""));
    detPro.appendChild(NomPro);
  
    var divImg = ventana.document.createElement("div");
    detPro.appendChild(divImg);
    divImg.className = "col-sm-6 text-center";
  
    var imgPro = ventana.document.createElement("img");
    imgPro.className = "imgProDet";
    imgPro.setAttribute("src",item.producto.imagenes);
    divImg.appendChild(imgPro);
  
    var divInfo = ventana.document.createElement("div");
    divInfo.className = "col-sm-6 infoPro";
    detPro.appendChild(divInfo);
  
    var InfoProducto = ventana.document.createElement("p");
    InfoProducto.innerHTML = "<b>Nombre: </b>" + item.producto.nombre;
    divInfo.appendChild(InfoProducto);
  
    var InfoProducto1 = ventana.document.createElement("p");
    InfoProducto1.innerHTML = "<b>Marca: </b>" + item.producto.marca;
    divInfo.appendChild(InfoProducto1);
  
    var InfoProducto2 = ventana.document.createElement("p");
    InfoProducto2.innerHTML = "<b>En Stock: </b>" + item.cantidad + " Unidades";
    divInfo.appendChild(InfoProducto2);
  
    var InfoProducto3 = ventana.document.createElement("p");
    InfoProducto3.innerHTML = "<b>Precio + I.V.A: </b>" + item.producto.precioConIVA + " €";
    divInfo.appendChild(InfoProducto3);
  
    var InfoProducto4 = ventana.document.createElement("p");
    InfoProducto4.innerHTML = "<b>I.V.A (%): </b>" + item.producto.IVA + " %";
    divInfo.appendChild(InfoProducto4);
  
    var InfoProducto5 = ventana.document.createElement("p");
    InfoProducto5.innerHTML = "<b>Descripcion: </b>" + item.producto.descripcion ;
    divInfo.appendChild(InfoProducto5);
  
    if(item.producto instanceof Movil){
      var InfoProducto6 = ventana.document.createElement("p");
      InfoProducto6.innerHTML = "<b>Camara: </b>" + item.producto.camara ;
      divInfo.appendChild(InfoProducto6);
  
      var InfoProducto7 = ventana.document.createElement("p");
      InfoProducto7.innerHTML = "<b>Memoria: </b>" + item.producto.memoria ;
      divInfo.appendChild(InfoProducto7);
    }
  
    if(item.producto instanceof Ordenador){
      var InfoProducto6 = ventana.document.createElement("p");
      InfoProducto6.innerHTML = "<b>CPU: </b>" + item.producto.cpu ;
      divInfo.appendChild(InfoProducto6);
  
      var InfoProducto7 = ventana.document.createElement("p");
      InfoProducto7.innerHTML = "<b>Memoria: </b>" + item.producto.memoria ;
      divInfo.appendChild(InfoProducto7);
    }
  
    if(item.producto instanceof VideoConsola){
      var InfoProducto6 = ventana.document.createElement("p");
      InfoProducto6.innerHTML = "<b>Numero de Jugadores: </b>" + item.producto.numJugadores ;
      divInfo.appendChild(InfoProducto6);
  
      var InfoProducto7 = ventana.document.createElement("p");
      InfoProducto7.innerHTML = "<b>Portatil: </b>" + item.producto.portatil ;
      divInfo.appendChild(InfoProducto7);
    }
  
    if(item.producto instanceof Camara){
      var InfoProducto6 = ventana.document.createElement("p");
      InfoProducto6.innerHTML = "<b>Lente: </b>" + item.producto.lente ;
      divInfo.appendChild(InfoProducto6);
  
      var InfoProducto7 = ventana.document.createElement("p");
      InfoProducto7.innerHTML = "<b>Memoria: </b>" + item.producto.memoria ;
      divInfo.appendChild(InfoProducto7);
    }
    
  }


}
