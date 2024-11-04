const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const path = require('path');
const PORT = 5005;
const bcrypt=require('bcrypt');

const db=new sqlite3.Database('./hackathonDB.db',(err)=>{
    if(err) { console.error('CANNOT CONNECT TO DATABASE: ',err.message); }
    else { console.log('SUCCESFULLY CONNECTED ON PORT',PORT)}
})

app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.json());


//get reports endpoint
app.get('/api/reports',(req,res)=>{
    const sql='SELECT * FROM reports';
    db.all(sql,[],(err,rows)=>{
        if(err){ res.status(500).json({ error: err.message });return;}
        res.json({items:rows});
    });
});

//login check
app.post('/api/login',(req,res)=>{
   
})

//send static page to user
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/login/login.html'));
});

//insert into users
app.post('/api/users',(req,res)=>{
    const {username, name, password, email, bio, birth, tel,img, isAdmin}=req.body;
    if (!username || !name || !password || !email) {
        res.status(400).json({ error: 'Required fields missing' });
        return;
    }
    const sql = `INSERT INTO users (username, name, password, email, bio, birth, tel,img, isAdmin)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)`;
    const params = [username, name, password, email, bio, birth, tel, isAdmin ? 1 : 0];

    db.run(sql,params,function(err){
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ 
            message: 'User added successfully', 
            userId: this.lastID
    });
});
})

//insert into reports
app.post('/api/reports',(req,res)=>{
    const {lat,lng,desc,adresa,userId}=req.body;
    const sql = `INSERT INTO reports (lat,lng,desc,adresa,userId)
                 VALUES (?, ?,?,?,?)`;
    const params = [lat,lng,desc,adresa,userId];

    db.run(sql,params,function(err){
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ 
            message: 'Report added successfully', 
            reportId: this.lastID
    });
});
})


//start server
app.listen(PORT,()=>{console.log('Server is running on http://localhost:',PORT);});