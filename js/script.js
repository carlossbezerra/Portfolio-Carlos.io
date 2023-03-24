var home = document.getElementsByClassName("home");
var logo = document.getElementsByClassName("logo");
var hamburguer = document.getElementsByClassName("hamburguer");
var menu = document.getElementsByClassName("menu");
var menuItens = document.getElementsByClassName("item");
var sobre = document.getElementsByClassName("sobre");
var digital = document.getElementsByClassName("digital");
var grafico = document.getElementsByClassName("grafico");
var diagramacao = document.getElementsByClassName("diagramacao");
var jobs = document.getElementsByClassName("jobs");
var jobCard = document.getElementsByClassName("job-card");
var changeBtnTop = document.getElementsByClassName("change-btn-top");
var changeBtnBottom = document.getElementsByClassName("change-btn-bottom");
var sobrePage = document.getElementsByClassName("sobre-page");
var skills = document.getElementsByClassName("skills");
var msgGroup = document.getElementsByClassName("msg-group");
var openedCard;
var currentScrollBar = 0;
var currentJobType = "all";
var currentCardId = "";
var openCardState = false;

window.addEventListener('DOMContentLoaded', (event) => {
    let preLoad = document.getElementsByClassName("pre-load");
    let content = document.getElementsByClassName("content");

    preLoad[0].style.display = "none";
    content[0].style.display = "block";
});

//Menu mobile
const mobileMenu = () => {
    
    logo[0].style.display = "none";

    hamburguer[0].children[0].src = "img/icones/exit.svg";
    hamburguer[0].style.marginTop = "20px";
    hamburguer[0].style.marginBottom = "20px";
    
    setTimeout(() => {

        menu[0].style.display = "flex";
        menu[0].style.flexDirection = "column";
        menu[0].style.justifyContent = "space-between"
        menu[0].style.marginBottom = "30px";

    }, 500);  

    home[0].style.flexDirection = "column";
    home[0].style.justifyContent = "flex-start";
    home[0].style.height = "220px";

    sobre[0].style.textAlign = "center";
    sobre[0].style.margin = "0 auto";
    sobre[0].style.marginBottom = "10px";

    digital[0].style.textAlign = "center";
    digital[0].style.margin = "0 auto"; 
    digital[0].style.marginBottom = "10px";

    grafico[0].style.textAlign = "center";
    grafico[0].style.margin = "0 auto";
    grafico[0].style.marginBottom = "10px";
    
    diagramacao[0].style.textAlign = "center";
    diagramacao[0].style.margin = "0 auto";

    

    hamburguer[0].setAttribute("onclick","closedMenu()");

}

//Retorna à página inicial
const closedMenu = () => {
    
    menu[0].style.display = "none";

    home[0].style.height = "60px";
    home[0].style.flexDirection = "row";
    home[0].style.justifyContent = "space-between";
    home[0].style.alignItens = "center";
    
    hamburguer[0].children[0].src = "img/icones/menu.svg";
    hamburguer[0].style.marginTop = "0";
    hamburguer[0].style.marginBottom = "0";

    logo[0].style.display = "flex";

    hamburguer[0].setAttribute("onclick","mobileMenu()");
}

//Informações dos Job Cards 


//Clonando job cards
cards.map(job => { 
        const clone = jobCard[0].cloneNode(true);
        clone.setAttribute("id", job.id);
        clone.setAttribute("jobType", job.jobType);
        clone.querySelector("img").src = job.src;
        jobs[0].appendChild(clone);
});        
    
jobCard[0].remove();

//Função para abrir um card
let openCard = (cardId) => {

    changeBtnTop[0].style.display = "flex";
    changeBtnTop[0].style.justifyContent = "space-between";

    changeBtnBottom[0].style.display = "flex";
    changeBtnBottom[0].style.justifyContent = "space-between";
    
    openedCard = document.getElementById(cardId);

    let cardInfo = document.createElement("div");
    let infoTitle = document.createElement("h2");
    let infoDescription = document.createElement("p");
    let infoJobClass = document.createElement("p");
    let infoTools = document.createElement("p");
    let info = cards.find((card) => card.id == cardId);
    let imgGroup = document.createElement("div");

    //Voltando ao início da página 
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });

    viewCardById(cardId);

    //Criando a área de informações do projeto
    jobs[0].style.backgroundColor = "#dfdfdf";
    jobs[0].style.borderRadius = "5px";

    cardInfo.appendChild(infoTitle);
    cardInfo.appendChild(infoDescription);
    cardInfo.appendChild(infoJobClass);
    cardInfo.appendChild(infoTools);

    cardInfo.setAttribute("class","card-info");
    infoTitle.setAttribute("class","info-title");
    infoDescription.setAttribute("class","info-description");
    infoJobClass.setAttribute("class","info-job-class");
    infoTools.setAttribute("class","info-tools");

    infoTitle.innerHTML = info.title;
    infoDescription.innerHTML = info.description;
    infoJobClass.innerHTML = info.jobClass.reduce(function (prev,classItem) {
        return prev + '<br>' + classItem;
    }, "<b>Tipos de Trabalho:</b>");
    infoTools.innerHTML = info.tools.reduce(function (prev,toolItem) {
        return prev + '<br>' + toolItem;
    }, "<b>Ferramentas Utilizadas:</b>");

    //Criando grupo de outras imagens do projeto  
    for (const src_img of info.src_group) {
        let img = document.createElement("img");

        img.src = src_img;
        img.style.width = "100%";
        img.style.marginBottom = "20px";
        imgGroup.appendChild(img);
    }

    openedCard.appendChild(cardInfo);
    openedCard.appendChild(imgGroup);

    openedCard.style.display = "flex";
    
    openedCard.setAttribute("onclick","");
    openedCard.setAttribute("class","job-opened-card");

};

//Mostra o card aberto.
let viewCardById = (cardId) => {

    //Seta o card aberto
    currentCardId = cardId;

    for (const card of jobCard) {
        
        if(card.id != cardId){
            card.style.display = "none";
        }

    }

};

//Mostra todos os cards da mesma categoria.
let viewCardByjobType = (jobType) => {
    
    currentJobType = jobType;

    //Esconde página Sobre se estiver aberta
    sobrePage[0].style.display = "none";
    changeBtnTop[0].style.display = "none";
    changeBtnBottom[0].style.display = "none";
    jobs[0].style.display = "flex";

    //Esconde card aberto anteriormente se houver.
    if(openedCard){

        openedCard.removeChild(openedCard.children[1]);
        openedCard.removeChild(openedCard.children[1]);

        openedCard.setAttribute("onclick","openCard(this.id)");
        openedCard.setAttribute("class","job-card");
        openedCard = undefined;
    }

    jobs[0].style.backgroundColor = "white";
    jobs[0].style.borderRadius = "0";

    for (const card of jobCard) {
        
        card.style.display = "flex";

        if(card.getAttribute("jobtype") != jobType){
            card.style.display = "none";
        }

    }
    
};

//Navegando pelos trabalhos com botões de navegação
let changeJob = (direction) => {

    let id = openedCard.id;

    if(direction == "left"){
        if(id >= 2){
            id--;
        }
        
        openedCard.style.display = "none";
        openedCard.children[1].remove();
        openedCard.children[1].remove();
        openedCard.setAttribute("onclick","openCard(this.id)");
        openedCard.setAttribute("class","job-card");        
        openCard(id);
    }
    else if(direction == "right"){
        if(id < cards.length){
            id++;
        }

        openedCard.style.display = "none";
        openedCard.children[1].remove();
        openedCard.children[1].remove();
        openedCard.setAttribute("onclick","openCard(this.id)");
        openedCard.setAttribute("class","job-card");
        openCard(id);
    }

};

//Página Sobre
let viewAbout = () => {

    if(openedCard){
        openedCard.setAttribute("onclick","openCard(this.id)");
        openedCard.setAttribute("class","job-card");
    }
    

    changeBtnTop[0].style.display = "none";
    changeBtnBottom[0].style.display = "none";

    jobs[0].style.display = "none";
    sobrePage[0].style.display = "flex";

    sobrePage[0].style.marginTop = "50px";
    sobrePage[0].style.marginLeft = "10%";
    sobrePage[0].style.marginRight = "10%";

};

//Informações das Skills
const infoSkills = [{
    name: "Photoshop",
    level: 4
    },
    {
        name: "InDesign",
        level: 4
    },
    {
        name: "Illustrator",
        level: 3
    },
    {
        name: "Premiere Pro",
        level: 2
    },
    {
        name: "Adobe XD",
        level: 1
    },
    {
        name: "HTML 5",
        level: 3
    },
    {
        name: "CSS 3",
        level: 3
    },
    {
        name: "Javascript",
        level: 3
    },
    {
        name: "React",
        level: 1
    },
    {
        name: "Database/ SQL",
        level: 2
    }
];

//Clonando as skills
infoSkills.map(skill => { 

    let skillItem = document.getElementsByClassName("skill-item");

    const clone = skillItem[0].cloneNode(true);
    
    clone.children[0].innerHTML = skill.name;

    for(let i = 0; i < skill.level; i++) {
        clone.children[1].children[i].style.backgroundColor = "#707070";    
    }

    skills[0].appendChild(clone);
});

//Removendo o molde de skill
skills[0].children[1].remove();



msg.map(msg => { 

    let msgCard = document.createElement("div");
    let msgText = document.createElement("p");
    let msgClient = document.createElement("h4");
    let msgProject = document.createElement("h5");

    msgCard.setAttribute("class","msg-card");
    msgText.setAttribute("class","msg-text");
    msgClient.setAttribute("class","msg-client");
    msgProject.setAttribute("class","msg-project");

    msgText.innerHTML = msg.mensagem;
    msgClient.innerHTML = "Cliente: " + msg.cliente;
    msgProject.innerHTML = "Projeto: " + msg.projeto;
    
    msgCard.appendChild(msgText);
    msgCard.appendChild(msgClient);
    msgCard.appendChild(msgProject);

    msgGroup[0].appendChild(msgCard);    
});