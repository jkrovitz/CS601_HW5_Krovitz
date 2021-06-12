/* All JavaScript for this assingment lives in an IIFE (Imediately Invoked Function Expression. */
(function () {
    'use strict';
    const SUBMIT = document.getElementsByTagName('input')[0];
    let httpReq;

	/* When submit is clicked, the function requestFile is called. */
    SUBMIT.addEventListener('click', function() {
        requestFile('data/my_college_degrees.json');
    });

	/* The function requestFile takes in a file, creates a new XMLHttpRequest object, and executes the function displayHTML when the readyState changes. It then calls the open method and passes in the GET request, file, and true so that the request happens asynchronously. The request is then sent to the server. */
    function requestFile(file) {
        httpReq = new XMLHttpRequest();
        httpReq.onreadystatechange = displayHTML;
        httpReq.open('GET', file, true);
        httpReq.send();
    }

	/* The function display HTML checks that the XMLHttpRequest has a ready state of DONE. The function then checks that the status is 200, which means the request was fulfilled. Several constants are initialized, including a constant called OBJ where JSON data has been parsed into a JavaScript object. Several helper functions are then called. */
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

	/*  The function createTableStructure appends the table head to the table, appends the table body to the table, sets the id and class attributes of the table and appends the table to the body. */
    function createTableStructure(BODY, TABLE, THEAD, TBODY) {
        TABLE.appendChild(THEAD);
        TABLE.appendChild(TBODY);
        TABLE.setAttribute('id', 'degree-table');
        TABLE.setAttribute('class', 'table-hidden');
        BODY.appendChild(TABLE);
	}
	
	/* The function createColumnNames appends a table row to the table head and gets the object's keys—School, Program/Major, Type, and Year Conferred. It then loops through each of the object's keys, creates a header cell element, creates a text node which an object key, adds the text node to the header cell element, and appends the header cell element to the table row.  */
    function createColumnNames(OBJ, THEAD, TR) {
        THEAD.appendChild(TR);
        const COLLEGE_DEGREE_KEYS = Object.keys(OBJ.my_college_degrees[0].degree);
        for (let i = 0; i < COLLEGE_DEGREE_KEYS.length; i++) {
            const TH = document.createElement('th');
            const TH_TEXT_CONTENT = document.createTextNode(COLLEGE_DEGREE_KEYS[i]);
            TH.appendChild(TH_TEXT_CONTENT);
            TR.appendChild(TH);
        }
    }

	/* The function addCellValues loops over OBJ.my_college_degrees, initializes COLLEGE_DEGREE_VALUES, which are the values of an object containing information about a degree, creates a row element, and adds the row element to the table body. An inner for of loop then loops over COLLEGE_DEGREE_VALUES, creates a cell element, creates a text node that contains the values of a degree object, adds the text node to the cell element and adds the cell element to the row. */
	function addCellValues(OBJ, TBODY) {
        for (let i = 0; i < OBJ.my_college_degrees.length; i++) {
            const COLLEGE_DEGREE_VALUES = Object.values(OBJ.my_college_degrees[i].degree);
            const TR_BODY = document.createElement('tr');
            TBODY.appendChild(TR_BODY);
            for (const J in COLLEGE_DEGREE_VALUES) {
                if (COLLEGE_DEGREE_VALUES.hasOwnProperty(J)) {
                    const TD = document.createElement('td');
                    const TD_TEXT = document.createTextNode(COLLEGE_DEGREE_VALUES[J]);
                    TD.appendChild(TD_TEXT);
                    TR_BODY.appendChild(TD);
                }
            }
        }
    }

	/* The function showTable removes the table-hidden class and adds the table-shown class. */
    function showTable(TABLE) {
        TABLE.classList.remove('table-hidden');
        TABLE.classList.add('table-shown');
    }

	/* The function disableSubmit disables the submit button. */
    function disableSubmit(SUBMIT) {
        SUBMIT.disabled = true;
        SUBMIT.classList.remove('enabled-submit');
        SUBMIT.classList.add('disabled-submit');
    }

	/* The function addImage creates an img element, adds an src and alt attribute, and appends the image to the body. */
    function addImage(BODY) {
        const IMAGE = document.createElement('img');
        IMAGE.src = 'images/graduation-cap.png';
        IMAGE.alt = '';
        BODY.appendChild(IMAGE);
    }
})();