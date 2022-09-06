const arrayDePixelsDeFogo = [];
const larguraDoFogo = 40;
const alturaDoFogo = 40;
const paletaDeCoresDoFogo = [{"r":7,"g":7,"b":7},{"r":7,"g":31,"b":7},{"r":15,"g":47,"b":7},{"r":15,"g":71,"b":7},{"r":23,"g":87,"b":7},{"r":31,"g":103,"b":7},{"r":31,"g":119,"b":7},{"r":39,"g":143,"b":7},{"r":47,"g":159,"b":7},{"r":63,"g":175,"b":7},{"r":71,"g":191,"b":7},{"r":71,"g":199,"b":7},{"r":79,"g":223,"b":7},{"r":87,"g":223,"b":7},{"r":87,"g":223,"b":7},{"r":95,"g":215,"b":7},{"r":95,"g":215,"b":7},{"r":103,"g":215,"b":15},{"r":111,"g":207,"b":15},{"r":119,"g":207,"b":15},{"r":127,"g":207,"b":15},{"r":135,"g":207,"b":23},{"r":135,"g":199,"b":23},{"r":143,"g":199,"b":23},{"r":151,"g":199,"b":31},{"r":159,"g":191,"b":31},{"r":159,"g":191,"b":31},{"r":167,"g":191,"b":39},{"r":167,"g":191,"b":39},{"r":175,"g":191,"b":47},{"r":175,"g":183,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}];
function start() {
    criarEstruturaDeDadosFogo();
    criarFonteDeFogo();
    rendenizarFogo();

    setInterval(calcularPropagacaoFogo, 50);
}
function criarEstruturaDeDadosFogo() {
    const numeroDePixels = larguraDoFogo * alturaDoFogo;
    for (let i=0; i<numeroDePixels; i++) {
        arrayDePixelsDeFogo[i] = 0;
    }
}
function calcularPropagacaoFogo(){
    for (let coluna=0; coluna<larguraDoFogo; coluna++) {
        for (let linha=0; linha<alturaDoFogo; linha++) {
            const indiceDoPixel = coluna + (larguraDoFogo*linha);
            atualizarIntensidadeDoFogoPorPixel(indiceDoPixel)
        }
    }
    rendenizarFogo();
}
function atualizarIntensidadeDoFogoPorPixel(indiceDoPixelAtual) {
    const indiceDoPixelAbaixo = indiceDoPixelAtual + larguraDoFogo;
    if (indiceDoPixelAbaixo >= larguraDoFogo * alturaDoFogo) {
        return;
    }
    const declinio = Math.floor(Math.random() * 3);
    const intensidadeDeFogoDoPixelAbaixo = arrayDePixelsDeFogo[indiceDoPixelAbaixo];
    const novaIntensidadeDeFogo = intensidadeDeFogoDoPixelAbaixo - declinio >= 0 ? intensidadeDeFogoDoPixelAbaixo - declinio : 0;
    arrayDePixelsDeFogo[indiceDoPixelAtual - declinio] = novaIntensidadeDeFogo;
}
function rendenizarFogo() {
    debugar = false;
    let html = '<table cellpading=0 cellspacing=0>';
    for (let linha=0; linha<alturaDoFogo; linha++) {
        html += '<tr>';
        for (let coluna=0; coluna<larguraDoFogo; coluna++) {
            const indiceDoPixel = coluna + (larguraDoFogo * linha);
            const intensidadeDoFogo = arrayDePixelsDeFogo[indiceDoPixel];
            if (debugar === true) {
                html += '<td>';
                html += `<div class="indice-pixel">${indiceDoPixel}</div>`;
                html += intensidadeDoFogo;
                html += '</td>';
            } else {
                const cor = paletaDeCoresDoFogo[intensidadeDoFogo];
                const stringDeCores = `${cor.r},${cor.g},${cor.b}`;
                html += `<td class="pixel" style="background-color: rgb(${stringDeCores})">`;
                html += '</td>';
            }
        }
        html += '</tr>';
    }
    html += '</table>';
    document.querySelector('#tabelaDoFogo').innerHTML = html;
}
function criarFonteDeFogo() {
    for (let coluna=0; coluna<=larguraDoFogo; coluna++) {
        const preencherIndiceDePixels = larguraDoFogo * alturaDoFogo;
        const indiceDoPixel = (preencherIndiceDePixels - larguraDoFogo) + coluna;
        arrayDePixelsDeFogo[indiceDoPixel] = 36;
    }
}
start();