const express = require("express");
const router = express();
const { exec } = require("child_process");



router.post("/compile", (req, res) => {
  const code = req.body.code;
  // Replace with the appropriate command for the language
  exec(`echo "${code}" | python -`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send("Internal Server Error");
    }
    const output = stdout.trim() || stderr.trim();
    res.json({ output });
  });
});


module.exports = router;