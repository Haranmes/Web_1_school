let btn;
let btn_grid;
const date = new Date();
const curr_day = date.getDate()
const curr_year = date.getFullYear()
const curr_month = date.toLocaleString('default', { month: 'long' });
if (date.getMonth() < 10) {
    var curr_month_num = `0${date.getMonth() + 1}`
} else {
    var curr_month_num = date.getMonth() + 1
}

//default
window.addEventListener("load", (event) => {
    document.getElementsByTagName("body")[0].style.backgroundImage = "linear-gradient(90deg, #5142f5, #8209e6)";
    const elements = document.getElementById("kalender")
    let header = document.createElement("h1")
    header.setAttribute("id", "curr_month")
    header.setAttribute("class", "date-center")
    let node = document.createTextNode(`${curr_month} ${curr_year}`)
    header.appendChild(node)
    elements.appendChild(header)
    let div = document.createElement("div")
    div.setAttribute("id", "grid-container")
    div.setAttribute("class", "grid-container mySlides")
    elements.appendChild(div)
    let element = document.getElementById("grid-container")
    var weekDays = getWeekDays("de-DE", curr_year)
    for (let day of weekDays) {
        var grid_item = document.createElement("div")
        grid_item.setAttribute("class", "grid-item")
        grid_item.setAttribute("id", day)
        grid_item.style = "font-size: 1vw;"
        node = document.createTextNode(day)
        grid_item.appendChild(node)
        element.appendChild(grid_item)
    }
    var days = new Date(curr_year, curr_month_num, 0).getDate()
    var days_last = new Date(curr_year, curr_month_num - 1, 0).getDate()
    let settings = {
        async: true,
        crossDomain: true,
        url: `https://openholidaysapi.org/PublicHolidays?countryIsoCode=DE&languageIsoCode=DE&validFrom=${curr_year}-01-01&validTo=${curr_year}-12-31&subdivisionCode=DE-BE`,
        method: "GET",
    };
    $.ajax(settings).done(function (response) {
        var count = 0;
        var to_day_new = new Date(`${curr_year}-${curr_month_num - 1}-${days_last}`).getDay()
        for (var day = 1; day <= to_day_new; day++) {
            grid_item = document.createElement("div")
            grid_item.setAttribute("class", "grid-item")
            grid_item.setAttribute("id", "empty")

            node = document.createTextNode(" ")
            grid_item.appendChild(node)
            element.appendChild(grid_item)
            count++;
        }
        
        for (var day = 1; day <= days; day++) {
            grid_item = document.createElement("div")
            grid_item.setAttribute("class", "grid-item")
            grid_item.setAttribute("id", "day_name")
            if (day == curr_day) {
                grid_item.style = "background-color: blue;"
            }
            node = document.createTextNode(day)
            grid_item.appendChild(node)
            if (day < 10) {
                var obje_selected = response.filter(item => item.startDate == `${curr_year}-${curr_month_num}-0${day}`)
            } else {
                var obje_selected = response.filter(item => item.startDate == `${curr_year}-${curr_month_num}-${day}`)
            }
            if (obje_selected.length != 0) {
                div = document.createElement("p")
                node = document.createTextNode(`${obje_selected[0].name[0].text}`)
                grid_item.style = "background-color: brown;"
                div.style = "font-size: 10px;"
                div.appendChild(node)
                grid_item.appendChild(div)
            }
            element.appendChild(grid_item)
            count++
        }
        let check = count
        while(check % 7 !== 0) {
            check++;
        }
        var coll_left = check - count 
        for (let colls = 0; colls < coll_left; colls++) {
            grid_item = document.createElement("div")
            grid_item.setAttribute("class", "grid-item")
            grid_item.setAttribute("id", "empty")

            node = document.createTextNode(" ")
            grid_item.appendChild(node)
            element.appendChild(grid_item)
        }
    });
    btn_grid = document.createElement("div")
    btn_grid.style = "display: flex; justify-content: center;"
    btn_grid.setAttribute("id", "btn_grid")
    elements.appendChild(btn_grid)

    btn = document.createElement("button")
    btn.type = "button"
    btn.setAttribute("id", "btn_back")
    btn.addEventListener("click", btn_back_click)
    node = document.createTextNode("Zurück")
    btn.appendChild(node)
    btn_grid.appendChild(btn)

    btn = document.createElement("button")
    btn.type = "button"
    btn.setAttribute("id", "btn_next")
    btn.addEventListener("click", btn_next_click)
    node = document.createTextNode("Nächster Monat")
    btn.appendChild(node)
    btn_grid.appendChild(btn)

});

function getWeekDays(locale, year) {
    var baseDate = new Date(Date.UTC(year, 0, 2)); // just a Monday
    var weekDays = [];
    for (i = 0; i < 7; i++) {
        weekDays.push(baseDate.toLocaleDateString(locale, { weekday: 'long' }));
        baseDate.setDate(baseDate.getDate() + 1);
    }
    return weekDays;
}

function btn_next_click() {
    showSlides(1)
}

function btn_back_click() {
    showSlides(-1)
}

let int_month = parseInt(curr_month_num)
let skips = 0;

function showSlides(n) {
    skips += n
    console.log(skips)
    let int_month = parseInt(curr_month_num)
    let new_date = new Date(`${curr_year}-0${int_month += skips}-1`)
    if (isValidDate(new_date)) {
        //keine ahnung wie ich jetzt heraudfinde ob ende monat oder anfang monat. macht zukunftsramez
        let new_month = new_date.toLocaleString('default', { month: 'long' });
        let new_year = new_date.getFullYear()
        header = document.querySelector("#curr_month")
        let textNode = header.firstChild;
        // change the value of the text node
        let month = new_date.getMonth() + 1
        console.log("month " + month)
        textNode.nodeValue = `${new_month} ${new_year}`;
        update(new_date, month, new_year)
    }
}

function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
}

function update(curr_date, curr_month_n, curr_year) {
    var count = 0;
    var days = new Date(curr_year, curr_month_n, 0).getDate()
    var days_last = new Date(curr_year, curr_month_n - 1, 0).getDate()
    let settings = {
        async: true,
        crossDomain: true,
        url: `https://openholidaysapi.org/PublicHolidays?countryIsoCode=DE&languageIsoCode=DE&validFrom=${curr_year}-01-01&validTo=${curr_year}-12-31&subdivisionCode=DE-BE`,
        method: "GET",
    };
    $.ajax(settings).done(function (response) {
        var to_day_new = new Date(`${curr_year}-${curr_month_n - 1}-${days_last}`).getDay()
        var grid_item_empty = document.querySelectorAll("#empty")
        grid_item_empty.forEach(element => element.remove());
        let element = document.getElementById("grid-container")
        for (var day = 1; day <= to_day_new; day++) {
            grid_item = document.createElement("div")
            grid_item.setAttribute("class", "grid-item")
            grid_item.setAttribute("id", "empty")

            node = document.createTextNode(" ")
            grid_item.appendChild(node)
            element.appendChild(grid_item)
            count++
        }
        var grid_item_set = document.querySelectorAll("#day_name")
        grid_item_set.forEach(element => element.remove());
        
        for (var day = 1; day <= days; day++) {
            grid_item = document.createElement("div")
            grid_item.setAttribute("class", "grid-item")
            grid_item.setAttribute("id", "day_name")
            if(curr_month_num == curr_month_n) {
                if (day == curr_day) {
                    grid_item.style = "background-color: blue;"
                }
            }
            node = document.createTextNode(day)
            grid_item.appendChild(node)
            if (day < 10) {
                var obje_selected = response.filter(item => item.startDate == `${curr_year}-${curr_month_n}-0${day}`)
            } else {
                var obje_selected = response.filter(item => item.startDate == `${curr_year}-${curr_month_n}-${day}`)
            }
            if (obje_selected.length != 0) {
                div = document.createElement("p")
                node = document.createTextNode(`${obje_selected[0].name[0].text}`)
                grid_item.style = "background-color: brown;"
                div.style = "font-size: 10px;"
                div.appendChild(node)
                grid_item.appendChild(div)
            }
            element.appendChild(grid_item)
            count++;
        }

        let check = count
        while(check % 7 !== 0) {
            check++;
        }
        var coll_left = check - count 

        for (let colls = 0; colls < coll_left; colls++) {
            grid_item = document.createElement("div")
            grid_item.setAttribute("class", "grid-item")
            grid_item.setAttribute("id", "empty")
            node = document.createTextNode(" ")
            grid_item.appendChild(node)
            element.appendChild(grid_item)
        }
    });
}


