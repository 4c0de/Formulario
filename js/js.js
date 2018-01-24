
(function(){
    //declaracion de variables
    var nombre=document.querySelector('#nombre');
    var spanNombre=document.querySelector('#registro>div div span:nth-child(3)');
    var nick=document.querySelector('#nick');
    var spanNick=document.querySelector('#usuario>div div span:nth-child(3)');
    var apellidos=document.querySelector('#apellidos');
    var apellidosSpan=document.querySelector('#usuario>div div:nth-child(2) span:nth-child(3)');
    var password=document.querySelector('#password');
    var edad=document.querySelector('#edad');
    var edadSpan=document.querySelector('#usuario>div div:nth-child(3) span:nth-child(3)');
    var respuesta=document.querySelector('#respuestaCampo');
    var respuestaSpan=document.querySelector('#respuesta span:nth-child(3)');
    var codigo=document.querySelector('#seguridad');
    var selePregunta=document.querySelector('#seleccionPregunta');
    var selespanpregunta=document.querySelector('#pregunta span:nth-child(3)');
    var codigoSpan=document.querySelector('#codigo span:nth-child(3)');
    var spanPassword=document.querySelector('#registro>div div:nth-child(2) span:nth-child(3)');
    var repitPassword=document.querySelector('#passwordRepit');
    var validar=document.querySelector('#aceptar');
    var tituloRadio=document.querySelector('#contenedorRadio>div h3>span');
    var radios=document.getElementsByName('sexo');
    var paises=document.querySelector('#selectPaises');
    var spanPaises=document.querySelector('#paises');
    var codigoPostal=document.querySelector('#codPostal');
    var spancodigoPostal=document.querySelector('#postal span:nth-child(3)');
    var correo=document.querySelector('#correo input');
    var correoSpan=document.querySelector('#correo span:nth-child(3)');
    var spanRepitPassword=document.querySelector('#registro>div div:nth-child(3) span:nth-child(3)');
    var estadoNombre,estadoPassword,estadoRepit,estadoCheck,estadoRespuesta, estadoCodigo,estadoNick,estadoRadio,estadoApellidos,estadoEdad,estadoPais,estadoCodigoPostal, estadoCorreo;
    var textoNombre="No se admite solo números o campos en blanco";
    var textoVacio="No se admite campos en blancos";
    var estado=false;
    var campos=true;
    var comprobarcheck=false;
  
    //abrir al cargar pagina formulario registro
    abrirForm('registro');
    //generar codigo seguridad 
    generarCodigo();
    //evento para siguiente formulario
    document.querySelector('#siguiente').addEventListener('click',function() {
        siguienteform();
    });
  
    //cambiar de formulario
    function abrirForm(tab){
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(tab).style.display = "flex";
    }

    //comprobar si campos de formularios contienen datos 
    function comprobarCampos(){
        var check=document.querySelector('#check').checked;
        estadoNombre=comprobarNumeros(nombre, spanNombre, textoNombre);
        estadoPassword=comprobarTexto(password,spanPassword,textoVacio);
        estadoRepit=comprobarTexto(repitPassword,spanRepitPassword,textoVacio);
        estadoCheck=comprobarCheckbox(check);
        estadoRespuesta=comprobarTexto(respuesta,respuestaSpan,textoVacio);
        estadoCodigo=comprobarTexto(codigo,codigoSpan,textoVacio);
        estadoPregunta=comprobarSelect(selePregunta,selespanpregunta);
        var codigoTemp =document.querySelector('#aleatorio').innerHTML;
        if (estadoCodigo){
               if (macheoCodigo(codigo.value,codigoTemp)){
                       estadoCodigo=true;
                }else{
                    estadoCodigo=false;
                     codigo.value="";
                     codigo.placeholder="El código introducido no es correcto";
                     codigoSpan.innerHTML="*";
                     codigoSpan.style.color = "red";
                }
        }

        if (estadoPassword){
                if (comprobarLongitud(password,spanPassword)){
                    estadoPassword=true;
                }else{
                    estadoPassword=false;
                }    
        }
        if ((estadoNombre) &&(estadoPassword)){
                if (!macheoLogin(nombre,password)){
                    estadoNombre=true;
                    estadoPassword=true;

                }else{
                    estadoNombre=false;
                    estadoPassword=false;
                     password.value="";
                     nombre.value="";
                     document.querySelector('#'+password.id).placeholder="No pueden coincidir los campos";
                     document.querySelector('#'+nombre.id).placeholder="No pueden coincidir los campos";
                     spanPassword.innerHTML="*";
                     spanPassword.style.color = "red";
                }    
        }
        if (estadoRepit){
                if (comprobarLongitud(repitPassword,spanRepitPassword)){
                    estadoRepit=true;
                }else{
                    estadoRepit=false;
                }  
        }

        if ((estadoPassword) && (estadoRepit)){
             var str="password no coinciden";
             if (MacheoPassword(password, repitPassword,str)){
                estadoRepit=true;
                estadoPassword=true;
             }else{
                estadoRepit=false,
                estadoPassword=false;
             }

        }
 
        if (estadoRespuesta){
                if (comprobarLongitud(respuesta,respuestaSpan)){
                    estadoRespuesta=true;
                }else{
                    estadoRespuesta=false;
                }    
        }

        if (!estadoNombre || !estadoPassword || !estadoRepit || !estadoCheck || !estadoRespuesta ||
            !estadoCodigo || !estadoPregunta){
            campos=false;
        }else{
            campos=true;
            
        }
        return campos;
                
    }
    //comprobar si select se ha elegido opcion
    function comprobarSelect(select,span){
          var temporal; 
          if (select.selectedIndex==0){
             temporal=false;
             span.innerHTML="*";
             span.style.color = 'red';
          }else{
            temporal=true;
            span.innerHTML="";

          }
          return temporal;
    }
    //comprobar si contraseñas son iguales
    function MacheoPassword(pass,repitpass,str){
        var igual=false;
        var contador=0;
        var len=pass.value.length;
        var len1=repitpass.value.length;

        if (len==len1){
            var array=pass.value;
            var array1=repitpass.value;
                if ((array)==(array1)){
                    igual=true;
                }else{
                    igual=false;
                     pass.value="";
                     repitpass.value="";
                     document.querySelector('#'+pass.id).placeholder=str;
                     document.querySelector('#'+repitpass.id).placeholder=str;
                     spanPassword.innerHTML="*";
                     spanPassword.style.color = "red";
                     spanRepitPassword.innerHTML="*";
                     spanRepitPassword.style.color="red";
               }
        }else{
                  igual=false;
                     pass.value="";
                     repitpass.value="";
                     document.querySelector('#'+pass.id).placeholder=str;
                     document.querySelector('#'+repitpass.id).placeholder=str;
                     spanPassword.innerHTML="*";
                     spanPassword.style.color = "red";
                     spanRepitPassword.innerHTML="*";
                     spanRepitPassword.style.color="red";

        }       
        return igual;
      
    }

    //comprobar si campo pseudonimo es igual a password
    function macheoLogin(nombre,pass){
        var igual=false;
        var contador=0;
        var len=nombre.value.length;
        var len1=pass.value.length;

        if (len==len1){
            var array=nombre.value;
            var array1=pass.value;
                if ((array)==(array1)){
                    igual=true;
                }else{
                    igual=false;
               }
        }else{
                  igual=false;

        }       
        return igual;
    }
    //comprobar si campo codigo es correcto
    function macheoCodigo(cod,cod1){
        var igual=false;
        var contador=0;
        var len=cod.length;
        var len1=cod1.length;
        if (len==len1){
            var array=cod;
            var array1=cod1;
                if ((array)==(array1)){
                    igual=true;
                }else{
                    igual=false;
               }
        }else{
                  igual=false;

        }       
        return igual;
    }


    //comprobar longitud de campo valor
    function comprobarLongitud(valor,texto){
              var comprobar=false;
              if (valor.value.length >=6){
                comprobar=true;
              }else{
                valor.value="";
                document.querySelector('#'+valor.id).placeholder="Longitud menor a 6 caracteres";
                texto.innerHTML="*";
                texto.style.color="red";
              }
              return comprobar;
    }
    //funcion comprobar para textos 
    function comprobarTexto(valor,texto,str){
           var comprobar=false;
           if( valor.value == null || valor.value.length == 0 || /^\s+$/.test(valor.value) ) {
                comprobar=false;
                texto.innerHTML="*";
                texto.style.color="red";
                document.querySelector('#'+valor.id).placeholder=str;
            }else{
                texto.innerHTML="";
                comprobar=true;
            }
           return comprobar; 

    }
    //comprobar checkbox marcado
    function comprobarCheckbox(valor){
        if (!valor){
             document.querySelector('#mensaje').style.visibility = 'visible';
             comprobarcheck=false;

        }else{
             document.querySelector('#mensaje').style.visibility = 'hidden';
             comprobarcheck=true;
          
        }
        return comprobarcheck;
    }
    //funcion comprobar para numeros
    function comprobarNumeros(valor,texto,str){
            var comprobar=false;
            if( !isNaN(valor.value) ) {
                comprobar=false;
                texto.innerHTML="*";
                valor.value="";                
                document.querySelector('#'+valor.id).placeholder=str;
                texto.style.color="red";
            }else{
                texto.innerHTML="";
                comprobar=true;
            }
        return comprobar;    
    }

    //Si validaciones correcta, se habilita siguiente form
    function siguienteform(){
          //Para bypasear formulario poner a false la condicion comprobarcampos
            if (comprobarCampos()){
                    //comprobar si form es usario o registro
                  
                    if (!estado){
                        abrirForm('usuario');
                        document.querySelector('#siguiente').innerHTML="Atrás";
                        validar.style.visibility = 'visible';
                        estado=true;

                    }else{
                        validar.style.visibility = 'hidden';
                        abrirForm('registro');
                        document.querySelector('#siguiente').innerHTML="Siguiente";
                        estado=false;
                    }
            }        
          

    }
    //codigo seguridad validar formulario
    function generarCodigo(){
          var texto = "";
          var cadena= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++){
            texto += cadena.charAt(Math.floor(Math.random() * cadena.length));

        } 
        document.querySelector('#aleatorio').innerHTML=texto;

    }


    //reset formulario
    document.querySelector('#borrar').addEventListener('click',function() {
       document.form.reset();
        nombre.placeholder="Combinación de números y letras";
        spanNombre.innerHTML="";
        nick.placeholder="Combinación de números y letras";
        spanNick.innerHTML="";
        apellidos.placeholder="Introduce apellidos";
        apellidosSpan.innerHTML="";
        password.placeholder="Introduce password";
        spanPassword.innerHTML="";
        repitPassword.placeholder="Repite password";
        spanRepitPassword.innerHTML="";
        respuestaSpan.innerHTML="";
        respuesta.placeholder="Respuesta a la pregunta";
        codigo.placeholder="Código de seguridad";
        codigoSpan.innerHTML="";
        document.querySelector('#mensaje').style.visibility = 'hidden';
        selespanpregunta.innerHTML="";
        edadSpan.innerHTML="";
        edad.placeholder="Introduce edad";
        correo.placeholder="Introduce correo electrónico";
        correoSpan.innerHTML="";
        codigoPostal.placeholder="Código Postal";
        spancodigoPostal.innerHTML="";
        spanPaises.innerHTML="";
        tituloRadio.innerHTML="";

        abrirForm('registro');
        document.querySelector('#siguiente').innerHTML="Siguiente";
        validar.style.visibility = 'hidden';
        generarCodigo();

    });

    //PARTE FORMULARIO UUSUARIO

    //validar formulario
    document.querySelector('#aceptar').addEventListener('click',function() {
        estadoNick=comprobarTexto(nick,spanNick,textoVacio);
        estadoApellidos=comprobarTexto(apellidos,apellidosSpan,textoVacio);
        estadoRadio=comprobarRadio(radios,tituloRadio);
        estadoEdad=comprobarRango(edad,edadSpan);
        estadoPais=comprobarSelect(paises,spanPaises);
        estadoCodigoPostal=comprobarPostal(codigoPostal,spancodigoPostal);
        estadoCorreo=validarEmail(correo,correoSpan);
        if (estadoNick){
               if (comprobarCadena(nick.value)){
                    estadoNick=false;
                    nick.value="";
                    nick.placeholder="No puede contener números";
                    spanNick.innerHTML="*";
                    spanNick.style.color = 'red';
               }else{
                    estadoNick=true;
                    spanNick.innerHTML="";
               }

        }
        if (estadoApellidos){
               if (comprobarCadena(apellidos.value)){
                    estadoApellidos=false;
                    apellidos.value="";
                    apellidos.placeholder="No puede contener números";
                    apellidosSpan.innerHTML="*";
                    apellidosSpan.style.color = 'red';
               }else{
                    estadoApellidos=true;
                    apellidosSpan.innerHTML="";
              
               }

        }
        if ((estadoNick) && (estadoApellidos) && (estadoEdad) && (estadoRadio) && (estadoPais) && (estadoCodigoPostal) && (estadoCorreo)){
              //si todos los campos validados--->enviamos formulario
              document.form.submit();
              //redireccionamos a index
              window.location = 'index.html'
        }

    });


 //comprobar si contiene números   
function comprobarCadena(cadena){
  var letra;
  var i=0;
  var resultado=false;
  
  while (i<cadena.length){
    letra = cadena.charAt(i);
    if  ((letra >= '0') && (letra <= '9')){
      resultado=true;
      break;
    }//if 
    i++;
  }//while
  
  return resultado;
}

//comprobar si opcion radio esta seleccionada
function comprobarRadio(array,str){
     var comprobar=false;
     var i=0;
     var lon=array.length;
    while ((i<lon) && (comprobar==false)) {
        if (array[i].checked){
            comprobar=true;
            str.innerHTML="";
        }
        if(!comprobar){
            str.innerHTML="*";
            str.style.color="red";
        }
        i++;
    }
    return comprobar;   
}
//comprobar rango de edad 
function comprobarRango(anos,info){
    var comprobar=false;
    if ((edad.value>=3) && (edad.value<=99)){
        comprobar=true;
        info.innerHTML="";
    }else{
        comprobar=false;
        info.innerHTML="*";
        info.style.color="red";
        anos.value="";
        anos.placeholder="el rango debe ser entre 3 y 99";
    }
    return comprobar;
}

    //comprobar longitud de codigo postal
    function comprobarPostal(valor,texto){
              var comprobar=false;
              if (valor.value.length==5){
                comprobar=true;
                texto.innerHTML="";
              }else{
                valor.value="";
                document.querySelector('#'+valor.id).placeholder="La longitud debe ser de 5 caracteres";
                texto.innerHTML="*";
                texto.style.color="red";
              }
              return comprobar;
    }
    //validar email
    function validarEmail(valor,texto) {
          var comprobar=false;
          var cadena = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
           if (cadena.test(valor.value)){
              comprobar=true;
              texto.innerHTML="";
          } else {
              comprobar=false;
              valor.value="";
              valor.placeholder="Formato de mail no es correcto";
              texto.innerHTML="*";
              texto.style.color = 'red';
          }
          return comprobar;
}




})();

