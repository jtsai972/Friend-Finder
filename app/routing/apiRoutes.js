var friends = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    //console.log(req.body);
    let newFriend = req.body;
  
    // console.log(newFriend);
    friends.push(newFriend);

    let match = matchMaker(newFriend);
    //console.log(match);
    
    res.json(match);
  });
}

function matchMaker(newFriend) {
  let compare = [];

  for(let i = 0; i < friends.length; i++) {
    // console.log(`Iteration ${i}: ${newFriend.username} vs ${friends[i].username}`);
    if(newFriend.username !== friends[i].username) {
      //console.log("true");
      let differences = {
        arrIndex: i,
        totalDifference: calcDiff(newFriend.answers, i)
      }
      compare.push(differences);
    }
  }
  //console.log(compare);

  let num = 0;
  for(let i = 0; i < compare.length; i++) {
    let current = compare[i].totalDifference;
    let condition = (i === compare.length-1) ?
      current < compare[0].totalDifference : 
      current < compare[i+1].totalDifference;    

    condition ? num = i : false;
    // console.log(num);
  }    

  let arrNum = compare[num].arrIndex;
  return friends[arrNum];
}

function calcDiff(ans, i) {
  let total = 0;
  for(let j = 0; j < ans.length; j++) {
    let subtract = Math.abs(Math.floor(ans[j] - friends[i].answers[j] ));

    total += subtract;
  }
  return total;
}