function $b(id) {
 return document.getElementById(id);
}

function getCookie(name) {
        var prefix = name + "="
        var cookieStartIndex = document.cookie.indexOf(prefix)
        if (cookieStartIndex == -1)
                return null
        var cookieEndIndex = document.cookie.indexOf(";",
                        cookieStartIndex + prefix.length)
        if (cookieEndIndex == -1)
                cookieEndIndex = document.cookie.length
        return decodeURIComponent(document.cookie.substring(
              cookieStartIndex + prefix.length, cookieEndIndex))
}
//
function tl(s) { var b = s.replace(/^\s+/, ""); return b.replace(/\s+$/, "");}
function rs(s) { return s.replace(/\s+/g, ""); }
function rv(s) { return s.replace(/\s+\s+/g, " "); }


function get_opt(t){

	co = getCookie(t);
	if(!co || co=="0"){
		window.opt[t] = 0;
	}else{
		window.opt[t] = 1;
	}
}
function get_optv(t,n){
	if(t==0){
		$b('oscroll').checked = true
	}
	if(n==0){$b('odebug').checked=true;}
}
function set_opt(t){
	var f = "; expires=Wed, 01-Jan-2020 00:00:00 GMT";
	if(document.getElementById(t).checked == false){
		document.cookie=t+"=1"+f;
		window.opt[t] = 1;
		
	}else{
		document.cookie=t+"=0"+f;
		window.opt[t] = 0;
	}

}

function ts2(tab) {
$b('type').value=tab;
im('google');
var gz='<input type="radio" name="st" value="google" checked id="igoz" onChange="im(this.value)" onClick="im(this.value)"> <span id="pp">Google</span>';
var gz2='<input type="radio" name="st" value="google" id="igoz" onChange="im(this.value)" onClick="im(this.value)"> <span id="pp">Google</span>';
var yz='<input type="radio" name="st" value="yandex" id="iyaz" onChange="im(this.value)" onClick="im(this.value)"> <span id="pp">Яндекс</span>';
var bz='<input type="radio" name="st" value="bing" id="ibiz" onChange="im(this.value)" onClick="im(this.value)"> <span id="pp">Bing</span>';
var ym='<input type="radio" name="st"  checked value="ym" id="iym"> <span id="pp">Умный</span>';

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


tabm = $b(tab);
	var tabs = $b("tab2"); 
var alltabs = tabs.getElementsByTagName("li"); 
	for (var i = 0; i < alltabs.length; i++) { 
		alltabs[i].className = '';
	}
	tabm.className = 'active';


//$b('stq').value=tab;
//$b('type').value = t;
//Google(0,false);
}


function bro(){
	var b_na = navigator.appName;
	var sett="<a href=\"http://search.YM.kz/\" rel=sidebar class='y' title=\"YM.kz\" onclick=\"window.external.AddFavorite('http://search.YM.kz/','YM.kz'); return false;\">В избранное</a>";
	if(b_na == "Microsoft Internet Explorer"){af(sett+" &nbsp; &nbsp; &nbsp; <a href=\"javascript:window.external.AddSearchProvider('http://search.YM.kz/bravica.xml')\"  class='y' >Поиск для IE</a>",'bra');}
	else if(b_na == "Netscape"){af(sett+" &nbsp; &nbsp; &nbsp; <a  href=\"javascript:window.external.AddSearchProvider('http://search.YM.kz/bravica.xml')\" class='y'>Добавить в Firefox</a>",'bra');}
	else if(b_na == "Opera"){af(sett+" ",'bra');}
}
function af(d,k){
$b(k).innerHTML = d;
}

function word(w){
	$b("q").value = w;
	$b('debug').style.display = 'none';
	search();
}
function search(){
	var type = $b('type').value;
	var q = $b('q').value;
	var st = $("#seq input:radio:checked").val();
	

	location.replace("/search.html#search:"+st+":"+type+":"+q);
	
}

function im(t){
$("#logoz").attr("src", "images/"+t+"s.png");
}
jQuery.preloadImages = function () {
    var images = (typeof arguments[0] == 'object') ? arguments[0] : arguments;
    for (var i = 0; i < images.length; i++) {
        jQuery("<img>").attr("src", images[i]);
    }
}
$(document).ready(function () {
    $.preloadImages("images/bings.png", "images/yandexs.png");
});