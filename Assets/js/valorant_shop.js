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
        let search = `${data.displayName} agent trailer`
        let API_KEY = "AIzaSyBrV66SkYbpyjj7arQ40xNLMBKDyHElh3U"
        videoSearch(API_KEY, search, 1, element)
      }
    }
  });
});

function videoSearch(key, search, maxResults, parent) {
  const settings = {
    async: true,
    crossDomain: true,
    url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${search}&type=video&key=${key}`,
    method: "GET",
  };
  $.ajax(settings).done(function (response) {
    let id = response.items[0].id.videoId
    let iframe = document.createElement("iframe")
    iframe.src = `https://www.youtube.com/embed/${id}`
    iframe.height = "315"
    iframe.width = "512"
    parent.appendChild(iframe)
  });
}

let coll = document.getElementsByClassName("collapsible");
for (let i of coll) {
  i.addEventListener("click", function () {
    this.classList.toggle("active"); //how does it work??
    let content = this.nextElementSibling; //why does it work??
    if (content.style.display === "flex") {
      content.style.display = "none";
    } else {
      content.style.display = "flex";
    }
  });
}

