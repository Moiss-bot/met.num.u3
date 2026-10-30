function evaluarFuncion(t, expr) {
    try {
        let parseExpr = expr
            .replace(/sin/g, 'Math.sin')
            .replace(/cos/g, 'Math.cos')
            .replace(/exp/g, 'Math.exp')
            .replace(/PI/g, 'Math.PI');
        let f = new Function('t', 'return ' + parseExpr + ';');
        return f(t);
    } catch (e) {
        return 0;
    }
}

function calcularTrapecioCompuesto(a, b, n, expr) {
    let h = (b - a) / n;
    let tValues = [];
    let yValues = [];
    let sumaIntermedia = 0;

    for (let i = 0; i <= n; i++) {
        let t = a + i * h;
        let y = evaluarFuncion(t, expr);
        tValues.push(t);
        yValues.push(y);
        if (i > 0 && i < n) sumaIntermedia += y;
    }

    let integral = (h / 2.0) * (yValues[0] + 2 * sumaIntermedia + yValues[n]);
    return { integral, h, tValues, yValues };
}

function ejecutarCalculo() {
    let metodo = document.getElementById('metodo').value;
    let expr = document.getElementById('funcionInput').value;
    let a = parseFloat(document.getElementById('limA').value);
    let b = parseFloat(document.getElementById('limB').value);
    let n = parseInt(document.getElementById('numN').value);

    if (metodo === 'simple') n = 1;

    let resultado = calcularTrapecioCompuesto(a, b, n, expr);

    document.getElementById('resH').innerText = resultado.h.toFixed(4);
    document.getElementById('resIntegral').innerText = resultado.integral.toFixed(4);

    let tbodyMalla = document.getElementById('tablaMallaBody');
    tbodyMalla.innerHTML = '';
    for (let i = 0; i <= n; i++) {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="py-2 px-4 font-mono">${i}</td>
            <td class="py-2 px-4 font-mono text-blue-300">${resultado.tValues[i].toFixed(4)}</td>
            <td class="py-2 px-4 font-mono text-emerald-300">${resultado.yValues[i].toFixed(4)}</td>
        `;
        tbodyMalla.appendChild(tr);
    }

    let nList = [4, 10, 50, 100, 1000];
    let tbodyConv = document.getElementById('tablaConvergenciaBody');
    tbodyConv.innerHTML = '';
    nList.forEach(valN => {
        let resConv = calcularTrapecioCompuesto(a, b, valN, expr);
        let trConv = document.createElement('tr');
        trConv.innerHTML = `
            <td class="py-2 px-3 font-mono font-bold text-blue-400">${valN}</td>
            <td class="py-2 px-3 font-mono">${resConv.h.toFixed(4)}</td>
            <td class="py-2 px-3 font-mono text-emerald-400">${resConv.integral.toFixed(4)}</td>
        `;
        tbodyConv.appendChild(trConv);
    });
}

window.onload = function() { ejecutarCalculo(); };