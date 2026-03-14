// GUNNERS ROBOTICS //

function logRun(runNum) {
  // obtains the completion time and obstacles hit values from the input elements
  let completeTime = +document.getElementById("time-complete-el").value;
  if (completeTime < 0) {
    completeTime = Math.abs(completeTime)
  }
  let obstaclesHit = +document.getElementById("obstacles-hit-el").value;
  if (obstaclesHit < 0) {
    obstaclesHit = Math.abs(obstaclesHit)
  }
  
  // calculates the score with a simple formula
  let score = Math.round(100 - (completeTime/2 + obstaclesHit));
  
  // increments the current highest run number
  runNum++;
  
  // stores all the run's stats in an object and returns it
  let run = {
    runNum: `Run ${runNum}`,
    completeTime: completeTime,
    obstaclesHit: obstaclesHit,
    score: Math.max(score, 0),
  }
  return run;
}


function displayRuns(runs, element) {
  // resets the element
  element.innerHTML = "<h1>Runs</h1>";
  
  // loops through every run to create a paragraph for it, containing its stats,
  // along with a delete button that pops up when the run is hovered over
  for (let run of runs) {
    element.innerHTML += `<p
    id="${run["runNum"]}" class="run" 
    onmouseenter="mouseEnteredRun('Del ${run["runNum"]}')"
    onmouseleave="mouseLeftRun('Del ${run["runNum"]}')" >
    
    ${run["runNum"]} <br>
    Complete Time: ${run["completeTime"]}s <br>
    Obstacles Hit: ${run["obstaclesHit"]} Hits <br>
    Score: ${run["score"]} <br>
    
    <button id="Del ${run["runNum"]}" class="del" style="display: none"
    onclick="deleteRun(RUNS, '${run["runNum"]}')">
    Delete
    </button>
    </p>`;
  }
}


// loops through the runs to find the run matching the given id, splices the run and removes it's respective element
function deleteRun(runs, runElId) {
  for (let run of runs) {
    if (run["runNum"] == runElId) {
      runs.splice(runs.indexOf(run), 1);
      document.getElementById(runElId).remove();
    }
  }
  displayRuns(RUNS, runsEl);
  displayTopScores(findTopScores(RUNS), scoresEl)
  displayStats(findStats(RUNS), statsEl)
}


// shows/hides the delete button the mouse enters/leaves a run paragraph-element
function mouseEnteredRun(btnElId) {
  document.getElementById(btnElId).style.display = "inline";
}
function mouseLeftRun(btnElId) {
  document.getElementById(btnElId).style.display = "none";
}


// Finds the best/average/total stats and returns them in an object
function findStats(runs) {
  var [leastTime, leastHits, highestScore] = [["Run 0", Infinity], ["Run 0", Infinity], ["Run 0", 0]];
  var [avgTime, avgHits, avgScore] = [0, 0, 0];
  
  if (runs.length == 0) {
    // Every stat becomes 'None' if there aren't any runs
    [leastTime, leastHits, highestScore, avgTime, avgHits, avgScore] = ["None", "None", "None", "None", "None", "None"];
  }
  else {
    // Loop through each run and replaces the above variables with the best stats ands the averages
    for (var run of runs) {
      // organizes the best stats into a [run_number, best_stat] format
      if (run["completeTime"] < leastTime[1]) leastTime = [run["runNum"], run["completeTime"]];
      if (run["obstaclesHit"] < leastHits[1]) leastHits = [run["runNum"], run["obstaclesHit"]];
      if (run["score"] > highestScore[1]) highestScore = [run["runNum"], run["score"]];
      
      avgTime += run["completeTime"];
      avgHits += run["obstaclesHit"];
      avgScore += run["score"];
    }
  
    // Calculate the averages
    [avgTime, avgHits, avgScore] = [Math.round(avgTime/runs.length), Math.round(avgHits/runs.length), Math.round(avgScore/runs.length)];
  }
    
  // Return the stats in an object
  var stats = {
      "leastTime": leastTime,
      "leastHits": leastHits,
      "highestScore": highestScore,
      "avgTime": avgTime,
      "avgHits": avgHits,
      "avgScore": avgScore,
  }
  return stats;
}

function displayStats(stats, element) {
  element.innerHTML = `<h1>Stats</h1>
  <p>
  Fastest Time: ${stats["leastTime"][0]}, ${stats["leastTime"][1]}s | 
  Lowest Collisions: ${stats["leastHits"][0]}, ${stats["leastHits"][1]} Hits | 
  Highest Score: ${stats["highestScore"][0]}, ${stats["highestScore"][1]}
  </p>
  
  <p>Average Time: ${stats["avgTime"]}s   |   Average Collisions: ${stats["avgHits"]} Hits   |   Average Score: ${stats["avgScore"]}</p>`;
}
