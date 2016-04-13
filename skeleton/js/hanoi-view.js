var Game = require('../../hanoi-core-solution/game.js');
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
        $('h1').append('<marquee>You Won</marquee>');
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
