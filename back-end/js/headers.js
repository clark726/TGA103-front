function includeHTML() {
	const xxx = document.querySelector("#xxx");
	fetch("/com/header.html")
		.then((resp) => resp.text())
		.then((content) => {
			xxx.innerHTML = content;
			changelog();
			changeTheme();	
			logout();		
			const username = document.querySelector("#account");
			const password = document.querySelector("#password");
			const errMsg = document.querySelector("#errMsg");
			document.getElementById("btn1").addEventListener("click", () => {
				fetch("http://localhost:8080/api/StoreLogin", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						account: username.value,
						password: password.value,
					}),
				})
					.then((resp) => resp.json())
					.then((body) => {
						errMsg.textContent = "";
						const { successful, message } = body;
						if (successful) {
							const { account, password } = body;
							sessionStorage.setItem("account", account);
							location = "http://localhost:8080/api/ShowProduct";
						} else {
							errMsg.textContent = message;
						}
					});
			});
		});
}
includeHTML();



//點擊theme_id
function changeTheme() {
	let allthemeid = document.querySelectorAll(".theme_id");
	allthemeid.forEach(function(e) {
		e.addEventListener("click", function(e) {
			let id = e.target.getAttribute("data-themid");
			sessionStorage.setItem("themeId", id)
		})
	})
}

//換登出鈕
function changelog() {
	if (sessionStorage.getItem("account")) {
		document.querySelector("#login").style.display = "none";
		document.querySelector("#logout").style.display = "block";
		document.querySelector("#loginbox").style.display = "none";
		document.querySelector("#normal").style.display = "block";
	} else if (sessionStorage.getItem("memberAccount")) {
		document.querySelector("#login").style.display = "none";
		document.querySelector("#logout").style.display = "block";
	}

}
//登出
function logout(){
	document.querySelector("#logout").addEventListener("click", function(){
		if(sessionStorage.getItem("account")){
			sessionStorage.removeItem("account")
		}else if(sessionStorage.getItem("memberAccount")){
			sessionStorage.removeItem("memberAccount")
		}
	  })
}



