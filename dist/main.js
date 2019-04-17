let apiManager = new ApiManager()
let renderer = new Renderer()


const loadPage = async function () {
    await apiManager.getDataFromDB()
    await apiManager.getAutoCompleteFromDB()
    renderer.render(apiManager)
}

const querySearch = async function () {
    let query = $("#container").find("input").val()
    await apiManager.addAutoComplete(query)
    console.log(query)
    if (query != "") {

        
        await apiManager.getSongID(query)
        renderer.render(apiManager)
    }
}

const querySave = async function () {
    let id = $("#container").closest(".songCard").attr('id')
    console.log(id)
    await apiManager.saveSong(id)
    loadPage()
}

const queryDelete = async function () {
    let id = $("#container").find(".songCard").attr('id')
    console.log(id)
    await apiManager.removeSong(id)
    loadPage()
}



// -------------------------------------------------------


function autocomplete(inp, arr) {

    var currentFocus;
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function (e) {
                    inp.value = this.getElementsByTagName("input")[0].value;

                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {

            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) {

            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {

        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

autocomplete(document.getElementById("myInput"), apiManager.history);



// -------------------------------------------------------


loadPage()