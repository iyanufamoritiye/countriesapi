document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const countryName = urlParams.get("country");
  console.log("Country Name:", countryName); // Log the country name to ensure it's correctly extracted

  const countryFlag = document.getElementById("country-flag");
  const countryNameElement = document.getElementById("country-name");
  const nativeNameElement = document.getElementById("native-name");
  const populationElement = document.getElementById("population");
  const regionElement = document.getElementById("region");
  const subregionElement = document.getElementById("subregion");
  const capitalElement = document.getElementById("capital");
  const topLevelDomainElement = document.getElementById("top-level-domain");
  const currenciesElement = document.getElementById("currencies");
  const languagesElement = document.getElementById("languages");
  const bordersElement = document.getElementById("borders");

  if (countryName) {
    fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(
        countryName
      )}?fullText=true`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data); // Log the API response to ensure the data is correctly fetched

        if (data.status !== 404) {
          const countryData = data[0];
          console.log("Country Data:", countryData); // Log the first country data to check its structure

          countryFlag.src = countryData.flags.svg;
          countryFlag.alt = `Flag of ${countryData.name.common}`;
          countryNameElement.textContent = countryData.name.common;
          nativeNameElement.textContent = countryData.name.nativeName
            ? Object.values(countryData.name.nativeName)[0].common
            : "N/A";
          populationElement.textContent =
            countryData.population.toLocaleString();
          regionElement.textContent = countryData.region;
          subregionElement.textContent = countryData.subregion;
          capitalElement.textContent = countryData.capital
            ? countryData.capital[0]
            : "N/A";
          topLevelDomainElement.textContent = countryData.tld
            ? countryData.tld.join(", ")
            : "N/A";
          currenciesElement.textContent = countryData.currencies
            ? Object.values(countryData.currencies)
                .map((c) => c.name)
                .join(", ")
            : "N/A";
          languagesElement.textContent = countryData.languages
            ? Object.values(countryData.languages).join(", ")
            : "N/A";
          bordersElement.innerHTML = ""; // Clear the borders element

          if (countryData.borders && countryData.borders.length > 0) {
            countryData.borders.forEach((border) => {
              const borderSpan = document.createElement("span");
              borderSpan.className = "border-country";
              borderSpan.textContent = border;
              bordersElement.appendChild(borderSpan);
            });
          } else {
            bordersElement.textContent = "None";
          }
        } else {
          console.error("Country not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching country data:", error);
        // Optionally, handle errors here
      });
  } else {
    console.error("No country name provided in URL");
  }

  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const darkModeIcon = document.getElementById("dark-mode-icon");
  const darkModeText = document.getElementById("dark-mode-text");

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
