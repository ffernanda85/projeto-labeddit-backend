-- Active: 1694546131488@@127.0.0.1@3306
CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT(DATETIME())
);

CREATE TABLE posts(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER NOT NULL,
    dislikes INTEGER NOT NULL,
    comments INTEGER NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    Foreign Key (creator_id) REFERENCES users(id)
    ON UPDATE CASCADE
);

CREATE TABLE posts_likes_dislikes(
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    Foreign Key (user_id) REFERENCES users(id),
    Foreign Key (post_id) REFERENCES posts(id)
);

CREATE TABLE comments(
    id TEXT PRIMARY KEY NOT NULL UNIQUE,
    post_id TEXT NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER NOT NULL,
    dislikes INTEGER NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    Foreign Key (post_id) REFERENCES posts(id),
    Foreign Key (creator_id) REFERENCES users(id)
);

CREATE TABLE comments_likes_dislikes(
    user_id TEXT NOT NULL,
    comment_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    Foreign Key (user_id) REFERENCES users(id),
    Foreign Key (comment_id) REFERENCES comments(id)
);

DROP TABLE comments_likes_dislikes;

/* 
token flavia: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRlYzNmNDA0LWQ5OWEtNGI3NC1iYmE1LTdkM2U1OTQ0ZWYzMyIsIm5hbWUiOiJGbMOhdmlhIEZlcm5hbmRhIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNjk2NTM3MzQ4LCJleHAiOjE2OTcxNDIxNDh9.CSRZ5TwPn9ZRh3cvSZ30VvWUPJmhy3jpztVteiAOC9w"

token flavia2 : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI1MTZmNWZjLTQxMGEtNGNlYi1iNzQ3LWUxYWUxYWJkNzcyNiIsIm5hbWUiOiJGbMOhdmlhIEZlcm5hbmRhIDIiLCJyb2xlIjoiTk9STUFMIiwiaWF0IjoxNjk0MTk5NDQ4LCJleHAiOjE2OTQ4MDQyNDh9.JSeOX3INk3YWUW8mg9Wilv2RcxAdn9LEYOJhIMLJDCs"

token josefa:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyZmVmMTdhLTU0ZDItNDZmYS04YmMwLWMyZTQ2ZWZjMDczNCIsIm5hbWUiOiJKb3NlZmEgTWFyaWEiLCJyb2xlIjoiTk9STUFMIiwiaWF0IjoxNjk0NTQ2MjczLCJleHAiOjE2OTUxNTEwNzN9.0TkNL6TNLHtl9xIwhF3viUlyuOpnqre29qOBM-eD-q8

token tonho:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAxNzY4Nzk3LTFkNTEtNGFmNC1iMGUzLTg3OTFiZGJkYjYzYiIsIm5hbWUiOiJBbnRvbmlvIGpvc2VmaW5vIiwicm9sZSI6Ik5PUk1BTCIsImlhdCI6MTY5NDU0NjMyOSwiZXhwIjoxNjk1MTUxMTI5fQ.9a5dAahfe2J0PQicG0OpR8Wa-8HWWGTqpL-YuXUyyOQ

token teste:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MTlkZTk1LWVkZmYtNGM4OS05ZTBhLWI0MjViM2E2ZDE1NCIsIm5hbWUiOiJ0ZXN0ZSIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE2OTY0MjQ2NjUsImV4cCI6MTY5NzAyOTQ2NX0.v6JyL3zl8IqVv_BnH-XPHCW82CPm2yN9bU4gDrhjZz4

 */

