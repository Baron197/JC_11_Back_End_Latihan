const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'saitama',
  password : 'abc123',
  database : 'popokhokage',
  port     : 3306
});


const PORT = 4000

const app = express()
var arrProducts = [
    {
        id: 4,
        nama: 'Popok Hokage',
        description: 'Siapkah anda menjadi hokage?',
        harga: 50000
    },
    {
        id: 7,
        nama: 'Popok Naruto',
        description: 'Naruto menggunakannya dari kecil',
        harga: 100000
    }
]

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req,res) => {
    res.status(202).send('<h1>Selamat Datang di API Latihan!</h1>')
})

app.get('/categories/:nama', (req,res) => {
    console.log(req.params.nama)

    const query = `SELECT * 
        FROM categories 
        WHERE category = ${connection.escape(req.params.nama)};`
    
    console.log(query)
    connection.query(query, (err, results) => {
        console.log('Error : ',err)
        if (err) {
            return res.status(500).send(err)
        }
        
        console.log('Results : ', results)

        res.status(200).send(results)
      });
})

app.post('/categories', (req,res) => {
    console.log(req.query)
    console.log(req.body)

    const query = `INSERT INTO categories SET ? ;`
    console.log(query)
    connection.query(query, req.query, (err,results) => {
        if(err) {
            return res.status(500).send(err)
        }

        console.log(results)
        res.status(200).send(results)
    })
})

app.put('/categories/:id', (req,res) => {
    console.log(req.params)
    console.log(req.body)

    const query = `UPDATE categories SET ? WHERE id = ${connection.escape(req.params.id)}`
    console.log(query)
    connection.query(query, req.body, (err,results) => {
        if(err) {
            return res.status(500).send(err)
        }

        console.log(results)
        res.status(200).send(results)
    })
})

app.delete('/categories/:id', (req,res) => {
    console.log(req.params)
    const query = `DELETE FROM categories WHERE id = ${connection.escape(req.params.id)}`;
    
    connection.query(query,(err,results) => {
        if(err) {
            return res.status(500).send(err)
        }

        console.log(results)
        res.status(200).send(results)
    })
})

app.get('/products', (req,res) => { 
    res.status(200).send(arrProducts)
})

app.get('/products/:id', (req,res) => { 
    var hasil = arrProducts.filter((item) => {
        return item.id === parseInt(req.params.id)
    })
    if(hasil.length === 0) {
        return res.status(500).send({ status: 'Not Found', message: 'Product Not Found!'})
    }

    res.status(200).send(hasil[0])
})

//http://localhost:4000/products/54/test/keren/kurap/kacrut/bebas
app.get('/products/:id/test/:contoh/:keren/kacrut/:kucrat', (req,res) => { 
    console.log(req.params)
    res.status(200).send(arrProducts)
})

app.post('/products', (req,res) => {
    console.log(req.body)
    arrProducts.push(req.body)
    console.log(arrProducts)

    res.status(200).send({ 
        status: 'Success',
        message: 'Add Product Success!'
    })
})

app.listen(PORT, () => console.log(`API berhasil aktif di PORT ${PORT}`))
