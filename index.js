const puppeteer = require('puppeteer');
const fs = require('fs').promises;
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://cufs.vulcan.net.pl/poznan/Account/LogOn?ReturnUrl=%2Fpoznan%2FFS%2FLS%3Fwa%3Dwsignin1.0%26wtrealm%3Dhttps%253a%252f%252fuonetplus.vulcan.net.pl%252fpoznan%252fLoginEndpoint.aspx%26wctx%3Dhttps%253a%252f%252fuonetplus.vulcan.net.pl%252fpoznan%252fLoginEndpoint.aspx");
    await page.evaluate((login, password) => {
        document.querySelector("#LoginName").value = login;
        document.querySelector("#Password").value = password;
    }, process.env.VLogin, process.env.VPassword);
    await page.click('input[type="submit"]');
    await page.waitForNavigation();
    await page.goto("https://uonetplus.vulcan.net.pl/poznan/Start.mvc/GetTeacherLuckyNumbers")
    var output = JSON.parse(await page.evaluate(() => document.querySelector("body").innerText));
    var liceum = parseInt(output["data"][0]["Zawartosc"][0]["Zawartosc"][0]["Nazwa"].match(/..$/));
    var technikum = parseInt(output["data"][0]["Zawartosc"][1]["Zawartosc"][0]["Nazwa"].match(/..$/));
    try {await fs.stat("output")} catch(e) {if (e.code == "ENOENT") fs.mkdir("./output")};
    output = {LO: liceum, TK: technikum};
    await fs.writeFile("./output/index.html", JSON.stringify(output));
    await browser.close();
})();