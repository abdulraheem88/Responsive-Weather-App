document.getElementById('getWeatherBtn').addEventListener('click', async () => {
    const city = document.getElementById('cityInput').value.trim();
    const weatherDiv = document.getElementById('weatherDisplay');
  
    if (!city) {
      weatherDiv.innerHTML = '<p>Please enter a city name.</p>';
      return;
    }
  
    weatherDiv.innerHTML = '<p>Loading...</p>';
  
    try {
      const response = await fetch(`https://goweather.herokuapp.com/weather/${city}`);
      if (!response.ok) throw new Error('City not found');
      const data = await response.json();
  
      weatherDiv.innerHTML = `
        <div class="weather-split">
          <div class="weather-left">
            <h2>${city.toUpperCase()}</h2>
            <p><strong>Temperature:</strong> ${data.temperature}</p>
            <p><strong>Wind:</strong> ${data.wind}</p>
            <p><strong>Description:</strong> ${data.description}</p>
          </div>
          <div class="weather-right">
            <h3>Forecast</h3>
            ${data.forecast.map(day => `
              <div class="forecast-day">
                <p><strong>Day ${day.day}:</strong></p>
                <p>Temp: ${day.temperature}</p>
                <p>Wind: ${day.wind}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } catch (error) {
      weatherDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
  });
  