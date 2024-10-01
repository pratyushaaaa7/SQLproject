CREATE TABLE user (
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL
);

/* & "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p */
