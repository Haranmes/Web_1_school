var startDates = [];
var endDate = [];
var m = [];
var d = [];
var holiday = [];
window.addEventListener("load", (event) => {
    document.getElementsByTagName("body")[0].style.backgroundImage = "linear-gradient(90deg, #5142f5, #8209e6)";
    const date = new Date();
    const curr_day = date.getDate()
    const curr_year = date.getFullYear()
    const curr_month = date.toLocaleString('default', { month: 'long' });
    if (date.getMonth() < 10) {
        var curr_month_num = `0${date.getMonth() + 1}`
    } else {
        var curr_month_num = date.getMonth() + 1
    }
    console.log(curr_month_num)
    const elements = document.getElementById("kalender")
    let header = document.createElement("h1")
    header.setAttribute("id", "curr_month")
    header.setAttribute("class", "date-center")
    let node = document.createTextNode(`${curr_month} ${curr_year}`)
    header.appendChild(node)
    elements.appendChild(header)
    let div = document.createElement("div")
    div.setAttribute("id", "grid-container")
    div.setAttribute("class", "grid-container")
    elements.appendChild(div)
    const element = document.getElementById("grid-container")
    var weekDays = getWeekDays("de-DE", curr_year)
    for (let day of weekDays) {
        var grid_item = document.createElement("div")
        grid_item.setAttribute("class", "grid-item")
        grid_item.setAttribute("id", "day")
        grid_item.style = "font-size: 1vw;"
        node = document.createTextNode(day)
        grid_item.appendChild(node)
        element.appendChild(grid_item)
    }
    let days = new Date(curr_year, curr_year, 0).getDate()
    let settings = {
        async: true,
        crossDomain: true,
        url: `https://openholidaysapi.org/PublicHolidays?countryIsoCode=DE&languageIsoCode=DE&validFrom=${curr_year}-01-01&validTo=${curr_year}-12-31&subdivisionCode=DE-BE`,
        method: "GET",
    };
    $.ajax(settings).done(function (response) {
        for (let day = 1; day <= days; day++) {
            grid_item = document.createElement("div")
            grid_item.setAttribute("class", "grid-item")
            grid_item.setAttribute("id", "day_name")

            if (day == curr_day) {
                grid_item.style = "background-color: blue;"
            }
            node = document.createTextNode(day)
            grid_item.appendChild(node)

            let obje_selected = response.filter(item => item.startDate == `${curr_year}-${curr_month_num}-${day}`)
            if (obje_selected.length != 0) {
                console.log(obje_selected[0].name[0].text)
                div = document.createElement("p")
                node = document.createTextNode(`${obje_selected[0].name[0].text}`)
                grid_item.style = "background-color: brown;"
                div.style = "font-size: 10px;"
                div.appendChild(node)
                grid_item.appendChild(div)
            }
            element.appendChild(grid_item)
        }
    });
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

window.addEventListener("scroll", function() {
    
})


