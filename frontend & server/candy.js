var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var fs = require('fs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('image'));

var happy = 0;
var none = 0;
var sad = 0;
var angry= 0;

app.get('/', function(req, res) { 
  var key = 0;
    var html = `
    <!DOCTYPE html>
    <html>
    <style>
    .page-header{
      text-align:center;
    }
    body{
      background-color:#f5f5dc;
    }
    .face-image1{
    float:left;
    margin-left:50px;
    animation:animatedface1 3s infinite;
    }
    .face-image2{
      float:left;
      padding-left:150px;
      margin-left:50px;
      animation:animatedface2 3s infinite;
      }
    
    @keyframes animatedface1
    {
    0%{transform:translateY(10px);}
    50%{transform:translateY(-20px);}
    100%{transform:translateY(10px);}
    }

    @keyframes animatedface2
    {
    0%{transform:translateY(-10px);}
    50%{transform:translateY(20px);}
    100%{transform:translateY(-10px);}
    }
    </style>
<body>

<div class="page-header">
  <h1>CANDY</h1>
</div>
<div class="face-image1">
<a href="/diary?tmp=1">
<img src="/face1.png" alt="My Image" width="300px" height="300px">
</a>
<a href="/diary?tmp=2">
<img src="/face2.png" alt="My Image" width="300px" height="300px">
</a>
<a href="/diary?tmp=3">
<img src="/face3.png" alt="My Image" width="300px" height="300px">
</a>
<a href="/diary?tmp=4">
<img src="/face4.png" alt="My Image" width="300px" height="300px">
</a>
</div><br>

<div class="face-image2">
<a href="/diary?tmp=5">
<img src="/face5.png" alt="My Image" width="300px" height="300px">
</a>
<a href="/diary?tmp=6">
<img src="/face6.png" alt="My Image" width="300px" height="300px">
</a>
<a href="/diary?tmp=7">
<img src="/face7.png" alt="My Image" width="300px" height="300px">
</a>
<a href="/diary?tmp=8">
<img src="/face8.png" alt="My Image" width="300px" height="300px">
</a>
</div>
</body>
</html>
`;
  return res.send(html);
});

app.get('/diary', function(req, res) { 
  
  var imagesrc ="";
  var num = 0;

  if(req.query.tmp == 1){
    imagesrc="/face1.png";
    sad = parseInt(50);
    num = 1;
  }
  else if(req.query.tmp == 2){
    imagesrc="/face2.png";
    num = 2;
  }
  else if(req.query.tmp == 3){
    imagesrc="/face3.png";
    none = parseInt(50);
    num = 3;
  }
  else if(req.query.tmp == 4){
    imagesrc="/face4.png";
    num = 4;
  }
  else if(req.query.tmp == 5){
    imagesrc="/face5.png";
    angry = parseInt(50);
    num = 5;
  }
  else if(req.query.tmp == 6){
    imagesrc="/face6.png";
    num = 6;
  }
  else if(req.query.tmp == 7){
    imagesrc="/face7.png";
    happy = parseInt(50);
    num = 7;
  }
  else{
    imagesrc="/face8.png";
    num = 8;
  }
  var html = `
  <!DOCTYPE html>
  <html>
  <div class="page-header">
  <h1>CANDY</h1>
</div>
<style>
.page-header{
  text-align:center;
}
.postit{
  position:float;
  width:600px;
  margin:0 auto;
  padding-left:90px;
}
.line{
  margin-top:50px;
  padding: 5px 10px;
	text-align: center;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate( -50%, -50% );
}
#formbox{
  width:350px;
  height:250px;
  font-size:20px;
  text-align:center;
  background-color:transparent;
  border:none;
}
#sub{
  margin-left:200px;
  witch:35px;
  height:32px;
  font-size:20px;
  background-color:blue;
  color:white;
  font-type:bord;
}
body{
  background-color:#f5f5dc;
}
.faceimg{
  width:200px;
  padding: 5px 10px;
	text-align: center;
  position: absolute;
  padding-bottom:370px;
	top: 50%;
	left: 50%;
	transform: translate( -50%, -50% );
}
.btn-primary{
  font-size:20px;
  background-color:red;
  color:white;
  font-type:bord;
}
</style>
<body>
<div>
<img class="faceimg" src="${imagesrc}" alt="My Image"}
</div>
<div class="postit">
  <img src="/postit.png" alt="My Image">
  </div>

  <div class="line">
  <form action="http://172.30.1.58:3000/library" method="post" target="iframe1">
  <p>
    <textarea id="formbox" name="description" placeholder="당신의 감정을 담아보세요."></textarea>
  </p>
  <p>
    <input id="sub" type="submit" value="저장">
    <a href="/main?num=${num}">
    <button type="button" id="myButton" data-loading-text="Loading..." class="btn-primary" autocomplete="off">완료</button>
    </a>
  </p>
</form>
<iframe name="iframe1" style="display:none;"></iframe>
</div>
</body>
</html>
`;
return res.send(html);
});

app.get('/main', function(req, res){

  var imagesrc="";

  if(req.query.num == 1){
    imagesrc="/face1.png";
  }
  else if(req.query.num == 2){
    imagesrc="/face2.png";
  }
  else if(req.query.num == 3){
    imagesrc="/face3.png";
  }
  else if(req.query.num == 4){
    imagesrc="/face4.png";
  }
  else if(req.query.num == 5){
    imagesrc="/face5.png";
  }
  else if(req.query.num == 6){
    imagesrc="/face6.png";
  }
  else if(req.query.num == 7){
    imagesrc="/face7.png";
  }
  else{
    imagesrc="/face8.png";
  }

  var html=`
<!DOCTYPE html>
<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css'><link rel="stylesheet" href="./style.css">
<html>
<style>
.image{
  margin-top:30px;
  float:right;
  margin-right:20px;
}
#one{
  width:150px;
}

:root {
  --height: 80vmin;
  --width: 800px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hidden {
  transition: all 200ms ease;
  opacity: 0;
  pointer-events: none;
}

.carousel {
  width: var(--width);
  height: var(--height);
  position: relative;
}
.carousel .btn {
  position: absolute;
  height: calc(100% - 15%);
  width: calc(100% - 90%);
  margin: 35px 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 400ms ease;
  overflow: hidden;
}
.carousel .btn:before {
  content: '';
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  transition: all 300ms ease;
}
.carousel .btn i {
  font-size: 1.6rem;
  color: #000;
  transition: all 400ms ease;
  opacity: 0;
}
.carousel .btn-back {
  top: 0;
  left: 0px;
}
.carousel .btn-back:before {
  border-radius: 100% 0 0 100%;
  transform: translateX(100px);
}
.carousel .btn-back .fa-arrow-left {
  transform: translateX(100px);
}
.carousel .btn-next {
  top: 0;
  right: 0px;
}
.carousel .btn-next:before {
  border-radius: 0 100% 100% 0;
  transform: translate(-100px);
}
.carousel .btn-next .fa-arrow-right {
  transform: translateX(-100px);
}
.carousel .btn .right-indicator, .carousel .btn .left-indicator {
  opacity: 1;
  color: rgba(255, 255, 255, 0.9);
}
.carousel .btn .right-indicator {
  transform: translateX(-20px);
}
.carousel .btn .left-indicator {
  transform: translateX(-5px);
}
.carousel .btn:hover:before {
  border-radius: 0;
  background: rgba(255, 255, 255, 0.6);
  transform: translateX(0);
}
.carousel .btn:hover .fa-arrow-left, .carousel .btn:hover .fa-arrow-right {
  opacity: 1;
}
.carousel .btn:hover .fa-arrow-left {
  transform: translateX(8px);
}
.carousel .btn:hover .fa-arrow-right {
  transform: translateX(8px);
}
.carousel .btn:hover .right-indicator {
  transform: translateX(100px);
  opacity: 0;
}
.carousel .btn:hover .left-indicator {
  transform: translateX(-100px);
  opacity: 0;
}
.carousel .viewbox {
  width: calc(100% - 20%);
  height: calc(100% - 10%);
  position: relative;
  margin: 25px auto;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2), 2px 5px 10px rgba(0, 0, 0, 0.1), -2px 8px 10px rgba(0, 0, 0, 0.1);
  z-index: 2;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.6);
}
.carousel .viewbox .track {
  width: 100%;
  height: 100%;
  position: relative;
  transition: all 500ms ease;
  z-index: 2;
}
.carousel .viewbox .track .slide {
  width: 100%;
  height: 100%;
  position: absolute;
  transform: scale(1.09);
}
.carousel .viewbox .track .slide .images {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.carousel .nav-indicator {
  position: absolute;
  bottom: -2vh;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
}
.carousel .nav-indicator .dot {
  margin: 0 5px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: all 300ms ease;
}
.carousel .nav-indicator .dot.active {
  background: rgba(0, 0, 0, 0.5);
}

a {
  margin: 5px 5px;
  color: #fff;
  font-size: 2rem;
  transition: all 400ms ease;
}

a:hover {
  color: #222;
}

button{
  font-size:20px;
  background-color:red;
  color:white;
  font-type:bord;
}
</style>
<body>
<div class="image">
<img id="one" src="${imagesrc}" onerror="this.src='/yellow.png'"/>
<img id="one" src="" onerror="this.src='/yellow.png'"/>
<img id="one" src="" onerror="this.src='/yellow.png'"/>
<img id="one" src="" onerror="this.src='/yellow.png'"/>
<img id="one" src="" onerror="this.src='/yellow.png'"/>
</div>

<div>
<a href="/mypage">
<button type="button" id="myButton">나의기분</button>
</a>
</div>

<div class="carousel">
	<div class="btn btn-back hidden">
		<i class="fas fa-arrow-left"></i>
		<i class="fas fa-chevron-left left-indicator"></i>
	</div>
	<div class="viewbox">
		<div class="track">
			<div class="slide active">
				<img class="images" src="/ppt1.png">
			</div>
			<div class="slide">
				<img class="images" src="ppt2.png">
			</div>
			<div class="slide">
				<img class="images" src="ppt3.png">
			</div>
		</div>
	</div>
	<div class="btn btn-next">
		<i class="fas fa-arrow-right"></i>
		<i class="fas fa-chevron-right right-indicator"></i>
	</div>
	<div class="nav-indicator">
		<div class="dot active"></div>
		<div class="dot"></div>
		<div class="dot"></div>
	</div>
</div>

  <script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TimelineMax.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js'></script><script  src="./script.js"></script>


</body>
</html>
`;
return res.send(html);
});



app.get('/mypage', function(req, res){

  happy += parseInt(string[1]);
  none += parseInt(string[0]);
  angry += parseInt(string[3]);
  sad += parseInt(string[2]);

  var html=`
  <!DOCTYPE html>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
  <html>
  <div class="container">
  <h2>나의 감정 그래프</h2>
  <p>무감정, 기쁨, 슬픔, 화남에 대한 분석</p> 
  <div class="progress">
    <div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar" aria-valuenow="${none}" aria-valuemin="0" aria-valuemax="100" style="width:${none}%">
      ${none}% 무감정
    </div>
  </div>
  <div class="progress">
    <div class="progress-bar progress-bar-info progress-bar-striped" role="progressbar" aria-valuenow="${happy}" aria-valuemin="0" aria-valuemax="100" style="width:${happy}%">
      ${happy}% 기쁨
    </div>
  </div>
  <div class="progress">
    <div class="progress-bar progress-bar-warning progress-bar-striped" role="progressbar" aria-valuenow="${sad}" aria-valuemin="0" aria-valuemax="100" style="width:${sad}%">
      ${sad}% 슬픔
    </div>
  </div>
  <div class="progress">
    <div class="progress-bar progress-bar-danger progress-bar-striped" role="progressbar" aria-valuenow="${angry}" aria-valuemin="0" aria-valuemax="100" style="width:${angry}%">
      ${angry}% 화남
    </div>
  </div>
</div>

</body>
  </html>
  `;
  return res.send(html);
});

var text="";

app.post('/library', function(req, res) {

  text = req.body.description;
  console.log(text);
  res.send(text);
});
var string = ""
 app.post('/python',function(req,res){
   res.send(text);
   var tmp="";
   req.on('data', function(chunk){
    tmp += chunk;
   });
   req.on('end', function(){
     string = tmp;
     console.log(string.slice(','));
   });
 });

 
app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});