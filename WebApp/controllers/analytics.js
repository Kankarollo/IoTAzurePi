exports.get_analytics = function (req, res) {
    // res.render('analytics');
    res.sendFile('analytics.html', {
        root: 'public'
    });
};