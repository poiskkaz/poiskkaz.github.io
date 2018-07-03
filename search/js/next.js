


function ajaxTranslate(textToTranslate, fromLanguage, toLanguage,id) {
			  
			var p = {};
			p.appid = '5C08C95FC0715E88226405E208BF29D4AAE15FCD';
			p.to = toLanguage;
			p.from = fromLanguage;
			p.text = textToTranslate;
			$.ajax({
				url: 'http://api.microsofttranslator.com/V2/Ajax.svc/Translate',
				data: p,
				dataType: 'jsonp',
				jsonp: 'oncomplete',
				complete: function(request, status) {
					//alert('complete: '+status);
				},
				success: function(data, status) {

					 var transla=$b("a"+id);var translc=$b("c"+id);
					 
					 
					 var r=data.split("5943");
transla.innerHTML=r[0];
translc.innerHTML="<span style='font-size:11px;color:#868686'>[ перевод ]</span> "+r[1];					
				},
				error: function(request, status, error) {
				//	alert('error: status-'+status+',desc-'+error);
				}
			});
			
		} 
		


		
function transl(id,lang,url){$b("ti"+id).innerHTML=" - <a href='http://www.microsofttranslator.com/bv.aspx?from=&to=ru&a="+url+"' target='_blank' style='color:#2D72A7'>Перевод ВСЕЙ страницы</a>";
var a=$b("a"+id).innerHTML;var c=$b("c"+id).innerHTML;$b("a"+id).innerHTML+="<img src='images/load.gif' width=16 height=16 style='margin-left:5px;margin-bottom:-3px'>";text=a+" 5943 "+c;



ajaxTranslate(text,lang,"ru",id);

}


function detect(id){


var a=$b("a"+id).innerHTML;var c=$b("c"+id).innerHTML;var url=$b("ti"+id).innerHTML;text=a+" "+c;

    var p = {};
p.appid = '5C08C95FC0715E88226405E208BF29D4AAE15FCD';
p.text = text;
$.ajax({
    url: 'http://api.microsofttranslator.com/V2/Ajax.svc/Detect',
    data: p,
    dataType: 'jsonp',
    jsonp: 'oncomplete',
    jsonpCallback: 'ajaxTranslateCallback',
    success: function(data, status) {
	
		if(data!="ru"){$b("ti"+id).innerHTML=" - <a href=\"#"+url+"\" onClick=\"transl('"+id+"','"+data+"','"+url+"');return false;\" style='color:#2D72A7'>Перевести на русский</a>";$("#ti"+id).show();}

    }
});
}


function scrollToElement(id)
{var ele;if(!$b)
return;ele=$b(id);if(!ele)return;if(window.scrollY)
scrSt=window.scrollY;else if(document.body.parentElement.scrollTop)
scrSt=document.body.parentElement.scrollTop;else
scrSt=document.body.scrollTop;scrDist=ele.offsetTop-scrSt;scrDur=900;scrTime=0;scrInt=20;if(typeof(scrollInt)!="undefined")clearInterval(scrollInt);scrollInt=setInterval(scrollPage,scrInt);}
function scrollPage()
{scrTime+=scrInt;if(scrTime<scrDur){window.scrollTo(0,easeInOut(scrTime,scrSt,scrDist,scrDur));}else{window.scrollTo(0,scrSt+scrDist);clearInterval(scrollInt);}}
var sc=new Array();function info(id,visibleUrl,url,cacheUrl,q){if(sc[id]!=url){$b("s"+id).innerHTML="<table style='padding:5px'><tr><!-- <td width='220' style='background:url(images/sc.gif) no-repeat;'><a href='http://"+visibleUrl+"'><img src=\"http://www.webmorda.kz/site2img/index.php?u="+encodeURIComponent("http://"+visibleUrl)+"&s=s\" width=202 height=139  id=\"i"+id+"\"  style='cursor:hand;border: 1px solid #EAEAEA;padding:1px;z-index:80'></a></td> --><td> <div id='iv6'><a href='http://"+visibleUrl+"'>На главную</a> <span id=\"ti"+id+"\" style='display:none'>"+url+"</span><br /><br /><a href=\"/search:web:"+encodeURIComponent(q)+" site:"+visibleUrl+"\" onClick=\"qsd('"+visibleUrl+"');return false;\" >Еще с сайта</a><br /><a href='http://web.archive.org/web/*/"+visibleUrl+"' target='_blank'>История домена</a><br /><br /><a href='http://www.bravica.net/ru/getseo-allseo:"+visibleUrl+".html' target='_blank'>Анализ сайта</a> - <a href='http://www.bravica.net/ru/getnet-whois:"+visibleUrl+".html' target='_blank'>Whois</a> - <a href='http://www.bravica.net/ru/getnet-geo:"+visibleUrl+".html' target='_blank'>Расположение сайта</a></div></td></tr></table>";sc[id]=url;detect(id);}
show('s'+id);}
function easeInOut(t,b,c,d)
{return c/2*(1-Math.cos(Math.PI*t/d))+b;}
function filet(str){var d="";var ft=new Array("pdf","txt","ppt","doc","xls","swf","rss");for(var i=0;i<ft.length;i++){var result=str.replace('.'+ft[i],"");if(result!=str){var d=' <img src="images/'+ft[i]+'.png" width=16 height=16 style="margin-bottom:-4px"> ';}}
return(d);}
function cs(q,t,x){

if(x=='ym'){mz='ym';i=0;}
else if(x=='goz'){mz='goz';if(t=='web'){i=1;}else{i=0;}}else if(x=='yaz'){
if(t=='web'){i=2;}else{i=1;}



}else if(x=='biz'){if(t=='web'){i=3;}else{i=2;}if(t=='video' || t=='images'){i=1}}


$b('q').value=q;tabselect(t,t);$b('stq').value = x;

$("#seq input:radio:checked").removeAttr("checked");
	$("#seq input:radio")[i].checked = true;
	
	
Google(0,false);cookie_r();}
document.onkeydown=function(e)
{if(!e)
{e=window.event;}
if(e.ctrlKey)
{var code=e.keyCode?e.keyCode:(e.which?e.which:0);var arrow=(code==39?$b('next'):0);if(arrow)
{Google(parseInt(arrow.title),true);}}}
function ins(b){$b("google").innerHTML="<br /><img src='images/all.gif' style='margin-bottom:-3px;'> Загружаю страницу...";$b("value").innerHTML='';$b("rez").innerHTML='';$b("nextr").innerHTML="";$.get(b,function(data){$b("google").innerHTML=data;});}