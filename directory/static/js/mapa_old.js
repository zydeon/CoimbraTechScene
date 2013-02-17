var latlngInit = new google.maps.LatLng(40.20736078201518,-8.407759666442871);
var markers = new Array();
var map;
var path_to_logos;
var last_marker = null;
var curr_company;

function Company(name,description,address,tag,logo,website,email,phone,foundyear,facebook,clients,products,linkedin){
	this.name = name;
	this.description = description;
	this.address = address;
	this.tag = tag;
	this.logo = logo;
	this.website = website;
	this.email = email;
	this.phone = phone;
	this.foundyear = foundyear;
	this.facebook = facebook;
	this.clients = clients;
	this.products = products;
	this.linkedin = linkedin;
}

function initialize_map(path_to_logos_) {
	path_to_logos = path_to_logos_;

	var myOptions = {
		zoom: 14,
		center: latlngInit,
		mapTypeId: google.maps.MapTypeId.SATELLITE,

		zoomControl: true,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.MEDIUM,
			position: google.maps.ControlPosition.RIGHT_TOP
		},
		rotateControl: false,
		scaleControl: false,
		panControl: false,
		streetViewControl: false,
		overviewMapControl: false,
		backgroundColor: 'black',
		maxZoom: 19,
		minZoom: 12
	};

	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
} 

function addMarker(name, lat, lon){
	var place = new google.maps.LatLng(lat, lon); 
	var marker_ = new google.maps.Marker({
		position: place,
		map: map,
		animation: google.maps.Animation.DROP,
		title: name
	});
	marker_.infowindow = new google.maps.InfoWindow({
		content: ''
	});	

	google.maps.event.addListener(marker_, 'click', function(){getAndShowInformation(marker_, name)});

	markers.push(marker_);
}

function hideLastCompanyInfo(){
	// close last marker
	if(last_marker != null){
		last_marker.infowindow.close();
	}
	infCloseButtonListener();
}

function getAndShowInformation(marker, company_name){
	// Ajax to get information (activated by the marker button on the map)

	hideLastCompanyInfo();
	last_marker = marker;

	$(function(){
		$.getJSON(
			'/company/',
			{name: decode(company_name)},
			function(result) {
				var comp = result[0].fields;
				console.log(comp);
				curr_company = new Company( encode(comp.name),
											encode(comp.description),
											encode(comp.address),
											encode(comp.tags),
											encode(comp.logo),
											encode(comp.website),
											encode(comp.email),
											encode(comp.phone),
											encode(comp.year),
											encode(comp.facebook),
											encode(comp.clientes),
											encode(comp.produtos),
											encode(comp.linkedin)
										  );

				prepareInfoWindowZoom(marker);
			}
		); 
	});	
}

function getAndShowInformation_(company_name){
	// Ajax to get information
	var marker = findMarker(encode(company_name));
	getAndShowInformation(marker, company_name);
}

function prepareInfoWindowZoom(marker_){;
	var contentString;

	contentString = "<div id='content'>"+"<div id='siteNotice'>"+"</div>"+
	"<h2 id=\"firstHeading\" class=\"firstHeading\">"+curr_company.name+
	(curr_company.logo!='' ? "<img align=\"left\" src="+path_to_logos+curr_company.logo+ " alt="+curr_company.name+" width=\"52\">" : "")+
	"</h2>"+
	"<p><b> "+curr_company.address+"</b></p>"+
	"<div id=\"bodyContent\">"+
	"<p>"+curr_company.description+
	" <a href=\"javascript:moreInfobuttonListener();\">more information</a>"+
	"</p></div>"+
	"</div>";

	marker_.infowindow.content = contentString;

	map.panTo(marker_.position);
	smoothZoomIn(18,map.getZoom());
	setTimeout(function(){marker_.infowindow.open(map,marker_)},1150);
}

function moreInfobuttonListener(){
	var marker_ = findMarker(curr_company.name);
	marker_.infowindow.close();
	document.getElementById("menuInf").style.display = "inline";
	displayInformation();
}

function findMarker(company_name){
	console.log(company_name);
	console.log(markers);
	for(var i=0; i<markers.length;i++){
		if(markers[i].title==company_name){
			var marker_ = markers[i];
			break;
		}
	}
	return marker_;	
}


function displayInformation(){
	var div = document.getElementById("menuInf");
	var content;

	content = '<button onclick="infCloseButtonListener()" class="buttonClose" id="menuInfButtonClose"><span class="closeB">&#10006</span></button>'+
			  '<h2>'+curr_company.name+'</h2>'+
			  '<p><b>'+curr_company.address+'</b></p>';

	content += (curr_company.logo!='' ? '<p><img style="border:6px double #545565" align="center" src='+path_to_logos+curr_company.logo+' alt='+curr_company.name+' width="25%"></p>' : '');
	content += '<p>'+curr_company.description+' </p>';
	content += (curr_company.tag!='' ? '<p><b>Tags</b>: '+curr_company.tag+'</p>' : '');
	content += (curr_company.foundyear != '' ? '<p><b>Ano de funda&ccedil&atildeo: </b>'+ curr_company.foundyear+'</p>' : '');
	content += (curr_company.website != '' ? '<p><b>Website: </b><a style="color: white;" href='+curr_company.website+' target="_blank">'+curr_company.website+'</a></p>' : '');
	content += (curr_company.email != '' ? '<p><b>Email: </b>'+ curr_company.email+'</p>' : '');
	content += (curr_company.phone != '' ? '<p><b>Telefone: </b>'+curr_company.phone+'</p>' : '');
	content += (curr_company.products != '' ? '<p><b>Produtos: </b>'+curr_company.products+'</p>' : '');
	content += (curr_company.clients != '' ? '<p><b>Clientes: </b>'+curr_company.clients+'</p>' : '');
	content += (curr_company.facebook != '' ? '<div id=\"facebook\" class=\"fb-like-box fb_iframe_widget\" data-href=\"http:\/\/www.facebook.com\/pages\/Infogene-Lda\/203100856435850?fref=ts\"data-show-faces=\"false\" data-stream=\"true\" data-header=\"false\" fb-xfbml-state=\"rendered\"><span><iframe id=\"fc88a22c8\" name=\"f159f4c9d\" scrolling=\"no\" style=\"border: none; overflow: hidden; height:450px; width:400px;background:rgb(255,255,250);opacity:0.9\" class=\"fb_ltr\" src=\"http:\/\/www.facebook.com\/plugins\/likebox.php?api_key=&amp;locale=pt_PT&amp;sdk=joey&amp;channel=http%3A%2F%2Fstatic.ak.facebook.com%2Fconnect%2Fxd_arbiter.php%3Fversion%3D17%23cb%3Df6b5e0b2%26origin%3Dhttp%253A%252F%252Flocalhost%253A8000%252Ff19d35ef8c%26domain%3Dlocalhost%26relation%3Dparent.parent&amp;header=true&amp;show_faces=false&amp;stream=true&amp;height=474&amp;width=400&amp;href='+curr_company.facebook+'&amp;colorscheme=light\"><\/iframe><\/span><\/div>' : '');

	//content += (linkedin != '' ? '<script type="text/javascript">alert(\'teste\')</script>' : '');

	if(curr_company.linkedin!='') {
        content+='<p><b>Linkedin: </b></p>';
        var n = curr_company.linkedin.split("/");
        for (var i=0; i<n.length-1;i++){}
        curr_company.linkedin= n[i++];
        //alert(curr_company.linkedin);
        content+="<iframe style=\"height:278px; width:400px;\" frameBorder=\"0\" id=\"linkedin\" src=\"static/linkedin.html?id="+curr_company.linkedin+"\"></iframe>";
    }
	
	div.innerHTML = content;
 }

function resetMap(){
	hideLastCompanyInfo();
	map.panTo(latlngInit);
	smoothZoomOut(14,map.getZoom());
}

function smoothZoomOut (min, cnt) {
	if (cnt < min) {
		return;
	}
	else {
		z = google.maps.event.addListener(map,'zoom_changed', function(event){
			google.maps.event.removeListener(z);
			self.smoothZoomOut(min, cnt -1);
		});
		setTimeout(function(){map.setZoom(cnt)}, 100);
		return;
	}
}
// the smooth zoomIn function
function smoothZoomIn (max, cnt) {
	if (cnt > max) {
		return;
	}
	else {
		z = google.maps.event.addListener(map,'zoom_changed', function(event){
			google.maps.event.removeListener(z);
			self.smoothZoomIn(max, cnt + 1);
		});
		setTimeout(function(){map.setZoom(cnt)}, 100);
		return;
	}
}

function initCloseButtonListener(){
	document.getElementById("menuIn").style.display = "none";
	document.getElementById("menu").style.display = "inline";
	document.getElementById("menuDrop").style.display = "inline";
	document.getElementById("numEmpresasMenu").style.display = "inline";
	document.getElementById("numEmpresasMenuSub").style.display = "inline";
}

function infCloseButtonListener(){
	aux=document.getElementById("menuInf");
	aux.innerHTML='';
	aux.style.display = "none";
}

function decode( str ){
	return $('<div/>').html(str).text();
}

function encode(str) {
	return String(str)
			.replace(/&/g, '&amp;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');
}
