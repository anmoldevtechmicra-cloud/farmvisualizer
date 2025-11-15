// Initialize data arrays for charts
const timeLabels = [];
const temperatureData = [];
const humidityData = [];
const moistureData = [];
const phData = [];

// Current values
let currentData = {
    temperature: 24,
    moisture: 65,
    humidity: 72,
    light: 850,
    ph: 6.8,
    wind: 12
};

// Chart instances
let tempHumidityChart = null;
let moisturePhChart = null;

// Initialize charts
function initCharts() {
    const tempHumidityCtx = document.getElementById('tempHumidityChart').getContext('2d');
    const moisturePhCtx = document.getElementById('moisturePhChart').getContext('2d');

    tempHumidityChart = new Chart(tempHumidityCtx, {
        type: 'line',
        data: {
            labels: timeLabels,
            datasets: [
                {
                    label: 'Temperature (°C)',
                    data: temperatureData,
                    borderColor: 'rgb(239, 68, 68)',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    tension: 0.4,
                    yAxisID: 'y'
                },
                {
                    label: 'Humidity (%)',
                    data: humidityData,
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Temperature (°C)'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Humidity (%)'
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                }
            }
        }
    });

    moisturePhChart = new Chart(moisturePhCtx, {
        type: 'line',
        data: {
            labels: timeLabels,
            datasets: [
                {
                    label: 'Moisture (%)',
                    data: moistureData,
                    borderColor: 'rgb(34, 197, 94)',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    tension: 0.4,
                    yAxisID: 'y'
                },
                {
                    label: 'pH Level',
                    data: phData,
                    borderColor: 'rgb(168, 85, 247)',
                    backgroundColor: 'rgba(168, 85, 247, 0.1)',
                    tension: 0.4,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Moisture (%)'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'pH Level'
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                }
            }
        }
    });
}

// Generate random value within a range
function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

// Update metric values with slight variations
function updateMetrics() {
    // Update temperature (20-30°C range)
    currentData.temperature = Math.max(20, Math.min(30, 
        currentData.temperature + randomInRange(-0.5, 0.5)));
    
    // Update moisture (50-80% range)
    currentData.moisture = Math.max(50, Math.min(80, 
        currentData.moisture + randomInRange(-1, 1)));
    
    // Update humidity (60-85% range)
    currentData.humidity = Math.max(60, Math.min(85, 
        currentData.humidity + randomInRange(-0.5, 0.5)));
    
    // Update light (500-1200 lux range)
    currentData.light = Math.max(500, Math.min(1200, 
        currentData.light + randomInRange(-20, 20)));
    
    // Update pH (6.0-7.5 range)
    currentData.ph = Math.max(6.0, Math.min(7.5, 
        currentData.ph + randomInRange(-0.05, 0.05)));
    
    // Update wind (5-20 km/h range)
    currentData.wind = Math.max(5, Math.min(20, 
        currentData.wind + randomInRange(-1, 1)));

    // Update UI
    updateUI();
    
    // Add to chart data
    const now = new Date();
    const timeStr = now.toLocaleTimeString();
    
    timeLabels.push(timeStr);
    temperatureData.push(parseFloat(currentData.temperature.toFixed(1)));
    humidityData.push(parseFloat(currentData.humidity.toFixed(1)));
    moistureData.push(parseFloat(currentData.moisture.toFixed(1)));
    phData.push(parseFloat(currentData.ph.toFixed(2)));

    // Keep only last 20 data points
    if (timeLabels.length > 20) {
        timeLabels.shift();
        temperatureData.shift();
        humidityData.shift();
        moistureData.shift();
        phData.shift();
    }

    // Update charts
    tempHumidityChart.update();
    moisturePhChart.update();

    // Add to table
    addTableRow(now, currentData);
}

// Update UI elements
function updateUI() {
    document.getElementById('temperature').textContent = 
        `${currentData.temperature.toFixed(1)}°C`;
    document.getElementById('moisture').textContent = 
        `${currentData.moisture.toFixed(0)}%`;
    document.getElementById('humidity').textContent = 
        `${currentData.humidity.toFixed(0)}%`;
    document.getElementById('light').textContent = 
        `${currentData.light.toFixed(0)} lux`;
    document.getElementById('ph').textContent = 
        currentData.ph.toFixed(1);
    document.getElementById('wind').textContent = 
        `${currentData.wind.toFixed(0)} km/h`;

    // Update timestamps
    const now = new Date().toLocaleTimeString();
    document.getElementById('temp-time').textContent = now;
    document.getElementById('moisture-time').textContent = now;
    document.getElementById('humidity-time').textContent = now;
    document.getElementById('light-time').textContent = now;
    document.getElementById('ph-time').textContent = now;
    document.getElementById('wind-time').textContent = now;
}

// Add row to data table
function addTableRow(timestamp, data) {
    const tbody = document.getElementById('table-body');
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <td>${timestamp.toLocaleTimeString()}</td>
        <td>${data.temperature.toFixed(1)}°C</td>
        <td>${data.moisture.toFixed(0)}%</td>
        <td>${data.humidity.toFixed(0)}%</td>
        <td>${data.light.toFixed(0)} lux</td>
        <td>${data.ph.toFixed(1)}</td>
        <td>${data.wind.toFixed(0)} km/h</td>
    `;
    
    tbody.insertBefore(row, tbody.firstChild);
    
    // Keep only last 10 rows
    while (tbody.children.length > 10) {
        tbody.removeChild(tbody.lastChild);
    }
}

// Initialize with some initial data
function initializeData() {
    const now = new Date();
    
    // Generate initial data points
    for (let i = 9; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60000); // 1 minute intervals
        timeLabels.push(time.toLocaleTimeString());
        
        temperatureData.push(parseFloat((20 + Math.random() * 10).toFixed(1)));
        humidityData.push(parseFloat((60 + Math.random() * 25).toFixed(1)));
        moistureData.push(parseFloat((50 + Math.random() * 30).toFixed(1)));
        phData.push(parseFloat((6.0 + Math.random() * 1.5).toFixed(2)));
    }
    
    // Populate initial table rows
    for (let i = 9; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60000);
        const data = {
            temperature: 20 + Math.random() * 10,
            moisture: 50 + Math.random() * 30,
            humidity: 60 + Math.random() * 25,
            light: 500 + Math.random() * 700,
            ph: 6.0 + Math.random() * 1.5,
            wind: 5 + Math.random() * 15
        };
        addTableRow(time, data);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    initCharts();
    updateUI();
    
    // Update metrics every 5 seconds
    setInterval(updateMetrics, 5000);
});

