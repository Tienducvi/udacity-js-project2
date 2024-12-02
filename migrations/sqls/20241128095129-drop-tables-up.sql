/* Replace with your SQL commands */

create table products (
    id serial primary key,
    name varchar(1000) not null,
    price integer not null
);

create table users (
    id          serial primary key,
    username    varchar(250) not null,
    firstname   varchar(250) not null, 
    lastname    varchar(250) not null, 
    password    varchar(1000) not null
);

create table orders (
    id serial primary key,
    product_id integer not null references products (id),
    quantity integer not null,
    user_id integer not null references users (id),
    status varchar(200) not null  
);

create table order_products (
    order_id integer not null references orders (id),
    user_id integer not null references users (id),
    product_id integer not null references products (id),
    quantity integer not null
);