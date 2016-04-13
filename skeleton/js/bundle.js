/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var HanoiView = __webpack_require__(1);
	var HanoiGame = __webpack_require__ (2);
	
	$(function () {
	  var rootEl = $('.hanoi');
	  var game = new HanoiGame();
	  new HanoiView(game,rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(2);
	function HanoiView(game, $el) {
	  this.game = game;
	  this.$el = $el;
	  this.setupTowers();
	  this.render();
	  this.clickTower();
	}
	
	// HanoiView.prototype.playgame = function () {
	//   if (this.game.isWon()) {
	//    console.log("winner!");
	//   } else {
	//     this.game.move(startTower, endTower);
	//     this.render();
	//     this.playgame();
	//   }
	// };
	HanoiView.prototype.setupTowers = function () {
	  var $rods = $("<ul></ul> <ul></ul> <ul></ul>");
	  $rods.each(function (idx, el) {
	    if (idx === 0) {
	      $(el).append($("<li></li>").addClass("disk-1"));
	      $(el).append($("<li></li>").addClass("disk-2"));
	      $(el).append($("<li></li>").addClass("disk-3"));
	    } else {
	      $(el).append($("<li></li>"));
	      $(el).append($("<li></li>"));
	      $(el).append($("<li></li>"));
	    }
	  });
	  $('.hanoi').append($rods);
	};
	
	HanoiView.prototype.render = function () {
	  var towers = this.game.towers;
	  for (var i = 0; i < 3; i++) {
	    for (var j = 0; j < 3; j++) {
	      var child = ((3 * i) - j + 2);
	      $($('li')[child]).removeClass("disk-1 disk-2 disk-3");
	      if (towers[i][j]){
	        $($('li')[child]).addClass("disk-"+towers[i][j]);
	      }
	    }
	  }
	};
	
	HanoiView.prototype.clickTower = function () {
	  var tower = this;
	  $("ul").click(function() {
	    if (tower.startTower !== undefined) {
	
	      tower.endTower = $(this).index();
	      tower.game.move(tower.startTower, tower.endTower);
	      tower.render();
	      if (tower.game.isWon()) {
	        $('h1').append('.marquee');
	        $('ul').remove();
	        new HanoiView(new Game(),$('.hanoi'));
	      }
	      tower.startTower = undefined;
	    } else {
	      tower.startTower = $(this).index();
	      console.log(tower.startTower);
	    }
	  });
	};
	  // var Hanoi = this;
	  // $("ul").click(function() {
	  //   Hanoi.game.move(startTower, $(this).index());
	  //   Hanoi.render();
	  // });
	
	
	    // call play move
	    // play move checks to see whether we've clicked one before...
	
	module.exports = HanoiView;


/***/ },
/* 2 */
/***/ function(module, exports) {

	function Game () {
	  this.towers = [[3, 2, 1], [], []];
	};
	
	Game.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
	  var startTower = this.towers[startTowerIdx];
	  var endTower = this.towers[endTowerIdx];
	
	  if (startTower.length === 0) {
	    return false;
	  } else if (endTower.length == 0) {
	    return true;
	  } else {
	    var topStartDisc = startTower[startTower.length - 1];
	    var topEndDisc = endTower[endTower.length - 1];
	    return topStartDisc < topEndDisc;
	  }
	};
	
	Game.prototype.isWon = function () {
	  // move all the discs to the last or second tower
	  return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	};
	
	Game.prototype.move = function (startTowerIdx, endTowerIdx) {
	  if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	    this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	    return true;
	  } else {
	    return false;
	  }
	};
	
	Game.prototype.print = function () {
	  console.log(JSON.stringify(this.towers));
	};
	
	Game.prototype.promptMove = function (reader, callback) {
	  this.print();
	  reader.question("Enter a starting tower: ", function (start) {
	    var startTowerIdx = parseInt(start);
	    reader.question("Enter an ending tower: ", function (end) {
	      var endTowerIdx = parseInt(end);
	      callback(startTowerIdx, endTowerIdx)
	    });
	  });
	};
	
	Game.prototype.run = function (reader, gameCompletionCallback) {
	  this.promptMove(reader, (function (startTowerIdx, endTowerIdx) {
	    if (!this.move(startTowerIdx, endTowerIdx)) {
	      console.log("Invalid move!");
	    }
	
	    if (!this.isWon()) {
	      // Continue to play!
	      this.run(reader, gameCompletionCallback);
	    } else {
	      this.print();
	      console.log("You win!");
	      gameCompletionCallback();
	    }
	  }).bind(this));
	};
	
	module.exports = Game;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map