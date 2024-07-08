require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const app = express()
const PORT = 3000
const privateRoute = require('./middlewars/mid')

app.use(express.json())

const User = require('./models/User')

app.get('/',(req,res)=>{
  res.send("tooop")
})

//Rota Privada

app.get('/user/:id', privateRoute, async(req,res)=>{

  const id = req.params.id

  const user = await User.findById(id, '-password')

  if(!user){
    return res.status(404).json({msg:"usuario nao encontrado"})
  }

  res.status(200).json({user})
})



app.post('/register', async (req,res)=>{
  const {name,email,password,confirmpassword} = req.body

  //validação

  if(!name){
    return res.status(422).json({msg:"o nome é obrigatorio"})
  }
  if(!email){
    return res.status(422).json({msg:"o email é obrigatorio"})
  }
  if(!password){
    return res.status(422).json({msg:"a senha é obrigatorio"})
  }

  if(password != confirmpassword){
    return res.status(422).json({msg:"As senhas não conferem"})
  }

  // Checar se o usuario existe
  const userExist = await User.findOne({email:email})

  if(userExist){
    return res.status(422).json({msg:"Por favor utilize outro email"})
  }

  //Criar senha 
  const sent = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(password,sent)

  //Criar usuario

  const user = new User({
    name,
    email,
    password:passwordHash
  })
  try {

    await user.save()

    res.status(201).json({msg:"Usuario criado com sucesso"})

  }
  catch (err){
    console.log(err)

    res.status(500).json({msg:"Aconteceu um erro no servidor"})
  }
})

//Login

app.post('/login', async (req,res)=>{

  
  const {email, password} = req.body

  if(!email){
    return res.status(422).json({msg:"o email é obrigatorio"})
  }
  if(!password){
    return res.status(422).json({msg:"a senha é obrigatorio "})
  }

  //Checar se o usuario existe

  const user = await User.findOne({email:email})

  if(!user){
    return res.status(404).json({msg:"Usuario não encontrado"})
  }

  //checando a senha do usuario

  const checarPassword = await bcrypt.compare(password, user.password)

  if(!checarPassword){
    return res.status(422).json({msg:"senha invalida"})
  }
  
  try {

    const secret = process.env.SECRET

    const token = jwt.sign({
      id: user._id
    }, secret)

    res.status(200).json({msg:"autenticação realizada com sucesso!!!", token})

  }
  catch (err){
    console.log(err)

    res.status(500).json({msg:"Aconteceu um erro no servidor"})
  }

})



mongoose.connect('mongodb://localhost/usuarios')
.then(()=>{
  console.log('banco conectado')
})
.catch((err)=>{console.log(err)})

app.listen(PORT || 3000, ()=>{
  console.log(`servidor rodando ${PORT}`)
})