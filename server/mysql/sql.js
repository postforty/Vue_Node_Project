module.exports = {
  categoryList: `select * from product_category`,
  categoryListByCondition: `select * from product_category where lower(category_name) like ?`,
  categoryDetail: `select * from product_category where product_category_id=?`,
  categoryInsert: `insert into product_category set ?`,
  categoryUpdate: `update product_category set ? where product_category_id=?`,
  categoryDelete: `delete from product_category where product_category_id=?`,
  imageInsert: `insert into product_image set ?`,
  productCount: `select count(*) as count from product where product_category_id=?`,
  supplierInsert: `insert into product_supplier set ?`,
  supplierList: `select * from product_supplier`,
  supplierDetail: `select * from product_supplier where supplier_id=?`,
  supplierListByCondition: `select * from product_supplier where lower(supplier_name) like ?`,
  productCountBySupplierID: `select count(*) as count from product where supplier_id=?`,
  supplierDelete: `delete from product_supplier where supplier_id=?`,
  productInsert: `insert into product set ?`,
  productList: `select t1.*, t2.category_name, t3.supplier_name from product t1, product_category t2, product_supplier t3 where t1.product_category_id=t2.product_category_id and t1.supplier_id=t3.supplier_id`,
  productDetail: `select t1.*, t2.category_name, t3.supplier_name from product t1, product_category t2, product_supplier t3 where t1.product_id=? and t1.product_category_id=t2.product_category_id and t1.supplier_id=t3.supplier_id`,
  customerList: `select * from customer`,
  shipperList: `select * from product_shipper`,
  orderInsert: `insert into order_header set ?`,
  orderItemInsert: `insert into order_detail (order_id, product_id, order_qty) values ?`,
  shipperMultipleInsert: `insert into product_shipper (shipper_name, phone, address, delivery_yn, active_yn) values ?`,
};
