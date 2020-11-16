const sendMessage = require('../utils/helpers').sendMessage;

exports.post_device_id = function (req, res) {
    sendMessage(JSON.stringify(req.body.message), req.params.deviceId);
};
