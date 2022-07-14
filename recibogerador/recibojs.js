function formatarCampo(campoTexto) {
    if (campoTexto.value.length <= 11) {
        campoTexto.value = mascaraCpf(campoTexto.value);
    } else {
        campoTexto.value = mascaraCnpj(campoTexto.value);
    }
}
function retirarFormatacao(campoTexto) {
    campoTexto.value = campoTexto.value.replace(/(\.|\/|\-)/g,"");
}
function mascaraCpf(valor) {
    return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4");
}
function mascaraCnpj(valor) {
    return valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5");
}

var i = 0

function emiteRecibo(){
    /*document.getElementById("recibo_emitente").innerHTML = document.getElementById("empresaNome").value;
    document.getElementById("recibo_nome").innerHTML = document.getElementById("nomeFunc").value;
    document.getElementById("recibo_identificador").innerHTML = document.getElementById("cpfCnpj").value;
    document.getElementById("recibo_cargo").innerHTML = document.getElementById("cargo").value;
    var date = document.getElementById("mes").value;
    date = date.split("-").reverse().join("-");
    document.getElementById("recibo_data").innerHTML = date;
    document.getElementById("recibo_valor").innerHTML = parseFloat(document.getElementById("salario").value);
    document.getElementById("valorfinal").innerHTML = parseFloat(document.getElementById("salario").value);
    ;*/
    i = 0
    window.print();
}

function duplicate() {
    //primeiro recibo
    document.getElementById("recibo_emitente").innerHTML = document.getElementById("empresaNome").value;
    document.getElementById("recibo_nome").innerHTML = document.getElementById("nomeFunc").value;
    document.getElementById("recibo_identificador").innerHTML = document.getElementById("cpfCnpj").value;
    document.getElementById("recibo_cargo").innerHTML = document.getElementById("cargo").value;
    var date = document.getElementById("mes").value;
    date = date.split("-").reverse().join("-");
    document.getElementById("recibo_data").innerHTML = date;
    document.getElementById("recibo_valor").innerHTML = parseFloat(document.getElementById("salario").value);
    document.getElementById("valorfinal").innerHTML = parseFloat(document.getElementById("salario").value);
    //duplicata
    document.getElementById("original1").style.display="block";
    document.getElementById("recibo_emitente1").innerHTML = document.getElementById("empresaNome").value;
    document.getElementById("recibo_nome1").innerHTML = document.getElementById("nomeFunc").value;
    document.getElementById("recibo_identificador1").innerHTML = document.getElementById("cpfCnpj").value;
    document.getElementById("recibo_cargo1").innerHTML = document.getElementById("cargo").value;
    var date = document.getElementById("mes").value;
    date = date.split("-").reverse().join("-");
    document.getElementById("recibo_data1").innerHTML = date;
    document.getElementById("recibo_valor1").innerHTML = parseFloat(document.getElementById("salario").value);
    document.getElementById("valorfinal1").innerHTML = parseFloat(document.getElementById("salario").value);
    
    var checkBox = document.getElementById("tributos");
    if(checkBox.checked){
        var salario = parseFloat(document.getElementById("salario").value);
        var dep = document.getElementById("dependente").value;
        var inss = TabelaInss(salario); 
        var ir = TabelaIrrf(salario, dep);
        var liquido = LiquidoSalario(salario, dep);
        document.getElementById("inss").innerHTML = inss.toFixed(2);
        document.getElementById("irrf").innerHTML = ir.toFixed(2);
        document.getElementById("valorfinal").innerHTML = liquido.toFixed(2);
        //preenchendo duplicata
        document.getElementById("inss1").innerHTML = inss.toFixed(2);
        document.getElementById("irrf1").innerHTML = ir.toFixed(2);
        document.getElementById("valorfinal1").innerHTML = liquido.toFixed(2);
    }else{
        document.getElementById("inss").innerHTML = 0.00;
        document.getElementById("irrf").innerHTML = 0.00;
        //preenchendo duplicata
        document.getElementById("inss1").innerHTML = 0.00;
        document.getElementById("irrf1").innerHTML = 0.00;
    }
    /*if(i==0){
        var original = document.getElementById('original' + i);
        var clone = original.cloneNode(true); // "deep" clone
        i++;
        clone.id = "original" + i; // there can only be one element with an ID
        clone.onclick = duplicate; // event handlers are not cloned
        original.parentNode.appendChild(clone);
    }*/
}

//Abaixo funcoes para calcular os tributos

function TabelaInss(valor) {
    var aux = 0;
    if (valor <= 1212.00){
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

function TabelaIrrf(valor, dep) {
    var aux = TabelaInss (valor);
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

function LiquidoSalario(valor, dep) {
    var salario = parseFloat(document.getElementById("salario").value);
    var inss = 0, irrf = 0, valorliquido = 0;
    inss = TabelaInss(salario);
    irrf = TabelaIrrf(salario, dep);
    valorliquido = (valor - inss) - irrf;
    return valorliquido;
}