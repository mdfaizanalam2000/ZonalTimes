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
    const url = `//worldtimeapi.org/api/timezone/${input}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.error) {
        document.querySelector("#error").innerText = data.error + "\nTry again with valid input format. You can copy and paste location from Browse More Timezones button:-)";
        document.querySelector(".spinner-border").style.display = "none";
        return;
    }
    setData(data);
}

function setData(data) {
    let datetime = data.datetime;
    let area = document.querySelector("#display");
    let myArray = datetime.split("T");
    document.querySelector(".spinner-border").style.display = "none";
    area.innerText = "Current time in " + data.timezone + " is: " + myArray[1].substring(0, 8) + " on " + myArray[0] + "\n" + "UTC Offset= " + data.utc_offset;
}

function toggleMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}
