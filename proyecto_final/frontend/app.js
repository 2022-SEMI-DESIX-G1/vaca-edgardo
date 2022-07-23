require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

// Obtener el directorio del frontend.
var publicPath = path.resolve(__dirname); 

// Deja disponibles los archivos para uso del index.html.
app.use(express.static(publicPath));

//despliega el index.html
router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/login.html'));
});

//adiciona la ruta
app.use('/', router);
//inicia el puerto
//app.listen(process.env.port || 8080);

//console.log('Running at Port 8080');

app.listen(process.env.PORT, ()=>{
  console.log("Server corriendo en puerto ",process.env.PORT)
})