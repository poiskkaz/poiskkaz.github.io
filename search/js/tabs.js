var gl = "gl=ru&";
var city = "";
var tb = [ ['ym','Умный','web',0], ['goz','Google','web images video news blogs',1], ['yaz','Яндекс','web blogs',1], ['biz','Bing','web images video',0] ];
function $b(id) {
 return document.getElementById(id);
}
function word(w){
	$b("q").value = w;
	$b('debug').style.display = 'none';
	Google(0,false);
}

var fileb = "<ul><li onClick=\"ffil(this,'')\">любого формата</li><li onClick=\"ffil(this,'txt')\">Текстовые документы (.txt)</li><li onClick=\"ffil(this,'rss')\">Really Simple Syndication (.rss)</li><li onClick=\"ffil(this,'doc')\">Microsoft Word (.doc)</li><li onClick=\"ffil(this,'xls')\">Microsoft Excel (.xls)</li><li onClick=\"ffil(this,'ppt')\">Microsoft Powerpoint (.ppt)</li><li onClick=\"ffil(this,'pdf')\">Adobe Acrobat PDF (.pdf)</li><li onClick=\"ffil(this,'xml')\">eXtensible Markup Lang (.xml)</li><li onClick=\"ffil(this,'rtf')\">Rich Text Format (.rtf)</li><li onClick=\"ffil(this,'swf')\">Shockwave Flash (.swf)</li><li onClick=\"ffil(this,'ps')\">Adobe Postscript (.ps)</li><li onClick=\"ffil(this,'dwf')\">Autodesk DWF (.dwf)</li><li onClick=\"ffil(this,'kml')\">Google Земля KML (.kml)</li><li onClick=\"ffil(this,'kmz')\">Google Земля KMZ (.kmz)</li></ul>";

function ts2(tab,t) {
$("#imgs,#hl,#add,#add2,#adp").val('');
gl="&";
window.uua=1;
	var tabs = $b("tab2"); 
var alltabs = tabs.getElementsByTagName("li"); 
	for (var i = 0; i < alltabs.length; i++) { 
		alltabs[i].className = '';
	}
	$b(tab).className = 'active';

	for (i in tb) {
if(tb[i][0]==$b(tab).id){
	if(tb[i][3]==0){$("#opt").hide();}else{$("#opt").show();}
}

}
$b('stq').value=tab;
$b('type').value = t;
Google(0,false);
}

	
	
function tabselect(tab,name) {
$("#imgs,#hl,#add,#add2,#adp").val('');
window.uua=1;gl="gl=ru&";


var gz='<input type="radio" name="st" value="goz" checked id="igoz"> <span id="pp">Google</span>';
var gz2='<input type="radio" name="st" value="goz" id="igoz"> <span id="pp">Google</span>';
var yz='<input type="radio" name="st" value="yaz" id="iyaz"> <span id="pp">Яндекс</span>';
var bz='<input type="radio" name="st" value="biz" id="ibiz"> <span id="pp">Bing</span>';

var ym='<input type="radio" name="st"  checked value="ym" id="iym"> <span id="pp">Умный</span>';

tabm = $b(tab);
	var tabs = $b("tab"); 
	var cx = $b('cx');
var alltabs = tabs.getElementsByTagName("li"); 
	for (var i = 0; i < alltabs.length; i++) { 
		alltabs[i].className = '';
	}
	tabm.className = 'active';
	$b('tabx').value = tab;
if(name){
	$b('type').value = name;
	
	cx.value='';
	
	if(tab=='web'){
		$b('seq').innerHTML =ym+gz2+yz+bz;
	}
	else if(tab == "images"){
	
		$b('seq').innerHTML = gz+bz;
	}
	else if(tab == "video"){
		$b('seq').innerHTML = gz+bz;
	}
	else if(tab == "news"){
		$b('seq').innerHTML = gz;
	}
	else if(tab == "blogs"){
		$b('seq').innerHTML = gz+yz;
	}


	
	
	
	
	//Google(0,false);
	$b('stq').value = '';
}
}

jQuery.fn.fadeToggle = function(speed, easing, callback) {
  return this.animate({opacity: 'toggle'}, speed, easing, callback);  
};

function tabnew(){
	$("#glob").slideToggle("fast");
	$("#other").slideToggle("fast");
}
jQuery.fn.cFadeIn = function(speed, callback) {
		$(this).slideDown(speed, function() {
			if(jQuery.browser.msie)
				$(this).get(0).style.removeAttribute('filter');
			if(callback != undefined)
				callback();
		});
	};
jQuery.fn.cFadeOut = function(speed, callback) {
		$(this).slideUp(speed, function() {
			if(jQuery.browser.msie)
				$(this).get(0).style.removeAttribute('filter');
			if(callback != undefined)
				callback();
		});
	};


function show(data){
	$("#"+data).slideToggle("fast");return false;
}
function shown(data){
	$("#"+data).slideToggle("normal");
	return false;
}
function shows(data){
	$("#"+data).slideToggle("fast");return false;
}
function showx(d,b,c,v,g){
		window.uua=0;
	$b(b).innerHTML = c;
	$b(d).style.display="none";
	if(g!=1){$b(v).value=g;}
	if(g=="" || g=="all" || g=="ru"){
		$b(b).style.fontWeight="";
	}else{
		$b(b).style.fontWeight="bold";
	}
	Google(0,false);
	return false;
}
	
function showс(data,m){
	$("#"+data).slideToggle("fast");
	if($b(data).style.display!="none"){

	 document.onclick = function() {
	 $("#"+data+",#dats,#datc,#cits").hide();
	 $("#ejx,#eja,#ejz").show();
	 };
	 
	 }
	if(window.opb){
		$b(window.opb).style.display="none";
	}
		window.opb = data;	
}
function showp(text){
	$("#vis").fadeToggle('fast');
	if(text != ""){
		$b("inner-box").innerHTML = text;
	}
	
}
function flan(b,d){
	showx('lang','la3',b.innerHTML,'hl2',d);
	return false;
}
function fcou(b,d){
	if(d!="ru"){gl = "gl="+d+"&";showx('reg','world',b.innerHTML,'add2',1)}else{gl='gl=ru&';showx('reg','world',b.innerHTML,'add2','');}
	return false;
}
function fcit(b,d){

	if(d!=""){city = ' '+d;showx('city','cit',b.innerHTML,'add2',1);}else{city="";showx('city','cit',b.innerHTML,'add2','')}
	return false;
}
function ffil(b,d){
	if(d!=""){d = 'filetype:'+d}
	showx('file','ffa2',b.innerHTML,'add',d)
	return false;
}
function fadv(b,d){
	showx('adv','adv2',b.innerHTML,'adp',d)
	return false;
}

function fimg(b,d){
	showx('img_s','img3',b.innerHTML,'imgs',d)
	return false;
}
//function err_handler(msg) {return true;}
//window.onerror = err_handler;
function js(s,c){
var script = document.createElement("script");
    script.src = s;
	script.charset = c;
    document.body.appendChild(script);
} 
function bro(){

	var b_na = navigator.appName;

	var url = navigator.userAgent;
	var regV = /Chrome/gi;
	var result = url.match(regV);


	if (result) {
    b_na = "Chrome";
}


	var sett="<a href='#Опции поиска' onClick=\"shown('options')\" class='y' >Настройки</a>";
	if(b_na == "Microsoft Internet Explorer"){af(sett+" &#8226; <a href=\"javascript:window.external.AddSearchProvider('http://search.YM.kz/bravica.xml')\"  class='y' >Поиск для IE</a>",'bra');}
	else if(b_na == "Netscape"){af(sett+" &#8226; <a  href=\"javascript:window.external.AddSearchProvider('http://search.YM.kz/bravica.xml')\" class='y'>Добавить в Firefox</a>",'bra');}
	else if(b_na == "Chrome"){af(sett+" &#8226; <a  href=\"javascript:window.external.AddSearchProvider('http://search.YM.kz/bravica.xml')\" class='y'>Добавить в Chrome</a>",'bra');}
	else if(b_na == "Opera"){af(sett+"",'bra');}
}
function af(d,k){
$b(k).innerHTML = d;
}




	
	
	
	
	
	
function start(s,t,q){
$b('q').value = decodeURIComponent(q);
var i;

if(s=='google'){
if(t=='web' || t=="news" || t=="blogs"){i=0;}else if(t=="video" || t=="images"){i=1;}
mz='goz';}else if(s=='yandex'){mz='yaz';
i=1;



}else if(s=='bing'){mz='biz';i=2;}
else if(s=='ym'){mz='ym';i=0;}


$b('stq').value = mz;

		tabselect(t,t);
			$("#seq input:radio:checked").removeAttr("checked");
	$("#seq input:radio")[i].checked = true;
	

	
	
		Google(0,false);
}


