const apiKey = '17d9fa2faddfbd4fb3862f44a0825b11';

// Get the input and button elements
const inputValue = document.querySelector('.inputValue');
const btn = document.querySelector('.btn');

// Get the weather container element
const weatherContainer = document.querySelector('.weather');

// Add an event listener to the button
btn.addEventListener('click', () => {
    // Get the city name from the input value
    const cityName = inputValue.value.trim();

    // Check if the city name is not empty
    if (cityName) {
        // Fetch the weather data from OpenWeatherMap API
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
            .then(response => {
                // Check if the response is successful
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Check if the data contains the expected properties
                if (!data.weather || !data.weather.length || !data.main) {
                    throw new Error('Invalid API response format');
                }

                // Extract the relevant data from the API response
                const { description, icon } = data.weather[0];
                const { temp } = data.main;

                // Update the weather container with the fetched data
                weatherContainer.innerHTML = `
          <img src="images/icons/${icon}.png" alt="${description}" class="weather-icon">
          <div class="details">
            <h1 class="temp">${temp}°C</h1>
            <p class="description">${description}</p>
          </div>
        `;
            })
            .catch(error => {
                // Handle any errors that occur during the API request
                console.error(error);
                alert('Error fetching weather data. Please try again.');
            });
    } else {
        // Show an error message if the city name is empty
        alert('Please enter a city name.');
    }
});