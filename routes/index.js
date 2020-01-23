var express = require("express");
var router = express.Router();
const Rank = require("../models/rank.model");
/* GET home page. */

router.get("/", (req, res) => {
  return res.render("index");
});

router.post("/index/", async (req, res, next) => {
  // add radio button to select year
  let class_12 = "le tien, dinh thong, nhi hieu, bao khanh, huong ly, thanh quang, huu lap, le quang, ngoc linh, phan tien, ai tram, viet dat, thanh nhan, phuoc loc, nguyen quang, gia phuc, quang vinh, kim oanh, uyen nhi, minh trang, minh tam, minh nhu, ngoc hung, minh quy, quynh huong, huy hoang, kieu my, tran long, thanh phap, danh long, anh chuong, ngo nhi, phan an, hong chau, quoc anh, ngoc quy, dinh vu, khanh ha, phuc quang, kim ngan, nguyen cuc, thanh nga, khanh minh, lien huong, tuyet anh, hoang long, ngoc thanh"
  
  let class_11 =
    "thanh nga, phuc quang, ai tram, nhi hieu, bao khanh, le tien, le quang, huu lap, viet dat, ngoc linh, minh nhu, thanh quang, huong ly, phuoc loc, nguyen quang, uyen nhi, kim oanh, quang vinh, gia phuc, tran long, minh trang, ngoc hung, phan tien, kieu my, dinh thong, minh quy, quynh huong, thanh phap, thanh nhi, danh long, anh chuong, xuan an, minh tam, hong chau, quoc anh, dinh vu, ngoc quy, huy hoang, khanh ha, kim ngan, nguyen cuc, khanh minh, thanh nhan, lien huong, tuyet anh, hoang long, ngoc thanh";
  let data = req.body.class === "11"? class_11 : class_12
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
    if (students.hasOwnProperty(key) && key !== "name" && key !== "class") {
      result.push(students[key]);
    }
  }
  console.log(students)
  console.log(result)
  let count = 0;
  for (let i = 0; i < result.length; i++) {
    if (result[i] === data[i]) {
      console.log(result[i])
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
