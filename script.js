document.getElementById('sleepForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const sleepTime = document.getElementById('sleepTime').value;
    const wakeTime = document.getElementById('wakeTime').value;

    const sleepDuration = calculateSleepDuration(sleepTime, wakeTime);
    saveSleepData(sleepTime, wakeTime, sleepDuration);
    displaySleepData();
});

function calculateSleepDuration(sleep, wake) {
    const sleepDate = new Date(`1970-01-01T${sleep}:00`);
    const wakeDate = new Date(`1970-01-01T${wake}:00`);
    
    if (wakeDate <= sleepDate) {
        wakeDate.setDate(wakeDate.getDate() + 1); // Next day
    }
    
    const duration = (wakeDate - sleepDate) / 1000 / 60; // Convert to minutes
    return duration;
}

function saveSleepData(sleepTime, wakeTime, duration) {
    const date = new Date().toLocaleDateString();
    const sleepData = { sleepTime, wakeTime, duration };

    let data = JSON.parse(localStorage.getItem('sleepData')) || {};
    data[date] = sleepData;
    localStorage.setItem('sleepData', JSON.stringify(data));
}

function displaySleepData() {
    const data = JSON.parse(localStorage.getItem('sleepData')) || {};
    const sleepDataDiv = document.getElementById('sleepData');
    sleepDataDiv.innerHTML = '';

    for (const date in data) {
        const { sleepTime, wakeTime, duration } = data[date];
        sleepDataDiv.innerHTML += `<p>${date}: Slept from ${sleepTime} to ${wakeTime}, Duration: ${duration} minutes</p>`;
    }
}

// Display on load
window.onload = displaySleepData;
