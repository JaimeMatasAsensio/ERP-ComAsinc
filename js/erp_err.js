"use strict";
/* Documento JavaScript para la implementacion de los errores genericos de la aplicacion */


function TemplateError()
/*Plantilla de error para crear los errores especificos*/
{
  TemplateError.prototype = new Error(); // Heredamos de error
  TemplateError.prototype.constructor = TemplateError;
  TemplateError.prototype.toString = function(){
    return this.name + " " + this.message;
  }
}

function ConstructorCalledFunction()
/*Error de llamada a constructores como funciones*/
{
  this.name = "ConstructorCalledFunction";
  this.message = "Constructor llamado como función, se necesita el operador 'new'";
}
//Herencia
ConstructorCalledFunction.prototype = new TemplateError();
ConstructorCalledFunction.prototype.constructor = ConstructorCalledFunction;
ConstructorCalledFunction.prototype.toString = function(){
  return TemplateError.toString.call(this);
}

function ParameterInvalid(param)
/*Error para parametros no validos*/
{
  this.name = "ParameterInvalid";
  this.message = "This is a invalid parameter "+ param;
}
//Herencia
ParameterInvalid.prototype = new TemplateError();
ParameterInvalid.prototype.constructor = ParameterInvalid;
ParameterInvalid.prototype.toString = function(){
  return TemplateError.toString.call(this);
}
