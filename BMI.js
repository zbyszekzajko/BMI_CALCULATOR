const WeightDisplay = a => {
	document.getElementById("displayWeight").innerHTML = `Twoja waga: ${a}`;
};

const HeightDisplay = a => {
	document.getElementById("displayHeight").innerHTML = `Twój wzrost: ${a}`;
};

const bmiDisplay = a => {
	document.getElementById("displayBmi").innerHTML = `Twój wynik BMI: ${a}`;
};

const hLBmiDisplay = a => {
	document.getElementById("displayHLbmi").innerHTML = `Twoje BMI ${a}`;
};

const clearhLBmiDisplay = () => {
	document.getElementById("displayHLbmi").innerHTML = "";
};

const avrDisplay = a => {
	document.getElementById("avr").innerHTML = ` ${a}`;
};

const correctWeight = a => {
	if ((Number(a) >= 40) & (Number(a) <= 200)) {
		return true;
	} else {
		return false;
	}
};

const correctHeight = b => {
	if ((Number(b) >= 120) & (Number(b) <= 240)) {
		return true;
	} else {
		return false;
	}
};

const returnDate = () => {
	const d = new Date();
	const date = new Intl.DateTimeFormat("pl", {
		dateStyle: "long",
		timeStyle: "medium",
	}).format(d);
	return date;
};

const liList = (a, b) => {
	const liItem = document.createElement("li");
	document.getElementById("olHistory").appendChild(liItem);
	liItem.id = b;
	const link = document.createElement("a");
	link.setAttribute("href", " #");
	liItem.appendChild(link).innerHTML = ` Pomiar z ${a}`;
	liItem.addEventListener("click", function () {
		let dane = JSON.parse(window.localStorage.getItem(b));
		WeightDisplay(dane.waga);
		HeightDisplay(dane.wzrost);
		bmiDisplay(dane.BMI);
		clearhLBmiDisplay();
	});
};

const clearStorage = () => {
	localStorage.clear();
	document.getElementById("olHistory").innerHTML = "";
	HeightDisplay("");
	WeightDisplay("");
	bmiDisplay("");
	clearhLBmiDisplay();
	avrDisplay("");
	sum = 0;
};

const clearInput = () => {
	document.getElementById("form").reset();
};

const createObject = (a, b, c, d) => {
	const information = {
		waga: a,
		wzrost: b,
		BMI: c,
		data: d,
	};
	return information;
};

let sum = 0;

for (let i = 0; i < localStorage.length; i++) {
	let getInfo = JSON.parse(window.localStorage.getItem(i));
	liList(getInfo.data, i);
	sum += Number(getInfo.BMI);
}

let inputWeight = document
	.getElementById("weight")
	.addEventListener("keypress", function (event) {
		if (event.key === "Enter") {
			document.getElementById("button").click();
		}
	});

let inputHeight = document
	.getElementById("height")
	.addEventListener("keypress", function (event) {
		if (event.key === "Enter") {
			document.getElementById("button").click();
		}
	});

const bmiValue = () => {
	const weight = document.getElementById("weight").value;
	const height = document.getElementById("height").value;

	if (correctWeight(weight) & correctHeight(height)) {
		let counter = localStorage.length;
		let bmi = (Number(weight) / Math.pow(Number(height) / 100, 2)).toFixed(2);
		bmiDisplay(bmi);
		let measurment = createObject(weight, height, bmi, returnDate());
		window.localStorage.setItem(counter, JSON.stringify(measurment));
		liList(measurment.data, counter);
		const dane = JSON.parse(window.localStorage.getItem(counter - 1));

		if (counter >= 1) {
			console.log(dane.BMI);
			if (bmi == dane.BMI) {
				hLBmiDisplay(`się nie zmieniło`);
			} else if (bmi > dane.BMI) {
				hLBmiDisplay(`wzrosło!`);
			} else {
				hLBmiDisplay(`zmalało!`);
			}
		}
		sum += Number(bmi);
		console.log(sum);
		avr = (sum / localStorage.length).toFixed(2);
		console.log(avr);
		avrDisplay(`Średnia BMI: ${avr}`);
	} else {
		bmiDisplay("");
		clearhLBmiDisplay();
	}
	correctWeight(weight)
		? WeightDisplay(weight)
		: WeightDisplay("Podałeś złą wagę!");
	correctHeight(height)
		? HeightDisplay(height)
		: HeightDisplay("Podałeś zły wzrost!");
	clearInput();
};

// Object.keys(localStorage).forEach(key => {
// 	let getInfo = JSON.parse(window.localStorage.getItem(key));
// 	liList(getInfo.data, key);
// 	sum += Number(getInfo.BMI);
// });

console.log(avr);
console.log(sum);
