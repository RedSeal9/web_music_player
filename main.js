var audio = document.getElementById('audio');
var songexists;
audio.volume = .25; // music is usually very loud upon start.  sets it to 25%

url = "audio/";

$.ajax({url: 'audio/', success: function(result){
stats = result;
for (i = 1, len = Object.keys(result).length+1, ihtml = ''; i < len; i++) { 
var ihtml;
ihtml=ihtml+'<span><button id="b'+i+'" song="'+result[i].tags.song+'" class="default" onclick="play('+i+');">Song: <pre>'+result[i].tags.song+'</pre> by: <pre>'+result[i].tags.artist+'</pre> on  <pre>'+result[i].tags.album+'</pre></button><br></span>';
}
document.getElementById('dyn').innerHTML = ihtml;
}, error: function(){console.error('something broke.\nbig time.');}});

function play(id){
var wrap = document.getElementById('awrap');
var song = document.getElementById('b'+id).getAttribute('song');
//url = "https://cin.redseal.red/music/";
var aurl = url+encodeURIComponent(stats[id]._fileName);
s2db(song, aurl, id);
localforage.getItem(song).then(function(result){if(result !== null){audio.src = result;}});
wrap.style = '';
}
// caching and whatnot

function s2db(song, url, id){
localforage.getItem(song).then(function(result){
if(result !== null){console.log('Playing '+song+' from Cache');return false;}else{
console.log('Downloading and Caching '+song);
var xhr = new XMLHttpRequest();

var pbar = document.createElement("progress");pbar.id = "d" + id;
var ptxt = document.createElement("div");ptxt.innerText = song;

xhr.responseType = 'blob';
xhr.onprogress = function (event){
pbar.max = event.total;
pbar.value = event.loaded;
}
xhr.onload = function() {
pbar.remove();
ptxt.remove();
console.log("Cloudflare Cache Status for "+song+": " + xhr.getResponseHeader("cf-cache-status"));
var reader  = new FileReader();
reader.onloadend = function () {
result = reader.result;
if(result.includes('audio') == true){
localforage.setItem(song,result).then(function(){play(id);})};
}
reader.readAsDataURL(xhr.response);};
xhr.open('GET', url);
xhr.send();
document.getElementById('pwrap').appendChild(pbar)
pwrap.insertBefore(ptxt,pbar)
}})}

// searching
function contains(text_one, text_two){return text_one.toLowerCase().indexOf(text_two.toLowerCase()) != -1;}
$("#sbox").keyup(function(){
    var searchText = $(this).val();
    $("div span").each(function() {
        $(this).toggle(contains($(this).text(), searchText));
    });
});