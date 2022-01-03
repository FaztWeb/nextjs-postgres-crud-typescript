CREATE USER developer WITH PASSWORD 'developer';
CREATE DATABASE users_db;
CREATE DATABASE users_shadow_db;
GRANT ALL PRIVILEGES ON DATABASE users_db TO developer;
GRANT ALL PRIVILEGES ON DATABASE users_shadow_db TO developer;