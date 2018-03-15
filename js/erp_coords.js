"use strict";
/*Documento para implementar los objetos Coords*/


//Bloque errores para coords

function ParametersInvalid(longitud,latitud)
/*Objeto de error cuando los dos parametros no son validos */
{
  this.name = "PatametersInvalid.";
  this.message = "These are invalid values for parameters longitud ("+longitud+") and latitud ("+latitud+").";
}
ParametersInvalid.prototype = new TemplateError();
ParametersInvalid.prototype.constructor = ParametersInvalid;
ParametersInvalid.prototype.toString = function(){
  return TemplateError.prototype.toString.call(this);
}

function InvalidLongitud(longitud)
/*Objeto de error cuando el parametro longitud no es valido*/
{
  this.name = "InvalidLongitud.";
  this.message = "This is a invalid values for parameter longitud ("+longitud+").";
}
InvalidLongitud.prototype = new TemplateError();
InvalidLongitud.prototype.constructor = InvalidLongitud;
InvalidLongitud.prototype.toString = function(){
  return TemplateError.prototype.toString.call(this);
}

function InvalidLatitud(latitud)
/*Objeto de error cuando el parametro latitud no es correcto*/
{
  this.name = "InvalidLatitud.";
  this.message = "This is a invalid values for parameter latitud ("+latitud+").";
}
InvalidLatitud.prototype = new TemplateError();
InvalidLatitud.prototype.constructor = InvalidLatitud;
InvalidLatitud.prototype.toString = function(){
  return TemplateError.prototype.toString.call(this);
}

//Bloque del constructor coords

function Coords (longitud,latitud)
/*Constructor de objetos Coords */
{
  //Validacion de inputs
  if(!(this instanceof Coords)) throw new ConstructorCalledFunction(longitud,latitud);
  if(!(Number.isFinite(longitud)) && !(Number.isFinite(latitud))) throw new ParametersInvalid(longitud,latitud);
  if(!(Number.isFinite(longitud))) throw new InvalidLongitud(longitud);
  if(!(Number.isFinite(latitud))) throw new InvalidLatitud(latitud);

  //Propiedades Privados
  var _longitud = longitud;
  var _latitud = latitud;

  //Getters & Setters
  Object.defineProperty(this,"longitud",{
    get: function(){ return _longitud },
    set: function(){
      if(!(Number.isFinite(NuevaLongitud))) throw new InvalidLongitud();
      _longitud = NuevaLongitud;
    }
  });

  Object.defineProperty(this,"latitud",{
    get: function(){ return _latitud },
    set: function(){
      if(!(Number.isFinite(NuevaLatitud))) throw new InvalidLatitud();
      _latitud = NuevaLatitud;
    }
  });

  //Metods Publicos - No tiene... por ahora

}
//Herencia
Coords.prototype = {};
Coords.prototype.constructor = Coords;
Coords.prototype.toString = function(){
  return "Longitud: "+this.longitud+". Latitud: "+this.latitud;
}
