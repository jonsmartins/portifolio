function fibonacci(){
    var numero = parseInt(document.getElementById('numero').value);
    var resposta = document.getElementById('respostafibo');
    var penultimo=0, ultimo=1;
    var numeroAtual;
    var pertence = false;

    if(numero<=2){
        pertence = true;
    }
    else{
    for(var count=3 ; count<=20 ; count++){
        numeroAtual = ultimo + penultimo;
        penultimo = ultimo;
        ultimo = numeroAtual;
        if(numero==numeroAtual){
            pertence=true;
            break;
        }
    }
    }
    if(pertence){
        resposta.style.color="green";
        resposta.innerHTML="O numero pertence a sequencia";
    }else{
        resposta.style.color="red";
        resposta.innerHTML="O numero não pertence a sequencia";
    }
}

function inverte(args){
    let x = "";
    for(let i = args.length - 1; i>=0; i--){
        x += args[i];
    }
    return x;
}

function stringInversa(){
    let palavra = document.getElementById('palavra').value;
    let a = inverte(palavra);
    
    var palavraInvertida = document.getElementById('palavraInvertida');
    
    palavraInvertida.innerHTML=a;
}

