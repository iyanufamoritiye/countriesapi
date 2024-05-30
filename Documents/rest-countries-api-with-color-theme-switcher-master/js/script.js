document.addEventListener("DOMContentLoaded", () => {
  const countryList = document.getElementById("country-list");
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const darkModeIcon = document.getElementById("dark-mode-icon");
  const darkModeText = document.getElementById("dark-mode-text");
  const searchInput = document.getElementById("search-input");
  const regionFilter = document.getElementById("region-filter");
  const errorMessage = document.getElementById("error-message");

  const initialCountriesOrder = [
    "Germany",
    "United States",
    "Brazil",
    "Iceland",
    "Afghanistan",
    "Åland Islands",
    "Albania",
    "Algeria",
  ];

  // Function to render countries
  const renderCountries = (countries) => {
    countryList.innerHTML = "";
    if (countries.length === 0) {
      errorMessage.style.display = "block";
    } else {
      errorMessage.style.display = "none";
      countries.forEach((country) => {
        const countryItem = document.createElement("li");
        countryItem.innerHTML = `
        <a href="tab.html?country=${encodeURIComponent(country.name.common)}">
          <div class="flag-container">
            <img class="flag" src="${country.flags.svg}" alt="Flag of ${
          country.name.common
        }">
          </div>
          <div class="text-for-flag">
          <h2>${country.name.common}</h2>
          <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
          <p><strong>Region:</strong> ${country.region}</p>
          <p><strong>Capital:</strong> ${
            country.capital ? country.capital[0] : "N/A"
          }</p>
          </div>
        </a>
      `;
        countryList.appendChild(countryItem);
      });
    }
  };

  // Fetch country data
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      // Get unique regions from data
      const regions = [...new Set(data.map((country) => country.region))]
        .filter(Boolean)
        .sort();

      // Populate region filter dropdown
      regions.forEach((region) => {
        if (region) {
          const option = document.createElement("option");
          option.value = region;
          option.textContent = region;
          regionFilter.appendChild(option);
        }
      });

      const initialCountries = initialCountriesOrder
        .map((name) => data.find((country) => country.name.common === name))
        .filter(Boolean);

      renderCountries(initialCountries);

      // Search functionality
      searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm === "") {
          renderCountries(initialCountries);
        } else {
          const filteredCountries = data.filter((country) =>
            country.name.common.toLowerCase().includes(searchTerm)
          );
          renderCountries(filteredCountries);
        }
      });

      // Region filter functionality
      regionFilter.addEventListener("change", () => {
        const selectedRegion = regionFilter.value;
        if (selectedRegion === "") {
          renderCountries(initialCountries);
        } else {
          const filteredCountries = data.filter(
            (country) => country.region === selectedRegion
          );
          renderCountries(filteredCountries);
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching countries:", error);
      errorMessage.style.display = "block";
      errorMessage.textContent =
        "Failed to load country data. Please try again later.";
    });

  // Dark mode toggle
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      darkModeIcon.src =
        "https://img.icons8.com/ios-glyphs/30/ffffff/sun--v1.png";
      darkModeText.textContent = "Light Mode";
    } else {
      darkModeIcon.src =
        "https://img.icons8.com/ios-glyphs/30/000000/moon-symbol.png";
      darkModeText.textContent = "Dark Mode";
    }
  });
});
// Fetch country data
fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => {
    // Get unique regions from data
    const regions = [...new Set(data.map((country) => country.region))]
      .filter(Boolean)
      .sort();

    // Populate region filter dropdown
    regions.forEach((region) => {
      if (region) {
        const option = document.createElement("option");
        option.value = region;
        option.textContent = region;
        regionFilter.appendChild(option);
      }
    });

    const initialCountries = initialCountriesOrder
      .map((name) => data.find((country) => country.name.common === name))
      .filter(Boolean);

    renderCountries(initialCountries);

    // Search functionality
    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.toLowerCase();
      if (searchTerm === "") {
        renderCountries(initialCountries);
      } else {
        const filteredCountries = data.filter((country) =>
          country.name.common.toLowerCase().includes(searchTerm)
        );
        renderCountries(filteredCountries);
      }
    });

    // Region filter functionality
    regionFilter.addEventListener("change", () => {
      const selectedRegion = regionFilter.value;
      if (selectedRegion === "") {
        renderCountries(initialCountries);
      } else {
        const filteredCountries = data.filter(
          (country) => country.region === selectedRegion
        );
        renderCountries(filteredCountries);
      }
    });
  })
  .catch((error) => {
    console.error("Error fetching countries:", error);
    errorMessage.style.display = "block";
    errorMessage.textContent =
      "Failed to load country data. Please try again later.";
  });
