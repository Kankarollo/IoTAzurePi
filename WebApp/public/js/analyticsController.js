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

function prepareFilterBody(devicesArray, startDate, endDate) {
    console.log(`devicesArray=${devicesArray},startDate=${startDate},endDate=${endDate},`)
    var filterBody = {};
    if (!devicesArray) {
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

    trackedDevices = []
    const selectedDevices = []
    
    $.getJSON("/analytics/devices", function (data, textStatus, jqXHR) {
        JSON.parse(data).forEach((element) => {
            trackedDevices.push(element);
        });
    }).done(() => {
        trackedDevices.forEach(deviceID => {
            let stripedDeviceID = deviceID.toString().replace(/(<([^>]+)>)/gi, "");
            $("#listOfDevices").append(`
            <div>
                <input type="checkbox" id="checkDevice" name="${stripedDeviceID}" class="form-check-input"/>
                <label for="check${stripedDeviceID}" id="check${stripedDeviceID}Label" class="form-check-label">${stripedDeviceID}</label>
            </div>`);    
            
        });
        $('input:checkbox').on('click',function() {
            let deviceName = $(this).attr("name");
            if (this.checked) {
                selectedDevices.push(deviceName)
                console.log(selectedDevices)
            }
            else {
                var index = selectedDevices.indexOf(deviceName);
                selectedDevices.splice(index)
                console.log(selectedDevices)
            }
        });
    });
    

    const measurementsModel = []
    $.getJSON("/measures/model", function (data, textStatus, jqXHR) {
        data.forEach((element) => {
            measurementsModel.push(element);
        });
    }).done(() => {
        measurementsModel.forEach(measure => {
            let stripedMeasure = measure.toString().replace(/(<([^>]+)>)/gi, "");
            $("#measurementSelectBox").append(`<option>${stripedMeasure}</option>`);
        });
    });
    const button = document.getElementById('filterButton');
    button.addEventListener('click', function (e) {
        const deviceIdInput = selectedDevices;
        const startDateInput = document.getElementById("startDate").value;
        const endDateInput = document.getElementById("endDate").value;
        const measurementTypeInput = document.getElementById('measurementSelectBox').value;

        var ctx = document.getElementById('analyticsChart').getContext('2d');

        var labels = [];
        var chartData = {};

        const filterBody = prepareFilterBody(deviceIdInput, startDateInput, endDateInput);
        if($.isEmptyObject(filterBody))
        {
            console.log("Objekt pusty!!!");
            return;
        }
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