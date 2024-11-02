import express from 'express';
import Joi from 'joi';

const inputValidation = ()=>{
  const schema = {
    name: Joi.string().min(3).required(),
    type: Joi.string().min(3).required()
  }
  return Joi.validate(req.body, schema)
}

const PORT = process.env.PORT;
const courses = [
  {id: 1, name: "Course One", type: "business"},
  {id: 2, name: "Course Two", type: "js"},
  {id: 3, name: "Course Three", type: "business"},
  {id: 4, name: "Course Four", type: "js"},
];
const app = express();

app.get('/', (req, res)=>{
  res.send('Welcome To Our Server');
  res.end();
})
app.get('/api/courses', (req, res)=>{
  res.send(courses);
  res.end();
})
app.get('/api/courses/:id', (req, res)=>{
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course) res.status(404).send('Request course not found');
  res.send(course)
  res.end();
})

// post 
app.post('/api/courses', (req, res)=>{
  const result = inputValidation;
  if(result.error){
    res.status(400).send(result.error.details[0].message)
    return;
  }
  const course = {
    id: courses.length +1,
    name: req.body.name,
    type: req.body.type,
  };
  courses.push(course);
  res.send(course);
  res.end();
})
/*
app.get('/api/courses/:type', (req, res)=>{
  const course = courses.map(c => c.type === req.params.type);
  console.log(course)
  console.log(req.params.type)
  if(!course) res.status(404).send('Request course not found');
  res.send(course)
  res.end();
})
*/

app.listen(PORT, ()=> console.log(`Server Running on Port: ${PORT}`))