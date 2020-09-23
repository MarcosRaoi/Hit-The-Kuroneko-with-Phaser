(function()
 {
 
    var Hamtaro = function (game, x, y, aquiVcFazOqQuiser) {
 
        Phaser.Sprite.call(this, game, x, y, 'hamtoro');
 
        this.anchor.setTo(0.5, 0.5);
 
        this.inputEnabled = true;
        this.events.onInputDown.add(this.hitHamtoro, this);
 
        this.aquiVcFazOqQuiser = aquiVcFazOqQuiser;
 
        game.add.existing(this);
 
    };
 
    Hamtaro.prototype = Object.create(Phaser.Sprite.prototype);
    Hamtaro.prototype.constructor = Hamtaro;
 
    Hamtaro.prototype.update = function() {
 
        //console.log("Isso executa a cada update, como se fosse um component da unity");
 
    };
 
    Hamtaro.prototype.hitHamtoro = function (sprite, pointer) {
        console.log("sprite", sprite);
 
        console.log(this.aquiVcFazOqQuiser);
    };
    
}());


(function()
 {
    var gameWidth = 800;
    var gameHeight = 600;
    //console.log(Phaser);
    var game = new Phaser.Game(gameWidth,gameHeight,Phaser.AUTO,"jogo",
    {
        preload:preload,
        create:create,
        update:update        
    });
    
    var perso = [{x: 51, y: 109},{x: 80, y: 353},{x: 285, y: 2},{x:250,y:221},
                 {x:447,y:184},{x:397,y:420},{x:639,y:60},{x:651,y:382}];
    
    //var timer;
    var music, oops, yeah;
    
    /*var persoX = [51,80,285,250,447,397,639,651]; // Vetor com as 8 posições
    var persoY = [109,353,2,221,184,420,60,382]; // X e Y dos possíveis locais de Hamtaro e cia.*/
    
    // Essas persoX e persoY são vetores pra usarem juntos (persoX,personY), pra saber o local exato onde o Hamtoro ou o Kuroneko devem ser colocados. Isso aí foi calculado tem muito tempo, no meu primeiro semestre acho, no Photoshop e talz.
    
    var hamtoros,kuronekos; 
    // referentes aos dois possíveis personagens:
    // - Hamtoro -> Se acertar, perde 1 ponto;
    // - Kuroneko -> Se acertar, ganha 1 ponto; 
    // - nome do jogo: Hit the Kuroneko, porque Don't Hit the Hamtoro pode dar problema rs.
    //var keys; // vai armazenar as entradas do jogador. Vish, mas meu jogo é no mouse rs.
    //var platforms, player, stars;
    
    var hamtoro;
    
    var txtScore,score;
    
    function preload()
    {
        // para pre carregar as imagens ^^',
        // parâmetros: primeiro - nome referência, segundo - diretório.extensão
        game.load.image("background","images/bg_full.png");
        game.load.image("hamtoro","images/hamtaro_pixelart.png");
        game.load.image("kuroneko","images/kuroneko_pixelart.png");
        
        // bora coisar os áudios agora.
        game.load.audio("oops", "sounds/oops.mp3");
        game.load.audio("yeah", "sounds/yeah.mp3");
        game.load.audio("abertura", "sounds/abertura.wav");
        
    }
    
    function create()
    {
        //timer = game.time.create(false);
        //timer.loop(2000, createPerson,this); Não foi, vamo esse:
        game.time.events.loop(Phaser.Timer.SECOND * 3, createPerson, this);
        
        // vamo de musca
        music = game.add.audio("abertura",1,true); music.play("",1,true);
        oops = game.add.audio("oops"); yeah = game.add.audio("yeah");
        
        score = 0;
        // keys = game.input.keyboard.createCursorKeys(); 
        // aqui ele pega do teclado, mas meu jogo é no mouse, só pra estudo mermo.
        
        // não vou usar, mas vamo deixar aqui:        
        // lembrando que esse projeto é de estudo. (vou depois tirar todos os coments)
        
        // game.physics.startSystem(Phaser.Physics.ARCADE); 
        // game.physics.arcade.enable(player)
        // player.body.gravity.y = 300; // caraio, 300 m/s² de gravidade rsrs 
        
        // player.body.collideWorldBounds = true;        
        
        game.add.sprite(0,0,"background");
        hamtoros = game.add.group();
        kuronekos = game.add.group();
        
        /*
            hamtoro = hamtoros.create(perso[0].x,perso[0].y,"hamtoro");
            hamtoro = hamtoros.create(perso[1].x,perso[1].y,"hamtoro");
            hamtoro = hamtoros.create(perso[2].x,perso[2].y,"hamtoro");
            hamtoro = hamtoros.create(perso[3].x,perso[3].y,"hamtoro");
            hamtoro = hamtoros.create(perso[4].x,perso[4].y,"hamtoro");
            hamtoro = hamtoros.create(perso[5].x,perso[5].y,"hamtoro");
            hamtoro = hamtoros.create(perso[6].x,perso[6].y,"hamtoro");
            hamtoro = hamtoros.create(perso[7].x,perso[7].y,"hamtoro");
        */
        /*
        hamtoro = game.add.sprite(perso[0].x,perso[0].y,'hamtoro');
        hamtoro.inputEnabled = true;
        hamtoro.events.onInputDown.add(hitHamtoro);*/ // Tá vou colocar isso no Looping
        
        //hamtoro.events.onInputDown.add(hitHamtoro);  não é isso.    
        // Oh os Kagebunshin do Hamtoro rsrs... tá, beleza... to apanhando, mas vamo.
        
        /*
        game.physics.startSystem(Phaser.Physics.ARCADE); 
        game.physics.arcade.enable(hamtoro)
        hamtoro.body.gravity.y = 300; hamtoro.body.collideWorldBounds = true;
        hamtoro.body.bounce.y = 0;     */  
        
        // Tá bem, obviamente ele faz só o último, por motivos óbvios da linha 55.
        
        // Bom, ai ele fala sobre adicionar física na plataforma também, show...
        // platforms = game.add.group(); e mais importante: platforms.enableBody = true;
        
        // Daora, a plataforma empurrou o chão kk, quer dizer, o player empurrou...
        // var platform = platforms.create(0,game.world.height - 64,"platform");
        //     platform.scale.setTo(2,2);
        //     platform.body.immovable = true;
        
        // Tá, ele adicionou pras outras enfim, ai ele vai mostrar a animação.
        
        //.... game.load.spritesheet('dude','img/dude.png',32,48);....        
        //player.animations.add('left',[0,1,2,3],10, true);
        //Nome da animação / index dos sprites / velocidade da animação / looping?
        
        // ai no update ele: player.animations.play("left"); Caralho, Phaser é quente.
        
        // Vish, não entendi porque a ordem do text influencia... ??
        // Tá, imaginei que era isso, mas não tinha me atentado: 
        // game.add.sprite(0,0,"background"); essa linha vinha depois, não tinha achado.
        
        txtScore = game.add.text(16,16,"Score: 0",{fontSize:"32px",fill:"#FFF"});
        
    }
    
    function update() 
    {
        //console.log(game.rnd.integerInRange(1,2));
        txtScore.text = "Score: " + score;
        
        // game.physics.arcade.collide(player,platforms);
        // game.physics.arcade.collide(stars,platforms); 
        // e o famoso trigger, só que overlap:
        // game.physics.arcade.overlap(player,stars,collectStar);
        /*
        hamtoro.body.velocity.x = 0;
        
        if(keys.left.isDown)
        {
            hamtoro.body.velocity.x = -150;
        } 
        
        else    
        
        if(keys.right.isDown)
        {
            hamtoro.body.velocity.x = 150;
        }
        
        // else { player.animations.stop(); player.frame = 4; } Quente demais o Phaser.
        
        if(keys.up.isDown) // && player.body.touching.down
        {
            hamtoro.body.velocity.y = -360;
        }*/
        
    }
    /*
    function collectStar(player,star)
    {
        star.kill(); //gente que horror.
        score+=10;
        txtScore.text = "SCORE: " + score;
    }
    */
    
    function hitHamtoro(hamtoro)
    {
        hamtoro.destroy();
        score--;
        oops.play();
    }
    
    function hitKuroneko(kuroneko)
    {
        kuroneko.destroy(); // tadins vei
        score++; // parei de usar o kill, ivo comentou que "só adormece a sprite" sla
        yeah.play();
    }
    
    function destroyHamtoro(hamtoro)
    {
        hamtoro.destroy();        
    }
    
    function destroyKuroneko(kuroneko)
    {
        kuroneko.destroy();        
    }
    
    function createPerson()
    {
        var random07 = game.rnd.integerInRange(0,7);
        console.log("criando personagens");
        if (game.rnd.integerInRange(1,10) < 4) // 30% de chance de invocar hamtaro.
        {
            hamtoro = game.add.sprite(perso[random07].x,perso[random07].y,"hamtoro");
            hamtoro.inputEnabled = true;
            hamtoro.events.onInputDown.add(hitHamtoro);
            
            setTimeout(function(){hamtoro.destroy();},1500);
        }
        
        else
        {
            kuroneko = game.add.sprite(perso[random07].x-50,perso[random07].y-1,"kuroneko");
            kuroneko.inputEnabled = true;
            kuroneko.events.onInputDown.add(hitKuroneko);
            
            setTimeout(function(){kuroneko.destroy();},1500);
                
        }
        
        // tá bem feio esse código, podia ter uma variável perso pra receber seja hamtoro, seja kuroneko, enfim... Mas ainda tou aprendendo o Phaser.
        
    }
    
}());