//função para chamar outras função da criptografia
function criptografar() {
	let texto = document.getElementById("inputTexto1").value.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
	let key = parseInt(document.getElementById("inputPassword1").value);
	let res1 = "";
	let matriz, matrizCrip;
	
	if (key < 1) {
		document.getElementById("res1").innerHTML = texto;
		return;
	}
	if (key >= texto.length) {
		document.getElementById("res1").innerHTML = texto;
		return;
	}
	
	matriz = criarMatriz(texto.length, key);
	matrizCrip = logicaCriptografia(texto, key, matriz);
	res1 = capturarMatriz(texto.length, key,matrizCrip);
	
	console.log(res1)
	document.getElementById("res1").innerHTML = res1;
}

//função para criar matriz
function criarMatriz(colunas, linhas) {
	let matriz = new Array(linhas);
	
	for (let i = 0; i < linhas; i++)
		matriz[i] = new Array(colunas);
	
	for (let x = 0; x < linhas; x++)
		for (let y = 0; y < colunas; y++)
		matriz[x][y]=" ";
	
	return matriz;
}

//função para lógica da criptografia
function logicaCriptografia(texto, key, matriz) {
	let i = 0;
	let direcao=false;
	
	for (let y = 0; y < texto.length; y++) {

		if (i === 0){
			direcao = false;
		}
		if (i === (key-1)){
			direcao = true;
		}
		
		if (direcao === false){
			matriz[i][y]=texto.charAt(y);
			i++
		}
		if (direcao === true){
			matriz[i][y]=texto.charAt(y);
			i--
		}
	}
	return matriz;
}

//função que captura o texto na matriz
function capturarMatriz(colunas, linhas, matrizCrip) {
	let palavra = "";
	
	console.log(matrizCrip);
	
	for (let x = 0; x < linhas; x++){
		for (let y = 0; y < colunas; y++){
			if (matrizCrip[x][y] != " ")
			palavra += matrizCrip[x][y];
			
		}
	}
	return palavra;
}

//função para chamar outras função descriptografia
function descriptografar() {
	let texto = document.getElementById("inputTexto2").value.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
	let key = parseInt(document.getElementById("inputPassword2").value);
	let res2 = "";
	let matriz, matrizDescrip;
	
	if (key < 1){
		document.getElementById("res2").innerHTML = texto;
		return;
	}
	if (key >= texto.length) {
		document.getElementById("res2").innerHTML = texto;
		return;
	}
	
	matriz = criarMatriz(texto.length, key);
	matrizDescrip = logicaCriptografia(texto, key, matriz);
	console.log(matrizDescrip);
	res2 = capturarMatrizDescrip(texto, texto.length, key, matrizDescrip);
	
	document.getElementById("res2").innerHTML = res2;
	
	
}

//função que faz a lógica da descriptografia e captura o texto na matriz
function capturarMatrizDescrip(texto, colunas, linhas, matrizDescrip) {
	let palavra = "";
	let i = 0;
	
	for (let x = 0; x < linhas; x++){
		for (let y = 0; y < colunas; y++){
			if (matrizDescrip[x][y] != " "){
				matrizDescrip[x][y]=texto.charAt(i);
				i++
			}
		}
	}
	for (let y = 0; y < colunas; y++){
		for (let x = 0; x < linhas; x++){
			if (matrizDescrip[x][y] != " ")
			palavra += matrizDescrip[x][y];
		}
	}
	
	console.log(matrizDescrip);
	console.log(palavra);
	return palavra;
}

//função para limpar conteudo escrito pelo usuario na parte da criptografia
function limpar1() {
	document.getElementById("inputTexto1").value = "";
	document.getElementById("inputPassword1").value = 0;
	document.getElementById("res1").innerHTML = "Resposta";
}

//função para limpar conteudo escrito pelo usuario na parte da descriptografia
function limpar2() {
	document.getElementById("inputTexto2").value = "";
	document.getElementById("inputPassword2").value = 0;
	document.getElementById("res2").innerHTML = "Resposta";
}

//evento de onclick chamando as funções
document.getElementById("inputBotton1").onclick = criptografar;
document.getElementById("inputBotton2").onclick = descriptografar;
document.getElementById("inputBottonL1").onclick = limpar1;
document.getElementById("inputBottonL2").onclick = limpar2;
