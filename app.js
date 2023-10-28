require('dotenv').config();

//ambil module express
const express = require('express');
const app = express();

//ambil router yang mengandle endpoint user
const userRouter = require('./routes/user');

//untuk ngambil request body
app.use(express.json());

//jalanin router
app.use(userRouter);

//ambil data dari dotenv
const PORT = process.env.PORT;

app.listen(PORT, ()=>{
  console.log(`Server is listening on PORT ${PORT}`);
})