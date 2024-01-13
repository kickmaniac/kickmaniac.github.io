
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
	let get_selected_value = document.querySelector('input[name="level"]:checked');
	let level = 1; 

	if (get_selected_value != null) {
		level = get_selected_value.value;
	}

	let preferred_ability = 0; 
	let class_name = "";
	let ap = 0;

	if (char_class == "F") {
		preferred_ability = 0; // STR
		class_name = "Melee Fighter";
		ap = Math.floor(Math.random() * 4) + 2;
	}

	if (char_class == "R") {
		preferred_ability = 4; // WIS
		class_name = "Ranged Fighter";
		ap = Math.floor(Math.random() * 4) + 1;
	}

	if (char_class == "MU") {
		preferred_ability = 3; // INT
		class_name = "Magic User";
		ap = Math.floor(Math.random() * 2);
	}

	if (char_class == "C") {
		preferred_ability = 5; // CHA
		class_name = "Cleric";
		ap = Math.floor(Math.random() * 3) + 2;
	}

	if (char_class == "T") {
		preferred_ability = 1; // DEX
		class_name = "Thief";
		ap = Math.floor(Math.random() * 2);
	}

	let character_sheet = generate_level_one_character(); 
	let hp = generate_character_hp(level);

	character_sheet = advance_levels(character_sheet, level, preferred_ability);

	let melee_thac0 = character_sheet[0];
	let ranged_thac0 = character_sheet[4];
	let ac = 10 + ap;

	print_character_summary(class_name, level, hp, melee_thac0, ranged_thac0, ac)
	print_character_sheet(character_sheet);
	print_inventory(ap, class_name, level, character_sheet);
}

function print_inventory(ap, class_name, level, character_sheet) {
	let html_insert = "";
	html_insert += '<div class="div-table-row" align="center"><b>Inventory</b></div>';

	let armour = ["Gambeson (AP 1)", "Helmet (AP 1)", "Shield (AP 1)", "Bracers (AP 1)", "Grieves (AP 1)", "Breastplate (AP 1)"]
	for (let i = 0; i < ap; i++) {
		html_insert += '<div class="div-table-row" align="center">' + armour[i] + '</div>';
	}


	let sp = Math.floor(Math.random() * 6) * 3;
	html_insert += '<div class="div-table-row" align="center">SP: ' + sp + '</div>';

	if (class_name == "Thief") {
		html_insert += '<div class="div-table-row" align="center">Dagger</div>';
	}
	
	if (class_name == "Melee Fighter") {
		let weapons = ["Mace", "Spear", "Warhammer", "Dagger", "Sword"];
		let weapon1 = weapons[Math.floor(Math.random() * weapons.length)];
		html_insert += '<div class="div-table-row" align="center">' + weapon1 + '</div>';

		let weapon2 = weapons[Math.floor(Math.random() * weapons.length)];
		html_insert += '<div class="div-table-row" align="center">' + weapon2 + '</div>';
	}

	if (class_name == "Ranged Fighter") {
		let weapons = ["Bow", "Crossbow"];
		let weapon1 = weapons[Math.floor(Math.random() * weapons.length)];
		html_insert += '<div class="div-table-row" align="center">' + weapon1 + '</div>';

		html_insert += '<div class="div-table-row" align="center">Dagger</div>';
	}

	if (class_name == "Magic User") {
		let spells1 = ["Magic Missile", "Light", "Darkness", "Charm Person", "Sleep", "Shield"];
		let spells2 = ["Web", "Levitate", "Invisibility", "Mirror Image"];
		let spells3 = ["Dispel Magic", "Fireball", "Hold Person", "Lightning Bolt", "Haste", "Fly"];
		let spells4 = ["Confusion", "Dimension Door", "Polymorph Others", "Curse", "Wall of Fire", "Wall of Ice"];
		let spells5 = ["Cloudkill", "Conjure Elemental", "Feeblemind", "Teleport", "Animate Dead"];

		html_insert += '<div class="div-table-row" align="center">Dagger</div>';

		let spell = "";
		if (level > 0) {
			spell = spells1[Math.floor(Math.random() * spells1.length)];
			html_insert += '<div class="div-table-row" align="center">Spellbook: ' + spell + '</div>';
		}

		if (level > 1) {
			spell = spells1[Math.floor(Math.random() * spells1.length)];
			html_insert += '<div class="div-table-row" align="center">Spellbook: ' + spell + '</div>';
		}

		if (level > 2) {
			spell = spells2[Math.floor(Math.random() * spells2.length)];
			html_insert += '<div class="div-table-row" align="center">Spellbook: ' + spell + '</div>';
		}

		if (level > 3) {
			spell = spells3[Math.floor(Math.random() * spells3.length)];
			html_insert += '<div class="div-table-row" align="center">Spellbook: ' + spell + '</div>';
		}

		if (level > 4) {
			spell = spells4[Math.floor(Math.random() * spells4.length)];
			html_insert += '<div class="div-table-row" align="center">Spellbook: ' + spell + '</div>';
		}

		if (level > 5) {
			spell = spells5[Math.floor(Math.random() * spells5.length)];
			html_insert += '<div class="div-table-row" align="center">Spellbook: ' + spell + '</div>';
		}

		if (level > 6) {
			spell = spells1[Math.floor(Math.random() * spells1.length)];
			html_insert += '<div class="div-table-row" align="center">Spellbook: ' + spell + '</div>';
		}

		if (level > 7) {
			spell = spells2[Math.floor(Math.random() * spells2.length)];
			html_insert += '<div class="div-table-row" align="center">Spellbook: ' + spell + '</div>';
		}
	}



	if (class_name == "Cleric") {
		let spells1 = ["Cure Light Wounds", "Light", "Darkness", "Cause Fear", "Remove Fear"];
		let spells2 = ["Blight", "Bless", "Silence 15'", "Hold Person"];
		let spells3 = ["Curse", "Striking", "Cause Disease", "Cure Disease"];
		let spells4 = ["Create Water", "Sticks to Snakes", "Neutralise Poison", "Protection from Evil 10'"];
		let spells5 = ["Quest", "Raise Dead", "Insect Plague"];

		html_insert += '<div class="div-table-row" align="center">Mace</div>';

		let spell = "";
		if (level > 0) {
			html_insert += '<div class="div-table-row" align="center">Relic: ' + spells1[0] + '</div>';
		}

		if (level > 1) {
			spell = spells1[Math.floor(Math.random() * spells1.length)];
			html_insert += '<div class="div-table-row" align="center">Relic: ' + spell + '</div>';
		}

		if (level > 2) {
			spell = spells2[Math.floor(Math.random() * spells2.length)];
			html_insert += '<div class="div-table-row" align="center">Relic: ' + spell + '</div>';
		}

		if (level > 3) {
			spell = spells3[Math.floor(Math.random() * spells3.length)];
			html_insert += '<div class="div-table-row" align="center">Relic: ' + spell + '</div>';
		}

		if (level > 4) {
			spell = spells4[Math.floor(Math.random() * spells4.length)];
			html_insert += '<div class="div-table-row" align="center">Relic: ' + spell + '</div>';
		}

		if (level > 5) {
			spell = spells5[Math.floor(Math.random() * spells5.length)];
			html_insert += '<div class="div-table-row" align="center">Relic: ' + spell + '</div>';
		}

		if (level > 6) {
			spell = spells1[Math.floor(Math.random() * spells1.length)];
			html_insert += '<div class="div-table-row" align="center">Relic: ' + spell + '</div>';
		}

		if (level > 7) {
			spell = spells2[Math.floor(Math.random() * spells2.length)];
			html_insert += '<div class="div-table-row" align="center">Relic: ' + spell + '</div>';
		}
	}


	document.getElementById("inventory").innerHTML = html_insert;



}

function print_character_summary(class_name, level, hp, melee_thac0, ranged_thac0, ac) {
	let html_insert = "";

	html_insert += '<div class="div-table-row" align="center"><b>' + class_name + '</b></div>';
	html_insert += '<div class="div-table-row" align="center"><i>Level ' + level + '</i></div>';
	html_insert += '<div class="div-table-row" align="center"><b>HP ' + hp + '</b></div>';

	if (melee_thac0 >= 0) {
		melee_thac0 = "+" + melee_thac0;
	}
	if (ranged_thac0 >= 0) {
		ranged_thac0 = "+" + ranged_thac0;
	}

	html_insert += '<div class="div-table-row" align="center">AC: ' + ac + '</div>';
	html_insert += '<div class="div-table-row" align="center">Melee: ' + melee_thac0 + '</div>';
	html_insert += '<div class="div-table-row" align="center">Ranged: ' + ranged_thac0 + '</div>';

	document.getElementById("character").innerHTML = html_insert;
}

function print_character_sheet(sheet) {
	let html_insert = "";
	html_insert += '<div class="div-table-row">';
	html_insert += '<div class="div-table-col-narrow" align="center">STR</div>';
	html_insert += '<div class="div-table-col-narrow" align="center">' + sheet[0] + '</div>';
	html_insert += '</div>';

	html_insert += '<div class="div-table-row">';
	html_insert += '<div class="div-table-col-narrow" align="center">DEX</div>';
	html_insert += '<div class="div-table-col-narrow" align="center">' + sheet[1] + '</div>';
	html_insert += '</div>';

	html_insert += '<div class="div-table-row">';
	html_insert += '<div class="div-table-col-narrow" align="center">CON</div>';
	html_insert += '<div class="div-table-col-narrow" align="center">' + sheet[2] + '</div>';
	html_insert += '</div>';

	html_insert += '<div class="div-table-row">';
	html_insert += '<div class="div-table-col-narrow" align="center">INT</div>';
	html_insert += '<div class="div-table-col-narrow" align="center">' + sheet[3] + '</div>';
	html_insert += '</div>';

	html_insert += '<div class="div-table-row">';
	html_insert += '<div class="div-table-col-narrow" align="center">WIS</div>';
	html_insert += '<div class="div-table-col-narrow" align="center">' + sheet[4] + '</div>';
	html_insert += '</div>';

	html_insert += '<div class="div-table-row">';
	html_insert += '<div class="div-table-col-narrow" align="center">CHA</div>';
	html_insert += '<div class="div-table-col-narrow" align="center">' + sheet[5] + '</div>';
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


function advance_levels(character_sheet, level, preferred_ability) {
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

	return character_sheet;
}