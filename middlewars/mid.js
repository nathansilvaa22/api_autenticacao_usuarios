const jwt = require('jsonwebtoken')

const checarToken = (req,res,next)=>{

  const aythHeader = req.headers['authorization']
  const token = aythHeader && aythHeader.split("")[1]

  if(!token){
    return res.json({msg:"Acesso negado"})
  }
  try {

    const secret = process.env.SECRET

    jwt.verify(token, secret)

    next()
    
  }
  catch(err){
    console.log(err)

    res.json({msg:"Token inválido"})
  }
}

module.exports = checarToken