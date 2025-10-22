const destinationInput = document.getElementById("destination")
const dropdownContent = document.querySelector(".dropdown-content")
const checkIn = document.getElementById("check-in")
const checkOut = document.getElementById("check-out")
const form = document.querySelector(".form")
const adultNum = document.getElementById("adultNum")
const childNum = document.getElementById("childNum")
const roomNum = document.getElementById("roomNum")

// --- for destination dropdown
document.querySelectorAll('.dropdown-content a').forEach(item => {
    item.addEventListener('click',() =>  {
        const city = item.dataset.value?? item.textContent.trim();
        destinationInput.value = city;
    });
});
const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", () => {
    const search = searchInput.value.trim();
    if(!search){
        alert("Please enter a destination");
        return;
    }
})
// it's for destinition dropdown filter
destinationInput.addEventListener("keyup", function() {
    let filter = destinationInput.value.toLowerCase();
    let links = dropdownContent.getElementsByTagName("a")

    for (let i = 0; i < links.length; i++) {
        let text = links[i].innerHTML.toLowerCase()
        if (text.includes(filter)) {
            links[i].style.display = "" 
        }
        else{
            links[i].style.display = "none"
        }
    }
})
// I use this bcz when I use the scroll event, I want to change the navbar style based on the scroll position.

window.addEventListener('scroll', function () {
    const navbar = this.document.getElementById("mainNav");
    if (this.window.scrollY > 50) {
        navbar.classList.add('scrolled')
        navbar.style.backgroundColor = "white"
    } else {
        navbar.classList.remove('scrolled')
        navbar.style.backgroundColor = "transparent"
    }
})
// this is for chake out and chake in value to control it
checkOut.addEventListener("change", function () {
    let inDate = new Date(checkIn.value);
    let outDate = new Date(checkOut.value);
    if (outDate <= inDate) {
        alert("Check-Out date must be after Check-In date");
        checkOut.value = "";
    }
})
// its a alert for form section 
form.addEventListener("submit", function (e) {
    e.preventDefault()

    let destination = destinationInput.value.trim()
    if (!destination) {
        alert("Please enter a destination")
        return;
    }

    if (!checkIn.value || !checkOut.value) {
        alert("Please select both Check-In and Check-Out dates")
        return;
    }

    let url = `destinations.html?city=${encodeURIComponent(destination)}&checkIn=${checkIn.value}&checkOut=${checkOut.value}`;
    window.location.href = url;
})

// in here work on adults label to make it better

let adult = 2
let child = 0
let room = 1

document.getElementById("adultPlus").onclick = function(){
    adult++;
    adultNum.innerText = adult
}
document.getElementById("adultMinus").onclick = function (){
  if (adult > 1) {
    adult--;
    adultNum.innerText = adult;
  }
}
document.getElementById("childPlus").onclick = function(){
    child++;
    childNum.innerText = child;
}
document.getElementById("childMinus").onclick = function(){
    if(child > 0){
        child--;
        childNum.innerText = child;
    }
}
document.getElementById("roomPlus").onclick = function(){
    room++;
    roomNum.innerText = room;
}
document.getElementById("roomMinus").onclick = function(){
    if(room > 1){ 
        room--;
        roomNum.innerText = room;
    }
}
document.getElementById("doneBtn").onclick = function(){
    document.getElementById("guest-summary").innerText =
      adult + " Adults, " + child + " Children, " + room + " Room(s)";
}
// dark mode 
let darkMode = localStorage.getItem('darkmode')
const themeSwitch = document.getElementById("theme-switch")

const enableDarkmode = () => {
    document.body.classList.add("darkmode")
    localStorage.setItem("darkmode", "active")
    darkMode = "active"
}
const disableDarkmode = () => {
    document.body.classList.remove("darkmode")
    localStorage.setItem("darkmode", null)
}
if (themeSwitch) {
    themeSwitch.addEventListener("click", () => {
        darkMode = localStorage.getItem("darkmode")
        if (darkMode !== "active") {
            enableDarkmode()
        } else {
            disableDarkmode()
        }
    })
} else {
    console.warn("theme-switch element not found in DOM")
}

let savedHotels = [];

// for heart to save my next trip
function toggleSave(element) {
    element.classList.toggle("active");
    let icon = element.querySelector("i");
    let hotelTitle = element.closest(".hotel-card")
        .querySelector(".hotel-title").innerText;

    if (element.classList.contains("active")) {
        icon.classList.remove("far");
        icon.classList.add("fas");
        if (!savedHotels.includes(hotelTitle)) {
            savedHotels.push(hotelTitle);
        }
    } else {
        icon.classList.remove("fas");
        icon.classList.add("far");
        savedHotels = savedHotels.filter(item => item !== hotelTitle);
    }
    updateSavedList();
}
// this is save for my netx trip JS part 
function updateSavedList() {
    const savedList = document.getElementById("savedHotelsList");
    savedList.innerHTML = "";
    if (savedHotels.length === 0) {
        savedList.innerHTML = "<li class='empty'>there are no saved hotels</li>";
        return;
    }
    savedHotels.forEach(hotel => {
        const li = document.createElement("li");
        li.textContent = "🏨 " + hotel;
        savedList.appendChild(li);
    });
}
const priceButtons = document.querySelectorAll(".price-btn")
priceButtons.forEach(button => {
    button.addEventListener("click", function() {
        const hotelTitle = this.closest(".hotel-card")
            .querySelector(".hotel-title").innerText;
        const Url = `destination.html?hotel=${encodeURIComponent(hotelTitle)}&checkin=2025-10-01&checkout=2025-10-05`;
        window.location.href = "destinations.html#";
    });
});
const sections = document.querySelectorAll('.move-up');

  window.addEventListener('scroll', () => {
    sections.forEach(sec => {
      const move = sec.getBoundingClientRect();
      if (move.top < window.innerHeight - 100) {
        sec.classList.add('show');
      }
    });
  });

// fetch("https://jsonplaceholder.typicode.com/users")
//   .then((response) => response.json())
//   .then((users) => {
//     const userSection = document.getElementById("userProfiles");
//     if (userSection) {
//       users.slice(0, 3).forEach((user) => {
//         let card = document.createElement("div");
//         card.className = "user-card";
//         card.innerHTML = `
//           <div class="user-info">
//             <h3>${user.name}</h3>
//           </div>
//           <div class="user-detail"><strong>Username:</strong> ${user.username}</div>
//           <div class="user-detail"><strong>Email:</strong> ${user.email}</div>
//           <div class="user-detail"><strong>City:</strong> ${user.address.city}</div>
//           <div class="user-detail"><strong>phone:</strong> ${user.phone}</div>
//         `;
//         userSection.appendChild(card);
//       });
//     }
//   });

// in here I use both methods .then 👆 and async await 👇

const fetchAPI = async () =>{
    try{
        let res = await fetch("https://jsonplaceholder.typicode.com/users")
        let user = await res.json()

        const userSection = document.getElementById("userProfiles")
        if (userSection){
            user.slice(0, 3).forEach(user => {
                const card = document.createElement("div")
                card.className = "user-card"
                card.innerHTML = `<div class="user-info"><h3>${user.name}</h3></div>
               <div class="user-detail"><strong>Username:</strong> ${user.username}</div>
               <div class="user-detail"><strong>Email:</strong> ${user.email}</div>
               <div class="user-detail"><strong>City:</strong> ${user.address.city}</div>
                <div class="user-detail"><strong>Phone:</strong> ${user.phone}</div>`;
                userSection.appendChild(card)
            })
        }
    } catch (error) {
        console.error(error, "an error happend, try again later")
    }
}
fetchAPI();
// contact form alert
const contactForm = document.getElementById("formContact");
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

            alert('Your message was sent successfully!');
        contactForm.reset();
    });