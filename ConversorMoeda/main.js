
let botaoConverter = document.querySelector('#botao-converter') //botao
let real = document.querySelector('#real') //input do valor

botaoConverter.onclick = () => //ativando por click
            ativar() //chamando funcao
                .then(acertoConexa) //se acertar
                .catch(erroConexao) // se errar

function ativar(){
    return new Promise((resolve, reject)=>{

        const xhttp = new XMLHttpRequest() //request

        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                const response = JSON.parse(this.responseText)

                resolve(response) 
    
            }

            if(this.status === 404){
                reject()
            }
        }

        xhttp.open('GET','https://economia.awesomeapi.com.br/json/last/USD-BRL') //Link
        xhttp.send()
    })

}

function acertoConexa(response){
    console.log('status conexao 200')
    if(real.value == '' || real.value == ' '){return alert('Gentileza preencha o campo')}
    //preencehr campo

    else if(real.value.length >= 7){return alert('Uauuu, quantos numeros, não acha melhor reduzir?')}
    // verifica se é maior que 6

    else if (real.value != '' || real.value != ' '){
    //verifica se está vazio

        const resultadoAPI = response.USDBRL //resultado da consulta da API

        const moedaAlta = response.USDBRL.high //valor da moeda em alta
        
        const moedaBaixa = response.USDBRL.low

        const campoHTML = document.querySelector('#dollar') //buscando o input pro html

        let valorInserido = real.value //separando valor

        let resultadoConversaoAlto = valorInserido / moedaAlta //calculando conversão

        let resultadoConversaoBaixo = valorInserido / moedaBaixa

        let listaHTML = `Valor em alta e baixa
         <br> US$ = ${Math.round(resultadoConversaoBaixo)} 
         <br> US$ = ${Math.round(resultadoConversaoAlto)}`
        //mostrando resultado aproximado

        return campoHTML.innerHTML = listaHTML //inserindo no corpo

    }

   else {return alert('Erro, contate o ADM ou tente mais tarde')} //caso tenha erro
}

function erroConexao(){
    return console.log('Erro, chamar o ADM ou tentar mais tarde') //caso nao se conecte
}

//GITHUB COM API, https://github.com/raniellyferreira/economy-api
//$ curl https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL