(function () {
	var httpRequest;
	document.getElementById("button").onclick = function() {
		makeRequest('my_college_degrees.json');
	};
	function makeRequest(url) {
		httpRequest = new XMLHttpRequest();

		if(!httpRequest) {
			alert('Exiting : cannot create an XMLHTTP instance');
			return false;
		}
		httpRequest.onreadystatechange = alertContents;
		httpRequest.open('GET', url);
		httpRequest.send();
	}
	function alertContents() {
		if (httpRequest.readyState === XMLHttpRequest.DONE) {
			if (httpRequest.status === 200) {
				// alert(httpRequest.responseText);
				console.log("hello there");
			} else {
				alert("There was a problem with the request.");
			}
		}
	}
})();