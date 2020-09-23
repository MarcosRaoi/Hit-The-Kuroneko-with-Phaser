(function()
 {
    //console.log(Phaser);
    var game = new Phaser.Game(800,600,Phaser.AUTO,"jogo",
    {
        preload:preload,
        create:create,
        update:update        
    });
    
    var persoX = [51,80,285,250,447,397,639,651]; // Vetor com as 8 posições
    var persoY = [109,353,2,221,184,420,60,382]; // X e Y dos possíveis locais de Hamtaro e cia.
    
    // Essas persoX e persoY são vetores pra usarem juntos (persoX,personY), pra saber o local exato onde o Hamtoro ou o Kuroneko devem ser colocados. Isso aí foi calculado tem muito tempo, no meu primeiro semestre acho, no Photoshop e talz.
    
    var hamtoros,kuronekos; 
    // referentes aos dois possíveis personagens:
    // - Hamtoro -> Se acertar, perde 1 ponto;
    // - Kuroneko -> Se acertar, ganha 1 ponto; 
    // - nome do jogo: Hit the Kuroneko, porque Don't Hit the Hamtoro pode dar problema rs.
    var keys; // vai armazenar as entradas do jogador. Vish, mas meu jogo é no mouse rs.
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
        
    }
    
    function create()
    {
        score = 0;
        keys = game.input.keyboard.createCursorKeys(); 
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
        hamtoro = hamtoros.create(persoX[0],persoY[0],"hamtoro");
            hamtoro = hamtoros.create(persoX[1],persoY[1],"hamtoro");
            hamtoro = hamtoros.create(persoX[2],persoY[2],"hamtoro");
            hamtoro = hamtoros.create(persoX[3],persoY[3],"hamtoro");
            hamtoro = hamtoros.create(persoX[4],persoY[4],"hamtoro");
            hamtoro = hamtoros.create(persoX[5],persoY[5],"hamtoro");
            hamtoro = hamtoros.create(persoX[6],persoY[6],"hamtoro");
            hamtoro = hamtoros.create(persoX[7],persoY[7],"hamtoro");
        */
        
        hamtoro = game.add.sprite(persoX[0],persoY[0],'hamtoro');
        hamtoro.inputEnable = true;
        hamtoro.events.onInputDown.add(hitHamtoro);
        
        //hamtoro.events.onInputDown.add(hitHamtoro);  não é isso.    
        // Oh os Kagebunshin do Hamtoro rsrs... tá, beleza... to apanhando, mas vamo.
        
        
        game.physics.startSystem(Phaser.Physics.ARCADE); 
        game.physics.arcade.enable(hamtoro)
        hamtoro.body.gravity.y = 300; hamtoro.body.collideWorldBounds = true;
        hamtoro.body.bounce.y = 0;       
        
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
        txtScore.text = "Score: " + score;
        
        // game.physics.arcade.collide(player,platforms);
        // game.physics.arcade.collide(stars,platforms); 
        // e o famoso trigger, só que overlap:
        // game.physics.arcade.overlap(player,stars,collectStar);
        
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
        }
        
    }
    /*
    function collectStar(player,star)
    {
        star.kill(); //gente que horror.
        score+=10;
        txtScore.text = "SCORE: " + score;
    }
    */
    
    function hitHamtoro()
    {
        console.log("entrei aqui");
        score--;
        txtScore = "Score: "+score;
    }
    
    function hitKuroneko(kuroneko)
    {
        kuroneko.kill(); // tadins vei
        score++;
    }
    
}());