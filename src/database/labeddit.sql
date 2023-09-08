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
    updated_at TEXT NOT NULL
);

CREATE TABLE comments_likes_dislikes(
    user_id TEXT NOT NULL,
    comment_id TEXT NOT NULL,
    like INTEGER NOT NULL
);

/* 
token flavia: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRlYzNmNDA0LWQ5OWEtNGI3NC1iYmE1LTdkM2U1OTQ0ZWYzMyIsIm5hbWUiOiJGbMOhdmlhIEZlcm5hbmRhIiwicm9sZSI6Ik5PUk1BTCIsImlhdCI6MTY5NDA1MDI2MiwiZXhwIjoxNjk0NjU1MDYyfQ.kURjUFd9XDM2fcC8kLGL3yEE8e1UA3AFLzhRnZravcw"
 */