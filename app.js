"use strict";

for (var i = 1; i < 5; i++) {
	for (var j = 1; j < 11; j++) {
		new Audio("sounds/" + i + "-" + j + ".wav.webm").preload = "auto";
	}
}backlog = {
	1: [0, 0, 0, 0],
	2: [0, 0, 0, 0],
	3: [0, 0, 0, 0],
	4: [0, 0, 0, 0]
};

var rand = function rand(n) {
	var intro = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	var q_size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;

	if (intro && n == 1) return "sounds/1-1.wav.webm";

	var gen_number = function gen_number() {
		return Math.floor(Math.random() * 10) + 1;
	};

	var number = gen_number();
	while (backlog[n].indexOf(number) != -1 || n == number == 1) {
		number = gen_number();
	}
	backlog[n].shift();
	backlog[n].push(number);
	return "sounds/" + n + "-" + number + ".wav.webm";
};

var gen_sentence = function gen_sentence(intro) {
	return [rand(1, intro), rand(2), rand(3), rand(4)];
};

var play_sound = function play_sound(sound_file) {
	var sound = new Audio(sound_file);
	sound.play();
	return new Promise(function (resolve, reject) {
		sound.onended = function () {
			return resolve();
		};
	});
};

var play_sentence = function play_sentence() {
	var intro = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	var sentence = gen_sentence(intro);
	console.log(sentence);
	var play = function play() {
		var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

		if (i > 3) play_sentence(false);
		play_sound(sentence[i]).then(function () {
			return play(i + 1);
		});
	};
	play();
};

play_sentence(true);

