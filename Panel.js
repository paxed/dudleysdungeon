
function Panel(wid, hei)
{
  this.WID = ((wid == undefined) ? 20 : wid);
  this.HEI = ((hei == undefined) ?  9 : hei);

  this.mapdata = new Array(this.WID * this.HEI);
  this.cursor = {'x':-1, 'y':-1};

  this.set_cursor = function(x,y)
      {
	  this.cursor = {'x':x, 'y':y};
      };

  this.save_undopoint = function()
      {
	  if (this.undostate == undefined) {
	      this.undostate = new Array();
	  }
	  this.undostate.push(this.clone());
      };

  this.has_undo = function()
      {
	  if (this.undostate != undefined) {
	      if (this.undostate.length > 0) {
		  return 1;
	      }
	  }
	  return 0;
      };

  this.undo = function()
      {
	  if (this.undostate != undefined) {
	      if (this.undostate.length > 0) {
		  var tmpobj = this.undostate.pop();
		  this.WID = tmpobj.WID;
		  this.HEI = tmpobj.HEI;
		  this.mapdata = tmpobj.mapdata;
		  this.cursor = tmpobj.cursor;
	      }
	  }
      };

  this.clone = function()
    {
      var newobj = new Panel(this.WID, this.HEI);
      for (y = 0; y < this.HEI; y++) {
	for (x = 0; x < this.WID; x++) {
	  newobj.set_data(x,y, this.get_data(x,y));
	}
      }
      newobj.cursor = {'x':this.cursor.x, 'y':this.cursor.y};
      return newobj;
    };

  this.resize = function(wid,hei)
    {
      var tmppanel = this.clone();
      var x,y;

      this.WID = wid;
      this.HEI = hei;
      delete this.mapdata;
      this.mapdata = new Array(this.WID * this.HEI);
      this.fill({'chr':' '});

      for (y = 0; y < Math.min(this.HEI, tmppanel.HEI); y++) {
	for (x = 0; x < Math.min(this.WID, tmppanel.WID); x++) {
	  var dat = tmppanel.get_data(x,y);
	  if (dat != undefined) this.set_data(x,y, dat);
	}
      }
      delete tmppanel;
    };

  this.inmap = function(x,y)
    {
      if (x >= 0 && y >= 0 && x < this.WID && y < this.HEI) return 1;
      return 0;
    };

  this.mapidx = function(x,y) { return y*this.WID + x; };

  this.set_data = function(x,y,dat)
    {
      if (this.inmap(x,y)) {
	this.mapdata[this.mapidx(x,y)] = {'chr':dat.chr, 'fg':dat.fg};
      }
    };

  this.get_field = function(x,y,field)
    {
      if (this.inmap(x,y) && this.mapdata[this.mapidx(x,y)][field]) {
	return this.mapdata[this.mapidx(x,y)][field];
      } else {
	return undefined;
      }
    };

  this.get_data = function(x,y)
    {
      if (this.inmap(x,y)) return this.mapdata[this.mapidx(x,y)];
      return {'chr':' '};
      /*return undefined;*/
    };

  this.fill = function(dat)
    {
      var p;
      for (y = 0; y < this.HEI; y++) {
	for (x = 0; x < this.WID; x++) {
          p = {'chr':dat.chr, 'fg':pen_getcolor(dat.fg)};
	  this.set_data(x,y, p);
	}
      }
    };

  this.clear = function() { this.fill({'chr':' '}); };

  this.remove_colors = function()
    {
      for (y = 0; y < this.HEI; y++) {
	for (x = 0; x < this.WID; x++) {
	  dat = this.get_data(x,y);
	  delete dat.fg;
	  this.set_data(x,y, dat);
	}
      }
    };

  this.set_char_colors = function(chr, fg)
    {
      for (y = 0; y < this.HEI; y++) {
	for (x = 0; x < this.WID; x++) {
	  dat = this.get_data(x,y);
	  if (dat.chr == chr) {
	    dat.fg = fg;
	    this.set_data(x,y, dat);
	  }
	}
      }
    };

  this.shift = function(dir)
      {
	  var tmppanel = this.clone();
	  var dx = 0, dy = 0;
	  var cx = 0, cy = 0;
	  switch (dir) {
	  case 0: dy = 1; cy = this.HEI-1; break;
	  case 1: dx = this.WID-1; cx = 1; break;
	  case 2: dy = this.HEI-1; cy = 1; break;
	  case 3: dx = 1; cx = this.WID-1; break;
	  }
	  for (x = 0; x < this.WID; x++) {
	      for (y = 0; y < this.HEI; y++) {
		  this.set_data(x,y, tmppanel.get_data((x+dx)%this.WID,(y+dy)%this.HEI));
	      }
	  }
	  if ((this.cursor.x != -1) && (this.cursor.x != undefined)) {
	      this.cursor = {'x':(this.cursor.x+cx)%this.WID, 'y':(this.cursor.y+cy)%this.HEI};
	  }
	  delete tmppanel;
      };

  this.draw_rect = function(x1,y1,x2,y2, dat)
    {
      if (typeof dat == 'function') {
	for (y = Math.min(y1,y2); y <= Math.max(y1,y2); y++) {
	  dat(x1,y);
	  dat(x2,y);
	}
	for (x = Math.min(x1,x2); x <= Math.max(x1,x2); x++) {
	  dat(x,y1);
	  dat(x,y2);
	}
      } else {
	for (y = Math.min(y1,y2); y <= Math.max(y1,y2); y++) {
	  this.set_data(x1,y, dat);
	  this.set_data(x2,y, dat);
	}
	for (x = Math.min(x1,x2); x <= Math.max(x1,x2); x++) {
	  this.set_data(x,y1, dat);
	  this.set_data(x,y2, dat);
	}
      }
    };

  this.draw_rect_filled = function(x1,y1,x2,y2, dat)
    {
      if (typeof dat == 'function') {
	for (y = Math.min(y1,y2); y <= Math.max(y1,y2); y++) {
	  for (x = Math.min(x1,x2); x <= Math.max(x1,x2); x++) {
	    dat(x,y);
	  }
	}
      } else {
	for (y = Math.min(y1,y2); y <= Math.max(y1,y2); y++) {
	  for (x = Math.min(x1,x2); x <= Math.max(x1,x2); x++) {
	    this.set_data(x,y, dat);
	  }
	}
      }
    };

  this.draw_line_h = function(x1,y, x2, dat)
    {
      for (x = x1; x <= x2; x++) {
	this.set_data(x,y, dat);
      }
    };

  this.draw_line_v = function(x,y1, y2, dat)
    {
      for (y = y1; y <= y2; y++) {
	this.set_data(x,y, dat);
      }
    };

  this.draw_room = function(x1,y1,x2,y2, filled)
    {
      if (filled & 1)
      this.draw_rect_filled(x1,y1,x2,y2, {'chr':"."});

      this.draw_line_v(x1,y1,y2, {'chr':"|"});
      this.draw_line_v(x2,y1,y2, {'chr':"|"});

      this.draw_line_h(x1,y1,x2, {'chr':"-"});
      this.draw_line_h(x1,y2,x2, {'chr':"-"});

      /* random doors */
      if (filled & 2) {
	var hei = (y2-y1);
	var wid = (x2-x1);
	var x = x1;
	var y = y1;
	var ndoors = Math.floor((Math.random() * (wid+hei)) / 5);
	while (ndoors > 0) {
	  var tmp = Math.floor(Math.random() * 4);
	  var dx, dy, horiz = 0;
	  var doorsym = {'chr':"+", 'fg':'brown'};
	  switch (tmp) {
	  case 0: dx = x; dy = y + Math.ceil(Math.random() * (hei-1)); horiz = 1; break;
	  case 1: dx = x+wid; dy = y + Math.ceil(Math.random() * (hei-1)); horiz = 1; break;
	  case 2: dx = x+Math.ceil(Math.random() * (wid-1)); dy = y; break;
	  case 3: dx = x+Math.ceil(Math.random() * (wid-1)); dy = y+hei; break;
	  }
	  if (Math.random() < 0.5) {
	    if (horiz == 1) {
	      doorsym.chr = "-";
	    } else {
	      doorsym.chr = "|";
	    }
	  }
	  this.set_data(dx,dy, doorsym);
	  ndoors--;
	}
      }
    };

  this.find_symloc = function(sym)
    {
      ntry = 20;
      while (ntry > 0) {
	var x = Math.floor(Math.random() * this.WID);
	var y = Math.floor(Math.random() * this.HEI);
	var ter = this.get_data(x,y);
	if ((ter.chr == sym.chr) && (ter.fg == sym.fg)) {
	  var loc = {'x':x, 'y':y};
	  return loc;
	}
	ntry--;
      }
      return undefined;
    };


  this.draw_dudley = function()
    {
      var sym = {'chr':"@", 'fg':"white"};
      var loc = this.find_symloc({'chr':'.'});
      if (loc == undefined) loc = this.find_symloc({'chr':'#'});
      if (loc != undefined) {
	this.set_data(loc.x, loc.y, sym);
	this.set_cursor(loc.x, loc.y);
      }
    };


  this.draw_maze = function(sym)
    {
      var x, y;
      var maze_array = new Array();
      var dat;

      x = Math.floor(this.WID / 2) + Math.floor(Math.random() * 3) - 1;
      y = Math.floor(this.HEI / 2) + Math.floor(Math.random() * 3) - 1;

      maze_array.push({'x':x+1, 'y':y,   'dx':x+2, 'dy': y});
      maze_array.push({'x':x-1, 'y':y,   'dx':x-2, 'dy': y});
      maze_array.push({'x':x,   'y':y+1, 'dx':x,   'dy': y+2});
      maze_array.push({'x':x,   'y':y-1, 'dx':x,   'dy': y-2});
      this.set_data(x,y, sym);

      while (maze_array.length > 0) {

	var posar = maze_array.splice(Math.floor(Math.random() * maze_array.length), 1);
	pos = posar.pop();

	if ((pos.dx >= 0) && (pos.dy >= 0) && (pos.dx < this.WID) && (pos.dy < this.HEI)) {

	  dat = this.get_data(pos.dx, pos.dy);

	  if ((dat.chr != sym.chr) && ((dat.fg == undefined) || (dat.fg != sym.fg))) {
	    this.set_data(pos.x,pos.y, sym);
	    this.set_data(pos.dx, pos.dy, sym);

	    maze_array.push({'x':pos.dx+1, 'y':pos.dy,   'dx':pos.dx+2, 'dy': pos.dy});
	    maze_array.push({'x':pos.dx-1, 'y':pos.dy,   'dx':pos.dx-2, 'dy': pos.dy});
	    maze_array.push({'x':pos.dx,   'y':pos.dy+1, 'dx':pos.dx,   'dy': pos.dy+2});
	    maze_array.push({'x':pos.dx,   'y':pos.dy-1, 'dx':pos.dx,   'dy': pos.dy-2});
	  }
	}
      }
    };


  this.wallify = function()
    {
      var hwall = {'chr':'|'};
      var vwall = {'chr':'-'};
      for (y = 0; y < this.HEI; y++) {
	for (x = 0; x < this.WID; x++) {
	  var dat = this.get_data(x,y);
	  if (dat.chr == ' ') {
	    var ok = 0;
	    var s1 = this.get_data(x+1,y);
	    var s2 = this.get_data(x-1,y);
	    var s3 = this.get_data(x,y+1);
	    var s4 = this.get_data(x,y-1);
	    var s5 = this.get_data(x+1,y+1);
	    var s6 = this.get_data(x-1,y-1);
	    var s7 = this.get_data(x-1,y+1);
	    var s8 = this.get_data(x+1,y-1);
	    if (s1 && s1.chr == '.') ok = 1;
	    if (s2 && s2.chr == '.') ok = 1;
	    if (s3 && s3.chr == '.') ok = 1;
	    if (s4 && s4.chr == '.') ok = 1;
	    if (s5 && s5.chr == '.') ok = 1;
	    if (s6 && s6.chr == '.') ok = 1;
	    if (s7 && s7.chr == '.') ok = 1;
	    if (s8 && s8.chr == '.') ok = 1;
	    if (ok == 1) this.set_data(x,y, vwall);
	  }
	}
      }
      for (y = 0; y < this.HEI; y++) {
	for (x = 0; x < this.WID; x++) {
	  var dat = this.get_data(x,y);
	  if (dat.chr == '|') {
	    var ok = 0;
	    var s1 = this.get_data(x+1,y);
	    var s2 = this.get_data(x-1,y);
	    if (s1 && ((s1.chr == '+') || (s1.chr == '-') || (s1.chr == '|'))) ok = 1;
	    if (s2 && ((s1.chr == '+') || (s2.chr == '-') || (s2.chr == '|'))) ok = 1;
	    if ((ok == 1) && (dat.fg != 'brown')) this.set_data(x,y, hwall);
	  } else if (dat.chr == '-') {
	    var ok = 0;
	    var s1 = this.get_data(x,y+1);
	    var s2 = this.get_data(x,y-1);
	    var s3 = this.get_data(x+1,y);
	    var s4 = this.get_data(x-1,y);
	    if (s1 && ((s1.chr == '+') || (s1.chr == '-') || (s1.chr == '|'))) ok = 1;
	    if (s2 && ((s1.chr == '+') || (s2.chr == '-') || (s2.chr == '|'))) ok = 1;
	    if (s3 && ((s1.chr == '+') || (s3.chr == '-') || (s3.chr == '|'))) ok = 0;
	    if (s4 && ((s1.chr == '+') || (s4.chr == '-') || (s4.chr == '|'))) ok = 0;
	    if ((ok == 1) && (dat.fg != 'brown')) this.set_data(x,y, hwall);
	  }
	}
      }
    };


  this.random_replace = function(sym, tosym, chance)
    {
      var p;
      for (y = 0; y < this.HEI; y++) {
	for (x = 0; x < this.WID; x++) {
	  var dat = this.get_data(x,y);
	  if ((dat.chr == sym.chr) && (Math.floor(Math.random()*100) < chance)) {
            p = {'chr':tosym.chr, 'fg':pen_getcolor(tosym.fg)};
	    this.set_data(x,y, p);
	  }
	}
      }
    };

  this.random_corridor = function(x,y,len,dir)
    {
      var sym = {'chr':'#'};
      if (dir == undefined)
      dir = Math.floor(Math.random() * 4);
      while (len > 0) {
	this.set_data(x,y, sym);
	switch (dir) {
	case 0: x--; break;
	case 1: x++; break;
	case 2: y--; break;
	case 3: y++; break;
	}
	if (x < 0 || y < 0 || x >= this.WID || y >= this.HEI) break;
	if (Math.random() < 0.3) {
	  if (Math.random() < 0.5) {
	    dir++;
	    dir = dir % 4;
	  } else {
	    dir--;
	    if (dir < 0) dir = 3;
	  }
	}
	len--;
      }
    };

  this.draw_scatter = function(sym, num)
    {
      while (num > 0) {
	var x = Math.floor(Math.random() * this.WID);
	var y = Math.floor(Math.random() * this.HEI);
        var p = {'chr':sym.chr, 'fg':pen_getcolor(sym.fg)};
	this.set_data(x,y, p);
	num--;
      }
    };


  this.draw_randomwalk = function(x,y, sym, maxlength)
    {
      while (maxlength > 0) {
	var dir = Math.floor(Math.random() * 8);
	switch (dir) {
	default:
	case 0: y--; break;
	case 1: y--; x++; break;
	case 2:      x++; break;
	case 3: y++; x++; break;
	case 4: y++; break;
	case 5: y++; x--; break;
	case 6:      x--; break;
	case 7: y--; x--; break;
	}
	if (x < 0 || y < 0 || x >= this.WID || y >= this.HEI) return;
	this.set_data(x,y,sym);
	maxlength--;
      }
    };


  this.draw_random_field = function()
    {
      this.fill({'chr':"."});

      var n = Math.ceil(Math.random() * ((this.WID*this.HEI) / 2));
      var i = Math.ceil(Math.random() * 3);
      var nowaterlava = 0;

      var sym;

      while (i > 0) {
	var tmp = Math.floor(Math.random() * 3);
	switch (tmp) {
	default:
	case 0: if (nowaterlava == 0) { sym = {'chr':"}",'fg':'blue'}; nowaterlava = 1; } break;  /* water */
	case 1: if (nowaterlava == 0) { sym = {'chr':"}",'fg':'red'}; nowaterlava = 1; } break;  /* lava */
	case 2: sym = {'chr':"#",'fg':'green'}; break;  /* tree */
	  //case 3: sym = {'chr':".",'fg':'cyan'}; break;  /* ice */
	}
	this.draw_scatter(sym, n);
	i--;
      }
    };


  this.draw_random_room = function(drawcorridor)
    {
      var wid = Math.ceil(Math.random() * (this.WID - 3)) + 2;
      var hei = Math.ceil(Math.random() * (this.HEI - 3)) + 2;

      var ndoors = Math.ceil((Math.random() * (wid + hei)) / 5);
      var features = Math.ceil((Math.random() * (wid + hei)) / 10);

      var x = Math.floor(Math.random() * (this.WID - wid));
      var y = Math.floor(Math.random() * (this.HEI - hei));

      this.draw_room(x,y, x+wid, y+hei, 1);

      for (i = 0; i < ndoors; i++) {
	var tmp = Math.floor(Math.random() * 4);
	var dx, dy, horiz = 0;
	var doorsym = {'chr':"+", 'fg':'brown'};
	switch (tmp) {
	case 0: dx = x; dy = y + Math.ceil(Math.random() * (hei-1)); horiz = 1; break;
	case 1: dx = x+wid; dy = y + Math.ceil(Math.random() * (hei-1)); horiz = 1; break;
	case 2: dx = x+Math.ceil(Math.random() * (wid-1)); dy = y; break;
	case 3: dx = x+Math.ceil(Math.random() * (wid-1)); dy = y+hei; break;
	}
	if (Math.random() < 0.5) {
	  if (horiz == 1) {
	    doorsym.chr = "-";
	  } else {
	    doorsym.chr = "|";
	  }
	  if (drawcorridor == 1) {
	    /*it's open door, draw corridor */
	    switch (tmp) {
	    case 0: this.draw_line_h(0,dy,dx, {'chr':'#'}); break;
	    case 1: this.draw_line_h(dx,dy,this.WID, {'chr':'#'}); break;
	    case 2: this.draw_line_v(dx,0,dy, {'chr':'#'}); break;
	    case 3: this.draw_line_v(dx,dy,this.HEI, {'chr':'#'}); break;
	    }
	  }
	}
	this.set_data(dx,dy, doorsym);
      }

      if (Math.random() < 0.6) {
	for (i = 0; i < features; i++) {
	  var tmp = Math.floor(Math.random() * 20);
	  var sym;
	  switch (tmp) {
	  case 0: sym = {'chr':"#"}; break;  /* sink */
	  case 1: sym = {'chr':"{",'fg':'blue'}; break;  /* fountain */
	  case 2: sym = {'chr':"}",'fg':'blue'}; break;  /* water */
	  case 3: sym = {'chr':"}",'fg':'red'}; break;  /* lava */
	  case 4: sym = {'chr':"_"}; break;  /* altar */
	  case 5: sym = {'chr':"#",'fg':'green'}; break;  /* tree */
	  case 6: sym = {'chr':">"}; break;  /* stairs down */
	  case 7: sym = {'chr':"<"}; break;  /* stairs up */
	  case 8: sym = {'chr':"\\",'fg':'yellow'}; break;  /* thone */
	  case 9: sym = {'chr':"|"}; break;  /* grave */
	  default: break;
	  }
	  if (sym) {
	    dx = x + Math.ceil(Math.random() * (wid-1));
	    dy = y + Math.ceil(Math.random() * (hei-1));
	    this.set_data(dx,dy, sym);
	  }
	}
      }
    };



  this.draw_random = function(mode)
    {
      var sym;
      var floor = {'chr':"."};
      var empty = {'chr':" "};
	if (mode == undefined) {
	    mode = Math.floor(Math.random() * 10);
	}
      this.set_cursor(-1,-1);
      switch (mode) {
      default:
      case 0:
	this.fill(empty);
	this.draw_random_room(1);
	break;
      case 1:
	this.fill(floor);
	this.draw_random_room();
	break;
      case 2:
	this.draw_random_field();
	if (Math.random() < 0.25) this.draw_random_room();
	break;
      case 3:
	this.fill(floor);
	sym = random_terrain_sym();
	this.draw_randomwalk(Math.floor(this.WID / 2), Math.floor(this.HEI / 2), sym, 30);
	this.draw_randomwalk(Math.floor(this.WID / 2), Math.floor(this.HEI / 2), sym, 30);
	if (Math.random() < 0.5) this.draw_scatter(sym, 10);
	break;
      case 4:
	sym = random_terrain_sym();
	this.fill(sym);
	this.draw_randomwalk(Math.floor(this.WID / 2), Math.floor(this.HEI / 2), floor, 30);
	this.draw_randomwalk(Math.floor(this.WID / 2), Math.floor(this.HEI / 2), floor, 30);
	if (Math.random() < 0.5) this.draw_scatter(floor, 10);
	break;
      case 5:
	this.fill(floor);
	var n_rooms = Math.ceil(Math.random() * 3);
	while (n_rooms > 0) {
	  var wid = Math.ceil(Math.random() * (this.WID - 3)) + 2;
	  var hei = Math.ceil(Math.random() * (this.HEI - 3)) + 2;
	  var x = Math.floor(Math.random() * (this.WID - wid));
	  var y = Math.floor(Math.random() * (this.HEI - hei));
	  n_rooms--;
	  this.draw_room(x,y,x+wid,y+hei,3);
	}
	break;
      case 6: /* corridors */
	floor = {'chr':'#'};
	this.fill(empty);
	var bitmask = Math.ceil(Math.random()*31)+1;
	if (bitmask & 1) this.random_corridor(this.WID-1, Math.floor(this.HEI / 2), 20, 0);
	if (bitmask & 2) this.random_corridor(0, Math.floor(this.HEI / 2), 20, 1);
	if (bitmask & 4) this.random_corridor(Math.floor(this.WID / 2), this.HEI-1, 20, 2);
	if (bitmask & 8) this.random_corridor(Math.floor(this.WID / 2), 0, 20, 3);
	if (bitmask & 16) this.random_corridor(Math.floor(this.WID / 2), Math.floor(this.HEI / 2), 20);
	this.random_corridor(Math.floor(this.WID / 2), Math.floor(this.HEI / 2), 20);
	break;
      case 7:
	floor = {'chr':'#'};
	this.fill(empty);
	for (i = 0; i < 5; i++)
	  this.draw_randomwalk(Math.floor(this.WID / 2), Math.floor(this.HEI / 2), floor, 30);
	break;
      case 8: /* mines */
	this.fill(empty);
	for (i = 0; i < 6; i++)
	  this.draw_randomwalk(Math.floor(this.WID / 2), Math.floor(this.HEI / 2), floor, 30);
	this.wallify();
	if (Math.random() < 0.30) {
	  this.random_replace({'chr':'|'}, {'chr':'#'}, 15);
	  this.random_replace({'chr':'-'}, {'chr':'#'}, 15);
	}
	break;
      case 9: /* maze */
	var wallsym;
	switch (Math.floor(Math.random() * 5)) {
	default: wallsym = empty; break;
	case 0: wallsym = {'chr':'#', 'fg':'green'}; break;
	case 1: wallsym = {'chr':'#', 'fg':'cyan'}; break;
	case 2: wallsym = {'chr':'}', 'fg':'red'}; break;
	}
	if (Math.random() < 0.5) {
	  this.fill(wallsym);
	  this.draw_maze(floor);
	} else {
	  this.fill(floor);
	  this.draw_maze(wallsym);
	}
	this.wallify();
	break;
      }

      /* Dudley */
      if (Math.random() < 0.8) this.draw_dudley();

      /* monsters */
      if (Math.random() < 0.5) {
	var nmons = Math.ceil(Math.random() * 6);
	sym = random_monster_sym();

	while (nmons > 0) {
	  var loc = this.find_symloc(floor);
	  if (loc != undefined) this.set_data(loc.x,loc.y, sym);
	  if (Math.random() < 0.2) sym = random_monster_sym();
	  nmons--;
	}
      }

      /* objects */
      if (Math.random() < 0.4) {
	var nobjs = Math.ceil(Math.random() * 3);
	sym = random_obj_sym();

	while (nobjs > 0) {
	  var loc = this.find_symloc(floor);
	  if (loc != undefined) this.set_data(loc.x,loc.y, sym);
	  if (Math.random() < 0.85) sym = random_obj_sym();
	  nobjs--;
	}
      }

      /* traps */
      if (Math.random() < 0.1) {
	var nobjs = Math.ceil(Math.random() * 3);
	sym = random_trap_sym();

	while (nobjs > 0) {
	  var loc = this.find_symloc(floor);
	  if (loc != undefined) this.set_data(loc.x,loc.y, sym);
	  if (Math.random() < 0.75) sym = random_trap_sym();
	  nobjs--;
	}
      }

      /* stairs */
      if (Math.random() < 0.1) {
	sym = {'chr':'>'};
	if (Math.random() < 0.5) sym = {'chr':'<'};
	var loc = this.find_symloc(floor);
	if (loc != undefined) this.set_data(loc.x,loc.y, sym);
      }

    };


  this.draw_floodfill = function(x,y, dat)
    {
      var tmp_panel = this.clone();
      var floodfill_array = new Array();
      var pos;
      var sym = {'chr':0, 'fg':0};
      var under = tmp_panel.get_data(x,y);
      if ((under == undefined) || (sym.chr == under.chr) && (sym.fg == under.fg)) { return; }
      floodfill_array.push({'x':x, 'y':y});
      do {
	pos = floodfill_array.pop();
	x = pos.x;
	y = pos.y;
	if ((x >= 0) && (y >= 0) && (x < this.WID) && (y < this.HEI)) {
	  if (typeof dat == 'function') {
	    dat(x, y);
	  } else {
	    this.set_data(x,y, dat);
	  }
	  tmp_panel.set_data(x,y, sym);
	}
	var s1 = tmp_panel.get_data(x+1,y);
	var s2 = tmp_panel.get_data(x-1,y);
	var s3 = tmp_panel.get_data(x,y+1);
	var s4 = tmp_panel.get_data(x,y-1);
	if (s1 && (s1.chr == under.chr) && (s1.fg == under.fg) && (x+1 < this.WID)) { floodfill_array.push({'x':x+1, 'y':y}); }
	if (s2 && (s2.chr == under.chr) && (s2.fg == under.fg) && (x-1 >= 0)) { floodfill_array.push({'x':x-1, 'y':y}); }
	if (s3 && (s3.chr == under.chr) && (s3.fg == under.fg) && (y+1 < this.HEI)) { floodfill_array.push({'x':x, 'y':y+1}); }
	if (s4 && (s4.chr == under.chr) && (s4.fg == under.fg) && (y-1 >= 0)) { floodfill_array.push({'x':x, 'y':y-1}); }
      } while (floodfill_array.length > 0);
    };


  this.draw_line = function(x1,y1,x2,y2, dat)
    {
      var dy = y2 - y1;
      var dx = x2 - x1;
      var stepx, stepy;

      if (dy < 0) { dy = -dy;  stepy = -1; } else { stepy = 1; }
      if (dx < 0) { dx = -dx;  stepx = -1; } else { stepx = 1; }

      dy = dy*2;
      dx = dx*2;
      if (typeof dat == 'function') {
	dat(x1,y1);
      } else {
	this.set_data(x1,y1,dat);
      }

      if (dx > dy) {
	var fract = 2*dy - dx;
	while (x1 != x2) {
	  if (fract >= 0) {
	    y1 += stepy;
	    fract -= dx;
	  }
	  x1 += stepx;
	  fract += dy;
	  if (typeof dat == 'function') {
	    dat(x1,y1);
	  } else {
	    this.set_data(x1,y1,dat);
	  }
	}
      } else {
	var fract = 2*dx - dy;
	while (y1 != y2) {
	  if (fract >= 0) {
	    x1 += stepx;
	    fract -= dy;
	  }
	  y1 += stepy;
	  fract += dx;
	  if (typeof dat == 'function') {
	    dat(x1,y1);
	  } else {
	    this.set_data(x1,y1,dat);
	  }
	}
      }
    };



  this.move_symbols = function(sym, floorsym, dir)
      {
	  var tmppanel = this.clone();
	  var tx = 0, ty = 0;
	  for (y = 0; y < this.HEI; y++) {
	      for (x = 0; x < this.WID; x++) {
		  var dat = tmppanel.get_data(x,y);
		  if (dat.chr == sym.chr) {
		      switch (dir) {
		      case 0: /* cursor */
			  if (this.cursor.x != -1) {
			      tx = this.cursor.x;
			      ty = this.cursor.y;
			      break;
			  }
		      default:
		      case 1: /* random */
			  tx = Math.floor(Math.random() * this.WID);
			  ty = Math.floor(Math.random() * this.HEI);
			  break;
		      case 2: /* up */
			  tx = Math.floor(Math.random() * this.WID);
			  ty = 0;
			  break;
		      case 3: /* down */
			  tx = Math.floor(Math.random() * this.WID);
			  ty = this.HEI-1;
			  break;
		      case 4: /* left */
			  tx = 0;
			  ty = Math.floor(Math.random() * this.HEI);
			  break;
		      case 5: /* right */
			  tx = this.WID-1;
			  ty = Math.floor(Math.random() * this.HEI);
			  break;
		      }
		      if (tx != x || ty != y) {
			  var dx = (tx-x);
			  var dy = (ty-y);
			  var sx = (dx == 0 ? 0 : (dx < 0 ? -1 : 1));
			  var sy = (dy == 0 ? 0 : (dy < 0 ? -1 : 1));
			  var dirs = new Array({'x':0,'y':-1},
			      {'x':1,'y':-1},
			      {'x':1,'y':0},
			      {'x':1,'y':1},
			      {'x':0,'y':1},
			      {'x':-1,'y':1},
			      {'x':-1,'y':0},
			      {'x':-1, 'y':-1});
			  for (tdir = 0; tdir < dirs.length; tdir++)
			      if (dirs[tdir].x == sx && dirs[tdir].y == sy) break;

			  tdir = (tdir + 7) % 8;
			  var da = (Math.floor(Math.random()*3));

			  for (rdir = 0; rdir < 3; rdir++) {
			      var tda = (tdir + (da + rdir) % 3) % 8;
			      sx = dirs[tda].x;
			      sy = dirs[tda].y;
			      var floor = this.get_data(x+sx,y+sy);
			      if (this.inmap(x+sx,y+sy) && floor.chr == floorsym.chr) {
				  this.set_data(x,y,floor);
				  this.set_data(x+sx,y+sy, dat);
				  break;
			      }

			  }

		      }
		  }
	      }
	  }
	  delete tmppanel;
      };


  this.fill({'chr':' '});
}
