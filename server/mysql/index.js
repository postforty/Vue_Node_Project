const mysql = require("mysql");
const sql = require("./sql");

// 서버 접속 정보를 노출 시키지 않기 위해
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  connectionLimit: process.env.MYSQL_LIMIT,
});
// const pool = mysql.createPool({
//   host: "localhost",
//   port: 3306,
//   user: "dev",
//   password: "1234",
//   database: "dev",
//   connectionLimit: 10, // 동시 10개 처리
// });

/* 쿼리문을 실행하고 결과를 반환하는 함수 */
const query = async (alias, values) => {
  return new Promise((resolve, reject) =>
    pool.query(sql[alias], values, (error, results) => {
      if (error) {
        // 에러가 발생
        console.log(error);
        reject({
          error,
        });
      } else resolve(results); // 쿼리 결과를 전달
    })
  );
};

const getConnection = async () => {
  return new Promise((resolve, reject) =>
    pool.getConnection((err, conn) => {
      if (err) {
        console.log(err);
        reject({ err });
      } else {
        resolve(conn);
      }
    })
  );
};

module.exports = {
  query,
  getConnection,
};
