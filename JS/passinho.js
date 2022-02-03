// Variavel que pega o radio de cifra de Cesar.
var cifraCesar = document.querySelector('#cifraCesar')

// Variavel que pega o radio de base de 64
var base64 = document.querySelector('#base64')

// Variável que pega a div com a caixa de boxIncremento da cifra de Cesar
var boxIncremento = document.querySelector('.caixaCesar')

// Variavel que pega o input de incremento de Cesar
var inputIncremento = document.getElementById('incrementoCesar')

// Variavel que pega o botão de envio
var btn = document.querySelector('#btnEnvio')

// Variavel que pega o input de Codigo
var inputCodigo = document.getElementById('inputCodigo')

// Variavel que receberá texto
var texto;

// Varial que recebe o input de resposta
var inputResposta = document.getElementById('resposta')

// Variavel que receberá resposta
var resposta;

// Variavel que pegará o radio button codificar
var codificar = document.getElementById('codificar')

// Variavel que pegará o radio button decodificar
var decodificar = document.getElementById('decodificar')

// Função que faz aparecer o campo de boxIncremento da cifra de Cesar ao apertar no radio
cifraCesar.addEventListener('click', function(){
    // Pegando variavel com display da div de boxIncremento da cifra de cesar
    var display = boxIncremento.style.display;

    // Fazendo lógica para caso o display seja diferente de flex, ao clicar no radio de Cifra de Cesar, ele virar flex.
    if (display !== 'flex') {
        boxIncremento.style.display = 'flex'  
    } 

})

// Função para o campo de boxIncremento da cifra de Cesar sumir ao apertar em base de 64
base64.addEventListener('click', function () {
    // Pegando o display da div com campo de boxIncremento
    var display = boxIncremento.style.display;

    // Fazendo lógica para se display estiver flex, ficar none ao clicar em base de 64
    if (display === 'flex') {
        boxIncremento.style.display = 'none'
    }
})

// Função para aparecer o campo com resposta após clicar no botão enviar.
btn.addEventListener ('click', function (e) {
    // Prevenindo efeito de atualizar página
    e.preventDefault()
  
    // Variavel que chama função para verificar as entradas
    var validacaoEntradas = validaEntradas ()

    // Se a função retornou true para todas as entradas
    if (validacaoEntradas == true) {
         // Pegando div que aparecerá o campo com resposta
    var boxResposta = document.querySelector('.boxResposta')

    // Fazendo a lógica para o campo com resposta aparecer
    var visibility = boxResposta.style.visibility;
    if (visibility !== 'visible') {
        boxResposta.style.visibility = 'visible'
    } 

    // Chamando função para resposta aparecer no campo de resposta
    apareceResposta()
    }

}) 


// Função que colocará o valor dentro do campo resposta
function apareceResposta() {

    // Definindo variavel texto como o valor dentro do código
    texto = inputCodigo.value;
    // Variavel resposta chamando a função de validação do codigo
    resposta = validacao(texto)
    // Definindo que o valor do campo resposta receberá a variável resposta
    inputResposta.value = resposta;
    
}

//Função que irá fazer a validação de qual opção de criptografia foi selecionada
function validacao(entrada) {
    // Verifica qual a opção de criptografia
    if (base64.checked) {
        //Se for base de 64, crio uma variavel que chama a função de codificação para base de 64 com o texto de entrada como parametro
        var codificado = validaBase64(entrada)
        // Retornamos o codigo
        return codificado
    } else if (cifraCesar.checked) {
        //Se for cifra de cesar..
        var codificado = validaCifraCesar(entrada)

        return codificado
    }
}

// Função de criptografia da base de 64 que recebe texto de entrada como parametro
function validaBase64 (entrada) {
    // Crio uma variavel nova para a resposta
    var newResposta;
    // Se opção codificar for a selecionada
    if (codificar.checked) {
        // Variavel nova resposta recebe o texto de entrada codificado graças ao metodo btoa que existe no JavaScript
        newResposta = btoa(entrada)
        // Retorno newResposta
        return newResposta
    } else {
        // Se opção decodificar for a selecionada
        // Variavel nova resposta recebe o texto de entrada decodificada graças ao metodo atob que existe no JavaScript
        newResposta = atob(entrada)
        // Retorno newResposta
        return newResposta
    }
}

// Função que valida cifra de cesar recebendo o texto de entrada como parametro.
function validaCifraCesar(entrada) {
    var frase = entrada;
    frase = frase.toLowerCase();
    var incremento = parseInt(inputIncremento.value);
    if (codificar.checked) {
       var cod = codificaCesar(frase, incremento)
       return cod
    } else {
        var decode = decodificaCesar(frase, incremento)
        return decode
    }

}


// Funçao responsavel por validar as entradas
function validaEntradas () {
    // texto recebendo o valor que contem dentro do inputCodigo
    texto = inputCodigo.value;
    
    // Se tamanho do texto for igual a zero
    if (texto.length == 0) {
        alert ('Você precisa colocar alguma entrada!')
        return false
        // Se nem base de 64 nem cifra de Cesar estiverem selecionadas
    } else if (base64.checked == false && cifraCesar.checked == false) {
        alert ('Você precisa selecionar alguma opção de criptografia.')
        return false
        // Se nem codificar nem decodificar estão selecionadas
    } else if (codificar.checked == false && decodificar.checked == false) {
        alert('Você precisa selecionar se quer codificar ou decodificar')
        return false
    } else {
        // Caso todas as entradas sejam validas, retorno true.
        return true
    }
}

function codificaCesar(ent, inc) {
    var newResposta = ''
    var frase = ent;
    var fraseASC = ''
    var fraseOK = ''
    var deslocamento
    for (var i = 0; i < frase.length; i++) {
        if (frase[i] === ' ') {
            newResposta+= ' '
        } else {
            var asc = frase[i]
            asc = asc.charCodeAt(0)
            deslocamento = asc + inc;
            if (deslocamento >= 97 && deslocamento <= 122) {
                fraseASC = asc + inc
                fraseOK = String.fromCharCode(fraseASC)
            } else {
                fraseASC = ((((asc - 97) + inc) % 26) + 97)
                fraseOK = String.fromCharCode(fraseASC)
            }
            newResposta += fraseOK
        }
    }
    return newResposta
}

function decodificaCesar(ent, inc) {
    var newResposta = ''
    var frase = ent;
    var fraseASC = ''
    var fraseOK = ''
    var deslocamento
    for (var i = 0; i < frase.length; i++) {
        if (frase[i] === ' ') {
            newResposta+= ' '
        } else {
            var asc = frase[i]
            asc = asc.charCodeAt(0)
            deslocamento = asc - inc;
            if (deslocamento >= 97 && deslocamento <= 122) {
                fraseASC = asc - inc
                fraseOK = String.fromCharCode(fraseASC)
            } else {
                fraseASC = ((((asc - 122) - inc) % 26) + 122)
                fraseOK = String.fromCharCode(fraseASC)
            }
            newResposta += fraseOK
        }
    }
    return newResposta
}