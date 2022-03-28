USE MYSQL;

select * from paymentlist;

ALTER TABLE `PHOTO` MODIFY `PHOTOURL` VARCHAR(400);
ALTER TABLE `PAYMENTLIST` ADD `PAYMENTSEQ` INTEGER AFTER `PAYMENTLISTSEQ`;
ALTER TABLE `PAYMENTLIST` ADD CONSTRAINT `FK_PAYMENT_TO_PAYMENTLIST` FOREIGN KEY (
	`PAYMENTSEQ`
)
REFERENCES `PAYMENT` (
	`PAYMENTSEQ`
);

ALTER TABLE `PAYMENTLIST` MODIFY `MEMBERID` VARCHAR(20);

ALTER TABLE `PAYMENTLIST` ADD `MEMBERID` VARCHAR(20) AFTER `PAYMENTSEQ`;
ALTER TABLE `PAYMENTLIST` ADD CONSTRAINT `FK_MEMBERS_TO_PAYMENTLIST` FOREIGN KEY (
	`MEMBERID`
)
REFERENCES `MEMBERS` (
	`MEMBERID`
);

CREATE TABLE `COINTRANSACTION` (
	`COINTRANSACTIONSEQ` INTEGER PRIMARY KEY,
	`MEMBERID`	VARCHAR(20)	NOT NULL,
    `DOCSSEQ` INTEGER NOT NULL,
	`COINCOUNT`	INTEGER	NOT NULL,
	`COININOUT`	VARCHAR(10)	NOT NULL,
    `COINDATE` DATE NOT NULL
);

ALTER TABLE `COINTRANSACTION` ADD CONSTRAINT `FK_MEMBERS_TO_COINTRANSACTION` FOREIGN KEY (
	`MEMBERID`
)
REFERENCES `MEMBERS` (
	`MEMBERID`
);

-- 구매의 DOCSSEQ는 차후 변경해야함
INSERT INTO COINTRANSACTION(COINTRANSACTIONSEQ, MEMBERID, DOCSSEQ, COINCOUNT, COININOUT, COINDATE)
    VALUES(NEXTVAL('COINTRANSACTIONSEQ'), 'test', 2, 1000, '구매', '2022-03-24');

UPDATE MEMBERS SET MEMBERCOIN=MEMBERCOIN+1000 WHERE MEMBERID='test';

INSERT INTO COINTRANSACTION(COINTRANSACTIONSEQ, MEMBERID, DOCSSEQ, COINCOUNT, COININOUT, COINDATE)
    VALUES(NEXTVAL('COINTRANSACTIONSEQ'), 'test', 2, 200, '사용', '2022-03-24');
    
UPDATE MEMBERS SET MEMBERCOIN=MEMBERCOIN-200 WHERE MEMBERID='test';
UPDATE RECIPE SET RECIPEVIDEOURL='https://www.youtube.com/watch?v=UEfoOmupTG8';
UPDATE SEQUENCES SET CURRVAL=1 WHERE NAME='RECIPESEQ';
UPDATE RATING SET DOCSSEQ=0;
UPDATE RECIPE SET RECIPESEQ=1 WHERE RECIPESEQ=2;

SELECT * FROM MEMBERS;
SELECT * FROM COINTRANSACTION;
SELECT * FROM RECIPE;
SELECT * FROM SEQUENCES;
SELECT * FROM RATING;

DROP TABLE COINTRANSACTION;

ALTER TABLE `RECIPE` ADD `RECIPEVIDEOURL` VARCHAR(400) AFTER `RECIPESMALLCATEGORY`;


INSERT INTO RECIPE(RECIPESEQ, MEMBERID, RECIPETITLE, RECIPECONTENT, RECIPEBIGCATEGORY, RECIPESMALLCATEGORY, RECIPEVIDEOURL, RECIPEGOODSTAG, RECIPEPRICE, RECIPERATING)
VALUES(
    NEXTVAL('RECIPESEQ'), 
    'test', 
    '약 4,000원어치 고기로 만드는 그럴~듯한 스테이크!', 
    '오늘은 제가 좋아하는 한돈 뒷다릿살로 그럴듯한 스테이크를 만들어 볼게요!',
    '육류',
    '간단한 요리',
    'https://www.youtube.com/watch?v=UEfoOmupTG8',
    '칼,프라이팬',
    0,
    0.0
)