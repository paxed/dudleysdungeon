
function pen_clone(pen)
{
    return {'chr':pen.chr, 'fg':pen.fg, 'bold':pen.bold, 'rev':pen.rev, 'ul':pen.ul};
}

function pen_clone_nornd(pen)
{
    return {'chr':pen.chr, 'fg':pen_getcolor(pen.fg), 'bold':pen.bold, 'rev':pen.rev, 'ul':pen.ul};
}

function pen_equal(pen1, pen2)
{
    return ((pen1.chr == pen2.chr) && (pen1.fg == pen2.fg) && (pen1.bold == pen2.bold) && (pen1.rev == pen2.rev) && (pen1.ul == pen2.ul));
}

function pen_htmlchr(pen)
{
    var chr = pen.chr;
    if (!chr) chr = '.';
    else if (chr == '<') chr = '&lt;';
    else if (chr == '>') chr = '&gt;';
    else if (chr == '&') chr = '&amp;';
    else if (chr == '~') chr = '&tilde;';
    else if (chr < ' ' || chr > '~') return chr;
    return chr;
}

function pen_insert()
{
    var fg = pen_getcolor(pen.fg);
    if ((fg == undefined || fg == "white" || fg == "black" || pen.chr == ' ') && (pen.rev != 1)) {
	str = pen.chr;
    } else {
	str = '<span class="'+datspanclass(pen)+'">'+pen.chr+'</span>';
    }
    insertAtCursor('editpanel_text', str);
    set_panel_text();
}

function pen_has_changed()
{
    show_current_pen();
    color_selection();
    char_selection();
    update_pen_selection_popup();
    update_extended_char_popup();
}

function pen_swap_ctrl()
{
    var tmp = pen;
    pen = ctrl_pen;
    ctrl_pen = tmp;
    pen_has_changed();
}

function getkeyb_handler_string()
{
  return " onfocus='document.onkeyup=null' onblur='document.onkeyup=handle_keyb' ";
}

function bindable_key_get()
{
    if (keybinding_keys.length > 0) {
	var chr = keybinding_keys.substr(0,1);
	keybinding_keys = keybinding_keys.substr(1);
	return chr;
    } else return undefined;
}

function bindable_key_remove(key)
{
    var idx = keybinding_keys.indexOf(key);
    if (idx >= 0) {
	keybinding_keys = keybinding_keys.substr(0, idx) + keybinding_keys.substr(idx+1);
    }
}

function bindable_key_release(key)
{
    var x = key.charCodeAt(0);
    var i;
    for (i = 0; i < keybinding_keys.length; i++) {
	var ch = keybinding_keys.substr(i,0);
	if (ch.charCodeAt(0) < x) {
	    keybinding_keys = keybinding_keys.substr(0, i) + key + keybinding_keys.substr(i);
	}
    }
}

function bindable_key_isfree(key)
{
    var idx = keybinding_keys.indexOf(key);
    if (idx >= 0) return true;
    return false;
}

function panel_write_character(ch, fg)
{
  sym = {'chr':ch};
  if (fg != undefined) sym.fg = fg;

  editpaneldata.set_data(cursor_x, cursor_y, sym);
  cursor_x++;
  if (cursor_x >= editpaneldata.WID) {
    cursor_x = 0;
    cursor_y++;
    if (cursor_y >= editpaneldata.HEI) {
      cursor_y = 0;
    }
  }
}

function panel_write_string(str,fg)
{
  for (i = 0; i < str.length; i++) panel_write_character(str.substr(i,1), fg);
}


function panel_draw_gravestone()
{
  var grass = "/\\()|";
  var stone = ["   ------------   ",
	       "  /  REST IN   \\  ",
	       " /    PEACE     \\ ",
	       "/                \\",
	       "|     Dudley     |",
	       "|   killed  by   |",
	       "|                |",
	       "|                |"];

  var oldx = cursor_x;
  var oldy = cursor_y;
  var txt = "";

  editpaneldata.save_undopoint();

  editpaneldata.fill({'chr':' ', 'fg':"gray"});

  cursor_x = 0;
  cursor_y = 0;
  for (z = 0; z < stone.length; z++) {
    var s = stone[stone.length - z - 1];
    if (s.length < editpaneldata.WID)
      cursor_x = Math.floor((editpaneldata.WID/2 - s.length/2));
    else
      cursor_x = 0;
    cursor_y = (editpaneldata.HEI - z) - 2;
    if (s != undefined)
      panel_write_string(s);
  }

  var tmp = "";
  for (i = 0; i < editpaneldata.WID; i++)
    tmp += grass.substr(Math.floor(Math.random() * grass.length), 1);
  cursor_x = 0;
  cursor_y = editpaneldata.HEI - 1;
  panel_write_string(tmp, "green");

  cursor_x = oldx;
  cursor_y = oldy;
  editpaneldata.check_undopoint();
}


function random_trap_sym()
{
  var fg = colors[Math.floor(Math.random() * (colors.length-1)) + 1];
  return {'chr':'^', 'fg':fg};
}

function random_obj_sym()
{
  var fg = colors[Math.floor(Math.random() * (colors.length-1)) + 1];
  var chr = nh_object_chars.substr(Math.floor(Math.random() * nh_object_chars.length), 1);
  if (chr == '?') fg = "white";
  if (chr == '$') fg = "yellow";
  if (chr == '"') fg = "cyan";
  if ((chr == ')') && (Math.random() < .9)) fg = (Math.random() < 0.5) ? "cyan" : "brown";
  if ((chr == '[') && (Math.random() < .9)) fg = (Math.random() < 0.5) ? "cyan" : "brown";
  return {'chr':chr, 'fg':fg};
}

function random_terrain_sym()
{
  var tmp = Math.floor(Math.random() * 4);
  var sym;
  switch (tmp) {
  default:
  case 0: sym = {'chr':"}",'fg':'blue'}; break;  /* water */
  case 1: sym = {'chr':"}",'fg':'red'}; break;  /* lava */
  case 2: sym = {'chr':"#",'fg':'green'}; break;  /* tree */
  }
  return sym;
}


function random_nethack_monster_sym()
{
  do {
    i = Math.floor(Math.random() * game_symbols_orig.length);
    var s = game_symbols_orig[i];
  } while (s.sort != 1);

  var tmp = document.getElementById("nethacksymselboxid");
  if (tmp) {
    tmp.selectedIndex = game_symbols_orig[i].nhsymselectbox_idx;
  }

  return {'chr':s.chr, 'fg':s.fg};
}

function random_monster_sym()
{
  var fg = colors[Math.floor(Math.random() * (colors.length-1)) + 1];
  var chr = nh_monster_chars.substr(Math.floor(Math.random() * nh_monster_chars.length), 1);
  return {'chr':chr, 'fg':fg};
}

var nethack_shop_types = new Array('?', '+', '=', '%', '(', '!', '/', '[', ')', 'general');

function get_random_shop_sym(shoptype)
{
    var rnd = Math.random();
    switch (shoptype) {
    case '?': if (rnd < 0.1) return {'chr':'+', 'fg':pen_getcolor('random')};
	return {'chr':'?', 'fg':'white'};
    case '+': if (rnd < 0.9) return {'chr':'+', 'fg':pen_getcolor('random')};
	return {'chr':'?', 'fg':'white'};
    case '=': if (rnd < 0.85) return {'chr':'=', 'fg':pen_getcolor('random')};
	if (rnd < 0.95) return {'chr':'*', 'fg':pen_getcolor('random')};
	return {'chr':'"', 'fg':'cyan'};
    case '%':
	var foodcolors = new Array('brown','brown','brown','brown','cyan','brightgreen','orange','red','white','yellow','yellow','green','green');
	if (rnd < 0.83) return {'chr':'%', 'fg':foodcolors[Math.floor(Math.random() * foodcolors.length)]};
	if (rnd < 0.88) return {'chr':'!', 'fg':'red'};
	if (rnd < 0.93) return {'chr':'!', 'fg':'cyan'};
	if (rnd < 0.97) return {'chr':'!', 'fg':'pink'};
	return {'chr':'(', 'fg':'white'};
    case '(':
	var toolcolors = new Array('darkgray', 'red', 'red', 'white', 'white', 'white', 'white', 'white', 'white', 'white',
				   'cyan', 'cyan', 'cyan', 'cyan', 'cyan', 'cyan', 'cyan', 'cyan', 'cyan', 'cyan',
				   'brightcyan', 'brightcyan', 'brown', 'brown', 'brown', 'brown', 'brown', 'brown', 'brown', 'brown',
				   'yellow', 'yellow', 'yellow', 'yellow', 'gray', 'gray', 'gray');

	return {'chr':'(', 'fg':toolcolors[Math.floor(Math.random() * toolcolors.length)]};
    case '!':
	return {'chr':'!', 'fg':pen_getcolor('random')};
    case '/': if (rnd < 0.9) return {'chr':'/', 'fg':pen_getcolor('random')};
	return {'chr':'[', 'fg':'brown'};
    case '[':
	if (rnd < 0.9) {
	    if (rnd < 0.40) return {'chr':'[', 'fg':'cyan'};
	    if (rnd < 0.80) return {'chr':'[', 'fg':'brown'};
	    return {'chr':'[', 'fg':pen_getcolor('random')};
	} else {
	    return {'chr':')', 'fg':((Math.random() < 0.5) ? 'cyan' : 'brown')};
	}
    case ')':
	if (rnd < 0.1) {
	    if (rnd < 0.04) return {'chr':'[', 'fg':'cyan'};
	    if (rnd < 0.08) return {'chr':'[', 'fg':'brown'};
	    return {'chr':'[', 'fg':pen_getcolor('random')};
	} else {
	    return {'chr':')', 'fg':((Math.random() < 0.5) ? 'cyan' : 'brown')};
	}
    default:
	var sym;
	do {
	    sym = random_obj_sym();
	} while (sym.chr == '$');
	return sym;
    }
}

function generate_random_shop(shoptype)
{
    var x, y;
    editpaneldata.save_undopoint();
    editpaneldata.draw_random(10); /* makes a scroll shop */

    if (typeof shoptype == "number") shoptype = nethack_shop_types[shoptype];

    for (x = 0; x < editpaneldata.WID; x++)
	for (y = 0; y < editpaneldata.HEI; y++) {
	    var dat = editpaneldata.get_data(x,y);
	    if (dat.chr == '?' && dat.fg == 'white') editpaneldata.set_data(x,y, get_random_shop_sym(shoptype));
	}
    editpaneldata.check_undopoint();
    panel_redraw();
}




function panel_redraw()
{
  show_edit_panel();
  show_editpanel_textarea();
  panel_showcode();
  strip_preview_panels();
  update_editpanel_textarea();
  set_undobtn_state();
}

function panel_mouse_hover(x,y, onoff)
{
  var tmp;

  if (onoff) {
    current_pos_x = x;
    current_pos_y = y;
    hovering_on_editpanel = 1;
  } else {
    hovering_on_editpanel = 0;
  }

  function mousehover_mark_on(x1,y1)
    {
      tmp = document.getElementById("editpanelpos"+x1+"x"+y1);
      if (tmp) tmp.style.background = "red";
    }

  function mousehover_mark_off(x1,y1)
    {
      tmp = document.getElementById("editpanelpos"+x1+"x"+y1);
      if (tmp) tmp.style.background = "black";
    }

  switch (editmode) {
  default:
  case 0:  /* pen drawing */
  case 1:  /* color picker */
  case 2: /* writer mode */
    tmp = document.getElementById("editpanelpos"+x+"x"+y);
    if (tmp) {
      tmp.style.background = (onoff) ? "red" : "black";
    }
    break;
  case 3: /* floodfill */
    if (onoff) {
      tmp = document.getElementById("editpanelpos"+x+"x"+y);
      if (tmp && tmp.style.background == "red") break;
      editpaneldata.draw_floodfill(x,y, mousehover_mark_on);
    } else {
      tmp = document.getElementById("editpanelpos"+x+"x"+y);
      if (tmp && tmp.style.background == "black") break;
      editpaneldata.draw_floodfill(x,y, mousehover_mark_off);
    }
    break;
  case 4: /* line draw */
    if (onoff) {
      editpaneldata.draw_line(cursor_x, cursor_y, x,y, mousehover_mark_on);
    } else {
      editpaneldata.draw_line(cursor_x, cursor_y, x,y, mousehover_mark_off);
    }
    break;
  case 5: /* rect draw */
    if (onoff) {
      editpaneldata.draw_rect(cursor_x, cursor_y, x, y, mousehover_mark_on);
    } else {
      editpaneldata.draw_rect(cursor_x, cursor_y, x, y, mousehover_mark_off);
    }
    break;
  case 6: /* filled rect draw */
    if (onoff) {
      editpaneldata.draw_rect_filled(cursor_x, cursor_y, x, y, mousehover_mark_on);
    } else {
      editpaneldata.draw_rect_filled(cursor_x, cursor_y, x, y, mousehover_mark_off);
    }
    break;
  case 7: /* room rect */
    if (onoff) {
      editpaneldata.draw_rect(cursor_x, cursor_y, x, y, mousehover_mark_on);
    } else {
      editpaneldata.draw_rect(cursor_x, cursor_y, x, y, mousehover_mark_off);
    }
    break;
  }
}

function panel_update(event, x,y)
{
  var p;
  if (event.ctrlKey) {
      p = pen_clone_nornd(ctrl_pen);
  } else {
      p = pen_clone_nornd(pen);
  }

  if (p.chr == ' ') p.fg = "gray";

  switch (editmode) {
  default:
  case 2: /* writer */
  case 0: /* pen drawing */
    editpaneldata.save_undopoint();
    editpaneldata.set_data(x,y,p);
    editpaneldata.check_undopoint();
    break;
  case 1: /* color picker */
    var tmp = editpaneldata.get_data(x,y);
    pen_set_sym(tmp);
    change_editmode(0);
    break;
  case 3: /* flood fill */
    editpaneldata.save_undopoint();
    editpaneldata.draw_floodfill(x,y, p);
    editpaneldata.check_undopoint();
    break;
  case 4: /* line draw */
    editpaneldata.save_undopoint();
    editpaneldata.draw_line(cursor_x, cursor_y, x,y, p);
    editpaneldata.check_undopoint();
    break;
  case 5: /* rect draw */
    editpaneldata.save_undopoint();
    editpaneldata.draw_rect(cursor_x, cursor_y, x,y, p);
    editpaneldata.check_undopoint();
    break;
  case 6: /* fill rect draw */
    editpaneldata.save_undopoint();
    editpaneldata.draw_rect_filled(cursor_x, cursor_y, x,y, p);
    editpaneldata.check_undopoint();
    break;
  case 7: /* room rect */
      editpaneldata.save_undopoint();
      editpaneldata.draw_line(cursor_x, cursor_y, cursor_x, y, {'chr':'|'});
      editpaneldata.draw_line(       x, cursor_y,        x, y, {'chr':'|'});

      editpaneldata.draw_line(cursor_x, cursor_y, x, cursor_y, {'chr':'-'});
      editpaneldata.draw_line(cursor_x,        y, x,        y, {'chr':'-'});
      editpaneldata.check_undopoint();
      break;
  }

  cursor_x = x;
  cursor_y = y;

  panel_redraw();
}


function panel_getdiv()
{
  var x, y;
  var txt = "";
  var dat;
  var tmpen;

  var p_cursor_x = -1;
  var p_cursor_y = -1;
  if (editpaneldata.cursor != undefined) {
      p_cursor_x = editpaneldata.cursor.x;
      p_cursor_y = editpaneldata.cursor.y;
  }

  txt += "<div class='panelborder'>";
  txt += "<pre class='panel'>";
  for (y = 0; y < editpaneldata.HEI; y++) {
    for (x = 0; x < editpaneldata.WID; x++) {
      dat = editpaneldata.get_data(x,y);
      txt += "<span class='hovered";
      if (editmode == 2 && x == cursor_x && y == cursor_y) txt += " cursor_hilite";
      txt += "'";
      txt += " id='editpanelpos"+x+"x"+y+"'";
      txt += " onmouseover='panel_mouse_hover("+x+","+y+",1);'";
      txt += " onmouseout='panel_mouse_hover("+x+","+y+",0);'";
      txt += " onClick='panel_update(event, "+x+","+y+");'>";
      tmpen = pen_clone(dat);
      if (p_cursor_x == x && p_cursor_y == y) { tmpen.cur = 1; } else { tmpen.cur = 0; }
      txt += get_data_span(tmpen);
      txt += "</span>";
    }
    txt += "<br>";
  }
  txt += "</pre>";
  txt += "</div>";
  return txt;
}

function panel_get_colornotes(panelnum)
{
  var y,x, i, r;
  var txt = "";
  var notes = new Array();
  var dat;
  var ch;
  var tmppanel = panels[panelnum].panel.clone();
  var fg;

  for (y = 0; y < tmppanel.HEI; y++) {
    for (x = 0; x < tmppanel.WID; x++) {
      dat = tmppanel.get_data(x,y);
      if (dat.chr != undefined) { ch = dat.chr; } else { continue; }
      if (dat.chr == ' ') continue;
      fg = dat.fg;
      if (fg == undefined) { fg = "gray"; }
      if (notes[ch] == undefined) {
	  notes[ch] = {'colors':new Array(), 'numcolors':0};
	  for (r in colors) {
	      notes[ch].colors[colors[r]] = 0;
	  }
      }
      if (notes[ch].colors[fg] == 0) { notes[ch].numcolors++; }
      notes[ch].colors[fg]++;
    }
  }

  for (i = ' '.charCodeAt(0); i <= '~'.charCodeAt(0); i++) {
    ch = String.fromCharCode(i);
    if ((notes[ch] == undefined) || (notes[ch].numcolors != 1)) continue;
    for (r in colors) {
      if (colors[r] == "gray") continue;
      if ((notes[ch].colors[colors[r]] > 1) && (notes[ch].numcolors == 1)) {
	txt += "SETCOLORS: All '" + ch + "' are \"" + colors[r] + "\"\n";
	notes[ch].colors[colors[r]] = 0;
	break;
      }
    }
  }

  for (y = 0; y < tmppanel.HEI; y++) {
    for (x = 0; x < tmppanel.WID; x++) {
      dat = tmppanel.get_data(x,y);
      if (dat.chr != undefined) { ch = dat.chr; } else { continue; }
      if (dat.chr == ' ') continue;
      if (dat.fg && (dat.fg != "gray") && (notes[ch].colors[dat.fg] > 0)) {
          if (ch >= ' ' && ch <= '~' && ch.length == 1) {
	      txt += "SETCOLOR: (" + x + "," + y + "), '"+ch+"' is \"" + dat.fg + "\"\n";
	  } else {
	      txt += "SETCOLOR: (" + x + "," + y + "), \"" + dat.fg + "\"\n";
	  }
      }
    }
  }
  return txt;
}

function panel_getcode(html)
{
  var x,y, i;
  var txt = "";

  if (code_checkbox.checked != true) return "";

  //txt += "TITLE:"+stripdata.title+"\n";
  if (html)
    txt += "AUTHOR:"+htmlentities(stripdata.author)+"\n";
  else {
      var htxt = stripdata.author;
      htxt = htxt.replace("&", "&amp;");
      txt += "AUTHOR:"+htxt+"\n";
  }
  txt += "PANELS: (" + STRIP_WID + "," + STRIP_HEI + ")\n";

  for (i = 0; i < (STRIP_HEI*STRIP_WID); i++) {
    if (panels[i] == undefined) continue;
    txt += "MAP: ("+panels[i].panel.WID+","+panels[i].panel.HEI+")\n";
    for (y = 0; y < panels[i].panel.HEI; y++) {
      for (x = 0; x < panels[i].panel.WID; x++) {
	dat = panels[i].panel.get_data(x,y);
	chr = dat.chr;
        if (chr >= ' ' && chr <= '~' && chr.length == 1) {
	    if (chr == '<') chr = '&lt;';
	    else if (chr == '>') chr = '&gt;';
	    else if (chr == '&') chr = '&amp;';
	} else chr = '.';
	txt += chr;
      }
      txt += "\n";
    }
    txt += "ENDMAP\n";
    txt += panel_get_colornotes(i);
    for (y = 0; y < panels[i].panel.HEI; y++) {
      for (x = 0; x < panels[i].panel.WID; x++) {
	dat = panels[i].panel.get_data(x,y);
	  var attrs = new Array();
	  if (dat.bold == 1) { attrs.push('bold'); }
	  if (dat.rev == 1) { attrs.push('reverse'); }
	  if (dat.ul == 1) { attrs.push('underline'); }
	  if (attrs.length > 0) {
	      txt += "SETATTR:("+x+","+y+"),"+attrs.join('&')+"\n";
	  }
      }
    }
    for (y = 0; y < panels[i].panel.HEI; y++) {
      for (x = 0; x < panels[i].panel.WID; x++) {
	dat = panels[i].panel.get_data(x,y);
	chr = dat.chr;
        if (!(chr >= ' ' && chr <= '~' && chr.length == 1)) {
	    chr = chr.replace(/^&#([0-9a-fA-F]+);$/, "$1");
	    txt += "SETCHAR:("+x+","+y+"),"+chr+"\n";
	}
      }
    }

    if (panels[i].panel.inmap(panels[i].panel.cursor.x,panels[i].panel.cursor.y)) {
	txt += "CURSOR: ("+panels[i].panel.cursor.x+","+panels[i].panel.cursor.y+")\n";
    }
    if (panels[i].text && (panels[i].text.length > 0)) {
      var htxt;
      if (html) {
	htxt = htmlentities(panels[i].text);
      } else {
	htxt = panels[i].text;
	htxt = htxt.replace("&", "&amp;");
      }
      var txtlines = htxt.split(/\n/);
      for (tl = 0; tl < txtlines.length; tl++) {
	txt += 'TEXT:'+txtlines[tl]+"\n";
      }
    }
  }

  if (stripdata.footnote && (stripdata.footnote.length > 0)) {
    if (html)
      txt += "FOOTNOTE:" + htmlentities(stripdata.footnote) + "\n";
    else {
	var htxt = stripdata.footnote;
	htxt = htxt.replace("&", "&amp;");
	txt += "FOOTNOTE:" + htxt + "\n";
    }
  }

  return txt;
}

function hide_POST_status()
{
  var tmp = document.getElementById("poststatusdiv");
  if (tmp == undefined) return;
  tmp.style.visibility = "hidden";
  tmp.style.display = "none";
}

function add_POST_error(txt)
{
    if (POST_errorstr == undefined) {
	POST_errorstr = txt;
    } else {
	POST_errorstr += "<br>" + txt;
    }
}

function show_POST_status()
{
  var tmp = document.getElementById("poststatusdiv");
  if (tmp == undefined) return;
  var btn = "<br><a class='button' href='javascript:hide_POST_status();'>OK</a>";

  if (typeof POST_success == "string") {
    var str = POST_success + btn;
    tmp.innerHTML = str;
    tmp.style.backgroundColor = "white";
    tmp.style.border = "0.5em solid green";
    tmp.style.visibility = "visible";
    tmp.style.display = "block";
  } else  if (typeof POST_errorstr == "string") {
    var str = POST_errorstr + btn;
    tmp.innerHTML = str;
    tmp.style.backgroundColor = "yellow";
    tmp.style.border = "0.5em solid red";
    tmp.style.visibility = "visible";
    tmp.style.display = "block";
  } else {
    tmp.style.visibility = "hidden";
    tmp.style.display = "none";
  }
}

function panel_downloadcode()
{
  var tmp = document.getElementById("hidden_div");
  var txt = "";
  txt += "<form method='post' action='diydudley_download.php' name='code_download_form' id='code_download_form'>";
  txt += "<textarea name='strip_code_download_textarea'>";
  txt += panel_getcode(0);
  txt += "</textarea>";
  txt += "<input type='Submit'>";
  txt += "</form>";

  tmp.innerHTML = txt;

  var tmp2 = document.getElementById("code_download_form");

  tmp2.submit();

  tmp.innerHTML = '';
}

function panel_submitcode()
{
  var tmp = document.getElementById("hidden_div");
  var txt = "";
  txt += "<form method='post' action='diydudley.php' name='code_submit_form' id='code_submit_form'>";

  if (USR_strip_in_queue == 1) {
      txt += "<input type='hidden' value='" + USR_strip_id + "' name='strip_id'>";
      txt += "<input type='hidden' value='update strip' name='action'>";
  } else {
      txt += "<input type='hidden' value='submit strip' name='action'>";
  }

  if (USR_login == 0) {
    var usrnam = document.getElementById("user_name").value;
    var usrpass = document.getElementById("user_passwd").value;
    txt += "<input type='hidden' value='" + usrnam + "' name='username'>";
    txt += "<input type='hidden' value='" + usrpass + "' name='password'>";
  }

  txt += "<textarea name='comicstrip'>";
  txt += panel_getcode(0);
  txt += "</textarea>";
  txt += "<input type='Submit'>";
  txt += "</form>";

  tmp.innerHTML = txt;

  var tmp2 = document.getElementById("code_submit_form");

  tmp2.submit();

  tmp.innerHTML = '';
}

function panel_download_save()
{
  var tmp = document.getElementById("download_save");
  var txt = "";
  if (!tmp) return;

  if (USR_login == 0) {
     txt += " Username: <input type='text' size='20' id='user_name'"+getkeyb_handler_string()+">";
     txt += " Password: <input type='password' size='10' id='user_passwd'"+getkeyb_handler_string()+">";
  } else {
     txt += " You are logged in as <em><b>" + USR_name + "</b></em>";
  }
  txt += "<br>You can:<ul>";

  txt += "<li><a href='#' class='button' onclick='return buttonfunc_act(40);'>Download</a> the comic strip code to your own computer, or";

  txt += "<li><a href='#' class='button' onclick='return buttonfunc_act(41);'>";
  if (USR_strip_in_queue == 1) {
      txt += "Update</a> this comic in the database";
  } else {
      txt += "Submit</a> this comic to the database";
  }
  txt += " <em><small>(requires login)</small></em>";

  txt += "</ul>";

  tmp.innerHTML = txt;
}

function panel_showcode()
{
  var tmp = document.getElementById("strip_code_div");
  var code_edit = document.getElementById("code_edit_cbox");
  var txt = "";
  var btn = "";

  if (code_checkbox.checked != true) return;

  if (code_edit.checked) {
    txt += "<textarea id='strip_code_textarea' "+getkeyb_handler_string()+" rows='50' cols='80'>";
    txt += panel_getcode(0);
    txt += "</textarea>";
    txt += "<a href='#' class='button' onclick='return buttonfunc_act(42);'>parse</a>";
  } else {
    txt += "<pre>";
    txt += panel_getcode(1);
    txt += "</pre>";
  }


  tmp.innerHTML = txt;
}

function parse_code_param_coords(prefix, line)
{
    var re = new RegExp('^' + prefix + ': *\\( *(\\d+) *, *(\\d+) *\\)$');
    var tmp;
    if (line.match(re)) {
	tmp = line.replace(re, "$1,$2");
    } else {
	re = new RegExp('^' + prefix + ': *(\\d+) *, *(\\d+)$');
	tmp = line.replace(re, "$1,$2");
    }
    return tmp;
}

function parse_code(code_data)
{
  var code_textarea = document.getElementById("strip_code_textarea");
  var tmp;
  var inmap = 0;
  var i;
  var map_y, map_x;
  var curr_map = 0;
  var data;
  var lines;

  if (code_data != undefined)
     data = code_data;
  else
  if (code_textarea)
    data = code_textarea.value;
  else
    data = panel_getcode(0);
  data = data.replace("\r", "");
  lines = data.split(/\n/);

  curr_map = 0;
  n_panels = 0;

  delete panels;

  for (i = 0; i < lines.length; i++) {
    var line = lines[i].replace(/\x0d/g, '');
    if (inmap) {
      if (line.match(/^ENDMAP$/)) {
	  n_panels++;
	inmap = 0;
      } else {
	if (map_y < panels[(curr_map-1)].panel.HEI) {
	  for (map_x = 0; map_x < panels[(curr_map-1)].panel.WID; map_x++) {
	    var dat = {'chr':' '};
	    dat.chr = line.substr(map_x, 1);
	    if (dat.chr == undefined || dat.chr.length != 1 || dat.chr < ' ' || dat.chr > '~') dat.chr = ' ';
	    panels[(curr_map-1)].panel.set_data(map_x, map_y, dat);
	  }
	}
	map_y++;
      }
    } else {
      if (line.match(/^AUTHOR:/)) {
	stripdata.author = line.replace("AUTHOR:", "");
      } else if (line.match(/^PANELS:/)) {
	tmp = parse_code_param_coords('PANELS', line);
	var tmp2 = tmp.split(',');
	STRIP_WID = parseInt(tmp2[0]);
	if (STRIP_WID < 1) STRIP_WID = 1;
	STRIP_HEI = parseInt(tmp2[1]);
	if (STRIP_HEI < 1) STRIP_HEI = 1;
	/*
      } else if (line.match(/^SIZE:/)) {
	tmp = line.replace("SIZE:", "");
	var tmp2 = tmp.split(',');
	PANEL_WID = parseInt(tmp2[0]);
	if (PANEL_WID < 3) PANEL_WID = 3;
	PANEL_HEI = parseInt(tmp2[1]);
	if (PANEL_HEI < 3) PANEL_HEI = 3;
	delete panels;
	for (tmp = 0; tmp < (STRIP_WID*STRIP_HEI); tmp++) {
	  var pnl = new Panel(PANEL_WID, PANEL_HEI);
	  var txt = new String("@ Panel " + tmp + " text goes here.");
	  panels[tmp] = {'panel':pnl, 'text':txt};
	}
*/
      } else if (line.match(/^SETCOLORS:/)) {
	tmp = line.replace(/^SETCOLORS: *All +'(.)' +are +"(.+)"/, "$1:$2");
	var chr = tmp.substr(0, 1);
	if (chr == undefined) continue;
	var color = tmp.substr(2);
	if (color == undefined) continue;
	var okcolor = 0;
	for (tmpi = 0; tmpi < colors.length; tmpi++) {
	  if (color.indexOf(colors[tmpi]) == 0) okcolor = 1;
	}
	if (okcolor && (curr_map > 0)) {
	  panels[(curr_map-1)].panel.set_char_colors(chr, color);
	} else {
	  alert("NOT OK: all colors. " + okcolor +","+ curr_map + "\n"+tmp);
	}
      } else if (line.match(/^SETCOLOR:/)) {
	if (line.match(/^SETCOLOR: *\((\d+) *, *(\d+)\) *, *'(.)' +is +"(.+)"/)) {
	    tmp = line.replace(/^SETCOLOR: *\((\d+) *, *(\d+)\) *, *'(.)' +is +"(.+)"/, "$3:$1:$2:$4");
	} else {
	    tmp = line.replace(/^SETCOLOR: *\((\d+) *, *(\d+)\) *, *"(.+)"/, ":$1:$2:$3");
	}
	var tmp2 = tmp.split(':');
	var okcolor = 0;
	var tmpx = parseInt(tmp2[1]);
	var tmpy = parseInt(tmp2[2]);
	var color = tmp2[3];
	if (color == undefined) {
	    color = "undefined";
	    alert("Could not parse " + line);
	} else {
	    for (tmpi = 0; tmpi < colors.length; tmpi++) {
		if (color.indexOf(colors[tmpi]) == 0) okcolor = 1;
	    }
	    if (okcolor && (curr_map > 0)) {
		var tmpdat = panels[(curr_map-1)].panel.get_data(tmpx, tmpy);
		tmpdat.fg = color;
		panels[(curr_map-1)].panel.set_data(tmpx, tmpy, tmpdat);
	    } else {
		alert("NOT OK: (okcolor="+okcolor+") "+tmp);
	    }
	}
      } else if (line.match(/^TEXT:/)) {
	if (curr_map > 0) {
	  if (panels[(curr_map-1)].text == undefined) {
	    panels[(curr_map-1)].text = line.replace("TEXT:", "");
	  } else {
	    panels[(curr_map-1)].text += "\n" + line.replace("TEXT:", "");
	  }
	}
      } else if (line.match(/^FOOTNOTE:/)) {
	stripdata.footnote = line.replace(/^FOOTNOTE:/, "");
      } else if (line.match(/^CURSOR:/)) {
	  tmp = parse_code_param_coords('CURSOR', line);
	  var tmp2 = tmp.split(',');
	  var cursor_x = parseInt(tmp2[0]);
	  var cursor_y = parseInt(tmp2[1]);
	  panels[(curr_map-1)].panel.set_cursor(cursor_x, cursor_y);
      } else if (line.match(/^SETATTR:/)) {
	  tmp = line.replace(/^SETATTR: *\((\d+) *, *(\d+)\) *, *(.+)$/, "$1\t$2\t$3");
	  var tmp2 = tmp.split("\t");
	  if (tmp2.length == 3) {
	      var cursor_x = parseInt(tmp2[0]);
	      var cursor_y = parseInt(tmp2[1]);
	      var attrs = tmp2[2].split('&');
	      var dat = panels[(curr_map-1)].panel.get_data(cursor_x, cursor_y);
	      for (var tmpa = 0; tmpa < attrs.length; tmpa++) {
		  switch (attrs[tmpa]) {
		  default: break;
		  case 'bold': dat.bold = 1; break;
		  case 'reverse': dat.rev = 1; break;
		  case 'ul':
		  case 'underline': dat.ul = 1; break;
		  }
	      }
	      panels[(curr_map-1)].panel.set_data(cursor_x, cursor_y, dat);
	  } else alert("ERROR parsing "+line);
      } else if (line.match(/^SETCHAR:/)) {
	  tmp = line.replace(/^SETCHAR: *\((\d+) *, *(\d+)\) *, *([0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F])$/, "$1\t$2\t$3");
	  var tmp2 = tmp.split("\t");
	  if (tmp2.length == 3) {
	      var cursor_x = parseInt(tmp2[0]);
	      var cursor_y = parseInt(tmp2[1]);
	      var chr = tmp2[2];
	      var dat = panels[(curr_map-1)].panel.get_data(cursor_x, cursor_y);
	      dat.chr = '&#'+chr+';';
	      panels[(curr_map-1)].panel.set_data(cursor_x, cursor_y, dat);
	  } else alert("ERROR parsing "+line);
      } else if (line.match(/^MAP:/)) {
	tmp = parse_code_param_coords('MAP', line);
	var tmp2 = tmp.split(',');
	var pwid = parseInt(tmp2[0]);
	if (pwid < 3) pwid = 3;
	var phei = parseInt(tmp2[1]);
	if (phei < 3) phei = 3;
	/*
	delete panels;
	for (tmp = 0; tmp < (STRIP_WID*STRIP_HEI); tmp++) {
	  var pnl = new Panel(PANEL_WID, PANEL_HEI);
	  var txt = new String("@ Panel " + tmp + " text goes here.");
	  panels[tmp] = {'panel':pnl, 'text':txt};
	}
*/

	var pnl = new Panel(pwid, phei);
	panels[curr_map] = {'panel':pnl};

	curr_map++;
	inmap = 1;
	map_y = 0;
      }
    }

  }
  strip_editpanel(-1);
  panel_redraw();
  output_strip_data_edit();
}

function pen_set_fgcolor(clr)
{
    if (pen.fg != clr) {
	pen.fg = clr;
	pen_has_changed();
    }
}

function pen_clr_fgcolor()
{
    if (pen.fg != undefined) {
	delete pen.fg;
	pen_has_changed();
    }
}

function pen_set_chr(chr)
{
    if (pen.chr != chr) {
	pen.chr = chr;
	pen_has_changed();
    }
}

function pen_set_sym(sym)
{
  if (pen_equal(ctrl_pen, sym)) {
      var tmp = pen;
      pen = ctrl_pen;
      ctrl_pen = tmp;
  } else {
      pen = pen_clone(sym);
  }
  pen_has_changed();
}

function pen_set_fg_chr(event, clr, chr)
{
  if (event != undefined) {
    if (event.ctrlKey)
	pen = pen_clone(ctrl_pen);
  }

  if (clr != undefined)
    pen.fg = clr;
  pen.chr = unescape(chr);
  pen_has_changed();
}

function pen_random()
{
  pen.fg = colors[Math.floor(Math.random() * colors.length)];
  pen.chr = String.fromCharCode(Math.floor(Math.random() * ('~'.charCodeAt(0) - ' '.charCodeAt(0))) + ' '.charCodeAt(0));
  pen_has_changed();
}

function old_pen_parsecookiestr(str)
{
  if (str == undefined || str == null) return;

  delete saved_pens;
  saved_pens = new Array();

  var arr = str.split(",");

  for (i = 0; i < arr.length; i++) {
    var tmp = arr[i].split("&");
    var chrh = tmp[0];
    var chr = parseInt(tmp[0], 16);
    var fg = tmp[1];
    var bold = tmp[2];
    var key = tmp[3];
    var rev = tmp[4];
    var ul = tmp[5];
    if (bold != 1) { bold = undefined; }
    if (rev != 1) { rev = undefined; }
    if (ul != 1) { ul = undefined; }
    if (key == '') { key = undefined; }
    if (key != undefined) {
      key = String.fromCharCode(key);
      if (key.length != 1) key = undefined;
      else {
	var idx = quick_pen_keys.indexOf(key);
	if (idx >= 0)
	  quick_pen_keys = quick_pen_keys.substr(0, idx) + quick_pen_keys.substr(idx+1);
      }
    }
    if (chr) {
	if (chr >= ' '.charCodeAt(0) && chr <= '~'.charCodeAt(0)) {
	    chr = String.fromCharCode(chr);
	} else {
	    chr = '&#' + chrh + ';';
	}
	saved_pens.push({'chr':chr, 'fg':fg, 'key':key, 'bold':bold, 'rev':rev, 'ul':ul});
	bindable_key_remove(key);
    }
  }
}

function assign_keys_to_pens()
{
    var i;
    for (i = 0; i < saved_pens.length; i++) {
	if (quick_pen_keys.length > 0) {
	    var chr = quick_pen_keys.substr(0,1);
	    quick_pen_keys = quick_pen_keys.substr(1);
	    if (chr) {
		saved_pens[i].key = chr;
		bindable_key_remove(chr);
	    }
	}
    }
}

function saved_pens_restore()
{
    saved_pens = default_saved_pens;
    quick_pen_keys = default_quick_pen_keys;
    assign_keys_to_pens();
    show_saved_pens();
    eraseCookie(cookie_prefix + "saved_pens");
}

function old_pen_cookiestr()
{
  var str = "";

  for (i = 0; i < saved_pens.length; i++) {
    var chr = saved_pens[i].chr;
    var fg = saved_pens[i].fg;
    var bold = saved_pens[i].bold;
    var key = saved_pens[i].key;
    var rev = saved_pens[i].rev;
    var ul = saved_pens[i].ul;
    if (fg == undefined) { fg = "gray"; }
    if (bold == undefined) { bold = 0; }
    if (rev == undefined) { rev = 0; }
    if (ul == undefined) { ul = 0; }
    if (key == undefined) { key = ''; } else { key = key.charCodeAt(0); }
    if (i > 0) { str += ","; }
    if (chr.length == 1) {
	chr = chr.charCodeAt(0).toString(16);
    } else if (chr.match(/^&#[0-9a-fA-F]+;$/)){
	chr = chr.replace(/^&#([0-9a-fA-F]+);$/, "$1");
    }
    str += chr + "&" + fg + "&" + bold + "&" + key + '&' + rev + '&' + ul;
  }
  return str;
}

function old_pen_remove(i)
{
  saved_pens.remove(i);
  show_saved_pens();
  createCookie(cookie_prefix + "saved_pens", old_pen_cookiestr(), 30);
}

function old_pen_move(i, dir)
{
  var x;

  if (dir > 0) x = i + 1;
  else if (dir < 0) x = i - 1;
  else {
    show_saved_pens();
    return;
  }
  if ((x >= 0) && (x < saved_pens.length)) {
    var tmpx = saved_pens[x];
    var tmpi = saved_pens[i];
    saved_pens[x] = tmpi;
    saved_pens[i] = tmpx;
    show_saved_pens();
    createCookie(cookie_prefix + "saved_pens", old_pen_cookiestr(), 30);
  }
}

function pen_save()
{
  var i;
  var tmpen = pen_clone_nornd(pen);
  var exists = 0;
  if (tmpen.fg == undefined) { tmpen.fg = "gray"; }

  for (i = 0; i < saved_pens.length; i++)
      if (pen_equal(tmpen, saved_pens[i])) {
	  exists = 1;
	  break;
      }

  if (!exists) {
    saved_pens.push(tmpen);
    show_saved_pens();
    createCookie(cookie_prefix + "saved_pens", old_pen_cookiestr(), 30);
  }
}

function color_selection()
{
  var tmp = document.getElementById("colorselection");
  var txt = "";
  var i;
  var chr = "#";
  var tmpen = pen_clone(pen);

  if (!(pen.chr == " ")) chr = pen_htmlchr(pen);

  txt += "<span class='colorselection_title'>Colors: </span>";
  txt += "<a class='button' onclick='return buttonfunc_act(43);' href='#'>no color</a>";
  /*txt += "<a class='button' onclick='pen_set_fgcolor(colors[Math.floor(Math.random()*(colors.length-1))+1]);return false;' href='#'>random</a>";*/
  txt += "<a class='button' onclick='return buttonfunc_act(44);' href='#'>random</a>";
  txt += "<span class='colorselection'>";
  for (i = 1; i < colors.length; i++) {
      tmpen.fg = colors[i];
      txt += " <span class='"+datspanclass(tmpen)+"' onclick='pen_set_fgcolor(\""+colors[i]+"\");'>"+chr+chr+chr+chr+"</span>";
  }
  txt += "</span>";
  tmp.innerHTML = txt;
}

function penset_escaped_func(pen)
{
  if (pen.fg == undefined) pen.fg = "gray";
  return "pen_set_fg_chr(event, \""+pen.fg+"\",\""+escape(pen.chr)+"\");";
}

function penset_span(pen, desc)
{
  var txt = "";
  txt += "<a class='withtooltip " + datspanclass(pen) + "' onclick='"+penset_escaped_func(pen)+"return false;' href='#'>";
  txt += pen_htmlchr(pen);
  if (desc != undefined) { txt += "<span class='tooltip'>" + desc + "</span>"; }
  txt += "</a>";

  return txt;
}

function penset_span_noclick(pen)
{
  var txt = "";
  txt += "<span class='" + datspanclass(pen) + "'>" + pen_htmlchr(pen) + "</span>";
  return txt;
}

function char_selection()
{
  var tmp = document.getElementById("charselection");
  var txt = "";
  var i;

  txt += "Chars: ";
  txt += "<span class='charselection'>";
  for (i = ' '.charCodeAt(0); i <= '~'.charCodeAt(0); i++) {
      var c = String.fromCharCode(i);
      txt += "<span class='"+datspanclass(pen)+"' onclick='pen_set_fg_chr(event, \""+pen.fg+"\",\""+escape(c)+"\");'>" + c + "</span>";
  }
  txt += "</span>";
  tmp.innerHTML = txt;
}

function pen_set_by_text(text)
{
  var i;
  for (i = 0; i < game_symbols_orig.length; i++) {
    if (game_symbols_orig[i].chr == undefined) { continue; }
    if (text == game_symbols_orig[i].text) {
      pen_set_fg_chr(undefined, game_symbols_orig[i].fg, escape(game_symbols_orig[i].chr));
      return;
    }
  }
}

function nethacksym_selectbox()
{
  var tmp = document.getElementById("nethacksymselbox");
  var txt = "";
  var i;
  var sortlvl = -1;

  var sorted = game_symbols_orig.slice();
  for (i = 0; i < sorted.length; i++) {
    sorted[i].orig_array_idx = i;
  }

  sorted.sort(
	      function(a,b)
              {
		var as = a.sort;
		var bs = b.sort;
		if (as == undefined) as = 999;
		if (bs == undefined) bs = 999;
		if (as < bs) { return -1; }
		if (as > bs) { return  1; }
		var at = new String(a.text);
		var bt = new String(b.text);
		if (at.toUpperCase() < bt.toUpperCase()) { return -1; }
		if (at.toUpperCase() > bt.toUpperCase()) { return  1; }
		return 0;
	      }
	      );

  txt += '<select id="nethacksymselboxid" onchange="pen_set_by_text(this.options[this.selectedIndex].value);">';
  for (i = 0; i < sorted.length; i++) {
    if (sorted[i].chr == undefined) { continue; }
    game_symbols_orig[sorted[i].orig_array_idx].nhsymselectbox_idx = i;
    if (sorted[i].sort != undefined && (sortlvl != sorted[i].sort)) {
      if (sortlvl != -1) txt += '</optgroup>';
      sortlvl = sorted[i].sort;
      txt += '<optgroup label="'+nh_sym_sort_optgroups[sortlvl]+'">';
    }

    var text = sorted[i].text;
    var chr = sorted[i].chr;
    var fg = sorted[i].fg;
    text = text.replace('<br>', ', ', 'gi');
    txt += '<option value="'+text+'">' + text + '</option>';
  }
  if (sortlvl != -1) txt += '</optgroup>';
  txt += '</select>';
  tmp.innerHTML = txt;
}

function nethacksym_searchstr()
{
  var tmp = document.getElementById("nethacksymsearchbox");
  var str = tmp.value;

  nethacksym_selection(str);
}

function nethacksym_selection(searchstr)
{
  var tmp = document.getElementById("gamesymselection");
  var txt = "";
  var i;
  var linelen = 0;

  if (searchstr == undefined) searchstr = '';

  txt += "";

  txt += '<span id="nethacksymselbox"></span>';
  //txt += '<input type="text" id="nethacksymsearchbox" onchange="nethacksym_searchstr();" value="'+((searchstr == '') ? 'Search' : searchstr)+'">';

  txt += "<a class='button' onclick='return buttonfunc_act(45);' href='#'>random monster</a>";

  txt += '<div class="gamesymselection">';
  for (i = 0; i < nethack_symbols.length; i++) {
    var fg = nethack_symbols[i].fg;
    var fgx = nethack_symbols[i].fg;
    var chr = nethack_symbols[i].chr;
    var chrx = nethack_symbols[i].chr;
    var popup = nethack_symbols[i].text;

    if ((searchstr.length > 0) && (popup.indexOf(searchstr) < 0)) continue;

    linelen++;

    if (chr == undefined) { txt += "<br>"; linelen = 0; continue; }

    txt += penset_span({'chr':chr, 'fg':fg}, popup);

    if (linelen > 40) { txt += "<br>"; linelen = 0; }

  }
  txt += "</div>";
  tmp.innerHTML = txt;
  nethacksym_selectbox();
}

function old_pen_assign_key(i, key)
{
  saved_pens[i].key = key;
  createCookie(cookie_prefix + "saved_pens", old_pen_cookiestr(), 30);
  if (key.length != 1) return;
  var idx = quick_pen_keys.indexOf(key);
  if (idx >= 0) {
    quick_pen_keys = quick_pen_keys.substr(0, idx) + quick_pen_keys.substr(idx+1);
    bindable_key_remove(key);
  }
}

function old_pen_set_key(i)
{
  var tmp = document.getElementById("old_pen_set_key_"+i);
  var key = tmp.value.substr(0,1);
  old_pen_assign_key(i, key);
  show_saved_pens();
}

function get_saved_pens_popup(i)
{
    var key = saved_pens[i].key;
    var popup = undefined;

    if (key && (key.length != 1)) { key = undefined; }

    if ((key == undefined) && (quick_pen_keys.length > 0)) {
      key = quick_pen_keys.substr(0,1);
      old_pen_assign_key(i, key);
    }

    popup = "<span style='font-weight:normal;'>Pen quick selection<br>";
    if (key != undefined)
      popup += "Press '<b>" + key + "</b>' to select this pen.";
    else
      popup += "<em>Sorry, no key set for this saved pen.</em>";
    popup += "<br>";
    popup += "<span class='button' onclick='old_pen_remove("+i+");'>remove</span>";
    if (i > 0)
      popup += "<span class='button' onclick='old_pen_move("+i+",-1);'>&lt;</span>";
    else
      popup += "<span class='button_disabled' onclick='old_pen_move("+i+",0);'>&lt;</span>";
    popup += "move";
    if (i < saved_pens.length-1)
      popup += "<span class='button' onclick='old_pen_move("+i+",1);'>&gt;</span>";
    else
      popup += "<span class='button_disabled' onclick='old_pen_move("+i+",0);'>&gt;</span>";
    popup += " key:<input type='text' "+getkeyb_handler_string()+" size='1' id='old_pen_set_key_"+i+"'";
    if (key != undefined) popup += " value='"+key+"'";
    popup += " onchange='old_pen_set_key("+i+");'></span>";
    return popup;
}

function show_saved_pens()
{
  var tmp = document.getElementById("saved_pens");
  var i;
  var txt;
  var ldir, rdir;

  txt = "pen: <a class='button' onclick='return buttonfunc_act(46);' href='#'>save</a>";
  txt += "<a class='button' onclick='return buttonfunc_act(47);' href='#'>random</a> - ";

  for (i = 0; i < saved_pens.length; i++) {
    txt += "<span class='saved_pens'>";
    txt += penset_span(saved_pens[i], get_saved_pens_popup(i));
    txt += "</span>";
  }

  tmp.innerHTML = txt;
}

function set_panel_text()
{
  var tmp = document.getElementById("editpanel_text");
  panels[editpanel_strippanel].text = tmp.value;
  strip_preview_panels();
  panel_showcode();
}

function get_panel_text()
{
  var tmp = document.getElementById("editpanel_text");
  if (panels[editpanel_strippanel].text != undefined) {
    tmp.value = panels[editpanel_strippanel].text;
  } else {
    tmp.value = '';
  }
}

function show_edit_panel_text()
{
  var tmp = document.getElementById("editpanel_text_div");
  var txt = "";
  txt += '<br>';
  txt += '<textarea id="editpanel_text" '+getkeyb_handler_string()+' cols="80" rows="4" onchange="set_panel_text();"></textarea>';
  txt += "<a class='button' onclick='return buttonfunc_act(48);' href='#'>insert pen</a>";
  txt += '<br>';
  tmp.innerHTML = txt;
}

function show_edit_panel()
{
  var tmp = document.getElementById("editdiv");
  var txt = "";
  txt += panel_getdiv();

  if (tmp)
    tmp.innerHTML = txt;

  show_edit_panel_text();

  get_panel_text();
}

function show_current_pen()
{
  var tmp = document.getElementById("current_pen");
  var txt = "Current pen: ";
  txt += "<span class='pen_glyph " + datspanclass(pen, 1) + "'>" + pen_htmlchr(pen) + "</span>";

  txt += " with ctrl:";
  txt += "<span class='pen_glyph " + datspanclass(ctrl_pen, 1) + "'>" + pen_htmlchr(ctrl_pen) + "</span>";

  tmp.innerHTML = txt;
}

function change_editmode(i)
{
  if (i != editmode) {
    var tmp = hovering_on_editpanel;
    panel_mouse_hover(current_pos_x, current_pos_y, 0);
    editmode = i;
    show_editmode();
    if (tmp)
      panel_mouse_hover(current_pos_x, current_pos_y, 1);
  }
}

function show_editmode()
{
  var tmp = document.getElementById("editmode_span");
  var txt = "";
  txt += '<b>' + editmode_str[editmode] + '</b> ';

  txt += "<a class='"+(editmode==0 ? "button_disabled" : "button")+"' onclick='return buttonfunc_act(50);' href='#'>draw</a>";
  txt += "<a class='"+(editmode==1 ? "button_disabled" : "button")+"' onclick='return buttonfunc_act(51);' href='#'>colorpicker</a>";
  txt += "<a class='"+(editmode==3 ? "button_disabled" : "button")+"' onclick='return buttonfunc_act(53);' href='#'>floodfill</a>";
  txt += "<a class='"+(editmode==4 ? "button_disabled" : "button")+"' onclick='return buttonfunc_act(54);' href='#'>lines</a>";
  txt += "<a class='"+(editmode==5 ? "button_disabled" : "button")+"' onclick='return buttonfunc_act(55);' href='#'>rect</a>";
  txt += "<a class='"+(editmode==6 ? "button_disabled" : "button")+"' onclick='return buttonfunc_act(56);' href='#'>fillrect</a>";
  txt += "<a class='"+(editmode==7 ? "button_disabled" : "button")+"' onclick='return buttonfunc_act(57);' href='#'>roomrect</a>";

  tmp.innerHTML = txt;
}

function update_toolbar()
{
  show_current_pen();
  show_panel_number();
  show_editmode();
}

function show_panel_number()
{
  var tmp = document.getElementById("panel_number");
  var txt = "";
  txt += editpanel_strippanel.toString();
  tmp.innerHTML = txt;
}

function record_mouse_cursor_pos(e)
{
    dudley_mouse_pos_x = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
    dudley_mouse_pos_y = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
}

function pen_selection_popup_checkbox_check(typ)
{
    var e = document.getElementById("pen_selection_popup_checkbox_"+typ);
    if (!e) return;
    if (e.checked) {
	pen[typ] = 1;
    } else {
	delete pen[typ];
    }
    pen_has_changed();
}

function pen_selection_attr_checkboxes()
{
    var txt = "<span class='pen_attrs'><label>Bold<input type='checkbox' id='pen_selection_popup_checkbox_bold' onchange='pen_selection_popup_checkbox_check(\"bold\");'";
    if (pen.bold == 1) txt += " checked";
    txt += "></label>";

    txt += "<label>Rev<input type='checkbox' id='pen_selection_popup_checkbox_rev' onchange='pen_selection_popup_checkbox_check(\"rev\");'";
    if (pen.rev == 1) txt += " checked";
    txt += "></label></span>";

    txt += "<label>Ul<input type='checkbox' id='pen_selection_popup_checkbox_ul' onchange='pen_selection_popup_checkbox_check(\"ul\");'";
    if (pen.ul == 1) txt += " checked";
    txt += "></label></span>";
    return txt;
}

function update_pen_selection_popup()
{
    var elem = document.getElementById("pen_selection_popup");
    if (!elem) return;
    var txt = "";
    var i;
    var tmpen;
    for (i = 0; i < colors.length; i++) {
	tmpen = pen_clone(pen);
	tmpen.fg = colors[i];
	txt += "<span class='saved_pens' onclick='update_pen_selection_popup();'>" + penset_span(tmpen) + "</span>";
    }
    txt += "<br><br>";

    var cnt = 0;
    for (var ch = ' '.charCodeAt(0); ch <= '~'.charCodeAt(0); ch++) {
	tmpen = pen_clone(pen);
	tmpen.chr = String.fromCharCode(ch);
	txt += "<span class='saved_pens' onclick='update_pen_selection_popup();'>" + penset_span(tmpen) + "</span>";
	cnt++;
	if (cnt > 15) { txt += '<br>'; cnt = 0; }
    }
    txt += "<br>";
    txt += pen_selection_attr_checkboxes();

    elem.innerHTML = txt;
}

function show_pen_selection_popup(close)
{
    var elem = document.getElementById("pen_selection_popup");
    if (!elem) return;
    if (close == 1) {
	elem.style.display = "none";
	return;
    }
    if (elem.style.display != "none") {
	elem.style.display = "none";
	return;
    }
    update_pen_selection_popup();
    elem.style.display = "block";
    elem.style.left = (dudley_mouse_pos_x - Math.floor(elem.offsetWidth / 2)) + 'px';
    elem.style.top = (dudley_mouse_pos_y - Math.floor(elem.offsetHeight / 2)) + 'px';
}


var dud_extended_char = 256;

function update_extended_char_popup(adj)
{
    var elem = document.getElementById("extchar_selection_popup");
    if (!elem) return;
    if (adj != undefined) {
	dud_extended_char += adj;
	if (dud_extended_char < 256) dud_extended_char = 256;
    }
    var tmpen = pen_clone(pen);
    var txt = "";
    var i;
    var cnt = 0;
    for (i = 0; i < 256; i++) {
	var d = (i + dud_extended_char);
	tmpen.chr = '&#'+'0000'.substr(d.toString().length)+d+';';
	txt += "<span class='saved_pens'>" + penset_span(tmpen) + "</span>";
	cnt++;
	if (cnt > 32) { txt += '<br>'; cnt = 0; }
    }
    txt += "<br>";
    txt += "<div><a class='button' href='#' onclick='update_extended_char_popup(-256); return false;'>&lt;--</a>";
    txt += "<span style='padding:0 2em'>"+('0000'.substr(dud_extended_char.toString(16).length)+dud_extended_char.toString(16))+"</span>";
    txt += "<span style='float:right'><a class='button' href='#' onclick='update_extended_char_popup(256); return false;'>--&gt;</a></span></div>";

    elem.innerHTML = txt;
}

function show_extended_char_popup()
{
    var elem = document.getElementById("extchar_selection_popup");
    if (!elem) return;
    if (elem.style.display != "none") {
	elem.style.display = "none";
	return;
    }
    update_extended_char_popup();
    elem.style.display = "block";
    elem.style.left = (dudley_mouse_pos_x - Math.floor(elem.offsetWidth / 2)) + 'px';
    elem.style.top = (dudley_mouse_pos_y - Math.floor(elem.offsetHeight / 2)) + 'px';
}

function buttonfunc_act(act)
{
  if (act < 40) {
    editpaneldata.save_undopoint();
  }
  switch (act) {
  case 0:  editpaneldata.fill(pen); break;
  case 1:  editpaneldata.clear(); break;
  case 2:  editpaneldata.remove_colors(); break;
  case 3:  editpaneldata.random_replace(pen, ctrl_pen, 100); break;
  case 4:  editpaneldata.draw_scatter(pen, 5); break;

  case 5:  editpaneldata.draw_random(); break;
  case 6:  editpaneldata.draw_random(0); break;
  case 7:  editpaneldata.draw_random(2); break;
  case 8:  editpaneldata.draw_random(3); break;
  case 9:  editpaneldata.draw_random(4); break;
  case 10: editpaneldata.draw_random(7); break;
  case 11: editpaneldata.draw_random(8); break;
  case 12: editpaneldata.draw_random(9); break;

  case 13: editpaneldata.shift(0); break;
  case 14: editpaneldata.shift(3); break;
  case 15: editpaneldata.shift(1); break;
  case 16: editpaneldata.shift(2); break;

  case 17: editpaneldata.move_symbols(pen, ctrl_pen, 0); break;
  case 18: editpaneldata.move_symbols(pen, ctrl_pen, 1); break;
  case 19: editpaneldata.move_symbols(pen, ctrl_pen, 2); break;
  case 20: editpaneldata.move_symbols(pen, ctrl_pen, 3); break;
  case 21: editpaneldata.move_symbols(pen, ctrl_pen, 4); break;
  case 22: editpaneldata.move_symbols(pen, ctrl_pen, 5); break;

  case 23: editpaneldata.draw_maze(pen); break;
  case 24: editpaneldata.wallify(); break;
  case 25: panel_draw_gravestone(); break;

  case 26: strip_pastepanel(); break;

  case 27:
      if (hovering_on_editpanel) {
	  var dat = editpaneldata.get_data(current_pos_x, current_pos_y);
	  if (dat.bold == 1) { dat.bold = undefined; } else { dat.bold = 1; }
	  editpaneldata.set_data(current_pos_x, current_pos_y, dat);
      }
      break;
  case 28:
      if (hovering_on_editpanel) {
	  var dat = editpaneldata.get_data(current_pos_x, current_pos_y);
	  if (dat.rev == 1) { dat.rev = undefined; } else { dat.rev = 1; }
	  editpaneldata.set_data(current_pos_x, current_pos_y, dat);
      }
      break;
  case 29:
      if (hovering_on_editpanel) {
	  var dat = editpaneldata.get_data(current_pos_x, current_pos_y);
	  if (dat.ul == 1) { dat.ul = undefined; } else { dat.ul = 1; }
	  editpaneldata.set_data(current_pos_x, current_pos_y, dat);
      }
      break;


  case 40: panel_downloadcode(); break;
  case 41: panel_submitcode(); break;
  case 42: parse_code(); break;
  case 43: pen_clr_fgcolor(); break;
  case 44: pen_set_fgcolor("random"); break;
  case 45: pen_set_sym(random_nethack_monster_sym()); break;
  case 46: pen_save(); break;
  case 47: pen_random(); break;
  case 48: pen_insert(); break;

  case 50: change_editmode(0); break;
  case 51: change_editmode(1); break;
  case 53: change_editmode(3); break;
  case 54: change_editmode(4); break;
  case 55: change_editmode(5); break;
  case 56: change_editmode(6); break;
  case 57: change_editmode(7); break;

  case 60: strip_copypanel(); panel_redraw(); break;
  case 61: strip_addpanel(); panel_redraw(); break;
  case 62: strip_deletepanel(); panel_redraw(); break;
  case 63: editpaneldata.undo(); panel_redraw(); break;
  case 64: strip_prevpanel(); panel_redraw(); break;
  case 65: strip_nextpanel(); panel_redraw(); break;

  case 70: pen_swap_ctrl(); break;
  case 71:
      if (hovering_on_editpanel) {
	  var tmp = editpaneldata.get_data(current_pos_x,current_pos_y);
	  pen_set_sym(tmp);
      }
      break;
  case 72:
    if (hovering_on_editpanel) {
      var tmpeditmode = editmode;
      change_editmode(0);
      cursor_x = current_pos_x;
      cursor_y = current_pos_y;
      change_editmode(tmpeditmode);
    }
    break;
  case 73:
    if (hovering_on_editpanel) {
	if (panels[editpanel_strippanel].panel.cursor.x == current_pos_x &&
	    panels[editpanel_strippanel].panel.cursor.y == current_pos_y) {
	    editpaneldata.set_cursor(-1, -1);
	    panels[editpanel_strippanel].panel.set_cursor(-1, -1);
	} else {
	    editpaneldata.set_cursor(current_pos_x, current_pos_y);
	    panels[editpanel_strippanel].panel.set_cursor(current_pos_x, current_pos_y);
	}
	panel_redraw();
    }
    break;
  case 74: popup_help(); break;
  case 75:
    if (editmode == 1) change_editmode(0);
    else change_editmode(1);
    break;
  case 76:
    if (editmode == 3) change_editmode(0);
    else change_editmode(3);
    break;
  case 77:
    if (editmode == 4) change_editmode(0);
    else change_editmode(4);
    break;
  case 78:
    if (editmode == 5) {
      change_editmode(6);
    } else if (editmode == 6) {
      change_editmode(0);
    } else {
      change_editmode(5);
    }
    break;
  case 79: config_window(); break;
  case 80: maptemplate_window(); break;

  case 81: generate_random_shop(); break;
  case 82: generate_random_shop('?'); break;
  case 83: generate_random_shop('+'); break;
  case 84: generate_random_shop('='); break;
  case 85: generate_random_shop('%'); break;
  case 86: generate_random_shop('('); break;
  case 87: generate_random_shop('!'); break;
  case 88: generate_random_shop('*'); break;
  case 89: generate_random_shop('['); break;
  case 90: generate_random_shop(')'); break;
  case 91: show_pen_selection_popup(); break;
  case 92:
      if (pen.bold == 1) { pen.bold = undefined; } else { pen.bold = 1; }
      pen_has_changed();
      break;
  case 93:
      if (pen.rev == 1) { pen.rev = undefined; } else { pen.rev = 1; }
      pen_has_changed();
      break;
  case 94:
      if (pen.ul == 1) { pen.ul = undefined; } else { pen.ul = 1; }
      pen_has_changed();
      break;
  case 95: show_extended_char_popup(); break;
  }
  if (act < 40) {
    editpaneldata.check_undopoint();
    panel_redraw();
  }
  return false;
}

function set_undobtn_state()
{
    var tmp = document.getElementById('undo_btn');
    if (tmp) {
	if (editpaneldata.has_undo()) {
	    tmp.className = "button";
	} else {
	    tmp.className = "button_disabled";
	}
    }
}

function show_buttons()
{
    var i;
  var tmp = document.getElementById("buttondiv");
  var txt ="Actions:<br>";

  var popup = "";
  popup += "<span class='button' onclick='return buttonfunc_act(5);' href='#'>random</span><br>";
  popup += "<span class='button' onclick='return buttonfunc_act(6);' href='#'>dungeon room</span><br>";
  popup += "<span class='button' onclick='return buttonfunc_act(7);' href='#'>field</span><br>";
  popup += "<span class='button' onclick='return buttonfunc_act(8);' href='#'>splatterfield</span><br>";
  popup += "<span class='button' onclick='return buttonfunc_act(9);' href='#'>reverse splatterfield</span><br>";
  popup += "<span class='button' onclick='return buttonfunc_act(10);' href='#'>dug randwalk</span><br>";
  popup += "<span class='button' onclick='return buttonfunc_act(11);' href='#'>mines</span><br>";
  popup += "<span class='button' onclick='return buttonfunc_act(12);' href='#'>maze</span><br>";

  popup += "Shops: ";
    for (i = 0; i < nethack_shop_types.length; i++)
	popup += "<span class='button' onclick='generate_random_shop("+i+");'>&nbsp;"+htmlentities(nethack_shop_types[i])+"&nbsp;</span> ";

  txt += "panel: <span class='button withtooltip'>generate<span class='tooltip'>"+popup+"</span></span>";
  txt += "<a class='button' onclick='return buttonfunc_act(2);' href='#'>remove colors</a>";
  txt += "<a class='button' onclick='return buttonfunc_act(0);' href='#'>fill</a>";
  txt += "<a class='button' onclick='return buttonfunc_act(1);' href='#'>clear</a>";
  txt += "<a class='button' onclick='return buttonfunc_act(3);' href='#'>replace</a>";
  txt += "<a class='button' onclick='return buttonfunc_act(4);' href='#'>scatter</a>";


  var popup = "";
  popup += "<span style='margin-left:2em;' class='button' onclick='return buttonfunc_act(13);' href='#'>&nbsp;up&nbsp;</span><br>";
  popup += "<span class='button' onclick='return buttonfunc_act(14);' href='#'>left</span>";
  popup += "+";
  popup += "<span class='button' onclick='return buttonfunc_act(15);' href='#'>right</span><br>";
  popup += "<span style='margin-left:2em;' class='button' onclick='return buttonfunc_act(16);' href='#'>down</span>";

  txt += "<span class='button withtooltip'>shift<span class='tooltip'>"+popup+"</span></span>";


  popup = "<span class='button' onclick='return buttonfunc_act(17);'>to cursor</span>";
  popup += "&nbsp;<span class='button' onclick='return buttonfunc_act(18);'>randomly</span><br>";
  popup += "&nbsp;&nbsp;&nbsp;<span class='button' onclick='return buttonfunc_act(19);'>&nbsp;up&nbsp;</span><br>";
  popup += "<span class='button' onclick='return buttonfunc_act(21);'>left</span>+";
  popup += "<span class='button' onclick='return buttonfunc_act(22);'>right</span><br>";
  popup += "&nbsp;&nbsp;&nbsp;<span class='button' onclick='return buttonfunc_act(20);'>down</span>";

  txt += "<span class='button withtooltip'>move syms<span class='tooltip'>"+popup+"</span></span>";


  txt += " | ";
  txt += "<a class='button' onclick='return buttonfunc_act(23);' href='#'>maze</a>";
  txt += "<a class='button' onclick='return buttonfunc_act(24);' href='#'>wallify</a>";
  txt += "<a class='button' onclick='return buttonfunc_act(25);' href='#'>gravestone</a>";
  txt += " | ";
  txt += "<a class='button' onclick='return buttonfunc_act(60);' href='#'>copy</a>";
  txt += "<a class='button' onclick='return buttonfunc_act(26);' href='#'>paste</a>";
  txt += " | ";
  txt += "<a class='button' onclick='return buttonfunc_act(61);' href='#'>add</a>";
  txt += "<a class='button' onclick='return buttonfunc_act(62);' href='#'>del</a>";

  txt += " | ";
  txt += "<a class='button' onclick='return buttonfunc_act(63);' href='#' id='undo_btn'>undo</a>";

  txt += " | <a class='button' onclick='return buttonfunc_act(80);' href='#'>map template</a>";

  tmp.innerHTML = txt;

  tmp = document.getElementById("panel_selection_buttons");
  txt = "";
  txt += "<a class='button' onclick='return buttonfunc_act(64);' href='#'>&lt;-prev</a>";
  txt += "<a class='button' onclick='return buttonfunc_act(65);' href='#'>next-&gt;</a>";
  tmp.innerHTML = txt;
}

function game_symbols_update()
{
    var gamesyms = 0;

    var nhsym_cbox = document.getElementById("nhsym_cbox");
    var angsym_cbox = document.getElementById("angsym_cbox");
    var nhsymselection = document.getElementById("gamesymselection");

    if (nhsym_cbox && nhsym_cbox.checked) gamesyms = (gamesyms | 1);
    if (angsym_cbox && angsym_cbox.checked) gamesyms = (gamesyms | 2);

    nhsymselection.innerHTML = "";
    delete nethack_symbols;
    nethack_symbols = new Array();

    fix_nethacksym_list(gamesyms);
    nethacksym_selection();
}

function fix_nethacksym_list(gamesyms)
{
  var i;
  var txt;
  var ihtml = "";
  var prev = 1;
  var text = "";
  var newarray = new Array();

  if ((gamesyms == undefined) || (gamesyms < 1)) {
      gamesyms = 1;
      set_checkbox_on("nhsym_cbox");
      var nhsym_cbox = document.getElementById("nhsym_cbox");
      if (nhsym_cbox) { nhsym_cbox.checked = true; }
  }

  game_symbols_orig = new Array();

  if ((gamesyms & 1))
      game_symbols_orig = game_symbols_orig.concat(nethack_symbols_array.slice());
  if ((gamesyms & 1) && (gamesyms & 2))
      game_symbols_orig = game_symbols_orig.concat(new Array({}));
  if ((gamesyms & 2))
      game_symbols_orig = game_symbols_orig.concat(angband_symbols_array.slice());

  for (i = 0; i < game_symbols_orig.length; i++) {
    var t = game_symbols_orig[i].text;
    var chr = game_symbols_orig[i].chr;
    var fg = game_symbols_orig[i].fg;
    nethack_symbols[i] = {'chr':chr, 'fg':fg, 'text':t};
  }

  for (i = 1; i < nethack_symbols.length; i++) {
    var fg1,fg2, chr1,chr2;
    fg1 = nethack_symbols[i].fg;
    chr1 = nethack_symbols[i].chr;
    fg2 = nethack_symbols[i-1].fg;
    chr2 = nethack_symbols[i-1].chr;

    if ((fg1 == fg2) && (chr1 == chr2)) {
      text += "<br>" + nethack_symbols[i].text;
      delete nethack_symbols[i].text;
    } else {
      nethack_symbols[prev].text += text;
      text = "";
      prev = i;
    }
  }

  for (i = 0; i < nethack_symbols.length; i++) {
    if (nethack_symbols[i].text != undefined) {
      var fg = nethack_symbols[i].fg;
      var chr = nethack_symbols[i].chr;
      var txt = nethack_symbols[i].text;
      newarray.push({'chr':chr, 'fg':fg, 'text':txt});
    }
  }

  delete nethack_symbols;
  nethack_symbols = newarray;
}

function strip_init()
{
  var i;
  var pnl;
  var txt;
  var dat;
  delete panels;
  delete stripdata;
  for (i = 0; i < (STRIP_WID*STRIP_HEI); i++) {
    editpaneldata = new Panel(PANEL_WID, PANEL_HEI);
    //panel_init();
    pnl = editpaneldata;
    txt = new String("@ Panel " + i + " text goes here.");
    panels[i] = {'panel':pnl, 'text':txt};
  }
  editpaneldata = undefined;

  stripdata = {'author':"Unknown", 'title':"Preview"};

  if ((typeof USR_name == "string") && (USR_name.length > 0)) stripdata.author = USR_name;
}

function strip_nextpanel()
{
  panels[editpanel_strippanel].panel = editpaneldata;
  editpanel_strippanel++;
  if ((editpanel_strippanel >= (STRIP_WID*STRIP_HEI)) || (panels[editpanel_strippanel] == undefined)) { editpanel_strippanel = 0; }
  editpaneldata = panels[editpanel_strippanel].panel;
  panel_redraw();
  show_panel_number();
}

function strip_prevpanel()
{
  panels[editpanel_strippanel].panel = editpaneldata;
  editpanel_strippanel--;
  if ((editpanel_strippanel < 0) || (panels[editpanel_strippanel] == undefined)) { editpanel_strippanel = (STRIP_WID*STRIP_HEI) - 1; }
  editpaneldata = panels[editpanel_strippanel].panel;
  panel_redraw();
  show_panel_number();
}

function strip_editpanel(i)
{
  if ((i != editpanel_strippanel) || (i == -1)) {
    if (i == -1) i = 0;
    editpaneldata = panels[i].panel;
    editpanel_strippanel = i;
    panel_redraw();
    show_panel_number();
  }
}

function strip_copypanel()
{
  editpanel_copy = editpaneldata.clone();
}

function strip_pastepanel()
{
  editpaneldata = editpanel_copy.clone();
  panels[editpanel_strippanel].panel = editpaneldata;
  panel_redraw();
}

function calc_strip_dimensions()
{
  if (FORCE_STRIP_WID > 0) {
    STRIP_WID = FORCE_STRIP_WID;
    STRIP_HEI = Math.ceil(n_panels / STRIP_WID);
    return;
  }

  switch (n_panels) {
  case 1: STRIP_HEI = 1; STRIP_WID = 1; break;
  case 2: STRIP_HEI = 1; STRIP_WID = 2; break;
  case 3: STRIP_HEI = 1; STRIP_WID = 3; break;
  case 4: STRIP_HEI = 2; STRIP_WID = 2; break;
  case 5: STRIP_HEI = 1; STRIP_WID = 5; break;
  case 6: STRIP_HEI = 2; STRIP_WID = 3; break;
  case 7: STRIP_HEI = 1; STRIP_WID = 7; break;
  case 8: STRIP_HEI = 2; STRIP_WID = 4; break;
  case 9: STRIP_HEI = 3; STRIP_WID = 3; break;
  default:
    var wid = 7;
    while ((wid > 0) && ((n_panels / wid) != Math.ceil(n_panels / wid))) {
      wid--;
    }
    STRIP_WID = wid;
    STRIP_HEI = Math.ceil(n_panels / STRIP_WID);
    break;
  }
}

function strip_addpanel()
{
  var i = editpanel_strippanel;
  var z = n_panels;
  var pnl = editpaneldata.clone();

  while (z >= i) {
    panels[z+1] = panels[z];
    z--;
  }
  panels[i] = undefined;
  panels[i] = new Array();
  if (panels[i+1].text) {
      panels[i] = {'panel':pnl, 'text':new String(panels[i+1].text)};
  } else {
      panels[i] = {'panel':pnl, 'text':undefined};
  }
  editpaneldata = panels[i].panel;

  n_panels++;
  calc_strip_dimensions();

  strip_nextpanel();
}

function strip_deletepanel()
{
  var i = editpanel_strippanel;
  var n = n_panels;

  if (n > 1) {

    if (i > 0) {
      strip_prevpanel();
    } else {
      strip_nextpanel();
    }

    var oldpanel = panels.splice(i,1);
    delete oldpanel.panel;
    delete oldpanel;

    if (i == 0) {
      strip_editpanel(0);
    }

    n_panels--;

    calc_strip_dimensions();

    panel_redraw();
  }
}


function strip_preview_panels()
{
  var elem = document.getElementById("preview_strip");
  var x,y, dx,dy, i;

  var txt = "";

  var popup = document.getElementById("preview_popup_cbox");

  var popup_txt = '';
/*
  if (preview_window && (preview_window.closed() == false) && popup && (popup.checked != true)) {
	preview_window.document.close();
  }
*/
  if ((preview_checkbox.checked != true) && (popup && (popup.checked != true))) return;

  txt += '<table cellspacing="0" cellpadding="0" align="center">';
  txt += '<tbody>';
  txt += '<tr>';
  txt += '<td class="conttl">'+stripdata.title+'</td>';
  txt += '<td class="conttr" align="right"><b>'+stripdata.author+'</b></td>';
  txt += '</tr>';

  txt += '<tr>';
  txt += '<td class="contpic" colspan="2">';
  txt += '<table class="comic" width="100">';
  txt += '<tbody>';
  for (y = 0; y < STRIP_HEI; y++) {
    txt += '<tr>';
    for (x = 0; x < STRIP_WID; x++) {
      i = y * STRIP_WID + x;
      if ((panels[i] == undefined) || (i > panels.length)) {
	continue;
      }
      txt += '<td class="comic xlink" id="comicpanel'+i+'" valign="top" onClick="strip_editpanel('+i+');">';
      if (panels[i].panel != undefined) {

	  if (panels[i].panel.cursor != undefined) {
	      p_cursor_x = panels[i].panel.cursor.x;
	      p_cursor_y = panels[i].panel.cursor.y;
	  } else {
	      p_cursor_x = p_cursor_y = -1;
	  }

	txt += '<div>';
	txt += '<pre id="comicpanel'+i+'">';
	for (dy = 0; dy < panels[i].panel.HEI; dy++) {
	  for (dx = 0; dx < panels[i].panel.WID; dx++) {
	      var sclass = '';
	      var chr = '#';
	      var dat = panels[i].panel.get_data(dx,dy);
	      if (p_cursor_x == dx && p_cursor_y == dy) { sclass = "f_cur"; }
	      if (dat) {
		  var chr = dat.chr;
		  var bold = dat.bold;
		  var rev = dat.rev;
		  var ul = dat.ul;
		  var fg  = dat.fg;
		  if (!chr) chr = '.';
		  else if (chr == '<') chr = '&lt;';
		  else if (chr == '>') chr = '&gt;';
		  else if (chr == '&') chr = '&amp;';
		  else if (chr == '~') chr = '&tilde;';
		  if (fg && (fg != "gray")) {
		      if (rev && (rev == 1)) {
			  sclass += " f_black b_"+fg;
		      } else {
			  sclass += " f_"+fg;
		      }
		  }
		  if (bold && (bold == 1)) sclass += " f_bold";
		  if (ul && (ul == 1)) sclass += " f_ul";
	      }
	      txt += '<span';
	      if (sclass != '') txt += ' class="'+sclass+'"';
	      txt += '>' + chr + '</span>';
	  }
	  txt += "\n";
	}
	txt += '</pre>';
	if (panels[i].text) {
	  var txtlines = panels[i].text.split(/\n/);
	  txt += '<div class="txt">';
	  for (tl = 0; tl < txtlines.length; tl++) {
	    txt += '<p>'+txtlines[tl];
	  }
	  txt += '</div>';
	}
	txt += '</div>';
      }
      txt += '</td>';
    }
    txt += '</tr>';
  }
  txt += '<tr>';
  txt += '<td class="copyright" colspan="'+(STRIP_WID)+'">'+USR_dudley_root_url+'</td>';
  txt += '</tr>';
  txt += '</tbody>';
  txt += '</table>';
  txt += '</td>';
  txt += '</tr>';

  txt += '<tr>';
  txt += '<td class="footnote" colspan="3">';
  if (stripdata.footnote) { txt += stripdata.footnote; }
  txt += '</td>';
  txt += '</tr>';


  txt += '</tbody>';
  txt += '</table>';

  if (preview_checkbox.checked == true) {
    elem.innerHTML = txt;
    var tmp = document.getElementById("comicpanel"+editpanel_strippanel);
    tmp.style.borderColor = '#bfb';
  }

  if (popup && (popup.checked == true)) {
    txt = txt.replace(/ onClick=.strip_editpanel/g, ' onClick="window.opener.strip_editpanel');
    if (preview_window == undefined || preview_window.closed) {
	preview_window = window.open('', null, 'width=600, height=400, resizeable=yes,scrollbars=yes');
	preview_window.document.open("text/html","replace");
	preview_window.document.write('<html>'+
				      '<head>'+
				      '<link rel="stylesheet" type="text/css" media="screen" href="diydudley.css">'+
				      '<title>Strip Preview - Dudley D-I-Y</title>'+
				      '</head>'+
				      '<body>'+
				      '<div id="preview_strip">'+txt+'</div>'+
				      '</body>'+
				      '</html>');
	preview_window.document.close();
    } else {
      var tmp = preview_window.document.getElementById("preview_strip");
      if (tmp) tmp.innerHTML = txt;
      var tmp = preview_window.document.getElementById("comicpanel"+editpanel_strippanel);
      if (tmp) tmp.style.borderColor = '#bfb';
    }
  }
}

function set_visibility(tmp, toggle)
{
  if (toggle) {
    tmp.style.visibility='visible';
    tmp.style.display='block';
  } else {
    tmp.style.display='none';
    tmp.style.visibility='hidden';
  }
}


function toggle_preview(x, y)
{
  var tmp = document.getElementById(x);
  var section = document.getElementById(y);

  set_visibility(section, tmp.checked);
}

function set_strip_author()
{
  var tmp = document.getElementById("strip_author_text");
  stripdata.author = tmp.value;
  strip_preview_panels();
  panel_showcode();
}

function set_strip_footnote()
{
  var tmp = document.getElementById("strip_footnote_text");
  stripdata.footnote = new String(tmp.value);
  strip_preview_panels();
  panel_showcode();
}

function accept_new_panels_size()
{
  var nw = parseInt(document.getElementById("change_level_wid").value);
  var nh = parseInt(document.getElementById("change_level_hei").value);
  var do_all = document.getElementById("resize_all_panels").checked;

  if (nw == undefined || nh == undefined) return;

  var curpanel_num = editpanel_strippanel;

  var i;
  var mw, mh;
  var x, y;

  mw = 0;
  mh = 0;
  for (i = 0; i < n_panels; i++) {
    mw = Math.max(mw, panels[i].panel.WID);
    mh = Math.max(mh, panels[i].panel.HEI);
  }

  if ((nw < 5) || (nh < 5)) {
    document.getElementById("change_level_wid").value = editpaneldata.WID;
    document.getElementById("change_level_hei").value = editpaneldata.HEI;
    change_panels_size();
    output_strip_data_edit();
    return;
  }

  if (((nw < editpaneldata.WID) || (nh < editpaneldata.HEI)) ||
     (do_all && ((nw < mw) || (nh < mh)))) {
    var ans = confirm("Shrinking the panel(s) will lose some of the map data, are you sure?");
    if (ans) {
      /* nothing */
    } else {
      document.getElementById("change_level_wid").value = editpaneldata.WID;
      document.getElementById("change_level_hei").value = editpaneldata.HEI;
      change_panels_size();
      output_strip_data_edit();
      return;
    }
  }

  if (do_all) {

    PANEL_WID = nw;
    PANEL_HEI = nh;

    document.getElementById("change_level_wid").value = nw;
    document.getElementById("change_level_hei").value = nh;

    for (i = 0; i < n_panels; i++) {
      panels[i].panel.save_undopoint();
      panels[i].panel.resize(nw, nh);
      panels[i].panel.check_undopoint();
    }
    editpaneldata.save_undopoint();
    editpaneldata.resize(nw, nh);
    editpaneldata.check_undopoint();
  } else {
    editpaneldata.save_undopoint();
    editpaneldata.resize(nw, nh);
    editpaneldata.check_undopoint();
  }

  show_editpanel_textarea();
  strip_editpanel(-1);
  strip_editpanel(curpanel_num);
  show_edit_panel();
  update_toolbar();
  show_buttons();
  show_current_pen();
  show_saved_pens();
  color_selection();
  char_selection();
  nethacksym_selection();
  output_strip_data_edit();
  panel_showcode();
  strip_preview_panels();
  show_panel_number();
  change_panels_size();
  output_strip_data_edit();
}

function change_panels_size()
{
  var tmp = document.getElementById("change_panels_size");
  tmp.innerHTML =
    '(<input '+getkeyb_handler_string()+' type="text" maxlength="4" size="4" name="change_level_wid" id="change_level_wid" value="' + editpaneldata.WID + '">, ' +
    '<input '+getkeyb_handler_string()+' type="text" maxlength="4" size="4" name="change_level_hei" id="change_level_hei" value="' + editpaneldata.HEI + '">)' +
    '<label><input type="checkbox" name="resize_all_panels" id="resize_all_panels">Resize all panels</label>' +
    '<a class="button" onclick="accept_new_panels_size();return false;" href="#">OK</a>'+
    '<a class="button" onclick="output_strip_data_edit();return false;" href="#">cancel</a>';
}

function accept_new_force_strip_width()
{
  var nw = parseInt(document.getElementById("change_force_strip_wid").value);

  if ((nw != FORCE_STRIP_WID) && (nw >= 0) && (nw <= n_panels)) {

    FORCE_STRIP_WID = nw;
    calc_strip_dimensions();
    show_edit_panel();
    update_toolbar();
    show_buttons();
    show_current_pen();
    show_saved_pens();
    color_selection();
    char_selection();
    nethacksym_selection();
    output_strip_data_edit();
    show_editpanel_textarea();
    panel_showcode();
    strip_preview_panels();
    show_panel_number();
    panel_redraw();
  } else output_strip_data_edit();
}

function change_force_strip_width()
{
  var tmp = document.getElementById("change_force_strip_width");
  tmp.innerHTML =
    '<input '+getkeyb_handler_string()+' type="text" maxlength="4" size="4" name="change_force_strip_wid" id="change_force_strip_wid" value="' + FORCE_STRIP_WID + '">' +
    '<a class="button" onclick="accept_new_force_strip_width();return false;" href="#">OK</a>'+
    '<a class="button" onclick="output_strip_data_edit();return false;" href="#">cancel</a>';
}

function output_strip_data_edit()
{
  var tmp = document.getElementById("strip_data_edit");
  var txt = "";

  var foot = stripdata.footnote;

  if (foot == undefined) foot = "";

  foot = foot.replace(/"/g, '&quot;');
  var authstr = stripdata.author.replace(/"/g, '&quot;');

  txt += "Author: ";
  txt += '<input '+getkeyb_handler_string()+' type="text" id="strip_author_text" size="80" onchange="set_strip_author();" value="'+authstr+'">';
  txt += '<br>';
  txt += "Footnote: ";
  txt += '<input '+getkeyb_handler_string()+' type="text" id="strip_footnote_text" size="80" onchange="set_strip_footnote();" value="'+foot+'">';

  txt += '<br>';
  txt += "Strip panel size:";
  txt += '<span id="change_panels_size"><b>(' + PANEL_WID + ', ' + PANEL_HEI + ')</b>&nbsp;<a class="button" onclick="change_panels_size();return false;" href="#">change</a></span>';

  txt += '<br>';
  txt += "Strip width: ";
  txt += '<span id="change_force_strip_width"><b>';
  if (FORCE_STRIP_WID > 0) {
    txt += FORCE_STRIP_WID + ' panel';
    if (FORCE_STRIP_WID > 1) txt += 's';
  } else {
    txt += 'Automatic';
  }
  txt += '</b>&nbsp;<a class="button" onclick="change_force_strip_width();return false;" href="#">change</a></span>';

  tmp.innerHTML = txt;
}

function handle_keyb(e)
{
  if( !e ) {
    //if the browser did not pass the event information to the
    //function, we will have to obtain it from the event register
    if( window.event ) {
      //Internet Explorer
      e = window.event;
    } else {
      //total failure, we have no way of referencing the event
      return;
    }
  }

  shift_key = e.shiftKey;
  ctrl_key = e.ctrlKey;
  alt_key = e.altKey;

  if( typeof( e.keyCode ) == 'number'  ) {
    //DOM
    e = e.keyCode;
  } else if( typeof( e.which ) == 'number' ) {
    //NS 4 compatible
    e = e.which;
  } else if( typeof( e.charCode ) == 'number'  ) {
    //also NS 6+, Mozilla 0.9+
    e = e.charCode;
  } else {
    //total failure, we have no way of obtaining the key code
    return;
  }

  var str = String.fromCharCode(e);
  if (shift_key)
    str = str.toUpperCase();
  else
    str = str.toLowerCase();

    /* is it a saved pen quick key? */
    for (i = 0; i < saved_pens.length; i++) {
      if ((saved_pens[i].key != undefined) && (str == saved_pens[i].key)) {
	  pen_set_fg_chr(undefined, saved_pens[i].fg, escape(saved_pens[i].chr));
	  return;
      }
    }

    for (i = 0; i < keybindings.length; i++) {
	if (keybindings[i].key == str) {
	    buttonfunc_act(keybindings[i].act);
	    return;
	}
    }

    /* ESC */
    if (e == 27) {
	show_pen_selection_popup(1); // close it
    }

}

function set_checkbox_on(cbox)
{
  if (cbox != undefined) {
    cbox.selected = 'true';
  }
}

function update_editpanel_textarea(dir)
{
  tmp = document.getElementById("editpanel_textarea");
  if (tmp == undefined) return;
  if (dir == 1) { /* textarea -> editpanel */
    var str = tmp.value;
    if (str.length > (editpaneldata.HEI * editpaneldata.WID)) {
	str = str.substr(0, (editpaneldata.HEI * editpaneldata.WID));
    }
    var arr = str.split("\n");
    editpaneldata.save_undopoint();
    for (y = 0; y < editpaneldata.HEI; y++) {
      var line = arr[y];
      if (line != undefined) {
	for (x = 0; x < editpaneldata.WID; x++) {
	  var dat = editpaneldata.get_data(x,y);
	  var chr = line.substr(x, 1);
	  var fg = pen_getcolor(pen.fg);
	  if ((chr != undefined) && (chr != dat.chr) && (chr >= ' ') && (chr <= '~'))
	    editpaneldata.set_data(x,y, {'chr':chr, 'fg':fg});
	}
      }
    }
    editpaneldata.check_undopoint();
    panel_redraw();
  } else { /* editpanel -> textarea */
    str = "";
    for (y = 0; y < editpaneldata.HEI; y++) {
      for (x = 0; x < editpaneldata.WID; x++) {
	  var dat = editpaneldata.get_data(x,y);
	  str += dat.chr;
      }
      if (y < (editpaneldata.HEI-1)) str += "\n";
    }
    tmp.value = str;
  }
}

function show_editpanel_textarea()
{
  var tmp = document.getElementById("editpanel_textarea_div");
  var txt = "<textarea onchange='update_editpanel_textarea(1);' "+getkeyb_handler_string()+" id='editpanel_textarea' rows='"+editpaneldata.HEI+"' cols='"+editpaneldata.WID+"'></textarea>";
  tmp.innerHTML = txt;
}

function popup_help()
{
    var helpwin = window.open('diydudley-help.html', null, 'width=500, height=600, resizeable=yes,scrollbars=yes');
}

function get_buttonfunc_act_desc(act)
{
    var i;
    for (i = 0; i < buttonfunc_act_desc.length; i++) {
	if (buttonfunc_act_desc[i].act == act) {
	    return buttonfunc_act_desc[i].desc;
	}
    }
    return "Unknown action?";
}

function keybindings_clear()
{
    eraseCookie(cookie_prefix + "keybindings");
    keybindings = default_keybindings;
}

function keybindings_save()
{
    var txt = "";
    var i;
    for (i = 0; i < keybindings.length; i++) {
	txt += keybindings[i].key.charCodeAt(0)+":"+keybindings[i].act;
	if (i < keybindings.length - 1) { txt += ","; }
    }
    createCookie(cookie_prefix + "keybindings", txt, 365);
}


function keybindings_load()
{
    var str = readCookie(cookie_prefix + "keybindings");
    if (str) {
	var i;
	var arr = str.split(",");
	keybindings = new Array();
	for (i = 0; i < arr.length; i++) {
	    var tmp = arr[i].split(":");
	    var key = String.fromCharCode(tmp[0]);
	    var act = parseInt(tmp[1]);
	    keybindings.push({'key':key, 'act':act});
	    bindable_key_remove(key);
	}
    }
}

function config_keybind_input_error(t)
{
    if (!t) return
    if ((t.value.length < 1) || (t.value.length > 1) || (bindable_key_isfree(t.value) == false))
	t.style.background = 'pink';
    else t.style.background = 'white';
}

function get_keybind_table_tr(i, key, act, notr)
{
    var txt = "";
    if (!notr) { txt += "<tr id='keybind_table_row_"+i+"'>"; }
    txt += "<td><input type='text' size='1' maxlength='1' id='keybind_key_"+i+"' value='" +key + "' onkeyup='window.opener.config_keybind_input_error(this);'></td>";
    txt += "<td>" + mk_buttonfunc_desc_select(i, act) + "</td>";
    txt += "<td><span class='button' onClick='window.opener.config_window_keybind_delbtn("+i+");'>del</span></td>";
    if (!notr) { txt += "</tr>"; }
    return txt;
}

function keybindings_add()
{
    var len = configuration_window.document.getElementById("max_keybind_idx");
    if (!len) return;
    len.value = parseInt(len.value) + 1;
    var keytable = configuration_window.document.getElementById("keybindings_table");
    if (!keytable) return;
    var tr = document.createElement('tr');
    var key = bindable_key_get();
    if (key == undefined) key = '?';
    tr.id = 'keybind_table_row_' + len.value;
    tr.innerHTML = get_keybind_table_tr(len.value, key, 0, 1);
    keytable.appendChild(tr);
}

function config_window_keybind_delbtn(i)
{
    var e = configuration_window.document.getElementById("keybind_table_row_"+i);
    if (!e) return;
    e.style.display='none';
    var key = configuration_window.document.getElementById("keybind_key_"+i);
    if (!key) return;
    key.value = '';
}

function bindable_keys_reset()
{
    var i;
    keybinding_keys = default_keybinding_keys;
    for (i = 0; i < saved_pens.length; i++) {
	if (saved_pens[i].key != undefined) {
	    bindable_key_remove(saved_pens[i].key);
	}
    }
    for (i = 0; i < keybindings.length; i++) {
	if (keybindings[i].key != undefined) {
	    bindable_key_remove(keybindings[i].key);
	}
    }
}

function config_window_reset()
{
    keybindings_clear();
    saved_pens_restore();
    bindable_keys_reset();
}

function config_window_nosave()
{
    var i;
    for (i = 0; i < saved_pens.length; i++)
	saved_pens[i].del = 0;
}

function config_window_save()
{
    if (configuration_window == undefined || configuration_window.closed) return false;
    var i;
    var len = configuration_window.document.getElementById("max_keybind_idx");
    if (!len) return false;
    keybinding_keys = default_keybinding_keys;
    keybindings = new Array();
    for (i = 0; i <= len.value; i++) {
	var e = configuration_window.document.getElementById("keybind_key_"+i);
	var a = configuration_window.document.getElementById("keybind_act_"+i);
	if (e && a) {
	    var ch = e.value.charCodeAt(0);
	    if ((ch >= ' '.charCodeAt(0)) && (ch <= '~'.charCodeAt(0))) {
		keybindings.push({'key':e.value, 'act':parseInt(a.options[a.selectedIndex].value)});
		bindable_key_remove(e.value);
	    }
	}
    }
    keybindings_save();

    for (i = saved_pens.length - 1; i > -1; i--) {
	if (saved_pens[i] != undefined) {
	    if (saved_pens[i].del == 1) {
		old_pen_remove(i);
	    } else {
		var e = configuration_window.document.getElementById("pen_quick_key_" + i);
		if (e) {
		    saved_pens[i].key = e.value;
		    bindable_key_remove(e.value);
		}
	    }
	}
    }
    if (saved_pens.length == 0) saved_pens_restore();

    return false;
}

function mk_buttonfunc_desc_select(id, act)
{
    var txt = '<select id="keybind_act_'+id+'">';
    var i;
    for (i = 0; i < buttonfunc_act_desc.length; i++) {
	txt += '<option value="'+buttonfunc_act_desc[i].act+'"';
	if (buttonfunc_act_desc[i].act == act) {
	    txt += ' selected';
	}
	txt += '>' + buttonfunc_act_desc[i].desc + '</option>';
    }
    txt += '</select>';
    return txt;
}

function config_window()
{
    if ((configuration_window != undefined) && !configuration_window.closed) return;

    var i;
    var txt = "<h2>Configuration</h2>";

    txt += "<h3>Key bindings</h3>";
    txt += "<input type='hidden' id='max_keybind_idx' value='" + keybindings.length + "'>";
    txt += "<table id='keybindings_table'>";
    txt += "<tr><th>Key</th><th>Description</th><th>&nbsp;</th></tr>";

    for (i = 0; i < saved_pens.length; i++) {
	if ((saved_pens[i].key != undefined)) {
	    txt += "<tr>";
	    txt += "<td><input type='text' size='1' maxlength='1' id='pen_quick_key_"+i+"' value='" + saved_pens[i].key + "'></td>";
	    txt += "<td>Set Pen to <span class='saved_pens'>" + penset_span_noclick(saved_pens[i]) + "</span></td>";
	    txt += "<td><span class='button' onClick='window.opener.saved_pens["+i+"].del=1; this.parentNode.parentNode.style.display=\"none\";'>del</span></td>";
	    txt += "</tr>";
	    saved_pens[i].del=0;
	}
    }

    for (i = 0; i < keybindings.length; i++) {
	txt += get_keybind_table_tr(i, keybindings[i].key, keybindings[i].act, 0);
    }
    txt += "</table>";

    txt += "<span class='button' onClick='window.opener.keybindings_add();'>Add</span>";

    txt += "<hr>";

    txt += "<a class='button' onClick='window.opener.config_window_save();window.close(); return false;' href='#'>Save</a>";
    txt += " | <a class='button' onClick='window.opener.config_window_nosave();window.close(); return false;' href='#'>Close without saving</a>";
    txt += " | <a class='button' onClick='window.opener.config_window_reset();window.close(); return false;' href='#'>Reset to defaults</a>";

    var cw = window.open('', null, 'width=800, height=800, resizeable=yes,scrollbars=yes');
    cw.document.open("text/html", "replace");
    cw.document.write('<html>'+
		      '<head>'+
		      '<link rel="stylesheet" type="text/css" media="screen" href="diydudley.css">'+
		      '<title>Configuration - Dudley D-I-Y</title>'+
		      '</head>'+
		      '<body id="configpage">'+txt+
		      '</body>'+
		      '</html>');
    cw.document.close();
    configuration_window = cw;
}

function maptemplate_panel_mouse_hover(x,y,on)
{
  function maptemplate_mousehover_mark_on(x1,y1)
    {
      tmp = map_template_window.document.getElementById("templatemap_panelpos"+x1+"x"+y1);
      if (tmp) tmp.style.background = "red";
    }

  function maptemplate_mousehover_mark_off(x1,y1)
    {
      tmp = map_template_window.document.getElementById("templatemap_panelpos"+x1+"x"+y1);
      if (tmp) tmp.style.background = "black";
    }
    var w = editpaneldata.WID;
    var h = editpaneldata.HEI;
    var w2 = Math.floor((w/2));
    var h2 = Math.floor((h/2));

    var wa = 1;
    var ha = 1;
    if (w%2) wa = 0;
    if (h%2) ha = 0;

    if (x + w2 >= curr_maptemplatedata.WID) x = curr_maptemplatedata.WID - w2 - 1;
    else if (x - w2 < 0) x = w2;
    if (y + h2 >= curr_maptemplatedata.HEI) y = curr_maptemplatedata.HEI - h2 - 1;
    else if (y - h2 < 0) y = h2;

    if (on) {
	curr_maptemplatedata.draw_rect_filled((x-w2), (y-h2), (x+w2-wa), (y+h2-ha), maptemplate_mousehover_mark_on);
    } else {
	curr_maptemplatedata.draw_rect_filled((x-w2), (y-h2), (x+w2-wa), (y+h2-ha), maptemplate_mousehover_mark_off);
    }

}

function maptemplate_panel_update(ev, x, y)
{
    var w = editpaneldata.WID;
    var h = editpaneldata.HEI;
    var w2 = Math.floor(w/2);
    var h2 = Math.floor(h/2);
    var i, j;

    if (x + w2 >= curr_maptemplatedata.WID) x = curr_maptemplatedata.WID - w2 - 1;
    else if (x - w2 < 0) x = w2;
    if (y + h2 >= curr_maptemplatedata.HEI) y = curr_maptemplatedata.HEI - h2 - 1;
    else if (y - h2 < 0) y = h2;

    editpaneldata.save_undopoint();

    for (i = x-w2; i <= (x+w2); i++) {
	for (j = y-h2; j <= (y+h2); j++) {
	    var dat = curr_maptemplatedata.get_data(i,j);
	    editpaneldata.set_data(i-x+w2,j-y+h2, dat);
	}
    }

    editpaneldata.set_cursor(-1, -1);
    editpaneldata.check_undopoint();
    panel_redraw();
}

function maptemplate_getpanel(map)
{
  var txt = "";
  txt += "<div class='panelborder'>";
  txt += "<pre class='panel'>";
  for (y = 0; y < map.HEI; y++) {
    for (x = 0; x < map.WID; x++) {
      dat = map.get_data(x,y);
      txt += "<span class='hovered'";
      txt += " id='templatemap_panelpos"+x+"x"+y+"'";
      txt += " onmouseover='window.opener.maptemplate_panel_mouse_hover("+x+","+y+",1);'";
      txt += " onmouseout='window.opener.maptemplate_panel_mouse_hover("+x+","+y+",0);'";
      txt += " onClick='window.opener.maptemplate_panel_update(event, "+x+","+y+");'>";
      txt += get_data_span({'chr':dat.chr, 'fg':dat.fg});
      txt += "</span>";
    }
    txt += "<br>";
  }
  txt += "</pre>";
  txt += "</div>";
  return txt;
}

function maptemplate_get_panelstr(tmpl, forcegen)
{
    var txt = "";
    if (map_templates_panels[tmpl] && (forcegen == 0)) {
	curr_maptemplatedata = map_templates_panels[tmpl];
    } else {
	curr_maptemplatedata = new Panel(5,5);
	curr_maptemplatedata.from_str(map_templates[tmpl].map);
	if (map_templates[tmpl].replaces != undefined) {
	    for (i = 0; i < map_templates[tmpl].replaces.length; i++) {
		var fromsym = map_templates[tmpl].replaces[i].from;
		var tosym = map_templates[tmpl].replaces[i].to;
		var chance = ((map_templates[tmpl].replaces[i].chance != undefined) ? map_templates[tmpl].replaces[i].chance : 100);
		curr_maptemplatedata.random_replace(fromsym, tosym, chance);
	    }
	}
	map_templates_panels[tmpl] = curr_maptemplatedata;
    }

    var tmpl_name = map_templates[tmpl].name;

    txt += '<h4>Template: '+tmpl_name+'</h4>';
    txt += maptemplate_getpanel(curr_maptemplatedata);
    return txt;
}

function maptemplate_window_handler(tmpl, forcegen)
{
    var e = map_template_window.document.getElementById("map_template_display_div");
    if (!e) return;
    var txt = "";
    var i;

    txt += "<select onchange='window.opener.maptemplate_window_handler(this.options[this.selectedIndex].value, 0)'>";
    for (i = 0; i < map_templates.length; i++) {
	txt += "<option value='"+i+"'";
	if (i == tmpl) txt += " selected";
	txt += ">"+map_templates[i].name+"</option>";
    }
    txt += "</select>";

    txt += "<hr>";

    txt += maptemplate_get_panelstr(tmpl, forcegen);
    e.innerHTML = txt;
    selected_map_template = tmpl;
}

function maptemplate_window()
{
    if ((map_template_window != undefined) && !map_template_window.closed) return;

    var i;
    var txt = "<h2>Map Templates</h2>";

    txt += "<div id='map_template_display_div'></div>";

    txt += "<hr>";
    txt += "<a class='button' onClick='window.close(); return false;' href='#'>Close</a>";

    var cw = window.open('', null, 'width=800, height=800, resizeable=yes,scrollbars=yes');
    cw.document.open("text/html", "replace");
    cw.document.write('<html>'+
		      '<head>'+
		      '<link rel="stylesheet" type="text/css" media="screen" href="diydudley.css">'+
		      '<title>Map Templates - Dudley D-I-Y</title>'+
		      '</head>'+
		      '<body id="maptemplatepage" onload="window.opener.maptemplate_window_handler(window.opener.selected_map_template, 0);">'+txt+
		      '</body>'+
		      '</html>');
    cw.document.close();
    map_template_window = cw;
}

function pageload_init()
{
  code_checkbox = document.getElementById("code_cbox");
  preview_checkbox = document.getElementById("preview_cbox");

  old_pen_parsecookiestr(readCookie(cookie_prefix + "saved_pens"));
  keybindings_load();

  game_symbols_update();
  /*fix_nethacksym_list();*/

  strip_init();

  strip_editpanel(-1);

  if (typeof POST_comicstrip == "string") {
     parse_code(POST_comicstrip);
  } else {
     editpaneldata.draw_random();
  }
  panel_redraw();
  update_toolbar();
  show_buttons();
  show_current_pen();
  show_saved_pens();
  color_selection();
  char_selection();
  nethacksym_selection();
  output_strip_data_edit();
  panel_showcode();
  panel_download_save();
  editpanel_dirty = 0;
  set_undobtn_state();

  strip_preview_panels();
  show_panel_number();

  if (USR_login == undefined) {
      add_POST_error("USR_login is undefined. This is a bug.");
  } else if (USR_login == 0) {
      add_POST_error("<b>You are not logged in.</b> You can still edit and download the strip, but you need to login before you can save it.");
  }

  show_POST_status();

  set_checkbox_on("code_cbox");
  set_checkbox_on("nhsym_cbox");
  set_checkbox_on("stripinfo_cbox");
  set_checkbox_on("preview_cbox");

  document.onkeyup = handle_keyb;

  document.addEventListener('mousemove', record_mouse_cursor_pos, false);
}
