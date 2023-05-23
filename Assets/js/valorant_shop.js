let para = "";
let img = "";
let header = "";
let node;
let element = "";
let div = "";
let table = "";
let y = 0;
let x = 0;
let yt;
const elements = document.getElementById("agents");



window.addEventListener("load", (event) => {
  document.getElementsByTagName("body")[0].style.backgroundColor = "black";
  const settings = {
    async: true,
    crossDomain: true,
    url: "https://valorant-api.com/v1/agents",
    method: "GET",
  };
  $.ajax(settings).done(function (response) {
    console.log(response.data);
    for (let data of response.data) {
      if (data.isPlayableCharacter == true) {
        //Creates the Parent div for Agent cards
        element = document.createElement("div");
        element.setAttribute("class", "agent");
        element.style.backgroundImage = `linear-gradient(#${data.backgroundGradientColors[0]}, #${data.backgroundGradientColors[3]})`;
        element.style.padding = "20px";
        elements.appendChild(element);

        //inserts Image of Agent
        img = document.createElement("img");
        img.src = data.displayIconSmall;
        img.width = "112";
        element.appendChild(img);

        //Displays Name of Agent
        header = document.createElement("h1");
        header.setAttribute("id", "name");
        node = document.createTextNode(data.displayName);
        header.appendChild(node);
        element.appendChild(header);

        //Displays description of Agent
        para = document.createElement("p");
        para.setAttribute("id", "description");
        node = document.createTextNode(data.description);
        para.appendChild(node);
        element.appendChild(para);

        //Role div
        div = document.createElement("div");
        div.setAttribute("class", "role");
        node = document.createTextNode("Role");
        div.appendChild(node);
        element.appendChild(div);

        //Icon of role
        img = document.createElement("img");
        img.setAttribute("class", "role-icon");
        img.src = data.role.displayIcon;
        img.width = "20";
        element.appendChild(img);

        //role description
        para = document.createElement("p");
        para.setAttribute("class", "tooltiptext");
        para.style.paddingTop = "5%";
        node = document.createTextNode(data.role.description);
        para.appendChild(node);
        element.appendChild(para);

        //youtube video embed
        let search = data.displayName
        let API_KEY = "AIzaSyDQRccpeIgVBH01edFJMHayLI_2njHPv5E"
        videoSearch(API_KEY, search,1)
      }
    }
  });
});

function videoSearch(key, search, maxResults) {
  $.get(`https://www.googleapis.com/youtube/v3/search?key=${key}&type=video&part=snippet&maxResult=${maxResults}&q=${search}`, function(response) {
    console.log(data)
  })
}
let coll = document.getElementsByClassName("collapsible");

for (let i of coll) {
  i.addEventListener("click", function () {
    this.classList.toggle("active");
    let content = this.nextElementSibling;
    if (content.style.display === "flex") {
      content.style.display = "none";
    } else {
      content.style.display = "flex";
    }
  });
}
