// Dark Mode Toggle
function toggleMode() {
    document.body.classList.toggle("dark-mode");
}

// Tab Switching
document.querySelectorAll(".tab-link").forEach((tab) => {
    tab.addEventListener("click", function () {
        document.querySelectorAll(".tab-link").forEach((t) => t.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach((content) => content.classList.remove("active"));

        this.classList.add("active");
        document.querySelector(this.getAttribute("href")).classList.add("active");
    });
});

// Greeting Message
function getGreeting() {
    const currentHour = new Date().getHours();
    const greeting = document.getElementById("greeting");

    let greetingText = "";
    if (currentHour >= 5 && currentHour < 12) {
        greetingText = "Good Morning Freshies!";
    } else if (currentHour >= 12 && currentHour < 18) {
        greetingText = "Good Afternoon Freshies!";
    } else {
        greetingText = "Good Evening Freshies!";
    }

    greeting.textContent = greetingText;
}

getGreeting();

// Modal Functionality
const organizations = {
    SITEAO: { description: "Current(24-25) Governor: BERNARDO,Franchesca V.", link: "https://www.facebook.com/adzusiteao" },
    LAAO: { description: "LAAO represents Liberal Arts programs and activities.", link: "https://www.facebook.com/@adzulaao" },
    EAO: { description: "Current(24-25) Governor:DULACA, Fairy Ann E.", link: "https://www.facebook.com/adzueao" },
    MAO: { description: "MAO supports Management students and their goals.", link: "https://www.facebook.com/AdZUMAOLIONS" },
    NAO: { description: "Current(24-25) Governor: DESPUES, Nikka Mae T.", link: "https://www.facebook.com/NsgAngels" },
    AAO: { description: "AAO focuses on Accountancy programs.", link: "https://www.facebook.com/AAOArdentTigers" },
};

function showInfo(orgName) {
    const modal = document.getElementById("modal");
    const title = document.getElementById("modal-title");
    const description = document.getElementById("modal-description");
    const linksContainer = document.getElementById("modal-links");

    const org = organizations[orgName];
    if (org) {
        title.textContent = orgName;
        description.textContent = org.description;

        linksContainer.innerHTML = `<a href="${org.link}" target="_blank">Facebook page of ${orgName}</a>`;
    }

    modal.style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

window.addEventListener("click", (event) => {
    if (event.target.id === "modal") {
        closeModal();
    }
});

let currentIndex = 0;

function showSlide(index) {
    const carousel = document.querySelector('.carousel');
    const totalItems = document.querySelectorAll('.carousel-item').length;

    // Adjust index if out of bounds
    if (index >= totalItems) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalItems - 1;
    } else {
        currentIndex = index;
    }

    // Update carousel position
    const offset = -currentIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

// Auto-slide every 5 seconds
setInterval(() => {
    nextSlide();
}, 5000);

// Sample location data
const locations = {
    "Library": {
      image: "main-library.jpg", 
      info: "Located in the first floor of the LRC building.",
    },
    "MPCC1": {
      image: "science-hall.jpg",
      info: "Northwest from the entrance of the Cafeteria",
    },
    "MPCC2": {
      image: "sports-complex.jpg",
      info: "Northeast from the entrance of the Cafeteria",
    },
    "Cafeteria": {
      image: "sports-complex.jpg",
      info: "Located in the Ground Floor of Saurus Hall",
    },
    "LRC building": {
      image: "sports-complex.jpg",
      info: "",
    },
    "Saurus Hall": {
      image: "sports-complex.jpg",
      info: "At the north end of the campus. Shuttles available from Gate 3.",
    },
    "BC Building": {
      image: "sports-complex.jpg",
      info: "At the north end of the campus. Shuttles available from Gate 3.",
    },
    "C Building": {
      image: "sports-complex.jpg",
      info: "At the north end of the campus. Shuttles available from Gate 3.",
    },

  };
  

const searchInput = document.getElementById("search-input");
const suggestionsContainer = document.getElementById("suggestions");
const resultsContainer = document.getElementById("search-results");
const searchButton = document.getElementById("search-button");

// Update suggestions dynamically
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  suggestionsContainer.innerHTML = ""; // Clear previous suggestions

  if (query.length > 0) {
    const filteredLocations = Object.keys(locations).filter(location =>
      location.toLowerCase().startsWith(query)
    );

    // Only show suggestions if matches exist
    if (filteredLocations.length > 0) {
      filteredLocations.forEach(location => {
        const suggestionDiv = document.createElement("div");
        suggestionDiv.textContent = location;
        suggestionDiv.addEventListener("click", () => {
          searchInput.value = location;
          suggestionsContainer.style.display = "none";
          showLocationInfo(location);
        });
        suggestionsContainer.appendChild(suggestionDiv);
      });
      suggestionsContainer.style.display = "block";
    } else {
      suggestionsContainer.style.display = "none"; // Hide suggestions if no match
    }
  } else {
    suggestionsContainer.style.display = "none"; // Hide suggestions for empty input
  }
});

// Handle search button click
searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  showLocationInfo(query);
});

// Display location info
function showLocationInfo(query) {
  const result = locations[query];

  resultsContainer.innerHTML = ""; // Clear previous results
  suggestionsContainer.style.display = "none"; // Hide suggestions

  if (result) {
    const img = document.createElement("img");
    img.src = result.image;
    img.alt = query;

    const info = document.createElement("div");
    info.className = "info";
    info.textContent = result.info;

    resultsContainer.appendChild(img);
    resultsContainer.appendChild(info);
    resultsContainer.style.display = "block";
  } else {
    resultsContainer.innerHTML = `<p>No results found for "${query}".</p>`;
    resultsContainer.style.display = "block";
  }
}