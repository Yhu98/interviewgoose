# 数据库初始化
# @author <a href="https://github.com/liyupi">程序员鱼皮</a>
# @from <a href="https://yupi.icu">编程导航知识星球</a>

-- 创建库
create database if not exists interview_goose;

-- 切换库
use interview_goose;

-- 用户表
create table if not exists user
(
    id           bigint auto_increment comment 'id' primary key,
    userAccount  varchar(256)                           not null comment 'account name',
    userPassword varchar(512)                           not null comment 'account password',
    unionId      varchar(256)                           null comment 'wechat account open id',
    mpOpenId     varchar(256)                           null comment 'wechat official account openId',
    userName     varchar(256)                           null comment 'alias',
    userAvatar   varchar(1024)                          null comment 'avatar',
    userProfile  varchar(512)                           null comment 'profile',
    userRole     varchar(256) default 'user'            not null comment 'role of the account：user/admin/ban',
    editTime     datetime     default CURRENT_TIMESTAMP not null comment 'edit time',
    createTime   datetime     default CURRENT_TIMESTAMP not null comment 'creation time',
    updateTime   datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment 'update time',
    isDelete     tinyint      default 0                 not null comment 'is deleted or not',
    index idx_unionId (unionId)
) comment 'User' collate = utf8mb4_unicode_ci;

-- 题库表
create table if not exists question_bank
(
    id          bigint auto_increment comment 'id' primary key,
    title       varchar(256)                       null comment 'title',
    description text                               null comment 'content',
    picture     varchar(2048)                      null comment 'picture',
    userId      bigint                             not null comment 'user id',
    editTime    datetime default CURRENT_TIMESTAMP not null comment 'edit time',
    createTime  datetime default CURRENT_TIMESTAMP not null comment 'creation time',
    updateTime  datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment 'update time',
    isDelete    tinyint  default 0                 not null comment 'is deleted or not',
    index idx_title (title)
) comment 'Question Bank' collate = utf8mb4_unicode_ci;

-- 题目表
create table if not exists question
(
    id         bigint auto_increment comment 'id' primary key,
    title      varchar(256)                       null comment 'title',
    content    text                               null comment 'content',
    tags       varchar(1024)                      null comment 'tags list (json array)',
    answer     text                               null comment 'recommended answer',
    userId     bigint                             not null comment 'user id',
    editTime   datetime default CURRENT_TIMESTAMP not null comment 'edit time',
    createTime datetime default CURRENT_TIMESTAMP not null comment 'creation time',
    updateTime datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment 'update time',
    isDelete   tinyint  default 0                 not null comment 'is deleted or not',
    index idx_title (title),
    index idx_userId (userId)
) comment 'Question' collate = utf8mb4_unicode_ci;

create table if not exists question_bank_question
(
    id             bigint auto_increment comment 'id' primary key,
    questionBankId bigint                             not null comment 'question bank id',
    questionId     bigint                             not null comment 'question id',
    userId         bigint                             not null comment 'user id',
    createTime     datetime default CURRENT_TIMESTAMP not null comment 'creation time',
    updateTime     datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment 'update time',
    UNIQUE (questionBankId, questionId)
) comment 'Question Bank and Question relationship' collate = utf8mb4_unicode_ci;
