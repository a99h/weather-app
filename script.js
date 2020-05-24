const themeButton = document.querySelector(".header__theme");
const elMain = document.querySelector(".main");
const elPlace = document.querySelector(".main__place");
const elDesc = document.querySelector(".main__description")
const elTime = document.querySelector(".main__time");
const elTemp = document.querySelector(".main__temperature");
const elImg = document.querySelector(".main__img");

let wbkey = '945c6fdfc2bb49089f29d75ea9178884';   //weatherbit.io key
let current = {};
let d = new Date();


if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(success, fail);
}

function success(position) {
    let latitude = position.coords.latitude.toFixed(2);
    let longitude = position.coords.longitude.toFixed(2);
    console.log(latitude, longitude);
    getData(latitude, longitude);
}

function fail() {
    elPlace.innerHTML = "<p class = 'fail'>Your browser doesn't support geolocation</p>"
}

function getData(lat, lon) {
    let api = `https://api.weatherbit.io/v2.0/current.data?lat=${lat}&lon=${lon}&key=${wbkey}`;
    console.log(api);

    fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            current.city = data.data[0].city_name;
            current.country = data.data[0].country_code;
            current.desc = data.data[0].weather.description;
            current.temp = Math.floor(data.data[0].temp);
            current.imgCode = data.data[0].weather.icon;
            current.img = `<img src="../img/${current.imgCode}.png">`;
        })
        .then(function() {
            elPlace.textContent = current.city + ", " + current.country;
            elDesc.textContent = current.desc;
            elTemp.innerHTML = current.temp + " &deg;C";
            elImg.innerHTML = current.img;
            changeTime();
        });
}

function changeTemp() {
    let tempLastIndex = elTemp.textContent.length - 1;
    
    if (elTemp.textContent.charAt(tempLastIndex) == "C") {
        elTemp.innerHTML = current.temp*9/5+32 + " &deg;F";
    }
    else if (elTemp.textContent.charAt(tempLastIndex) == "F") {
        elTemp.innerHTML = current.temp - 273 + " &deg;K";
    }
    else {
        elTemp.innerHTML = current.temp + " &deg;C";
    }
}

function changeTime() {
    let timeLastIndex = elTime.textContent.length -1;
    let pastAfterHours = d.getHours() - 12;;
    let pastAfterMinutes = d.getMinutes();
    

    if (elTime.textContent.charAt(timeLastIndex) == "M") {
        elTime.textContent = '';

        if (d.getHours() < 10) {
            elTime.textContent = "0";
        }
        elTime.textContent += d.getHours() + ":";
        

        if (d.getMinutes() < 10) {
            elTime.textContent += "0";
        }
        elTime.textContent += d.getMinutes();

    }

    else {
        elTime.textContent = '';

        if (d.getHours() > 12) {

            if (pastAfterHours < 10) {
                elTime.textContent = "0";
            }
            elTime.textContent += pastAfterHours + ":";

            if (pastAfterMinutes < 10 ) {
                elTime.textContent += "0";
            }
            elTime.textContent += pastAfterMinutes + " PM";
        }

        else if (d.getHours() == 12) {

            elTime.textContent += d.getHours() + ":";

            if (pastAfterMinutes < 10 ) {
                elTime.textContent += "0";
            }
            elTime.textContent += pastAfterMinutes + " PM";
        }

        else {

            if (d.getHours() < 10) {
                elTime.textContent = "0";
            }
            elTime.textContent += d.getHours() + ":";

            if (d.getMinutes() < 10 ) {
                elTime.textContent += "0";
            }
            elTime.textContent += d.getMinutes() + " AM";
        }
    }
}


themeButton.addEventListener("click", function() {
    if (themeButton.textContent == "Change to Light") {
        elMain.setAttribute("class", "light");
        themeButton.textContent = "Change to Night";
    }
    else {
        elMain.setAttribute("class", "night");
        themeButton.textContent = "Change to Light";
    }
}); 

elTime.addEventListener("click", changeTime, false);
elTemp.addEventListener("click", changeTemp, false);

