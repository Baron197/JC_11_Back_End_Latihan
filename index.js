const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const PORT = 4000

const app = express()
var arrProducts = [
    {
        nama: 'Popok Hokage',
        description: 'Siapkah anda menjadi hokage?',
        harga: 50000
    },
    {
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

app.get('/products', (req,res) => { 
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
