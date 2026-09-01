-- ShopSense PostgreSQL Database DDL Schema

CREATE TABLE IF NOT EXISTS vendors (
  id VARCHAR(50) PRIMARY KEY,
  store_name VARCHAR(100) NOT NULL,
  owner_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  joined_date DATE NOT NULL,
  total_gmv NUMERIC(12, 2) DEFAULT 0.00,
  orders_count INT DEFAULT 0,
  commission_rate NUMERIC(4, 2) DEFAULT 10.00,
  status VARCHAR(20) DEFAULT 'Active'
);

CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  category VARCHAR(100) NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  rating NUMERIC(3, 2) DEFAULT 4.5,
  reviews_count INT DEFAULT 0,
  specs TEXT,
  image_url TEXT,
  stock_quantity INT DEFAULT 100
);

CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(50) PRIMARY KEY,
  vendor_id VARCHAR(50) REFERENCES vendors(id),
  order_date TIMESTAMP NOT NULL,
  customer_name VARCHAR(100) NOT NULL,
  customer_email VARCHAR(100) NOT NULL,
  total_amount NUMERIC(10, 2) NOT NULL,
  payment_status VARCHAR(20) NOT NULL,
  order_status VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id VARCHAR(50) REFERENCES orders(id),
  product_id VARCHAR(50) REFERENCES products(id),
  quantity INT NOT NULL,
  unit_price NUMERIC(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS customer_reviews (
  id SERIAL PRIMARY KEY,
  product_id VARCHAR(50) REFERENCES products(id),
  customer_name VARCHAR(100),
  rating INT CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
