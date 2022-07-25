function AtualizaTable(listaProduto){
    const tableElement = document.getElementById("table");
    var tabela = "";
    
    for(let i=0; i< listaProduto.length; i++){
        let produto = listaProduto[i];
        let tr = `<tr>
                    <td>${produto.nomeProduto}</td>
                    <td>${produto.fabProduto}</td>
                    <td>${produto.categProduto}</td>
                    <td>${produto.quantProduto}</td>
                    <td>R$ ${produto.valorProduto}</td>
                    <td><button id="deleteBtn" onclick="remover(${i})">Delete</button></td>
                </tr>`;
        tabela += tr;
    }
    tableElement.innerHTML = tabela;
}

function remover(indice){
    listaProduto.splice(indice,1);
    AtualizaTable(listaProduto);
}

function Adiciona(){
    var nomeProduto = document.getElementById("nomeProduto").value;
    var fabProduto = document.getElementById("fabProduto").value;
    var categProduto = document.getElementById("categProduto").value;
    var quantProduto = document.getElementById("quantProduto").value;
    var valorProduto = parseFloat(document.getElementById("valorProduto").value);
    listaProduto.push({
        nomeProduto,
        fabProduto,
        categProduto,
        quantProduto,
        valorProduto
    })
    AtualizaTable(listaProduto);
}
const listaProduto = [{nomeProduto:"Leite",fabProduto:"Nestle",categProduto:"Leite",quantProduto:2,valorProduto:8}];
function Load(){
    AtualizaTable(listaProduto);
};