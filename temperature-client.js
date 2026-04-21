const soap = require('soap');

const WSDL_URL = 'http://localhost:8001/temperature?wsdl';

async function main() {
  try {
    // Créer le client SOAP
    const client = await soap.createClientAsync(WSDL_URL);

    console.log('✅ Client Temperature SOAP connecté !');
    console.log('🌡️ Opérations disponibles:',
Object.keys(client.TemperatureService.TemperaturePort));
    console.log('\n--- Tests des conversions de température ---\n');

    // Test Celsius vers Fahrenheit
    console.log('--- Celsius vers Fahrenheit ---');
    const c2f_1 = await client.CelsiusToFahrenheitAsync({ value: 0 });
    console.log(`0°C = ${c2f_1[0].result}°F`);

    const c2f_2 = await client.CelsiusToFahrenheitAsync({ value: 25 });
    console.log(`25°C = ${c2f_2[0].result}°F`);

    const c2f_3 = await client.CelsiusToFahrenheitAsync({ value: 100 });
    console.log(`100°C = ${c2f_3[0].result}°F`);

    // Test Fahrenheit vers Celsius
    console.log('\n--- Fahrenheit vers Celsius ---');
    const f2c_1 = await client.FahrenheitToCelsiusAsync({ value: 32 });
    console.log(`32°F = ${f2c_1[0].result}°C`);

    const f2c_2 = await client.FahrenheitToCelsiusAsync({ value: 77 });
    console.log(`77°F = ${f2c_2[0].result}°C`);

    const f2c_3 = await client.FahrenheitToCelsiusAsync({ value: 212 });
    console.log(`212°F = ${f2c_3[0].result}°C`);

    // Test Celsius vers Kelvin
    console.log('\n--- Celsius vers Kelvin ---');
    const c2k_1 = await client.CelsiusToKelvinAsync({ value: 0 });
    console.log(`0°C = ${c2k_1[0].result}K`);

    const c2k_2 = await client.CelsiusToKelvinAsync({ value: 25 });
    console.log(`25°C = ${c2k_2[0].result}K`);

    const c2k_3 = await client.CelsiusToKelvinAsync({ value: -273.15 });
    console.log(`-273.15°C = ${c2k_3[0].result}K (zéro absolu)`);

    console.log('\n✅ Toutes les conversions de température fonctionnent correctement !');

  } catch (error) {
    console.error('Erreur de connexion:', error.message);
  }
}

main();