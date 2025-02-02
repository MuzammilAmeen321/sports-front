  // Get all dropdown items
  const dropdownItems = document.querySelectorAll('.dropdown-item');
    
  // Add click event listener to each dropdown item
  dropdownItems.forEach(item => {
      item.addEventListener('click', function (e) {
          e.preventDefault(); // Prevent default link behavior

          // Get the selected option's text and icon
          const selectedText = this.textContent.trim();
          const selectedIcon = this.querySelector('i').outerHTML;

          // Update the button's inner HTML
          document.getElementById('platformButton').innerHTML = selectedIcon + ' ' + selectedText;
      });
  });

    // Province to Cities Mapping
    const citiesByProvince = {
      Sindh: ["Karachi", "Hyderabad", "Sukkur", "Larkana"],
      Punjab: ["Lahore", "Faisalabad", "Rawalpindi", "Multan"],
      KhyberPakhtunkhwa: ["Peshawar", "Abbottabad", "Mardan", "Swat"],
      Balochistan: ["Quetta", "Gwadar", "Khuzdar", "Turbat"],
    };

    // Get Province and City Dropdowns
    const provinceSelect = document.getElementById("provinceSelect");
    const cityDropdownContainer = document.getElementById("cityDropdownContainer");
    const citySelect = document.getElementById("citySelect");

    // Event Listener for Province Selection
    provinceSelect.addEventListener("change", function () {
      const selectedProvince = provinceSelect.value;

      // Clear previous cities
      citySelect.innerHTML = '<option selected disabled>Choose a city</option>';

      // If a province is selected, show the cities dropdown
      if (selectedProvince) {
        cityDropdownContainer.style.display = "block";

        // Populate cities dropdown
        const cities = citiesByProvince[selectedProvince];
        cities.forEach((city) => {
          const option = document.createElement("option");
          option.value = city;
          option.textContent = city;
          citySelect.appendChild(option);
        });
      } else {
        cityDropdownContainer.style.display = "none";
      }
    });

    // Event Listener for Current Location Icon
    const currentLocationIcon = document.getElementById("currentLocationIcon");
    currentLocationIcon.addEventListener("click", function () {
      alert("Fetching your current location...");
      // Add logic here to fetch the user's current location using Geolocation API
    });


