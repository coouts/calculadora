'use strict'

const display = document.getElementById("display");
const numeros = document.querySelectorAll("[id*=tecla]");
const operadores = document.querySelectorAll("[id*=operador]");

let novoNumero = true;
let operador;
let numeroAnterior;

const mapaTeclado = {
    '0'         : 'tecla0',
    '1'         : 'tecla1',
    '2'         : 'tecla2',
    '3'         : 'tecla3',
    '4'         : 'tecla4',
    '5'         : 'tecla5',
    '6'         : 'tecla6',
    '7'         : 'tecla7',
    '8'         : 'tecla8',
    '9'         : 'tecla9',
    '/'         : 'operadorDividir',
    '*'         : 'operadorMultiplicar',
    '-'         : 'operadorSubtrair',
    '+'         : 'operadorAdicionar',
    '='         : 'igual',
    'Enter'     : 'igual',
    'Backspace' : 'backspace',
    'c'         : 'limparDisplay',
    'Escape'    : 'limparCalculo',
    ','         : 'decimal'
};

// Impede que o calculo sejá feito apertando os operadores.
const operaçãoPentente = () => operador != undefined;

// Faz os calculos.
const calcular = () => {
    if(operaçãoPentente()){
        const numeroAtual = parseFloat(display.textContent.replace(',','.'));
        novoNumero = true;
        const resultado = eval (`${numeroAnterior}${operador}${numeroAtual}`);
        atualizarDisplay(resultado);
    }
}

// Atuliza o display, limpando o que tem ou concatecando números.
const atualizarDisplay = (texto) => {
    if(novoNumero){
        display.textContent = texto.toLocaleString('BR');
        novoNumero = false;
    }else{
        display.textContent += texto.toLocaleString('BR');
    }
};

// Insere um número no display.
const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);

// Seleciona o opereador que vai ser utilizado. 
const selecionarOperador = (evento) => {
    if(!novoNumero){
        calcular()
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent.replace(',','.'));
    }
}

// Faz com que as contas sejam efetudas apartir do clck no '='.
const ativarIgual = () => {
    calcular();
    operador = undefined;
};

// Limpa o display.
const limparDisplay = () => display.textContent = '';

// Limpar o calculo
const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}; 

// Remove os números da direta para esquerda
const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1);

// Inverte a aperação
const inverterSinal = () => {
    novoNumero = true;
    atualizarDisplay(display.textContent * -1);
};

// Confere se há um decimal no display
const existeDecimal = () => display.textContent.indexOf(',') != -1;

// confere se existe valor no display
const existeValor = () => display.textContent.length > 0;

// insere o decimal ou ','.
const inserirDecimal = () => {
    if(!existeDecimal()){
        if(existeValor()){
            atualizarDisplay(',');
        }else{
            atualizarDisplay('0,');
        }
    }
};

// Confere se a tecla que está sendo precionada está no mapa do teclado.
const mapearTeclado = (evento) => {
    const tecla = evento.key;
    
    const teclaPermitada = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;
    if(teclaPermitada()) document.getElementById(mapaTeclado[tecla]).click();
};

operadores.forEach(operador => operador.addEventListener("click", selecionarOperador));
numeros.forEach(numero => numero.addEventListener("click", inserirNumero));
document.getElementById("igual").addEventListener("click", ativarIgual);
document.getElementById("limparDisplay").addEventListener("click", limparDisplay);
document.getElementById("limparCalculo").addEventListener("click", limparCalculo);
document.getElementById("backspace").addEventListener("click", removerUltimoNumero);
document.getElementById("inverter").addEventListener("click", inverterSinal);
document.getElementById("decimal").addEventListener("click", inserirDecimal);
document.addEventListener('keydown', mapearTeclado);