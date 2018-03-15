"use strict";
/*Documento para implemetar indexedDB en el ERP. Practica 8*/

function initDB(){
  var db;
  var db_name = "ManchaStore";
  var request = indexedDB.open(db_name,1);
  var Store = StoreHouse.getInstance("ManchaStore");

  request.onerror = function(event){
    console.log(event.target.error.name);
    console.log(event.target.error.message);
  }
  
  request.onsuccess = function(event){
    db = event.target.result;
    
    //Añadimos las categorias al StoreHouse, una vez hecho se añaden los productos
    var almacenCategorias = db.transaction("categorias").objectStore("categorias");
    almacenCategorias.openCursor().onsuccess = function(event){
    var cursor = event.target.result;
      if(cursor){
        var cat = new Category(cursor.value.IdCategory,cursor.value.titulo,cursor.value.descripcion);
        Store.AddCategory(cat);
        cursor.continue();
      }else{
        //Carga de las categorias del storehouse
        /*
        var iteStoreCat = Store.categoryIte;
        var item = iteStoreCat.next();
        while(!item.done){
          console.log(item.value.toString());
          item = iteStoreCat.next();
        }
        //*/
        var almacenStock = db.transaction("stock").objectStore("stock");
        almacenStock.openCursor().onsuccess = function(event){
          var cursor = event.target.result;
          if(cursor){
            switch (cursor.value.producto.tProducto) {
              case "Movil":
                var pro = new Movil(cursor.value.producto.sn,
                                    cursor.value.producto.nombre,
                                    cursor.value.producto.descripcion,
                                    cursor.value.producto.iva,
                                    cursor.value.producto.precio,
                                    cursor.value.producto.imagenes,
                                    cursor.value.producto.marca,
                                    cursor.value.producto.camara,
                                    cursor.value.producto.memoria);
                Store.AddProduct(pro,cursor.value.cantidad,cursor.value.IdCategory);
                break;
              case "Ordenador":
                var pro = new Ordenador(cursor.value.producto.sn,
                                    cursor.value.producto.nombre,
                                    cursor.value.producto.descripcion,
                                    cursor.value.producto.iva,
                                    cursor.value.producto.precio,
                                    cursor.value.producto.imagenes,
                                    cursor.value.producto.marca,
                                    cursor.value.producto.cpu,
                                    cursor.value.producto.memoria);
                Store.AddProduct(pro,cursor.value.cantidad,cursor.value.IdCategory);
                break;
              case "VideoConsola":
                var pro = new VideoConsola(cursor.value.producto.sn,
                                    cursor.value.producto.nombre,
                                    cursor.value.producto.descripcion,
                                    cursor.value.producto.iva,
                                    cursor.value.producto.precio,
                                    cursor.value.producto.imagenes,
                                    cursor.value.producto.marca,
                                    cursor.value.producto.numJugadores,
                                    cursor.value.producto.portatil);
                Store.AddProduct(pro,cursor.value.cantidad,cursor.value.IdCategory);
                break;
              case "Camara":
                var pro = new Camara(cursor.value.producto.sn,
                                    cursor.value.producto.nombre,
                                    cursor.value.producto.descripcion,
                                    cursor.value.producto.iva,
                                    cursor.value.producto.precio,
                                    cursor.value.producto.imagenes,
                                    cursor.value.producto.marca,
                                    cursor.value.producto.lente,
                                    cursor.value.producto.memoria);
                Store.AddProduct(pro,cursor.value.cantidad,cursor.value.IdCategory);
                break;
            }
            cursor.continue();
          }else{
            //Carga de los productos del storehouse
            /*
            var itemStore = Store.stockIte;
            var item = itemStore.next();
            while(!item.done){
              console.log(item.value.producto.toString()+". Cantidad: "+item.value.cantidad+". Categoria: "+Store.getCategory(item.value.categoriaId).titulo);
              item = itemStore.next();
            }
            //*/
          }
        }
      }
    };

    var almacenUsers = db.transaction("users").objectStore("users");
    almacenUsers.openCursor().onsuccess = function(event){
      var cursor = event.target.result;
      if(cursor){
        var user = new User(cursor.value.IdUsuario,cursor.value.nombre,cursor.value.pass);
        Store.AddUser(user);
        cursor.continue();
      }else{
        //Carga de los usuarios del StoreHouse
        /*
        var iteUser = Store.usersIte;
        var item = iteUser.next();
        while(!item.done){
          console.log(item.value.toString());
          item = iteUser.next();
        }
        //*/
      }
    };

    var almacenShops = db.transaction("shops").objectStore("shops");
    almacenShops.openCursor().onsuccess = function(event){
      var cursor = event.target.result;
      if(cursor){
        //console.log(cursor.value);
        var shop = new Shop (cursor.value.cif,
                              cursor.value.nombre,
                              cursor.value.direccion,
                              cursor.value.telefono,
                              new Coords(cursor.value.coords.longitud,cursor.value.coords.latitud));
        var shopCat = cursor.value.category;
        for(var i in shopCat){
          var cat = new Category(shopCat[i].IdCategory,shopCat[i].titulo,shopCat[i].descripcion);
          shop.AddCategory(cat);
        }
        var shopStock = cursor.value.stock;
        //console.log(cursor.value.stock);
        for(var i in shopStock){
          switch (shopStock[i].producto.tProducto) {
            case "Movil":
              var pro = new Movil(shopStock[i].producto.sn,
                                  shopStock[i].producto.nombre,
                                  shopStock[i].producto.descripcion,
                                  shopStock[i].producto.iva,
                                  shopStock[i].producto.precio,
                                  shopStock[i].producto.imagenes,
                                  shopStock[i].producto.marca,
                                  shopStock[i].producto.camara,
                                  shopStock[i].producto.memoria);
              shop.AddProduct(pro,shopStock[i].cantidad,shopStock[i].IdCategory);
              break;
            case "Ordenador":
              var pro = new Ordenador(shopStock[i].producto.sn,
                                    shopStock[i].producto.nombre,
                                    shopStock[i].producto.descripcion,
                                    shopStock[i].producto.iva,
                                    shopStock[i].producto.precio,
                                    shopStock[i].producto.imagenes,
                                    shopStock[i].producto.marca,
                                    shopStock[i].producto.cpu,
                                    shopStock[i].producto.memoria);
              shop.AddProduct(pro,shopStock[i].cantidad,shopStock[i].IdCategory);
              break;
            case "VideoConsola":
              var pro = new VideoConsola(shopStock[i].producto.sn,
                                  shopStock[i].producto.nombre,
                                  shopStock[i].producto.descripcion,
                                  shopStock[i].producto.iva,
                                  shopStock[i].producto.precio,
                                  shopStock[i].producto.imagenes,
                                  shopStock[i].producto.marca,
                                  shopStock[i].producto.numJugadores,
                                  shopStock[i].producto.portatil);
              shop.AddProduct(pro,shopStock[i].cantidad,shopStock[i].IdCategory);
              break;
            case "Camara":
              var pro = new Camara(shopStock[i].producto.sn,
                                  shopStock[i].producto.nombre,
                                  shopStock[i].producto.descripcion,
                                  shopStock[i].producto.iva,
                                  shopStock[i].producto.precio,
                                  shopStock[i].producto.imagenes,
                                  shopStock[i].producto.marca,
                                  shopStock[i].producto.lente,
                                  shopStock[i].producto.memoria);
              shop.AddProduct(pro,shopStock[i].cantidad,shopStock[i].IdCategory);
              break;
          }
        }
        Store.AddShop(shop);
        cursor.continue();
      }else{
        //Iterador de tiendas y stock de cada tienda
        /*
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
        //*/
      }
      
    };


    db.onerror = function(event){
      console.log("Error: " + event.target.error.name + ". " + event.target.error.message);
    }    
  }
  
  request.onupgradeneeded = function(event){
    console.log("request.onupgradeneeded");
    db = event.target.result;

    var almacenTienda = db.createObjectStore("shops",{keyPath:"cif"});
    almacenTienda.createIndex("nombre","nombre",{unique: false});
    for(var i in shops){
      almacenTienda.add(shops[i]);
    }

    var almacenUsuarios = db.createObjectStore("users",{keyPath:"IdUsuario"});
    almacenUsuarios.createIndex("nombre","nombre",{unique:true});
    for(var i in users){
      almacenUsuarios.add(users[i]);
    }

    var almacenCategorias = db.createObjectStore("categorias",{keyPath: "IdCategory"});
    almacenCategorias.createIndex("titulo","titulo",{unique: false});
    for(var i in categorias){
      almacenCategorias.add(categorias[i]);
    }

    var almacenStock = db.createObjectStore("stock",{keyPath: "producto.sn" });
    
    for(var i in stock){
      almacenStock.add(stock[i]);
    }
  }
}

