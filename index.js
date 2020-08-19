const express=require("express");
const app = express();
const pool=require("./db");

app.use(express.json())

//Routes//

//getQLSP

//createSQLP

app.post("/product",(req,res)=>{
    try{

        const{productname}=req.body;
        const newProduct=await pool.query("insert into qlsp(productname) values($1) returning *" ,
        [productname]
        );

        res.json(newProduct.rows[0]);
    }catch(err){
        console.error(err.message);
    }
})

//

app.listen(3000,()=>{
    console.log("Sever running in port 3000");
});