-- Active: 1694024846670@@127.0.0.1@3306
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
    Foreign Key (comment_id) REFERENCES comment(id)
);

DROP TABLE comments;

/* 
token flavia: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRlYzNmNDA0LWQ5OWEtNGI3NC1iYmE1LTdkM2U1OTQ0ZWYzMyIsIm5hbWUiOiJGbMOhdmlhIEZlcm5hbmRhIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNjk0NDY2MTc4LCJleHAiOjE2OTUwNzA5Nzh9.fXiI-4c5LdGzFnmOAQp6mE2CpEkCY-0iDPOvjWWeeUA"

token flavia2 : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI1MTZmNWZjLTQxMGEtNGNlYi1iNzQ3LWUxYWUxYWJkNzcyNiIsIm5hbWUiOiJGbMOhdmlhIEZlcm5hbmRhIDIiLCJyb2xlIjoiTk9STUFMIiwiaWF0IjoxNjk0MTk5NDQ4LCJleHAiOjE2OTQ4MDQyNDh9.JSeOX3INk3YWUW8mg9Wilv2RcxAdn9LEYOJhIMLJDCs"
 */