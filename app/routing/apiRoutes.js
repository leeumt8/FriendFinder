var friendsData = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function (req, res) {
        var userInfo = req.body
        var userScores = userInfo.scores
        var totalDifference = 0

        var match = {
            name: "",
            photo: "",
            friendDifference: 0
        }

        for (i = 0; i < friendsData.length; i++ ) {
            var totalDifference = 0

            for (x = 0; x < friendsData[i].scores[x]; x++) {
                totalDifference += Math.abs(parseInt(userScores[x]) - parseInt(friendsData[i].scores[x]));

                if (totalDifference <= match.friendDifference) {

                    match.name = friendsData[i].name;
                    match.photo = friendsData[i].photo;
                    match.friendDifference = totalDifference;
                }
            }
        }

        friendsData.push(userInfo);
        res.json(match);
    });
};