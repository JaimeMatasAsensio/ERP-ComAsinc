"use strict";
/*Documento para crear las distintas funciones que cargaran datos desde Store */

//initDB();//YA NO ES NECESARIO, la carga se hace con AJAX y JSON
//init();//YA NO ES NECESARIO, la carga se realiza atraves de indexedDB

var Store = StoreHouse.getInstance();
var IdMainCont = document.getElementById("main-cont");
var divShopsMenu = document.getElementById("ShopsMenu");
var divCloseWindow = document.getElementById("closeWindow");
divCloseWindow.appendChild(btnCloseWindows());

function initPopulate()
/*Funcion que inicializa la pagina cargando las tiendas que existen dentro del storehouse */
{
  clearMainCont();

  var divCab = document.createElement("div");
  divCab.setAttribute("id","cabecera");
  divCab.className = "row";
  IdMainCont.appendChild(divCab);

  var h2Cab = document.createElement("h2");
  h2Cab.setAttribute("id","titleStore");
  h2Cab.className = "col-md-12";
  h2Cab.appendChild(document.createTextNode(Store.nombre));
  divCab.appendChild(h2Cab);

  var divTiendas = document.createElement("div");
  divTiendas.setAttribute("id","tiendas");
  divTiendas.className = "row";

  IdMainCont.appendChild(divTiendas);

  var shopsIte = Store.shopIte;
  var shop = shopsIte.next();
  var index = 1;
  while(!shop.done){
    var divTienda = document.createElement("div");
    divTienda.setAttribute("id","divTienda");
    divTienda.className = "col-sm-4 text-center";
    divTiendas.appendChild(divTienda);

    var h3Tienda = document.createElement("h3");
    h3Tienda.setAttribute("id","titleShop"+index);
    h3Tienda.appendChild(document.createTextNode(shop.value.nombre));
    divTienda.appendChild(h3Tienda);

    divTienda.appendChild(menuCategoryShopPopulate(shop.value));

    var BtnVerTienda = document.createElement("button");
    BtnVerTienda.setAttribute("id","showShop"+index);
    BtnVerTienda.className = "btn btn-success";
    BtnVerTienda.appendChild(document.createTextNode("Ver Tienda"));

    divTienda.appendChild(BtnVerTienda);

    BtnVerTienda.addEventListener("click",shopPopulate(shop.value));

    index++;
    shop = shopsIte.next();
  }

}




function shopPopulate(shop)
/*Funcion para mostrar los productos de una tienda una vez se ha seleccionado una tienda en concreto */
{
  var tienda = shop;
  return function(){
    clearMainCont();

    var divCab = document.createElement("div");
    divCab.setAttribute("id","cabecera");
    divCab.className = "row";
    IdMainCont.appendChild(divCab);

    var h2Cab = document.createElement("h2");
    h2Cab.setAttribute("id","titleStore");
    h2Cab.className = "col-md-12 text-center";
    h2Cab.appendChild(document.createTextNode(tienda.nombre));
    divCab.appendChild(h2Cab);

    var infoTienda = document.createElement("p");
    infoTienda.className = "infoTienda";
    infoTienda.innerHTML = "Cif: "+tienda.cif;
    IdMainCont.appendChild(infoTienda);

    var infoTienda1 = document.createElement("p");
    infoTienda1.className = "infoTienda";
    infoTienda1.innerHTML = "Direccion: "+tienda.direccion;
    IdMainCont.appendChild(infoTienda1);

    var infoTienda2 = document.createElement("p");
    infoTienda2.className = "infoTienda";
    infoTienda2.innerHTML = "Telefono: "+tienda.telefono;
    IdMainCont.appendChild(infoTienda2);

    var divProductos = document.createElement("div");
    divProductos.setAttribute("id","items");
    IdMainCont.appendChild(divProductos);

    var stockShop = tienda.stockIte;
    var item = stockShop.next();
    while(!item.done){
      
      var detPro = document.createElement("div");
      detPro.className = "col-sm-12 detProd";
      divProductos.appendChild(detPro);
      
      var NomPro = document.createElement("h3");
      NomPro.className = "cabProd";
      NomPro.appendChild(document.createTextNode(item.value.producto.nombre));
      detPro.appendChild(NomPro);
      
      var divImg = document.createElement("div");
      detPro.appendChild(divImg);
      divImg.className = "col-sm-6 text-center";

      var imgPro = document.createElement("img");
      imgPro.setAttribute("src",item.value.producto.imagenes);
      imgPro.className = "imgPro";
      divImg.appendChild(imgPro);

      var divInfo = document.createElement("div");
      detPro.appendChild(divInfo);
      divInfo.className = "col-sm-6 infoPro";

      var InfoProducto = document.createElement("p");
      InfoProducto.innerHTML = "<b>Nombre: </b>" + item.value.producto.nombre;
      divInfo.appendChild(InfoProducto);

      var InfoProducto1 = document.createElement("p");
      InfoProducto1.innerHTML = "<b>Marca: </b>" + item.value.producto.marca;
      divInfo.appendChild(InfoProducto1);

      var InfoProducto4 = document.createElement("p");
      InfoProducto4.innerHTML = "<b>En Stock: </b>" + item.value.cantidad + " Unidades";
      divInfo.appendChild(InfoProducto4);

      var InfoProducto2 = document.createElement("p");
      InfoProducto2.innerHTML = "<b>Precio + I.V.A: </b>" + item.value.producto.precioConIVA + " €";
      divInfo.appendChild(InfoProducto2);

      var InfoProducto3 = document.createElement("p");
      InfoProducto3.innerHTML = "<b>I.V.A (%): </b>" + item.value.producto.IVA + " %";
      divInfo.appendChild(InfoProducto3);

      var BtnDetalleProducto = document.createElement("button");
      BtnDetalleProducto.className = "btn btn-default";
      BtnDetalleProducto.appendChild(document.createTextNode("Detalles del producto"));
      divInfo.appendChild(BtnDetalleProducto);
      BtnDetalleProducto.addEventListener("click",productShopPopulate(shop,item.value.producto.IdProduct));

      var BtnGlobalProducto = document.createElement("button");
      BtnGlobalProducto.className = "btn btn-default";
      BtnGlobalProducto.appendChild(document.createTextNode("Producto en todo el ERP"));
      divInfo.appendChild(BtnGlobalProducto);
      BtnGlobalProducto.addEventListener("click",globalProductPopulate(item.value.producto.IdProduct));

      var BtnVerProducto = document.createElement("button");
      BtnVerProducto.className = "btn btn-success";
      BtnVerProducto.appendChild(document.createTextNode("Ver Producto"));
      divInfo.appendChild(BtnVerProducto);
      BtnVerProducto.addEventListener("click",ProductInWindowFromShop(shop,item.value.producto.IdProduct));

      item = stockShop.next();
    }

    var divAtras = document.createElement("div");
    divAtras.className = "row text-center";
    IdMainCont.appendChild(divAtras);

    var BtnAtras = document.createElement("button");
    BtnAtras.className = "btn btn-success btn-lg";

    var iconGalon = document.createElement("span");
    iconGalon.className = "glyphicon glyphicon-chevron-left";
    BtnAtras.appendChild(iconGalon);
    BtnAtras.appendChild(document.createTextNode("Atras"));
    IdMainCont.appendChild(BtnAtras);


    BtnAtras.addEventListener("click",initPopulate);
  };

}




function productShopPopulate(shop,IdPro)
/*Funcion que muestra los detalles de un producto en una tienda una vez se ha seleccionado el producto en dicha tienda*/
{
  var tienda = shop;
  var item = tienda.getProduct(IdPro);
  return function(){
    clearMainCont();

    var divCab = document.createElement("div");
    divCab.setAttribute("id","cabecera");
    divCab.className = "row";
    IdMainCont.appendChild(divCab);

    var h2Cab = document.createElement("h2");
    h2Cab.setAttribute("id","titleStore");
    h2Cab.className = "col-md-12";
    h2Cab.appendChild(document.createTextNode(tienda.nombre));
    divCab.appendChild(h2Cab);

    var infoTienda = document.createElement("p");
    infoTienda.className = "infoTienda";
    infoTienda.innerHTML = "Cif: "+tienda.cif;
    IdMainCont.appendChild(infoTienda);

    var infoTienda1 = document.createElement("p");
    infoTienda1.className = "infoTienda";
    infoTienda1.innerHTML = "Direccion: "+tienda.direccion;
    IdMainCont.appendChild(infoTienda1);

    var infoTienda2 = document.createElement("p");
    infoTienda2.className = "infoTienda";
    infoTienda2.innerHTML = "Telefono: "+tienda.telefono;
    IdMainCont.appendChild(infoTienda2);

    var divProducto = document.createElement("div");
    divProducto.setAttribute("id","items");
    IdMainCont.appendChild(divProducto);

    var detPro = document.createElement("div");
    detPro.className = "col-sm-12 detProd";
    detPro.borderBottom = "1px solid rgba(3, 33, 55, 1)";
    divProducto.appendChild(detPro);
    
    var NomPro = document.createElement("h3");
    NomPro.className = "cabProd";
    NomPro.appendChild(document.createTextNode(item.producto.nombre + " en la tienda \"" + tienda.nombre + "\""));
    detPro.appendChild(NomPro);

    var divImg = document.createElement("div");
    detPro.appendChild(divImg);
    divImg.className = "col-sm-6 text-center";

    var imgPro = document.createElement("img");
    imgPro.className = "imgProDet";
    imgPro.setAttribute("src",item.producto.imagenes);
    divImg.appendChild(imgPro);

    var divInfo = document.createElement("div");
    divInfo.className = "col-sm-6 infoPro";
    detPro.appendChild(divInfo);

    var InfoProducto = document.createElement("p");
    InfoProducto.innerHTML = "<b>Nombre: </b>" + item.producto.nombre;
    divInfo.appendChild(InfoProducto);

    var InfoProducto1 = document.createElement("p");
    InfoProducto1.innerHTML = "<b>Marca: </b>" + item.producto.marca;
    divInfo.appendChild(InfoProducto1);

    var InfoProducto2 = document.createElement("p");
    InfoProducto2.innerHTML = "<b>En Stock: </b>" + item.cantidad + " Unidades";
    divInfo.appendChild(InfoProducto2);

    var InfoProducto3 = document.createElement("p");
    InfoProducto3.innerHTML = "<b>Precio + I.V.A: </b>" + item.producto.precioConIVA + " €";
    divInfo.appendChild(InfoProducto3);

    var InfoProducto4 = document.createElement("p");
    InfoProducto4.innerHTML = "<b>I.V.A (%): </b>" + item.producto.IVA + " %";
    divInfo.appendChild(InfoProducto4);

    var InfoProducto5 = document.createElement("p");
    InfoProducto5.innerHTML = "<b>Descripcion: </b>" + item.producto.descripcion ;
    divInfo.appendChild(InfoProducto5);

    if(item.producto instanceof Movil){
      var InfoProducto6 = document.createElement("p");
      InfoProducto6.innerHTML = "<b>Camara: </b>" + item.producto.camara ;
      divInfo.appendChild(InfoProducto6);

      var InfoProducto7 = document.createElement("p");
      InfoProducto7.innerHTML = "<b>Memoria: </b>" + item.producto.memoria ;
      divInfo.appendChild(InfoProducto7);
    }

    if(item.producto instanceof Ordenador){
      var InfoProducto6 = document.createElement("p");
      InfoProducto6.innerHTML = "<b>CPU: </b>" + item.producto.cpu ;
      divInfo.appendChild(InfoProducto6);

      var InfoProducto7 = document.createElement("p");
      InfoProducto7.innerHTML = "<b>Memoria: </b>" + item.producto.memoria ;
      divInfo.appendChild(InfoProducto7);
    }

    if(item.producto instanceof VideoConsola){
      var InfoProducto6 = document.createElement("p");
      InfoProducto6.innerHTML = "<b>Numero de Jugadores: </b>" + item.producto.numJugadores ;
      divInfo.appendChild(InfoProducto6);

      var InfoProducto7 = document.createElement("p");
      InfoProducto7.innerHTML = "<b>Portatil: </b>" + item.producto.portatil ;
      divInfo.appendChild(InfoProducto7);
    }

    if(item.producto instanceof Camara){
      var InfoProducto6 = document.createElement("p");
      InfoProducto6.innerHTML = "<b>Lente: </b>" + item.producto.lente ;
      divInfo.appendChild(InfoProducto6);

      var InfoProducto7 = document.createElement("p");
      InfoProducto7.innerHTML = "<b>Memoria: </b>" + item.producto.memoria ;
      divInfo.appendChild(InfoProducto7);
    }


    var divAtras = document.createElement("div");
    divAtras.className = "row text-center";
    IdMainCont.appendChild(divAtras);

    var BtnAtras = document.createElement("button");
    BtnAtras.className = "btn btn-success btn-lg";

    var iconGalon = document.createElement("span");
    iconGalon.className = "glyphicon glyphicon-chevron-left";

    BtnAtras.appendChild(iconGalon);
    BtnAtras.appendChild(document.createTextNode("Atras"));
    IdMainCont.appendChild(BtnAtras);


    BtnAtras.addEventListener("click",shopPopulate(tienda));
  }

}





function menuCategoryShopPopulate(shop)
/*Funcion que muestra un menu de categorias de cada tienda */
{
  var menuCategory = document.createElement("ul");
  menuCategory.className = "list-group text-center";
  var catIte = shop.categoryIte;
  var category = catIte.next();
  while(!category.done){
    if(category.value.IdCategory !== 0){//La categoria general no debe aparece en la lista
      var liCategory = document.createElement("li");
      liCategory.className = "list-group-item";
      liCategory.appendChild(document.createTextNode(category.value.titulo));
      menuCategory.appendChild(liCategory);
      liCategory.addEventListener("click",productCategoryShopPopulate(shop,category.value.IdCategory));
    }
    category = catIte.next();
  }
  return menuCategory;
}





function productCategoryShopPopulate(shop,IdCategory)
/*Funcion que muestra los productos de una tienda filtrados por categoria*/
{
  var tienda = shop;
  var IdCategory = IdCategory;
  return function(){
    clearMainCont();
    var divCab = document.createElement("div");
    divCab.setAttribute("id","cabecera");
    divCab.className = "row";
    IdMainCont.appendChild(divCab);

    var h2Cab = document.createElement("h2");
    h2Cab.setAttribute("id","titleStore");
    h2Cab.className = "col-md-12";
    h2Cab.appendChild(document.createTextNode(tienda.nombre));
    divCab.appendChild(h2Cab);

    var infoTienda = document.createElement("p");
    infoTienda.className = "infoTienda";
    infoTienda.innerHTML = "Cif: "+tienda.cif;
    IdMainCont.appendChild(infoTienda);

    var infoTienda1 = document.createElement("p");
    infoTienda1.className = "infoTienda";
    infoTienda1.innerHTML = "Direccion: "+tienda.direccion;
    IdMainCont.appendChild(infoTienda1);

    var infoTienda2 = document.createElement("p");
    infoTienda2.className = "infoTienda";
    infoTienda2.innerHTML = "Telefono: "+tienda.telefono;
    IdMainCont.appendChild(infoTienda2);

    var divProductos = document.createElement("div");
    divProductos.setAttribute("id","items");
    IdMainCont.appendChild(divProductos);

    var stockShop = tienda.categoriesIte(IdCategory);
    var item = stockShop.next();
    while(!item.done){
      
      var detPro = document.createElement("div");
      detPro.className = "col-sm-12 detProd";
      divProductos.appendChild(detPro);
      
      var NomPro = document.createElement("h3");
      NomPro.className = "cabProd";
      NomPro.appendChild(document.createTextNode(item.value.producto.nombre));
      detPro.appendChild(NomPro);

      var divImg = document.createElement("div");
      detPro.appendChild(divImg);
      divImg.className = "col-sm-6 text-center";

      var imgPro = document.createElement("img");
      imgPro.setAttribute("src",item.value.producto.imagenes);
      imgPro.className = "imgPro";
      divImg.appendChild(imgPro);

      var divInfo = document.createElement("div");
      detPro.appendChild(divInfo);
      divInfo.className = "col-sm-6 infoPro";
      divInfo.style.borderLeft = "2px solid rgba(3, 33, 55, 1)";

      var InfoProducto = document.createElement("p");
      InfoProducto.innerHTML = "<b>Nombre: </b>" + item.value.producto.nombre;
      divInfo.appendChild(InfoProducto);

      var InfoProducto1 = document.createElement("p");
      InfoProducto1.innerHTML = "<b>Marca: </b>" + item.value.producto.marca;
      divInfo.appendChild(InfoProducto1);

      var InfoProducto4 = document.createElement("p");
      InfoProducto4.innerHTML = "<b>En Stock: </b>" + item.value.cantidad + " Unidades";
      divInfo.appendChild(InfoProducto4);

      var InfoProducto2 = document.createElement("p");
      InfoProducto2.innerHTML = "<b>Precio + I.V.A: </b>" + item.value.producto.precioConIVA + " €";
      divInfo.appendChild(InfoProducto2);

      var InfoProducto3 = document.createElement("p");
      InfoProducto3.innerHTML = "<b>I.V.A (%): </b>" + item.value.producto.IVA + " %";
      divInfo.appendChild(InfoProducto3);

      var BtnDetalleProducto = document.createElement("button");
      BtnDetalleProducto.className = "btn btn-default";
      BtnDetalleProducto.appendChild(document.createTextNode("Detalles del producto"));
      divInfo.appendChild(BtnDetalleProducto);
      BtnDetalleProducto.addEventListener("click",productShopPopulate(tienda,item.value.producto.IdProduct));

      var BtnGlobalProducto = document.createElement("button");
      BtnGlobalProducto.className = "btn btn-default";
      BtnGlobalProducto.appendChild(document.createTextNode("Producto en todo el ERP"));
      divInfo.appendChild(BtnGlobalProducto);
      BtnGlobalProducto.addEventListener("click",globalProductPopulate(item.value.producto.IdProduct));

      var BtnVerProducto = document.createElement("button");
      BtnVerProducto.className = "btn btn-success";
      BtnVerProducto.appendChild(document.createTextNode("Ver Producto"));
      divInfo.appendChild(BtnVerProducto);
      BtnVerProducto.addEventListener("click",ProductInWindowFromShop(shop,item.value.producto.IdProduct));

      item = stockShop.next();
    }

    var divAtras = document.createElement("div");
    divAtras.className = "row text-center";
    IdMainCont.appendChild(divAtras);

    var BtnAtras = document.createElement("button");
    BtnAtras.className = "btn btn-success";

    var iconGalon = document.createElement("span");
    iconGalon.className = "glyphicon glyphicon-chevron-left";

    BtnAtras.appendChild(iconGalon);
    BtnAtras.appendChild(document.createTextNode("Atras"));
    IdMainCont.appendChild(BtnAtras);


    BtnAtras.addEventListener("click",initPopulate);
  }
}

function menuShopPopulate(){

  var ulShops = document.createElement("ul");
  ulShops.className = "list-group text-center";
  ulShops.style.margin = "10px auto";
  ulShops.style.width = "20%";

  var liCabecera = document.createElement("li");
  liCabecera.className = "list-group-item list-group-item-info active";
  liCabecera.appendChild(document.createTextNode("TIENDAS"));
  liCabecera.addEventListener("click",initPopulate);
  ulShops.appendChild(liCabecera);

  var shopsIte = Store.shopIte;
  var shop = shopsIte.next();
  while(!shop.done){
    var liItem = document.createElement("li");
    liItem.className = "list-group-item list-group-item-info";
    liItem.appendChild(document.createTextNode(shop.value.nombre));
    liItem.addEventListener("click",shopPopulate(shop.value));
    ulShops.appendChild(liItem);
    shop = shopsIte.next();
  }
  return ulShops;
}


function globalProductPopulate(IdProducto)
/*Funcion que muestra un producto seleccionado en todo el ERP */
{
  var IdProducto = IdProducto;

  return function(){
    clearMainCont();
    var item = Store.getGlobalProduct(IdProducto);

    var divCab = document.createElement("div");
    divCab.setAttribute("id","cabecera");
    divCab.className = "row";
    IdMainCont.appendChild(divCab);

    var h2Cab = document.createElement("h2");
    h2Cab.setAttribute("id","titleStore");
    h2Cab.className = "col-md-12";
    h2Cab.appendChild(document.createTextNode(item.producto.nombre + " en el Store House " + Store.nombre));
    divCab.appendChild(h2Cab);

    var divProducto = document.createElement("div");
    divProducto.setAttribute("id","items");
    IdMainCont.appendChild(divProducto);

    var detPro = document.createElement("div");
    detPro.className = "row";
    detPro.borderBottom = "1px solid rgba(3, 33, 55, 1)";
    divProducto.appendChild(detPro);
    
    var divImg = document.createElement("div");
    detPro.appendChild(divImg);
    divImg.className = "col-sm-6 text-center";

    var imgPro = document.createElement("img");
    imgPro.setAttribute("src",item.producto.imagenes);
    imgPro.className = "imgProDet";
    divImg.appendChild(imgPro);

    var divInfo = document.createElement("div");
    divInfo.className = "col-sm-6 infoPro";
    detPro.appendChild(divInfo);
    divInfo.style.borderLeft = "2px solid rgba(3, 33, 55, 1)";

    var InfoProducto = document.createElement("p");
    InfoProducto.innerHTML = "<b>Nombre: </b>" + item.producto.nombre;
    divInfo.appendChild(InfoProducto);

    var InfoProducto1 = document.createElement("p");
    InfoProducto1.innerHTML = "<b>Marca: </b>" + item.producto.marca;
    divInfo.appendChild(InfoProducto1);

    var InfoProducto2 = document.createElement("p");
    InfoProducto2.innerHTML = "<b>En Stock: </b>" + item.cantidad + " Unidades";
    divInfo.appendChild(InfoProducto2);

    var InfoProducto3 = document.createElement("p");
    InfoProducto3.innerHTML = "<b>Precio + I.V.A: </b>" + item.producto.precioConIVA + " €";
    divInfo.appendChild(InfoProducto3);

    var InfoProducto4 = document.createElement("p");
    InfoProducto4.innerHTML = "<b>I.V.A (%): </b>" + item.producto.IVA + " %";
    divInfo.appendChild(InfoProducto4);

    var InfoProducto5 = document.createElement("p");
    InfoProducto5.innerHTML = "<b>Descripcion: </b>" + item.producto.descripcion ;
    divInfo.appendChild(InfoProducto5);

    if(item.producto instanceof Movil){
      var InfoProducto6 = document.createElement("p");
      InfoProducto6.innerHTML = "<b>Camara: </b>" + item.producto.camara ;
      divInfo.appendChild(InfoProducto6);

      var InfoProducto7 = document.createElement("p");
      InfoProducto7.innerHTML = "<b>Memoria: </b>" + item.producto.memoria ;
      divInfo.appendChild(InfoProducto7);
    }

    if(item.producto instanceof Ordenador){
      var InfoProducto6 = document.createElement("p");
      InfoProducto6.innerHTML = "<b>CPU: </b>" + item.producto.cpu ;
      divInfo.appendChild(InfoProducto6);

      var InfoProducto7 = document.createElement("p");
      InfoProducto7.innerHTML = "<b>Memoria: </b>" + item.producto.memoria ;
      divInfo.appendChild(InfoProducto7);
    }

    if(item.producto instanceof VideoConsola){
      var InfoProducto6 = document.createElement("p");
      InfoProducto6.innerHTML = "<b>Numero de Jugadores: </b>" + item.producto.numJugadores ;
      divInfo.appendChild(InfoProducto6);

      var InfoProducto7 = document.createElement("p");
      InfoProducto7.innerHTML = "<b>Portatil: </b>" + item.producto.portatil ;
      divInfo.appendChild(InfoProducto7);
    }

    if(item.producto instanceof Camara){
      var InfoProducto6 = document.createElement("p");
      InfoProducto6.innerHTML = "<b>Lente: </b>" + item.producto.lente ;
      divInfo.appendChild(InfoProducto6);

      var InfoProducto7 = document.createElement("p");
      InfoProducto7.innerHTML = "<b>Memoria: </b>" + item.producto.memoria ;
      divInfo.appendChild(InfoProducto7);
    }


    var divAtras = document.createElement("div");
    divAtras.className = "row text-center";
    IdMainCont.appendChild(divAtras);

    var BtnAtras = document.createElement("button");
    BtnAtras.className = "btn btn-success";

    var iconGalon = document.createElement("span");
    iconGalon.className = "glyphicon glyphicon-chevron-left";

    BtnAtras.appendChild(iconGalon);
    BtnAtras.appendChild(document.createTextNode("Atras"));
    IdMainCont.appendChild(BtnAtras);

    BtnAtras.addEventListener("click",initPopulate);
  }
}

function clearMainCont()
/*Funcion para limpiar el contenido de la division con id main-cont */
{
  var allChilds = IdMainCont.children;
  while(allChilds.length > 0) {
    IdMainCont.removeChild(allChilds[0]);
  }
}

window.setTimeout(function(){
  initPopulate();
  divShopsMenu.appendChild(menuShopPopulate());
  window.clearTimeout();
},200);


