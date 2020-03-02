//définition de variable
var moneyParSeconde = Number(document.getElementById("moneyParSeconde").textContent);
var money = Number(document.getElementById("money").textContent);
var famous = Number(document.getElementById("famous").textContent);
//réajuster l'ordre pour le changer dans le jeu...
var alcool = ["vodka", "wyski", "vin rouge", "vin blanc", "rhum", "jack Daniels", "cocktail", "biere", "suze", "ricard"];
var jeuxDargent = ["roulette russe", "poker", "black jack", "machine a sous", "parie sportif", "jeux hipique"];
var arme = ["AK-47", "RPG-7", "AR-15", "Remington 870", "M9"]
var drogue = ["beuh", "shit", "cocaine", "crack", "meth", "heroine", "LSD"];
var listeDesPieces = ["bar", "exterieur"];
var listeDesPiecesDebloquables = ["casino", "smoke store", "armurie"];
var exterieurObj = [];
var alcoolObj = [];
var jeuxDargentObj = [];
var drogueObj = [];
var quelPiece = "exterieur";
var bonté = 50; //si = 0 : groupe mal, si = 100 : groupe bon... Cette bonté est vu par les flics
var probabiliteDeDescente = 0;
document.body.style.backgroundImage = "url('Images/fond"+quelPiece+".png')";
//définition de function
function addMoney() {
	money += moneyParSeconde;
	changement();
};
timerPourMoney = window.setInterval("addMoney()", 1000);
document.getElementById("moneyBox").textContent = Math.floor(money) + " $";
function changement() {
	//plan de sauvegarde
	for (var i = 1; i < document.getElementById("sauvegarde").childNodes.length; i++) {
		document.getElementById("sauvegarde").childNodes[i]
	}
	document.getElementById("moneyBox").textContent = reformulerMoney(money);
	if(isExistingMainMenu == true) {
		document.getElementById("moneyRetour").textContent = reformulerMoney(money);
	};
	document.getElementById("famous").textContent = famous;
	document.getElementById("moneyParSeconde").textContent = moneyParSeconde;
	document.getElementById("money").textContent = money;
};
var peutAcheter;
function achat(prix, rapporte) {
	if(boostActif == true) {
		prix = prix - persoObj[perso.indexOf(quelBoost)].reduit;
	}
	if(money >= prix) {
		peutAcheter = true;
		moneyParSeconde += rapporte;
		money -= prix;
		//jouer le son d'achat
		changement();
	}
	else {
		peutAcheter = false;
	}
};
function acheterAlcool(qui) {
	achat(alcoolObj[qui].prix, alcoolObj[qui].rapporte);
	if(peutAcheter == true) {
		alcoolObj[qui].prix = Math.floor(alcoolObj[qui].prix * 2.99999557667576874676786754);
		alcoolObj[qui].rapporte = alcoolObj[qui].rapporte * 1.8;
		alcoolObj[qui].level++;
		closeMainMenu();
		mettreMainMenu("achat");
	}
};
function acheterJeuxDargent(qui) {
	achat(jeuxDargentObj[qui].prix, jeuxDargentObj[qui].rapporte);
	if(peutAcheter == true) {
		jeuxDargentObj[qui].prix = Math.floor(jeuxDargentObj[qui].prix * 2.99999557667576874676786754);
		jeuxDargentObj[qui].rapporte = jeuxDargentObj[qui].rapporte * 1.8;
		jeuxDargentObj[qui].level++;
		closeMainMenu();
		mettreMainMenu("achat");
	}
}
function acheterDrogue(qui) {
	achat(drogueObj[qui].prix, drogueObj[qui].rapporte);
	if(peutAcheter == true) {
		drogueObj[qui].prix = Math.floor(drogueObj[qui].prix * 2.99999557667576874676786754);
		drogueObj[qui].rapporte = drogueObj[qui].rapporte * 1.8;
		drogueObj[qui].level++;
		closeMainMenu();
		mettreMainMenu("achat");
	}
}
function acheterPiece(qui) {
	achat(exterieurObj[qui].prix, 0);
	if(peutAcheter == true) {
		listeDesPieces.splice(listeDesPieces.length - 1, 0, exterieurObj[qui].nom);
		exterieurObj.splice(qui, 1);
		closeMainMenu();
		mettreMainMenu("achat");
	}
}
class definirRessource {
	constructor(mps, fric, popular) {
		this.mps = mps; //mps = moneyParSeconde
		this.fric = fric;
		this.popular = popular;
	}
	changerMps(cmb) {
		this.mps += cmb;
	}
	changerFric(cmb) {
		this.fric += cmb;
	}
	changerPopular(cmb) {
		this.popular += popular;
	}
}
class illegalThing {
	constructor(nom, type, prix, rapporte, level) {
		this.nom = nom;
		this.type = type;
		this.prix = prix;
		this.rapporte = rapporte;
		this.level = level;
	}
	decrire() {
		return "type: "+this.type+", nom: "+this.nom+", prix: "+this.prix+", rapporte: "+this.rapporte+", est au niveau"+this.level;
	}
}
class differentesPieces {
	constructor(nom, prix, image) {
		this.nom = nom;
		this.prix = prix;
		this.image = image;
	}
}
var isExistingMainMenu = false;
function mettreMainMenu(pourquoi, ou) {
	var mainMenu = document.getElementById("mainMenu");
	mainMenu.style.display = "block";
		var content = document.createElement("div");
		content.setAttribute("id", "contentMainMenu");
	mainMenu.appendChild(content);
			var retour = document.createElement("div");
			retour.setAttribute("id", "retourContent")
				var imgRetour = document.createElement("img");
				imgRetour.setAttribute("style", "width: 80px; height: 80px; position: relative; top: 30px;");
				imgRetour.setAttribute("src", "Images/retour.png");
				imgRetour.setAttribute("onclick", "closeMainMenu('btn')");
			retour.appendChild(imgRetour);
				var moneyRetour = document.createElement("p");
				moneyRetour.appendChild(document.createTextNode(document.getElementById("moneyBox").textContent));
				moneyRetour.setAttribute("id", "moneyRetour");
				isExistingMainMenu = true;
			retour.appendChild(moneyRetour);
		content.appendChild(retour);
		if(pourquoi == "achat") {
			categoriserAchat();
		}
		else if(pourquoi == "piece") {
			listerPiece();
		}
		if(ou == 'btn') {
			mainMenu.className = "animMainMenu"
			animMainMenu = window.setTimeout("enleverAnim()", 500);
		}
}
var animMainMenu;
function enleverAnim() {
	mainMenu.className = "";
	clearTimeout(animMainMenu);
}
function categoriserAchat() {
	content = document.getElementById("contentMainMenu");
	if(quelPiece == "bar") {
		for(var i = 0; i < alcool.length; i++) {
			var prop = document.createElement("div");
			prop.setAttribute("class", "proposition");
				var imgProp = document.createElement("img");
				imgProp.setAttribute("src", ""); //a completer avec biblioteche d'image
				var textProp = document.createElement("div");
				textProp.setAttribute("class", "propositionTexte");
					var pProp = document.createElement("p");
					pProp.appendChild(document.createTextNode(alcool[i]));
				textProp.appendChild(pProp);
					var coutEtAchat = document.createElement("div");
					coutEtAchat.setAttribute("class", "coutEtAchat");
				textProp.appendChild(coutEtAchat);
						var prixProp = document.createElement("p");
						prixProp.setAttribute("class", "prixProp"); //pour pouvoir les changer en achat et donc les reconnaitre...
						if(boostActif == true) {
							prixProp.textContent = reformulerMoney(alcoolObj[i].prix - persoObj[perso.indexOf(quelBoost)].reduit);
						}
						else {
							prixProp.textContent = reformulerMoney(alcoolObj[i].prix);
						}
					coutEtAchat.appendChild(prixProp);
						var buttonAchat = document.createElement("a");
						var buttonAchatImg = document.createElement("img");
						buttonAchatImg.setAttribute("src", "Images/buy.png");
						buttonAchatImg.setAttribute("style", "width: 138px; height: 80px;");
						buttonAchatImg.setAttribute("onclick", "acheterAlcool("+i+")");
						buttonAchat.appendChild(buttonAchatImg);
					coutEtAchat.appendChild(buttonAchat);
				prop.appendChild(imgProp);
				prop.appendChild(textProp);
			content.appendChild(prop);
		};
	} else if(quelPiece == "casino") {
		for(var i = 0; i < jeuxDargent.length; i++) {
			var prop = document.createElement("div");
			prop.setAttribute("class", "proposition");
				var imgProp = document.createElement("img");
				imgProp.setAttribute("src", ""); //a completer avec biblioteche d'image
				var textProp = document.createElement("div");
				textProp.setAttribute("class", "propositionTexte");
					var pProp = document.createElement("p");
					pProp.appendChild(document.createTextNode(jeuxDargent[i]));
				textProp.appendChild(pProp);
					var coutEtAchat = document.createElement("div");
					coutEtAchat.setAttribute("class", "coutEtAchat");
				textProp.appendChild(coutEtAchat);
						var prixProp = document.createElement("p");
						prixProp.setAttribute("class", "prixProp"); //pour pouvoir les changer en achat et donc les reconnaitre...
						if(boostActif == true) {
							prixProp.textContent = reformulerMoney(jeuxDargentObj[i].prix - persoObj[perso.indexOf(quelBoost)].reduit);
						}
						else {
							prixProp.textContent = reformulerMoney(jeuxDargentObj[i].prix)
						}
					coutEtAchat.appendChild(prixProp);
						var buttonAchat = document.createElement("a");
						var buttonAchatImg = document.createElement("img");
						buttonAchatImg.setAttribute("src", "Images/buy.png");
						buttonAchatImg.setAttribute("style", "width: 138px; height: 80px;");
						buttonAchatImg.setAttribute("onclick", "acheterJeuxDargent("+i+")");
						buttonAchat.appendChild(buttonAchatImg);
					coutEtAchat.appendChild(buttonAchat);
				prop.appendChild(imgProp);
				prop.appendChild(textProp);
			content.appendChild(prop);

		};
	} else if(quelPiece == "smoke store") {
		for(var i = 0; i < drogue.length; i++) {
			var prop = document.createElement("div");
			prop.setAttribute("class", "proposition");
				var imgProp = document.createElement("img");
				imgProp.setAttribute("src", ""); //a completer avec biblioteche d'image
				var textProp = document.createElement("div");
				textProp.setAttribute("class", "propositionTexte");
					var pProp = document.createElement("p");
					pProp.appendChild(document.createTextNode(drogue[i]));
				textProp.appendChild(pProp);
					var coutEtAchat = document.createElement("div");
					coutEtAchat.setAttribute("class", "coutEtAchat");
				textProp.appendChild(coutEtAchat);
						var prixProp = document.createElement("p");
						prixProp.setAttribute("class", "prixProp"); //pour pouvoir les changer en achat et donc les reconnaitre...
						if(boostActif == true) {
							prixProp.textContent = reformulerMoney(drogueObj[i].prix - persoObj[perso.indexOf(quelBoost)].reduit);
						}
						else {
							prixProp.textContent = reformulerMoney(drogueObj[i].prix)
						}
					coutEtAchat.appendChild(prixProp);
						var buttonAchat = document.createElement("a");
						var buttonAchatImg = document.createElement("img");
						buttonAchatImg.setAttribute("src", "Images/buy.png");
						buttonAchatImg.setAttribute("style", "width: 138px; height: 80px;");
						buttonAchatImg.setAttribute("onclick", "acheterDrogue("+i+")");
						buttonAchat.appendChild(buttonAchatImg);
					coutEtAchat.appendChild(buttonAchat);
				prop.appendChild(imgProp);
				prop.appendChild(textProp);
			content.appendChild(prop);
		};
	} else if(quelPiece == "exterieur") {
		if(exterieurObj.length == 0) {
			var prop = document.createElement("div");
			prop.setAttribute("class", "proposition");
			var pProp = document.createElement("p");
			prop.appendChild(pProp)
			pProp.textContent = "Il n'y a rien à acheter :("
			content.appendChild(prop)
		}
		for(var i = 0; i < exterieurObj.length; i++) {
			var prop = document.createElement("div");
			prop.setAttribute("class", "proposition");
				var imgProp = document.createElement("img");
				imgProp.setAttribute("src", ""); //a completer avec biblioteche d'image
				var textProp = document.createElement("div");
				textProp.setAttribute("class", "propositionTexte");
					var pProp = document.createElement("p");
					pProp.appendChild(document.createTextNode(exterieurObj[i].nom));
					if(exterieurObj.length == 0) {
						pProp.textContent = "Il n'y a rien à acheter :("
					}
				textProp.appendChild(pProp);
					var coutEtAchat = document.createElement("div");
					coutEtAchat.setAttribute("class", "coutEtAchat");
				textProp.appendChild(coutEtAchat);
						var prixProp = document.createElement("p");
						prixProp.setAttribute("class", "prixProp"); //pour pouvoir les changer en achat et donc les reconnaitre...
						if(boostActif == true) {
							prixProp.textContent = reformulerMoney(exterieurObj[i].prix - persoObj[perso.indexOf(quelBoost)].reduit);
						}
						else {
							prixProp.textContent = reformulerMoney(exterieurObj[i].prix);
						}
					coutEtAchat.appendChild(prixProp);
						var buttonAchat = document.createElement("a");
						var buttonAchatImg = document.createElement("img");
						buttonAchatImg.setAttribute("src", "Images/buy.png");
						buttonAchatImg.setAttribute("style", "width: 138px; height: 80px;");
						buttonAchatImg.setAttribute("onclick", "acheterPiece("+i+")");
						buttonAchat.appendChild(buttonAchatImg);
					coutEtAchat.appendChild(buttonAchat);
				prop.appendChild(imgProp);
				prop.appendChild(textProp);
			content.appendChild(prop);
		};
	} else {
		content.appendChild(document.createTextNode("Bientôt disponible !!!"))
	}
}
function listerPiece() {
	content = document.getElementById("contentMainMenu");
		for(var i = 0; i < listeDesPieces.length; i++) {
			var prop = document.createElement("div");
			prop.setAttribute("class", "proposition");
				var imgProp = document.createElement("img");
				imgProp.setAttribute("src", ""); //a completer avec biblioteche d'image

				var textProp = document.createElement("div");
				textProp.setAttribute("class", "propositionTexte");
					var pProp = document.createElement("p");
					pProp.appendChild(document.createTextNode(listeDesPieces[i]));
				textProp.appendChild(pProp);
					var commentaireSurLieu = document.createElement("p");
					commentaireSurLieu.appendChild(document.createTextNode("aller a "+listeDesPieces[i]));
				textProp.appendChild(commentaireSurLieu);
				prop.appendChild(imgProp);
				prop.appendChild(textProp);
				prop.setAttribute("onclick", "changerDePiece("+i+")");
			content.appendChild(prop);
		};
}
function closeMainMenu(ou) {
	if(ou == 'btn') {
		document.getElementById("mainMenu").className = "downMainMenu";
		montimer = window.setTimeout("autreCloseMAinMenu()", 500)
	}
	else {
		document.getElementById("mainMenu").style.display = "none";
		document.getElementById("mainMenu").removeChild(document.getElementById("contentMainMenu"));
		isExistingMainMenu = false;
	}
}
function autreCloseMAinMenu() {
	document.getElementById("mainMenu").className = ""
	document.getElementById("mainMenu").style.display = "none";
	document.getElementById("mainMenu").removeChild(document.getElementById("contentMainMenu"));
	isExistingMainMenu = false;
}
function changerDePiece(qui) {
	quelPiece = listeDesPieces[qui];
	document.body.style.backgroundImage = "url('Images/fond"+quelPiece+".png')"
	closeMainMenu('btn');
}
function reformulerMoney(montant) {
	if(montant > 50000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000) {
		return Math.floor(montant / 10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000) + "G $"; //un googole
	}
	else if(montant > 5000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000) {
		return Math.floor(montant / 1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000) + "Tq $";
	}
	else if(montant > 5000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000) {
		return Math.floor(montant / 1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000) + "Bq $";
	}
	else if(montant > 5000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000) {
		return Math.floor(montant / 1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000) + "Uq $";
	}
	else if(montant > 5000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000) {
		return Math.floor(montant / 1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000) + "Q $";
	}
	else if(montant > 5000000000000000000000000000000000000000000000000000000000000000000000000000000000000000) {
		return Math.floor(montant / 1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000) + "Nt $";
	}
	else if(montant > 5000000000000000000000000000000000000000000000000000000000000000000000000000000000000) {
		return Math.floor(montant / 1000000000000000000000000000000000000000000000000000000000000000000000000000000000000) + "Ot $";
	}
	else if(montant > 5000000000000000000000000000000000000000000000000000000000000000000000000000000000) {
		return Math.floor(montant / 1000000000000000000000000000000000000000000000000000000000000000000000000000000000) + "St $";
	}
	else if(montant > 5000000000000000000000000000000000000000000000000000000000000000000000000000000) {
		return Math.floor(montant / 1000000000000000000000000000000000000000000000000000000000000000000000000000000) + "st $";
	}
	else if(montant > 5000000000000000000000000000000000000000000000000000000000000000000000000000) {
		return Math.floor(montant / 1000000000000000000000000000000000000000000000000000000000000000000000000000) + "Qt $";
	}
	else if(montant > 5000000000000000000000000000000000000000000000000000000000000000000000000) {
		return Math.floor(montant / 1000000000000000000000000000000000000000000000000000000000000000000000000) + "qt $";
	}
	else if(montant > 5000000000000000000000000000000000000000000000000000000000000000000000) {
		return Math.floor(montant / 1000000000000000000000000000000000000000000000000000000000000000000000) + "Tt $";
	}
	else if(montant > 5000000000000000000000000000000000000000000000000000000000000000000) {
		return Math.floor(montant / 1000000000000000000000000000000000000000000000000000000000000000000) + "Dt $";
	}
	else if(montant > 5000000000000000000000000000000000000000000000000000000000000000) {
		return Math.floor(montant / 1000000000000000000000000000000000000000000000000000000000000000) + "Ut $";
	}
	else if(montant > 5000000000000000000000000000000000000000000000000000000000000) {
		return Math.floor(montant / 1000000000000000000000000000000000000000000000000000000000000) + "Tw $";
	}
	else if(montant > 5000000000000000000000000000000000000000000000000000000000) {
		return Math.floor(montant / 1000000000000000000000000000000000000000000000000000000000) + "Nd $";
	}
	else if(montant > 5000000000000000000000000000000000000000000000000000000) {
		return Math.floor(montant / 1000000000000000000000000000000000000000000000000000000) + "Od $";
	}
	else if(montant > 5000000000000000000000000000000000000000000000000000) {
		return Math.floor(montant / 1000000000000000000000000000000000000000000000000000) + "Sd $";
	}
	else if(montant > 5000000000000000000000000000000000000000000000000) {
		return Math.floor(montant / 1000000000000000000000000000000000000000000000000) + "Qd $";
	}
	else if(montant > 5000000000000000000000000000000000000000000000) {
		return Math.floor(montant / 1000000000000000000000000000000000000000000000) + "Qt $";
	}
	else if(montant > 5000000000000000000000000000000000000000000) {
		return Math.floor(montant / 1000000000000000000000000000000000000000000) + "Td $";
	}
	else if(montant > 5000000000000000000000000000000000000000) {
		return Math.floor(montant / 1000000000000000000000000000000000000000) + "Dd $";
	}
	else if(montant > 5000000000000000000000000000000000000) {
		return Math.floor(montant / 1000000000000000000000000000000000000) + "U $";
	}
	if(montant > 5000000000000000000000000000000000) {
		return Math.floor(montant / 1000000000000000000000000000000000) + "D $";
	}
	else if(montant > 5000000000000000000000000000000) {
		return Math.floor(montant / 1000000000000000000000000000000) + "N $";
	}
	else if(montant > 5000000000000000000000000000) {
		return Math.floor(montant / 1000000000000000000000000000) + "Oc $";
	}
	else if(montant > 5000000000000000000000000) {
		return Math.floor(montant / 1000000000000000000000000) + "Sp $";
	}
	else if(montant > 5000000000000000000000) {
		return Math.floor(montant / 1000000000000000000000) + "S $";
	}
	else if(montant > 5000000000000000000) {
		return Math.floor(montant / 1000000000000000000) + "Qu $";
	}
	else if(montant > 5000000000000000) {
		return Math.floor(montant / 1000000000000000) + "Q $";
	}
	else if(montant > 5000000000000) {
		return Math.floor(montant / 1000000000000) + "T $";
	}
	else if(montant > 5000000000) {
		return Math.floor(montant / 1000000000) + "B $";
	}
	else if(montant > 5000000) {
		return Math.floor(montant / 1000000) + "M $";
	}
	else if(montant > 5000) {
		return Math.floor(montant / 1000) + "K $";
	}
	else {
		return Math.floor(montant) + " $";
	}
}





//reste du script
//declaration de multiples objets
for(var i = 0; i < alcool.length; i++) {
	alcoolObj[i] = new illegalThing(alcool[i], "alcool", Math.pow(i, 4) * 7 + 1, i * 1.5 + 2, 1);
}
for(var i = 0; i < jeuxDargent.length; i++) {
	jeuxDargentObj[i] = new illegalThing(jeuxDargent[i], "jeu d'argent", (Math.pow(i + 4, 6) * 800) + 500000, i * 3.5 + 73, 1);
}
for(var i = 0; i < drogue.length; i++) {
	drogueObj[i] = new illegalThing(drogue[i], "drogue",  (Math.pow(i + 5, 7) * 3586) + 700000000, i * 13.5 + 11036, 1);
}
exterieurObj[0] = new differentesPieces("casino", 10000000, "");
exterieurObj[1] = new differentesPieces("smoke store", 7000000000, "");
exterieurObj[2] = new differentesPieces("armurie", 4999000000000, "");
//resize de la div contenant tout
document.getElementById("mainScreen").setAttribute("style", "height: "+screen.height+"px;");





//tuto
var phrase = ["Bienvenue dans escobar! click to continue", "L etat major ma charge de vous expliquez votre mission, camarade", "Nous avons etabli ce bar aux US.", "Notre but, les detruires de l interieur a petit feu,", "et ainsi gagner la guerre froide qui ne s est jamais vraiment terminer.", "Achetez de l alcool dans le menu buy, puis revendez le et ameliorez le.", "changer de piece dans le menu piece et ainsi vous pourrez vendre plus de choses.", "Plus d option vous attendent dans le menu autre.", "Bonne chance, camarade ! Gloire a la mere patrie !"];
var count = 0;
if(document.getElementById("firstTime").textContent == "true") {
	document.getElementById("firstTime").textContent = "false"
	var tutoBox = document.createElement("div");
	tutoBox.setAttribute("id", "tutoBox");
	tutoBox.setAttribute("style", "top: "+screen.height * 1.1+"px; left: "+screen.width / 5+"px;")
	var parentTutoBox = document.createElement("div");
	parentTutoBox.appendChild(tutoBox);
	parentTutoBox.setAttribute("id", "parentTutoBox")
document.body.appendChild(parentTutoBox)
		var imgTuto = document.createElement("img");
		imgTuto.setAttribute("src", "Images/Laroslav.png");
		imgTuto.setAttribute("id", "imageTuto");
	tutoBox.appendChild(imgTuto);
		var texteTuto = document.createElement("div");
		texteTuto.setAttribute("id", "texteTuto");
			var nomDuPerso = document.createElement("p");
			nomDuPerso.setAttribute("style", "font-size: 38px;")
			nomDuPerso.appendChild(document.createTextNode("Officier Laroslav"));
		texteTuto.appendChild(nomDuPerso);
			var replique = document.createElement("p");
			replique.setAttribute("style", "font-size: 30px;")
			replique.textContent = phrase[count];
			count++;
		texteTuto.appendChild(replique);
	tutoBox.appendChild(texteTuto);
	parentTutoBox.addEventListener("click", function(e) {
		replique.textContent = phrase[count];
		count++;
		if(count == phrase.length) {
			document.body.removeChild(parentTutoBox);
		}
	});
}




// CETTE PARTIE EST À SUPPRIMER, ELLE PERMET D'AVOIR DE LA TUNE TRÈS FACILEMENT.
document.getElementById("moneyBox").addEventListener("click", function (e) {
	money = 12345678901231233433545434655623456765456789765456789876545678
})





//boosts
//dans les premières idées, les boosts sont émis par des personnages illustres du XX ayant fait le mal( Staline, Hitler...)
const perso = ["Hideki Tojo", "Mussolini", "Hitler", "Staline"];
var persoObj = [];
//les boosts ont plus ou moins de puissance mais ils font tous la même chose (pour le moment)
class boosts {
	constructor(nom, reduit, mpsMultiple) {
		this.nom = nom;
		this.reduit = reduit;
		this.mpsMultiple = mpsMultiple; //mpsMultiple = money par seconde Multiplier (c'est le multiplicateur)
	}
}
for(var i = 0; i < perso.length; i++) {
	persoObj[i] = new boosts(perso[i], 170 * Math.pow(i, 3) + 20, 1.5 * i + 2);
}
var tempsAAttendre = 10000; //un boosts peut survenir entre 5 et 25 mins
var timerBoosts = window.setTimeout("booster()", tempsAAttendre);
var boostActif = false;
var quelBoost;
var ancienMps;
function booster() {
	var  aleatoire = Math.floor(Math.random() * 100)
	boostActif = true;
	if(aleatoire > 50) {
		quelBoost = "Hideki Tojo";
	}
	else if(aleatoire > 25) {
		quelBoost = "Mussolini";
	}
	else if(aleatoire > 6) {
		quelBoost = "Hitler";
	}
	else {
		quelBoost = "Staline"
	}
	console.log(quelBoost);
	ancienMps = moneyParSeconde;
	moneyParSeconde = moneyParSeconde * persoObj[perso.indexOf(quelBoost)].mpsMultiple;
	if(isExistingMainMenu == true) {
		closeMainMenu();
		mettreMainMenu("achat");
	}
	document.getElementById("Name").textContent = quelBoost;
	document.getElementById("caracteristique").textContent = "-"+persoObj[perso.indexOf(quelBoost)].reduit+" $ sur les achats et la money par seconde est multiplié par "+persoObj[perso.indexOf(quelBoost)].mpsMultiple
	document.getElementById("boost").style.display = "flex";
	document.getElementById("boostImg").src = "Images/"+quelBoost+".png"
	var finBoost = window.setTimeout("finDuBoost()", 120000);
	clearTimeout(timerBoosts);
	var tempsAAttendre = 10000; //un boosts peut survenir entre 5 et 25 mins
	var timerBoosts = window.setTimeout("booster()", tempsAAttendre);
}
function finDuBoost() {
	moneyParSeconde = ancienMps;
	boostActif = false;
}
document.getElementById("boost").addEventListener("click", function(e) {
	window.setTimeout(function(f) {
		document.getElementById("boost").style.display = "none";
	}, 800)
});




//sauvegarde 
function sauvegarde() {
	//sauvegarde des ressources et de leur prix.
	var objRessource = "";
	for(var i = 0; i < alcoolObj.length; i++) {
		objRessource = objRessource + JSON.stringify(alcoolObj[i]);
	}
	for(var i = 0; i < drogueObj.length; i++) {
		objRessource = objRessource + JSON.stringify(drogueObj[i]);
	}
	for(var i = 0; i < jeuxDargentObj.length; i++) {
		objRessource = objRessource + JSON.stringify(jeuxDargentObj[i]);
	}
	//sauvegarde de la money, mps
	var objMoney = JSON.stringify([money]) + JSON.stringify([moneyParSeconde]);
	var listeDesPiecesDebloquablesObj = JSON.stringify(listeDesPiecesDebloquables);
	console.log([objRessource, objMoney, listeDesPiecesDebloquablesObj])
	document.location="data:text/txt;base64,"+btoa("baise ta mère sale zeubi")
}



//choix
//j'ai voulu faire un jeu où les choix peuvent vraiment impacter l'expérience utilisateur.
//généralement, prop1 diminuera toujours les relations avec la police et prop2 fera l'inverse
function makeAChoice(phrase, prop1, prop2, force) {
	document.getElementById("choiceBox").style.display = "flex";
	document.getElementById("question").textContent = phrase;
	document.getElementById("choix1").textContent = prop1;
	document.getElementById("choix2").textContent = prop2;
	veritableForce = force;
}
var veritableForce;
document.getElementById("choix1").addEventListener("click", function(e) {
	bonté += veritableForce;
	hideChoice();
});
document.getElementById("choix2").addEventListener("click", function(e) {
	bonté -= veritableForce;
	hideChoice();
	if(choixFaits[0] == true && choixExecute[0] == false) {
		choixExecute[0] = true;
		money -= 5000;
	}
});
function hideChoice() {
	document.getElementById("choiceBox").style.display = "none";
}
var choixFaits = [false, false, false, false]
var choixExecute = [false, false, false, false]
function listeDesChoix() {
	if(money >= 10000 && choixFaits[0] == false) {
		choixFaits[0] = true;
		makeAChoice("Le bureau des fraudes trouve louche que nous ne payons pas d'împot.", "ne rien faire", "payer 5000 $", 2);
	}
}
//var timerChoix = window.setInterval("listeDesChoix()", 1000);