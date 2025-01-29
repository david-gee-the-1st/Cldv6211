-- Creating User, Product, and Transactional

create table Users(
UserID int identity(1,1) not null,
UserName varchar(100) not null,
UserEmail varchar(100) not null,
User_Address varchar(100) not null,
UserPassword varchar(20),
primary key (UserID)
);

create table Product(
ProductID int identity(1,1) not null,
ProductName varchar(100),
Price int not null,
Category varchar(100),
primary key (ProductID)
);

create table Transactional(
TransactionalID varchar(200) ,
Date_of_transaction date not null,
ProductID int,
UserId int,
foreign key (ProductID) references Product(ProductID),
foreign key (UserID) references Users(UserID),
primary key (TransactionalID)
);

-- Inserting sample data (W3SCHOOLS) 
insert into Users(
UserName, User_Address, UserEmail, UserPassword
)values ('Mohau', 'Menyatsoe', 'm.men@gmail.com', 'Zeerust'),('Nokwanda', 'Ja', 'N.Jay@gmail.com', 'Menlyn'),('Lebo', 'Dub', 'Lo.dub@gmail.com', 'Menlyn');

insert into Product(
 ProductName,
 Price,
 Category
)
values
('LongPi Pottery Cup','70','Kitchen'),
('Sabai Baskets','299','Storage'),
('Banjara Wooden Cup','149','Kitchen');

insert into Transactional(
Date_of_transaction)
values
('2024-05-03'),
('2024-05-03'),
('2024-03-30'),
('2024-05-17'),
('2024-05-27');
