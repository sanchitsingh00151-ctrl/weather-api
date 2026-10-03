# Modern Weather App

A beautiful, sleek weather application built with React, Vite, and Tailwind CSS v4.

## Features
- **Real-time Weather Data**: Uses the free Open-Meteo API to fetch current weather conditions (temperature, humidity, wind speed, and weather code).
- **Geocoding Support**: Automatically converts searched city names into precise geographic coordinates behind the scenes.
- **Premium UI**: Features a modern glassmorphism design with a beautiful dark gradient background and smooth micro-animations.
- **Dynamic Icons**: Uses `lucide-react` to automatically display the correct weather icon based on the forecast.

## Tech Stack
- React 19
- Vite
- Tailwind CSS v4
- Axios
- Lucide React

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/sanchitsingh00151-ctrl/weather-api.git
   ```
2. Navigate to the project directory:
   ```bash
   cd weather-api
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## API Usage
This project uses the [Open-Meteo API](https://open-meteo.com/), which requires no API key.
- **Geocoding API**: Translates city names into Latitude/Longitude.
- **Forecast API**: Fetches weather data using the coordinates.
