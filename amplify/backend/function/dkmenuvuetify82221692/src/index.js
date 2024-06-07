

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const cheerio = require("cheerio");
const moment = require("moment");
const axios = require("axios");
const VerEx = require("verbal-expressions");

let cachedData = null;

exports.handler = async (event) => {
    // console.log(`EVENT: ${JSON.stringify(event)}`);

    if(cachedData){
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Restrict this to domains you trust
                "Access-Control-Allow-Headers": "*", // Specify only the headers you need to allow
            },
            body: JSON.stringify(cachedData),
        };
    }

    try {
        // 교직원 식당
        const officerResponse = await axios("https://www.dankook.ac.kr/web/kor/-555")
        const officerMenuByDate = await convertMenuFromHtml(officerResponse);

        // 학생 식당
        const studentResponse = await axios("https://www.dankook.ac.kr/web/kor/-556")
        const studentMenuByDate = await convertMenuFromHtml(studentResponse);

        cachedData = {
            officer : officerMenuByDate,
            student : studentMenuByDate,
        }
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Restrict this to domains you trust
                "Access-Control-Allow-Headers": "*", // Specify only the headers you need to allow
            },
            body: JSON.stringify(cachedData),
        };
    } catch (error) {
        
        return {
            statusCode: 500,
            body: JSON.stringify({ error: true, error }),
        };
    }    
};


function convertMenuFromHtml (response){
    return new Promise((resolve, reject) => {
        try {
            // cheerio 를 이용해 사이트 코드 파싱
            const $ = cheerio.load(response.data);
            // 일별 날짜와 메뉴 정보 row(tr) 추출
            const menuTr = $(".type_food tbody > tr");
            // 각각의 row 를 이용하여 날짜와 데이터 분리 & 분석
            let menuByDate = [];
            for (const tr of menuTr) {
                // 날짜 변환
                /*
                    "04월15일" 과 같은 형태를 javascript datetime 형으로 변경
                */
                const rowDate = $(tr).find(".name_date").text();
                const momentDate = moment(rowDate, "MM월 DD일");
                const convertedDate = {
                    normal: momentDate.format("YYYY-MM-DD"),
                    parsed: {
                        year: momentDate.format("YYYY"),
                        month: momentDate.format("MM"),
                        day: momentDate.format("DD"),
                    },
                };
                // 내용 분석 & 변환
                /*
                    --제목--
                    金04월14일

                    --내용--
                    조식 [미운영]

                    중식 [11:0 ~ 13:30]
                    \ 8,000
                    쌀밥
                    황태해장국
                    간장불고기
                    치커리무침
                    닭강정
                    파김치
                    주스
                    야채샐러드

                    석식 [미운영]

                    기타 []
                    * 메뉴는 식자재 수불 사정 및 식수 편차에 의해 변경 될 수 있습니다.

                */
                if (momentDate.isValid()) {
                    const content = $(tr).find("td:eq(1)").html();
                    const contentByLine = content.split("<br>");
                    const dataset = {
                        breakfast: {
                            price: 0,
                            content: [],
                        },
                        lunch: {
                            price: 0,
                            content: [],
                        },
                        dinner: {
                            price: 0,
                            content: [],
                        },
                        etc: {
                            price: 0,
                            content: [],
                        },
                    };

                    let nodeType = null;
                    contentByLine.forEach((line) => {
                        if (line && line.includes("조식")) {
                            nodeType = "breakfast";
                        } else if (line && line.includes("중식")) {
                            nodeType = "lunch";
                        } else if (line && line.includes("석식")) {
                            nodeType = "dinner";
                        } else if (line && line.includes("기타")) {
                            nodeType = "etc";
                        }
                        if (line) {
                            line = line.trim();

                            const priceTester = VerEx()
                                .startOfLine()
                                .then("\\")
                                .maybe(" ")
                                .range("0", "9")
                                .anythingBut(" ")
                                .endOfLine();
                            if (priceTester.test(line)) {
                                line = line.replace(/[^\p{L}\d]/gu, "");
                                dataset[nodeType].price = line;
                            }
                            if (line) {
                                line = cheerio.load(line).text().trim();
                                dataset[nodeType].content.push(line);
                            }
                        }
                    });

                    menuByDate.push({
                        date: convertedDate,
                        content: dataset,
                    });
                }
            }
            resolve(menuByDate);
        } catch (error) {
            console.error('error:: ', error);
            reject(error);
        }
    })
}

