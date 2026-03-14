// GUNNERS ROBOTICS //
// GLOBAL VARIABLES //
let RUNS = [];
const runsEl = document.getElementById("runs-container");
const scoresEl = document.getElementById("scores-container");
const statsEl = document.getElementById("stats-container");

// EVENT LISTENERS //
document.getElementById("log-run-btn").addEventListener("click", () => {
  let runNum;

  // Attempts to get the run number in the newest run, if it fails, the run number is 1
  try {
    runNum = +RUNS.at(-1)["runNum"].at(-1);
  } catch (error) {
    runNum = 0;
  }

  RUNS.push(logRun(runNum));
  displayRuns(RUNS, runsEl);
  displayTopScores(findTopScores(RUNS), scoresEl)
  displayStats(findStats(RUNS), statsEl)
});