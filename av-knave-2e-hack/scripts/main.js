
// 
let abilities = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];

let level = 1;
let points_per_level = 3;

// Fighter, Ranger, MagicUser/Illusionist, Cleric/Druid, Thief
let classes = ["F", "R", "MU", "C", "T"];




let character_sheet; // array of

// Generate an integer between 0 and 5
function select_random_ability() {
	return Math.floor(Math.random() * 6);
}

function generate_character_sheet(char_class) {
	let level = document.getElementById("level").value;

	let preferred_ability = 0; 
	let class_name = "";
	if (char_class == "F") {
		preferred_ability = 0; // STR
		class_name = "Melee Fighter";
	}

	if (char_class == "R") {
		preferred_ability = 4; // WIS
		class_name = "Ranged Fighter";
	}

	if (char_class == "MU") {
		preferred_ability = 3; // INT
		class_name = "Magic User";
	}

	if (char_class == "C") {
		preferred_ability = 5; // CHA
		class_name = "Cleric";
	}

	if (char_class == "T") {
		preferred_ability = 1; // DEX
		class_name = "Thief";
	}

	let html_insert = "";

	html_insert += '<div class="div-table">';
	html_insert += '<div class="div-table-row">';
	html_insert += '<div class="div-table-col" align="center"><b>' + class_name + '</b></div>';
	html_insert += '<div class="div-table-col" align="center"><b>' + level + '</b></div>';
	html_insert += '</div>';

	document.getElementById("character").innerHTML = html_insert;
	
	let character_sheet = generate_level_one_character(); 

	for (let i = 1; i < level; i++) {
		let second = Math.floor(Math.random() * 6);
		while (second === preferred_ability) {
			second = Math.floor(Math.random() * 6);
		}

		let third = Math.floor(Math.random() * 6); 
		while (third === preferred_ability && third != second) {
			third = Math.floor(Math.random() * 6);
		}

		character_sheet[preferred_ability] += 1;
		character_sheet[second] += 1;
		character_sheet[third] += 1;
	}

	

	let hp = generate_character_hp(level);
	print_character_sheet(level, character_sheet, hp);
}

function print_character_sheet(level, sheet, hp) {
	let html_insert = "";

	html_insert += '<div class="div-table">';
	
	html_insert += '<div class="div-table-row">';
	html_insert += '<div class="div-table-col-blue" align="center"><b>Level</b></div>';
	html_insert += '<div class="div-table-col" align="center">' + level + '</div>';
	html_insert += '</div>';

	html_insert += '<div class="div-table-row">';
	html_insert += '<div class="div-table-col" align="center"></div>';
	html_insert += '<div class="div-table-col" align="center"></div>';
	html_insert += '</div>'; 

	html_insert += '<div class="div-table-row">';
	html_insert += '<div class="div-table-col-red" align="center">STR</div>';
	html_insert += '<div class="div-table-col" align="center">' + sheet[0] + '</div>';
	html_insert += '</div>';

	html_insert += '<div class="div-table-row">';
	html_insert += '<div class="div-table-col-red" align="center">DEX</div>';
	html_insert += '<div class="div-table-col" align="center">' + sheet[1] + '</div>';
	html_insert += '</div>';

	html_insert += '<div class="div-table-row">';
	html_insert += '<div class="div-table-col-red" align="center">CON</div>';
	html_insert += '<div class="div-table-col" align="center">' + sheet[2] + '</div>';
	html_insert += '</div>';

	html_insert += '<div class="div-table-row">';
	html_insert += '<div class="div-table-col-red" align="center">INT</div>';
	html_insert += '<div class="div-table-col" align="center">' + sheet[3] + '</div>';
	html_insert += '</div>';

	html_insert += '<div class="div-table-row">';
	html_insert += '<div class="div-table-col-red" align="center">WIS</div>';
	html_insert += '<div class="div-table-col" align="center">' + sheet[4] + '</div>';
	html_insert += '</div>';

	html_insert += '<div class="div-table-row">';
	html_insert += '<div class="div-table-col-red" align="center">CHA</div>';
	html_insert += '<div class="div-table-col" align="center">' + sheet[5] + '</div>';
	html_insert += '</div>'; 


	html_insert += '<div class="div-table-row">';
	html_insert += '<div class="div-table-col" align="center"></div>';
	html_insert += '<div class="div-table-col" align="center"></div>';
	html_insert += '</div>'; 

	html_insert += '<div class="div-table-row">';
	html_insert += '<div class="div-table-col-green" align="center"><b>HP</b></div>';
	html_insert += '<div class="div-table-col" align="center">' + hp + '</div>';
	html_insert += '</div>'; 
	
	html_insert += '</div>';


	document.getElementById("charsheet").innerHTML = html_insert;
}

function generate_level_one_character() {
	let boons = [];
	let banes = [];

	for (let i = 0; i < 5; i++) {
		boons.push(Math.floor(Math.random() * 6));
	}

	for (let i = 0; i < 3; i++) {
		banes.push(Math.floor(Math.random() * 6));
	}

	let character_sheet = [0, 0, 0, 0, 0, 0];

	let n = 0;
	while (n < boons.length) {
		character_sheet[boons[n]] += 1;
		n += 1;
	}

	n = 0; 
	while (n < banes.length) {
		character_sheet[banes[n]] -= 1;
		n += 1;
	}
	return character_sheet;
}

function generate_character_hp(level) {
	let hp = 0; 
	for (let i = 0; i < level; i++) {
		hp += Math.floor(Math.random() * 6) + 1;
	}
	return hp + 5; // 
}

