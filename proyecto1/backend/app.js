const express = require("express");
const cors = require("cors");
const axios = require("axios").default;
const app = express();

app.listen(3000,function(req,res){
    console.log('Server started at port 3000');
})