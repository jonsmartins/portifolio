
function TabelaInss(valor, tribut) {
    var aux = 0;
    if(tribut==1){
        if (valor < 1212.00){
            aux = valor * 0.0750;
        }
        else if ((valor > 1212.01)  &&  (valor < 2427.35)){
            aux = (valor * 0.09) - 18.18;
        }
        else if ((valor > 2427.36) && (valor < 3641.03)){
            aux = (valor * 0.12) - 91.00;
        }
        else if ((valor > 3641.04) && (valor < 7087.22)){
            aux = (valor * 0.14) - 163.82;
        }
        else if (valor > 7087.23){
            aux = 828.38;
        }
        return aux;
    }
    if (tribut==2){
        if(valor < 7087.22){
            aux = valor * 0.11;
        }else{
            aux = 779.59;
        }
        return aux;
    }
    else{
        return aux;
    }
}

function TabelaIrrf(valor, dep, tribut) {
    
    var aux = TabelaInss (valor,tribut);
    var ir = 0;
    if ((((valor - aux)-(dep*189.59)) > 1903.99) && ((((valor - aux)-(dep*189.59)) < 2826.66))){
        ir = (((valor - aux)-(dep*189.590)) * 0.075) - 142.80;
    }
    else if ((((valor - aux)-(dep*189.59)) > 2826.65) && ((((valor - aux)-(dep*189.59)) < 3751.06))){
        ir = (((valor - aux)-(dep*189.59)) * 0.15) - 354.80;
    }
    else if ((((valor - aux)-(dep*189.59)) > 3751.05) && ((((valor - aux)-(dep*189.59)) < 4664.69))){
        ir = (((valor - aux)-(dep*189.59)) * 0.225) - 636.13;
    }
    else if (((valor - aux)-(dep*189.59)) > 4664.68){
        ir = (((valor - aux)-(dep*189.59)) * 0.275) - 869.36;
    }
    if(ir>10.00){
        return ir;
    }
    else if(ir<10.00){
        ir=0;
    }
    return ir;    
}

function LiquidoSalario(valor, dep, tribut) {
    var inss = 0, irrf = 0, salario = 0;
    inss = TabelaInss(valor, tribut);
    irrf = TabelaIrrf(valor, dep, tribut);
    salario = (valor - inss) - irrf;
    return salario;
}
function abs(valor) {
    return valor > 0 ? valor : -valor;
}

function bissecao(valor, dep, tribut) {
    var a = valor;
    var b = valor * 1.5;
    var delta = 0.001;

    var c = (a + b)/2;

    var fa = LiquidoSalario(valor, dep, tribut);
    var fb = LiquidoSalario(valor, dep, tribut);
    var fc = LiquidoSalario(valor, dep, tribut);

    var i = 0;
    var max_iterations = 1000;
    while( abs(fc - valor) > delta && i < max_iterations){

        c = (a + b)/2;

        fa = LiquidoSalario(a, dep, tribut);
        fb = LiquidoSalario(b, dep, tribut);
        fc = LiquidoSalario(c, dep, tribut);

        if(fc > valor){
            b = c;
        }
        else {
            a = c;
        }

        i++;
    }
    if ((tribut == 3) && (valor < 1903.98)){
        return a;
    }
    else{
        return c;    
    }
}

function showVal() {
    //e.preventDefault();
    document.getElementById("inss").style.display="block";
    document.getElementById("irrf").style.display="block";
    document.getElementById("fgts").style.display="block";
    document.getElementById("resultado").style.display="block";
    
    var tribut;
    if(document.getElementById("funcionario").checked){
        tribut = 1;       
    }
    if(document.getElementById("prolaborerpa").checked){
        tribut = 2;       
    }
    if(document.getElementById("estagiario").checked){
        tribut = 3;       
    }
    
    var valor = parseFloat(document.getElementById("valor").value);
    var dep = document.getElementById("dep").value;
    
        
    var valorfinal,inss,irrf,fgts;
        if(document.getElementById("buscabruto").checked){//buscar bruto
            valorfinal=bissecao(valor, dep, tribut);
            inss = TabelaInss(valorfinal, tribut);
            irrf = TabelaIrrf(valorfinal, dep, tribut);
            if((tribut==3)||(tribut==2)){
                fgts = 0;
            }else{
            fgts = valorfinal * 0.08; 
            }
        }    
        else if(document.getElementById("buscaliquido").checked){//buscar liquido
            valorfinal = LiquidoSalario(valor, dep, tribut);
            inss = TabelaInss(valor, tribut);
            irrf = TabelaIrrf(valor, dep, tribut);  
            if((tribut==3)||(tribut==2)){
                fgts = 0;
            }else{
            fgts = valor * 0.08; 
            }
        }
    
    document.getElementById("inss").innerHTML="INSS: "+(inss.toFixed(2));
    document.getElementById("irrf").innerHTML="IRRF: "+(irrf.toFixed(2));
    document.getElementById("fgts").innerHTML="FGTS: "+(fgts.toFixed(2));
    document.getElementById("resultado").innerHTML="VALOR: "+(valorfinal.toFixed(2));
    
    }