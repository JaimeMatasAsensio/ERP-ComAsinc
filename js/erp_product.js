"use strict";
/*Documento para implemetar el objecto product y los objectos que heredaran del del objeto Producto*/


//--- Bloque de Errores para objetos Product

function UninstantiatedProductObject()
/*Error lanzado cuando se intenta instanciar un objeto Product*/
{
 this.name = "UninstantiatedProductObject.";
 this.message = "Can not instantiate a Product Object.";
}
UninstantiatedProductObject.prototype = new TemplateError();
UninstantiatedProductObject.prototype.constructor = UninstantiatedProductObject;
UninstantiatedProductObject.prototype.toString = function(){
  return TemplateError.prototype.toString.call(this);
};

function UndefinedParameter(param)
/*Error lanzado cuando no se pasa un valor al constructor*/
{
 this.name = "UndefinedPameter.";
 this.message = "Undefined value for parameter '" + param + "' ";
}
UndefinedParameter.prototype = new TemplateError();
UndefinedParameter.prototype.constructor = UndefinedParameter;
UndefinedParameter.prototype.toString = function(){
  return TemplateError.prototype.toString.call(this);
};

function InvalidValueForPrecio(param)
/*Error lanzado cuando el valor del parametro precio no es valido */
{
 this.name = "InvalidValueForPrecio.";
 this.message = "Invalid value for Precio '" + param + "' ";
}
InvalidValueForPrecio.prototype = new TemplateError();
InvalidValueForPrecio.prototype.constructor = InvalidValueForPrecio;
InvalidValueForPrecio.prototype.toString = function(){
  return TemplateError.prototype.toString.call(this);
};

function InvalidValueForIVA(param)
/*Error lanzado cuando el valor del parametro IVA no es valido*/
{
 this.name = "InvalidValueForIVA.";
 this.message = "Invalid value for IVA '" + param + "' ";
}
InvalidValueForIVA.prototype = new TemplateError();
InvalidValueForIVA.prototype.constructor = InvalidValueForIVA;
InvalidValueForIVA.prototype.toString = function(){
  return TemplateError.prototype.toString.call(this);
};

//--- Bloque del constructor product y los objetos que heredan de el

//-- Objecto Abstracto Product

(function (){
  var Lock = false;// Seguro para no instanciar la clase abstracta

  //Indice unico para los Objectos que hereden de Producto
  var IdProduct = (function (){
    var IdProduct = 0;
    return (function (){
      return ++IdProduct;
    })
  })();

  function Product(SN,nombre,descripcion,IVA,precio,imagenes)
  /*Constructor de objetos product*/
  {
    //Comprobacion del seguro
    if(Lock) throw new UninstantiatedProductObject();

    //validacion de parametros
    if(!SN) throw new UndefinedParameter("SN");
    if(!nombre) throw new UndefinedParameter("nombre");
    if(!descripcion) throw new UndefinedParameter("descripcion");
    if(!(Number.isFinite(IVA)) && (IVA > 0) && (IVA < 100)) throw new InvalidValueForIVA(IVA);
    if(!(Number.isFinite(precio)) && (precio > 0)) throw new InvalidValueForPrecio(precio);

    //Asignacion de valores. Parametros Privados
    var _IdProduct = IdProduct();
    var _SN = SN; // No Modificable
    var _nombre = nombre;
    var _descripcion = descripcion;
    var _IVA = IVA;
    var _precio = precio; //Todos los precios son sin iva
    var _imagenes = imagenes;

    //Getters & Setters
    Object.defineProperty(this,"IdProduct",{
      get: function(){ return _IdProduct }
    });

    Object.defineProperty(this,"SN",{
      get: function(){ return _SN }
    });

    Object.defineProperty(this,"nombre",{
      get: function(){ return _nombre },
      set: function(newNombre){
        if(!newNombre) throw new UndefinedParameter("nombre");
        _nombre = newNombre;
      }
    });

    Object.defineProperty(this,"descripcion",{
      get: function(){return _descripcion},
      set: function(newDescripcion){
        if(!newDescripcion) throw new UndefinedParameter("descripcion");
        _descripcion = newDescripcion;
      }
    });

    Object.defineProperty(this,"IVA",{
      get:function(){return _IVA},
      set: function(nuevoIVA){
        if(!(Number.isFinite(IVA)) && (IVA > 0) && (IVA < 100)) throw new InvalidValueForIVA(IVA);
        _IVA = nuevoIVA;
      }
    });

    Object.defineProperty(this,"precio",{
      get: function(){ return _precio},
      set: function(nuevoPrecio){
        if(!(Number.isFinite(nuevoPrecio)) && (nuevoPrecio > 0)) throw new InvalidValueForPrecio(precio);
        _precio = nuevoPrecio;
      }
    });

    Object.defineProperty(this,"imagenes",{
      get: function(){ return _imagenes},
      set: function(nuevaImagen){
        _imagenes = nuevaImagen;
      }
    });

    //Metodos Publicos

    Object.defineProperty(this,"precioConIVA",{
      get: function(){
        return _precio + (_precio * (_IVA/100));
      }
    });

  }
  //Herencia
  Product.prototype = {};
  Product.prototype.constructor = Product;
  Product.prototype.toString = function(){
    return "Id: "+this.IdProduct+". SN: " + this.SN + ". Nombre: "+this.nombre+". Descripcion: "+this.descripcion+". IVA: "+this.IVA+"%. Precio(sin IVA): "+this.precio+" €. Precio+IVA: "+this.precioConIVA+" €";
  }

  //-- Objetos que heredan de product

  //- Objeto Movil
  function Movil(SN,nombre,descripcion,IVA,precio,imagenes,marca,camara,memoria)
  /*constructor de objetos Movil */
  {
    //Comprobacion de creacion de Instancia
    if(!(this instanceof Movil)) throw new ConstructorCalledFunction();
    //Desbloqueo del Objeto Abstracto
    Lock = false;
    Product.call(this,SN,nombre,descripcion,IVA,precio,imagenes);
    Lock = true;

    //Validacion de parametros
    if(!marca) throw new UndefinedParameter("marca");
    if(!camara) throw new UndefinedParameter("camara");
    if(!memoria) throw new UndefinedParameter("memoria");

    //Propiedades privadas
    var _marca = marca;
    var _camara = camara;
    var _memoria = memoria;

    //Getters & Setters
    Object.defineProperty(this,"marca",{
      get: function(){return _marca},
      set: function(newMarca){
        if(!newMarca) throw new UndefinedParameter("marca");
        _marca = newMarca;
      }
    });
    Object.defineProperty(this,"camara",{
      get: function(){return _camara},
      set: function(NewCamara){
        if(!NewCamara) throw new UndefinedParameter("camara");
        _camara = NewCamara;
      }
    });
    Object.defineProperty(this,"memoria",{
      get: function(){return _memoria},
      set: function(newMemoria){
        if(!newMemoria) throw new UndefinedParameter("memoria");
        _memoria = newMemoria;
      }
    });

    //Metodos publicos - No tiene... por ahora

  }
  //herencia
  Movil.prototype = Object.create(Product.prototype);
  Movil.prototype.constructor = Movil;
  Movil.prototype.toString = function(){
    return Product.prototype.toString.call(this) + ". Camara: "+this.camara+". Marca: "+this.marca+". Memoria: "+this.memoria;
  }

  //- Objeto Ordenador
  function Ordenador(SN,nombre,descripcion,IVA,precio,imagenes,marca,cpu,memoria)
  /*Constructor de objectos Ordenador */
  {
    //Comprobacion de crecion de Instancia
    if(!(this instanceof Ordenador)) throw new ConstructorCalledFunction();
    //Desbloqueo del Objeto Abstracto
    Lock = false;
    Product.call(this,SN,nombre,descripcion,IVA,precio,imagenes);
    Lock = true;

    //Validacion de parametros
    if(!marca) throw new UndefinedParameter("marca");
    if(!cpu) throw new UndefinedParameter("modelo");
    if(!memoria) throw new UndefinedParameter("memoria");

    //Parametros privados
    var _marca = marca;
    var _cpu = cpu;
    var _memoria = memoria;

    //Getters & Setters
    Object.defineProperty(this,"marca",{
      get: function(){return _marca},
      set: function(newMarca){
        if(!newMarca) throw new UndefinedParameter("marca");
        _marca = newMarca;
      }
    });
    Object.defineProperty(this,"cpu",{
      get: function(){return _cpu},
      set: function(newCpu){
        if(!newCpu) throw new UndefinedParameter("cpu");
        _cpu = newCpu;
      }
    });
    Object.defineProperty(this,"memoria",{
      get: function(){return _memoria},
      set: function(newMemoria){
        if(!newMemoria) throw new UndefinedParameter("memoria");
        _memoria = newMemoria;
      }
    });

    //Metodos publicos - No tiene... por ahora
  }
  //herencia
  Ordenador.prototype = Object.create(Product.prototype);
  Ordenador.prototype.constructor = Ordenador;
  Ordenador.prototype.toString = function(){
    return Product.prototype.toString.call(this) + ". Cpu: "+this.cpu+". Marca: "+this.marca+". Memoria: "+this.memoria;
  }

  //- Objeto VideoConsola

  function VideoConsola(SN,nombre,descripcion,IVA,precio,imagenes,marca,numJugadores,portatil){
    //Comprobacion de crecion de Instancia
    if(!(this instanceof VideoConsola)) throw new ConstructorCalledFunction();
    //Desbloqueo del Objeto Abstracto
    Lock = false;
    Product.call(this,SN,nombre,descripcion,IVA,precio,imagenes);
    Lock = true;

    //Validacion de parametros
    if(!marca) throw new UndefinedParameter("marca");
    if(!portatil) throw new UndefinedParameter("portatil");
    if(!numJugadores) throw new UndefinedParameter("memoria");

    //Parametros privados
    var _marca = marca;
    var _numJugadores = numJugadores;
    var _portatil = portatil;

    //Getters & Setters
    Object.defineProperty(this,"marca",{
      get: function(){return _marca},
      set: function(newMarca){
        if(!newMarca) throw new UndefinedParameter("marca");
        _marca = newMarca;
      }
    });
    Object.defineProperty(this,"numJugadores",{
      get: function(){return _numJugadores},
      set: function(newnumJugadores){
        if(!newnumJugadores) throw new UndefinedParameter("numJugadores");
        _numJugadores = newnumJugadores;
      }
    });
    Object.defineProperty(this,"portatil",{
      get: function(){return _portatil},
      set: function(newportatil){
        if(!newportatil) throw new UndefinedParameter("portatil");
        _portatil = newportatil;
      }
    });

    //Metodos Publicos.. No tiene por ahora
  }
  VideoConsola.prototype = Object.create(Product.prototype);
  VideoConsola.prototype.constructor = VideoConsola;
  VideoConsola.prototype.toString = function(){
    return Product.prototype.toString.call(this) + ". Marca: "+this.marca+". Numero de Jugadores: "+this.numJugadores+". Portatil: "+this.portatil;
  }
  //- Objeto Camara
  function Camara(SN,nombre,descripcion,IVA,precio,imagenes,marca,lente,memoria)
  /*Constructor de objetos Camara */
  {
    //Comprobacion de crecion de Instancia
    if(!(this instanceof Camara)) throw new ConstructorCalledFunction();
    //Desbloqueo del Objeto Abstracto
    Lock = false;
    Product.call(this,SN,nombre,descripcion,IVA,precio,imagenes);
    Lock = true;

    //Validacion de parametros
    if(!marca) throw new UndefinedParameter("marca");
    if(!lente) throw new UndefinedParameter("lente");
    if(!memoria) throw new UndefinedParameter("memoria");

    //Parametros privados
    var _marca = marca;
    var _lente = lente;
    var _memoria = memoria;

     //Getters & Setters
     Object.defineProperty(this,"marca",{
      get: function(){return _marca},
      set: function(newMarca){
        if(!newMarca) throw new UndefinedParameter("marca");
        _marca = newMarca;
      }
    });
    Object.defineProperty(this,"lente",{
      get: function(){return _lente},
      set: function(newLente){
        if(!newLente) throw new UndefinedParameter("lente");
        _lente = newLente;
      }
    });
    Object.defineProperty(this,"memoria",{
      get: function(){return _memoria},
      set: function(newMemoria){
        if(!newMemoria) throw new UndefinedParameter("memoria");
        _memoria = newMemoria;
      }
    });
  }
  //Herencia
  Camara.prototype = Object.create(Product.prototype);
  Camara.prototype.constructor = Camara;
  Camara.prototype.toString = function(){
    return Product.prototype.toString.call(this) + ". Lente: "+this.lente+". Marca: "+this.marca+". Memoria: "+this.memoria;
  }

  //Bloqueo del Objeto Abstracto
  Lock = true;

  //Devolver los constructores

  window.Product = Product;
  window.Movil = Movil;
  window.Ordenador = Ordenador;
  window.VideoConsola = VideoConsola;
  window.Camara = Camara;

})();
