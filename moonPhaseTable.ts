function moonPhaseTable(container:  string | HTMLElement | null, year: number) {
    let obj: HTMLElement; 
    if (typeof container == 'string') {
        container = DOM$.i(container);
    }
    (container as HTMLElement).innerHTML = "";
    let h3 = DOM$.create('h3',container);
    h3.innerHTML = "<h3 align='center'>Moon True Phases "+year+"</h3>";
    let table = DOM$.create('table');
    table.setAttribute('style',"font-size:15px");
    table.setAttribute('border',"1");
    table.setAttribute('align',"center");
    let tr;
    let td;
    tr = DOM$.create('tr',table);
    td = DOM$.create('td',tr);
    td.innerHTML = "<img src='img/mini_na_nova.jpg' />";
    td = DOM$.create('td',tr);
    td.innerHTML = "<img src='img/mini_na_crescente.jpg' />";
    td = DOM$.create('td',tr);
    td.innerHTML = "<img src='img/mini_na_cheia.jpg' />";
    td = DOM$.create('td',tr);
    td.innerHTML = "<img src='img/mini_na_minguante.jpg' />";
    tr = DOM$.create('tr',table);
    td = DOM$.create('th',tr);
    td.innerHTML = "New Moon";
    td = DOM$.create('th',tr);
    td.innerHTML = "First Quarter";
    td = DOM$.create('th',tr);
    td.innerHTML = "Full Moon";
    td = DOM$.create('th',tr);
    td.innerHTML = "Last Quarter";
    const m = Computus.truePhaseYear(year);
    for (let l=0;l<m.length;l++) {
        tr = DOM$.create('tr',table);
        for (let p=0;p<4;p++) {
            td = DOM$.create('td',tr);
            td.setAttribute('style',"text-align:center");
            let d = (new DateTime()).setJulianDate(m[l][p]);
            d.UTCtoTAI();
            d.TAItoTT();
            if (d.getFullYear() == year) {
                td.innerHTML =
                d.getDate().toString().padStart(2,'0') + "/" + (d.getMonth()+1).toString().padStart(2,'0') +
                " - " + d.toLocaleTimeString();
            }
            else {
                td.innerHTML = "--";
            }
        }
    }
    (container as HTMLElement).appendChild(table);
}