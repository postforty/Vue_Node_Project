const express = require("express");
const router = express.Router();
const mysql = require("../mysql"); // mysql 폴더의 index.js를 가져옴
const sql = require("../mysql/sql");

router.post("/", async (req, res) => {
  // orderInsert
  // r.insertId
  // orderDetailInsert
  // rollback

  // 1. connection 가져오기(10개의 pool중 하나를 가져옴)
  const conn = await mysql.getConnection();
  await conn.beginTransaction();

  // 2. 주문의 헤더 정보 (order) 생성
  conn.query(sql["orderInsert"], req.body.header, async (err, rows, fields) => {
    if (err) {
      console.log(err);
      await conn.rollback();
      res.status(500).send({ err: err });
    } else {
      const orderId = rows.insertId;
      const items = [];

      for (const item of req.body.items) {
        items.push([orderId, item.product_id, item.order_qty]);
      }

      conn.query(
        sql["orderItemInsert"],
        [items],
        async (err2, rows2, fields2) => {
          if (err2) {
            console.log(err2);
            await conn.rollback();
            res.status(500).send({ err: err2 });
          } else {
            await conn.commit(); // commit 이전까지는 롤백이 가능
            res.status(200).send(rows2);
          }

          await conn.release(); // connect pool을 돌려줘야 함
        }
      );
    }
  });

  // rollback
});

module.exports = router;
