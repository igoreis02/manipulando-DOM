const html = document.querySelector('html');
const botaoIniciar = document.querySelector('.app__card-primary-button');
const focobt = document.querySelector('.app__card-button--foco');
const curtobt = document.querySelector('.app__card-button--curto');
const longobt = document.querySelector('.app__card-button--longo');
const displayTempo = document.querySelector('#time');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPause = document.querySelector('#start-pause');
const iniciarOuPausarbt = document.querySelector('#start-pause span');
const iniciarOuPausarImg = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');

const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3')
musica.loop = true;
const play = new Audio('/sons/play.wav')
const pause = new Audio('/sons/pause.mp3')
const final = new Audio('/sons/beep.mp3')

let intervalorId = null

let duracaoFoco = 1500;
const duracaoDescansoCurto = 300;
const duracaoDescandoLongo = 900;

//change e um evento de chekbox tru or false 
musicaFocoInput.addEventListener('change', ()=>{
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

focobt.addEventListener('click', () => {
    duracaoFoco = 1500
    alteraContexto('foco');
    focobt.classList.add('active')
});

curtobt.addEventListener('click', () => {
    duracaoFoco = 300
    alteraContexto('descanso-curto');
    curtobt.classList.add('active')
});

longobt.addEventListener('click', () => {
    duracaoFoco = 900
    alteraContexto('descanso-longo');
    longobt.classList.add('active')
});


function alteraContexto (contexto){
    mostraTempo()
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    //esta removendo ativo com o for list 
    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case 'descanso-curto':
            titulo.innerHTML = `
                Que tal da uma respirada,<br>
                <strong class="app__title-strong">Faça uma pausa curta.</strong>`
            break;
        case 'descanso-longo':
            titulo.innerHTML = `
                Hora de volta à superficie,<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
        default:
            break;
    }
    
}

const contagemRegressiva = () => {
    if(duracaoFoco <= 0){
        zerar()
        final.play()
        return
    }
    duracaoFoco -= 1;
    mostraTempo()
}

startPause.addEventListener('click',iniciarOuPausar)

function iniciarOuPausar(){
    
    if(intervalorId){
        zerar()
        pause.play()
        return
    }
    play.play()
    intervalorId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarbt.textContent = 'Pausar'
    iniciarOuPausarImg.setAttribute('src','/imagens/pause.png')
}

function zerar() {
    clearInterval(intervalorId);
    intervalorId = null;
    iniciarOuPausarbt.textContent ='Começar'
    iniciarOuPausarImg.setAttribute('src','imagens/play_arrow.png')
}

function mostraTempo(){
    const tempo = new Date(duracaoFoco * 1000);
    const tempoFormatado =  tempo.toLocaleTimeString('pt-br', {minute:'2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostraTempo()