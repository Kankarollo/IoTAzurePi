/* eslint-disable max-classes-per-file */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
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

function prepareFilterBody(deviceID, startDate, endDate) {
    var filterBody = {};
    if (deviceID != '') {
        var allDevicesID = deviceID.split(",");
        filterBody['DeviceId'] = allDevicesID;
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
    const button = document.getElementById('filterButton');

    button.addEventListener('click', function (e) {
        const deviceIdInput = document.getElementById('deviceName').value;
        const startDateInput = document.getElementById("startDate").value;
        const endDateInput = document.getElementById("endDate").value;

        const measurementTypeInput = document.getElementById('measurementType').value;

        var ctx = document.getElementById('analyticsChart').getContext('2d');

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
            console.log(chartData);
            console.log(Object.keys(chartData));
            var devices = Object.keys(chartData);
            var chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels
                }
            });

            console.log(chartData["SimulatorDevice"]);
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