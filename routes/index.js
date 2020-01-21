var express = require("express");
var router = express.Router();
const Rank = require("../models/rank.model");
/* GET home page. */

router.get("/", (req, res) => {
  return res.render("index");
});

router.post("/index/", async (req, res, next) => {
  let data =
    "thanh nga, phuc quang, ai tram, nhi hieu, bao khanh, le tien, le quang, huu lap, viet dat, ngoc linh, minh nhu, thanh quang, huong ly, phuoc loc, nguyen quang, uyen nhi, kim oanh, quang vinh, gia phuc, tran long, minh trang, ngoc hung, phan tien, kieu my, dinh thong, minh quy, quynh huong, thanh phap, thanh nhi, danh long, anh chuong, xuan an, minh tam, hong chau, quoc anh, dinh vu, ngoc quy, huy hoang, khanh ha, kim ngan, nguyen cuc, khanh minh, thanh nhan, lien huong, tuyet anh, ngoc thanh";
  data = data.split(", ");
  for (let i = 0; i < data.length; i++) {
    data[i] = data[i]
      .split(" ")
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");
  }

  const students = req.body;
  let result = [];
  for (let key in students) {
    if (students.hasOwnProperty(key) && key !== "name") {
      result.push(students[key]);
    }
  }
  let count = 0;
  for (let i = 0; i < result.length; i++) {
    if (result[i] === data[i]) {
      count++;
    }
  }

  let name = req.body.name;
  if (name) {
    let rank = new Rank({
      name,
      count
    });
    try {
      await rank.save();
    } catch (err) {
      throw new Error();
    }
  }
  try {
    res.redirect('/rank')
  } catch (err) {
    throw new Error("Database Error");
  }
});

router.get('/rank', async(req, res) => {
  try {
    const data_rank = await Rank.find().sort({count: -1})
    res.render("rank", { data: data_rank });
  } catch (err) {
    throw new Error("Database Error");
  }
})

module.exports = router;
