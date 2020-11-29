/* eslint-disable max-classes-per-file */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
async function getCollectedData(deviceId) {
    const response = await fetch('/measures', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(deviceId)
    });
    return response.json();
}

$(document).ready(() => {
    const button = document.getElementById('filterButton');

    button.addEventListener('click', function (e) {
        const deviceIdInput = document.getElementById('deviceName');
        const measurementTypeInput = document.getElementById('measurementType');

        var ctx = document.getElementById('analyticsChart').getContext('2d');

        data = [];
        labels = [];

        getCollectedData({ deviceId: deviceIdInput.value }).then(measures => {
            console.log(measures);
            measures.forEach(element => {
                data.push(element.IotData[measurementTypeInput.value]);
                labels.push(element.MessageDate);
            });

            var chart = new Chart(ctx, {
                type: 'line',

                data: {
                    labels: labels,
                    datasets: [{
                        fill: false,
                        label: deviceIdInput.value,
                        backgroundColor: 'rgba(255, 204, 0, 0.4)',
                        borderColor: 'rgba(255, 204, 0, 1)',
                        data: data
                    }]
                },

                options: {}
            });
        });

    });

});
