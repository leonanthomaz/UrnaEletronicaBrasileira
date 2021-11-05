//controle de interface
let seuVotoPara = document.querySelector(".bloco-1-texto1 span");
let cargo = document.querySelector(".bloco-1-texto2 span");
let descricao = document.querySelector(".bloco-1-texto4");
let aviso = document.querySelector(".bloco-2");
let lateral = document.querySelector(".bloco-1-right");
let numeros = document.querySelector(".bloco-1-texto3");

//variaveis de ambiente
let etapaAtual = 0;
let Numero = "";
let VotoEmBranco = false;
//Contagem de votos em array
let votos = [];

//Inicialização do processo
function comecarEtapa(){
    let etapa = etapas[etapaAtual];

    let numeroHTML = "";
    Numero = "";
    VotoEmBranco = false;

    //incremento de espaço nos números
    for(let i=0; i<etapa.numeros; i++){
        if(i === 0){
            numeroHTML += "<div class='numero pisca'></div>";
        }else{
            numeroHTML += "<div class='numero'></div>";
        }
    }

    seuVotoPara.style.display = "none";
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = "";
    aviso.style.display = "none";
    lateral.innerHTML = "";
    numeros.innerHTML = numeroHTML;
}

//percorrendo candidatos no array
function atualizaInterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === Numero){
            return true;
        }
        else{
            return false;
        }
    });
    //Candidatos aparecendo na tela (acrescentei o vice-presidente)
    if(candidato.length > 0){
        candidato = candidato[0];
        seuVotoPara.style.display = "block";
        aviso.style.display = "block";
        if(candidato.nomeVice){
            descricao.innerHTML = `
            Nome: ${candidato.nome}<br>
            Partido: ${candidato.partido}<br>
            Vice: ${candidato.nomeVice}<br>
            `;
        }else{
            descricao.innerHTML = `
            Nome: ${candidato.nome}<br>
            Partido: ${candidato.partido}<br>
            `;
        }
        
        let fotosHTML = "";
        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotosHTML += ` 
                <div class="bloco-1-img-small">
                <img src="${candidato.fotos[i].url}" alt="">
                <span>${candidato.fotos[i].legenda}</span>
                </div>`;
            }else{
                fotosHTML += ` 
                <div class="bloco-1-img">
                <img src="${candidato.fotos[i].url}" alt="">
                <span>${candidato.fotos[i].legenda}</span>
                </div>`;
            }
           
        }
        lateral.innerHTML = fotosHTML;

    }else{
        seuVotoPara.style.display = "block";
        aviso.style.display = "block";
        descricao.innerHTML = "<div class='aviso--grande pisca'>VOTO NULO</div>";
    }

    //console.log("Candidato", candidato);
}

//Funções
function clicou(n){
    let ElNumero = document.querySelector(".numero.pisca");
    if(ElNumero !== null){
        ElNumero.innerHTML = n;
        Numero = `${Numero}${n}`;
        ElNumero.classList.remove("pisca");
        if(ElNumero.nextElementSibling !== null){
        ElNumero.nextElementSibling.classList.add("pisca");
        }else{
            atualizaInterface();
        }
        //Alerta sonoro com 1 bip
        (new Audio('audio/bip1.mp3')).play()
    }
}
function Branco(){
    Numero = "";
    VotoEmBranco = true;
    seuVotoPara.style.display = "block";
    aviso.style.display = "block";
    numeros.innerHTML = "";
    descricao.innerHTML = "<div class='aviso--grande pisca'>VOTO EM BRANCO</div>";
    lateral.innerHTML = "";

    //Alerta sonoro com 1 bip
    (new Audio('audio/bip1.mp3')).play()
}

function Corrige(){
    comecarEtapa();

    //Alerta sonoro com 2 bips
    (new Audio('audio/bip2.mp3')).play()
}
function Confirma(){
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false

    if(VotoEmBranco === true){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
        //Alerta sonoro de finalização
        (new Audio('audio/confirma.mp3')).play()

    }else if(Numero.length === etapa.numeros){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: Numero
        });
        //Alerta sonoro de finalização
        (new Audio('audio/confirma.mp3')).play()
    }

    if(votoConfirmado){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa();
        }else{
            document.querySelector(".tela").innerHTML = "<div class='aviso--gigante pisca'>FIM</div>";
            //Alerta sonoro de finalização
            (new Audio('audio/confirma.mp3')).play()
            console.log(votos);
            
        }
        //console.log(etapas[etapaAtual])
    }
    
}

comecarEtapa();