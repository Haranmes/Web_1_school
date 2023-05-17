window.addEventListener('load', (event) => {
    const date = new Date();
    const year = date.getFullYear();
    console.log(year)
    const day = 1
    const settings = {
        async: true,
        crossDomain: true,
        url: `https://api.openligadb.de/getmatchdata/bl1/${year}/1`,
        method: 'GET',
    };
    $.ajax(settings).done(function (response) {
        console.log(response)
        /*let para1 = document.createElement("p")
        para1.setAttribute("id", "punkte");
        let node1 = document.createTextNode(response.location.name);
        para1.appendChild(node1);
        let element1 = document.getElementById("name");
        element1.appendChild(para1);
        //Temperature
        para1 = document.createElement("p");
        para1.setAttribute("id", "temperature");
        node1 = document.createTextNode(`${response.current.temp_c}°C`);
        para1.appendChild(node1);
        element1 = document.getElementById("temp");
        element1.appendChild(para1);
        //condition
        document.getElementById("condition").src=response.current.condition.icon
        //console.log(response);
        document.getElementById("update").disabled = true;
        e_array = ["temperature", "city"];*/
    });
});