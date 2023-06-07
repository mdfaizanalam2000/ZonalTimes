let a, date, time;
setInterval(() => {
    a = new Date();
    time = a.getHours() + ':' + a.getMinutes() + ':' + a.getSeconds();
    date = a.toLocaleDateString();
    document.getElementById("time").innerHTML = time + " on " + date;
}, 1000);

let search = document.getElementById("submit");
let clear = document.getElementById("clear");
search.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("display").innerText = "";
    document.querySelector("#error").innerText = "";
    showData();
})

clear.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("exampleInput1").value = "";
    document.getElementById("display").innerText = "";
    document.querySelector("#error").innerText = "";
})

async function showData() {
    let input = document.getElementById("exampleInput1").value;
    if (input == "") {
        alert("Input cannot be empty");
        return;
    }
    document.querySelector(".spinner-border").style.display = "block";
    // const url = `https://worldtimeapi.org/api/timezone/${input}`;
    const url = `https://api.timezonedb.com/v2.1/get-time-zone?key=GL60XVR136N4&format=json&by=zone&zone=${input}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.countryCode === "WF") {
        document.querySelector("#error").innerText = "Try again with valid input format. You can copy and paste location from Browse More Timezones button:-)";
        document.querySelector(".spinner-border").style.display = "none";
        return;
    }
    setData(data);
}

function setData(data) {
    let datetime = data.formatted;
    let area = document.querySelector("#display");
    let myArray = datetime.split(" ");
    let gmtOffset = Number(data.gmtOffset) / 3600;
    document.querySelector(".spinner-border").style.display = "none";
    area.innerText = "Current time in " + data.zoneName + " is: " + myArray[1] + " on " + myArray[0] + "\n" + "UTC Offset= " + gmtOffset+" hours";
}

function toggleMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}