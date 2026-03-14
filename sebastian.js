// GUNNERS ROBOTICS //

// Finds the top 3 runs based of scores and return them in an array
function findTopScores(runs) {
  var [first, second, third] = [{"score": 0}, {"score": 0}, {"score": 0}];

  // Prevents a run from being overlapped by sorting the array from greatest score to least score
  runs = [...runs].sort((a, b) => b.score - a.score);
  
  // Loop through each run and replace the variables with the runs with the top scores
  for (var run of runs) {
    if (run["score"] > first["score"]) first = run;
    else if (run["score"] > second["score"]) second = run;
    else if (run["score"] > third["score"]) third = run;
  }

  // This variable will replace the undefined values
  var noRun = {"runNum": 'No Run', 'score': 0};
  
  // Replace the undefined values with "No Run"
  for (var run of [first, second, third]) {
    if (JSON.stringify(run) == JSON.stringify({"score": 0})) {
      run["runNum"] = noRun["runNum"];
      run["score"] = noRun["score"];
    }
  }
  
  // Return top scores as an array
  var bestRuns = [first, second, third];
  return bestRuns;
}

// Find and display the top three scores
function displayTopScores(bestRuns, element) {
  element.innerHTML = `<h2>Best Runs</h2>
  <hr>
  <span>Top Three Scores:</span>
  <p> First: ${bestRuns[0]["runNum"]} | ${bestRuns[0]["score"]} </p>
  <p> Second: ${bestRuns[1]["runNum"]} | ${bestRuns[1]["score"]} </p>
  <p> Third: ${bestRuns[2]["runNum"]} | ${bestRuns[2]["score"]} </p>`;
}

// Testing
var runsTest = [
  {
    runNum: `Run 1`,
    completeTime: 10,
    obstaclesHit: 0,
    score: 100 / 1,
  },
  {
    runNum: `Run 2`,
    completeTime: 30,
    obstaclesHit: 9,
    score: 100 / (30 * 9),
  },
  {
    runNum: `Run 3`,
    completeTime: 60,
    obstaclesHit: 1,
    score: 100 / (60 * 1),
  },
];
