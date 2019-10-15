var chooseMenu = document.getElementById('danik');	

chooseMenu = addEventListener('click', () => {
	alert('click');
	var canvas = document.createElement('canvas');
	var all = document.getElementById('all');
	all.classList.toggle('hidden');

	canvas.id = "canvas";
	canvas.className = "canvas";	
	canvas.width = 1300;
	canvas.height = 550;
	var body = document.getElementsByTagName("body")[0];
	body.appendChild(canvas);

	var ctx = canvas.getContext("2d");

	var jenua = new Image();
	var	podalov = new Image();
	var bg = new Image();


	jenua.src = "img/jenua.png";
	podalov.src = "img/podalov.png";
	bg.src = "img/bg1.jpg";

	// Создание Подаловых

	var arrayOfPodalov = [];
	arrayOfPodalov[0] = {
		x: 100,
		y: -50
	}

	// Позиция игрока

	var xPosJenua = 625;
	var yPosJenua = 500;

	// Движения

	document.onkeydown = function(event) {
		switch (event.keyCode) {
			case 39:
				xPosJenua += 20;
				break;
			case 37:
				xPosJenua -= 20;
				break;
			default:
				// statements_def
				break;
		}
	}

	//  Игровые настройки

	var gravity = 2.5;
	var score = 0;
	var spawnPoint = 50;
		
	// Радномные значения в диапазоне [min, max]

	function getRandomInt(min, max){
		  return Math.floor(Math.random() * (max - min + 1)) + min;
	}


	function draw(){

		ctx.drawImage(bg, 0, 0, 1300, 550 );
		ctx.drawImage(jenua, xPosJenua, yPosJenua, 50, 50);


		for(var i = 0; i < arrayOfPodalov.length; i++){
		
			ctx.drawImage(podalov, arrayOfPodalov[i].x, arrayOfPodalov[i].y, 50, 50);

			arrayOfPodalov[i].y+= gravity;

			// Добавление новых элементов в массив arrayOfPodalov когда 
			// координата y становится равной 300

			if(arrayOfPodalov[i].y == spawnPoint){
				arrayOfPodalov.push({
					x: getRandomInt(50, 1250),
					y: -100
				});
			}



			// Проверка на столкновение

			for (var x = 0; x < 50; x++){
				for(var y = 0; y < 50; y++){
					if (xPosJenua + x == arrayOfPodalov[i].x + y && yPosJenua - 50 == arrayOfPodalov[i].y) {

						location.reload();

					}
				}
			}


			if(arrayOfPodalov[i].y == 510){
				score++;
			}

			if(arrayOfPodalov[i].y == 700){
				arrayOfPodalov.splice(i, 1);
			}

			

			// Scoreboard

			ctx.fillStyle = "#fff";
			ctx.font = "20px Cinnamon";
			ctx.fillText("Счет: " + score, 10, 30);

			ctx.fillStyle = "#fff";
			ctx.font = "20px Cinnamon";
			ctx.fillText(arrayOfPodalov.length, 50 ,50);
		}

		if(score == 10){
			gravity = 5;
		}

		if(score == 20){
			spawnPoint = 0;
		}

		if(score == 40){
			spawnPoint = -20;
		}


		if(score == 50){
			bg.src = "img/bg2.jpg";
			podalov.src = "img/grishenko.png";

		}

		if(score == 100){
			spawnPoint = -50;
		}

		if(score == 100){
			gravity = 10;
		}

		requestAnimationFrame(draw);
	}

	podalov.onload = draw;
	
})



