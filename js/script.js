(function () {
	const SUBMIT = document.getElementsByTagName('input')[0];
	const TABLE = document.getElementsByTagName('table')[0];
	let httpReq;

	SUBMIT.addEventListener('click', function () {
		requestFile('my_college_degrees.json');
	});

	function requestFile(url) {
		httpReq = new XMLHttpRequest();

		if(!httpReq) {
			alert('Exiting. Cannot create an XMLHTTP instance');
			return false;
		}
		httpReq.onreadystatechange = displayHTML;
		httpReq.open('GET', url);
		httpReq.send();
	}
	function displayHTML() {
		if (httpReq.readyState === XMLHttpRequest.DONE) {
			if (httpReq.status === 200) {
				const obj = JSON.parse(httpReq.responseText);
				console.log(Object.keys(obj.my_college_degrees[0].degree));

	
				const thead = document.createElement('thead');
				const tr = document.createElement('tr');
				thead.appendChild(tr);
				TABLE.appendChild(thead);
				const tbody = document.createElement('tbody');
				TABLE.appendChild(tbody);

				
				const collegeDegreesProperties = Object.keys(obj.my_college_degrees[0].degree);
				for (var i = 0; i < collegeDegreesProperties.length; i++) {
					console.log(collegeDegreesProperties[i]);
					const th = document.createElement('th');
					let upperCaseThTextContent = collegeDegreesProperties[i].charAt(0).toUpperCase() + collegeDegreesProperties[i].slice(1);
					let thTextContent = document.createTextNode(upperCaseThTextContent);
				
					th.appendChild(thTextContent);
					tr.appendChild(th);
				}

				for (var i = 0; i < obj.my_college_degrees.length; i++) {
					const collegeDegreeValues = Object.values(obj.my_college_degrees[i].degree);
					const trBody = document.createElement('tr');
					tbody.appendChild(trBody);

					for (const i in collegeDegreeValues) {
						console.log(collegeDegreeValues[i]);
						const td = document.createElement('td');
						const tdText = document.createTextNode(collegeDegreeValues[i]);
						td.appendChild(tdText);
						trBody.appendChild(td);
					}
					
				}

				const body = document.getElementsByTagName('body')[0];
				
				

					TABLE.classList.remove('table-hidden');
				TABLE.classList.add('table-shown');
				document.getElementById('degree-table').style.width = '75%';
				document.getElementById('degree-table').style.margin = '0 auto';
				SUBMIT.disabled = true;
				SUBMIT.classList.remove('enabledSubmit');
				SUBMIT.classList.add('disabledSubmit');

				


		


				
			} else {
				alert("Problematic request.");
			}
		}
	}
})();