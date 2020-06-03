window.onload = function(){
	document.getElementById("header-responsive").addEventListener("click", function () {
		toggleResponsiveHeader(this);
	});
}

function toggleResponsiveHeader(x) {
	x.classList.toggle("change");
	x = document.getElementsByClassName("header")[0].classList.toggle("responsive");
	x = document.getElementsByClassName("header__navbar-button");
	for (var i = 0; i < x.length; i++) {
		x[i].classList.toggle("hidden");
		x[i].classList.toggle("header__navbar-button--responsive-navbar");
	}
}