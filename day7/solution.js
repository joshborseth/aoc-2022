const fs = require("fs");
fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) throw err;
  const lines = data.split("\n");
  const dirs = {};
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].slice(0, 4) === "$ cd" && lines[i] !== "$ cd ..") {
      dirs[`${lines[i].slice(5)}${i}`] = 0;
    }
  }
  const path = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].slice(0, 4) === "$ cd") {
      if (lines[i] === "$ cd ..") {
        path.pop();
      } else {
        path.push(`${lines[i].slice(5)}${i}`);
      }
    }
    const fileSize = lines[i].split(" ")[0];
    if (containsOnlyNumbers(fileSize)) {
      for (let dir of path) {
        dirs[dir] += Number(fileSize);
      }
    }
  }
  const result = Object.values(dirs).filter((num) => num <= 100000);
  const partOne = result.reduce((a, b) => a + b, 0);
  console.log(partOne, "part one");
  const allDirectories = Object.values(dirs);
  const root = dirs["/0"];
  const arr = [];
  for (let dir of allDirectories) {
    const thing = root - dir;
    if (thing <= 40000000) arr.push(dir);
  }
  const partTwo = arr.sort((a, b) => a - b)[0];
  console.log(partTwo, "part two");
});

function containsOnlyNumbers(str) {
  return /^\d+$/.test(str);
}
