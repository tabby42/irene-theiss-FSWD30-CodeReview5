jQuery(document).ready(function($) {
	//variables
	var container = $(".img-container"),
		members = data["Members"],
		likeBtn = $("button.like-btn"),
		sortBtn = $(".sort-btn");

	//member template
	//HTML template to be filled with data from members.json
	function template (id, imgSrc, firstName, lastName, age, performers, likes) {
		var tpl = "<figure class='flex-1 flex-row flex-start' data-id='" + id + "'>";
			tpl += "<img src='" + imgSrc + "' alt='Member Photo'>";
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
		//loop through all members, call template-function on each iteration
		//fill with data and append to container-element
		for (var i = 0; i < arr.length; i++) {
			toAppend = template(arr[i].id, arr[i].myPhoto, arr[i].name, arr[i].surname, arr[i].age, arr[i].favoritePerformers.join("<br>"), arr[i].likes);
			container.append(toAppend);
		}
	}
	appendMembers(members);

	//like-button 
	//event delegation is needed for dynamically added elements -->
	//--> likeBtn.on("click", ...) won't work
	//https://learn.jquery.com/events/event-delegation/ -->
	//Event delegation allows us to attach a single event listener
	//to a parent element, that will fire for all descendants matching a selector, 
	//whether those descendants exist now or are added in the future.
	container.on("click", likeBtn, function(e) {
		//find enclosing figure ...
		var fig = e.target.closest("figure");
		//... to get value of data-id attribute of clicked member
		// so we know which member has been clicked
		var id = $(fig).attr("data-id");
		//store HTML element for displaying this members's likes for use in loop
		var likesEl = $(fig).find(".likes");
		//loop through all members, find the one matching the current data id value
		//and increase its like property by 1, then update likes display accordingly
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
		//return descending order
		return sorted.reverse();
	}

	//sort-button
	sortBtn.on("click", function () {
		var sorted = sortMembersByLike();
		//remove all members from page ...
		$(".img-container figure").detach();
		//.. and append them again in sorted form
		appendMembers(sorted);
	});
});


