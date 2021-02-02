function verlustInProzentFn(input) {
    let wert = 1 - input.stoppkurs / input.einkaufskurs;
    wert = Number.parseFloat(wert.toFixed(2)) * 100;
    return Number.parseFloat(wert.toFixed(2));
}

function gUVFn(input, risikoProTradeInEuro, gewinn) {
    // console.log(risikoProTradeInEuro, gewinn.gewinnEuro);
    // let gUV = (input.zielkurs - input.einkaufskurs) / (input.einkaufskurs - input.stoppkurs);
    let gUV = gewinn.gewinnEuro / risikoProTradeInEuro;

    return Number.parseFloat(gUV.toFixed(2));
}

function stueckZahlFn(position, input) {
    let stueckZahl = position / input.einkaufskurs;
    return Number.parseFloat(stueckZahl.toFixed(2));
}

function gewinnFn(stueckZahl, input, position) {
    let gewinn = stueckZahl * input.zielkurs - position;
    let gewinnProzent = (input.zielkurs / input.einkaufskurs - 1) * 100;
    return { gewinnEuro: Number.parseFloat(gewinn.toFixed(2)), gewinnProzent: Number.parseFloat(gewinnProzent.toFixed(2)) };
}

function positionFn(risikoProTradeInEuro, verlustInProzent) {
    let position = risikoProTradeInEuro / (verlustInProzent / 100);
    return Number.parseFloat(position.toFixed(2))
}

function risikoProTradeInEuroFn(depot) {
    let proTrade = depot.einlagen * depot.risiko_per_trade / 100;
    return Number.parseFloat(proTrade.toFixed(2));
}

function realGewinnFn( stueckzahl, input ) {
    let realGewinn = stueckzahl * input.verkaufskurs - stueckzahl * input.einkaufskurs;
    return Number.parseFloat(realGewinn.toFixed(2));
}

// input = {einkaufskurs: "", stoppkurs: "", zielkurs: ""}
// depot = Komplettes Depot aus Backend
export function calculations({ depot, input }) {
    let risikoProTradeInEuro = risikoProTradeInEuroFn(depot);
    let verlustInProzent = verlustInProzentFn(input);
    let position = positionFn(risikoProTradeInEuro, verlustInProzent);
    let stueckZahl = stueckZahlFn(position, input);
    // Voraussichtlicher Gewinn-Objekt {gewinnEuro, gewinnProzent }
    let realGewinn = realGewinnFn(stueckZahl, input);
    let gewinn = gewinnFn(stueckZahl, input, position);
    let gUV = gUVFn(input, risikoProTradeInEuro, gewinn);
    return { risikoProTradeInEuro, verlustInProzent, position, gUV, realGewinn, stueckZahl, gewinn }
}

function realGewinnViewFn({ stueckzahl, input }) {
    console.log(stueckzahl, input);
    let realGewinn = stueckzahl * input.verkaufskurs - stueckzahl * input.einkaufskurs;
    return Number.parseFloat(realGewinn.toFixed(2));
}

export function calculationsView(stueckzahl, input) {
    let realGewinn = realGewinnViewFn(stueckzahl, input);
    return {
        realGewinn: realGewinn,
    }
}