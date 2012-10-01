
/* from http://james.padolsey.com/javascript/wordwrap-for-javascript/ */
function wordwrap(str, width, brk, cut) {
    brk = brk || '\n';
    width = width || 75;
    cut = cut || false;
    if (!str) { return str; }
    var regex = '.{1,' +width+ '}(\\s|$)' + (cut ? '|.{' +width+ '}|.+$' : '|\\S+?(\\s|$)');
    return str.match( RegExp(regex, 'g') ).join( brk );
}

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

/* cookie functions from quirksmode.org, with tiny modifications */
function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = dud_cookie_prefix + name+"="+value+expires+"; path=/";
}

function readCookie(name) {
  var nameEQ = dud_cookie_prefix + name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function eraseCookie(name) {
  createCookie(dud_cookie_prefix + name,"",-1);
}

function setStorageData(name,value) {
    if (typeof(localStorage) == 'undefined') return;
    localStorage.setItem(dud_cookie_prefix + name, value);
}

function getStorageData(name) {
    if (typeof(localStorage) == 'undefined') return null;
    return localStorage.getItem(dud_cookie_prefix + name);
}

function eraseStorageData(name) {
    if (typeof(localStorage) == 'undefined') return;
    localStorage.removeItem(dud_cookie_prefix + name);
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


function button(text, onclick, usespan, hreffi, disable, id)
{
    if (!hreffi) hreffi = '#';
    if (usespan == undefined) {
	usespan = 'a';
    } else {
	usespan = 'span';
    }
    var txt = "<"+usespan+" class='button"+((disable && (disable==1))?"_disabled":"")+"'";
    if (usespan == 'a') " href='"+hreffi+"'";
    if (onclick && !disable) txt += " onclick='" + onclick + "'";
    if (id) txt += " id='"+id+"'";
    txt += ">"+text+"</"+usespan+">";
    return txt;
}

function button_disabled(text, onclick, usespan, hreffi)
{
    return button(text, onclick, usespan, hreffi, 1);
}

function togglebutton(text, onclick, usespan, hreffi, disable, id)
{
    if (!hreffi) hreffi = '#';
    if (usespan == undefined) {
	usespan = 'a';
    } else {
	usespan = 'span';
    }
    var txt = "<"+usespan+" class='togglebutton"+((disable && (disable==1))?"_on":"_off")+"'";
    if (usespan == 'a') " href='"+hreffi+"'";
    if (onclick) txt += " onclick='" + onclick + "'";
    if (id) txt += " id='"+id+"'";
    txt += ">"+text+"</"+usespan+">";
    return txt;
}

function pen_getcolor(color)
{
    var fg = color;
    if (Object.prototype.toString.call(color) === '[object Array]') {
	fg = color[Math.floor(Math.random() * color.length)];
    }
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
    if (dat.ita == 1) { sclass += " f_ita"; }
    if (dat.ul == 1) { sclass += " f_ul"; }
    if (dat.cur) { sclass += " f_cur"; }
    return sclass.trim();
}

function get_data_span(dat)
{
    span = datspanclass(dat);
    if (!dat.chr) { c = " "; } else { c = dat.chr; }
    if (span) {
	return "<span class='" + span + "'>" + c + "</span>";
    } else {
	return c;
    }
}
