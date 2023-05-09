let e_array = [];
$("#update").click(function() {
    const key = '85d1a1b23da244759c4175025230805'
    const city = 'Sinsheim'
    const settings = {
        async: true,
        crossDomain: true,
        url: `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=no`,
        method: 'GET',
    };
    $.ajax(settings).done(function (response) {
        //City Name
        let para1 = document.createElement("p")
        para1.setAttribute("id", "city");
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
        e_array = ["temperature", "city"];
    });
});


$("#reset").click(function() {
    document.getElementById("condition").src= "";
    document.getElementById("update").disabled = false;
    for(let id of e_array) {
        document.getElementById(id).remove()
        
    }
})
