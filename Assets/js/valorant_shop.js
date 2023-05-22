let para = "";
let img = "";
let header = "";
let node;
let element = "";
let div = "";
let table = "";
let y = 0;
let x = 0;
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
        element.style.padding="20px"
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
        
        div = document.createElement("div");
        div.setAttribute("class", "role")
        node = document.createTextNode("Role")
        div.appendChild(node)
        element.appendChild(div);

        img = document.createElement("img")
        img.setAttribute("id", "role-img")
        img.src=data.role.displayIcon
        img.width="20";
        element.appendChild(img)

        para = document.createElement("p")
        para.setAttribute("id", "description")
        para.style.paddingTop="5%"
        node = document.createTextNode(data.role.description)
        para.appendChild(node)
        element.appendChild(para)

        table = document.createElement("table")
        table.setAttribute("class", "abilities")
        x = table.insertRow();
        for(let ability of data.abilities) {
          y = x.insertCell(0)
          header = document.createElement("td")
          node = document.createTextNode(ability.slot)
          header.appendChild(node)
          y.appendChild(header)

        }
      }
    }
  });
});
