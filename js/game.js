//Канвас и контекст
var cvs = document.getElementById("canvas");
var cvs1 = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var ctx1 = cvs1.getContext("2d");

//Картинки
var bg = new Image();
bg.src = "img/bg.png";
var bg1 = new Image();
bg1.src = "img/bg.png";
var sky = new Image()
sky.src = "img/sky.png";
var hill_bot = new Image();
hill_bot.src = "img/hill_bot.png";
var hill_top = new Image();
hill_top.src = "img/hill_top.png";
var ball = new Image();
ball.src = "img/ball.png";
var finish = new Image();
finish.src = "img/finish.png";


var direction = 0;
var value = 0;
var bgX = 0;
var bg1X = 2550;
var yBall = cvs.height-sizeBall;
var yBall1 = cvs.height-sizeBall;
var firstX = 1305;
var gameStart = false;
var microValue = 10;

//При нажатии на кнопку
window.addEventListener('keydown', handleKeyDown, true)
window.addEventListener('keyup', handleKeyUp, true)
function handleKeyDown(event){
	if (event.keyCode === 38)
		direction = -koeff;
	else if (event.keyCode === 40)
		direction = koeff;
}
function handleKeyUp(event){
	direction = 0;
}


function init() {
	name = names[0];
	path = paths[0];
	text = texts[0].split("|");;
	sprite = sprites[0];
	subtitle = subtitles[0];
	firstX = firstXs[0];
	var z = document.getElementsByName('fb');
	for (var i = 1; i < z.length; i++) {
		if(document.Level.fb[i].checked){
			if (names.length-1 >= i) {
				name = names[i];
				path = paths[i];
				text = texts[i].split("|");;
				sprite = sprites[i];
				subtitle = subtitles[i];
				firstX = firstXs[i];
				break;
			}
			else {
				alert("Песня еще не добавлена");
				location.reload(); 
			}
		}
	}
	hills[0] = {
		x : firstX,
		type : 0,
		subt: 0,
		subNum : -1
	}
}

var hills = [];

function firstdraw() {
	ctx.drawImage(bg, bgX, 0);
	ctx.drawImage(bg1, bg1X, 0);
	ctx.drawImage(sky, 0, 500, cvs.width, 75, 0, 0, cvs.width, 75);
	ctx.fillStyle = "#fff";
	ctx.font = "35px Franklin Gothic Heavy";
	ctx.shadowColor="black";
	ctx.shadowBlur=7;
	ctx.lineWidth=20;
	ctx.fillText ("вы орете великолепно!".toUpperCase(), 600,50);
	ctx.shadowBlur=0;
	ctx.lineWidth=0;
	levelClear = false;
}

function firstdraw1() {
	ctx.drawImage(bg, bgX, 0);
	ctx.drawImage(bg1, bg1X, 0);
	ctx.drawImage(sky, 0, 500, cvs.width, 75, 0, 0, cvs.width, 75);
	ctx.fillStyle = "#fff";
	ctx.font = "35px Franklin Gothic Heavy";
	ctx.shadowColor="black";
	ctx.shadowBlur=7;
	ctx.lineWidth=20;
	ctx.fillText (name, 810-9*name.length,50);
	ctx.shadowBlur=0;
	ctx.lineWidth=0;	
	cvs.style.letterSpacing = 5 + 'px';
}

function calibrate() {
	if (!gameStart){
		ctx.clearRect(0, 0, cvs.width, cvs.height);
		firstdraw();
		ctx1.drawImage(ball, 100, yBall1, 50, 50);
		value = Math.min(value,510/microValue);
		yBall1 = cvs.height - 150 - value * microValue;
	}
	
	requestAnimationFrame(calibrate);
}

function startGame() {
	play();
	draw();
}

function play() {
	aud = new Audio();
	aud.src = path;
	aud.play(); //воспроизведение звука
}

var animation = true;
function draw() {
	if(!animation) return;
	ctx.clearRect(0, 0, cvs.width, cvs.height);
	
	if (bgX <= -2550) bgX = 2550;
	if (bg1X <= -2550) bg1X = 2550;
	ctx.drawImage(bg, bgX, 0);
	ctx.drawImage(bg1, bg1X, 0);
	bgX-=speed;
	bg1X-=speed;
	ctx.drawImage(sky, 0, 500, cvs.width, 75, 0, 0, cvs.width, 75);		
	
	for(var i = 0; i < hills.length; i++){
		
		if (hills[i].subt!=0){
			ctx.fillStyle = "#fff";
			ctx.font = "35px Franklin Gothic Heavy";
			ctx.shadowColor="black";
			ctx.shadowBlur=7;
			ctx.lineWidth=20;
			ctx.fillText (text[hills[i].subNum], hills[i].x-50, 50);
			ctx.shadowBlur=0;
			ctx.lineWidth=0;
		} 
		
		if (i == subtitle.length) {
			ctx.drawImage(finish, hills[i].x+650, 75, 100, cvs.height);
			setTimeout(exit, 6500);
		}
		
		hills[i].x -= speed;
		if(hills[i].x == 1300){
			hills.push({
				x : cvs.width,
				type : +sprite.charAt(i),
				subt: +subtitle.charAt(i),
				subNum : (+subtitle.charAt(i) == 0) ? hills[i].subNum : hills[i].subNum+1
			});
		}
		
		//маленькая
		if (hills[i].type === 1){ 
			ctx.drawImage(hill_bot, hills[i].x, cvs.height+5-300, 300, 300);
		
			// Отслеживание прикосновений (маленькая bot гора)
			if((((xBall + sizeBall >= hills[i].x+20) && (xBall + sizeBall <= hills[i].x+35) && (yBall + sizeBall >= cvs.height-10)) ||
				((xBall + sizeBall >= hills[i].x+35) && (xBall + sizeBall <= hills[i].x+50) && (yBall + sizeBall >= cvs.height-50)) ||
				((xBall + sizeBall >= hills[i].x+50) && (xBall + sizeBall <= hills[i].x+65) && (yBall + sizeBall >= cvs.height-100)) ||
				((xBall + sizeBall >= hills[i].x+65) && (xBall + sizeBall <= hills[i].x+80) && (yBall + sizeBall >= cvs.height-130)) ||
				((xBall + sizeBall >= hills[i].x+80) && (xBall + sizeBall <= hills[i].x+105) && (yBall + sizeBall >= cvs.height-200)) ||
				((xBall + sizeBall >= hills[i].x+105) && (xBall + sizeBall <= hills[i].x+170) && (yBall + sizeBall >= cvs.height - 250)) ||
				((xBall + sizeBall >= hills[i].x+170) && (xBall + sizeBall <= hills[i].x+190) && (yBall + sizeBall >= cvs.height - 265)) ||
				((xBall + sizeBall >= hills[i].x+190) && (xBall + sizeBall <= hills[i].x+200) && (yBall + sizeBall >= cvs.height - 280)) ||
				(xBall + sizeBall >= hills[i].x+200) && (xBall + sizeBall <= hills[i].x+275) && (yBall + sizeBall >= cvs.height - 290))) {
				animation = false;
				exit1(); // Перезагрузка уровня
			}
		}
				
		//большая
		if (hills[i].type === 2){
			ctx.drawImage(hill_bot, hills[i].x, cvs.height+10-525, 525, 525);
		
			// Отслеживание прикосновений (большая bot гора)
			if(((xBall + sizeBall >= hills[i].x+20) && (xBall + sizeBall <= hills[i].x+40) && (yBall + sizeBall >= cvs.height-5)) ||
				((xBall + sizeBall >= hills[i].x+40) && (xBall + sizeBall <= hills[i].x+60) && (yBall + sizeBall >= cvs.height-70)) ||
				((xBall + sizeBall >= hills[i].x+60) && (xBall + sizeBall <= hills[i].x+80) && (yBall + sizeBall >= cvs.height-120)) ||
				((xBall + sizeBall >= hills[i].x+80) && (xBall + sizeBall <= hills[i].x+100) && (yBall + sizeBall >= cvs.height-170)) ||
				((xBall + sizeBall >= hills[i].x+100) && (xBall + sizeBall <= hills[i].x+120) && (yBall + sizeBall >= cvs.height-220)) ||
				((xBall + sizeBall >= hills[i].x+120) && (xBall + sizeBall <= hills[i].x+140) && (yBall + sizeBall >= cvs.height-270)) ||
				((xBall + sizeBall >= hills[i].x+140) && (xBall + sizeBall <= hills[i].x+160) && (yBall + sizeBall >= cvs.height-320)) ||
				((xBall + sizeBall >= hills[i].x+160) && (xBall + sizeBall <= hills[i].x+180) && (yBall + sizeBall >= cvs.height-370)) ||
				((xBall + sizeBall >= hills[i].x+180) && (xBall + sizeBall <= hills[i].x+190) && (yBall + sizeBall >= cvs.height-395)) ||
				((xBall + sizeBall >= hills[i].x+190) && (xBall + sizeBall <= hills[i].x+260) && (yBall + sizeBall >= cvs.height - 435)) ||
				((xBall + sizeBall >= hills[i].x+260) && (xBall + sizeBall <= hills[i].x+300) && (yBall + sizeBall >= cvs.height - 400)) ||
				((xBall + sizeBall >= hills[i].x+300) && (xBall + sizeBall <= hills[i].x+310) && (yBall + sizeBall >= cvs.height - 445)) ||
				((xBall + sizeBall >= hills[i].x+310) && (xBall + sizeBall <= hills[i].x+325) && (yBall + sizeBall >= cvs.height - 460)) ||
				((xBall + sizeBall >= hills[i].x+325) && (xBall + sizeBall <= hills[i].x+340) && (yBall + sizeBall >= cvs.height - 475)) ||
				((xBall + sizeBall >= hills[i].x+340) && (xBall + sizeBall <= hills[i].x+355) && (yBall + sizeBall >= cvs.height - 485)) ||
				((xBall + sizeBall >= hills[i].x+355) && (xBall + sizeBall <= hills[i].x+430) && (yBall + sizeBall >= cvs.height - 500))) {
				animation = false;
				exit1(); // Перезагрузка уровня
			}
		}
		
		//верхняя
		if (hills[i].type === 3){
			ctx.drawImage(hill_top, hills[i].x, 75, 220, 80);
		
			// Отслеживание прикосновений (верхняя top гора)
			if(((xBall + sizeBall >= hills[i].x+20) && (xBall + sizeBall <= hills[i].x+35) && (yBall <= 75 + 10)) ||
				((xBall + sizeBall >= hills[i].x+35) && (xBall + sizeBall <= hills[i].x+50) && (yBall <= 75 + 30)) ||
				((xBall + sizeBall >= hills[i].x+50) && (xBall + sizeBall <= hills[i].x+65) && (yBall <= 75 + 40)) ||
				((xBall + sizeBall >= hills[i].x+65) && (xBall + sizeBall <= hills[i].x+80) && (yBall <= 75 + 50)) ||
				((xBall + sizeBall >= hills[i].x+80) && (xBall + sizeBall <= hills[i].x+95) && (yBall <= 75 + 60)) ||
				((xBall + sizeBall >= hills[i].x+95) && (xBall + sizeBall <= hills[i].x+105) && (yBall <= 75 + 70)) ||
				((xBall + sizeBall >= hills[i].x+105) && (xBall + sizeBall <= hills[i].x+160) && (yBall <= 75 + 78)) ||
				((xBall + sizeBall >= hills[i].x+160) && (xBall + sizeBall <= hills[i].x+200) && (yBall <= 75 + 50)) ||
				((xBall + sizeBall >= hills[i].x+200) && (xBall + sizeBall <= hills[i].x+220) && (yBall <= 75 + 30)) ||
				((xBall + sizeBall >= hills[i].x+220) && (xBall + sizeBall <= hills[i].x+240) && (yBall <= 75 + 20))) {
				animation = false;
				exit1(); // Перезагрузка уровня
			}
		}
	}

	ctx.drawImage(ball, xBall, yBall, sizeBall, sizeBall);
	
	if (control == 0){
		if ((yBall+direction < cvs.height-74)&(yBall+direction > 74))
			yBall += direction;
	}
	else {
		value = Math.min(value,616/microValue);
		yBall = cvs.height - 74 - value * microValue;
	}
	
	requestAnimationFrame(draw);
}


ball.onload = bg.onload = sky.onload = firstdraw;

navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
navigator.getUserMedia({ 
	audio: true, video: false },
	function (stream) {
		var AudioContext = window.AudioContext || window.webkitAudioContext,
			ctx = new AudioContext(),
			source = ctx.createMediaStreamSource(stream),
			analyser = ctx.createAnalyser(),
			processor = ctx.createScriptProcessor(2048, 1, 1),
			data;
		  
		  source.connect(analyser);
		  source.connect(processor);
		  processor.connect(ctx.destination);
		  
		  var data = new Uint8Array(analyser.frequencyBinCount);
		  processor.onaudioprocess = function (){
				analyser.getByteFrequencyData(data);
				var len = data.length;
				var sum = 0;
				for (var i = 0; i < len; i++) {
					sum += data[i];
				}
				value = Math.round(sum/len);
		  }
				
	 },
	 function (error) {
			 //error processing
	 }
);

function exit() {
	location.reload();
}

function exit1() {
	animation = false;
	aud.pause();
	aud.currentTime = 0;
	setTimeout(restart, 100);
}

function restart() {
	animation = true;
	direction = 0;
	value = 0;
	bgX = 0;
	bg1X = 2550;
	yBall = cvs.height-sizeBall;
	hills = [];
	hills[0] = {
		x : firstX,
		type : 0,
		subt: 0,
		subNum : -1
	}
	startGame();
}