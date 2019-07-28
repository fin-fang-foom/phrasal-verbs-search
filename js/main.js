const form = document.querySelector('.search-form');
const table = document.querySelector('.search-results');

const verbs = [];
const endpoint = "https://raw.githubusercontent.com/Semigradsky/phrasal-verbs/master/common.json";
fetch(endpoint)
	.then(data => data.json())
	.then(data => verbs.push(...data));

function updateTable(e) {
	e.preventDefault();
	const input = this.querySelector('.search-input');
	const query = input.value;
	const regex = new RegExp(query, 'gi');
	const matches = [...verbs.filter(verb => verb.verb.match(regex))];
	let html = `
	<th>Phrasal Verb</th>
	<th>Meaning</th>
	<th>Example</th>`;
	matches.forEach(match => {
	html += `
	<tr>
	<td>${match.verb}</td>
	<td>${match.definition}</td>
	<td>${match.examples[0]}</td>
	`;
	})
	table.innerHTML = html;

	input.blur();
	form.reset();		// is it needed?
}


form.addEventListener('submit', updateTable);