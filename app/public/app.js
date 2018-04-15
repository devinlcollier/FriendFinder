const questions = [
    "You Really Liked Star Wars The last Jedi",
    "You would like to be President of The United States of America some day",
    "Your favorite programming language is Javascript",
    "Your favorite game is Witcher 3 Wild Hunt",
    "You like programming in Ruby",
    "Burger King or Mcdonalds?",
    "Hot or Cold?",
    "Iphone or Android?",
    "How many times a month do you call out from work?",
    "You prefer a new car to a used car",
    "You prefer a new phone to a used phone"
];

function buildQuestion(question, num) {
    if (question === "") {
        return null;
    }

    let q = $("<h3>").text("Question " + num);
    q.append($("<h4>").text(question));

    let dropdown = $("<select>").attr("id", "q" + num);;
    for (let i = 1; i < 6; i++) {
        dropdown.append($("<option>").attr("value", i).text(i));
    }

    q.append(dropdown);
    return q;
}

$(document).ready(function() {
    for (let i = 0; i < questions.length; i++) {
        $("#q_container").append(buildQuestion(questions[i], i + 1));
    }

    $("#submit").on("click", function(event) {
        const name = $("#name").val();
        if (name === "") {
            //alert user
            console.log("name invalid: " + name);
            return;
        }
        const pic = $("#pic").val();
        if (pic === "" || pic.startsWith("http://") === false && pic.startsWith("https://") === false) {
            //alert user
            console.log("pic invalid: " + pic);
            return;
        }

        const surveyAnswers = [];
        for (let i = 0; i < questions.length; i++) {
            surveyAnswers.push(parseInt($("#q" + (i + 1)).val()));
        }

        $.post("/api/friends", { name: name, pic: pic, surveyAnswers: surveyAnswers }, function(data) {
            $("#bestFriendLabel").text(data.name);
            $("#bestFriendPic").attr("src", data.pic);
            $("#bestFriend").modal("toggle");
        });
    });
});