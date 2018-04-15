const fs = require("fs");
const path = require("path");

function totalDifference(a1, a2) {
    let difference = 0;
    for (let i = 0; i < a1.length; i++) {
        difference += Math.abs(parseInt(a1[i]) - parseInt(a2[i]));
    }
    return difference;
}

module.exports = function(app) {
    app.post("/api/friends", function(req, res) {
        let friends = JSON.parse(fs.readFileSync("app/data/friends.js", "utf8"));

        let bestMatchNum = 999;
        let bestFriend;
        for (let i = 0; i < Object.keys(friends).length; i++) {
            let difference = totalDifference(friends[i]["surveyAnswers[]"], req.body["surveyAnswers[]"]);
            if(difference < bestMatchNum)
            {
            	bestMatchNum = difference;
            	bestFriend = friends[i];
            }
        }

        friends[Object.keys(friends).length] = req.body;
        fs.writeFileSync("app/data/friends.js", JSON.stringify(friends));
        res.json(bestFriend);
    });

    app.get("/api/friends", function(req, res) {
    	let friends = JSON.parse(fs.readFileSync("app/data/friends.js", "utf8"));
    	res.json(friends);
    });
}