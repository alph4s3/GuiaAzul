// Tab Switching
document.querySelectorAll(".tab-link").forEach((tab) => {
  tab.addEventListener("click", function () {
      document.querySelectorAll(".tab-link").forEach((t) => t.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach((content) => content.classList.remove("active"));

      this.classList.add("active");
      document.querySelector(this.getAttribute("href")).classList.add("active");
  });
});


// Modal Functionality
const organizations = {
  SITEAO: { description: "Current(24-25) Governor: BERNARDO,Franchesca V.", link: "https://www.facebook.com/adzusiteao" },
  LAAO: { description: "Current(24-25) Governor:N/A.", link: "https://www.facebook.com/@adzulaao" },
  EAO: { description: "Current(24-25) Governor:DULACA, Fairy Ann E.", link: "https://www.facebook.com/adzueao" },
  MAO: { description: "Current(24-25) Governor: N/A.", link: "https://www.facebook.com/AdZUMAOLIONS" },
  NAO: { description: "Current(24-25) Governor: DESPUES, Nikka Mae T.", link: "https://www.facebook.com/NsgAngels" },
  AAO: { description: "Current(24-25) Governor: N/A.", link: "https://www.facebook.com/AAOArdentTigers" },
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
}, 10000);

// Sample location data
const locations = {
  "Library": {
    image: "LIBRARY.jpg", 
    info: "Located in the second floor of the LRC building.",
  },
  "MPCC1": {
    image: "mpcc1.jpg",
    info: "Northwest from the entrance of the Cafeteria",
  },
  "MPCC2": {
    image: "mpcc2.jpg",
    info: "Northeast from the entrance of the Cafeteria",
  },
  "Cafeteria": {
    image: "Caf.jpg",
    info: "Located in the Ground and 2nd floor of Saurus Hall",
  },
  "LRC building": {
    image: "LRC.jpg",
    info: "Located right across the street from the cathedral",
  },
  "Law building": {
    image: "lawb.jpg",
    info: "Located behind the Jesuit residence",
  },
  "Saurus Hall": {
    image: "Saurus.jpg",
    info: "Located in the middle of MPCC1 and MPCC2",
  },
  "Backfield": {
    image: "backfield.jpg",
    info: "Located behind Xavier Hall",
  },
  "BC Building": {
    image: "BC_building.jpg",
    info: "Located at the right from the entrance of Gate 2",
  },
  "C Building": {
    image: "Canisius Hall.jpg",
    info: "Located behind the BC building.",
  },
  "Xavier Hall": {
    image: "xavier_Hall.jpg",
    info: "Located behind and connected to the C building",
  },

};


const searchInput = document.getElementById("search-input");
const suggestionsContainer = document.getElementById("suggestions");
const resultsContainer = document.getElementById("search-results");
const searchButton = document.getElementById("search-button");

// Update suggestions
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