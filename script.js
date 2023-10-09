function generateCalendar(year, month) {
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDay = new Date(year, month - 1, 1).getDay();
    const monthName = new Intl.DateTimeFormat('de-DE', { month: 'long' }).format(new Date(year, month - 1, 1));

    const calendarDiv = $('.calendar')[0];

    const calendarTitleDiv = document.querySelector('.title-text');
    calendarTitleDiv.textContent = `${monthName} ${year}`;

    // Display day names
    weekdays.forEach(weekName => {
        const dayName = weekName.slice(0, 2);
        const dayNameDiv = $('+');
        dayNameDiv.textContent = dayName;
        dayNameDiv.classList.add('day', 'day-name');
        calendarDiv.appendChild(dayNameDiv);
    }); 

    let wrapDate = 0;
    let firstWrapDate = 0;
    let secondWrapDate = 0;
    let checkJuly = false;

    for (let i = 1; i <= 42; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');

        const dateNumberDiv = document.createElement('div');
        dateNumberDiv.classList.add('date-number');

        let dayNumber = i - firstDay + 1; // Adjust for the starting day

        if ((daysInMonth == 31 && (i == 1 || i == 2) && (firstDay == 6 || firstDay == 0)) || (daysInMonth == 30 && i == 1 && firstDay == 0)) {
            (firstDay == 6 && i == 1) ? firstWrapDate = 1 :
                (firstDay == 6 && i == 2) ? secondWrapDate = 2 :
                    (firstDay == 0 && i == 1) ? wrapDate = 1 : null;

        }

        if (daysInMonth == 31 && (i == 1 || i == 2 || i == 3 || i == 4 || i == 5 || i == 6 || i == 7) && (firstDay == 6)) {
            checkJuly = true;
            continue;
        }

        if (dayNumber > 0 && dayNumber <= daysInMonth) {
            dateNumberDiv.textContent = dayNumber;
        }

        if ((wrapDate == 2 && i == 34) || (wrapDate == 1 && i == 35) || (secondWrapDate == 2 && i == 42) || (firstWrapDate == 1 && i == 41)) {
            dateNumberDiv.textContent = wrapDate;
        }

        if ((secondWrapDate == 2 && i == 42) || (firstWrapDate == 1 && i == 41)) {
            dateNumberDiv.textContent = secondWrapDate;
        }

        if (firstWrapDate == 1 && i == 41) {
            dateNumberDiv.textContent = firstWrapDate;
        }

        dayDiv.appendChild(dateNumberDiv);
        calendarDiv.appendChild(dayDiv);

        if (!checkJuly && i == 35) {
            return;
        }
    }
}
let inputYear = new Date().getFullYear();
let inputMonth = new Date().getMonth() + 1;

// Convert the input to numbers
const year = parseInt(inputYear);
const month = parseInt(inputMonth);

// Check if the inputs are valid
if (!isNaN(year) && !isNaN(month) && month >= 1 && month <= 12) {
    // Call the generateCalendar function with the provided inputs
    generateCalendar(year, month);
} else {
    console.error('Invalid input. Please enter a valid year and month.');
}


// EventListeners
