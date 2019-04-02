const express = require('express')
const axios = require('axios')

const app = express()

const apiData = async () => {
    
    try{

        return await axios.get("https://viacep.com.br/ws/63050222/json")
    
    } catch (err) {
    
        console.log(err)
    
    }
}

app.get('/api/v1/cep', async (req, res) => {
    
    const { data } = await apiData()

    let validCep = /[0-9]{5}-[\d]{3}/.test(req.query.code) || /[0-9]{5}[\d]{3}/.test(req.query.code)

    if(validCep){
            
            res.status(200).json({
            
                "zipcode": data.cep,
                "street": data.logradouro,
                "street_number": data.complemento,
                "neighborhood": data.bairro,
                "city": data.localidade,
                "state": data.uf,
                "ibge": data.ibge
            
            })

    }
    else {
        res.status(400).json({
            message: "Invalid Request"
        })
    }

})

app.listen(3000)