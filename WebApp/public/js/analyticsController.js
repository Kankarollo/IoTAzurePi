/* eslint-disable max-classes-per-file */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
async function getListOfDevices() {
    const response = await fetch('/device', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}

async function getListOfMeasurementTypes() {
    const response = await fetch('/measures/model', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}

async function getCollectedData(filterBody) {
    const response = await fetch('/measures', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(filterBody)
    });
    return response.json();
}

function prepareFilterBody(devicesArray, startDate, endDate) {
    console.log(`devicesArray=${devicesArray},startDate=${startDate},endDate=${endDate},`)
    var filterBody = {};
    if (Array.isArray(devicesArray) && devicesArray.length) {
        filterBody['DeviceId'] = devicesArray;
    }
    if (startDate != '') {
        var tmp = new Date(startDate).toISOString();
        filterBody['MessageDate'] = { $gte: tmp };
    }
    if (endDate != '') {
        var tmp = new Date(endDate).toISOString();
        if (filterBody['MessageDate']['$gte']) {
            filterBody['MessageDate']['$lte'] = tmp;
        } else {
            filterBody['MessageDate'] = { $lte: tmp };
        }
    }
    return filterBody;
}

function getRandomRgb() {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

$(document).ready(() => {

    var ctx = document.getElementById('analyticsChart').getContext('2d');

    getListOfDevices().then(devices => {
        devices.forEach(element => {
            $("#deviceSelectBox").append(`<option>${element}</option>`);
        });
    });

    getListOfMeasurementTypes().then(measurements => {
        measurements.forEach(element => {
            $("#measurementSelectBox").append(`<option>${element}</option>`);
        });
    });

    const filterButton = document.getElementById('filterButton');

    filterButton.addEventListener('click', function (e) {
        if (window.chart && window.chart !== null) {
            window.chart.destroy();
        }

        const selectedDevices = document.querySelectorAll('#deviceSelectBox option:checked');

        const deviceIdInput = Array.from(selectedDevices).map(el => el.value);
        const startDateInput = document.getElementById("startDate").value;
        const endDateInput = document.getElementById("endDate").value;
        const measurementTypeInput = document.getElementById('measurementSelectBox').value;

        var labels = [];
        var chartData = {};

        const filterBody = prepareFilterBody(deviceIdInput, startDateInput, endDateInput);
        getCollectedData(filterBody).then(measures => {
            measures.forEach(element => {
                if (!chartData[element.DeviceId]) {
                    chartData[element.DeviceId] = [{
                        x: element.MessageDate,
                        y: element.IotData[measurementTypeInput]
                    }];
                } else {
                    chartData[element.DeviceId].push({
                        x: element.MessageDate,
                        y: element.IotData[measurementTypeInput]
                    });
                }
                labels.push(element.MessageDate);
            });

            var devices = Object.keys(chartData);

            window.chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels
                }
            });

            devices.forEach(device => {
                const color = getRandomRgb();
                chart.data.datasets.push({
                    label: device,
                    data: chartData[device],
                    fill: false,
                    backgroundColor: color,
                    borderColor: color
                });
                chart.update();
            });
        });
    });
});
