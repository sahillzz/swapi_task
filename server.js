const path = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const express = require('express')
const config = require('./webpack.config')
const axios = require('axios')
const bodyParser =  require('body-parser')

const app = express()
const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  historyApiFallback: true,
}))

app.use(webpackHotMiddleware(compiler))

app.use(bodyParser());

app.set('json replacer', 40); // property transformation rules
app.set('json spaces', 2); // number of spaces for indentation
app.use(express.static(__dirname + '/public'));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})


app.post('/login', (req, res)=>{
  const data = axios.get('https://swapi.co/api/people',{
    params:{
      search: req.body.name
    }
  }).then((e)=>{
    e.data.count !== 1?(res.status(500).send({error:"not found"})):(
      e.data.results[0].name.replace(/ /g,'').toLowerCase() == req.body.name.replace(/ /g,'').toLowerCase() ?(
        e.data.results[0].birth_year == req.body.password ?
          (res.send("success")):(
            res.status(200).send({ error: "Incorrect Password" }))
      ):(
        res.status(200).send({ error: "No Match" })
      )
    );
  })
  .catch((error)=>res.send(error));
});

app.listen(8080, (err) => {
  if (err) {
    return console.error(err) // eslint-disable-line no-console
  }
  console.log('Listening at http://localhost:8080') // eslint-disable-line no-console
})
