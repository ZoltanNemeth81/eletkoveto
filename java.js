document.addEventListener("DOMContentLoaded", () => {
    // Közös függvények
    function saveDataToLocalStorage(key, data) {
        const savedData = JSON.parse(localStorage.getItem(key)) || [];
        savedData.push(data);
        localStorage.setItem(key, JSON.stringify(savedData));
    }

    function loadDataFromLocalStorage(key, callback) {
        const savedData = JSON.parse(localStorage.getItem(key)) || [];
        savedData.forEach(callback);
    }

    function getCurrentDateTime() {
        const now = new Date();
        return {
            date: now.toLocaleDateString("hu-HU"),
            time: now.toLocaleTimeString("hu-HU"),
        };
    }

    // Tevékenységek
    const activityForm = document.getElementById("activity-form");
    const activityList = document.getElementById("activity-list");

    function addActivityItem({ type, description, goal, date, time }) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${type}:</strong> ${description} - Cél: ${goal} <br><em>Dátum:</em> ${date} <em>Idő:</em> ${time}`;
        activityList.appendChild(listItem);
    }

    activityForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const activityType = document.getElementById("activity-type").value;
        const activityDescription = document.getElementById("activity-description").value;
        const activityGoal = document.getElementById("activity-goal").value;

        if (!activityType || !activityDescription || !activityGoal) {
            return;
        }

        const { date, time } = getCurrentDateTime();
        const newActivityData = { type: activityType, description: activityDescription, goal: activityGoal, date, time };

        saveDataToLocalStorage("activityData", newActivityData);
        addActivityItem(newActivityData);
        activityForm.reset();
    });

    loadDataFromLocalStorage("activityData", addActivityItem);

    // Egészségi Mutatók
    const healthForm = document.getElementById("health-form");
    const healthList = document.getElementById("health-list");

    function addHealthItem({ sleepHours, hydration, nutrition, mood, date, time }) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>Alvás:</strong> ${sleepHours} óra | <strong>Hidratáltság:</strong> ${hydration} liter | <strong>Táplálkozás:</strong> ${nutrition} | <strong>Hangulat:</strong> ${mood} <br><em>Dátum:</em> ${date} <em>Idő:</em> ${time}`;
        healthList.appendChild(listItem);
    }

    healthForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const sleepHours = document.getElementById("sleep-hours").value;
        const hydration = document.getElementById("hydration").value;
        const nutrition = document.getElementById("nutrition").value;
        const mood = document.getElementById("mood").value;

        if (!sleepHours || !hydration || !nutrition || !mood) {
            return;
        }

        const { date, time } = getCurrentDateTime();
        const newHealthData = { sleepHours, hydration, nutrition, mood, date, time };

        saveDataToLocalStorage("healthData", newHealthData);
        addHealthItem(newHealthData);
        healthForm.reset();
    });

    loadDataFromLocalStorage("healthData", addHealthItem);

    // Szociális Interakciók
    const socialForm = document.getElementById("social-form");
    const socialList = document.getElementById("social-list");

    function addSocialItem({ type, description, date, time }) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>Interakció típusa:</strong> ${type} | <strong>Leírás:</strong> ${description} <br><em>Dátum:</em> ${date} <em>Idő:</em> ${time}`;
        socialList.appendChild(listItem);
    }

    socialForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const interactionType = document.getElementById("interaction-type").value;
        const interactionDescription = document.getElementById("interaction-description").value;

        if (!interactionType || !interactionDescription) {
            return;
        }

        const { date, time } = getCurrentDateTime();
        const newSocialData = { type: interactionType, description: interactionDescription, date, time };

        saveDataToLocalStorage("socialData", newSocialData);
        addSocialItem(newSocialData);
        socialForm.reset();
    });

    loadDataFromLocalStorage("socialData", addSocialItem);

    // Törlés gomb kezelése
    document.getElementById("clear-data-btn").addEventListener("click", () => {
        // Töröljük az összes adatot a localStorage-ből
        localStorage.removeItem("activityData");
        localStorage.removeItem("healthData");
        localStorage.removeItem("socialData");

        // Kiürítjük a listák tartalmát
        while (activityList.firstChild) {
            activityList.removeChild(activityList.firstChild);
        }

        while (healthList.firstChild) {
            healthList.removeChild(healthList.firstChild);
        }

        while (socialList.firstChild) {
            socialList.removeChild(socialList.firstChild);
        }

        alert("Az összes adat törölve lett.");
    });
});
