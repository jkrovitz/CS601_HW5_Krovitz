(function () {
	'use strict';
    const SUBMIT = document.getElementsByTagName('input')[0];
    let httpReq;

    SUBMIT.addEventListener('click', function () {
        requestFile('data/my_college_degrees.json');
    });

    function requestFile(file) {
        httpReq = new XMLHttpRequest();
        httpReq.onreadystatechange = displayHTML;
        httpReq.open('GET', file);
        httpReq.send();
    }

    function displayHTML() {
        if (httpReq.readyState === XMLHttpRequest.DONE) {
            if (httpReq.status === 200) {
				const OBJ = JSON.parse(httpReq.responseText);
				const BODY = document.getElementsByTagName('body')[0];
				const TABLE = document.createElement('table');
                const THEAD = document.createElement('thead');
                const TR = document.createElement('tr');
                const TBODY = document.createElement('tbody');
                createTableStructure(BODY, TABLE, THEAD, TBODY);
                createColumnNames(OBJ, THEAD, TR);
                addCellValues(OBJ, TBODY);
                showTable(TABLE);
                disableSubmit(SUBMIT);
                addImage(BODY);
            }
        }
    }

	function createTableStructure(BODY, TABLE, THEAD, TBODY) {
		TABLE.appendChild(THEAD);
		TABLE.appendChild(TBODY);
		TABLE.setAttribute('id', 'degree-table');
		TABLE.setAttribute('class', 'table-hidden');
		BODY.appendChild(TABLE);
    }

    function createColumnNames(OBJ, THEAD, TR) {
        THEAD.appendChild(TR);
        const COLLEGE_DEGREE_PROPERTIES = Object.keys(OBJ.my_college_degrees[0].degree);
        for (let i = 0; i < COLLEGE_DEGREE_PROPERTIES.length; i++) {
            const TH = document.createElement('th');
            const TH_TEXT_CONTENT = document.createTextNode(COLLEGE_DEGREE_PROPERTIES[i]);
            TH.appendChild(TH_TEXT_CONTENT);
            TR.appendChild(TH);
        }
    }

    function addCellValues(OBJ, TBODY) {
        for (let i = 0; i < OBJ.my_college_degrees.length; i++) {
            const COLLEGE_DEGREE_VALUES = Object.values(OBJ.my_college_degrees[i].degree);
            const TR_BODY = document.createElement('tr');
            TBODY.appendChild(TR_BODY);
            for (const VAL in COLLEGE_DEGREE_VALUES) {
                const td = document.createElement('td');
                const tdText = document.createTextNode(COLLEGE_DEGREE_VALUES[VAL]);
                td.appendChild(tdText);
                TR_BODY.appendChild(td);
            }

        }
    }

    function showTable(TABLE) {
        TABLE.classList.remove('table-hidden');
        TABLE.classList.add('table-shown');
        document.getElementById('degree-table').style.width = '75%';
        document.getElementById('degree-table').style.margin = '0 auto';
    }

    function disableSubmit(SUBMIT) {
        SUBMIT.disabled = true;
        SUBMIT.classList.remove('enabled-submit');
        SUBMIT.classList.add('disabled-submit');
    }

    function addImage(BODY) {
        const IMAGE = document.createElement('img');
        IMAGE.src = 'images/graduation-cap.png';
        IMAGE.alt = '';
        IMAGE.style.width = '24%';
        IMAGE.style.marginTop = '100px';
        IMAGE.style.marginLeft = '38%';
        IMAGE.style.marginRight = '38%';
        BODY.appendChild(IMAGE);
    }
})();