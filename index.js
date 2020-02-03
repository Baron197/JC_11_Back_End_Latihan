const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

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
