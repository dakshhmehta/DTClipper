function log(msg){
    console.log(msg);
}

log('Loaded background.js');
log(browser);

browser.browserAction.onClicked.addListener((tab) => {
    log(tab)

    browser.cookies.getAll({
        domain: "domaintyper.com",
        name: 'Domaintyper_Fav_Cookie'
    }).then((cookies) => {
        const value = JSON.parse(decodeURI(cookies[0].value).replace(/%2C/g,","));
        log(value);

        navigator.clipboard.writeText(value.join("\n")).then(function() {
            log('Copied data to clipboard.');
            tab.executeScript({code: "alert('Copied list of saved domains to your clipboard.');"});
        });
    })
})