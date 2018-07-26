//Канвас и контекст
var cvs = document.getElementById("canvas");
var cvs1 = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var ctx1 = cvs1.getContext("2d");

//Картинки
var bg = new Image();
bg.src = "img/bg.png";
var sky = new Image()
sky.src = "img/sky.png";

function firstdraw() {
	ctx.drawImage(bg, 0, 0);
	ctx.drawImage(sky, 0, 500, cvs.width, 75, 0, 0, cvs.width, 75);
	ctx.fillStyle = "#fff";
	ctx.font = "35px Franklin Gothic Heavy";
	ctx.shadowColor="black";
	ctx.shadowBlur=7;
	ctx.lineWidth=20;
	ctx.fillText ("РЕДАКТОР УРОВНЕЙ".toUpperCase(), 645,50);
	ctx.shadowBlur=0;
	ctx.lineWidth=0;
	levelClear = false;
}


bg.onload = sky.onload = firstdraw;