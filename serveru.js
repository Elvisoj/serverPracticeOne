import {createServer} from 'http';
import url from 'url';
import fs from 'fs/promises';
import path from 'path';
import users from './src/data/users.js'

const PORT = process.env.PORT;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__filename);
console.log(__dirname);

//LOGGER
const logger = (req, res, next) =>{
  console.log(`Method:${req.method} Url:${req.url}`)
  next();
}

// JSONMIDDLEWARE
const jsonMiddleWare = (req, res, next)=>{
  res.setHeader('Content-Type', 'application/json');
  next();
}

// Home page handler
const homePageHandler = (req, res, data)=>{
  res.statusCode = 200;
  res.write(data)
  res.end();
}
  
// Users page handler
const usersPageHandler = (req, res)=>{
  res.statusCode = 200;
  res.write(JSON.stringify(users))
  res.end();
}

const server = createServer( async (req, res)=>{
  logger(req, res, ()=>{
    jsonMiddleWare(req, res, ()=>{
      try{
        if(req.method === 'GET' && req.url === '/'){
          let filePath;
          filePath = path.join(__dirname, 'src', 'data', 'index.html')
          const data = await fs.readFile(filePath)
          homePageHandler(req, res, data)
        }
        
        else if(req.method === 'POST' && req.url === '/user'){
          usersPageHandler(req, res)
        }
      }
      catch(err){
        console.log(err)
      }
    })
  })
})

server.listen(PORT, ()=>{
  console.log(`Server running on PORT:${PORT}`)
  console.log(`Server running :https:/localhost:${PORT}`)
})
