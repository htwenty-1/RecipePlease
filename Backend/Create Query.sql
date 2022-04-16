CREATE TABLE `MEMBERS` (
	`MEMBERID`	VARCHAR(20)	PRIMARY KEY,
	`MEMBERPWD`	VARCHAR(100)	NOT NULL,
	`MEMBERNICKNAME`	VARCHAR(50)	NOT NULL,
	`MEMBEREMAIL`	VARCHAR(30)	NULL,
	`MEMBERPHONE`	VARCHAR(20)	NULL,
	`MEMBERCOIN`	INTEGER	NOT NULL,
	`MEMBERMAINADDR`	VARCHAR(100)	NULL,
	`MEMBERDETAILADDR`	VARCHAR(100)	NULL,
	`MEMBERZIPCODE`	INTEGER	NULL,
	`MEMBERGENDER`	VARCHAR(10)	NULL,
	`MEMBERNAME`	VARCHAR(20)	NULL,
	`MEMBERGRADE`	VARCHAR(50)	NOT NULL,
	`SALT`	VARCHAR(100)	NOT NULL
);

CREATE TABLE `GOODS` (
	`GOODSSEQ`	INTEGER	PRIMARY KEY,
	`GOODSNAME`	VARCHAR(20)	NOT NULL,
	`GOODSPRICE`	INTEGER	NOT NULL,
	`GOODSCATEGORY`	VARCHAR(20)	NOT NULL,
	`GOODSCOUNT`	INTEGER	NOT NULL,
	`GOODSVIEW`	INTEGER	NOT NULL,
	`GOODSRATING`	FLOAT	NOT NULL,
	`GOODSCONTENT`	TEXT	NULL,
    `GOODSREADCOUNT` INTEGER NOT NULL
);

INSERT INTO GOODS(GOODSSEQ, GOODSNAME, GOODSPRICE, GOODSCATEGORY, GOODSCOUNT, GOODSVIEW, GOODSRATING, GOODSCONTENT, GOODSREADCOUNT)
VALUES(
    NEXTVAL('GOODSSEQ'), 
    '나무도마', 
    70000, 
    '조리도구세트',
    0,
    0,
    0,
    '../assets/goodsdetail/good1.jpg',
    0
);
CREATE TABLE `RECIPE` (
	`RECIPESEQ`	INTEGER	PRIMARY KEY,
	`MEMBERID`	VARCHAR(20)	NOT NULL,
	`RECIPETITLE`	VARCHAR(50)	NOT NULL,
	`RECIPECONTENT`	TEXT	NOT NULL,
	`RECIPEBIGCATEGORY`	VARCHAR(20)	NOT NULL,
	`RECIPESMALLCATEGORY`	VARCHAR(50)	NOT NULL,
	`RECIPEVIDEOURL`	VARCHAR(400)	NOT NULL,
	`RECIPEGOODSTAG`	VARCHAR(50)	NOT NULL,
	`RECIPEPRICE`	INTEGER	NOT NULL,
	`RECIPERATING`	FLOAT	NOT NULL,
    `RECIPEREADCOUNT` INTEGER NOT NULL,
    `RECIPECAPACITY` INTEGER,
    `RECIPETHUMBNAIL` VARCHAR(400)
);

CREATE TABLE `RECIPELIKE` (
	`LIKESEQ`	INTEGER	PRIMARY KEY,
	`RECIPESEQ`	INTEGER	NOT NULL,
	`MEMBERID`	VARCHAR(20)	NOT NULL
);

CREATE TABLE `RATING` (
	`RATINGSEQ`	INTEGER	PRIMARY KEY,
    `MEMBERID`	VARCHAR(20) NOT NULL,
	`DOCSSEQ`	INTEGER	NOT NULL,
	`RATINGCATEGORY`	VARCHAR(20)	NOT NULL,
	`RATINGSCORE`	INTEGER	NOT NULL,
	`RATINGCOMMENT`	VARCHAR(1000)	NOT NULL
);

CREATE TABLE `PAYMENT` (
	`PAYMENTSEQ`	INTEGER	PRIMARY KEY,
	`MEMBERID`	VARCHAR(20)	NOT NULL,
	`PAYMENTPAY`	INTEGER	NOT NULL,
	`PAYMENTDATE`	DATE	NOT NULL,
	`PAYMENTDEL`	INTEGER	NULL,
	`PAYMENTMAIN_ADDR`	VARCHAR(100)	NULL,
	`PAYMENTDETAILADDR`	VARCHAR(100)	NULL,
	`PAYMENTZIPCODE`	INTEGER	NULL,
	`PAYMENTCATEGORY`	VARCHAR(20)	NOT NULL,
	`PAYMENTCOUNT`	INTEGER	NOT NULL
);

CREATE TABLE `PAYMENTLIST` (
	`PAYMENTLISTSEQ`	INTEGER	PRIMARY KEY,
	`PURCHASEPRODUCTSEQ`	INTEGER	NOT NULL,
	`PAYMENTLISTCATEGORY`	VARCHAR(20)	NOT NULL,
	`PAYMENTCOUNT`	INTEGER	NOT NULL,
	`PAYMENTLISTPAY`	INTEGER	NOT NULL
);

CREATE TABLE `PHOTO` (
	`PHOTOSEQ`	INTEGER	PRIMARY KEY,
	`DOCSSEQ`	INTEGER	NOT NULL,
	`PHOTOTITLE`	VARCHAR(100)	NULL,
	`PHOTOCONTENT`	VARCHAR(100)	NULL,
	`PHOTOCATEGORY`	VARCHAR(20)	NULL,
	`PHOTOURL`	VARCHAR(400)	NULL
);

CREATE TABLE `COINTRANSACTION` (
	`COINTRANSACTIONSEQ` INTEGER PRIMARY KEY,
	`MEMBERID`	VARCHAR(20)	NOT NULL,
    `DOCSSEQ` INTEGER NOT NULL,
	`COINCOUNT`	INTEGER	NOT NULL,
	`COININOUT`	VARCHAR(10)	NOT NULL,
    `COINDATE` DATE NOT NULL
);


-- 만약 PHOTOURL의 사이즈가 100일 경우
ALTER TABLE `PHOTO` MODIFY `PHOTOURL` VARCHAR(400);

-- 만약 PAYMENTLIST에 PAYMENTSEQ 컬럼이 없는 경우
ALTER TABLE `PAYMENTLIST` ADD `PAYMENTSEQ` INTEGER AFTER `PAYMENTLISTSEQ`;
ALTER TABLE `PAYMENTLIST` ADD CONSTRAINT `FK_PAYMENT_TO_PAYMENTLIST` FOREIGN KEY (
	`PAYMENTSEQ`
)
REFERENCES `PAYMENT` (
	`PAYMENTSEQ`
);

-- 만약 PAYMENTLIST에 PAYMENTSEQ 컬럼이 없는 경우
ALTER TABLE `PAYMENTLIST` ADD `MEMBERID` INTEGER AFTER `MEMBERID`;
ALTER TABLE `PAYMENTLIST` ADD CONSTRAINT `FK_MEMBERS_TO_PAYMENTLIST` FOREIGN KEY (
	`MEMBERID`
)
REFERENCES `MEMBERS` (
	`MEMBERID`
);

-- 만약 RECIPE와 GOODS에 READCOUNT 열이 없는 경우
ALTER TABLE RECIPE ADD RECIPEREADCOUNT INTEGER DEFAULT 0 NOT NULL;
ALTER TABLE GOODS ADD GOODSREADCOUNT INTEGER DEFAULT 0 NOT NULL;

-- 만약 RECIPE에 RECIPECAPACITY 열이 없는 경우
ALTER TABLE `RECIPE` ADD `RECIPECAPACITY` INTEGER AFTER `RECIPEREADCOUNT`;

-- 만약 RECIPE에 RECIPETHUMBNAIL 열이 없는 경우
ALTER TABLE `RECIPE` ADD `RECIPETHUMBNAIL` INTEGER AFTER `RECIPEREADCOUNT`;


-- 제약조건 추가
ALTER TABLE `RECIPE` ADD CONSTRAINT `FK_MEMBERS_TO_RECIPE_1` FOREIGN KEY (
	`MEMBERID`
)
REFERENCES `MEMBERS` (
	`MEMBERID`
) ON DELETE CASCADE;

ALTER TABLE `RECIPELIKE` ADD CONSTRAINT `FK_RECIPE_TO_RECIPELIKE_1` FOREIGN KEY (
	`RECIPESEQ`
)
REFERENCES `RECIPE` (
	`RECIPESEQ`
) ON DELETE CASCADE;

ALTER TABLE `RECIPELIKE` ADD CONSTRAINT `FK_RECIPE_TO_RECIPELIKE_2` FOREIGN KEY (
	`MEMBERID`
)
REFERENCES `RECIPE` (
	`MEMBERID`
) ON DELETE CASCADE;

ALTER TABLE `RATING` ADD CONSTRAINT `FK_MEMBERS_TO_RATING` FOREIGN KEY (
	`MEMBERID`
)
REFERENCES `MEMBERS` (
	`MEMBERID`
) ON DELETE CASCADE;

---------------------- 더이상 적용되지 않는 제약사항 --------------------------
ALTER TABLE `PAYMENTLIST` ADD CONSTRAINT `FK_PAYMENT_TO_PAYMENTLIST` FOREIGN KEY (
	`PAYMENTSEQ`
)
REFERENCES `PAYMENT` (
	`PAYMENTSEQ`
);

ALTER TABLE `COINTRANSACTION` ADD CONSTRAINT `FK_MEMBERS_TO_COINTRANSACTION` FOREIGN KEY (
	`MEMBERID`
)
REFERENCES `MEMBERS` (
	`MEMBERID`
) ON DELETE CASCADE;
---------------------------------------------------------------------------

-- 제약사항 지우기
ALTER TABLE `RECIPE` DROP FOREIGN KEY `FK_MEMBERS_TO_RECIPE_1`;
ALTER TABLE `RECIPELIKE` DROP FOREIGN KEY `FK_RECIPE_TO_RECIPELIKE_1`;
ALTER TABLE `RECIPELIKE` DROP FOREIGN KEY `FK_RECIPE_TO_RECIPELIKE_2`;
ALTER TABLE `RATING` DROP FOREIGN KEY `FK_MEMBERS_TO_RATING`;
ALTER TABLE `PAYMENT` DROP FOREIGN KEY `FK_MEMBERS_TO_PAYMENT_1`;
ALTER TABLE `COINTRANSACTION` DROP FOREIGN KEY `FK_MEMBERS_TO_COINTRANSACTION`;
    
DROP TABLE `PAYMENTLIST`;
DROP TABLE `PAYMENT`;
DROP TABLE `PHOTO`;
DROP TABLE `RATING`;
DROP TABLE `RECIPELIKE`;
DROP TABLE `RECIPE`;
DROP TABLE `MEMBERS`;
DROP TABLE `GOODS`;