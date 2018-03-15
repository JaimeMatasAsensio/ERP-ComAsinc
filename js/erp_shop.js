"use strict";
/* Documento para implementar los objetos shop */


//Bloque de errores para shop

function InvalidCifValue(cif)
/*Error lanzado cuando el valor de la propiedad Cif no es correcto */
{
  this.name = "InvalidCifValue";
  this.message = "This '" + cif + "' isn`t a valid value for cif parameter";
}
InvalidCifValue.prototype = new TemplateError();
InvalidCifValue.prototype.constructor = InvalidCifValue;
InvalidCifValue.prototype.toString = function(){
  return TemplateError.prototype.toString.call(this);
}

function InvalidPhoneValue(phone)
/*Error lanzado cuando el valor de la propiedad telefono no es correcto*/
{
  this.name = "InvalidPhoneValue";
  this.message = "This '" + phone + "' isn`t avalid value for phone parameter"
}
InvalidPhoneValue.prototype = new TemplateError();
InvalidPhoneValue.prototype.constructor = InvalidPhoneValue;
InvalidPhoneValue.prototype.toString = function(){
  return TemplateError.prototype.toString.call(this);
}
function NoNameShopValue()
/*Error lanzado cuando no hay valor de la propiedad nombre */
{
  this.name = "NoNameShopValue";
  this.message = "Shop parameter 'name' must have a name";
}
NoNameShopValue.prototype = new TemplateError();
NoNameShopValue.prototype.constructor = NoNameShopValue;
NoNameShopValue.prototype.toString = function(){
  return TemplateError.prototype.toString.call(this);
}
function NotAnObjectCoords()
/*Error lanzado cuando no se añade un objeto de la instancia Coords */
{
  this.name = "NoAnObjectCoords";
  this.message = "The parameter 'coord' need an object Coords";
}
NotAnObjectCoords.prototype = new TemplateError();
NotAnObjectCoords.prototype.constructor = NotAnObjectCoords;
NotAnObjectCoords.prototype.toString = function(){
  return TemplateError.prototype.toString.call(this);
}

function NotAnObjectProduct()
/*Error lanzado cuando no se añade un objeto de la instancia Product */
{
  this.name = "NoAnObjectProduct.";
  this.message = "Object added to stock shop isn`t a Product Object";
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
  this.message = "Object added to stock shop isn`t a Category Object";
}
NotAnObjectCategory.prototype = new TemplateError();
NotAnObjectCategory.prototype.constructor = NotAnObjectCategory;
NotAnObjectCategory.prototype.toString = function(){
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
function CategoryNotExistInShop(catId,shopName)
/*Error lanzado cuando no existe la categoria dentro del array de categorias de la tienda*/
{
  this.name = "CategoryNotExistInShop.";
  this.message = "This category, '"+catId+"', not exist in shop '"+shopName+"'.";
}
CategoryNotExistInShop.prototype = new TemplateError();
CategoryNotExistInShop.prototype.constructor = CategoryNotExistInShop;
CategoryNotExistInShop.prototype.toString = function(){
  return TemplateError.prototype.toString.call(this);
}

function CategoryAlreadyExistInShop(catId,shopName)
/*Error lanzado cuando no existe la categoria dentro del array de categorias de la tienda*/
{
  this.name = "CategoryAlreadyExistInShop.";
  this.message = "This category, '"+catId+"', Already exist in shop '"+shopName+"'.";
}
CategoryAlreadyExistInShop.prototype = new TemplateError();
CategoryAlreadyExistInShop.prototype.constructor = CategoryAlreadyExistInShop;
CategoryAlreadyExistInShop.prototype.toString = function(){
  return TemplateError.prototype.toString.call(this);
}

function ProductNotExistInShop(Id,shopName)
/*Error lanzado cuando no existe la producto dentro del array de stock de la tienda*/
{
  this.name = "ProductNotExistInShop.";
  this.message = "This category, '"+Id+"', not exist in shop '"+shopName+"'.";
}
ProductNotExistInShop.prototype = new TemplateError();
ProductNotExistInShop.prototype.constructor = ProductNotExistInShop;
ProductNotExistInShop.prototype.toString = function(){
  return TemplateError.prototype.toString.call(this);
}

//---Bloque del constructor para shop

function Shop(cif,nombre,direccion,telefono,coords)
/*Constructor de objetos Shop */
{
  //validadores de parametros
  if(!(/^\d*$/).test(cif)) throw new InvalidCifValue(cif);
  if(!(/^\d{9}$/).test(telefono)) throw new InvalidPhoneValue(telefono);
  if(!nombre) throw new NoNameShopValue();
  if(!(coords instanceof Coords)) throw new NotAnObjectCoords();

  //Propiedades Privadas
  var _cif = cif;
  var _nombre = nombre;
  var _direccion = direccion || "Unknown Direction";
  var _telefono = telefono || "Unknown Phone";
  var _coords = coords;
  var _stock = [];
  var _category = [];

  //getters & setters
  Object.defineProperty(this, "cif",{
    get: function (){ return _cif },
    set: function (newCif){
      if(!(/^\d*$/).test(cif)) throw new InvalidCifValue(cif);
      console.log("Cif value changed. Old value: "+ _cif +"; New value: " + newCif);
      _cif = newCif;
    }
  });

  Object.defineProperty(this, "nombre", {
    get: function () { return _nombre },
    set: function (NewNombre){
      if(!NewNombre) throw new NoNameShopValue();
      console.log("Name value changed. Old value: " + _nombre + "; New value: " + NewNombre);
      _nombre = NewNombre;
    }
  });

  Object.defineProperty(this, "direccion",{
    get: function () { return _direccion },
    set: function (newDirection) {
      if(!newDirection) newDirection = "Unknown Direction"
      console.log("Direction value Changed. Old value " + _direction + "; New value: " + newDirection);
      _direction = newDirection;
    }
  });

  Object.defineProperty(this, "telefono", {
    get: function(){ return _telefono},
    set: function(newPhone){
      if(!newPhone) newPhone = "Unknown Phone";
      console.log("Phone value changed. Old value: " + _telefono + "; New value: " + newPhone);
      _telefono = newPhone;
    }
  });

  Object.defineProperty(this, "coords", {
    get: function () {return _coords},
    set: function (newCoords) {
      if(!(newCoords instanceof Coords)) throw new NotAnObjectCoords();
      console.log("Coords value changed. Old value: " + _coords.id + "; New value: " + newCoords.id );
    }
  });

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
      throw new CategoryAlreadyExistInShop(obj.IdCategory,_nombre);
    }

  }

  this.RemoveCategory = function(IdCat)
  /*Metodo para eliminar uan categoria del array de categorias de la tienda, requiere el id de la categoria */
  {
    var i = _category.findIndex(function(element){
      return (element.IdCategory == IdCat)
    });

    if(i != -1){
      _category.splice(i,1);
      return _category.length;
    }


  }
  this.getCategory = function(IdCat){
    var i = _category.findIndex(function(element){
      return (element.IdCategory == IdCat)
    });
    if(i != -1){
      return _category[i];
    }else{
      throw new CategoryNotExistInShop(IdCat,_nombre);
    }
  }

  this.setCategory = function(IdCat,obj){
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

  //Metodos para controlar _stock = []
    /*
    Ejemplo de un valor de _stock
    _stock[0] = {producto:Product, cantidad:Integer, categoriaId: IdCategory}
    */

    this.AddProduct = function(obj,cant,Idcat)
    /*Metodo para insertar productos en el stock de tienda requiere un Id de categoria para relaccionar categoria y producto */
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
        var i = 0;
        var addedCant = false;
        while (i < _stock.length && !addedCant) {
          if(_stock[i].producto.IdProduct === obj.IdProduct){// si el elemento esta solo añadira la cantidad que le pasemos
            _stock[i].cantidad += cant;
            addedCant = true;
          }
          i++;
        }

        if(!addedCant){//si no se encontro el elemento, quiere decir que no esta en nuestro Stock, lo añadiremos como nuevo elemento
          _stock.push({
            producto: obj,
            cantidad: cant,
            categoriaId: Idcat
          });
        }
        return _stock.length; // devolvemos el numero de elementos en _stock
      }else{
        return new CategoryNotExistInShop(catId,_nombre);//Si la categoria no esta entre las de la tienda, deuelve un error
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
      throw new ProductNotExistInShop(proId,cant);
    }

   }

   this.RemoveProduct = function(proId)
   /*Metodo para remover un producto, requiere la Id del producto*/
   {
    var index = _stock.findIndex(function(element){
      return (element.producto.SN == proId);
    });
    if( index != -1){
      _stock.splice(index,1);
      return _stock.length;
    }else{
      throw new ProductNotExistInShop(proId,cant);
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

    this.getProduct = function(proId)
    /*Metodo para Obtener un producto, requiere la Id del producto*/
    {
      var indexPro = _stock.findIndex(function(element){
        return (element.producto.IdProduct === proId);
      });
      if( indexPro != -1){
        return _stock[indexPro];
      }else{
        throw new ProductNotExistInShop(proId,_nombre);
      }

    }
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
   //Iterador de los objetos contenidos en _stock
   /*
    Ejemplo de un valor de _stock
    _stock[0] = {producto:Product, cantidad:Integer, categoriaId: IdCategory}
    */
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
        throw new CategoryNotExistInShop(catValue,_nombre);
      }
    }
}

Shop.prototype = {};
Shop.prototype.constructor = Shop;
Shop.prototype.toString = function(){
  return "SN: "+this.cif+". Nombre: "+this.nombre+". Direccion: "+this.direccion+". Telefono: "+this.telefono+". Coordenadas: ("+this.coords.toString()+") "
}
