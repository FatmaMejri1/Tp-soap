const soap = require('soap');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8001;

// Implémentation des opérations du service de température
const temperatureService = {
  TemperatureService: {
    TemperaturePort: {
      // Conversion Celsius vers Fahrenheit
      CelsiusToFahrenheit: function(args) {
        const celsius = parseFloat(args.value);
        const fahrenheit = celsius * 9/5 + 32;
        console.log(`CelsiusToFahrenheit: ${celsius}°C = ${fahrenheit}°F`);
        return { result: fahrenheit };
      },

      // Conversion Fahrenheit vers Celsius
      FahrenheitToCelsius: function(args) {
        const fahrenheit = parseFloat(args.value);
        const celsius = (fahrenheit - 32) * 5/9;
        console.log(`FahrenheitToCelsius: ${fahrenheit}°F = ${celsius}°C`);
        return { result: celsius };
      },

      // Conversion Celsius vers Kelvin
      CelsiusToKelvin: function(args) {
        const celsius = parseFloat(args.value);
        const kelvin = celsius + 273.15;
        console.log(`CelsiusToKelvin: ${celsius}°C = ${kelvin}K`);
        return { result: kelvin };
      }
    }
  }
};

// Lire le fichier WSDL
const wsdlPath = path.join(__dirname, 'temperature.wsdl');
const wsdl = fs.readFileSync(wsdlPath, 'utf8');

// Démarrer le serveur
app.listen(PORT, function() {
  console.log(`🌡️ Serveur Temperature démarré sur http://localhost:${PORT}`);

  // Créer le service SOAP
  const server = soap.listen(app, '/temperature', temperatureService, wsdl);

  console.log(`🌡️ WSDL disponible sur http://localhost:${PORT}/temperature?wsdl`);

  // Log des requêtes entrantes (debug)
  server.log = function(type, data) {
    console.log(`[${type}]`, data);
  };
});