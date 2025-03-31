const monthYear = document.getElementById("monthYear");
const datesContainer = document.getElementById("dates");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const booking = document.getElementById("day-booking");

let currentDate = new Date();

function sendConfirmation(e) {
    e.preventDefault(); // stop page reload

    emailjs.sendForm("default_service", "template_imv160d", e.target)
        .then(() => {
            alert("Booking email sent!");
            e.target.reset();
        }, (err) => {
            alert("Error: " + JSON.stringify(err));
        });
}

function bookingConfirm(currentDate){
    booking.innerText = "";
    booking.style.display = "block";

    // Create form dynamically
    const form = document.createElement("form");
    form.setAttribute("id", "bookingForm");

    let confirmButton = document.createElement("button");
    confirmButton.textContent = "Confirm";

    confirmButton.classList.add("confirm-button");
    confirmButton.type = "submit";

    let tutorName = document.createElement("h2");
    tutorName.textContent = "Tutor Ihor";
    tutorName.classList.add("booking-container");

    // Name input
    let userName = document.createElement("input");
    userName.name = "user_name"; // IMPORTANT
    userName.placeholder = "Your name";
    userName.style.width = "85%";
    userName.required = true;
    userName.style.borderRadius = "7px";

    // Email input
    let userEmail = document.createElement("input");
    userEmail.name = "student_email"; // IMPORTANT
    userEmail.style.width = "85%";
    userEmail.type = "email";
    userEmail.placeholder = "Your email";
    userEmail.required = true;
    userEmail.style.borderRadius = "7px";

    // Hidden date input
    const dateInput = document.createElement("input");
    dateInput.type = "hidden";
    dateInput.name = "booking_date";
    dateInput.value = currentDate.toLocaleDateString();

    let title = document.createElement("h3");
    title.textContent = `Available time slots for ${currentDate.toLocaleDateString()}:`;
    title.classList.add("booking-title");


    form.appendChild(userName);
    form.appendChild(userEmail);
    form.appendChild(dateInput);
    form.appendChild(confirmButton);

    form.addEventListener("submit", sendConfirmation);

    booking.appendChild(tutorName);
    booking.appendChild(title);
    booking.appendChild(form);
}

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Get first and last days of the month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Update header
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    monthYear.textContent = `${monthNames[month]} ${year}`;

    // Clear old dates
    datesContainer.innerHTML = "";

    const today = new Date();
    const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;

    // Add blank divs for padding before the 1st day
    for (let i = 0; i < firstDay.getDay(); i++) {
        const empty = document.createElement("div");
        empty.classList.add("empty");


        datesContainer.appendChild(empty);
    }

    // Add actual days
    for (let i = 1; i <= lastDay.getDate(); i++) {
        const day = document.createElement("div");
        day.classList.add("date");
        day.textContent = i;


        if (isCurrentMonth && i === today.getDate()) {
            day.classList.add("today");
        }

        day.addEventListener("click", () => {
            const selectedDate = new Date(year, month, i); // Construct the correct date
            bookingConfirm(selectedDate);
        });
        datesContainer.appendChild(day);
    }
}



// Switch month
prevBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});
nextBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

renderCalendar();