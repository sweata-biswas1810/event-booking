const bookedDates = {
  // January
  "2025-01-05": "New Year Party",
  "2025-01-15": "office Meeting",
  "2025-01-25": "team event",

  // February
  "2025-02-10": "weeding Ceremony",
  "2025-02-14": "Valentine's Day Special",
  "2025-02-27": "school function",

  // March
  "2025-03-08": "International Women's Day Seminar",
  "2025-03-17": "college function",
  "2025-03-25": "office conference",

  //april
  "2025-04-15": "Client Meeting",
  "2025-04-20": "birthday Party",
  "2025-04-25": "Team Outing",
  "2025-04-28": "wedding",
  //may
  "2025-05-03": "product Launch",
  "2025-05-10": "Workshop",
  //july
  '2025-07-05': 'Wedding Ceremony',
  '2025-07-12': 'Corporate Meetup',
  '2025-07-19': 'Art Expo',
  '2025-07-26': 'dinner Party',
  //august
  '2025-08-10': 'Music Concert',
  '2025-08-20': 'business Conference',
  '2025-08-26': 'art Exhibition',
  //october
  '2025-10-18': 'birthday Celebration',
  '2025-10-21': ' holloween Party',
  //2026
  '2026-01-10': 'Tech Conference',
  '2026-02-14': 'Valentine Special Event',

};

let currentMonth = 3;
let currentYear = 2025;
let currentlySelectedBookedDate = null;

//sectors

const calendar = document.getElementById("calendar");
const monthLabel = document.getElementById("calendar-month");
const selectedDateInfo = document.getElementById("selected-date-info");
const selectedDateEl = document.getElementById("selected-date");
const form = document.getElementById("booking-form");
const confirmationMsg = document.getElementById("confirmation-message");
const errorMsg = document.getElementById("error-message");
const eventDetails = document.getElementById("event-details");
const eventDateEl = document.getElementById("event-date");
const eventNameEl = document.getElementById("event-name");
const successMessage = document.getElementById("booking-success");

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

document.getElementById("prev-month").addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  generateCalendar();
});

document.getElementById("next-month").addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  generateCalendar();
});

function generateCalendar() {
  calendar.innerHTML = "";
  monthLabel.textContent = `${monthNames[currentMonth]} ${currentYear}`;

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const today = new Date();
  const todayDateStr = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

  for (let i = 0; i < firstDay; i++) {
    calendar.appendChild(document.createElement("div"));
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
    const dayEl = document.createElement("div");

    // Create a span for the date number
    const dayNumber = document.createElement("div");
    dayNumber.textContent = i;

    // Check if it's today
    if (dateStr === todayDateStr) {
      dayEl.classList.add("today");

      // Add "Today" label
      const todayLabel = document.createElement("div");
      // todayLabel.textContent = "Today";
      todayLabel.style.fontSize = "0.7rem";
      todayLabel.style.color = "#00796b";

      dayEl.appendChild(dayNumber);
      dayEl.appendChild(todayLabel);
    } else {
      dayEl.appendChild(dayNumber);
    }
    if (bookedDates[dateStr]) {
      dayEl.classList.add("booked");
      dayEl.title = bookedDates[dateStr];
      dayEl.addEventListener("click", () => {
        if (currentlySelectedBookedDate === dateStr) {
          eventDetails.style.display = 'none';
          currentlySelectedBookedDate = null;
        } else {
          eventDateEl.textContent = dateStr;
          eventNameEl.textContent = bookedDates[dateStr];
          eventDetails.style.display = 'block';
          form.style.display = 'none';
          selectedDateInfo.style.display = 'none';
          currentlySelectedBookedDate = dateStr;
        }
      });
    } else {
      
      dayEl.addEventListener("click", () => {
        selectedDateEl.textContent = dateStr;
        selectedDateInfo.style.display = 'block';
        form.style.display = 'block';
        eventDetails.style.display = 'none';
        successMessage.style.display = 'none';
        currentlySelectedBookedDate = null;
      });
    }

    calendar.appendChild(dayEl);
  }

  populateUpcomingEvents();
}

// Function to populate the upcoming events list
function populateUpcomingEvents() {
  const upcomingList = document.getElementById("upcoming-events-list");
  upcomingList.innerHTML = "";

  const today = new Date();
  let nextMonth = today.getMonth() + 1; 
  let nextYear = today.getFullYear();

  if (nextMonth > 11) {
    nextMonth = 0;
    nextYear++;
  }
// Get the next month in YYYY-MM format
  const nextMonthStr = (nextMonth + 1).toString().padStart(2, '0');

  const nextMonthEvents = Object.entries(bookedDates).filter(([dateStr, eventName]) => {
    const [year, month] = dateStr.split("-");
    return parseInt(year) === nextYear && month === nextMonthStr;
  });

  if (nextMonthEvents.length === 0) {
    upcomingList.innerHTML = "<li>No events scheduled for next month.</li>";
  } else {
    nextMonthEvents.forEach(([date, event]) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${date}: ${event}`;
      upcomingList.appendChild(listItem);
    });
  }
}

// Add event listener to the form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const contact = document.getElementById("contact").value.trim();
  const eventType = document.getElementById("event-type").value.trim();

  errorMsg.textContent = "";
  confirmationMsg.style.display = 'none';
  successMessage.style.display = 'none';

  if (!name || !email || !contact || !eventType) {
    errorMsg.textContent = "Please fill in all fields.";
    return;
  }

  confirmationMsg.textContent = "Booking confirmed!";
  confirmationMsg.style.display = 'block';
  successMessage.style.display = 'block';
  form.reset();
});

document.addEventListener("DOMContentLoaded", generateCalendar);
