import express from "express";
import cors from "cors";
import database from "./database/db.js"

const app = express();
app.use(express.json());
app.use(cors());


app.get("/api/students", (req,res) => {
    const q = "SELECT * FROM contact_db";
    database.query(q,(err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/api/students/:id", (req,res) => {
    const id = req.params.id;
    const q = "SELECT * FROM contact_db WHERE id = ?";
    database.query(q,[id],(err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    });
});

app.post("/api/students/post", (req,res) => {
    const {name,email,contact} = req.body;
    const q = "INSERT INTO contact_db (name, email, contact) VALUES (?, ?, ?)";
    database.query(q,[name,email,contact], (err,data) => {
        if(err){
            return res.json(err);
            
        }else {
            res.json("Successfully Inserted!");
        }
    })
})


app.put('/api/students/update/:id', (req,res) => {
    const q = "UPDATE contact_db SET `name` = ?, `email` = ?, `contact` = ? WHERE id = ?";
    const id = req.params.id;
    database.query(q,[req.body.name,req.body.email,req.body.contact,id], (err,data) => {
        if(err) return res.json("Error");
        return res.json({updated: true})

    })

})

app.delete("/api/students/delete/:id", (req,res) => {
    const id = req.params.id;
    const q = "DELETE FROM contact_db WHERE id = ?";
    database.query(q,[id], (err,data) => {
        if(err) return res.json(err)
        return res.json("Successfully Deleted")
    });

});


app.listen(8800, () => console.log("Connected to the server!"))