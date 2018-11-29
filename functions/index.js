'use strict';
const {
  dialogflow,
  BasicCard,
  Card,
  BrowseCarousel,
  BrowseCarouselItem,
  Button,
  Carousel,
  Image,
  LinkOutSuggestion,
  List,
  MediaObject,
  Suggestions,
  SimpleResponse,
  Table,
  NewSurface,
 } = require('actions-on-google');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

var serviceAccount = require('./firestoreKey.json');
var respuestas= new Array(14);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);
const app = dialogflow({debug: true});
//--------------------------------------------------------------------------------------------------------------------FUNCIONES

//----------------------------------------------------------------------------------------------------------------------------INICIAMOS INTENT HOLA
app.intent('hola', (conv) => {
  conv.ask(new SimpleResponse({
    speech:"Hola! Mi nombre es Ana y será un gusto ayudarte a encontrar tu perfil de inversión, ¿alguna vez habías estado con nosotros?",
     text:"Hola! Mi nombre es Ana y será un gusto ayudarte a encontrar tu perfil de inversión, ¿alguna vez habías estado con nosotros?",
    }));
    conv.ask(new Suggestions(['si una vez','es la primera vez']));
});
//----------------------------------------------------------------------------------------------------------------------------------fin intent hola
//---------------------------------------------------------------------------------------------------------------------------------INICIAMOS INTENT 
app.intent('si_una_vez', (conv) => {
  var visitado_anteriormente = conv.parameters["visitado_anteriormente"];
  if(visitado_anteriormente==="si una vez"){
  conv.ask(new SimpleResponse({
    speech:"ok, entonces proporcioname por favor tu número de teléfono para saber cuanta información tengo ya de ti ",
    text:"ok, entonces proporcioname por favor tu número de teléfono para saber cuanta información tengo ya de ti ",
  }));}
});
//--------------------------------------------------------------------------------------------------------------------------------------fin intent 
//--------------------------------------------------------------------------------------------------------------------------------INICIAMOS INTENT
app.intent('es_la_primera_vez', (conv) => {
      var nuevoVisitante = conv.parameters["nuevoVisitante"];
      if(nuevoVisitante==="es la primera vez" || nuevoVisitante==="registrarse"){
      conv.ask(new SimpleResponse({
        speech:"ok, entonces dime ¿cómo te llamas? ",
        text:"ok, entonces dime ¿cómo te llamas? ",
      }));}
});
//--------------------------------------------------------------------------------------------------------------------------------------fin intent
//--------------------------------------------------------------------------------------------------------------------------------INICIAMOS INTENT
//PREGUNTA 1
app.intent('guarda_nombre', (conv) => {
      var nombre= conv.parameters["name"];
      var alto= conv.parameters["alto"];
      /*if(alto==="alto")
      {
        conv.ask(new SimpleResponse({
        speech:"ok solo por favor antes de irte dame un numero de teléfono",
        text:"ok solo por favor antes de irte dame un numero de teléfono",
      }));
      }
      else{*/
      respuestas[0]=nombre;
      conv.ask(new SimpleResponse({
        speech:"que bonito nombre, "+nombre+ " y si no es indiscreción, ¿cuántos años tienes?",
        text:"que bonito nombre, "+nombre+" y si no es indiscreción, ¿cuántos años tienes?",
      }));
     // }
});
//--------------------------------------------------------------------------------------------------------------------------------------fin intent
//--------------------------------------------------------------------------------------------------------------------------------INICIAMOS INTENT
//PREGUNTA 2
app.intent('guarda_edad', (conv) => {
      var edad= conv.parameters["number"];
      respuestas[1]=edad;
      conv.ask(new SimpleResponse({
        speech:"ok y ¿cuál es tu nivel de estudios? ",
        text:"ok y ¿cuál es tu nivel de estudios? ",
      }));
      conv.ask(new Suggestions(['basica','media','superior','posgrado','doctorado']));
});
//--------------------------------------------------------------------------------------------------------------------------------------fin intent
//--------------------------------------------------------------------------------------------------------------------------------INICIAMOS INTENT
//PREGUNTA 3
app.intent('guarda_estudios', (conv) => {
var estudios= conv.parameters["estudios"];
respuestas[2]=estudios;
  conv.ask(new SimpleResponse({
    speech:"gracias, nos buscas para llevar a cabo una inversión, esto con que propósito? ",
    text:"gracias, nos buscas para llevar a cabo una inversión, esto con que propósito? ",
  }));
//  conv.ask(new Suggestions(['preservar capital','financiar gastos de corto plazo','ahorrar para gastos de largo plazo','aumentar patrimonio'])); 
  //
  conv.ask(new BasicCard({
  image: new Image({
    url: 'https://firebasestorage.googleapis.com/v0/b/platica-b8388.appspot.com/o/pregunta3.png?alt=media&token=c655fb42-75a1-436f-9845-4f19ffe8fd73',
    alt: 'pregunta3',
  }),
}));
});//intent
//--------------------------------------------------------------------------------------------------------------------------------------fin intent
//--------------------------------------------------------------------------------------------------------------------INICIAMOS INTENT guardahorizonte
//PREGUNTA 4
app.intent('guarda_propositoInversion', (conv) => {
      var propositoInversion= conv.parameters["propositoInversion"];
      respuestas[3]=propositoInversion;
      conv.ask(new SimpleResponse({
        speech:"de acuerdo y ¿Cuál es tu horizonte de inversión?",
        text:"de acuerdo y ¿Cuál es tu horizonte de inversión?",
      }));
  conv.ask(new BasicCard({
  image: new Image({
    url: 'https://firebasestorage.googleapis.com/v0/b/platica-b8388.appspot.com/o/pregunta4.png?alt=media&token=ebf8565d-d531-4107-8b13-f323863cb113',
    alt: 'pregunta4',
    text:'que es horizonte de inversion',
  }),
}));
});
//--------------------------------------------------------------------------------------------------------------------------------------fin intent guardahorizonte
//--------------------------------------------------------------------------------------------------------------------INICIAMOS INTENT PARA EL COMIENZO DEL BLOQUE DOS
app.intent('continua_bloqueDos', (conv) => {
      var horizonte= conv.parameters["horizonte"];
      respuestas[4]= horizonte;
      conv.ask(new SimpleResponse({
        speech:"Perfecto, necesito me regales 5 minutos de tu tiempo para responder algunas preguntas para conocer tu perfil de inversión, estás de acuerdo?",
        text:"Perfecto, necesito me regales 5 minutos de tu tiempo para responder algunas preguntas para conocer tu perfil de inversión, estás de acuerdo?",
      }));
      conv.ask(new Suggestions(['si adelante','no tengo tiempo']));
});
//--------------------------------------------------------------------------------------------------------------------------------------fin del comiendo del bloque dos
//--------------------------------------------------------------------------------------------------------------------INICIAMOS INTENT guardatipoActivos
app.intent('guardaRespuestaBloqueUno', (conv) => {
      var RespuestaBloqueUno= conv.parameters["RespuestaBloqueUno"];
      if(RespuestaBloqueUno==="si adelante")
      {//PREGUNTA 5
        conv.ask(new SimpleResponse({
        speech:"ok gracias, ¿Qué composición de tipo de activos te representa mejor",
        text:"ok gracias, ¿Qué composición de tipo de activos te representa mejor",
      }));
      conv.ask(new Suggestions(['que es tipo de activos']));
      conv.ask(new BasicCard({
  image: new Image({
    //url: 'https://firebasestorage.googleapis.com/v0/b/platica-b8388.appspot.com/o/pregunta5.png?alt=media&token=902fe035-d59e-4d51-ac83-8223bce14d0f',
    url:'https://firebasestorage.googleapis.com/v0/b/platica-b8388.appspot.com/o/pregunta5.png?alt=media&token=b1134c21-3ed9-42fe-95a2-dadf399b897b',
    alt: 'pregunta5',
  }),
}));
      }

      if(RespuestaBloqueUno==="no tengo tiempo")
      {//PREGUNTA 5
        conv.ask(new SimpleResponse({
        speech:"ok solo proporcioname un número de teléfono para contactarte ",
        text:"ok solo proporcioname un número de teléfono para contactarte ",
      }));
      }

      
});
//--------------------------------------------------------------------------------------------------------------------------------------fin de guardatipoActivos

//--------------------------------------------------------------------------------------------------------------------INICIAMOS INTENT guardatipoActivos
app.intent('guardaRespuestaBloqueUnoF', (conv) => {
      var fon= conv.parameters["phone-number"];
      var data = {
        nombre:respuestas[0],
        edad:respuestas[1],
        estudios:respuestas[2],
        propositoInversion:respuestas[3],
        horizonte:respuestas[4],
        Telefono:fon};
  db.collection("clientes").add(data);

      conv.ask(new SimpleResponse({
        speech:"De acuerdo muchas gracias por tu visita, vuelve pronto!",
        text:"De acuerdo muchas gracias por tu visita, vuelve pronto!",
      }));  
});
//--------------------------------------------------------------------------------------------------------------------INICIAMOS INTENT guardamovimientosInversion
//PREGUNTA 6
app.intent('guarda_tipoActivos', (conv) => {
      var tipoActivos= conv.parameters["tipoActivos"];
      respuestas[5]=tipoActivos;
      conv.ask(new SimpleResponse({
        speech:"Si algo no es explícito por favor solo dime que es y menciona la palabra que no entiendes, y con gusto te lo explicare, si en un período de 3 meses tu inversión ha perdido un 20% del valor, al mismo tiempo el mercado ha caído un 20%. ¿que crees conveniente hacer? ",
        text:"Si algo no es explícito por favor solo dime que es y menciona la palabra que no entiendes, y con gusto te lo explicare, si en un período de 3 meses tu inversión ha perdido un 20% del valor, al mismo tiempo el mercado ha caído un 20%. ¿que crees conveniente hacer? "+conv.parameters["tipoActivos"],
      }));
      //conv.ask(new Suggestions(['liquidar toda la inversión para no exponerse a caídas adicionales','traspasar mis inversiones a un producto más conservador','mantener la inversión actual','analizar la conveniencia de aumentar el monto de la inversión']));
         conv.ask(new BasicCard({
  image: new Image({
    url: 'https://firebasestorage.googleapis.com/v0/b/platica-b8388.appspot.com/o/pregunta6.png?alt=media&token=5b159952-8333-4d3b-a8f3-6ed9f02f4b2d',
    alt: 'pregunta6',
  }),
}));
});
//--------------------------------------------------------------------------------------------------------------------------------------fin de guardatipoActivos
//--------------------------------------------------------------------------------------------------------------------INICIAMOS INTENT guardaAfirmaciones
//PREGUNTA 7
app.intent('guarda_decisiones', (conv) => {
      var decisiones= conv.parameters["decisiones"];
      respuestas[6]=decisiones;
      conv.ask(new SimpleResponse({
        speech:"¿Que afirmación te representa mejor? ",
        text:"¿Que afirmación te representa mejor? ",
      }));
      ///conv.ask(new Suggestions(['espero que mi ahorro tenga rentabilidades mayores en el largo plazo y entiendo que para ello debo asumir mayores riesgos que pueden implicar fluctuaciones en el valor de mi cartera','acepto algunas alzas y bajas de rentabilidad, porque estimo que a largo plazo la rentabilidad de mis ahorros puede ser mayor','prefiero rentabilidades menores en el largo plazo, pero evitar enfrentar disminuciones en mi capital','en teoría, prefiero no exponerme a posibles pérdidas en el valor de mi cartera']));
      conv.ask(new BasicCard({
  image: new Image({
    url: 'https://firebasestorage.googleapis.com/v0/b/platica-b8388.appspot.com/o/pregunta7.png?alt=media&token=1111ff3b-6fae-44cb-90f7-b5526d223ae7',
    alt: 'pregunta7',
  }),
}));

});
//--------------------------------------------------------------------------------------------------------------------------------------fin de guardatipoAfirmaciones
//--------------------------------------------------------------------------------------------------------------------INICIAMOS INTENT guardaexperienciaInversor
//PREGUNTA 8
app.intent('guarda_afirmaciones', (conv) => {
      var afirmaciones= conv.parameters["afirmaciones"];
      respuestas[7]=afirmaciones;
      conv.ask(new SimpleResponse({
        speech:"tu experiencia como inversionista en el mercado financiero, usted la clasificaría como:",
        text:"tu experiencia como inversionista en el mercado financiero, usted la clasificaría como:",
      }));
      conv.ask(new Suggestions(['nula','discreta','amplia','avanzada']));
       conv.ask(new Suggestions(['que es nula']));
       conv.ask(new Suggestions(['que es discreta']));
       conv.ask(new Suggestions(['que es amplia']));
       conv.ask(new Suggestions(['que es avanzada']));
    });
//--------------------------------------------------------------------------------------------------------------------------------------fin de guardatipoexperienciaInversor
//--------------------------------------------------------------------------------------------------------------------INICIAMOS INTENT guardaCapacidadAhorro
//PREGUNTA 9
app.intent('guarda_experiencia', (conv) => {
      var experiencia= conv.parameters["experiencia"];
      respuestas[8]=experiencia;
      conv.ask(new SimpleResponse({
        speech:"¿Cuál es su nivel de ahorro según la siguiente clasificación?",
        text:"¿Cuál es su nivel de ahorro según la siguiente clasificación?",
      }));
   //   conv.ask(new Suggestions(['no ahorro','menos del 10% de mis ingresos','entre el 10% y el 25% de mis ingresos','más del 25% de mis ingresos']));
   conv.ask(new BasicCard({
  image: new Image({
    url: 'https://firebasestorage.googleapis.com/v0/b/platica-b8388.appspot.com/o/pregunta9.png?alt=media&token=fce6684b-d3f5-45d2-8be7-a2889b8a0f30',
    alt: 'pregunta9',
  }),
}));

});//fin intent
//--------------------------------------------------------------------------------------------------------------------------------------fin de guardaInversionProducto
//--------------------------------------------------------------------------------------------------------------------INICIAMOS INTENT guardaCapacidadAhorro
//PREGUNTA 10
app.intent('guarda_ahorro', (conv) => {
      var ahorro= conv.parameters["ahorro"];
      conv.ask(new SimpleResponse({
        speech:"¿Necesita parte de esta inversión para cumplir compromisos en los próximos 2 años?",
        text:"¿Necesita parte de esta inversión para cumplir compromisos en los próximos 2 años?",
      }));
      respuestas[9]=ahorro;
     // conv.ask(new Suggestions(["no","si, menos de 30%","si, entre 30% y 60%","si, más del 60%"]));
     conv.ask(new BasicCard({
  image: new Image({
    url: 'https://firebasestorage.googleapis.com/v0/b/platica-b8388.appspot.com/o/pregunta10.png?alt=media&token=4ffb721a-aae7-45f4-8d2b-d1eeb5a21320',
    alt: 'pregunta10',
  }),
}));
});//fin intent
//--------------------------------------------------------------------------------------------------------------------------------------fin de guardaInversionProducto
//--------------------------------------------------------------------------------------------------------------------INICIAMOS INTENT guardaCapacidadAhorro
//PREGUNTA 11
app.intent('guarda_compromisos', (conv) => {
      var compromisos= conv.parameters["compromisos"];
      respuestas[10]=compromisos;
      conv.ask(new SimpleResponse({
        speech:"De los siguientes productos indique en los que usted ha invertido ",
        text:"De los siguientes productos indique en los que usted ha invertido ",
      }));
      conv.ask(new Suggestions(['que es productos']));
      conv.ask(new BasicCard({
  image: new Image({
    url: 'https://firebasestorage.googleapis.com/v0/b/platica-b8388.appspot.com/o/pregunta11.png?alt=media&token=6efe45c2-c157-4e86-b8ce-0c49392c1296',
    alt: 'pregunta11',
  }),
}));
});//fin intent
//--------------------------------------------------------------------------------------------------------------------------------------fin de guardaInversionProducto
//--------------------------------------------------------------------------------------------------------------------INICIAMOS INTENT guardaporcentajeInversion
//PREGUNTA 12
app.intent('guarda_productos', (conv) => {
      var productos= conv.parameters["productos"];
      respuestas[11]=productos;
      conv.ask(new SimpleResponse({
        speech:"ok gracias, que porcentaje de tu patrimonio lo tienes en inversiones? ",
        text:"ok gracias, que porcentaje de tu patrimonio lo tienes en inversiones? ",
      }));
   //   conv.ask(new Suggestions(["nada","menos de 20%","entre 20% y 40%","entre 40% y 70%","mas de 70%"]));
   conv.ask(new BasicCard({
  image: new Image({
    url: 'https://firebasestorage.googleapis.com/v0/b/platica-b8388.appspot.com/o/pregunta12.png?alt=media&token=3642896d-9558-47ca-8c71-d2a34d24b3b4',
    alt: 'pregunta12',
  }),
}));

});//fin intent
//--------------------------------------------------------------------------------------------------------------------------------------fin de guardaporcentajeInversion
//--------------------------------------------------------------------------------------------------------------------INICIAMOS INTENT guardaphone-number
app.intent('guarda_porcentaje', (conv) => {
      var porcentaje= conv.parameters["porcentaje"];
      respuestas[12]=porcentaje;
      conv.ask(new SimpleResponse({
        speech:"si deseas interarctuar con un humano, dime hablar con un humano y te dire como hacerlo, y por último ya para concluir,dame un número de teléfono para posterior comunicación ",
        text:"si deseas interarctuar con un humano, dime hablar con un humano y te dire como hacerlo, y por último ya para concluir,dame un número de teléfono para posterior comunicación ",
      }));
});
//--------------------------------------------------------------------------------------------------------------------------------------fin de guardaporcentajeInversion
//--------------------------------------------------------------------------------------------------------------------INICIAMOS INTENT guardaphone-number
app.intent('alto', (conv) => {
      var alto= conv.parameters["alto"];
      conv.ask(new SimpleResponse({
        speech:"ok, solo proporcioname tu numero de telefono por favor",
        text:"ok, solo proporcioname tu numero de telefono por favor",
      }));respuestas[12]=porcentaje;
});
//--------------------------------------------------------------------------------------------------------------------------------------fin de guardaporcentajeInversion
//--------------------------------------------------------------------------------------------------------------------INICIAMOS INTENT guardaphone-number
//--------------------------------------------------------------------------------------------------------------------INICIAMOS INTENT guardaphone-number
//
app.intent('guarda-phone-number', (conv) => {
      var Telefono= conv.parameters["phone-number"];
      respuestas[13]=Telefono;

      var data = {
        nombre:respuestas[0],
        edad:respuestas[1],
        estudios:respuestas[2],
        propositoInversion:respuestas[3],
        horizonte:respuestas[4],
        tipoActivos:respuestas[5],
        decisiones:respuestas[6],
        afirmaciones:respuestas[7],
        experiencia:respuestas[8],
        ahorro:respuestas[9],
        compromisos:respuestas[10],
        productos:respuestas[11],
        porcentaje:respuestas[12],
        //porcentaje:"respuestas con 40%",
        Telefono:respuestas[13]};
  db.collection("clientes").add(data);
      conv.ask(new SimpleResponse({
        speech:"ok gracias, permíteme unos intantes para decirte que perfil de inversor es el adecuado para ti",
        text:"ok gracias, permíteme unos intantes para decirte que perfil de inversor es el adecuado para ti",
      }));
});
//--------------------------------------------------------------------------------------------------------------------------------------fin de guardaporcentajeInversion
//inicio  intent buscandoRegistrosViejos
app.intent('buscandoRegistrosViejos', (conv) => {
  var telNum = conv.parameters["phone-number"];
  console.log(telNum);
  firestore.collection('clientes').get()
                .then((querySnapshot) => {
                })
  /*db.collection("clientes").doc(telNum)
        return referencia.get().then( doc => {
            if (doc.exists) {
                var allData = doc.data();
                allData.Telefono=doc.Telefono;

                conv.ask(new SimpleResponse({
                speech:"Número introducido" + telNum + "EL NUM ES :" + Telefono,
                    text:"Número introducido" + telNum + "EL NUM ES :" + Telefono,
                }));
                 return allData
             }else{
                 conv.ask(new SimpleResponse({
                     speech:"Lo siento, el número que me proporcionas no se encuentra aun registrado ",
                     text:"Lo siento, el número que me proporcionas no se encuentra aun registrado ",
                 }));conv.ask(new Suggestions(['salir','registrarse']));
             return console.log("Done!");
         }
     })*///fin return
});//fin del intent buscandoRegistrosViejos
////////////////--------------------------------------------------------------------------------------------DUDAS............................................
//-----------------------------------------SIGNIFICADO DE PALABRAS--------------------------------------------------------------------------------------
app.intent('significadoDiscreta', (conv) => {
  var experiencia = conv.parameters["experiencia"];
      conv.ask(new SimpleResponse({
        speech:"Inversionista con alguna experiencia, porque acostumbro a operar principalmente en fondos mutuos con bajo riesgo y depósitos a plazo",
        text:"Inversionista con alguna experiencia, porque acostumbro a operar principalmente en fondos mutuos con bajo riesgo y depósitos a plazo",
      }));
      conv.ask(new Suggestions(['regresar a tipo de experiencia']));
});
//-------------------------------------------------------------------------------------------------------------------------------------fin del intent 
//--------------------------------------------------------------------------------------------------------------------------------------inicio intent 
app.intent('significadoAvanzada', (conv) => {
  var experiencia = conv.parameters["experiencia"];
      conv.ask(new SimpleResponse({
        speech:"Inversionista experto, porque acostumbro a operar ampliamente en todos los instrumentos y productos del mercado de valores",
        text:"Inversionista experto, porque acostumbro a operar ampliamente en todos los instrumentos y productos del mercado de valores",
      }));
      conv.ask(new Suggestions(['regresar a tipo de experiencia']));
});
//-------------------------------------------------------------------------------------------------------------------------------------fin del intent 
//--------------------------------------------------------------------------------------------------------------------------------------inicio intent 
app.intent('significadoAmplia', (conv) => {
  var experiencia = conv.parameters["experiencia"];
      conv.ask(new SimpleResponse({
        speech:"Inversionista con experiencia, porque acostumbro a operar principalmente en instrumentos de renta variable",
        text:"Inversionista con experiencia, porque acostumbro a operar principalmente en instrumentos de renta variable",
      }));
      conv.ask(new Suggestions(['regresar a tipo de experiencia']));
});
//-------------------------------------------------------------------------------------------------------------------------------------fin del intent 
//--------------------------------------------------------------------------------------------------------------------------------------inicio intent 
app.intent('significadoNula', (conv) => {
  var experiencia = conv.parameters["experiencia"];
      conv.ask(new SimpleResponse({
        speech:"Inversionista sin experiencia, porque no acostumbro a operar en el mercado financiero",
        text:"Inversionista sin experiencia, porque no acostumbro a operar en el mercado financiero",
      }));
      conv.ask(new Suggestions(['regresar a tipo de experiencia']));
});
//-------------------------------------------------------------------------------------------------------------------------------------fin del intent 
//--------------------------------------------------------------------------------------------------------------------------------------inicio intent 
app.intent('significadoHorizonte', (conv) => {
  var significadoNula = conv.parameters["horizonte"];
      conv.ask(new SimpleResponse({
        speech:"el horizonte de inversion es......",
        text:"el horizonte de inversion es......",
      }));
      conv.ask(new Suggestions(['regresar a horizonte de inversión']));
});
//-------------------------------------------------------------------------------------------------------------------------------------fin del intent 
//--------------------------------------------------------------------------------------------------------------------------------------inicio intent 
app.intent('significadoCompromisos', (conv) => {
  var compromisos= conv.parameters["compromisos"];
      conv.ask(new SimpleResponse({
        speech:"productos es......",
        text:"productos es......",
      }));
      conv.ask(new Suggestions(['regresar a tipo de productos']));
});
//-------------------------------------------------------------------------------------------------------------------------------------fin del intent 
//--------------------------------------------------------------------------------------------------------------------------------------inicio intent 
app.intent('significadoTipoActivos', (conv) => {
  var RespuestaBloqueUno= conv.parameters["RespuestaBloqueUno"];
      conv.ask(new SimpleResponse({
        speech:"tipo de activos es....",
        text:"tipo de activos es....",
      }));
      conv.ask(new Suggestions(['regresar a tipo de activos']));
});
//-------------------------------------------------------------------------------------------------------------------------------------fin del intent 
//--------------------------------------------------------------------------------------------------------------------------------------inicio intent 

app.intent("hablar_humano", conv => {
  conv.ask(new SimpleResponse({
    speech:"enviar un mensaje desde <url>https://web.whatsapp.com/</url> al número +18553314795",
        text:"enviar un mensaje desde <url>https://web.whatsapp.com/</url> al número +18553314795",
      }));
});//fin intent
//-------------------------------------------------------------------------------------------------------------------------------------fin del intent 
exports.webhook = functions.https.onRequest(app);