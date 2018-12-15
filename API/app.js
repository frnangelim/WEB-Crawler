var app = require("./app_config.js");

const cheerio = require("cheerio");
const request = require("request");

app.get("/:date", async function(req, res) {
    let data = await getCurrencyByDate(req.params.date);
    res.json(data);
});

app.get("/:begin/:end", async function(req, res) {
    let allDates = getDates(req.params.begin, req.params.end);
    let allCurrencies = [];

    let currentDateString;
    for (let i = 0; i < allDates.length; i++) {
        currentDateString = convertDateToString(allDates[i]);
        let data = await getCurrencyByDate(currentDateString);
        allCurrencies.push(data);
    }

    res.json(allCurrencies);
});

function getCurrencyByDate(currentDate) {
    return new Promise((resolve, reject) => {
        request(
            "https://www.neocambio.io/cotacao/euro/" + currentDate,
            (error, response, html) => {
                if (!error && response.statusCode === 200) {
                    const $ = cheerio.load(html);
                    const currencies = $(".currency__wrapper h2")
                        .text()
                        .split("R$ ");

                    let euroValue = parseFloat(
                        currencies[0].split(" ")[1].replace(",", ".")
                    );
                    let realValue = parseFloat(currencies[1].replace(",", "."));

                    let data = { date: currentDate, euro: euroValue, real: realValue };

                    resolve(data);
                } else if (error) {
                    reject(error);
                }
            }
        );
    });
}

function newDateFromString(stringDate) {
    let dateSplitted = stringDate.split("-");
    return new Date(dateSplitted[2], dateSplitted[1] - 1, dateSplitted[0]);
}

function getDates(beginDate, endDate) {
    let startDate = newDateFromString(beginDate);
    let stopDate = newDateFromString(endDate);
    let dateArray = [];
    let currentDate = startDate;

    while (currentDate <= stopDate) {
        dateArray.push(new Date(currentDate));
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}

Date.prototype.addDays = function(days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

function convertDateToString(inputFormat) {
    function pad(s) {
        return s < 10 ? "0" + s : s;
    }
    var d = new Date(inputFormat);
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("-");
}
