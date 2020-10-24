var config = {
    mongo: {
        db_name: 'iot-azure-pi-db',
        db_collection: 'measure'
    },
    app: {
        port: '3000'
    },
    requester: {
        timeout: 1000,
        message: 'readData'
    }
};

module.exports = config;