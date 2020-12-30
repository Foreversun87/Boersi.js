function verlustInProzentFn(input) {
    let wert = 1 - input.stoppkurs / input.einkaufskurs;
    wert = Number.parseFloat(wert.toFixed(2)) * 100;
    return Number.parseFloat(wert.toFixed(2));
}

function gUVFn(input) {
    let gUV = (input.zielkurs - input.einkaufskurs) / (input.einkaufskurs - input.stoppkurs);
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

export function calculations({ depot, input }) {
    let risikoProTradeInEuro = depot.einlagen * depot.risiko_per_trade / 100;
    let verlustInProzent = verlustInProzentFn(input);
    let position = risikoProTradeInEuro / (verlustInProzent / 100);
    let gUV = gUVFn(input);
    let stueckZahl = stueckZahlFn(position, input);
    let gewinn = gewinnFn(stueckZahl, input, position);
    return { risikoProTradeInEuro, verlustInProzent, position, gUV, stueckZahl, gewinn }
}

