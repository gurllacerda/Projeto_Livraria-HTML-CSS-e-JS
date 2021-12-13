/////////// Classes Primárias
class Pessoa {
    nome;
    telefone;
    email;
    cpf;
}

class Vendas {
    funcionario;
    cliente;
    livro;
    quantidadeCopias;

    constructor(funcionario, cliente, livro, quantidadeCopias) {
        this.funcionario = funcionario;
        this.cliente = cliente;
        this.livro = livro;
        this.quantidadeCopias = quantidadeCopias;
    }

}

class Produto {
    titulo;
}

class Material{
    codProduto;
    quantidade;

    constructor(codProduto,quantidade){
        this.codProduto = codProduto;
        this.quantidade = quantidade;
    }
}
//////////////// Classes com conteúdos hereditários
class Clientes extends Pessoa {

    constructor(nome, telefone, email, cpf) {
        super();
        super.nome = nome;
        super.telefone = telefone;
        super.email = email;
        super.cpf = cpf;
    }

    imprime() {
        let impressao = "Nome do Cliente: " + this.nome + "<br/>" +
            "Telefone: " + this.telefone + "<br/>" +
            "Email: " + this.email + "<br/>" +
            "Cpf: " + this.cpf + "<br/>";

        return impressao;
    }
}

class Funcionarios extends Pessoa {
    endereco;
    filiacao;
    constructor(nome, telefone, email, cpf, endereco, filiacao) {
        super();
        super.nome = nome;
        super.telefone = telefone;
        super.email = email;
        super.cpf = cpf;
        this.endereco = endereco;
        this.filiacao = filiacao;
    }

    imprime() {
        let impressao = "Nome do Funcionário: " + this.nome + "<br/>" +
            "Telefone: " + this.telefone + "<br/>" +
            "Email: " + this.email + "<br/>" +
            "Cpf: " + this.cpf + "<br/>" +
            "Endereço: " + this.endereco + "<br/>" +
            "Filiação: " + this.filiacao + "<br/>";

        return impressao;
    }

}

class Livros extends Produto {
    codigo;
    autor;
    quantidade;
    genero;
    preco;

    constructor(titulo, codigo, autor, quantidade, genero, preco,) {
        super();
        super.titulo = titulo;
        this.codigo = codigo;
        this.autor = autor;
        this.quantidade = quantidade;
        this.genero = genero;
        this.preco = preco;
    }

    imprime() {
        let impressao = "Título do livro: " + this.titulo + "<br/>" +
            "Código: " + this.codigo + "<br/>" +
            "Autor: " + this.autor + "<br/>" +
            "Quantidade: " + this.quantidade + "<br/>" +
            "Gênero: " + this.genero + "<br/>" +
            "Preço: " + this.preco.toFixed(2) + "<br/>";

        return impressao;
    }



}
//////////////////// Declaração de variáveis globais /////////////////////
var listaCliente = []; var listaFuncionario = []; var listaLivro = []; var listaVendas = [];
var ondeAchouCli = 0;
var ondeAchouFun = 0;
var ondeAchouLiv = 0;
var estoques = [];
   
    

//////////////////////// FUNCTIONS ///////////////////////////////////
function exibeTela(tela) {
    let telas = document.getElementsByClassName("esconde");

    for (let i = 0; i < telas.length; i++) {
        telas[i].style.display = "none";
    }
    telas[tela].style.display = "block";
}

function cadastraCliente() {
    listaCliente.push(new Clientes(
        document.getElementById("inputNameCli").value,
        document.getElementById("inputTelCli").value,
        document.getElementById("inputEmailCli").value,
        document.getElementById("inputCpfCli").value
    ));

    document.formCliente.reset();
    console.log(listaCliente);
}

function cadastraFuncionario() {
    listaFuncionario.push(new Funcionarios(
        document.getElementById("inputNameFun").value,
        document.getElementById("inputTelFun").value,
        document.getElementById("inputEmailFun").value,
        document.getElementById("inputCpfFun").value,
        document.getElementById("inputEndFun").value,
        document.getElementById("inputFiliacaoFun").value

    ));

    document.formFuncionario.reset();
    console.log(listaFuncionario);
}

function cadastraLivro() {

    listaLivro.push(new Livros(
        document.getElementById("inputTituloLiv").value,
        document.getElementById("inputCodigoLiv").value,
        document.getElementById("inputAutorLiv").value,
        Number(document.getElementById("inputQuantidadeLiv").value),
        document.getElementById("inputGeneroLiv").value,
        Number(document.getElementById("inputPrecoLiv").value)
    ));

   

        let cod = document.getElementById("inputCodigoLiv").value
        let qtd = Number(document.getElementById("inputQuantidadeLiv").value)

        movimentaEstoque(cod,qtd)


    
    document.formLivros.reset();
    console.log(listaLivro);
    console.log(estoques);
        

    
}

function cadastraVendas() {
    listaVendas.push(new Vendas(
        document.getElementById("inputIdFun").value,
        document.getElementById("inputIdCli").value,
        document.getElementById("inputIdLiv").value,
        Number(document.getElementById("inputCopiasLiv").value)
    ));

    document.formVendas.reset();
    console.log(listaVendas);

}

////////////Validando os itens

function validaCliente() {
    if (document.getElementById("inputIdCli").value != "") {
        let achou = false;
        let cliente;
        for (let i = 0; i < listaCliente.length; i++) {
            if (listaCliente[i].nome.toLowerCase().startsWith(document.getElementById("inputIdCli").value.toLowerCase())) {
                achou = true;
                ondeAchouCli = i;
            }
        }
        if (achou) {
            cliente = "<div class='container valida'>" +
                listaCliente[ondeAchouCli].imprime() +
                "</div>";
        } else {
            cliente = "<h3 class='erroValida'>Cliente nao encontrado</h3>";
        }
        document.getElementById("validaCliente").innerHTML = cliente;
    }
}

function validaFun() {
    if (document.getElementById("inputIdFun").value != "") {
        let achou = false;
        let entregador;
        for (let i = 0; i < listaFuncionario.length; i++) {
            if (listaFuncionario[i].nome.toLowerCase().startsWith(document.getElementById("inputIdFun").value.toLowerCase())) {
                achou = true;
                ondeAchouFun = i;
            }

        } if (achou) {
            entregador = "<div class='container valida'>" +
                listaFuncionario[ondeAchouFun].imprime() +
                "</div>";
        } else {
            entregador = "<h3 class='erroValida'>Funcionário nao encontrado</h3>";
        }
        document.getElementById("validaFun").innerHTML = entregador;
    }
}

function validaLiv() {
    if (document.getElementById("inputIdLiv").value != "") {
        let achou = false;
        let cliente;
        for (let i = 0; i < listaLivro.length; i++) {
            if (listaLivro[i].codigo.toLowerCase().startsWith(document.getElementById("inputIdLiv").value.toLowerCase())) {
                achou = true;
                ondeAchouLiv = i;
            }
        }
        if (achou) {
            cliente = "<div class='container valida'>" +
                listaLivro[ondeAchouLiv].imprime() +
                "</div>";
        } else {
            cliente = "<h3 class='erroValida'>Livro nao encontrado</h3>";
        }
        document.getElementById("validaLiv").innerHTML = cliente;
    }
}

function validaQuantidade(ondeAchouLiv) {
    let quantidades = 0;

    for (let i = 0; i < estoques.length; i++) {
        if (estoques[i].codProduto == ondeAchouLiv)
            quantidade += estoques[i].quantidade;
    }

    return quantidades;
}// x = x + (-1) === x = x - 1


//Imprimindo os itens
function imprimeCliente() {
    let html = "";

    if (listaCliente.length == 0) {
        html += "<h4>Não há clientes cadastrados</h4>"
    } else {
        for (let i = 0; i < listaCliente.length; i++) {
            html += "<br/>" +
                "<div id='resultadoCli'>" +
                "Nome: " + listaCliente[i].nome + "<br />" +
                "Telefone: " + listaCliente[i].telefone + "<br />" +
                "E-mail: " + listaCliente[i].email + "<br />" +
                "Cpf: " + listaCliente[i].cpf + "<br />" +
                "</div>"
        }
    }

    document.getElementById("resultadoCli").innerHTML = html;
}


function imprimeLivro() {
    let html = "";

    if (listaLivro.length == 0) {
        html += "<h4>Não há livros cadastrados</h4>"
    } else {
        for (let i = 0; i < listaLivro.length; i++) {
            html += "<br/>" +
                "<div id='resultadoLiv'>" +
                "Titulo: " + listaLivro[i].titulo + "<br />" +
                "Código: " + listaLivro[i].codigo + "<br />" +
                "Autor: " + listaLivro[i].autor + "<br />" +
                "Quantidade: " + listaLivro[i].quantidade + "<br />" +
                "Gênero: " + listaLivro[i].genero + "<br />" +
                "Preço: " + "R$" + listaLivro[i].preco + ",00" + "<br />" +
                "</div>"
        }
    }
    document.getElementById("resultadoLiv").innerHTML = html;
}


function imprimeFuncionario() {
    let html = "";

    if (listaFuncionario.length == 0) {
        html += "<h4>Não há funcionários cadastrados</h4>"
    } else {
        for (let i = 0; i < listaFuncionario.length; i++) {
            html += "<br/>" +
                "<div id='resultadoFun'>" +
                "Nome: " + listaFuncionario[i].nome + "<br />" +
                "Telefone: " + listaFuncionario[i].telefone + "<br />" +
                "E-mail: " + listaFuncionario[i].email + "<br />" +
                "Cpf: " + listaFuncionario[i].cpf + "<br />" +
                "Endereço: " + listaFuncionario[i].endereco + "<br />" +
                "Filiação: " + listaFuncionario[i].filiacao + "<br />" +
                "</div>"
        }
    }
    document.getElementById("resultadoFun").innerHTML = html
}

function imprimeVendas() {
    let html = "";

    if (listaVendas.length == 0) {
        html += "<h4>Não há funcionários cadastrados</h4>"
    } else {
        for (let i = 0; i < listaFuncionario.length; i++) {
            html += "<br/>" +
                "<div id='resultadoVen'>" +
                "Funcionário: " + listaVendas[i].funcionario + "<br />" +
                "Cliente: " + listaVendas[i].cliente + "<br />" +
                "Livro: " + listaVendas[i].livro + "<br />" +
                "Quantidade de cópias: " + listaVendas[i].quantidadeCopias + "<br />" +
                "</div>"
        }
    }
    document.getElementById("resultadoVen").innerHTML = html
}



function movimentaEstoque(idLivro, qtd){

    estoques.push(idLivro,qtd);
    console.log(estoques);
}

function verificaEstoque(idLivro){

    let total = 0;

    for(let i=0; i<estoques.length ; i++){

        if(estoques[i].idLivro == idLivro){

            total += estoques[i].quantidade;
        }
    }

    return total;

}


