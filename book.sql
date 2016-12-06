/*
Navicat PGSQL Data Transfer

Source Server         : Local Postgres
Source Server Version : 90600
Source Host           : localhost:5432
Source Database       : fak
Source Schema         : public

Target Server Type    : PGSQL
Target Server Version : 90600
File Encoding         : 65001

Date: 2016-12-06 07:46:17
*/


-- ----------------------------
-- Table structure for book
-- ----------------------------
DROP TABLE IF EXISTS "public"."book";
CREATE TABLE "public"."book" (
"id" int4 DEFAULT nextval('book_id_seq'::regclass) NOT NULL,
"name" varchar(255) COLLATE "default",
"title" varchar(255) COLLATE "default",
"totalPage" int2,
"active" bool,
"created_at" timestamp(6),
"updated_at" timestamp(6)
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of book
-- ----------------------------
INSERT INTO "public"."book" VALUES ('1', 'Nguyễn Duy Cường', 'React Base Fiddle (JSX)', '99', 't', '2016-12-05 13:57:41.052', '2016-12-05 23:12:44.108');
INSERT INTO "public"."book" VALUES ('2', 'Training react', 'Training react', '101', 'f', '2016-12-05 07:02:58.055', '2016-12-06 01:38:53.474');
INSERT INTO "public"."book" VALUES ('3', 'Trang Kieu', 'Anh Yeu Em', '10', 't', '2016-12-05 14:45:09.519', '2016-12-06 00:23:27.213');
INSERT INTO "public"."book" VALUES ('6', 'DachShun', 'Dog', '12', 't', '2016-12-05 14:54:35.204', '2016-12-05 23:13:17.609');
INSERT INTO "public"."book" VALUES ('9', 'Kuong', 'Training react', '12', null, '2016-12-05 22:14:37.658', '2016-12-05 22:14:37.658');
INSERT INTO "public"."book" VALUES ('11', 'Training react', 'React Base Fiddle (JSX)', '12', 't', '2016-12-05 22:18:45.008', '2016-12-05 22:18:45.008');
INSERT INTO "public"."book" VALUES ('15', 'I love you', 'chan may roi', '12', 't', '2016-12-05 22:29:39.507', '2016-12-05 22:29:39.507');
INSERT INTO "public"."book" VALUES ('16', 'Trang Cun', 'Hehe', '12', 't', '2016-12-05 22:52:45.579', '2016-12-05 22:52:45.579');
INSERT INTO "public"."book" VALUES ('17', 'Chan lam roi', 'Hahaha', '12', 't', '2016-12-06 00:26:41.122', '2016-12-06 00:26:41.122');

-- ----------------------------
-- Alter Sequences Owned By 
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table book
-- ----------------------------
ALTER TABLE "public"."book" ADD PRIMARY KEY ("id");
