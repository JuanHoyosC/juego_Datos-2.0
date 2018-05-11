var juego = new Phaser.Game(1950, 970, Phaser.AUTO, '', {preload: preload, create: create, update: update});
var pj, saltoPj2 ,pj2 ,Tecla ,mover ,TXT , TXT2 ,TXT3 ,TXT4 ;
var puño = false;
var izquierda = -1.7;
var derecha = 1.7;
var choque = false;
var patada = false;
var salto = false;
var suelo = false;
var vida_Pj = 1000;
var vida_Pj2 = 1000;
var moverse = true;
var seguir = false;
var atacar = false;
var Correr = 'correr';
var Correr1 = 'correrAtras';
var ganadas_pj = 0;
var ganadas_pj2 = 0;
var agachado = false;
var segundos = 100;
var reinicio = false;
var cont = 0;


      function preload(){

            juego.load.image('Fondo', 'Imagenes/Fondo_Juego.jpg');
            juego.load.spritesheet('personajes', 'Quieto/PJ.png',200,165,70);
            juego.load.spritesheet('golpe', 'Imagenes/golpe.png',290,400);
            juego.load.spritesheet('enemigo', 'Quieto/PJ.png',200,165,70);
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
          Txt3 = juego.add.text(juego.world.width/2,22 , 'Puntos: 0', {fontSize: '35px', fill: 'white',fontFamily: 'Pixeled'});
          Txt3.text=segundos;
          Txt4 = juego.add.text(600,385, '', {fontSize: '50px', fill: 'white',fontFamily: 'Pixeled'});
     

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
          pj.animations.add('quieto', [18,19,20,21,22,23,24],10,false);
          pj.animations.add('principal', [18],10,false);
          pj2.animations.add('principal', [18],10,false);
          pj.animations.add('correr', [33,34,35,36,37,38,39,40],10,false);
          pj.animations.add('correrAtras', [40,39,38,37,36,35,34,33],10,false);
          pj.animations.add('ataque', [41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56],15,false);
          pj2.animations.add('quieto', [18,19,20,21,22,23,24],10,false);
          pj.animations.add('agachado',[26],10,false);
          pj.animations.add('victoria',[57,58,59,60,61],7,false);
          pj.animations.add('ataque2',[27,28,29,30,31,32,18],7,false);
          pj.animations.add('ataque3',[9,10,11,12,13,14,15,16,17,18],7,false);
          pj2.animations.add('daño',[0,1,2,3,4,5,6,7,8,18],6,false);   
          pj2.animations.add('muerte',[62,63,64,65,66,67],7,false);   
          pj.animations.play('principal');
          pj2.animations.play('principal');
          setTimeout(tiempo,1000);           
        }

        function dd(){
          if(seguir == true){
            moverse = true;
            seguir = false;
            setTimeout(dd,1500);
          }
        }

        function round(){
         Txt4.text=' ';
         if(cont != 3 && ganadas_pj !=2 && ganadas_pj2 !=2 ){
          vida_Pj = 1000;
          vida_Pj2 = 1000;
          segundos = 100;
          pj.position.x = 300;
          pj.position.y = juego.height-65;
          pj2.position.x = juego.width-300;
          pj2.position.y = juego.height-65;
          pj.animations.play('principal');
          pj2.animations.play('principal');       
          Txt3.text=segundos;
          Txt2.text='Vida jugador 2 : '+vida_Pj2;
          Txt.text='Vida jugador 1 : '+vida_Pj;
          reinicio = false;
          moverse = true;
          setTimeout(tiempo,1000);      
            }else{
              Txt4 = juego.add.text(475,385, '', {fontSize: '50px', fill: 'white',fontFamily: 'Pixeled'});
              if(ganadas_pj  >  ganadas_pj2 ){            
                 Txt4.text='EL GANADOR DEFINITIVO ES EL JUGADOR 1';
                   moverse = false; 
                    reinicio = true;
                   pj.animations.play('victoria');  
                 }
                  
               if(ganadas_pj2  >  ganadas_pj ){
                  moverse = false;  
                  Txt4.text='';
                  reinicio= true;
                  Txt4.text='EL GANADOR DEFINITIVO ES EL JUGADOR 1';
               }
                  
                  if(ganadas_pj2 == 0 && ganadas_pj == 0){
                  moverse = false;  
                  Txt4.text='';
                  reinicio= true;
                  Txt4 = juego.add.text(860,385, '', {fontSize: '50px', fill: 'white',fontFamily: 'Pixeled'});
                  Txt4.text='JUEGO EMPATADO';
                  }
                  
            }    
              
        }

        function tiempo(){     
               if(segundos != 0 && reinicio == false){
               segundos =segundos-1;
               Txt3.text=segundos;
               setTimeout(tiempo,1000);
               }else{
               if(segundos == 0){ 
                 if(vida_Pj  < vida_Pj2 ){
                    Txt4.text='EL GANADOR ES EL JUGADOR 2';
                     ganadas_pj2++;
                     moverse = false;
                     cont = cont+1;  
                     setTimeout(round,4000); 
                 }     
                    if(vida_Pj  > vida_Pj2 ){
                    Txt4.text='EL GANADOR ES EL JUGADOR 1';
                    pj.animations.play('victoria');
                    ganadas_pj++;
                    moverse = false;
                    cont = cont+1;   
                    setTimeout(round,4000);         
                 }
                     
                 if(vida_Pj  == vida_Pj2 ){
                    Txt4 = juego.add.text(865,385, '', {fontSize: '50px', fill: 'white',fontFamily: 'Pixeled'});
                    Txt4.text='EMPATE';
                    moverse = false; 
                    cont = cont+1;   
                    setTimeout(round,4000);
                    
                 }
              }
               
               
               }
              
              
              
        }

         function update () {
         atacar = true;
               

         pj.body.velocity.x = 0;
         pj2.body.velocity.x = 0;

         juego.physics.arcade.overlap(pj,pj2, colision,null,this);
        // juego.physics.arcade.collide(pj,pj2);


        //Golpes al enemigo

        juego.input.keyboard.onUpCallback = function(key){
            if(key.keyCode === Phaser.KeyCode.K && moverse == true && atacar == true){
              seguir = true;
              moverse = false;
              puño = true;
              setTimeout(dd,1500);
              pj.animations.play('ataque3');
              pj2.animations.play('daño');
              agachado = false;
            }
              
              if(key.keyCode === Phaser.KeyCode.Z && moverse == true && atacar == true){
              seguir = true;
              moverse = false;
              puño = true;
              setTimeout(dd,1500);
              pj.animations.play('ataque');
              agachado = false;
            }

            if(key.keyCode === Phaser.KeyCode.X && moverse == true && atacar == true && agachado == true){
              patada = true;
              seguir = true;
              pj.animations.play('ataque2');
              moverse = false;
              setTimeout(dd,1500);
            }
        }
        
        //deteccion de posicion del enemigo
        
        if(pj.position.x > pj2.position.x){
           pj.scale.setTo(-1.7,1.7);
              derecha = -1.7;
              izquierda = 1.7;
              pj2.scale.setTo(1.7);   
              Correr = 'correrAtras';
              Correr1 ='correr';
           }
               
           if(pj.position.x < pj2.position.x){
           pj.scale.setTo(1.7);
           pj2.scale.setTo(-1.7,1.7);  
              derecha =  1.7;
              izquierda = 1.7;
              Correr1 = 'correrAtras';
              Correr ='correr';
           }


        //Movimiento del segundo personaje

        if(juego.input.keyboard.isDown(Phaser.KeyCode.W)  && suelo == true && moverse == true){
         pj2.body.velocity.y= -550;
         salto = true;
         suelo = false;
       }

           if(juego.input.keyboard.isDown(Phaser.KeyCode.A) && moverse == true){
             pj2.body.velocity.x = -480;
                 pj2.scale.setTo(-1.7, 1.7);
         }

         if(juego.input.keyboard.isDown(Phaser.KeyCode.D) && moverse == true){
            pj2.body.velocity.x = 480;
                pj2.scale.setTo(1.7);
        }


          //MOVERSE A LA DERECA

           if (Tecla.right.isDown && moverse == true ) {
               pj.body.velocity.x = 480;
               pj.animations.play(Correr);
               atacar = false;
               agachado = false;
          }

          //Agacharse

          if(Tecla.down.isDown && moverse == true){
           pj.animations.play('agachado');
           atacar = false;
                agachado = true;
          }

          //MOVERSE A LA IZQUIERDA
            if(Tecla.left.isDown && moverse == true){
                  pj.animations.play(Correr1);
                  pj.body.velocity.x = -480;
                  atacar = false;      
                  agachado = false;
            }

           //SALTAR
          if(Tecla.up.isDown && pj.position.y == juego.height-65 && moverse == true){
              pj.body.velocity.y= -550;
              pj.animations.play('principal');
              agachado = false;
          }
          
         if(pj2.position.y == juego.height-65 ){
            salto = false;
            suelo = true;
           }
               
          choque = false;
          puño = false;
          patada = false;

  }




      function colision(pj, pj2){
        choque = true;
          if(puño == true){      
               if(pj.position.x -pj2.position.x >= -210  && pj.position.x -pj2.position.x <= -190 || pj.position.x -pj2.position.x  <=  210 && pj.position.x -pj2.position.x   >= 190){          
                 puño = false;
                 patada = false;
                 pj2.animations.play('daño');
                 vida_Pj2 = vida_Pj2-50;
                 Txt2.text='Vida jugador 2 : '+vida_Pj2;        
                 if(vida_Pj2 <= 0){
                    pj2.animations.play('muerte'); 
                    Txt2.text='Vida jugador 2 : 0'; 
                    pj.animations.play('victoria');
                    Txt4.text='EL GANADOR ES EL JUGADOR 1'; 
                    moverse = false;
                    reinicio = true;
                    ganadas_pj++;
                    cont = cont+1;
                    setTimeout(round,4000);   
                          
                 }
 
             }
                
                if(pj.position.x -pj2.position.x >= -190  && pj.position.x -pj2.position.x <= 0 || pj.position.x -pj2.position.x  >=0   && pj.position.x -pj2.position.x  <= 190){          
                 puño = false;
                 patada = false;
                 vida_Pj2 = vida_Pj2-100;
                  pj2.animations.play('daño');
                 Txt2.text='Vida jugador 2 : '+vida_Pj2;        
                 if(vida_Pj2 <= 0){
                    pj2.animations.play('muerte'); 
                    Txt2.text='Vida jugador 2 : 0';
                    Txt4.text='EL GANADOR ES EL JUGADOR 1';
                    pj.animations.play('victoria');   
                    moverse = false;
                    reinicio = true;
                    ganadas_pj++;
                    cont = cont+1;   
                    setTimeout(round,4000);
                    
                 }
 
             }
         }
            
              if(patada == true){      
               if(pj.position.x -pj2.position.x >= -210  && pj.position.x -pj2.position.x <= -190 || pj.position.x -pj2.position.x  <=  210 && pj.position.x -pj2.position.x   >= 190){          
                 puño = false;
                 patada = false;
                 pj2.animations.play('daño');
                 vida_Pj2 = vida_Pj2-50;
                 Txt2.text='Vida jugador 2 : '+vida_Pj2;        
                 if(vida_Pj2 <= 0){
                    pj2.animations.play('muerte');   
                    ganadas_pj++;
                    moverse = false;
                    Txt4.text='EL GANADOR ES EL JUGADOR 1';   
                    Txt2.text='Vida jugador 2 : 0';  
                    pj.animations.play('victoria');
                    reinicio = true;
                    cont = cont+1;   
                    setTimeout(round,4000);   
                 }
 
             }
                
                if(pj.position.x - pj2.position.x >= -190  && pj.position.x -pj2.position.x <= 0 || pj.position.x -pj2.position.x  >=0   && pj.position.x -pj2.position.x  <= 190){          
                 puño = false;
                 patada = false;
                 pj2.animations.play('daño');
                 vida_Pj2 = vida_Pj2-100;
                 Txt2.text='Vida jugador 2 : '+vida_Pj2;        
                 if(vida_Pj2 <= 0){
                    pj2.animations.play('muerte'); 
                    ganadas_pj++;
                    Txt4.text='EL GANADOR ES EL JUGADOR 1';   
                    Txt2.text='Vida jugador 2 : 0';  
                    pj.animations.play('victoria');
                    moverse = false;   
                    reinicio = true;
                    cont = cont+1;
                    setTimeout(round,4000);   
                 }
 
             }
         }
      }
