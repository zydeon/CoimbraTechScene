function toggle_companies(id){
	div = document.getElementById(id);
	if(div.style.display!="none"){
		hide_companies(div);
	}
	else{
		show_companies(div);		
	}
}

function hide_companies(div){
	div.style.display = "none";
	/* roda triangulo */
	document.getElementById("triang_"+div.id).style.webkitTransform = "rotate(-90deg)";
	document.getElementById("triang_"+div.id).style.mozTransform = "rotate(-90deg)";
	document.getElementById("triang_"+div.id).style.oTransform = "rotate(-90deg)";
}

function show_companies(div){
	div.style.display = "block";
	/* roda triangulo */
	document.getElementById("triang_"+div.id).style.webkitTransform = "rotate(0deg)";
	document.getElementById("triang_"+div.id).style.mozTransform = "rotate(0deg)";
	document.getElementById("triang_"+div.id).style.oTransform = "rotate(0deg)";
}


function toggle_type(type){
	div1 = document.getElementById("by_name");
	div2 = document.getElementById("by_tags");	
	if(type==1){
		// Name
		div1.style.display = "block";
		div2.style.display = "none";		

		reset_display_tags(div2);
	}
	else{
		// Tags
		div1.style.display = "none";
		div2.style.display = "block";

		reset_display_name(div1);
	}
}

function reset_display_tags(div){
	for (var i = 0; i < div.children.length; i++) {
		if(div.children[i] instanceof HTMLDivElement){
			hide_companies(div.children[i]);
		}
	};
}

function reset_display_name(div){
	for (var i = 0; i < div.children.length; i++) {
		if(div.children[i] instanceof HTMLDivElement){
			show_companies(div.children[i]);
		}
	};	
}

function menuInitListener(){
	resetMap();
	reset_display_name( document.getElementById("by_name") );
	toggle_type(1);
}