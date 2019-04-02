const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cors())

const apiData = (cep) => axios.get(`https://viacep.com.br/ws/${cep}/json`)

app.get('/api/v1/cep', async (req, res) => {
    try {
        let validCep = /[0-9]{5}-[\d]{3}/.test(req.query.code) || /[0-9]{5}[\d]{3}/.test(req.query.code)

        if (validCep) {
            
            const { data } = await apiData(validCep)
            
            return res.status(200).json({
                
                zipcode: data.cep,
                street: data.logradouro,
                street_number: data.complemento,
                neighborhood: data.bairro,
                city: data.localidade,
                state: data.uf,
                ibge: data.ibge
            
            })
        } else return res.status(400).json({ message: 'Invalid Request' })

    } catch (err) {
        res.status(500).json(err)
    }
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server init url: http://localhost:${port}`))