
function TabelaInss(valor, tribut) {
    var aux = 0;
    if(tribut==1){
        if (valor <= 1320.00){
            aux = valor * 0.0750;
        }
        else if ((valor > 1320.01)  &&  (valor < 2571.29)){
            aux = (valor * 0.09) - 19.80;
        }
        else if ((valor > 2571.30) && (valor < 3856.94)){
            aux = (valor * 0.12) - 96.94;
        }
        else if (valor > 3856.95){
            aux = (valor * 0.14) - 174.08;
        }
        else if (aux > 876.94){
            aux = 876.95;
        }
        return aux;
    }
    if (tribut==2){
        if(valor < 7507.50){
            aux = valor * 0.11;
        }else{
            aux = 825.82;
        }
        return aux;
    }
    else{
        return aux;
    }
}

function TabelaIrrf(valor, dep, tribut) {
    var ir = 0;
    var inss = TabelaInss (valor,tribut);
    var dependentes = dep * 189.59;
    var irTradicional = inss + dependentes;
    var irSimples = 528.00;

    if(valor < 2640.00){// isentos
        return ir = 0;
    }
    else if (irTradicional < irSimples){
        if (((valor - irSimples) > 2112.01) &&
             ((valor - irSimples) < 2826.66)){

        ir = ((valor - irSimples) * 0.075) - 158.40;
        }
        else if (((valor - irSimples) > 2826.65) &&
                 ((valor - irSimples) < 3751.06)){

            ir = ((valor - irSimples) * 0.15) - 370.40;
        }
        else if (((valor - irSimples) > 3751.05) &&
                 ((valor - irSimples) < 4664.69)){

            ir = ((valor - irSimples) * 0.225) - 651.73;
        }
        else if ((valor - irSimples) > 4664.68){

            ir = ((valor - irSimples) * 0.275) - 884.96;
        }
        if(ir<10.00){
            console.log(ir);
            ir=0;
            return ir;
        }
        if(ir>10.00){
            return ir;
        }
    }
    else if (irTradicional > irSimples){
        if (((valor - irTradicional) > 2112.01) &&
             ((valor - irTradicional) < 2826.66)){

        ir = ((valor - irTradicional) * 0.075) - 158.40;
        }
        else if (((valor - irTradicional) > 2826.65) &&
                 ((valor - irTradicional) < 3751.06)){

            ir = ((valor - irTradicional) * 0.15) - 370.40;
        }
        else if (((valor - irTradicional) > 3751.05) &&
                 ((valor - irTradicional) < 4664.69)){

            ir = ((valor - irTradicional) * 0.225) - 651.73;
        }
        else if ((valor - irTradicional) > 4664.68){

            ir = ((valor - irTradicional) * 0.275) - 884.96;
        }
        if(ir<10.00){
            console.log(ir);
            ir=0;
            return ir;
        }
        if(ir>10.00){
            return ir;
        }
    }
}

function LiquidoSalario(valor, dep, tribut) {
    var inss = TabelaInss(valor, tribut);
    var irrf = TabelaIrrf(valor, dep, tribut);
    var salario = (valor - inss) - irrf;
    return salario;
}
function abs(valor) {
    return valor > 0 ? valor : -valor;
}

function bissecao(valor, dep, tribut) {
    var a = valor;
    var b = valor * 1.5;
    var c = 0;
    var delta = 0.0001;    

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

function Calcular() {
    //e.preventDefault();
    document.getElementById("inss").style.display="block";
    document.getElementById("irrf").style.display="block";
    document.getElementById("fgts").style.display="block";
    document.getElementById("valorfinal").style.display="block";
    
    var tipocalculo = document.getElementById("tipocalculo").value;
    var tribut= document.getElementById("tributacao").value;
    var dep = document.getElementById("dep").value;
    var valor = parseFloat(document.getElementById("valor").value);
    var valorfinal,inss,irrf,fgts;
    
    if(tribut=="funcionario"){
        tribut = 1;       
    }
    else if(tribut=="prolaborerpa"){
        tribut = 2;       
    }
    else if(tribut=="estagiario"){
        tribut = 3;       
    }
    
    if(tipocalculo=="buscarbruto"){//buscar bruto
        valorfinal=bissecao(valor, dep, tribut);
        inss = TabelaInss(valorfinal, tribut);
        irrf = TabelaIrrf(valorfinal, dep, tribut);
        if((tribut==3)||(tribut==2)){
            fgts = 0;
        }else{
        fgts = valorfinal * 0.08; 
        }
    }    
    else if(tipocalculo=="buscarliquido"){//buscar liquido
        valorfinal = LiquidoSalario(valor, dep, tribut);
        inss = TabelaInss(valor, tribut);
        irrf = TabelaIrrf(valor, dep, tribut);  
        if((tribut==3)||(tribut==2)){
            fgts = 0;
        }else{
        fgts = valor * 0.08; 
        }
    }
    
    if(tipocalculo=="buscarbruto"){//buscar bruto
        document.getElementById("inss").innerHTML="INSS: "+(inss.toFixed(2));
        document.getElementById("irrf").innerHTML="IRRF: "+(irrf.toFixed(2));
        document.getElementById("fgts").innerHTML="FGTS: "+(fgts.toFixed(2));
        document.getElementById("valorfinal").innerHTML="Salário Bruto: "+(valorfinal.toFixed(2));        
    }
    else if(tipocalculo=="buscarliquido"){//buscar liquido
        document.getElementById("inss").innerHTML="INSS: "+(inss.toFixed(2));
        document.getElementById("irrf").innerHTML="IRRF: "+(irrf.toFixed(2));
        document.getElementById("fgts").innerHTML="FGTS: "+(fgts.toFixed(2));
        document.getElementById("valorfinal").innerHTML="Salário Líquido: "+(valorfinal.toFixed(2));  
    }    
}
