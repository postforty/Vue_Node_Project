const express = require("express");
const router = express.Router();
const mysql = require("../mysql"); // mysql 폴더의 index.js를 가져옴

router.get("/", async (req, res) => {
  const customerList = await mysql.query("customerList");
  res.send(customerList);
});

module.exports = router;
