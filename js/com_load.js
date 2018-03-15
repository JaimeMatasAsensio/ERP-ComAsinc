"use string";
/*Documento para implementar las carga de los objetos literales obtenidos en JSON con AJAX*/

var requestAjax; // Variable para obtener los objetos usuario del JSON
var Store = StoreHouse.getInstance("ManchaStore");

if (window.XMLHttpRequest) {//Comprobamos que el navegador soporte XMLREQUEST
  requestAjax = new XMLHttpRequest();//Creamos el objeto XMLHttpRequest para navegadores nuevos
  
} else {
  requestAjax = new ActiveXObject("Microsoft.XMLHTTP");//Creamos el objeto ActiveXObject para navegaores antiguos
  
}

requestAjax.open("POST","../json/com_compact.json",true)//Abrimos de forma sincrona, para que continue una vez este abierto
requestAjax.send();

requestAjax.onreadystatechange = function(){//Cuando la solicitud recibe la respuesta...
  if (this.readyState == 4 && this.status == 200){//Si la solicitud es ta completa (4) y es estado es correcto (200)
    var compact = JSON.parse(this.responseText);//Obtenemos el objeto compacto con todos los linetrales necesarios para indexedDB
    //console.log(compact);

    //Añadimos los valores del objeto compacto a indexedDB;
    var db;//Variable que almacenara la base de datos
    var db_name = "ManchaStore";//Nombre de la base de datos
    var request = indexedDB.open(db_name,1);// Creacion de la base de datos
    

    request.onerror = function(event){//Si fallo la creacion... error
      console.log(event.target.error.name);
      console.log(event.target.error.message);
    }
    
    request.onsuccess = function(event){//Si la creacion tuvo exito...
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
          //Carga de las categorias del storehouse - Test
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
          //Carga de los usuarios del StoreHouse - Test
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
          //Iterador de tiendas y stock de cada tienda - Test
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
    
    request.onupgradeneeded = function(event){//Si se modificaron/crearon nuevos almacenes...
      console.log("request.onupgradeneeded");
      db = event.target.result;
  
      var almacenTienda = db.createObjectStore("shops",{keyPath:"cif"});
      almacenTienda.createIndex("nombre","nombre",{unique: false});
      for(var i in compact.shops){
        almacenTienda.add(compact.shops[i]);
      }
  
      var almacenUsuarios = db.createObjectStore("users",{keyPath:"IdUsuario"});
      almacenUsuarios.createIndex("nombre","nombre",{unique:true});
      for(var i in compact.users){
        almacenUsuarios.add(compact.users[i]);
      }
  
      var almacenCategorias = db.createObjectStore("categorias",{keyPath: "IdCategory"});
      almacenCategorias.createIndex("titulo","titulo",{unique: false});
      for(var i in compact.categorias){
        almacenCategorias.add(compact.categorias[i]);
      }
  
      var almacenStock = db.createObjectStore("stock",{keyPath: "producto.sn" });
      
      for(var i in compact.stock){
        almacenStock.add(compact.stock[i]);
      }
    }
  }
};





function sendSessionToServer(db)
/*funcion que envia los datos al servidor*/
{
  
}

function saveSessionOnServer()
/*Funcion que obtiene los valores actuales de indexedDB*/
{
  var compact = {categorias:[],users:[],shops:[],stock:[]};//Variable que almacenara todos los objetos de indexedDB en un objeto Literal
  
  var db;//Variable que almacenara la base de datos
  var db_name = "ManchaStore";//Nombre de la base de datos
  var request = indexedDB.open(db_name,1);// Creacion de la base de datos
  
  request.onerror = function(event){//Si fallo la creacion... error
    console.log(event.target.error.name);
    console.log(event.target.error.message);
  }
  
  request.onsuccess = function (event){
    db = event.target.result;

     var almacenCategorias = db.transaction("categorias").objectStore("categorias");
     almacenCategorias.openCursor().onsuccess = function(event){
     var cursor = event.target.result;
       if(cursor){
        compact.categorias.push(cursor.value); 
        cursor.continue()
      }else{
        var almacenStock = db.transaction("stock").objectStore("stock");
        almacenStock.openCursor().onsuccess = function(event){
          var cursor = event.target.result;
          if(cursor){
              compact.stock.push(cursor.value);
              cursor.continue();
            }else{
              var almacenUsers = db.transaction("users").objectStore("users");
              almacenUsers.openCursor().onsuccess = function(event){
                var cursor = event.target.result;
                if(cursor){
                 compact.users.push(cursor.value);
                 cursor.continue();
                }else{
                  var almacenShops = db.transaction("shops").objectStore("shops");
                  almacenShops.openCursor().onsuccess = function(event){
                    var cursor = event.target.result;
                    if(cursor){
                      compact.shops.push(cursor.value)
                      cursor.continue();
                  }else{
                    //Realizamos la conexion al servidor para enviar el fichero
                    var request; // Variable para obtener los objetos usuario del JSON
                    
                    if (window.XMLHttpRequest) {//Comprobamos que el navegador soporte XMLREQUEST
                      request = new XMLHttpRequest();//Creamos el objeto XMLHttpRequest para navegadores nuevos
                      
                    } else {
                      request = new ActiveXObject("Microsoft.XMLHTTP");//Creamos el objeto ActiveXObject para navegaores antiguos
                      
                    }
                    var compactJSON = JSON.stringify(compact);
                    var cookies = giveMeCookies();

                    request.open("POST","../json/com_saveSession.php")//Abrimos de forma asincrona
                    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");//Insertamos esta cabecera
                    request.send("user=" + cookies[1]+"&compact=" + compactJSON);//Añadimos las variables

                    request.onreadystatechange = function(){//Cuando la solicitud recibe la respuesta...
                      if (this.readyState == 4 && this.status == 200){
                        WriteSuccessModal("Sesion Guardada",this.responseText);
                                               

                      }
                    }
                  }
                };

               }
              };

            }
          };
      }
    };  

  };
}
