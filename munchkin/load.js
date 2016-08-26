import * as global from './munchkin.js'
import { actionAttack, actionSmivka } from './action.js'
import { over, out, down, server_connected, startGame } from './events.js'

export function load() {
	global.game.load.image('down_lower', 'img/back_lower.jpg');
    global.game.load.image('up_lower', 'img/up_lower.jpg');
    for(var i = 0; i < global.ccount; i++)
        global.game.load.image('doors'+i, 'packs/pack1/img/doors-'+i+'.png');
    global.game.load.image('monster', 'img/monster.png');
    global.game.load.image('warrior', 'img/warrior.png');
    global.game.load.image('grass', 'img/grass.png');
    global.game.load.image('cobble', 'img/cobble.png');
    global.game.load.image('paper', 'img/paper.png')
    global.keyboard = Phaser.Keyboard(global.game);
    global.game.load.image('knife', 'img/knife.png');
    global.game.load.image('nosok', 'img/nosok.png');
    global.game.load.image('startgame', 'img/startgame.png');
    global.game.load.image('mainshadow', 'img/mainshadow.png');
    global.game.load.image('buttonWield', 'img/buttonWield.png');
    global.game.load.image('buttonUse', 'img/buttonUse.png');
    global.game.load.image('buttonCast', 'img/buttonCast.png');
}

export function create_lower() {
	global.down_lower = global.game.add.image(0, 0, 'down_lower');
	global.down_lower.width = global.game.width;
	global.upper_lower = global.game.add.image(0, 0, 'up_lower');
	global.scale = 0.75;
	global.upper_lower.height = global.game.height * global.scale;
	global.upper_lower.width = global.game.width * global.scale;
	global.scale = 0.875;
}

export function create_info() {
	global.level = global.game.add.text(global.game.width * global.scale, 30, "", {font: "Pixeled", fontSize: global.game.height*0.04+"px", fill: "#6B534B"});
    global.level.anchor.setTo(0.5, 0.5);
    global.level.level = global.player.level;
    global.level.text = "Your Level = " + global.level.level;
    global.grass = global.game.add.image(global.game.width * global.scale, 400,'grass');
    global.grass.width = global.game.width * 0.2;
    global.grass.height = global.grass.width * 3 / 5;
    global.grass.anchor.setTo(0.5, 0.5);
    global.grass.y = 60 + global.grass.height/2;
    global.knight = global.game.add.image(global.game.width * global.scale, 400, 'warrior');
    global.knight.anchor.setTo(0.5, 0.5);
    global.knight.height = global.grass.height - 10;
    global.knight.width = global.knight.height;
    global.knight.y = 65 + global.knight.height/2;
    global.knight.x = global.knight.x - global.knight.width/5;
    global.power = global.game.add.text(global.game.width * global.scale, 400, '', {font: "Pixeled", fontSize: global.game.height*0.11+"px", fill: "#FF6836"});   
    global.power.power = global.player.getAttack();;
    global.power.text =  global.power.power;
    global.power.y = global.grass.y;
    global.power.anchor.setTo(0.5, 0.5);
    global.power.x = global.power.x + global.knight.width/5 + 30;
    global.cobble = global.game.add.image(global.game.width * global.scale, 400, 'cobble');
    global.cobble.anchor.setTo(0.5, 0.5);
    global.cobble.width = global.grass.width;
    global.cobble.height = global.grass.height;
    global.cobble.y = global.grass.y + global.grass.height * 1.1;
    global.monster = global.game.add.image(global.game.width*global.scale, 400, 'monster');
    global.monster.height = global.cobble.height - 30;
    global.monster.width = global.monster.height*1.1;
    global.monster.y = global.cobble.y;
    global.monster.anchor.setTo(0.5, 0.5);
    global.monster.x = global.monster.x - global.monster.width / 2.7;
    global.antipower = global.game.add.text(global.game.width * global.scale, 400, '', {font: "Pixeled", fontSize: global.game.height*0.11+"px", fill: "#FFBAA3"}); 
    global.antipower.antipower =  99;
    global.antipower.anchor.setTo(0.5, 0.5);
    global.antipower.text = global.antipower.antipower;
    global.antipower.y = global.monster.y;
    global.antipower.x = global.power.x; 
}

export function create_cards() {
    if(global.create_cards_on == true)
	for (var i = 0; i < global.player.hand.length; i++) {
        if(global.cards[i] != undefined) global.cards[i].destroy();
        global.cards[i] = global.game.add.image(0, 0, 'pack1_'+ global.player.hand[i]);
        global.cards[i].anchor.setTo(0.5, 0);
        global.cards[i].height = global.game.height - global.upper_lower.height;
        global.cards[i].width = global.cards[i].height / 1028 * 661;
        global.cards[i].y = global.upper_lower.height;
        global.cards[i].x = global.cards[i].width / 2 + global.cards[i].width * i; 
        global.cards[i].iter = i;
        global.cards[i].inputEnabled = true;
        global.cards[i].events.onInputOver.add(over);
        global.cards[i].events.onInputDown.add(down);
        global.cards[i].events.onInputOut.add(out);
    }
}

export function create_buttons() {
    global.buttonAttack = global.game.add.button(0, 0, 'knife', actionAttack);
    global.buttonAttack.visible = false;
    global.buttonAttack.anchor.setTo(0.5, 0.5);

    global.buttonSmivka = global.game.add.button(0, 0, 'nosok', actionSmivka);
    global.buttonSmivka.visible = false;
    global.buttonSmivka.anchor.setTo(0.5, 0.5);

    global.mainshadow = global.game.add.image(global.game.world.centerX, global.game.world.centerY,'mainshadow');
    global.mainshadow.anchor.setTo(0.5, 0.5);
    global.mainshadow.bringToTop();
    global.buttonStartGame = global.game.add.button(global.game.world.centerX, global.game.world.centerY, 'startgame', startGame);
    global.buttonStartGame.anchor.setTo(0.5, 0.5);
    global.buttonStartGame.bringToTop();
}