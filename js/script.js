jQuery(document).ready(function($) {
	var container = $(".img-container");
	var members = data["Members"];
	var likeBtn = $("button.like-btn");
	var sortBtn = $(".sort-btn");

	//member template
	function template (id, imgSrc, firstName, lastName, age, performers, likes) {
		var tpl = "<figure class='flex-1 flex-row flex-start' data-id='" + id + "'>";
			tpl += "<img src='" + imgSrc + "' alt='Memmber Photo'>";
			tpl += "<figcaption class='flex-figure'>";
			tpl += "<h3>" + firstName + " " + lastName + "</h3>";
			tpl += "<p><b>Age </b>" + age + "</p>";
			tpl += "<p><b>Favorite Performers<br></b>" + performers + "</p>";
			tpl += "<p><b>Likes </b><span class='likes'>" + likes + "</span><button type='button' class='white like-btn'><i class='fas fa-heart fa-sm'></i></button></p>";
			tpl += "</figcaption></figure>";	
		return $(tpl);
	}

	//append members 
	function appendMembers(arr) {
		var toAppend = "";
		for (var i = 0; i < arr.length; i++) {
			toAppend = template(arr[i].id, arr[i].myPhoto, arr[i].name, arr[i].surname, arr[i].age, arr[i].favoritePerformers.join("<br>"), arr[i].likes);
			container.append(toAppend);
		}
	}
	appendMembers(members);

	//like-button 
	container.on("click", likeBtn, function(e) {
		var fig = e.target.closest("figure");
		var id = $(fig).attr("data-id");
		var likesEl = $(fig).find(".likes");
		//console.log(id);
		for (var i = 0; i < members.length; i++) {
			if (parseInt(members[i].id) === parseInt(id)) {
				members[i].likes ++;
				//console.log(members[i].likes);
				likesEl.text(members[i].likes);
			}
		}
	});

	//sort members
	function sortMembersByLike () {
		var sorted = members.sort(function(a, b) { 
		    return a.likes - b.likes;
		});
		return sorted.reverse();
	}

	//sort-button
	sortBtn.on("click", function () {
		var sorted = sortMembersByLike();
		$(".img-container figure").detach();
		appendMembers(sorted);
	});
});


