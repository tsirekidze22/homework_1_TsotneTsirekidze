//const asciiArt = require("ascii-art");

//asciiArt.font("Hello NodeJS!", "Doom", (err, renderedText) => {
//  if (err) {
//    console.error("error:", err);
//  } else {
//    console.log(renderedText);
//  }
//});

// ===================================================

// Type Import
//import asciiArt from "ascii-art";

//asciiArt
//  .font("Hello NodeJS!", "Doom")
//  .then((renderedText) => {
//    console.log(renderedText);
//  })
//  .catch((err) => {
//    console.error("Error:", err);
//  });

// ===================================================

import fs from "fs";

//  read the JSON file directly using the fs module

//fs.readFile("dummy.json", "utf8", (err, data) => {
//  if (err) {
//    console.error("Error reading the file:", err);
//    return;
//  }
//  try {
//    const jsonData = JSON.parse(data);
//    console.log("Data from file (using fs):", jsonData);
//  } catch (parseErr) {
//    console.error("Error parsing JSON:", parseErr);
//  }
//});

// ===================================================

// Using stream
//const readStream = fs.createReadStream("dummy.json", { encoding: "utf8" });
//let fileData = "";

//readStream.on("data", (chunk) => {
//  fileData += chunk;
//});

//readStream.on("end", () => {
//  try {
//    const jsonData = JSON.parse(fileData);
//    console.log("Data:", jsonData);
//  } catch (err) {
//    console.error("Error:", err);
//  }
//});

//readStream.on("error", (err) => {
//  console.error("Error:", err);
//});

// ===================================================

// using a file descriptor
fs.open("dummy.json", "r", (err, fd) => {
  if (err) {
    console.error("Error:", err);
    return;
  }

  // Allocate a buffer for reading
  const buffer = Buffer.alloc(1024);
  fs.read(fd, buffer, 0, buffer.length, 0, (err, bytesRead) => {
    if (err) {
      console.error("Error:", err);
      return;
    }

    if (bytesRead > 0) {
      // Convert buffer content to a string
      const fileContent = buffer.slice(0, bytesRead).toString();
      try {
        const jsonData = JSON.parse(fileContent);
        console.log("Data:", jsonData);
      } catch (parseErr) {
        console.error("Error:", parseErr);
      }
    }

    fs.close(fd, (err) => {
      if (err) console.error("Error:", err);
    });
  });
});
