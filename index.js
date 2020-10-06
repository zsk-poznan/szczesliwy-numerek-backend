const puppeteer = require('puppeteer');
const fs = require('fs').promises;
(async () => {
    const d = new Date();
    if (d.getDay() == 0 || d.getDay() == 6) {
        var liceum = 0;
        var technikum = 0;
    } else {
        const browser = await puppeteer.launch({executablePath: process.env.PUPPETEER_EXEC_PATH, headless: false, args:["--no-sandbox"]});
        const page = await browser.newPage();
        await page.goto("https://cufs.vulcan.net.pl/poznan/Account/LogOn?ReturnUrl=%2Fpoznan%2FFS%2FLS%3Fwa%3Dwsignin1.0%26wtrealm%3Dhttps%253a%252f%252fuonetplus.vulcan.net.pl%252fpoznan%252fLoginEndpoint.aspx%26wctx%3Dhttps%253a%252f%252fuonetplus.vulcan.net.pl%252fpoznan%252fLoginEndpoint.aspx");
        await page.evaluate((login, password) => {
            document.querySelector("#LoginName").value = login;
            document.querySelector("#Password").value = password;
        }, process.env.VLogin, process.env.VPassword);
        await page.click('input[type="submit"]');
        await page.waitFor(4000);
        await page.goto("https://uonetplus.vulcan.net.pl/poznan/Start.mvc/GetTeacherLuckyNumbers")
        var output = JSON.parse(await page.evaluate(() => document.querySelector("body").innerText));
        var liceum = parseInt(output["data"][0]["Zawartosc"][0]["Zawartosc"][0]["Nazwa"].match(/..$/));
        var technikum = parseInt(output["data"][0]["Zawartosc"][1]["Zawartosc"][0]["Nazwa"].match(/..$/));
        await browser.close();
    }
    try {await fs.stat("output")} catch(e) {if (e.code == "ENOENT") fs.mkdir("./output")};
    var out = {LO: liceum, TK: technikum, date: d.toString()};
    await fs.writeFile("./output/index.html", JSON.stringify(out));
})();
