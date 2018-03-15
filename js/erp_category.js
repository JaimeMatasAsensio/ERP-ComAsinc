"use strict";
/*Documento para implementar los objetos Category*/

//Bloque de Errores Para los objetos Category

function InvalidTitleValue()
/*Error lanzado cuando el valor de titulo no es valido*/
{
  this.name = "InvalidTitleValue.";
  this.message = "The value of this title must be full";
}
InvalidTitleValue.prototype = new TemplateError();
InvalidTitleValue.prototype.constructor = InvalidTitleValue;
InvalidTitleValue.prototype.toString = function(){
  return TemplateError.prototype.toString.call(this);
}


function InvalidDescriptionValue()
/*Error lanzado cuando el valor de la descripcion no es valido */
{
  this.name = "InvalidDescriptionValue.";
  this.message = "Empty description value.";
}
InvalidDescriptionValue.prototype = new TemplateError();
InvalidDescriptionValue.prototype.constructor = InvalidDescriptionValue;
InvalidDescriptionValue.prototype.toString = function(){
  return TemplateError.prototype.toString.call(this);
}

//--- Bloque del Constructor Category
/*
var IdCategory = (function (){
  var IdCategory = 3;
  return (function (){
    return ++IdCategory;
  })
})();//Generador de indces unicos para los Objectos Category
*/

function Category(Id, titulo, descripcion){
  //Comprobacion de creacion de instancia
  if(!(this instanceof Category)) throw new ConstructorCalledFunction();

  //Validacion de inputs
  if(!titulo) throw new InvalidTitleValue();
  if(!descripcion) throw new InvalidDescriptionValue(descripcion);
  
  //Parmetros privados
  var _IdCategory = Id
  var _titulo = titulo;
  var _descripcion = descripcion;

  //getters & setters

  Object.defineProperty(this,"IdCategory",{get: function(){return _IdCategory}});

  Object.defineProperty(this,"titulo",{
    get: function(){return _titulo},
    set: function(NewTitulo){
      if(!NewTitulo) throw new InvalidTitleValue();
      _titulo = NewTitulo;
    }
  });

  Object.defineProperty(this,"descripcion",{
    get: function(){return _descripcion},
    set: function(NewDescripcion){
      if(!NewDescripcion) throw new InvalidTitleValue(NewDescripcion);
      _descripcion = NewDescripcion;
    }
  });


  //Metodos publicos - No tiene... por ahora
}
//Herencia
Category.prototype = {};
Category.prototype.constructor = Category;
Category.prototype.toString = function(){
  return "Id: "+this.IdCategory+" .Titulo: "+this.titulo+". Descripcion: "+this.descripcion;
}
