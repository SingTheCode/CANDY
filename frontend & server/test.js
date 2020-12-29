var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var title = 'candy people'
var description = 'happy day'
var fs = require('fs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('image'));

app.get('/', function(req, res) { 
    var html = `
    <style>
    .page-header{
      text-align:center;
    }
    
    #bang{
    position: relative;
    display:block;
    max-width:400px;
    margin:0px auto;
    animation:animatedbang 3s infinite;
    top: position();
    }
    
    @keyframes animatedbang
    {
    0%{transform:translateY(10px);}
    50%{transform:translateY(-20px);}
    100%{transform:translateY(10px);}
    }
    </style>
    <div class="page-header">
  <h1>CANDY</h1>
</div>

<script>
function position(){
  return Math.floor(Math.random()*500) + "px";
}
const mole = document.getElementsByTagName("img")[0]; 
document.write(mole)
</script>

<img id="bang" src="/face1.png" alt="My Image">
`;
  return res.send(html);
});

app.get('/diary', function(req, res) { 
  var html = `
  <div class="page-header">
  <h1>Writing</h1>
</div>
<style>
div{
  text-align:center;
}
</style>

`;
return res.send(html);
});
 
app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});