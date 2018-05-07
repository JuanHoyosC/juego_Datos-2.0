var juego = new Phaser.Game(1950, 970, Phaser.AUTO, '', {preload: preload, create: create, update: update});
var pj;
var pj2;
var vida;
var vida1;
var Tecla;
var sw = 0;
var puño = false;
var ko;
var cont = 0;
var audio;
var izquierda = false;
var derecha = false;
var choque = false;
var caminarIzquierda = false;
var caminarDerecha = false;
var mover;
var teclaArriba = false;
var patada = false;
var salto = false;
var suelo = false;
var vida_Pj = 1000;
var vida_Pj2 = 1000;
var TXT, TXT2;
var moverse = true;
var seguir = false;
var atacar = false;



      function preload(){

            juego.load.image('Fondo', 'Imagenes/Fondo_Juego.jpg');
            juego.load.spritesheet('personajes', 'Quieto/pj.png',160,165,39)
            juego.load.spritesheet('golpe', 'Imagenes/golpe.png',290,400)
            juego.load.spritesheet('enemigo', 'Quieto/Personajes.png',160,160)
            juego.load.audio('audio1','Musica/GameOver.mp3');
        }


         function create () {
          Tecla = juego.input.keyboard.createCursorKeys();
          audio = juego.add.audio('audio1');
          juego.add.tileSprite(0,0,1950,970, 'Fondo');
          pj2 = juego.add.sprite(juego.width-300,juego.height-65, 'enemigo');
          pj = juego.add.sprite(300,juego.height-65, 'personajes');

          //le da tamaño al sprite y le da su punto de apoyo
          pj.anchor.setTo(0.5, 1);
          pj2.scale.setTo(-1.7,1.7);
          pj2.anchor.setTo(0.5,1);
          pj.scale.setTo(1.7);
          //Textos
          Txt2 = juego.add.text(juego.world.width-380, 22, 'Puntos: 0', {fontSize: '27px', fill: 'white',fontFamily: 'Pixeled'});
          Txt2.text='Vida jugador 2 : '+vida_Pj2;
          Txt = juego.add.text(80, 22, 'Puntos: 0', {fontSize: '27px', fill: 'white',fontFamily: 'Pixeled'});
          Txt.text='Vida jugador 1 : '+vida_Pj;

           //AÑADE LAS FISICAS AL JUEGO
          juego.physics.startSystem(Phaser.Physics.ARCADE);
          //LIMITES DEL JUEGO
          juego.world.setBounds(0, 0, 1950,juego.height-65);
          //ACTIVA LAS FISICAS AL JUGADOR
          juego.physics.arcade.enable(pj);
          juego.physics.arcade.enable(pj2);
          //EL JUGADOR NO PUEDE REBOTAR
          pj.body.bounce.y = 0;
          pj2.body.bounce.y = 0;
          //GRAVEDAD DEL JUGADOR
          pj.body.gravity.y = 900;//Gravedad del Jugador
          pj2.body.gravity.y = 900;
          //COLISION CON LOS BORDES
          pj.body.collideWorldBounds = true;
          pj2.body.collideWorldBounds = true;
          //ANIMACIONES
          pj.animations.add('quieto', [0,1,2,3,4,5,6,7],10,false);
          pj.animations.add('correr', [8,9,10,11,12,13,14,15],10,false);
          pj.animations.add('ataque', [16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,0],15,false);
          pj2.animations.add('quieto', [0,1,2,3,4,5,6,7],10,true);
          pj.animations.add('agachado',[33,34],10,false);
          pj.animations.add('victoria',[35,36,37,38,39],7,false);

        }

        function dd(){
          if(seguir == true){
            moverse = true;
            seguir = false;
            setTimeout(dd,1500);
            puño = true;
          }
        }

         function update () {
         atacar = true;

         pj2.animations.play('quieto');

         pj.body.velocity.x = 0;
         pj2.body.velocity.x = 0;

         juego.physics.arcade.overlap(pj,pj2, colision,null,this);
        // juego.physics.arcade.collide(pj,pj2);


        //Golpe

        juego.input.keyboard.onUpCallback = function(key){
            if(key.keyCode === Phaser.KeyCode.Z && moverse == true && atacar == true){
              seguir = true;
              moverse = false;
              setTimeout(dd,1500);
              pj.animations.play('ataque');
            }

            if(key.keyCode === Phaser.KeyCode.X && moverse == true && atacar == true){
              patada = true;
              moverse = false;
            }
        }


        //SALTA SEGUNDO Personaje

        if(juego.input.keyboard.isDown(Phaser.KeyCode.W)  && suelo == true ){
         pj2.body.velocity.y= -550;
         salto = true;
         suelo = false;
       }

       if(pj2.position.y == juego.height-65 ){
         salto = false;
         suelo = true;
       }

         //PATADA


          //MOVERSE A LA DERECA

           if (Tecla.right.isDown && moverse == true ) {
               pj.body.velocity.x = 480;
               pj.animations.play('correr');
               pj.scale.setTo(1.7);
               atacar = false;
          }

          //Agacharse

          if(Tecla.down.isDown && moverse == true){
           pj.animations.play('agachado');
           atacar = false;
          }

          if(juego.input.keyboard.isDown(Phaser.KeyCode.A)){
             pj2.body.velocity.x = -480;
         }

         if(juego.input.keyboard.isDown(Phaser.KeyCode.D)){
            pj2.body.velocity.x = 480;
        }

          //MMOVERSE A LA IZQUIERDA
            if(Tecla.left.isDown && moverse == true){
                  pj.animations.play('correr');
                  pj.body.velocity.x = -480;
                  pj.scale.setTo(-1.7,1.7);
                  atacar = false;
            }

           //SALTAR
          if(Tecla.up.isDown && pj.position.y == juego.height-65 && moverse == true){
              pj.body.velocity.y= -550;
              console.log(pj.position.y);

          }
          choque = false;
          puño = false;
          patada = false;


  }




      function colision(pj, pj2){
        choque = true;
          if(puño == true && pj.position.y > 780 ){
            if(pj2.position.y >850 ){
               if(pj.position.x -pj2.position.x >= 214  || pj.position.x -pj2.position.x  >=  -214   ){
                 puño = false;
                 patada = false;
                 vida_Pj2 = vida_Pj2-100;
                 Txt2.text='Vida jugador 2 : '+vida_Pj2;

                 if(vida_Pj2 == 0){
                    pj2.kill();
                    pj.animations.play('victoria');
             }
            }
          }
        }

      }
