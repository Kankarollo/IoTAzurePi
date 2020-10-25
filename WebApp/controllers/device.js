const sendMessage = require('../utils/helpers').sendMessage;

exports.post_device_id = function (req, res) {
    sendMessage(req.body.message, req.params.deviceId);
};
