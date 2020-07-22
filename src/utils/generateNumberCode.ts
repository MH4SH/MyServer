const generateNumberCode = (numberCaracteres: Number) => {
	let count = 1;
	let number = 1;
	while (count < numberCaracteres) { count++; number = number*10; } 
	return Math.floor(number + Math.random() * (number * 9));
};

export default generateNumberCode;