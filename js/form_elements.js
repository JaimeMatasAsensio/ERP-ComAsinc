"use strict";
/*Documento para implementar funciones que generan distintos elementos de formularios*/

function GenerateInputSelectForShops(shopsIte,nameInput,labeltext)
/*Genera un select con las las tiendas como opcion*/
{

  var divFormGroup = document.createElement("div");
  divFormGroup.className = "form-group";

  var labelInput = document.createElement("label");
  labelInput.className = "col-sm-3 control-label";
  labelInput.setAttribute("for",nameInput);
  labelInput.appendChild(document.createTextNode(labeltext));
  divFormGroup.appendChild(labelInput);

  var div = document.createElement("div");
  div.className = "col-sm-9";
  divFormGroup.appendChild(div);

  var inputSelect = document.createElement("select");
  inputSelect.className = "form-control";
  inputSelect.setAttribute("name",nameInput);
  div.appendChild(inputSelect);

  var initOption = document.createElement("option");
  initOption.setAttribute("value","");
  initOption.appendChild(document.createTextNode(""));
  inputSelect.appendChild(initOption);
  
  var optStore = document.createElement("option");
  optStore.setAttribute("value","store");
  optStore.appendChild(document.createTextNode(Store.nombre));
  inputSelect.appendChild(optStore);

  var item = shopsIte.next();
  while(!item.done){
    var opt = document.createElement("option");
    opt.setAttribute("value",item.value.cif);
    opt.appendChild(document.createTextNode(item.value.nombre));
    inputSelect.appendChild(opt);
    item = shopsIte.next();
  }

  return divFormGroup;
}

function GenerateInputText(nameInput,labelText,valueInput)
/*Obtenemos un input de tipo texto*/
{
  var value = valueInput||"";
  var divFormGroup = document.createElement("div");
  divFormGroup.className = "form-group";

  var labelInput = document.createElement("label");
  labelInput.className = "col-sm-3 control-label";
  labelInput.setAttribute("for",nameInput);
  labelInput.appendChild(document.createTextNode(labelText));
  divFormGroup.appendChild(labelInput);

  var div = document.createElement("div");
  div.className = "col-sm-9";
  divFormGroup.appendChild(div);

  var input = document.createElement("input");
  input.className = "form-control";
  input.setAttribute("name",nameInput);
  input.setAttribute("type","text");
  input.setAttribute("value",value);
  input.setAttribute("autocomplete","off");
  div.appendChild(input);
  
  return divFormGroup;

}
function GenerateInputHidden(nameInput,valueInput)
/*Obtenemos un input de tipo texto*/
{
  var value = valueInput||"";
  
  var input = document.createElement("input");
  input.className = "form-control";
  input.setAttribute("name",nameInput);
  input.setAttribute("type","hidden");
  input.setAttribute("value",value);
  input.setAttribute("autocomplete","off");

  
  return input;

}

function GenerateInputNumber(nameInput,labelText,valueInput)
/*Obtenemos un input de tipo number*/
{
  var value = valueInput||"";
  var divFormGroup = document.createElement("div");
  divFormGroup.className = "form-group";

  var labelInput = document.createElement("label");
  labelInput.className = "col-sm-3 control-label";
  labelInput.setAttribute("for",nameInput);
  labelInput.appendChild(document.createTextNode(labelText));
  divFormGroup.appendChild(labelInput);

  var div = document.createElement("div");
  div.className = "col-sm-9";
  divFormGroup.appendChild(div);

  var input = document.createElement("input");
  input.className = "form-control";
  input.setAttribute("name",nameInput);
  input.setAttribute("type","number");
  input.setAttribute("value",value);
  input.setAttribute("autocomplete","off");
  div.appendChild(input);
  
  return divFormGroup;

}

function GenerateTextarea(nameInput,labelText,placeholderText,valueInput)
/*Obtenemos un textarea*/
{
  var value = valueInput||"";
  var divFormGroup = document.createElement("div");
  divFormGroup.className = "form-group";

  var labelInput = document.createElement("label");
  labelInput.className = "col-sm-3 control-label";
  labelInput.setAttribute("for",nameInput);
  labelInput.appendChild(document.createTextNode(labelText));
  divFormGroup.appendChild(labelInput);

  var div = document.createElement("div");
  div.className = "col-sm-9";
  div.style.minHeight = "100px";
  divFormGroup.appendChild(div);

  var input = document.createElement("textarea");
  input.className = "form-control";
  input.setAttribute("name",nameInput);
  input.setAttribute("type","text");
  
  if(valueInput != ""){
    input.appendChild(document.createTextNode(value));
  }
 
  input.setAttribute("placeholder",placeholderText);
  div.appendChild(input);
  
  return divFormGroup;

}

function GenerateTextareaReadOnly(nameInput,labelText,placeholderText,valueInput)
/*Obtenemos un textarea*/
{
  var value = valueInput||"";
  var divFormGroup = document.createElement("div");
  divFormGroup.className = "form-group";

  var labelInput = document.createElement("label");
  labelInput.className = "col-sm-3 control-label";
  labelInput.setAttribute("for",nameInput);
  labelInput.appendChild(document.createTextNode(labelText));
  divFormGroup.appendChild(labelInput);

  var div = document.createElement("div");
  div.className = "col-sm-9";
  div.style.minHeight = "100px";
  divFormGroup.appendChild(div);

  var input = document.createElement("textarea");
  input.className = "form-control";
  input.setAttribute("name",nameInput);
  input.setAttribute("readonly","true");
  input.setAttribute("type","text");
  
  if(valueInput != ""){
    input.appendChild(document.createTextNode(valueInput));
  }
 
  input.setAttribute("placeholder",placeholderText);
  div.appendChild(input);
  
  return divFormGroup;

}

function GenerateInputTextreadOnly(nameInput,labelText,valueInput)
/*Obtenemos un input de tipo texto*/
{
  var value = valueInput||"";
  var divFormGroup = document.createElement("div");
  divFormGroup.className = "form-group";

  var labelInput = document.createElement("label");
  labelInput.className = "col-sm-3 control-label";
  labelInput.setAttribute("for",nameInput);
  labelInput.appendChild(document.createTextNode(labelText));
  divFormGroup.appendChild(labelInput);

  var div = document.createElement("div");
  div.className = "col-sm-9";
  divFormGroup.appendChild(div);

  var input = document.createElement("input");
  input.className = "form-control";
  input.setAttribute("name",nameInput);
  input.setAttribute("type","text");
  input.setAttribute("value",value);
  input.setAttribute("autocomplete","off");
  input.setAttribute("readonly","true");
  div.appendChild(input);
  
  return divFormGroup;

}

function GenerateInputNumberReadOnly(nameInput,labelText,valueInput)
/*Obtenemos un input de tipo number de solo lectura*/
{
  var value = valueInput||"";
  var divFormGroup = document.createElement("div");
  divFormGroup.className = "form-group";

  var labelInput = document.createElement("label");
  labelInput.className = "col-sm-3 control-label";
  labelInput.setAttribute("for",nameInput);
  labelInput.appendChild(document.createTextNode(labelText));
  divFormGroup.appendChild(labelInput);

  var div = document.createElement("div");
  div.className = "col-sm-9";
  divFormGroup.appendChild(div);

  var input = document.createElement("input");
  input.className = "form-control";
  input.setAttribute("name",nameInput);
  input.setAttribute("type","number");
  input.setAttribute("value",value);
  input.setAttribute("autocomplete","off");
  input.setAttribute("readonly","true");
  div.appendChild(input);
  
  return divFormGroup;

}

function GenerateSubmitButtons(eventFunction,textBtn)
/*Funcion que genera un boton de submit, se le puede asociar una funcion como evento*/
{
    
    var event = eventFunction || "";
    var divBtn = document.createElement("div");
    divBtn.className="text-center btnForms";

    var btnSubmit = document.createElement("input");
    btnSubmit.className = "btn btn-success";
    btnSubmit.setAttribute("id","submitForm");
    btnSubmit.setAttribute("type","button");
    btnSubmit.setAttribute("value",textBtn);
    btnSubmit.setAttribute("data-toggle","modal");
    btnSubmit.setAttribute("data-target","#infoModal");
    btnSubmit.style.margin = "0 10px";
    divBtn.appendChild(btnSubmit);
    
    if(event != ""){
      btnSubmit.addEventListener("click",event);
    }
    
    var btnClear = document.createElement("input");
    btnClear.className = "btn btn-default";
    btnClear.setAttribute("type","reset");
    btnClear.setAttribute("value","Limpiar Valores");
    divBtn.appendChild(btnClear);

    return divBtn;
}

function GenerateSelectTypeProducts(){
  var divFormGroup = document.createElement("div");
  divFormGroup.className = "form-group";

  var labelInput = document.createElement("label");
  labelInput.className = "col-sm-3 control-label";
  labelInput.setAttribute("for","tProduct");
  labelInput.appendChild(document.createTextNode("Tipo de Producto"));
  divFormGroup.appendChild(labelInput);

  var div = document.createElement("div");
  div.className = "col-sm-9";
  divFormGroup.appendChild(div);

  var inputSelect = document.createElement("select");
  inputSelect.className = "form-control";
  inputSelect.setAttribute("name","tProduct");
  div.appendChild(inputSelect);

  var initOption = document.createElement("option");
  initOption.setAttribute("value","");
  initOption.appendChild(document.createTextNode(""));
  inputSelect.appendChild(initOption);

  var option1 = document.createElement("option");
  option1.setAttribute("value","movil");
  option1.appendChild(document.createTextNode("Movil"));
  inputSelect.appendChild(option1);

  var option2 = document.createElement("option");
  option2.setAttribute("value","ordenador");
  option2.appendChild(document.createTextNode("Ordenador"));
  inputSelect.appendChild(option2);

  var option3 = document.createElement("option");
  option3.setAttribute("value","consola");
  option3.appendChild(document.createTextNode("Video Consola"));
  inputSelect.appendChild(option3);

  var option4 = document.createElement("option");
  option4.setAttribute("value","camara");
  option4.appendChild(document.createTextNode("Camara"));
  inputSelect.appendChild(option4);
  

  return divFormGroup;
}


function GenerateInputSelectForCategories(catIte,nameInput,labeltext)
/*Genera un select con las las tiendas como opcion*/
{

  var divFormGroup = document.createElement("div");
  divFormGroup.className = "form-group";

  var labelInput = document.createElement("label");
  labelInput.className = "col-sm-3 control-label";
  labelInput.setAttribute("for",nameInput);
  labelInput.appendChild(document.createTextNode(labeltext));
  divFormGroup.appendChild(labelInput);

  var div = document.createElement("div");
  div.className = "col-sm-9";
  divFormGroup.appendChild(div);

  var inputSelect = document.createElement("select");
  inputSelect.className = "form-control";
  inputSelect.setAttribute("name",nameInput);
  div.appendChild(inputSelect);

  var initOption = document.createElement("option");
  initOption.setAttribute("value","");
  initOption.appendChild(document.createTextNode(""));
  inputSelect.appendChild(initOption);

  var item = catIte.next();
  while(!item.done){
    var opt = document.createElement("option");
    opt.setAttribute("value",item.value.IdCategory);
    opt.appendChild(document.createTextNode(item.value.titulo));
    inputSelect.appendChild(opt);
    item = catIte.next();
  }

  return divFormGroup;
}

function GenerateInputSelectForProducts(proIte,nameInput,labeltext)
/*Genera un select con los procutos de una tienda como opcion*/
{

  var divFormGroup = document.createElement("div");
  divFormGroup.className = "form-group";

  var labelInput = document.createElement("label");
  labelInput.className = "col-sm-3 control-label";
  labelInput.setAttribute("for",nameInput);
  labelInput.appendChild(document.createTextNode(labeltext));
  divFormGroup.appendChild(labelInput);

  var div = document.createElement("div");
  div.className = "col-sm-9";
  divFormGroup.appendChild(div);

  var inputSelect = document.createElement("select");
  inputSelect.className = "form-control";
  inputSelect.setAttribute("name",nameInput);
  div.appendChild(inputSelect);

  var initOption = document.createElement("option");
  initOption.setAttribute("value","");
  initOption.appendChild(document.createTextNode(""));
  inputSelect.appendChild(initOption);

  var item = proIte.next();
  while(!item.done){
    var opt = document.createElement("option");
    opt.setAttribute("value",item.value.producto.SN);
    opt.appendChild(document.createTextNode(item.value.producto.nombre + " - " + item.value.producto.SN));
    inputSelect.appendChild(opt);
    item = proIte.next();
  }

  return divFormGroup;
}


//Funciones para escribir resultados del formulario en la ventana modal

function WriteErrorModal(errorMessage)
/*Funcion que escribe un mensaje de error en la ventana modal*/
{
  //Borramos el contenido del modal
  clearModal();
  
  //escribimos en el modal
  var header = document.createElement("h3");
  header.setAttribute("id","headmodal-error");
  header.appendChild(document.createTextNode("Error!"));
  IdModalHeader.appendChild(header);
  
  var divModal = document.createElement("div");
  divModal.className = "text-center";
  IdModalBody.appendChild(divModal);
  
  var texto = document.createElement("p");
  texto.className = "textomodal-error";
  texto.appendChild(document.createTextNode(errorMessage));
  divModal.appendChild(texto);
  
  var texto1 = document.createElement("p");
  texto1.className = "textomodal";
  var d = new Date();
  var fecha = d.toLocaleDateString() + " " + d.toLocaleTimeString();
  texto1.appendChild(document.createTextNode(fecha));
  divModal.appendChild(texto1);
}


function WriteSuccessModal(Head, Message)
/*Funcion que escribe un mensaje de error en la ventana modal*/
{
  //Borramos el contenido del modal
  clearModal();
  
  //escribimos en el modal
  var header = document.createElement("h3");
  header.setAttribute("id","headmodal");
  header.appendChild(document.createTextNode(Head));
  IdModalHeader.appendChild(header);
  
  var divModal = document.createElement("div");
  divModal.className = "text-center";
  IdModalBody.appendChild(divModal);
  
  var texto = document.createElement("p");
  texto.className = "textomodal";
  texto.appendChild(document.createTextNode(Message));
  divModal.appendChild(texto);
  
  var texto1 = document.createElement("p");
  texto1.className = "textomodal";
  var d = new Date();
  var fecha = d.toLocaleDateString() + " " + d.toLocaleTimeString();
  texto1.appendChild(document.createTextNode(fecha));
  divModal.appendChild(texto1);
}



function clearForm(){
  var children = (FormCategory.children)?FormCategory.children:null;
  while(children.length > 0) {
    FormCategory.removeChild(children[0]);
  }
}
