let tb=[" ", " ", " ", " ", " ", " ", " ", " ", " "];
let i=0,j;
let jogando = String(document.getElementById("vez"));

function vezDeQuem(){
    if(i%2==0){
        document.getElementById("vez").innerHTML = "X";
    } else {
        document.getElementById("vez").innerHTML = "O";
    }
}

function jogada(ident){
    tb[0] = document.getElementById("t11").innerHTML; //= tb[0];
    tb[1] = document.getElementById("t12").innerHTML; //= tb[1];
    tb[2] = document.getElementById("t13").innerHTML; //= tb[2];
    tb[3] = document.getElementById("t21").innerHTML; //= tb[3];
    tb[4] = document.getElementById("t22").innerHTML; //= tb[4];
    tb[5] = document.getElementById("t23").innerHTML; //= tb[5];
    tb[6] = document.getElementById("t31").innerHTML; //= tb[6];
    tb[7] = document.getElementById("t32").innerHTML; //= tb[7];
    tb[8] = document.getElementById("t33").innerHTML; //= tb[8];
    
    j=document.getElementById(ident).innerHTML;
    if((j=="X")||(j=="O")){
        alert("CELULA JA PREENCHIDA");
    }
    else{
        if(i%2==0){
            document.getElementById(ident).innerHTML = "X";
            i++;
        } else{
            document.getElementById(ident).innerHTML = "O";
            i++;
        }
        ganhou();
    }
}

function ganhou(){
    //primeira coluna horizontal
    verificaJogada('t11','t12','t13');
    
    //primeira diagonal
    verificaJogada('t11','t22','t33');
    
    //primeira coluna vertical
    verificaJogada('t11','t21','t31');
    
    //segunda horizontal
    verificaJogada('t21','t22','t23');
    
    //terceira horizontal
    verificaJogada('t31','t32','t33');
    
    //segunta vertical
    verificaJogada('t12','t22','t32');
    
    //terceira vertical
    verificaJogada('t13','t23','t33');
    
    //segunda diagonal
    verificaJogada('t31','t22','t13');

    //Verifica se deu Velha
    deuVelha();
}

function verificaJogada(id1,id2,id3){
    let celula1,celula2,celula3;
    celula1 = document.getElementById(id1);
    celula2 = document.getElementById(id2);
    celula3 = document.getElementById(id3);

    if ((celula1.innerHTML!='')&&(celula2.innerHTML!='')&&(celula3.innerHTML!='')&&(celula1.innerHTML==celula2.innerHTML)&&(celula2.innerHTML==celula3.innerHTML)){
        celula1.style.color='blue';
        celula2.style.color='blue';
        celula3.style.color='blue';
        setTimeout(function(){
            alert("TEMOS UM GANHADOR!!")
            let jogador = 'p1';
            if(i%2==0){
                jogador = 'p2';                
            }
            let pontuacao = parseInt(document.getElementById(jogador).innerHTML);
            pontuacao++;
            document.getElementById(jogador).innerHTML=String(pontuacao);
            setTimeout(function() { 
                reset() 
            }, 10); 
        }, 50);
    }
}

function deuVelha(){
    vezDeQuem();
    if(i>8){
        setTimeout(function(){
            alert("Nenhum ganhador");
            reset();
        },150);
    }
}

function reset(){
    //limpando as jogadas
    document.getElementById('t11').innerHTML='';
    document.getElementById('t12').innerHTML='';
    document.getElementById('t13').innerHTML='';
    document.getElementById('t21').innerHTML='';
    document.getElementById('t22').innerHTML='';
    document.getElementById('t23').innerHTML='';
    document.getElementById('t31').innerHTML='';
    document.getElementById('t32').innerHTML='';
    document.getElementById('t33').innerHTML='';
    //limpando cores
    document.getElementById('t11').style.color='white';
    document.getElementById('t12').style.color='white';
    document.getElementById('t13').style.color='white';
    document.getElementById('t21').style.color='white';
    document.getElementById('t22').style.color='white';
    document.getElementById('t23').style.color='white';
    document.getElementById('t31').style.color='white';
    document.getElementById('t32').style.color='white';
    document.getElementById('t33').style.color='white';
    //resetando indice de jogadas
    if(i%2==0){// se o O ganhou
        document.getElementById("vez").innerHTML = "O";
        i=1;
    }else{ //se o X ganhou
        document.getElementById("vez").innerHTML = "X";
        i=0;
    }
}