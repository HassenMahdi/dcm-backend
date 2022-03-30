
select * from 
    (select * from products p join stock s where p.id = s.productId and s.product) as product_stocks
    where product_stocks.amount


-- Amount Bought
select Sum(s.amount) ,s.prodcutId from stock s join vendor_order_items voi where voi.id = s.productId GROUPBY s.productId

-- Amount Sold 
select Sum(s.amount) ,s.prodcutId from stock s join customer_order_items coi where coi.id = s.productId GROUPBY s.productId


SELECT
    *
FROM 
    products p
LEFT JOIN (select productId, SUM(amount) as amount from stock GROUPBY productId) stock ON stock.productId=p.id
LEFT JOIN (select productId, SUM(amount) as amount from customer_order_items GROUPBY productId) as sold ON sold.productId=p.id
LEFT JOIN (select productId, SUM(amount) as amount from vendor_order_items GROUPBY productId) as bought ON bought.productId=p.id

WHERE stock.amount < bought.amount - sold.amount