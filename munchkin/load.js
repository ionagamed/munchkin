function load() {
	game.load.image('down_lower', 'img/back_lower.jpg');
    game.load.image('up_lower', 'img/up_lower.jpg');
    for(var i = 0; i < ccount; i++)
        game.load.image('doors'+i, 'packs/pack1/img/doors-'+i+'.png');
    game.load.image('monster', 'img/monster.png');
    game.load.image('warrior', 'img/warrior.png');
    game.load.image('grass', 'img/grass.png');
    game.load.image('cobble', 'img/cobble.png');
    game.load.image('paper', 'img/paper.png')
    openChat = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    openChat.onDown.add(ChatOpen, this);
    closeChat = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    closeChat.onDown.add(ChatClose, this);
    keyboard = Phaser.Keyboard(game);
    //keyboard.processKeyPress();
    game.load.image('knife', 'img/knife.png');
    game.load.image('nosok', 'img/nosok.png');
}

function create_lower() {
	down_lower = game.add.image(0, 0, 'down_lower');
	down_lower.width = game.width;
	upper_lower = game.add.image(0, 0, 'up_lower');
	scale = 0.75;
	upper_lower.height = game.height * scale;
	upper_lower.width = game.width * scale;
	scale = 0.875;
}

function create_info() {
	level = game.add.text(game.width * scale, 30, "", {font: "Pixeled", fontSize: game.height*0.04+"px", fill: "#6B534B"});
    level.anchor.setTo(0.5, 0.5);
    level.level = 0;
    level.text = "Your Level = " + level.level;
    grass = game.add.image(game.width * scale, 400,'grass');
    grass.width = game.width * 0.2;
    grass.height = grass.width * 3 / 5;
    grass.anchor.setTo(0.5, 0.5);
    grass.y = 60 + grass.height/2;
    knight = game.add.image(game.width * scale, 400, 'warrior');
    knight.anchor.setTo(0.5, 0.5);
    knight.height = grass.height - 10;
    knight.width = knight.height;
    knight.y = 65 + knight.height/2;
    knight.x = knight.x - knight.width/5;
    power = game.add.text(game.width * scale, 400, '', {font: "Pixeled", fontSize: game.height*0.11+"px", fill: "#FF6836"});   
    power.power = 99;
    power.text =  power.power;
    power.y = grass.y;
    power.anchor.setTo(0.5, 0.5);
    power.x = power.x + knight.width/5 + 30;
    cobble = game.add.image(game.width * scale, 400, 'cobble');
    cobble.anchor.setTo(0.5, 0.5);
    cobble.width = grass.width;
    cobble.height = grass.height;
    cobble.y = grass.y + grass.height * 1.1;
    monster = game.add.image(game.width*scale, 400, 'monster');
    monster.height = cobble.height - 30;
    monster.width = monster.height*1.1;
    monster.y = cobble.y;
    monster.anchor.setTo(0.5, 0.5);
    monster.x = monster.x - monster.width / 2.7;
    antipower = game.add.text(game.width * scale, 400, '', {font: "Pixeled", fontSize: game.height*0.11+"px", fill: "#FFBAA3"}); 
    antipower.antipower =  99;
    antipower.anchor.setTo(0.5, 0.5);
    antipower.text = antipower.antipower;
    antipower.y = monster.y;
    antipower.x = power.x; 
}

function create_cards() {
	for (var i = 0; i < ccount; i++) {
        cards[i] = game.add.image(0, 0, 'doors'+i);
        cards[i].anchor.setTo(0.5, 0.5);
        cards[i].height = game.height * 0.25;
        cards[i].width =cards[i].height /1028*661;
        cards[i].y = game.height - cards[i].height/2;
        cards[i].iter = i;
        cards[i].inputEnabled = true;
        cards[i].events.onInputOver.add(over);
        cards[i].events.onInputDown.add(down);
        cards[i].events.onInputOut.add(out);
        console.log(ccount * cards[i].width);
        if(ccount * cards[i].width < game.width)
            cards[i].x = cards[i].width/2 + i * cards[i].width;
        if(ccount * cards[i].width > game.width)
            cards[i].x = cards[i].width/2 +  i * cards[i].width * game.width / (ccount*cards[i].width);
    }
}

function create_chat() {
	paper = game.add.image(100, 100, 'paper');
	paper.anchor.setTo(1, 0.5);
	paper.y = game.height / 2;
	paper.x = 0;
}

function create_buttons() {
    buttonAttack = game.add.button(0, 0, 'knife', actionAttack);
    buttonAttack.visible = false;
    buttonAttack.anchor.setTo(0.5, 0.5);

    buttonSmivka = game.add.button(0, 0, 'nosok', actionSmivka);
    buttonSmivka.visible = false;
    buttonSmivka.anchor.setTo(0.5, 0.5);

}