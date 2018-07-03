


var highlighted = -1;


function true2(q,data){

		var e = '';
s = 0;
$.each(data[1], function(key, it){   
    e += "<li title='" +it + "'><a href='' onClick=\"word('" + it + "');return false\">" + it + "</a></li>";
				s = 1
	});
	if (s == 1) {
			$b('debug').style.display = '';
			$b('debug').innerHTML = e
		} else {
			$b('debug').style.display = 'none';
			$b('debug').innerHTML = ''
		}
  }


function googleSuggest(q){

q=tl(rv(q));
 
 $.ajax({
  url: 'g.php?q='+q,
  cache: false,
dataType: "script"
});


}



function changeHighlight() {
	var a = document.getElementById("debug").getElementsByTagName('LI');
	if (highlighted > (a.length - 1)) {
		highlighted = 0
	}
	if (highlighted < 0) {
		highlighted = a.length - 1
	}
	for (i in a) {
		var b = a[i];
		if (highlighted == i) {
			document.getElementById("q").value = b.title;
			b.className = "ses"
		} else {
			b.className = ""
		}
	}
}
var loading = false;
var opt = new Array();
var opb = false;
get_opt('oscroll');
get_opt('odebug');
get_optv(opt['oscroll'], opt['odebug']);
window.onload = function () {
	bro();

	document.form.q.focus();
	$b('q').onkeyup = function () {
		if (this.value.length > 0 && this.value.match(/[a-zA-Z0-9]\s$/)) {
			googleSuggest(this.value)
		}
	};
	$b('q').onkeyup = function (a) {
		if (opt['odebug'] == 0) {
			var q = $b('q').value;
			if (q.length > 0) {
				if (a) {
					var b = a.keyCode
				}
				if (window.event) {
					var b = window.event.keyCode
				}
				switch (b) {
				case 27:
					$b('debug').style.display = 'none';
					break;
				case 38:
					highlighted--;
					changeHighlight();
					break;
				case 13:
					$b('debug').style.display = 'none';
					break;
				case 40:
					highlighted++;
					changeHighlight();
					break;
				default:
					highlighted = -1;
					googleSuggest(q)
				}
			} else {
				$b('debug').style.display = 'none';
				$b('debug').innerHTML = ''
			}
		}
	}
};
function rep() {
	var a = -1;
	var b = document.getElementById("debug").getElementsByTagName('LI');
	for (i in b) {
		var c = b[i];
		c.className = ""
	}
}


function sendz(){
if($b("site22").value!="" && $b("site22").value!="адрес сайта"){
$.ajax({
		url: "/files/send.php?q="+$b("site22").value+"&q2="+$b("vids").value,
			success: function(data){
				if(data.length>5){
					$b("send").innerHTML = data;
					$b("sendno").innerHTML = '';
					
				}else{
					$b("send").innerHTML = "Ошибка в запросе или сервис недоступен...";
				}
			}
		});
}else {
alert("Введите адрес сайта");
}

}	