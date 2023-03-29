const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"mysql123",
    database:"employee_management_system",
});

app.post("/addemployee",(req,res)=>{

    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const department = req.body.department;
    const role = req.body.role;
    const salary = req.body.salary;

    db.query("INSERT INTO employees (name, age, country, department, role, salary) VALUES (?,?,?,?,?,?)",[name,age,country,department,role,salary],(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.send("VALUES INSERTED!");
        }
    })

})


app.get("/getemployee",(req,res)=>{
    db.query("SELECT * FROM employees", (err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.send(result);   //we can use res.json also - the received data from the database is stored in the result variable which must be given to the frontend
        }
    })
})

app.delete("/delete/:id",(req,res)=>{
    const id = req.params.id;
    db.query("DELETE FROM employees WHERE id = ?",id, (err,result)=>{ //since we have only one question mark here, we don't have to pass an array
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.send(result);
        }
    })
})



app.listen(3001,()=>{
    console.log("Connected to the backend!");
})