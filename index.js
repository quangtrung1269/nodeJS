const express=require("express");
const app = express();
const pool=require("./db");
const { select } = require("async");
///Test abcxyz
app.use(express.json());

//Routes//
//getallQLSP
app.get("/product",async (req,res)=>{
try {
    const allProduct=await pool.query("select * from product");
    res.json(allProduct.rows);
} catch (err) {
    console.log(err.message);    
}
});


//update something
//getproduct

app.get("/product/:id",async(req,res)=>{

    const{id}=req.params;
    try {
        const product=await pool.query("select * from product where id=$1",[id])
        res.json(product.rows[0])
    } catch (err) 
    {
        console.log(err.message);
    }
});
//createSQLP

app.post("/product", async(req,res)=>{
    try{
        const{nameproduct}=req.body;
        const{category}=req.body;
        const{img}=req.body;
        const{description}=req.body;
        const{origin}=req.body;
        const{price}=req.body;
        const{datecreate}=req.body;
        const newProduct=await pool.query("insert into product (nameproduct,category,img,description,origin,price,datecreate) values($1,$2,$3,$4,$5,$6,$7) returning *" ,
        [nameproduct,category,img,description,origin,price,datecreate]
        );
        res.json(newProduct.rows[0]);
    }catch(err){
        console.error(err.message);
    }
})

//update

app.put("/product/:id" , async(req,res)=>{
try {
    const {id}=req.params;
    const{nameproduct}=req.body;
    const{category}=req.body;
    const{img}=req.body;
    const{description}=req.body;
    const{origin}=req.body;
    const{price}=req.body;
    const{datecreate}=req.body;
    const updatename= await pool.query("update product set nameproduct =$1 where id=$2",[nameproduct,id]);
    const updatecategory= await pool.query("update product set category =$1 where id=$2",[category,id]);
    const updateimg= await pool.query("update product set img =$1 where id=$2",[img,id]);
    const updatedescription= await pool.query("update product set description =$1 where id=$2",[description,id]);
    const updateorigin= await pool.query("update product set origin =$1 where id=$2",[origin,id]);
    const updateprice= await pool.query("update product set price =$1 where id=$2",[price,id]);
    const updatecreatedate= await pool.query("update product set datecreate =$1 where id=$2",[datecreate,id]);
    res.json("Product was update!!");

} catch (err) 
{
console.log(err.message);    
}
})

//delete
app.delete("/product/:id",async(req,res)=>
{
    try {
        const{id}=req.params;

const deleteproduct=await pool.query("delete from product where id=$1",
[id]
);
 res.json("Product was bay màu!!");
        
    } catch (err) {
        console.log(err.message);
        
    }
});

//Category

app.get("/category",async(req,res)=>
{
    try {
        const allCategory=await pool.query("select * from category");
        res.json(allCategory.rows);
        
    } catch (err) {
        console.log(err.message)
    }
})

app.get("/category/:id",async(req,res)=>
{
    try {
        const {id}=req.params;
        const category=await pool.query("select * from category where id=$1",[id]);
        res.json(category.rows[0]);
    } catch (err) 
    {
    console.log(err.message)    
    }
});

app.post("/category", async(req,res)=>{
    try{

        const{nameCategory}=req.body;
        const newCategory=await pool.query("insert into category (nameCategory) values($1) returning *" ,
        [nameCategory]
        );

        res.json(newCategory.rows[0]);
    }catch(err){
        console.error(err.message);
    }
});
app.delete("/category/:id",async(req,res)=>
{
    try {
        const{id}=req.params;
const deletecategory=await pool.query("delete from category where id=$1",
[id]
);
 res.json("Category was bay màu!!");        
    } catch (err) {
        console.log(err.message);        
    }
});
app.put("/category/:id" , async(req,res)=>{
    try {
        const {id}=req.params;
        const{nameCategory}=req.body;
        const updateCategory= await pool.query("update category set nameCategory =$1 where id=$2",[nameCategory,id]);
        res.json("Category was update!!");    
    } catch (err) 
    {
    console.log(err.message);    
    }
    });

//Customer

app.get("/customer",async(req,res)=>
{
    try {
        const allCategory=await pool.query("select * from customer");
        res.json(allCategory.rows);
        
    } catch (err) {
        console.log(err.message)
    }
})

app.get("/customer/:id",async(req,res)=>
{
    try {
        const {id}=req.params;
        const category=await pool.query("select * from customer where id=$1",[id]);
        res.json(category.rows[0]);
    } catch (err) 
    {
    console.log(err.message)    
    }
});

app.post("/customer",async(req,res)=>
{
    try 
    {
    const {fullname}=req.body;
    const{username}=req.body;
    const{address}=req.body;
    const{phone}=req.body;
    const addCustomer =await pool.query("insert into customer(fullname,address,phone,username) values($1,$2,$3,$4) returning *",[fullname,address,phone,username]);
    res.json(addCustomer.rows[0]);
    } catch (err) 
    {
    console.log(err.message)    
    }
});

app.put("/customer/:id",async(req,res)=>
{
try {
    const {id}=req.params;
    const {fullname}=req.body;
    const{username}=req.body;
    const{address}=req.body;
    const{phone}=req.body;
    const updateFullname = await pool.query("update customer set fullname =$1 where id=$2",[fullname,id])
    const updateusername = await pool.query("update customer set username =$1 where id=$2",[username,id])
    const updateaddress = await pool.query("update customer set address =$1 where id=$2",[address,id])
    const updatephone = await pool.query("update customer set phone =$1 where id=$2",[phone,id])
    res.json("Customer was update!!!");
} catch (err) {
    console.log(err.message);
}
});

app.delete("/customer/:id",async(req,res)=>
{
    try {
        const{id}=req.params;
const deletecategory=await pool.query("delete from customer where id=$1",
[id]
);
 res.json("Category was bay màu!!");        
    } catch (err) {
        console.log(err.message);        
    }
});
app.listen(3000,()=>{
    console.log("Sever running in port 3000");
});