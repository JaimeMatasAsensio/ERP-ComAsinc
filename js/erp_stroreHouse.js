"use strict";
/* Documento para implemetar el objecto storehose */


//Bloque de errores para storeHouse

function EmptyNameStoreHouse(){
  this.name = "EmptyNameStoreHouse";
  this.message = "The storehouse needs a name";
}
EmptyNameStoreHouse.prototype = new TemplateError();
EmptyNameStoreHouse.prototype.constructor = EmptyNameStoreHouse;
EmptyNameStoreHouse.prototype.toString = function(){
  return TemplateError.prototype.toString.call(this);
}

function NotAnObjectProduct()
/*Error lanzado cuando no se añade un objeto de la instancia Product */
{
  this.name = "NoAnObjectProduct.";
  this.message = "Object added to stock storeHose isn`t a Product Object";
}
NotAnObjectProduct.prototype = new TemplateError();
NotAnObjectProduct.prototype.constructor = NotAnObjectProduct;
NotAnObjectProduct.prototype.toString = function(){
  return TemplateError.prototype.toString.call(this);
}

function NotAnObjectCategory()
/*Error lanzado cuando no se añade un objeto de la instancia Category */
{
  this.name = "NoAnObjectCategory.";
  this.message = "Object added to stock store house isn`t a Category Object";
}
NotAnObjectCategory.prototype = new TemplateError();
NotAnObjectCategory.prototype.constructor = NotAnObjectCategory;
NotAnObjectCategory.prototype.toString = function(){
  return TemplateError.prototype.toString.call(this);
}

function NotAnObjectShop()
/*Error lanzado cuando no se añade un objeto de la instancia Shop */
{
  this.name = "NotAnObjectShop.";
  this.message = "Object added to Shop`s store house isn`t a Shop Object";
}
NotAnObjectShop.prototype = new TemplateError();
NotAnObjectShop.prototype.constructor = NotAnObjectShop;
NotAnObjectShop.prototype.toString = function(){
  return TemplateError.prototype.toString.call(this);
}

function ShopAlreadyExistInStore(shopCif,storeName)
/*Error lanzado cuando no existe la categoria dentro del array de categorias de la tienda*/
{
  this.name = "ShopAlreadyExistInStore.";
  this.message = "This shop, '"+shopCif+"', Already exist in store '"+storeName+"'.";
}
ShopAlreadyExistInStore.prototype = new TemplateError();
ShopAlreadyExistInStore.prototype.constructor = ShopAlreadyExistInStore;
ShopAlreadyExistInStore.prototype.toString = function(){
  return TemplateError.prototype.toString.call(this);
}

function ShopNotExistInStore(cifShop,storeName)
/*Error lanzado cuando no existe la tienda dentro del array de tiendas*/
{
  this.name = "ShopNotExistInStore.";
  this.message = "This Shop with cif value equal to '"+cifShop+"', not exist in store house '"+storeName+"'.";
}
ShopNotExistInStore.prototype = new TemplateError();
ShopNotExistInStore.prototype.constructor = ShopNotExistInStore;
ShopNotExistInStore.prototype.toString = function(){
  return TemplateError.prototype.toString.call(this);
}

function CategoryNotExistInStore(catId,storeName)
/*Error lanzado cuando no existe la categoria dentro del array de categorias del store*/
{
  this.name = "CategoryNotExistInStore.";
  this.message = "This category, '"+catId+"', not exist in store house '"+storeName+"'.";
}
CategoryNotExistInStore.prototype = new TemplateError();
CategoryNotExistInStore.prototype.constructor = CategoryNotExistInStore;
CategoryNotExistInStore.prototype.toString = function(){
  return TemplateError.prototype.toString.call(this);
}

function CategoryAlreadyExistInStore(catId,storeName)
/*Error lanzado cuando no existe la categoria dentro del array de categorias de la tienda*/
{
  this.name = "CategoryAlreadyExistInStore.";
  this.message = "This category, '"+catId+"', Already exist in store '"+storeName+"'.";
}
CategoryAlreadyExistInStore.prototype = new TemplateError();
CategoryAlreadyExistInStore.prototype.constructor = CategoryAlreadyExistInStore;
CategoryAlreadyExistInStore.prototype.toString = function(){
  return TemplateError.prototype.toString.call(this);
}

function InvalidCuantitieValue(value,prop)
/*Error lanzado con no se añade un valor adecuado en cantidad de producto */
{
  this.name = "InvalidCuantitieValue.";
  this.message = "This value, '"+value+"', must be an integer number for the propierty '"+prop+"'.";
}
InvalidCuantitieValue.prototype = new TemplateError();
InvalidCuantitieValue.prototype.constructor = InvalidCuantitieValue;
InvalidCuantitieValue.prototype.toString = function(){
  return TemplateError.prototype.toString.call(this);
}

function ProductNotExistInStore(Id,storeName)
/*Error lanzado cuando no existe la producto dentro del array de stock de la tienda*/
{
  this.name = "ProductNotExistInShop.";
  this.message = "This Product, '"+Id+"', not exist in store '"+storeName+"'.";
}
ProductNotExistInStore.prototype = new TemplateError();
ProductNotExistInStore.prototype.constructor = ProductNotExistInStore;
ProductNotExistInStore.prototype.toString = function(){
  return TemplateError.prototype.toString.call(this);
}

function NotAnObjectUser()
/*Error lanzado cuando no se añade un objeto usuario al array _users*/
{
  this.name = "NotAnObjectUser.";
  this.message = "This object isn`t a instace of User object...";
}
NotAnObjectUser.prototype = new TemplateError();
NotAnObjectUser.prototype.constructor = NotAnObjectUser;
NotAnObjectUser.prototype.toString = function(){
  return TemplateError.prototype.toString.call(this);
}

function UserAlreadyRegistred(userObj)
/*Error lanzado cuando el usuario que se va a añadir ya esta registrado*/
{
  this.name = "UserAlreadyRegistred.";
  this.message = "The user, " + userObj.nombre + ", are registered on the system.";
}
UserAlreadyRegistred.prototype = new TemplateError();
UserAlreadyRegistred.prototype.constructor = UserAlreadyRegistred;
UserAlreadyRegistred.prototype.toString = function(){
  return TemplateError.prototype.toString.call(this);
}



// Implementacion del StoreHouse como Singleton
var StoreHouse = (function(){
  var instanciado;

  function init(name){

    function StoreHouse (nombre){

      //parametros privados
      if(!name) throw new EmptyNameStoreHouse();
      var _nombreStore = nombre;
      var _category = []; // _category[0] = {CategoryObj}
      var _stock = []; //_stock[0] = {producto: ProductObj, cantidad: integer > 0, categoriaId: IdCategory}
      var _shops = []; // _shops[0] = {ShopObj}
      var _users = []; // _users = {UserObj}

      // Getters  & Setters
      Object.defineProperty(this,"nombre",{
        get: function(){ return _nombreStore },
        set: function(NewNombreStore){
          if(!NewNombreStore) throw new EmptyNameStoreHouse();
          _nombreStore = NewNombreStore;
        }
      });
      //Metodos publicos

        //Metodos para controlar _category = []
        /*
        Ejemplo de un valor en _category
        _category[0] = {objCategory}
        */
        this.AddCategory = function (obj)
        /*Metodo para añadir una categoria al array de categorias de la tienda*/
        {
          if(!(obj instanceof Category)) throw new NotAnObjectCategory();
          var i = 0;
          var exist = false;
          while(i < _category.length && !exist){
            if(_category[i].IdCategory === obj.IdCategory){
              exist = true;
            }
            if(!exist) i++;
          }
          if(!exist){
            _category.push(obj);
            return _category.length;
          }else{
            throw new CategoryAlreadyExistInStore(obj.IdCategory,_nombreStore);
          }

        }

        this.AddCategoryInShop = function (cifShop,obj)
        /*Funcion para añadir una categoria a una tienda dentro del storeHouse */
        {
          if(!(obj instanceof Category)) throw new NotAnObjectCategory();
          
          var index = _shops.findIndex(function(element){
            return cifShop == element.cif;
          });

          if(index != -1){
            _shops[index].AddCategory(obj);
          }else{
            throw new ShopNotExistInStore(cifShop,_nombreStore);
          }
        }

        this.getCategory = function(IdCat)
        /*Metodo que devuelve un objeto categoria indicando su id*/
        {
          var i = _category.findIndex(function(element){
            return (element.IdCategory == IdCat)
          });
          if(i != -1){
            return _category[i];
          }else{
            throw new CategoryNotExistInStore(IdCat,_nombreStore);
          }
        }

        this.setCategory = function(IdCat,obj)
        /*Metodo que modifica una categoria, necesario el id de la categoria a modificar y un objeto categoria con los nuevos valores */
        {
          if(!(obj instanceof Category)) throw new NotAnObjectCategory();
          var i = _category.findIndex(function(element){
            return (element.IdCategory == IdCat)
          });
          if(i != -1){
            _category[i].titulo = obj.titulo;
            _category[i].descripcion = obj.descripcion;
          }else{
            throw new CategoryNotExistInShop(IdCat,_nombre);
          }
        }
      

        this.RemoveCategory = function(IdCat)
        /*Metodo para eliminar una categoria del array de categorias del storeHouse, requiere el id de la categoria */
        {
          var i = _category.findIndex(function(element){
            return (element.IdCategory == IdCat)
          });

          if(i != -1){
            _category.splice(i,1);
            return _category.length;
          }


        }

        //Iterador del array de categorias
        Object.defineProperty(this,"categoryIte",{
          get: function(){
            var nextIndex = 0;
            return{
              next: function(){
                return nextIndex < _category.length ? {value: _category[nextIndex++],done:false} : {done: true};
              }
            }
          }
        });

        this.setCategoryProduct = function(oldIdCat,newIdCat)
        /*Metodo que modifica la categoria de un producto, sustituye el identificador*/
        {
          var index = _stock.findIndex(function(element){
            return element.categoriaId == oldIdCat;
          });
          if(index != -1){
            _stock[index].categoriaId = newIdCat;
            return true;
          }else{
            return false;
          }
        }

        this.setCategoryProductInShop = function(cifShop,oldIdCat,newIdCat)
        /*Metodo que modifica la categoria de un producto, sustituye el identificador*/
        {
          var index = _shops.findIndex(function(element){
            return element.cif == cifShop;
          });
          if(index != -1){
            return _shops[index].setCategoryProduct(oldIdCat,newIdCat);
          }
        }

        //Metodos para controlar _stock = []
        /*
        Ejemplo de un valor de _stock
        _stock[0] = {producto:Product, cantidad:Integer, categoriaId: IdCategory}
        */

        this.AddProduct = function(obj,cant,Idcat)
        /*Metodo para insertar productos en el stock de storeHouse requiere un Id de categoria para relaccionar categoria y producto */
        {
          if(!(obj instanceof Product)) throw new NotAnObjectProduct();
          if(!(Number.isInteger(cant)) && cant < 0) throw new InvalidCuantitieValue(cant,"cantidad");
          var cant = cant || 1;// si no se especifica la cantidad se añade un item
          //Buscamos si existe la categoria del producto
          var catId = _category.findIndex(function(element){
            return (element.IdCategory == Idcat)
          });
          if(catId != -1){
            //Buscamos si el elemento ya esta en nuestro stock
            var index = _stock.findIndex(function(element){
              return (element.producto.SN == obj.SN)
            });

            if(index = -1){//si no se encontro el elemento, quiere decir que no esta en nuestro Stock, lo añadiremos como nuevo elemento
              _stock.push({
                producto: obj,
                cantidad: cant,
                categoriaId: Idcat
              });
            }else{
              _stock[index].cantidad += cant 
            }
            return _stock.length; // devolvemos el numero de elementos en _stock
          }else{
            return new CategoryNotExistInStore(catId,_nombreStore);//Si la categoria no esta entre las de la tienda, deuelve un error
          }
      }

      this.AddQuantityProduct = function(proId,cant)
      /*Metodo para insertar una cantidad a un producto, requiere Id del producto */
      {
        if(!(Number.isInteger(cant)) && cant < 0) throw new InvalidCuantitieValue(cant,"cantidad");// la cantidad debe ser un numero entero mayor a 0
        var addQuant = _stock.findIndex(function(element){
          return (element.producto.IdProduct === proId);
        });
        if(addQuant != -1){
          _stock[addQuant].cantidad += cant;
          return _stock[addQuant].cantidad;
        }else{
          throw new ProductNotExistInStore(proId,_nombreStore);
        }

      }

      this.RemoveProduct = function(proId)
      /*Metodo para remover un producto, requiere la Id del producto*/
      {
        var removPro = _stock.findIndex(function(element){
          return (element.producto.SN == proId);
        });
        if( removPro != -1){
          _stock.splice(removPro,1);
          return _stock.length;
        }else{
          throw new ProductNotExistInStore(proId,_nombreStore);
        }

      }

      this.GetProductByID = function(proId)
      /*Metodo para obtener un producto, requiere la Id del producto*/
      {
        
        var index = _stock.findIndex(function(element){
          return (element.producto.SN == proId);
        });
        
        if( index != -1){
          return _stock[index];
        }else{
          throw new ProductNotExistInStore(proId,_nombreStore);
        }

      }      

      //Iterador de los objetos contenidos en _stock
      Object.defineProperty(this,"stockIte",{
        get: function(){
          var nextIndex = 0;
          return{
            next: function(){
              return nextIndex < _stock.length ? {value: _stock[nextIndex++],done:false} : {done: true};
            }
          }
        }
      });

      //Iterador de los objetos contenidos en _stock por categoria
      this.categoriesIte = function(catValue){
        var filterstock = _stock.filter(function(element){
          return (element.categoriaId === catValue);
        });
        if(filterstock.length){
        return {
            Index: 0,
            filter:  filterstock,
            next: function(){
                return this.Index < this.filter.length ? {value: this.filter[this.Index++],done:false} : {done: true};
            }
        }
        }else{
          throw new CategoryNotExistInStore(catValue,_nombreStore);
        }
      }

      //Metodos para controlar  _shops = []
      /*
      Ejemplo de un valor en _shops
      _shops [0] = {ObjShop}
      */

      this.AddShop = function(obj)
      /*Metodo para añadir tiendas al store house */
      {
        if(!(obj instanceof Shop)) throw new NotAnObjectShop(); // Si no es un objeto de la instancia tienda, lanza un error
        var shearchShop = _shops.filter(function(element){
          return (element.cif === obj.cif);
        });
        if(shearchShop.length > 0){
          throw new ShopAlreadyExistInStore(obj.cif,_nombreStore); //Si la tienda ya esta en _shops, lanza un error
        }else{
          _shops.push(obj);
          return _shops.length;
        }
      }

      this.RemoveShop = function (cifShop)
      /*Metodo para remover tiendas del store house. Requiere el cif de la tienda*/
      {
        var i = 0;
        var exist = false;
        while( i < _shops.length && !exist){
          if(_shops[i].cif === cifShop){
            exist = true;
          }
          if(!exist) i++;
        }
        if(exist){
          _shops.splice(i,1);
          return _shops.length;
        }else{
          throw new ShopNotExistInStore(cifShop,_nombreStore);
        }
      }

      this.getShopByCif = function(cifShop)
      /*Metodo que devuelve una tienda por cif de la tienda */
      {
        var index = _shops.findIndex(function(element){
          return element.cif == cifShop;
        })
        if(index != -1){
          return _shops[index];
        }else{
          throw new ShopNotExistInStore(cifShop,_nombreStore)
        }
      };

      this.AddProductInShop = function(cifShop,obj,cant,category)
      /*Metodo para añadir productos al stock de una tienda, requiere el cif de la tienda*/
      {
        if(!(obj instanceof Product)) throw new NotAnObjectProduct();
        var i = 0;
        var exist = false;
        while( i < _shops.length && !exist){
          if(_shops[i].cif === cifShop){
            exist = true;
          }
          if(!exist) i++;
        }
        if(exist){
          return _shops[i].AddProduct(obj,cant,category);
        }else{
          throw new ShopNotExistInStore(cifShop,_nombreStore);
        }
      }

      this.AddQuantityProductInShop = function(cifShop,Idpro,cant)
      /*Metodo para añadir una cantidad e unidades a un producto de una tienda, requiere cif de la tienda e Id del producto*/
      {
        var i = 0;
        var exist = false;
        while( i < _shops.length && !exist){
          if(_shops[i].cif === cifShop){
            exist = true;
          }
          if(!exist) i++;
        }
        if(exist){
          return _shops[i].AddQuantityProduct(Idpro,cant);
        }else{
          throw new ShopNotExistInStore(cifShop,_nombreStore);
        }
      }

      //Iterador para los elementos del array _shops
      Object.defineProperty(this,"shopIte",{
        get: function(){
          var nextIndex = 0;
          return{
            next: function(){
              return nextIndex < _shops.length ? {value: _shops[nextIndex++],done:false} : {done: true};
            }
          }
        }
      });

      this.getCategoryFromShop = function(cifShop,idCat)
      /*Metodo para obtener la categoria de una tienda*/
      {
        var index = _shops.findIndex(function(element){
          return element.cif == cifShop;
        });

        if(index != -1){
          return _shops[index].getCategory(idCat);
        }else{
          throw new ShopNotExistInStore(cifShop,_nombreStore)
        }
      }
      this.setCategoryInShop = function(cifShop,idCat,obj)
      /*Metodo para modificar una categoria de una tienda*/
      {
        if(!(obj instanceof Category)) throw new NotAnObjectCategory();
        var index = _shops.findIndex(function(element){
          return element.cif == cifShop;
        })
        if(index != -1){
          _shops[index].setCategory(idCat,obj);
        }else{
          throw new ShopNotExistInStore(cifShop,_nombreStore)
        }
      }

      this.RemoveCategoryFromShop = function(cifShop,IdCat)
      /*Metodo para eliminar una categoria del array de categorias de una tienda*/
      {
        var i = _shops.findIndex(function(element){
          return (element.cif == cifShop)
        });

        if(i != -1){
          _shops[i].RemoveCategory(IdCat);
        }else{
          throw new ShopNotExistInStore(cifShop,_nombreStore);
        }


      }


      this.getShopProducts = function(cifShop)
      /*Metodo para obtener el iterador de productos de shop*/
      {
        var i = 0;
        var exist = false;
        while( i < _shops.length && !exist){
          if(_shops[i].cif === cifShop){
            exist = true;
          }
          if(!exist) i++;
        }
        if(exist){
          return _shops[i].stockIte;
        }else{
          throw new ShopNotExistInStore(cifShop,_nombreStore);
        }
      }

      this.getShopProductsFiltered = function(cifShop,catId)
      /*Metodo para obtener el iterador de productos de shop*/
      {
        var i = 0;
        var exist = false;
        while( i < _shops.length && !exist){
          if(_shops[i].cif === cifShop){
            exist = true;
          }
          if(!exist) i++;
        }
        if(exist){
          return _shops[i].categoriesIte(catId);
        }else{
          throw new ShopNotExistInStore(cifShop,_nombreStore);
        }
      }

      this.getGlobalProduct = function(productId)
      /*Metodo para obtener el total de un producto en todo el ERP, devuelve un objeto literal*/
      {
        var globalProduct = null;

        _shops.forEach(function(element) {
          var IteStock = element.stockIte;
          var item = IteStock.next();
          while(!item.done){
            if(item.value.producto.IdProduct === productId){
              console.log("Producto Encontrado!");
              if(globalProduct){
                console.log("Añadiendo cantidad...");
                globalProduct.cantidad += item.value.cantidad;
              }else{
                console.log("Primera vez!");
                  globalProduct = {
                  producto: item.value.producto,
                  cantidad: item.value.cantidad,
                  categoriaId: item.value.categoriaId,
                };
              }
            }
            item = IteStock.next();
          }
        });

        return globalProduct;

      }

      this.AddUser = function (userObj)
      /*Metodo para añadir usuarios nuevos al array de usuarios*/
      {
        if(!(userObj instanceof User)) throw new NotAnObjectUser();
        var finded = _users.find(function(element){
          return (element.IdUsuario == userObj.IdUsuario);
        });
        if(finded){
          throw new UserAlreadyRegistred(userObj);
        }else{
          _users.push(userObj);
          return _users.length;
        }
      }
      
      

      this.GetUserByName = function (userName)
      /*Metodo para Obtener un usuario ya registrado*/
      {
        var index = _users.findIndex(function(element){
          return (element.nombre == userName);
        })
        if(index < 0){
          return false;
        }else{
         return _users[index];
        }
      }

      //Iterador del array de usuarios
      Object.defineProperty(this,"usersIte",{
        get: function(){
          var nextIndex = 0;
          return{
            next: function(){
              return nextIndex < _users.length ? {value: _users[nextIndex++],done:false} : {done: true};
            }
          }
        }
      });


    }

    

    StoreHouse.prototype = {};
    StoreHouse.prototype.constructor = StoreHouse;

    var instancia = new StoreHouse(name);
    Object.freeze(instancia);
    return instancia;
  }

  return {
    getInstance: function(name){
      if(!instanciado){
        var storeName = name;
        instanciado = init(storeName);
      }
      return instanciado;
    }
  }
})();
