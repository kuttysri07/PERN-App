const express=require("express");
const app=express();
const port=5000;
const cors=require("cors");
const { Pool } = require('pg');

//middleware
app.use(cors());
app.use(express.json()); //req.body

//connect database


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'world',
    password: 'kuttysri07',
    port: 5432,
});

//add new todo

app.post("/todos",async(req,res)=>{
    try {
     const{description}= req.body;
     const newtodo=await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *",[description]);
     res.json(newtodo)
    } catch (err) {
        console.log(err.message);
    }
})

//get all todo

app.get("/todos",async(req,res)=>{
    try {
    
     const alltodo=await pool.query("SELECT * FROM todo");
     res.json(alltodo.rows)
    } catch (err) {
        console.log(err.message);
    }
})

//get one todo

app.get("/todos/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const getonetodo=await pool.query("SELECT * FROM todo WHERE todo_id=$1",[id]);
        res.json(getonetodo.rows);
    } catch (err) {
        console.log(err.message);
    }
})

//edit one todo

app.put("/todos/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const {description}=req.body;
        const edittodo=await pool.query("UPDATE todo SET description = $1 WHERE todo_id=$2",[description,id]);
        res.json("todo was updated");


    } catch (err) {
        console.log(err.message);
    }
})

app.delete("/todos/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const deletetodo=await pool.query("DELETE FROM todo WHERE todo_id=$1",[id]);
        res.json("todo was DELETED")


    } catch (err) {
        console.log(err.message);
    }
})


app.listen(port,()=>{
    console.log(`server ${port} has been started`)
})