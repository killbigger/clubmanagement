const express = require('express');
 const app = express();
 const auth  =  require("./router/auth");
 require('./startup.js/db');

 const PORT = 3000;

app.use(express.json());
app.use('/auth',auth,()=>{
  console.log('auth called');
});

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
 });