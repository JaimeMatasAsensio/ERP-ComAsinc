"use strict";



function init()
/*Funcion que inicaliza todo el ERP, las tiendas que lo componen asi como los productos y las categorias*/
{
  //Instanciacion de los Objetos Categoria
  var cat0 = new Category(0,"General","Productos");
  var cat1 = new Category(1,"Comunicacion","Telefonos moviles, Fijos, radios de onda corta, radios de onda larga y todo tipo de equipos relacionados con la comunicacion.");
  var cat2 = new Category(2,"Imagen","Equipos fotograficos, grabacion de Video y todo tipo de equipos relacionados con la Imagen.");
  var cat3 = new Category(3,"VideoConsolas","Videoconsolas fijas o portatiles, mandos y complementos.");
  
  /*
  console.log(cat1.toString());
  console.log(cat2.toString());
  console.log(cat3.toString());
  */

  //Instanciacion de los Objetos Producto

  var pro1 = new Movil("0001Apple","Iphone X","La ultima version de movil de la conocida marca de la manzana...",24,849.99,"../imagenes/iphoneX.jpg","Apple","50Mpx","120Gb");
  var pro2 = new Movil("0001Samsumg","Galaxy S8","El ultimo movil de la competencia de la manzana",24,799.99,"../imagenes/gs8.jpg","Samsumg","50Mpx","120Gb");

  var pro3 = new Camara("0001Fuji","Fuji Reflex","Una camara para profesionales de la fotografia",18,1045,"../imagenes/fujifilm.jpg","FujiFilm","Digital","36Gb");
  var pro4 = new Camara("0001Canon","Canon Reflex","Camara Reflex para profesionales de la fotografia",18,1258,"../imagenes/canon.jpg","Canon","Digital","50Gb");

  var pro5 = new VideoConsola("0001Sony","Play Station 4 500Gb","Video consola de ultima generacion para amantes de los videojuegos de poca duracion",24,298,"../imagenes/ps4.jpg","Sony","6 Jugadores","No");
  var pro6 = new VideoConsola("0001Nintendo","Nintendo 3DS 3D","Video consola portatil para los que les gusta jugar en cualquier momento",24,94,"../imagenes/3ds.jpg","Nintendo","1 Jugador","Si");

  /*
  console.log("");
  console.log(pro1.toString());
  console.log(pro2.toString());
  console.log(pro3.toString());
  console.log(pro4.toString());
  console.log(pro5.toString());
  console.log(pro6.toString());
  */

  //Instanciacion de los Objetos Coords

  var cor1 = new Coords(1,1);
  var cor2 = new Coords(2,2);
  var cor3 = new Coords(3,3);

  /*
  console.log("");
  console.log(cor1.toString());
  console.log(cor2.toString());
  console.log(cor3.toString());
  */

  //Instanciacion de los Objetos Shop

  var shop1 = new Shop("134568","Moviles Benito","Plaza Mayor Nº2, Chillon","926202020",cor2);
  var shop2 = new Shop("134569","Camaras Pancracio","C/El Azogue Nº1, Almaden","926212121",new Coords(1,1));
  var shop3 = new Shop("789469","Electro Barato","C/Calatrava Nº86, Ciudad Real","926245056",cor3);

  /*
  console.log("");
  console.log(shop1.toString());
  console.log(shop2.toString());
  console.log(shop3.toString());
  */

  //Añadimos productos a las tiendas

  shop1.AddCategory(cat0);
  shop1.AddCategory(cat1);
  shop1.AddProduct(pro1,10,1);
  shop1.AddProduct(pro2,15,1);

  /*
  var iteShop1 = shop1.stockIte;
  var item = iteShop1.next();
  while(!item.done){
    console.log(item.value.producto.toString()+". Unidades: "+item.value.cantidad+". Categoria: "+shop1.getCategory(item.value.categoriaId).toString());
    item = iteShop1.next();
  }
  */

  shop2.AddCategory(cat0);
  shop2.AddCategory(cat2);
  shop2.AddProduct(pro3,4,2);
  shop2.AddProduct(pro4,3,2);

  shop3.AddCategory(cat0);
  shop3.AddCategory(cat1);
  shop3.AddCategory(cat2);
  shop3.AddCategory(cat3);

  shop3.AddProduct(pro1,5,1);
  shop3.AddProduct(pro3,2,2);
  shop3.AddProduct(pro5,4,3);
  shop3.AddProduct(pro6,8,3);

  /*//Iterador de productos de la tienda 3 mostrando la categoria de cada producto
  var iteShop3 = shop3.stockIte;
  var item = iteShop3.next();
  while(!item.done){
    console.log(item.value.producto.toString()+". Unidades: "+item.value.cantidad+". Categoria: "+shop3.getCategory(item.value.categoriaId).toString());
    item = iteShop3.next();
  }
  */

  var Store = StoreHouse.getInstance("ManchaStore");
  /*//Nombre del StoreHouse
  console.log("");
  console.log("Nombre del Store House: "+Store.nombre);
  */

  Store.AddCategory(cat0);
  Store.AddCategory(cat1);
  Store.AddCategory(cat2);
  Store.AddCategory(cat3);

  /*//Iterador de categorias almacenadas en Store
  var iteStoreCat = Store.categoryIte;
  var item = iteStoreCat.next();
  while(!item.done){
    console.log(item.value.toString());
    item = iteStoreCat.next();
  }
  */
  
  Store.AddProduct(pro1,10,1);
  Store.AddProduct(pro2,5,1);
  Store.AddProduct(pro3,6,2);
  Store.AddProduct(pro4,3,2);
  Store.AddProduct(pro5,3,3);
  Store.AddProduct(pro6,8,3);
  
  
  //Iterador de productos almacenados en StoreHouse con su categoria
  var itemStore = Store.stockIte;
  var item = itemStore.next();
  while(!item.done){
    console.log("");
    console.log(item.value.producto.toString()+". Cantidad: "+item.value.cantidad+". Categoria: "+Store.getCategory(item.value.categoriaId).titulo);
    item = itemStore.next();
  }
  

  Store.AddShop(shop1);
  Store.AddShop(shop2);
  Store.AddShop(shop3);

  //Creamos las instancias de usuario
  var user1 = new User(1,"prueba","prueba");//instancia de prueba de un usuario
  var user2 = new User(2,"Jaime","123456789");//instancia de prueba de un segundo usuario

  //Añadimos los usuarios al storeHouse
  Store.AddUser(user1);
  Store.AddUser(user2);


  /*//Pruebas de los objetos usuario
  try{
  var aux = Store.GetUserByName("prueba");
  console.log(aux.toString());
  
  aux = Store.GetUserByName("Jaime");
  console.log(aux.toString());
  
  var iteUser = Store.usersIte;
  var item = iteUser.next();
  while(!item.done){
    console.log(item.value.toString());
    item = iteUser.next();
  }

  }catch(e){
    console.log("Error: "+e.message);
  }
  */



  /*//iterador de las tiendas y de los productos de cada tienda;
  var iteStoreShops = Store.shopIte;
  var shop = iteStoreShops.next();
  while(!shop.done){
    console.log("Stock de la Tienda: "+shop.value.nombre);
    var iteShop = shop.value.stockIte;
    var item = iteShop.next();
    while(!item.done){
      console.log(item.value.producto.toString()+". Cantidad: " + item.value.cantidad + ". Categoria: " + shop.value.getCategory(item.value.categoriaId).titulo);
      item = iteShop.next();
    }
    console.log("")
    shop = iteStoreShops.next();
  }
  */
}
