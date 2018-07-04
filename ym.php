<?php
import_request_variables("gP", "");
if(!isset($start)){
$start=0;
}else{
$start=$start/15;
}
// Подключаем БД
require_once("db.php");
function highlight_words($node)
{
$stripped = preg_replace('/<\/?(title|passage)[^>]*>/', '', $node->asXML());
return str_replace('</hlword>', '</b>', preg_replace('/<hlword[^>]*>/', '<b>', $stripped));
}
// Функция многопоточного получения данных
function multi_read($connomains, $max_threads, $option){
$mh = curl_multi_init();
foreach ($connomains as $i => $url) {
$conn[$i] = curl_init($url);
curl_setopt($conn[$i], CURLOPT_RETURNTRANSFER, 1);
if($option[$i]!=""){
curl_setopt($conn[$i], CURLOPT_POSTFIELDS,$option[$i]);
}
curl_multi_add_handle ($mh,$conn[$i]);
}
do {
$mrc = curl_multi_exec($mh, $active);
} while ($mrc == CURLM_CALL_MULTI_PERFORM);
while ($active and $mrc == CURLM_OK) {
if (curl_multi_select($mh) != -1) {
do {
$mrc = curl_multi_exec($mh, $active);
} while ($mrc == CURLM_CALL_MULTI_PERFORM);
}
}
if ($mrc != CURLM_OK) {
print "Curl multi read error $mrc\n";
}
foreach ($connomains as $i => $url) {
if (($err = curl_error($conn[$i])) == '') {
$res[$i]=curl_multi_getcontent($conn[$i]);
} else {
print "Curl error on handle $i: $err\n";
}
curl_multi_remove_handle($mh,$conn[$i]);
curl_close($conn[$i]);
}
curl_multi_close($mh);
return($res);
}
function get_res($query,$start,$context){
$options_array = array( <<<DOC
<?xml version='1.0' encoding='utf-8'?>
<request>
<query>$query domain:kz</query>
<groupings>
<groupby attr="" mode="flat" groups-on-page="10" docs-in-group="1" />
</groupings>
<page>$start</page>
</request>
DOC
,"",""
);
$search_array = array(
"http://xmlsearch.yandex.ru/xmlsearch?user=dekodalabs&key=03.21655416:9794869862fc97e50b2a5bb34d610998&lr=159",
"http://api.bing.net/xml.aspx?Appid=5C08C95FC0715E88226405E208BF29D4AAE15FCD&sources=web&query=".urlencode($query." site:kz")."&web.count=10&Version=2.0&web.offset=".($start*10)."",
"http://ajax.googleapis.com/ajax/services/search/web?v=1.0&filter=1&key=ABQIAAAA9cuS2ToykTODWTgzr5qAuRQxMDBcEALRwwtQ3-ky4PqXSeOE-RSNJ5UfBIDDwMbwsqYZGrr2BtwDtA&q=".urlencode($query." site:kz")."&rsz=large&start=".($start*8)
);
$data = multi_read($search_array, count($search_array), $options_array);
$domains=array();
$result=array();
$pos=array();
// Паринг Yandex XML
$xmldoc = new SimpleXMLElement($data[0]);
$error = $xmldoc->response->error;
$found_yandex = $xmldoc->response->found;
$found = $xmldoc->xpath("response/results/grouping/group/doc");
$i=1;
foreach ($found as $item) {
$text="";
if ($item->passages) {
foreach ($item->passages->passage as $passage) {
if(mb_strlen($text,'UTF-8')<255){
$text.="" . highlight_words($passage) . "..."; }
}
}else{
$text=$item->title;
}
$text=mb_substr($text, 0, 250,'UTF-8');
$dom=$item->domain;
$yandex_d="".str_Replace("www.","",$dom[0][0]);
$result[$yandex_d]=array($item->url, highlight_words($item->title), $text);
$pos[$yandex_d]=array($i,0,0);
array_push($domains,$yandex_d);
$i++;
}
//print_r($result);
//print_R($pos);
// Парсинг Google
$json = json_decode($data[2]);
$found_google=$json->responseData->cursor->resultCount;
$i=1;
foreach($json->responseData->results as $item) {
$google_d=str_Replace("www.","",$item->visibleUrl);
if(in_array($google_d, $domains)){
$temp2=$pos[$google_d];
$pos[$google_d]=array($temp2[0],$i,0);
}else{
$result[$google_d]=array($item->url, $item->title,$item->content);
$pos[$google_d]=array(0,$i,0);
array_push($domains,$google_d);
}
$i++;
}
//print_r($google);
//print_r($google_d);
//Парсинг выдачи Bing
$sxe = new SimpleXMLElement($data[1]);
$resultsearch = $sxe->children('web', TRUE);
$i=1;
$found_bing=$resultsearch->Web->Total;
if ($found_bing > 0) {
foreach($resultsearch->Web->Results->WebResult as $item) {
$bing_d=str_Replace("www.","",parse_url($item->Url, PHP_URL_HOST));
$bing[$i]=array();
array_push($domains,$bing_d[$i]);
if(in_array($bing_d, $domains)){
$temp2=$pos[$bing_d];
$pos[$bing_d]=array($temp2[0],$temp2[0],$i);
}else{
$result[$bing_d]=array($item->Url, $item->Title, $item->Description);
$pos[$bing_d]=array(0,0,$i);
array_push($domains,$bing_d);
}
$i++;
}
}
//print_r($bing);
//print_r($bing_d);
//print_r($result);
//$domains=array_unique($domains);
//echo "<br>".$domains[0]."";
$suma1=array();$suma2=array();$suma3=array();
$gr1=array();$gr2=array();$gr3=array();
foreach ($pos as $k => $v){
$u=0;
if($v[0]!=0){$u++;}
if($v[1]!=0){$u++;}
if($v[2]!=0){$u++;}
$o=$v[0]+$v[1]+$v[2];
if($u==3){
$gr1[$k]=$result[$k];
$suma1[$k]=$o;
}elseif($u==2){
$gr2[$k]=$result[$k];
$suma2[$k]=$o;
}else{
$gr3[$k]=$result[$k];
$suma3[$k]=$o;
}
}
// СОРТИРОВКА результатов согласно сумме вхождения в поисковые системы в каждой группе
array_multisort($suma1, $gr1);
array_multisort($suma2, $gr2);
array_multisort($suma3, $gr3);
echo "Callback('$context',{\"results\":[";
$i=1;
$results="";
foreach ($gr1 as $k => $v){
$l=$pos[$k];
$results.=$v[0]."^|".$v[1]."^|".$v[2]."^|".$k."^|".$l[0]."^|".$l[1]."^|".$l[2]."^|".($l[0]+$l[1]+$l[2])."*|*";
$i++;
echo '{"Y":"'.$l[0].'","G":"'.$l[1].'","B":"'.$l[2].'","unescapedUrl":"'.$v[0].'","url":"'.mb_htmlentities($v[0]).'","visibleUrl":"'.$k.'","cacheUrl":"","title":"'.mb_htmlentities($v[1]).'","titleNoFormatting":"","content":"'.mb_htmlentities($v[2]).'"},';
}
foreach ($gr2 as $k => $v){
if($i<16){
$l=$pos[$k];
$results.=$v[0]."^|".$v[1]."^|".$v[2]."^|".$k."^|".$l[0]."^|".$l[1]."^|".$l[2]."^|".($l[0]+$l[1]+$l[2])."*|*";
$i++;
echo '{"Y":"'.$l[0].'","G":"'.$l[1].'","B":"'.$l[2].'","unescapedUrl":"'.$v[0].'","url":"'.mb_htmlentities($v[0]).'","visibleUrl":"'.$k.'","cacheUrl":"","title":"'.mb_htmlentities($v[1]).'","titleNoFormatting":"","content":"'.mb_htmlentities($v[2]).'"}';
if($i<16){echo ",";}
}
}
foreach ($gr3 as $k => $v){
if($i<16){
$l=$pos[$k];
$results.=$v[0]."^|".$v[1]."^|".$v[2]."^|".$k."^|".$l[0]."^|".$l[1]."^|".$l[2]."^|".($l[0]+$l[1]+$l[2])."*|*";
$i++;
echo '{"Y":"'.$l[0].'","G":"'.$l[1].'","B":"'.$l[2].'","unescapedUrl":"'.$v[0].'","url":"'.mb_htmlentities($v[0]).'","visibleUrl":"'.$k.'","cacheUrl":"","title":"'.mb_htmlentities($v[1]).'","titleNoFormatting":"","content":"'.mb_htmlentities($v[2]).'"}';
if($i<16){echo ",";}
}
}
$found_google=str_Replace(",","",$found_google);
$total=(ceil(($found_yandex+$found_google+$found_bing)/3));
echo "],\"cursor\":{\"estimatedResultCount\":\"".$total."\",\"Y\":\"$found_yandex\",\"G\":\"$found_google\",\"B\":\"$found_bing\",\"currentPageIndex\":0,\"moreResultsUrl\":\"\"}}, 200, null, 200)";
//print_r($gr1);
//print_r($gr2);
//print_r($gr3);
return array($results,$total,$found_yandex,$found_google,$found_bing);
}
function mb_htmlentities($str, $encoding = 'utf-8') {
$str=str_replace('<',"\u003c",$str);
$str=str_replace('>',"\u003e",$str);
$str=str_replace('"',"&quot;",$str);
$str=str_replace('\'',"&#39;",$str);
return $str;
}
$query=$q;
// Делаем запрос в бд, Проверяем сущестование
$test = mysql_query("SELECT id,query,date,pages,total,yandex,google,bing FROM queries WHERE query = '$query'") or die(mysql_error());
$test_res = mysql_fetch_row($test);
if($test_res[0]!=""){
//echo "Уже есть!";
if(((strtotime(date('Y-m-d')) - strtotime($test_res[2]))/3600/24)>3 ){ // проверяем что результат не старше 3 дней
$get_result=get_res($query,$start,$context);
mysql_query("UPDATE queries SET date='".date('Y-m-d')."', pages=0 WHERE id=".$test_res[0].""); // Обновляем дату
mysql_query("DELETE FROM result WHERE id=".$test_res[0]."");
mysql_query("INSERT INTO result VALUES (".$test_res[0].", '0','".mysql_escape_string($get_result[0])."')") or die(mysql_error());
//echo "Обновлено.";
}else{
if($start!=0 && $test_res[3]<$start){
$get_result=get_res($query,$start,$context);
mysql_query("UPDATE queries SET pages='".$start."' WHERE id=".$test_res[0].""); // Обновляем дату
mysql_query("INSERT INTO result VALUES (".$test_res[0].", '".$start."','".mysql_escape_string($get_result[0])."')") or die(mysql_error());
//echo "Увеличиваем страницу";
}else{
$pager = mysql_query("SELECT page,data FROM result WHERE id = '".$test_res[0]."' AND page='".$start."'") or die(mysql_error());
$page_res = mysql_fetch_row($pager);
//echo $page_res[1]."<br>";
$datatop=explode("*|*",$page_res[1]);
echo "Callback('$context',{\"results\":[";
$i=1;
foreach($datatop as $it) {
$item=explode("^|",$it);
if($item[0]!=""){
echo '{"Y":"'.$item[4].'","G":"'.$item[5].'","B":"'.$item[6].'","unescapedUrl":"'.$item[0].'","url":"'.mb_htmlentities($item[0]).'","visibleUrl":"'.$item[3].'","cacheUrl":"","titl
e":"'.mb_htmlentities($item[1]).'","titleNoFormatting":"","content":"'.mb_htmlentities($item[2]).'"}';
$i++; if($i!=count($datatop)){echo ",";}
}
}
echo "],\"cursor\":{\"estimatedResultCount\":\"".$test_res[4]."\",\"Y\":\"".$test_res[5]."\",\"G\":\"".$test_res[6]."\",\"B\":\"".$test_res[7]."\",\"currentPageIndex\":0,\"moreResultsUrl\":\"\"}}, 200, null, 200)";
// echo "Выводим страницу.";
}
}
}else{
$get_result=get_res($query,$start,$context);
mysql_query("INSERT INTO queries VALUES (NULL, '".mysql_escape_string($query)."','".date('Y-m-d')."', '0','".$get_result[1]."','".$get_result[2]."','".$get_result[3]."','".$get_result[4]."')") or die(mysql_error());
$id=mysql_insert_id();
mysql_query("INSERT INTO result VALUES (".$id.", '0','".mysql_escape_string($get_result[0])."')") or die(mysql_error());
//echo "Добавлен новый.";
}
?>