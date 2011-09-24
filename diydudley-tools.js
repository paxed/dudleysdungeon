
String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g,'');
}

function htmlentities( s ){
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // *     example 1: htmlentities('Kevin & van Zonneveld');
  // *     returns 1: 'Kevin &amp; van Zonneveld'

  var div = document.createElement('div');
  var text = document.createTextNode(s);
  div.appendChild(text);
  return div.innerHTML;
}

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

/* cookie functions from quirksmode.org */
function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function eraseCookie(name) {
  createCookie(name,"",-1);
}


function insertAtCursor(elem, addval)
{
    tmp = document.getElementById(elem);
    if (tmp == undefined) return;
    //IE support
    if (document.selection) {
	tmp.focus();
	sel = document.selection.createRange();
	sel.text = addval;
    }
    //MOZILLA/NETSCAPE support
    else if (tmp.selectionStart || tmp.selectionStart == '0') {
	var startPos = tmp.selectionStart;
	var endPos = tmp.selectionEnd;
	tmp.value = tmp.value.substring(0, startPos) + addval + tmp.value.substring(endPos, tmp.value.length);
    } else {
	tmp.value += addval;
    }
}

function pen_getcolor(color)
{
    var fg = color;
    if (fg == "random")
	fg = colors[Math.floor(Math.random() * (colors.length-1))+1];
    return fg;
}

function datspanclass(dat, forcebg)
{
    var sclass = '';
    if (dat.rev == 1) {
	if (dat.fg == undefined) { sclass += " f_black b_gray"; } else { sclass += " f_black b_"+dat.fg; }
    } else {
	if (dat.fg == undefined) { sclass += " f_gray";	} else { sclass += " f_"+dat.fg; }
	if (forcebg == 1) sclass += ' b_black';
    }
    if (dat.bold == 1) { sclass += " f_bold"; }
    if (dat.ul == 1) { sclass += " f_ul"; }
    if (dat.cur) { sclass += " f_cur"; }
    return sclass.trim();
}

function get_data_span(dat)
{
    span = datspanclass(dat);
    if (!dat.chr) { c = " "; } else { c = htmlentities(dat.chr); }
    if (span) {
	return "<span class='" + span + "'>" + c + "</span>";
    } else {
	return c;
    }
}
