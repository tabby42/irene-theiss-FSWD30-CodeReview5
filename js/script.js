console.log(data);

function template (imgSrc, firstName, lastName, age, performers) {
	var tpl = "<figure class='flex-1 flex-row flex-start'>";
		tpl += "<img src='" + imgSrc + "' alt=''>";
		tpl += "<figcaption>";
		tpl += "<h3>" + firstName + " " + lastName + "</h3>";
		tpl += 	"<p><b>Age: </b>" + age + "<p>";
		tpl += 	"<p><b>Favorite Performers: </b>" + performers + "<p>";
		tpl += 	"<p><b>Likes </b>" + performers + "<p>";
		tpl += "</figcaption></figure>"	;	
	return tpl;
}