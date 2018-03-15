"use strict";
/**Documento para realizar distintas pruebas Sobre los objetos, y patrones de diseño que componen la practica 4*/
console.log("--- Test de Objetos ---");

console.log("");
console.log("- Objetos Product");
var pro1 = new Movil(1,"Iphone X","La ultima version de movil de la conocida marca de la manzana...",24,849.99,"imagenes","Apple","50Mpx","120Gb");
console.log(pro1.toString());
console.log(pro1.nombre+" instanceof Product: "+(pro1 instanceof Product));
console.log(pro1.nombre+" instanceof Movil: "+(pro1 instanceof Movil));
console.log(pro1.nombre+" instanceof Camara: "+(pro1 instanceof Camara));
console.log(pro1.nombre+" instanceof Ordendor: "+(pro1 instanceof Ordenador));

var pro2 = new Ordenador(2,"GTS-1704-T3","Ordenador Portatil de ultima generacion",21,789.50,"imagenes","MSI","Intel i7","6Tb");
console.log(pro2.toString());
console.log(pro2.nombre+" instanceof Product: "+(pro2 instanceof Product));
console.log(pro2.nombre+" instanceof Movil: "+(pro2 instanceof Movil));
console.log(pro2.nombre+" instanceof Camara: "+(pro2 instanceof Camara));
console.log(pro2.nombre+" instanceof Ordendor: "+(pro2 instanceof Ordenador));

var pro3 = new Camara(3,"Fuji Reflex","Una camara para profesionales de la fotografia",18,1045,"imagenes","FujiFilm","Digital","36Gb");
console.log(pro3.toString());
console.log(pro3.nombre+" instance of Product: "+(pro3 instanceof Product));
console.log(pro3.nombre+" instance of Movil: "+(pro3 instanceof Movil));
console.log(pro3.nombre+" instance of Camara: "+(pro3 instanceof Camara));
console.log(pro3.nombre+" instance of Ordendor: "+(pro3 instanceof Ordenador));

var pro4 = new Movil(4,"Galaxy S8","El ultimo movil de la competencia de la manzana",24,849.99,"imagenes","Samsumg","50Mpx","120Gb");
console.log(pro4.toString());
console.log(pro4.nombre+" instanceof Product: "+(pro4 instanceof Product));
console.log(pro4.nombre+" instanceof Movil: "+(pro4 instanceof Movil));
console.log(pro4.nombre+" instanceof Camara: "+(pro4 instanceof Camara));
console.log(pro4.nombre+" instanceof Ordendor: "+(pro4 instanceof Ordenador));

console.log("");
console.log("- Objetos Category");

var cat1 = new Category("Comunicacion","Telefonos moviles, Fijos, radios de onda corta, radios de onda larga y todo tipo de equipos relacionados con la comunicacion.");
console.log(cat1.toString());
console.log(cat1.titulo+" instance of Category: "+(cat1 instanceof Category));
var cat2 = new Category("Informatica","Equipos informaticos, Sobremesa, Portatiles, todo tipo de equipos relacionados con la informatica.");
console.log(cat2.toString());
console.log(cat2.titulo+" instance of Category: "+(cat2 instanceof Category));
var cat3 = new Category("Imagen","Equipos fotograficos, grabacion de Video y todo tipo de equipos relacionados con la Imagen.");
console.log(cat3.toString());
console.log(cat3.titulo+" instance of Category: "+(cat3 instanceof Category));

console.log("");
console.log("- Objetos Shop");
var coord1 = new Coords(123456546,11654654)
var shop1 = new Shop("1136458","Electronica Agapito","PozoSeco de CampoMarchito; C/Virgen del pompete ; nº1","926241515",coord1);
console.log(shop1.toString());
console.log(shop1.nombre + " instance of Shop: " + (shop1 instanceof Shop));
console.log("");
console.log("Añadimos categoria a la tienda...");
console.log("Added new category, number of categories: " + shop1.AddCategory(cat1));
console.log("Added new category, number of categories: " + shop1.AddCategory(cat2));
console.log("Added new category, number of categories: " + shop1.AddCategory(cat3));

console.log("Remove a category, number of categories: "+shop1.RemoveCategory(cat3.IdCategory));
console.log("Added new category, number of categories : " + shop1.AddCategory(cat3));
console.log("");
console.log("Iterador de categorias "+shop1.nombre+" (shop1)");
var ite = shop1.categoryIte;
var cate = ite.next();
while(!cate.done){
  console.log("Id Category: "+cate.value.IdCategory+". Titulo: " + cate.value.titulo);
  cate = ite.next();
}
console.log("");
console.log("Añadimos produtos a la tienda...");
console.log("New product in shop! Number of products: "+shop1.AddProduct(pro1,10,1));
console.log("New product in shop! Number of Products: "+shop1.AddProduct(pro4,10,1));
console.log("Added 20 units to product with ID 1. Total quantity:  "+shop1.AddQuantityProduct(1,20));
console.log("New product in shop! Number of Products: "+shop1.AddProduct(pro2,10,2));
console.log("New product in shop! Number of Products: "+shop1.AddProduct(pro3,10,3));
console.log("Removed Product with ID 3. Number of products " + shop1.RemoveProduct(3));

console.log("");
console.log("Iterador de stock "+shop1.nombre+" (shop1)");
ite = shop1.stockIte;
var item = ite.next();
while(!item.done){
  console.log("Id Producto: "+item.value.producto.IdProduct+". Nombre: "+item.value.producto.nombre+". Marca: "+item.value.producto.marca+". Cantidad: "+item.value.cantidad+". Id Categoria: "+item.value.categoriaId);
  item = ite.next();
}

console.log("");
console.log("Iterador del stock"+shop1.nombre+" por categoria (shop1)");
var iteC = shop1.categoriesIte(1);
var itemC = iteC.next();
while(!itemC.done){
  console.log("Id Producto: "+itemC.value.producto.IdProduct+". Nombre: "+itemC.value.producto.nombre+". Id category: "+itemC.value.categoriaId);
  itemC = iteC.next();
}
console.log("");
console.log("- Objeto StoreHouse");
try {
  var ErrStore = StoreHouse.getInstance();
} catch (e) {
  console.log("Error: "+e.toString());
}
var Store = StoreHouse.getInstance("Store Villa las Cañas");
console.log("Nombre del Store House: "+Store.nombre);
console.log("");
console.log("Añadimos categorias al store House");
console.log("Added new category, number of categories: " + Store.AddCategory(cat1) + ". For store: "+Store.nombre);
console.log("Added new category, number of categories: " + Store.AddCategory(cat2) + ". For store: "+Store.nombre);
console.log("Added new category, number of categories: " + Store.AddCategory(cat3) + ". For store: "+Store.nombre);
console.log("Removed category, number of categories: " + Store.RemoveCategory(cat3.IdCategory) + ". For store: " + Store.nombre);
console.log("Added new category, number of categories: " + Store.AddCategory(cat3) + ". For store: "+Store.nombre);

console.log("");
console.log("Iterador de categorias para store: "+Store.nombre);
ite = Store.categoryIte;
var catStore = ite.next();
while(!catStore.done){
  console.log("Categoria: "+catStore.value.titulo+". Id category "+catStore.value.IdCategory+". Store: "+Store.nombre);
  catStore = ite.next();
}

console.log("");
console.log("Añadimos productos al stock del store...");
console.log("New product in Store House! Number of products: " + Store.AddProduct(pro1,10,1));
console.log("Added 30 units to product with ID 4. Total Quantity: " + Store.AddQuantityProduct(1,5));
console.log("New product in Store House! Number of products: " + Store.AddProduct(pro2,10,2));
console.log("New product in Store House! Number of products: " + Store.AddProduct(pro3,10,3));
console.log("Removed product in Store House! Number of products: " + Store.RemoveProduct(3));
console.log("New product in Store House! Number of products: " + Store.AddProduct(pro4,10,1));

console.log("");
console.log("Iterador del stock del store House" + Store.nombre);
ite = Store.stockIte;
var itemStore = ite.next();
while(!itemStore.done){
  console.log("Id producto: "+itemStore.value.producto.IdProduct + ". Nombre: " + itemStore.value.producto.nombre +". Cantidad: " + itemStore.value.cantidad);
  itemStore = ite.next();
}

console.log("");
console.log("Iterador del stock del store house " + Store.nombre + " Filtrado por categoria");
ite = Store.categoriesIte(1);
var itemStoreFilter = ite.next();
while(!itemStoreFilter.done){
  console.log("Id producto: "+itemStoreFilter.value.producto.IdProduct + ". Nombre: " + itemStoreFilter.value.producto.nombre +". Cantidad: " + itemStoreFilter.value.cantidad);
  itemStoreFilter = ite.next();
}

console.log("");
console.log("Añadimos tiendas (Objetos Shop) al store house...");
try {
  console.log("New shop added to store house. Number of shops in store House: "+Store.AddShop(shop1));
  console.log("New shop added to store house. Number of shops in store House: "+Store.AddShop(shop1));
} catch (e) {
  console.log("Error: "+e.toString())
}
try {
  console.log("Remove shop from store house. Number of shops in store House: " + Store.RemoveShop(shop1.cif));
  console.log("Remove shop from store house. Number of shops in store House: " + Store.RemoveShop(shop1.cif));
} catch (e) {
  console.log("Error: " + e.toString());
}
console.log("New shop added to store house. Number of shops in store House: "+Store.AddShop(shop1));
console.log("");
console.log("Añadimos un producto a una de las tiendas dentro del store house...");
try {
  console.log("New Product added to shop "+shop1.cif+" in store house " + Store.nombre + ". Number of products: " + Store.AddProductInShop(shop1.cif,pro3,10,3));
  console.log("Add 23 units to the product "+pro3.IdProduct+" form the shop "+shop1.cif+" at store "+Store.nombre + ". Total units: "+ Store.AddQuantityProductInShop(shop1.cif,pro3.IdProduct,23));
} catch (e) {
  console.log("Error: " + e.toString());
}



console.log("");
console.log("Iterador de la tienda " + shop1.cif + " dentro del store house "+ Store.nombre);
ite = Store.getShopProducts(shop1.cif);
var shopStore = ite.next();
while(!shopStore.done){
  console.log("Product ID: " + shopStore.value.producto.IdProduct + ". Nombre producto: " + shopStore.value.producto.nombre + ". Cantidad: "+shopStore.value.cantidad + " unidades.");
  shopStore = ite.next();
}

console.log("");
console.log("Iterador de la tienda " + shop1.cif + " dentro del store house "+ Store.nombre + " filtrados por la categoria ID 1.");
ite = Store.getShopProductsFiltered(shop1.cif,1);
var shopStore = ite.next();
while(!shopStore.done){
  console.log("Product ID: " + shopStore.value.producto.IdProduct + ". Nombre producto: " + shopStore.value.producto.nombre + ". Cantidad: "+shopStore.value.cantidad + " unidades. Categoria ID: " + shopStore.value.categoriaId);
  shopStore = ite.next();
}

