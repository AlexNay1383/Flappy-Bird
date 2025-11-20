'use strict'

const Game = new Phaser.Game(600, 850, Phaser.AUTO, 'game-canvas', { preload, create, update })

function preload() {
    Game.load.spritesheet("player", "Graphics/sprite/flappy_bird.png", 255, 180);
    Game.load.image("ground", "Graphics/images/ground.png");
    Game.load.image("background", "Graphics/images/background.png");
    Game.load.image("pipeup", "Graphics/images/pipe_up.png");
    Game.load.image("pipedown", "Graphics/images/pipe_down.png");
}

let player;
let pipe = [], temp1, temp2, temp3, temp4;
let ground, groundc;
let background;

let Space;
let score = 0;
let gameO = false;


function create() {
    background = Game.add.image(0, 0, "background");

    player = Game.add.sprite(50, 300, "player");
    player.scale.setTo(0.31);
    player.animations.add("stop", [1]);
    player.animations.add("move", [0, 1, 2]);
    Game.physics.enable(player);
    player.body.gravity.y = 2500;
    player.body.collideWorldBounds = true;

    temp1 = Game.add.sprite(-80, 420, "pipeup");
    Game.physics.enable(temp1);
    temp1.anchor.setTo(1, 0);
    temp1.immovable = true;
    temp2 = Game.add.sprite(570, 420, "pipeup");
    Game.physics.enable(temp2);
    temp2.anchor.setTo(1, 0);
    temp2.immovable = true;
    temp3 = Game.add.sprite(-80, 220, "pipedown");
    Game.physics.enable(temp3);
    temp3.anchor.setTo(1, 1);
    temp3.immovable = true;
    temp4 = Game.add.sprite(570, 220, "pipedown");
    Game.physics.enable(temp4);
    temp4.anchor.setTo(1, 1);
    temp4.immovable = true;

    pipe.push(temp1);
    pipe.push(temp2);
    pipe.push(temp3);
    pipe.push(temp4);

    ground = Game.add.sprite(0, 750, "ground");
    ground.scale.setTo(2);
    Game.physics.enable(ground);
    ground.body.immovable = true;

    Space = Game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

let space_buf = false;

function update() {
    if(!gameO)
    {
        player.animations.play("move", 10, true, false);
        jump();
        move();
        gameover();

        if(pipe[0].position.x <= -600)
        {
            pipe[2].position.y = Math.floor(Math.random() * 400) + 50;
            pipe[0].position.y = pipe[2].position.y + 200;

            pipe[0].position.x = 700;
            pipe[2].position.x = 700;

            score++;
            console.log(score);
        }

        if(pipe[1].position.x <= -600)
        {
            pipe[3].position.y = Math.floor(Math.random() * 400) + 50;
            pipe[1].position.y = pipe[3].position.y + 200;

            pipe[1].position.x = 700;
            pipe[3].position.x = 700;

            score++;
            console.log(score);
        }

        Game.physics.arcade.collide(player, ground);
        Game.physics.arcade.collide(player, pipe);
    }
    else
    {
        for(let i=0;i<4;i++)
        {
            pipe[i].position.x = -400;
        }

    }

    if(ground.position.x <= -575)
    {
        ground.position.x = 0;
    }
    if(background.position.x <= -600)
    {
        background.position.x = 0;
    }
}

function jump()
{
    if(Space.isDown && space_buf == false)
    {
        player.body.velocity.y = -700;
        space_buf = true;
    }
    if(Space.isUp)
    {
        space_buf = false;
    }
}

function move()
{
    ground.position.x-=3;
    background.position.x--;
    for(let i=0;i<4;i++)
    {
        pipe[i].position.x -=3;
    }
}

function gameover()
{
    if(Game.physics.arcade.collide(player, ground))
    {
        console.log("Game Over");
        gameO = true;
    }
    for(let i=0;i<4;i++)
    {
        if(Game.physics.arcade.collide(player, pipe))
        {
            console.log("Game Over");
            gameO = true;
            break;
        }
    }
}