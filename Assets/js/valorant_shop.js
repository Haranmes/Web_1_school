let para = "";
let img = "";
let header = "";
let node;
let element = "";
const elements = document.getElementById("agents");
window.addEventListener("load", async (event) => {
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
        element = document.createElement("div");
        element.setAttribute("class", "agent");
        element.style.backgroundImage= `linear-gradient(#${data.backgroundGradientColors[0]}, #${data.backgroundGradientColors[3]})`
        elements.appendChild(element);
        img = document.createElement("img");
        img.src = data.displayIconSmall;
        img.width = "112";
        element.appendChild(img);

        header = document.createElement("h1");
        header.setAttribute("id", "name");
        node = document.createTextNode(data.displayName);
        header.appendChild(node);
        element.appendChild(header);

        para = document.createElement("p");
        para.setAttribute("id", "description");
        node = document.createTextNode(data.description);
        para.appendChild(node);
        element.appendChild(para);
        


      }
    }
  });
});
