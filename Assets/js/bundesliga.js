let y = 0;
let x = 0;
let count = 1;
const element = document.getElementById("bundesliga");
window.addEventListener("load", (event) => {
  const date = new Date();
  let year = date.getFullYear() - 1;
  console.log(year);
  let settings = {
    async: true,
    crossDomain: true,
    url: `https://api.openligadb.de/getbltable/bl1/${year}`,
    method: "GET",
  };
  $.ajax(settings).done(function (response) {
    console.log(response);
    for(let data of response) {
        x = document.getElementById('bundesliga').insertRow(count)
        y = x.insertCell(0)
        y.innerHTML = count
        count++
        y = x.insertCell(1)
        y.innerHTML = data.teamName
        y = x.insertCell(2)
        y.innerHTML = data.points
    }
  });
});
