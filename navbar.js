let li = "";
let a;
window.addEventListener("load", (event) => {
    let pages = {
        0: {
            path: "/pages/fussball.html",
            name: "Fußball Bundesliga Tabelle"
        },
        1: {
            path: "/pages/images.html",
            name: "Image Generation with DALL-E"
        },
        2: {
            path: "/pages/kalender.html",
            name: "Kalender"
        },
        3: {
            path: "/pages/valorant.html",
            name: "Current Valorant Data"
        },
        4: {
            path: "/",
            name: "Api and Weather"
        }
    }

    Object.defineProperty(pages, Symbol.iterator, {
        enumerable: false,
        writable: false,
        configurable: true,
        value: function () {
            let _this = this;
            let idx = 0;
            let keysArr = Object.keys(_this);
            return {
                next: () => {
                    return {
                        value: _this[keysArr[idx++]],
                        done: (idx > keysArr.length)
                    };
                }
            };
        }
    })

    let curr_page = window.location.pathname
    const elements = document.getElementById("nav")
    
    for (let data of pages) {
        //if (curr_page != data.path) {
            let name = data.name
            li = document.createElement("li")
            li.setAttribute("class", "nav-item")
            a = document.createElement("a")
            a.setAttribute("class", "nav-link")
            a.href = data.path
            node = document.createTextNode(name)
            a.appendChild(node)
            li.appendChild(a)
            elements.appendChild(li)
        //}
    }
});