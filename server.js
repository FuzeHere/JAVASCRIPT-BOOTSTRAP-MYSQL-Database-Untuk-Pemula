const express = require("express")//untuk bisa dibuka melalui browser
const mysql = require("mysql")//koneksi ke database
const BodyParser = require("body-parser")

const app = express()//karena express itu function maka diubah menjadi app agar bisa mengakses server side js

app.use(BodyParser.urlencoded({ extended: true}))

app.set("view engine", "ejs")
app.set("views", "views")//untuk memberitahu templete html views ada di folder views

const db = mysql.createConnection({
    host: "localhost",
    database: "scholl",
    user: "root",
    password: "",
})//setup database

db.connect((err) => {
    if(err) throw err
    console.log("database connected...")

    //untuk get data
    app.get("/", (req, res) => {
        const sql = "SELECT * FROM user"
        db.query(sql, (err, result) => {
            const users = JSON.parse(JSON.stringify(result)) //menghilangkan tulisan rowdatapacket di powershell
            res.render("index", {users: users, title: "DAFTAR MURID KELAS"})
        })
    })

    //untuk insert data
    app.post("/tambah", (req, res) => {
        const insertSql = `INSERT INTO user (nama, kelas) VALUES ('${req.body.nama}', '${req.body.kelas}');`
        db.query(insertSql, (err, result) => {   
            if (err) throw err
            res.redirect("/");        
        })
    })
})//setup agar database mengirim info apakah sudah terkoneksi dengan server dan menampilkan isi database, dan untuk js hanya error dan tidak error maka jika erorr maka koneksi berhasil

app.listen(8000, () => {
    console.log('server ready...')
})