
var colors = new Array(
"black",
"red",
"green",
"brown",
"blue",
"magenta",
"cyan",
"gray",
"darkgray",
"orange",
"brightgreen",
"yellow",
"brightblue",
"brightmagenta",
"brightcyan",
"white");

var nh_monster_chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ:;'@&";
var nh_object_chars = ")[=\"(%!?+/*$";

var nh_sym_sort_optgroups = new Array(
				      "",
				      "Monsters",
				      "Objects",
				      "Traps",
				      "Terrain Features",
				      "Misc"
);

var nethack_symbols_orig = new Array();

var nethack_symbols_array = new Array(
{'chr':"a", 'fg':"darkgray", 'text':"giant beetle", 'sort':1},
{'chr':"a", 'fg':"blue", 'text':"soldier ant", 'sort':1},
{'chr':"a", 'fg':"brown", 'text':"giant ant", 'sort':1},
{'chr':"a", 'fg':"magenta", 'text':"queen bee", 'sort':1},
{'chr':"a", 'fg':"red", 'text':"fire ant", 'sort':1},
{'chr':"a", 'fg':"yellow", 'text':"killer bee", 'sort':1},
{'chr':"b", 'fg':"cyan", 'text':"gelatinous cube", 'sort':1},
{'chr':"b", 'fg':"green", 'text':"acid blob", 'sort':1},
{'chr':"b", 'fg':"white", 'text':"quivering blob", 'sort':1},
{'chr':"c", 'fg':"brown", 'text':"chickatrice", 'sort':1},
{'chr':"c", 'fg':"red", 'text':"pyrolisk", 'sort':1},
{'chr':"c", 'fg':"yellow", 'text':"cockatrice", 'sort':1},
{'chr':"d", 'fg':"brown", 'text':"jackal", 'sort':1},
{'chr':"d", 'fg':"brown", 'text':"coyote", 'sort':1},
{'chr':"d", 'fg':"brown", 'text':"werejackal (dog)", 'sort':1},
{'chr':"d", 'fg':"brown", 'text':"wolf", 'sort':1},
{'chr':"d", 'fg':"brown", 'text':"werewolf (dog)", 'sort':1},
{'chr':"d", 'fg':"brown", 'text':"warg", 'sort':1},
{'chr':"d", 'fg':"cyan", 'text':"winter wolf cub", 'sort':1},
{'chr':"d", 'fg':"cyan", 'text':"winter wolf", 'sort':1},
{'chr':"d", 'fg':"red", 'text':"fox", 'sort':1},
{'chr':"d", 'fg':"red", 'text':"hell hound pup", 'sort':1},
{'chr':"d", 'fg':"red", 'text':"hell hound", 'sort':1},
{'chr':"d", 'fg':"red", 'text':"Cerberus", 'sort':1},
{'chr':"d", 'fg':"white", 'text':"little dog", 'sort':1},
{'chr':"d", 'fg':"white", 'text':"dog", 'sort':1},
{'chr':"d", 'fg':"white", 'text':"large dog", 'sort':1},
{'chr':"d", 'fg':"yellow", 'text':"dingo", 'sort':1},
{'chr':"e", 'fg':"blue", 'text':"floating eye", 'sort':1},
{'chr':"e", 'fg':"brightblue", 'text':"shocking sphere", 'sort':1},
{'chr':"e", 'fg':"brown", 'text':"beholder", 'sort':1},
{'chr':"e", 'fg':"gray", 'text':"gas spore", 'sort':1},
{'chr':"e", 'fg':"red", 'text':"flaming sphere", 'sort':1},
{'chr':"e", 'fg':"white", 'text':"freezing sphere", 'sort':1},
{'chr':"f", 'fg':"darkgray", 'text':"panther", 'sort':1},
{'chr':"f", 'fg':"brown", 'text':"jaguar", 'sort':1},
{'chr':"f", 'fg':"cyan", 'text':"lynx", 'sort':1},
{'chr':"f", 'fg':"white", 'text':"kitten", 'sort':1},
{'chr':"f", 'fg':"white", 'text':"housecat", 'sort':1},
{'chr':"f", 'fg':"white", 'text':"large cat", 'sort':1},
{'chr':"f", 'fg':"yellow", 'text':"tiger", 'sort':1},
{'chr':"g", 'fg':"brown", 'text':"gargoyle", 'sort':1},
{'chr':"g", 'fg':"green", 'text':"gremlin", 'sort':1},
{'chr':"g", 'fg':"magenta", 'text':"winged gargoyle", 'sort':1},
{'chr':"h", 'fg':"blue", 'text':"dwarf lord", 'sort':1},
{'chr':"h", 'fg':"brown", 'text':"bugbear", 'sort':1},
{'chr':"h", 'fg':"green", 'text':"hobbit", 'sort':1},
{'chr':"h", 'fg':"magenta", 'text':"dwarf king", 'sort':1},
{'chr':"h", 'fg':"magenta", 'text':"mind flayer", 'sort':1},
{'chr':"h", 'fg':"magenta", 'text':"master mind flayer", 'sort':1},
{'chr':"h", 'fg':"red", 'text':"dwarf", 'sort':1},
{'chr':"i", 'fg':"blue", 'text':"quasit", 'sort':1},
{'chr':"i", 'fg':"brown", 'text':"lemure", 'sort':1},
{'chr':"i", 'fg':"cyan", 'text':"tengu", 'sort':1},
{'chr':"i", 'fg':"green", 'text':"homunculus", 'sort':1},
{'chr':"i", 'fg':"red", 'text':"manes", 'sort':1},
{'chr':"i", 'fg':"red", 'text':"imp", 'sort':1},
{'chr':"j", 'fg':"blue", 'text':"blue jelly", 'sort':1},
{'chr':"j", 'fg':"brown", 'text':"ochre jelly", 'sort':1},
{'chr':"j", 'fg':"green", 'text':"spotted jelly", 'sort':1},
{'chr':"k", 'fg':"brightblue", 'text':"kobold shaman", 'sort':1},
{'chr':"k", 'fg':"brown", 'text':"kobold", 'sort':1},
{'chr':"k", 'fg':"magenta", 'text':"kobold lord", 'sort':1},
{'chr':"k", 'fg':"red", 'text':"large kobold", 'sort':1},
{'chr':"l", 'fg':"green", 'text':"leprechaun", 'sort':1},
{'chr':"m", 'fg':"brown", 'text':"small mimic", 'sort':1},
{'chr':"m", 'fg':"magenta", 'text':"giant mimic", 'sort':1},
{'chr':"m", 'fg':"red", 'text':"large mimic", 'sort':1},
{'chr':"n", 'fg':"blue", 'text':"water nymph", 'sort':1},
{'chr':"n", 'fg':"brown", 'text':"mountain nymph", 'sort':1},
{'chr':"n", 'fg':"green", 'text':"wood nymph", 'sort':1},
{'chr':"o", 'fg':"darkgray", 'text':"Uruk-hai", 'sort':1},
{'chr':"o", 'fg':"blue", 'text':"Mordor orc", 'sort':1},
{'chr':"o", 'fg':"brightblue", 'text':"orc shaman", 'sort':1},
{'chr':"o", 'fg':"brown", 'text':"hobgoblin", 'sort':1},
{'chr':"o", 'fg':"gray", 'text':"goblin", 'sort':1},
{'chr':"o", 'fg':"magenta", 'text':"orc-captain", 'sort':1},
{'chr':"o", 'fg':"red", 'text':"orc", 'sort':1},
{'chr':"o", 'fg':"yellow", 'text':"hill orc", 'sort':1},
{'chr':"p", 'fg':"cyan", 'text':"iron piercer", 'sort':1},
{'chr':"p", 'fg':"gray", 'text':"rock piercer", 'sort':1},
{'chr':"p", 'fg':"white", 'text':"glass piercer", 'sort':1},
{'chr':"q", 'fg':"darkgray", 'text':"mastodon", 'sort':1},
{'chr':"q", 'fg':"brown", 'text':"rothe", 'sort':1},
{'chr':"q", 'fg':"cyan", 'text':"wumpus", 'sort':1},
{'chr':"q", 'fg':"gray", 'text':"mumak", 'sort':1},
{'chr':"q", 'fg':"gray", 'text':"titanothere", 'sort':1},
{'chr':"q", 'fg':"gray", 'text':"baluchitherium", 'sort':1},
{'chr':"q", 'fg':"red", 'text':"leocrotta", 'sort':1},
{'chr':"r", 'fg':"brown", 'text':"sewer rat", 'sort':1},
{'chr':"r", 'fg':"brown", 'text':"giant rat", 'sort':1},
{'chr':"r", 'fg':"brown", 'text':"rabid rat", 'sort':1},
{'chr':"r", 'fg':"brown", 'text':"wererat (rodent)", 'sort':1},
{'chr':"r", 'fg':"brown", 'text':"woodchuck", 'sort':1},
{'chr':"r", 'fg':"gray", 'text':"rock mole", 'sort':1},
{'chr':"s", 'fg':"gray", 'text':"cave spider", 'sort':1},
{'chr':"s", 'fg':"magenta", 'text':"giant spider", 'sort':1},
{'chr':"s", 'fg':"magenta", 'text':"Scorpius", 'sort':1},
{'chr':"s", 'fg':"red", 'text':"scorpion", 'sort':1},
{'chr':"s", 'fg':"yellow", 'text':"centipede", 'sort':1},
{'chr':"t", 'fg':"green", 'text':"trapper", 'sort':1},
{'chr':"t", 'fg':"gray", 'text':"lurker above", 'sort':1},
{'chr':"u", 'fg':"brown", 'text':"pony", 'sort':1},
{'chr':"u", 'fg':"brown", 'text':"horse", 'sort':1},
{'chr':"u", 'fg':"brown", 'text':"warhorse", 'sort':1},
{'chr':"u", 'fg':"darkgray", 'text':"black unicorn", 'sort':1},
{'chr':"u", 'fg':"gray", 'text':"gray unicorn", 'sort':1},
{'chr':"u", 'fg':"white", 'text':"white unicorn", 'sort':1},
{'chr':"v", 'fg':"blue", 'text':"steam vortex", 'sort':1},
{'chr':"v", 'fg':"brightblue", 'text':"energy vortex", 'sort':1},
{'chr':"v", 'fg':"brown", 'text':"dust vortex", 'sort':1},
{'chr':"v", 'fg':"cyan", 'text':"ice vortex", 'sort':1},
{'chr':"v", 'fg':"gray", 'text':"fog cloud", 'sort':1},
{'chr':"v", 'fg':"yellow", 'text':"fire vortex", 'sort':1},
{'chr':"w", 'fg':"brown", 'text':"baby long worm", 'sort':1},
{'chr':"w", 'fg':"brown", 'text':"long worm", 'sort':1},
{'chr':"w", 'fg':"magenta", 'text':"baby purple worm", 'sort':1},
{'chr':"w", 'fg':"magenta", 'text':"purple worm", 'sort':1},
{'chr':"x", 'fg':"magenta", 'text':"grid bug", 'sort':1},
{'chr':"x", 'fg':"red", 'text':"xan", 'sort':1},
{'chr':"y", 'fg':"darkgray", 'text':"black light", 'sort':1},
{'chr':"y", 'fg':"yellow", 'text':"yellow light", 'sort':1},
{'chr':"z", 'fg':"brown", 'text':"zruty", 'sort':1},

{ },

{'chr':"A", 'fg':"green", 'text':"couatl", 'sort':1},
{'chr':"A", 'fg':"magenta", 'text':"Archon", 'sort':1},
{'chr':"A", 'fg':"white", 'text':"Angel", 'sort':1},
{'chr':"A", 'fg':"yellow", 'text':"Aleax", 'sort':1},
{'chr':"A", 'fg':"yellow", 'text':"ki-rin", 'sort':1},
{'chr':"B", 'fg':"darkgray", 'text':"raven", 'sort':1},
{'chr':"B", 'fg':"darkgray", 'text':"vampire bat", 'sort':1},
{'chr':"B", 'fg':"brown", 'text':"bat", 'sort':1},
{'chr':"B", 'fg':"red", 'text':"giant bat", 'sort':1},
{'chr':"C", 'fg':"brown", 'text':"plains centaur", 'sort':1},
{'chr':"C", 'fg':"cyan", 'text':"mountain centaur", 'sort':1},
{'chr':"C", 'fg':"green", 'text':"forest centaur", 'sort':1},
{'chr':"D", 'fg':"darkgray", 'text':"baby black dragon", 'sort':1},
{'chr':"D", 'fg':"darkgray", 'text':"black dragon", 'sort':1},
{'chr':"D", 'fg':"blue", 'text':"baby blue dragon", 'sort':1},
{'chr':"D", 'fg':"blue", 'text':"blue dragon", 'sort':1},
{'chr':"D", 'fg':"brightcyan", 'text':"baby silver dragon", 'sort':1},
{'chr':"D", 'fg':"brightcyan", 'text':"silver dragon", 'sort':1},
{'chr':"D", 'fg':"orange", 'text':"baby orange dragon", 'sort':1},
{'chr':"D", 'fg':"orange", 'text':"orange dragon", 'sort':1},
{'chr':"D", 'fg':"cyan", 'text':"baby shimmering dragon", 'sort':1},
{'chr':"D", 'fg':"cyan", 'text':"shimmering dragon", 'sort':1},
{'chr':"D", 'fg':"green", 'text':"baby green dragon", 'sort':1},
{'chr':"D", 'fg':"green", 'text':"green dragon", 'sort':1},
{'chr':"D", 'fg':"gray", 'text':"baby gray dragon", 'sort':1},
{'chr':"D", 'fg':"gray", 'text':"gray dragon", 'sort':1},
{'chr':"D", 'fg':"magenta", 'text':"Chromatic Dragon", 'sort':1},
{'chr':"D", 'fg':"red", 'text':"baby red dragon", 'sort':1},
{'chr':"D", 'fg':"red", 'text':"red dragon", 'sort':1},
{'chr':"D", 'fg':"red", 'text':"Ixoth", 'sort':1},
{'chr':"D", 'fg':"white", 'text':"baby white dragon", 'sort':1},
{'chr':"D", 'fg':"white", 'text':"white dragon", 'sort':1},
{'chr':"D", 'fg':"yellow", 'text':"baby yellow dragon", 'sort':1},
{'chr':"D", 'fg':"yellow", 'text':"yellow dragon", 'sort':1},
{'chr':"E", 'fg':"blue", 'text':"water elemental", 'sort':1},
{'chr':"E", 'fg':"brown", 'text':"earth elemental", 'sort':1},
{'chr':"E", 'fg':"cyan", 'text':"air elemental", 'sort':1},
{'chr':"E", 'fg':"white", 'text':"stalker", 'sort':1},
{'chr':"E", 'fg':"yellow", 'text':"fire elemental", 'sort':1},
{'chr':"F", 'fg':"brightgreen", 'text':"lichen", 'sort':1},
{'chr':"F", 'fg':"brown", 'text':"brown mold", 'sort':1},
{'chr':"F", 'fg':"green", 'text':"green mold", 'sort':1},
{'chr':"F", 'fg':"magenta", 'text':"shrieker", 'sort':1},
{'chr':"F", 'fg':"magenta", 'text':"violet fungus", 'sort':1},
{'chr':"F", 'fg':"red", 'text':"red mold", 'sort':1},
{'chr':"F", 'fg':"yellow", 'text':"yellow mold", 'sort':1},
{'chr':"G", 'fg':"blue", 'text':"gnome lord", 'sort':1},
{'chr':"G", 'fg':"brightblue", 'text':"gnomish wizard", 'sort':1},
{'chr':"G", 'fg':"brown", 'text':"gnome", 'sort':1},
{'chr':"G", 'fg':"magenta", 'text':"gnome king", 'sort':1},
{'chr':"H", 'fg':"blue", 'text':"storm giant", 'sort':1},
{'chr':"H", 'fg':"brown", 'text':"ettin", 'sort':1},
{'chr':"H", 'fg':"brown", 'text':"minotaur", 'sort':1},
{'chr':"H", 'fg':"cyan", 'text':"hill giant", 'sort':1},
{'chr':"H", 'fg':"gray", 'text':"stone giant", 'sort':1},
{'chr':"H", 'fg':"gray", 'text':"Cyclops", 'sort':1},
{'chr':"H", 'fg':"magenta", 'text':"titan", 'sort':1},
{'chr':"H", 'fg':"magenta", 'text':"Lord Surtur", 'sort':1},
{'chr':"H", 'fg':"red", 'text':"giant", 'sort':1},
{'chr':"H", 'fg':"white", 'text':"frost giant", 'sort':1},
{'chr':"H", 'fg':"yellow", 'text':"fire giant", 'sort':1},
{'chr':"J", 'fg':"orange", 'text':"jabberwock", 'sort':1},
{'chr':"J", 'fg':"magenta", 'text':"vorpal jabberwock", 'sort':1},
{'chr':"K", 'fg':"blue", 'text':"Keystone Kop", 'sort':1},
{'chr':"K", 'fg':"blue", 'text':"Kop Sergeant", 'sort':1},
{'chr':"K", 'fg':"cyan", 'text':"Kop Lieutenant", 'sort':1},
{'chr':"K", 'fg':"magenta", 'text':"Kop Kaptain", 'sort':1},
{'chr':"L", 'fg':"brown", 'text':"lich", 'sort':1},
{'chr':"L", 'fg':"magenta", 'text':"master lich", 'sort':1},
{'chr':"L", 'fg':"magenta", 'text':"arch-lich", 'sort':1},
{'chr':"L", 'fg':"red", 'text':"demilich", 'sort':1},
{'chr':"M", 'fg':"blue", 'text':"ettin mummy", 'sort':1},
{'chr':"M", 'fg':"brown", 'text':"kobold mummy", 'sort':1},
{'chr':"M", 'fg':"cyan", 'text':"giant mummy", 'sort':1},
{'chr':"M", 'fg':"green", 'text':"elf mummy", 'sort':1},
{'chr':"M", 'fg':"gray", 'text':"orc mummy", 'sort':1},
{'chr':"M", 'fg':"gray", 'text':"human mummy", 'sort':1},
{'chr':"M", 'fg':"red", 'text':"gnome mummy", 'sort':1},
{'chr':"M", 'fg':"red", 'text':"dwarf mummy", 'sort':1},
{'chr':"N", 'fg':"darkgray", 'text':"black naga hatchling", 'sort':1},
{'chr':"N", 'fg':"darkgray", 'text':"black naga", 'sort':1},
{'chr':"N", 'fg':"green", 'text':"guardian naga hatchling", 'sort':1},
{'chr':"N", 'fg':"green", 'text':"guardian naga", 'sort':1},
{'chr':"N", 'fg':"red", 'text':"red naga hatchling", 'sort':1},
{'chr':"N", 'fg':"red", 'text':"red naga", 'sort':1},
{'chr':"N", 'fg':"yellow", 'text':"golden naga hatchling", 'sort':1},
{'chr':"N", 'fg':"yellow", 'text':"golden naga", 'sort':1},
{'chr':"O", 'fg':"brown", 'text':"ogre", 'sort':1},
{'chr':"O", 'fg':"magenta", 'text':"ogre king", 'sort':1},
{'chr':"O", 'fg':"red", 'text':"ogre lord", 'sort':1},
{'chr':"P", 'fg':"darkgray", 'text':"black pudding", 'sort':1},
{'chr':"P", 'fg':"brown", 'text':"brown pudding", 'sort':1},
{'chr':"P", 'fg':"green", 'text':"green slime", 'sort':1},
{'chr':"P", 'fg':"gray", 'text':"gray ooze", 'sort':1},
{'chr':"Q", 'fg':"cyan", 'text':"quantum mechanic", 'sort':1},
{'chr':"R", 'fg':"blue", 'text':"disenchanter", 'sort':1},
{'chr':"R", 'fg':"brown", 'text':"rust monster", 'sort':1},
{'chr':"S", 'fg':"blue", 'text':"pit viper", 'sort':1},
{'chr':"S", 'fg':"blue", 'text':"cobra", 'sort':1},
{'chr':"S", 'fg':"brown", 'text':"snake", 'sort':1},
{'chr':"S", 'fg':"green", 'text':"garter snake", 'sort':1},
{'chr':"S", 'fg':"magenta", 'text':"python", 'sort':1},
{'chr':"S", 'fg':"red", 'text':"water moccasin", 'sort':1},
{'chr':"T", 'fg':"blue", 'text':"water troll", 'sort':1},
{'chr':"T", 'fg':"brown", 'text':"troll", 'sort':1},
{'chr':"T", 'fg':"cyan", 'text':"rock troll", 'sort':1},
{'chr':"T", 'fg':"magenta", 'text':"Olog-hai", 'sort':1},
{'chr':"T", 'fg':"white", 'text':"ice troll", 'sort':1},
{'chr':"U", 'fg':"brown", 'text':"umber hulk", 'sort':1},
{'chr':"V", 'fg':"blue", 'text':"vampire lord", 'sort':1},
{'chr':"V", 'fg':"brightblue", 'text':"vampire mage", 'sort':1},
{'chr':"V", 'fg':"magenta", 'text':"Vlad the Impaler", 'sort':1},
{'chr':"V", 'fg':"red", 'text':"vampire", 'sort':1},
{'chr':"W", 'fg':"darkgray", 'text':"wraith", 'sort':1},
{'chr':"W", 'fg':"gray", 'text':"barrow wight", 'sort':1},
{'chr':"W", 'fg':"magenta", 'text':"Nazgul", 'sort':1},
{'chr':"X", 'fg':"brown", 'text':"xorn", 'sort':1},
{'chr':"Y", 'fg':"darkgray", 'text':"carnivorous ape", 'sort':1},
{'chr':"Y", 'fg':"brown", 'text':"ape", 'sort':1},
{'chr':"Y", 'fg':"brown", 'text':"owlbear", 'sort':1},
{'chr':"Y", 'fg':"gray", 'text':"monkey", 'sort':1},
{'chr':"Y", 'fg':"gray", 'text':"sasquatch", 'sort':1},
{'chr':"Y", 'fg':"white", 'text':"yeti", 'sort':1},
{'chr':"Z", 'fg':"darkgray", 'text':"ghoul", 'sort':1},
{'chr':"Z", 'fg':"blue", 'text':"ettin zombie", 'sort':1},
{'chr':"Z", 'fg':"brown", 'text':"kobold zombie", 'sort':1},
{'chr':"Z", 'fg':"brown", 'text':"gnome zombie", 'sort':1},
{'chr':"Z", 'fg':"cyan", 'text':"giant zombie", 'sort':1},
{'chr':"Z", 'fg':"green", 'text':"elf zombie", 'sort':1},
{'chr':"Z", 'fg':"gray", 'text':"orc zombie", 'sort':1},
{'chr':"Z", 'fg':"red", 'text':"dwarf zombie", 'sort':1},
{'chr':"Z", 'fg':"white", 'text':"human zombie", 'sort':1},
{'chr':"Z", 'fg':"white", 'text':"skeleton", 'sort':1},

{},

{'chr':" ", 'fg':"gray", 'text':"ghost", 'sort':1},
{'chr':" ", 'fg':"darkgray", 'text':"shade", 'sort':1},
{'chr':"&", 'fg':"blue", 'text':"water demon", 'sort':1},
{'chr':"&", 'fg':"brightblue", 'text':"mail daemon", 'sort':1},
{'chr':"&", 'fg':"brightgreen", 'text':"Juiblex", 'sort':1},
{'chr':"&", 'fg':"brown", 'text':"horned devil", 'sort':1},
{'chr':"&", 'fg':"gray", 'text':"succubus", 'sort':1},
{'chr':"&", 'fg':"gray", 'text':"incubus", 'sort':1},
{'chr':"&", 'fg':"gray", 'text':"bone devil", 'sort':1},
{'chr':"&", 'fg':"gray", 'text':"sandestin", 'sort':1},
{'chr':"&", 'fg':"magenta", 'text':"Yeenoghu", 'sort':1},
{'chr':"&", 'fg':"magenta", 'text':"Orcus", 'sort':1},
{'chr':"&", 'fg':"magenta", 'text':"Geryon", 'sort':1},
{'chr':"&", 'fg':"magenta", 'text':"Dispater", 'sort':1},
{'chr':"&", 'fg':"magenta", 'text':"Baalzebub", 'sort':1},
{'chr':"&", 'fg':"magenta", 'text':"Asmodeus", 'sort':1},
{'chr':"&", 'fg':"magenta", 'text':"Demogorgon", 'sort':1},
{'chr':"&", 'fg':"magenta", 'text':"Death", 'sort':1},
{'chr':"&", 'fg':"magenta", 'text':"Pestilence", 'sort':1},
{'chr':"&", 'fg':"magenta", 'text':"Famine", 'sort':1},
{'chr':"&", 'fg':"red", 'text':"erinys", 'sort':1},
{'chr':"&", 'fg':"red", 'text':"barbed devil", 'sort':1},
{'chr':"&", 'fg':"red", 'text':"marilith", 'sort':1},
{'chr':"&", 'fg':"red", 'text':"vrock", 'sort':1},
{'chr':"&", 'fg':"red", 'text':"hezrou", 'sort':1},
{'chr':"&", 'fg':"red", 'text':"nalfeshnee", 'sort':1},
{'chr':"&", 'fg':"red", 'text':"pit fiend", 'sort':1},
{'chr':"&", 'fg':"red", 'text':"balrog", 'sort':1},
{'chr':"&", 'fg':"red", 'text':"Minion of Huhetotl", 'sort':1},
{'chr':"&", 'fg':"red", 'text':"Nalzok", 'sort':1},
{'chr':"&", 'fg':"white", 'text':"ice devil", 'sort':1},
{'chr':"&", 'fg':"yellow", 'text':"djinni", 'sort':1},
{'chr':"'", 'fg':"brown", 'text':"rope golem", 'sort':1},
{'chr':"'", 'fg':"brown", 'text':"leather golem", 'sort':1},
{'chr':"'", 'fg':"brown", 'text':"wood golem", 'sort':1},
{'chr':"'", 'fg':"brown", 'text':"clay golem", 'sort':1},
{'chr':"'", 'fg':"cyan", 'text':"glass golem", 'sort':1},
{'chr':"'", 'fg':"cyan", 'text':"iron golem", 'sort':1},
{'chr':"'", 'fg':"gray", 'text':"stone golem", 'sort':1},
{'chr':"'", 'fg':"red", 'text':"flesh golem", 'sort':1},
{'chr':"'", 'fg':"white", 'text':"paper golem", 'sort':1},
{'chr':"'", 'fg':"yellow", 'text':"straw golem", 'sort':1},
{'chr':"'", 'fg':"yellow", 'text':"gold golem", 'sort':1},
{'chr':":", 'fg':"orange", 'text':"salamander", 'sort':1},
{'chr':":", 'fg':"brown", 'text':"iguana", 'sort':1},
{'chr':":", 'fg':"brown", 'text':"baby crocodile", 'sort':1},
{'chr':":", 'fg':"brown", 'text':"chameleon", 'sort':1},
{'chr':":", 'fg':"brown", 'text':"crocodile", 'sort':1},
{'chr':":", 'fg':"green", 'text':"gecko", 'sort':1},
{'chr':":", 'fg':"green", 'text':"lizard", 'sort':1},
{'chr':":", 'fg':"yellow", 'text':"newt", 'sort':1},
{'chr':";", 'fg':"blue", 'text':"jellyfish", 'sort':1},
{'chr':";", 'fg':"brightblue", 'text':"electric eel", 'sort':1},
{'chr':";", 'fg':"cyan", 'text':"giant eel", 'sort':1},
{'chr':";", 'fg':"gray", 'text':"shark", 'sort':1},
{'chr':";", 'fg':"red", 'text':"piranha", 'sort':1},
{'chr':";", 'fg':"red", 'text':"kraken", 'sort':1},
{'chr':"@", 'fg':"darkgray", 'text':"Grand Master", 'sort':1},
{'chr':"@", 'fg':"darkgray", 'text':"Dark One", 'sort':1},
{'chr':"@", 'fg':"blue", 'text':"guard", 'sort':1},
{'chr':"@", 'fg':"blue", 'text':"captain", 'sort':1},
{'chr':"@", 'fg':"brightblue", 'text':"elf-lord", 'sort':1},
{'chr':"@", 'fg':"brightblue", 'text':"Oracle", 'sort':1},
{'chr':"@", 'fg':"brightgreen", 'text':"Green-elf", 'sort':1},
{'chr':"@", 'fg':"brightgreen", 'text':"Medusa", 'sort':1},
{'chr':"@", 'fg':"orange", 'text':"werewolf (human)", 'sort':1},
{'chr':"@", 'fg':"brown", 'text':"wererat (human)", 'sort':1},
{'chr':"@", 'fg':"green", 'text':"Woodland-elf", 'sort':1},
{'chr':"@", 'fg':"green", 'text':"lieutenant", 'sort':1},
{'chr':"@", 'fg':"green", 'text':"watch captain", 'sort':1},
{'chr':"@", 'fg':"green", 'text':"Neferet the Green", 'sort':1},
{'chr':"@", 'fg':"gray", 'text':"Grey-elf", 'sort':1},
{'chr':"@", 'fg':"gray", 'text':"soldier", 'sort':1},
{'chr':"@", 'fg':"gray", 'text':"watchman", 'sort':1},
{'chr':"@", 'fg':"magenta", 'text':"Elvenking", 'sort':1},
{'chr':"@", 'fg':"magenta", 'text':"Wizard of Yendor", 'sort':1},
{'chr':"@", 'fg':"magenta", 'text':"Croesus", 'sort':1},
{'chr':"@", 'fg':"magenta", 'text':"Lord Carnarvon", 'sort':1},
{'chr':"@", 'fg':"magenta", 'text':"Pelias", 'sort':1},
{'chr':"@", 'fg':"magenta", 'text':"Shaman Karnov", 'sort':1},
{'chr':"@", 'fg':"magenta", 'text':"Earendil", 'sort':1},
{'chr':"@", 'fg':"magenta", 'text':"Hippocrates", 'sort':1},
{'chr':"@", 'fg':"magenta", 'text':"King Arthur", 'sort':1},
{'chr':"@", 'fg':"magenta", 'text':"Orion", 'sort':1},
{'chr':"@", 'fg':"magenta", 'text':"Master of Thieves", 'sort':1},
{'chr':"@", 'fg':"magenta", 'text':"Lord Sato", 'sort':1},
{'chr':"@", 'fg':"magenta", 'text':"Norn", 'sort':1},
{'chr':"@", 'fg':"magenta", 'text':"Thoth Amon", 'sort':1},
{'chr':"@", 'fg':"magenta", 'text':"Master Kaen", 'sort':1},
{'chr':"@", 'fg':"magenta", 'text':"Master Assassin", 'sort':1},
{'chr':"@", 'fg':"magenta", 'text':"Ashikaga Takauji", 'sort':1},
{'chr':"@", 'fg':"red", 'text':"werejackal (human)", 'sort':1},
{'chr':"@", 'fg':"red", 'text':"sergeant", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"human", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"elf", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"doppelganger", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"nurse", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"shopkeeper", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"prisoner", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"aligned priest", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"high priest", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"Charon", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"archeologist", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"barbarian", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"caveman", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"cavewoman", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"healer", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"knight", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"monk", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"priest", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"priestess", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"ranger", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"rogue", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"samurai", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"tourist", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"valkyrie", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"wizard", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"Arch Priest", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"Twoflower", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"student", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"chieftain", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"neanderthal", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"High-elf", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"attendant", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"page", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"abbot", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"acolyte", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"hunter", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"thug", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"ninja", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"roshi", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"guide", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"warrior", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"apprentice", 'sort':1},
{'chr':"~", 'fg':"brown", 'text':"long worm tail", 'sort':1},
{'chr':"]", 'fg':"darkgray", 'text':"strange object", 'sort':1},

{ },


  /* item suggestions */
{'chr':")", 'fg':"cyan", 'text':"weapon, metal", 'sort':2},
{'chr':")", 'fg':"brown", 'text':"weapon, wood", 'sort':2},
{'chr':"[", 'fg':"cyan", 'text':"armor, metal", 'sort':2},
{'chr':"[", 'fg':"brown", 'text':"armor, leather", 'sort':2},
{'chr':"=", 'fg':"white", 'text':"ring", 'sort':2},
{'chr':'"', 'fg':"cyan", 'text':"amulet", 'sort':2},
{'chr':"(", 'fg':"yellow", 'text':"tool", 'sort':2},
{'chr':"%", 'fg':"brown", 'text':"food", 'sort':2},
{'chr':"!", 'fg':"red", 'text':"potion", 'sort':2},
{'chr':"?", 'fg':"white", 'text':"scroll", 'sort':2},
{'chr':"+", 'fg':"brightgreen", 'text':"spellbook", 'sort':2},
{'chr':"/", 'fg':"magenta", 'text':"wand", 'sort':2},
{'chr':"$", 'fg':"yellow", 'text':"gold", 'sort':2},
{'chr':"*", 'fg':"gray",  'text':"gem", 'sort':2},
{'chr':"*", 'fg':"gray",  'text':"rock", 'sort':2},
{'chr':"`", 'fg':"white", 'text':"statue", 'sort':2},
{'chr':"`", 'fg':"gray",  'text':"boulder", 'sort':2},
{'chr':"`", 'fg':"gray",  'text':"statue", 'sort':2},
{'chr':"0", 'fg':"gray",  'text':"boulder", 'sort':2},
{'chr':"0", 'fg':"cyan", 'text':"iron ball", 'sort':2},
{'chr':"_", 'fg':"cyan", 'text':"iron chain", 'sort':2},
{'chr':".", 'fg':"brown", 'text':"venom", 'sort':2},

{ },

/* traps */

{'chr':"^", 'text':"arrow trap",     'fg':"cyan", 'sort':3},
{'chr':"^", 'text':"dart trap",      'fg':"cyan", 'sort':3},
{'chr':"^", 'text':"falling rock trap", 'fg':"gray", 'sort':3},
{'chr':"^", 'text':"squeaky board",  'fg':"brown", 'sort':3},
{'chr':"^", 'text':"bear trap",      'fg':"cyan", 'sort':3},
{'chr':"^", 'text':"land mine",      'fg':"red", 'sort':3},
{'chr':"^", 'text':"rolling boulder trap",  'fg':"gray", 'sort':3},
{'chr':"^", 'text':"sleeping gas trap", 'fg':"brightblue", 'sort':3},
{'chr':"^", 'text':"rust trap",      'fg':"blue", 'sort':3},
{'chr':"^", 'text':"fire trap",      'fg':"orange", 'sort':3},
{'chr':"^", 'text':"pit",            'fg':"darkgray", 'sort':3},
{'chr':"^", 'text':"spiked pit",     'fg':"darkgray", 'sort':3},
{'chr':"^", 'text':"hole",           'fg':"brown", 'sort':3},
{'chr':"^", 'text':"trap door",      'fg':"brown", 'sort':3},
{'chr':"^", 'text':"teleportation trap", 'fg':"magenta", 'sort':3},
{'chr':"^", 'text':"level teleporter", 'fg':"magenta", 'sort':3},
{'chr':"^", 'text':"magic portal",   'fg':"brightmagenta", 'sort':3},
{'chr':'"', 'text':"web",           'fg':"gray", 'sort':3},
{'chr':"^", 'text':"statue trap",   'fg':"gray", 'sort':3},
{'chr':"^", 'text':"magic trap",     'fg':"brightblue", 'sort':3},
{'chr':"^", 'text':"anti-magic field", 'fg':"brightblue", 'sort':3},
{'chr':"^", 'text':"polymorph trap", 'fg':"brightgreen", 'sort':3},

{ },

/* terrain features */

{'chr':" ", 'fg':"gray", 'text':"solid rock", 'sort':4},
{'chr':".", 'fg':"gray", 'text':"room floor", 'sort':4},
{'chr':".", 'fg':"gray", 'text':"doorway", 'sort':4},
{'chr':"-", 'fg':"gray", 'text':"wall, horizontal", 'sort':4},
{'chr':"|", 'fg':"gray", 'text':"wall, vertical", 'sort':4},

{'chr':"+", 'fg':"brown", 'text':"door, closed", 'sort':4},
{'chr':"-", 'fg':"brown", 'text':"open door, vertical", 'sort':4},
{'chr':"|", 'fg':"brown", 'text':"open door, horizontal", 'sort':4},

{'chr':"#", 'fg':"gray", 'text':"corridor", 'sort':4},
{'chr':"#", 'fg':"gray", 'text':"cloud", 'sort':4},
{'chr':"#", 'fg':"gray", 'text':"kitchen sink", 'sort':4},
{'chr':"#", 'fg':"white", 'text':"corridor, lit", 'sort':4},
{'chr':"#", 'fg':"cyan", 'text':"iron bars", 'sort':4},
{'chr':"#", 'fg':"green", 'text':"tree", 'sort':4},
{'chr':"#", 'fg':"brown", 'text':"raised drawbridge", 'sort':4},
{'chr':".", 'fg':"brown", 'text':"lowered drawbridge", 'sort':4},

{'chr':"<", 'fg':"gray", 'text':"stairs up", 'sort':4},
{'chr':">", 'fg':"gray", 'text':"stairs down", 'sort':4},
{'chr':"<", 'fg':"brown", 'text':"ladder up", 'sort':4},
{'chr':">", 'fg':"brown", 'text':"ladder down", 'sort':4},

{'chr':"_", 'fg':"gray", 'text':"altar", 'sort':4},
{'chr':"|", 'fg':"gray", 'text':"grave", 'sort':4},

{'chr':"\\", 'fg':"yellow", 'text':"throne", 'sort':4},
{'chr':"{", 'fg':"blue", 'text':"fountain", 'sort':4},

{'chr':"}", 'fg':"blue", 'text':"water, pool", 'sort':4},
{'chr':"}", 'fg':"red", 'text':"lava", 'sort':4},

{'chr':".", 'fg':"cyan", 'text':"ice", 'sort':4},

{},

{'chr':"!", 'fg':"white", 'text':"camera flash", 'sort':5},
{'chr':"*", 'fg':"white", 'text':"digging beam", 'sort':5},

{'chr':"1", 'fg':"red", 'text':"warning symbol, 1", 'sort':5},
{'chr':"2", 'fg':"red", 'text':"warning symbol, 2", 'sort':5},
{'chr':"3", 'fg':"red", 'text':"warning symbol, 3", 'sort':5},
{'chr':"4", 'fg':"magenta", 'text':"warning symbol, 4", 'sort':5},
{'chr':"5", 'fg':"brightmagenta", 'text':"warning symbol, 5", 'sort':5}

);


var angband_symbols_array = new Array(

{'chr':"A", 'fg':"brightblue", 'text':"Archangel", 'sort':1},
{'chr':"A", 'fg':"brightgreen", 'text':"Cherub", 'sort':1},
{'chr':"A", 'fg':"darkgray", 'text':"Azriel, Angel of Death", 'sort':1},
{'chr':"A", 'fg':"orange", 'text':"Angel", 'sort':1},
{'chr':"A", 'fg':"orange", 'text':"Uriel, Angel of Fire", 'sort':1},
{'chr':"A", 'fg':"red", 'text':"Seraph", 'sort':1},
{'chr':"A", 'fg':"white", 'text':"Gabriel, the Messenger", 'sort':1},
{'chr':"A", 'fg':"yellow", 'text':"Archon", 'sort':1},
{'chr':"B", 'fg':"brown", 'text':"Giant roc", 'sort':1},
{'chr':"B", 'fg':"brown", 'text':"Nighthawk", 'sort':1},
{'chr':"B", 'fg':"darkgray", 'text':"Crebain", 'sort':1},
{'chr':"B", 'fg':"darkgray", 'text':"Raven", 'sort':1},
{'chr':"B", 'fg':"darkgray", 'text':"Winged Horror", 'sort':1},
{'chr':"B", 'fg':"gray", 'text':"Crow", 'sort':1},
{'chr':"B", 'fg':"red", 'text':"The Phoenix", 'sort':1},
{'chr':"C", 'fg':"brightblue", 'text':"Blink dog", 'sort':1},
{'chr':"C", 'fg':"brown", 'text':"Draugluin, Sire of All Werewolves", 'sort':1},
{'chr':"C", 'fg':"brown", 'text':"Fang, Farmer Maggot's dog", 'sort':1},
{'chr':"C", 'fg':"brown", 'text':"Grip, Farmer Maggot's dog", 'sort':1},
{'chr':"C", 'fg':"brown", 'text':"Jackal", 'sort':1},
{'chr':"C", 'fg':"brown", 'text':"Scruffy little dog", 'sort':1},
{'chr':"C", 'fg':"brown", 'text':"Wolf", 'sort':1},
{'chr':"C", 'fg':"darkgray", 'text':"Werewolf", 'sort':1},
{'chr':"C", 'fg':"darkgray", 'text':"Wolf chieftain", 'sort':1},
{'chr':"C", 'fg':"gray", 'text':"Huan, Wolfhound of the Valar", 'sort':1},
{'chr':"C", 'fg':"gray", 'text':"Warg", 'sort':1},
{'chr':"C", 'fg':"red", 'text':"Carcharoth, the Jaws of Thirst", 'sort':1},
{'chr':"C", 'fg':"red", 'text':"Hellhound", 'sort':1},
{'chr':"C", 'fg':"red", 'text':"Hellhound", 'sort':1},
{'chr':"C", 'fg':"white", 'text':"White wolf", 'sort':1},
{'chr':"D", 'fg':"blue", 'text':"Ancient blue dragon", 'sort':1},
{'chr':"D", 'fg':"blue", 'text':"Great Storm Wyrm", 'sort':1},
{'chr':"D", 'fg':"brightblue", 'text':"Great Wyrm of Law", 'sort':1},
{'chr':"D", 'fg':"brightgreen", 'text':"Death drake", 'sort':1},
{'chr':"D", 'fg':"brightgreen", 'text':"Dracolich", 'sort':1},
{'chr':"D", 'fg':"brown", 'text':"Ancient bronze dragon", 'sort':1},
{'chr':"D", 'fg':"brown", 'text':"Great Wyrm of Perplexity", 'sort':1},
{'chr':"D", 'fg':"brown", 'text':"Great crystal drake", 'sort':1},
{'chr':"D", 'fg':"darkgray", 'text':"Ancalagon the Black", 'sort':1},
{'chr':"D", 'fg':"gray", 'text':"Ancient black dragon", 'sort':1},
{'chr':"D", 'fg':"gray", 'text':"Great Bile Wyrm", 'sort':1},
{'chr':"D", 'fg':"gray", 'text':"Scatha the Worm", 'sort':1},
{'chr':"D", 'fg':"green", 'text':"Ancient green dragon", 'sort':1},
{'chr':"D", 'fg':"green", 'text':"Great Swamp Wyrm", 'sort':1},
{'chr':"D", 'fg':"magenta", 'text':"Ancient multi-hued dragon", 'sort':1},
{'chr':"D", 'fg':"magenta", 'text':"Great Wyrm of Balance", 'sort':1},
{'chr':"D", 'fg':"magenta", 'text':"Great Wyrm of Chaos", 'sort':1},
{'chr':"D", 'fg':"magenta", 'text':"Great Wyrm of Many Colours", 'sort':1},
{'chr':"D", 'fg':"orange", 'text':"Dracolisk", 'sort':1},
{'chr':"D", 'fg':"orange", 'text':"Ethereal dragon", 'sort':1},
{'chr':"D", 'fg':"orange", 'text':"Glaurung, Father of the Dragons", 'sort':1},
{'chr':"D", 'fg':"orange", 'text':"Itangast the Fire Drake", 'sort':1},
{'chr':"D", 'fg':"orange", 'text':"Smaug the Golden", 'sort':1},
{'chr':"D", 'fg':"red", 'text':"Ancient red dragon", 'sort':1},
{'chr':"D", 'fg':"red", 'text':"Great Hell Wyrm", 'sort':1},
{'chr':"D", 'fg':"white", 'text':"Ancient white dragon", 'sort':1},
{'chr':"D", 'fg':"white", 'text':"Great Ice Wyrm", 'sort':1},
{'chr':"D", 'fg':"yellow", 'text':"Ancient gold dragon", 'sort':1},
{'chr':"D", 'fg':"yellow", 'text':"Great Wyrm of Thunder", 'sort':1},
{'chr':"E", 'fg':"blue", 'text':"Waldern, King of Water", 'sort':1},
{'chr':"E", 'fg':"blue", 'text':"Water elemental", 'sort':1},
{'chr':"E", 'fg':"blue", 'text':"Water spirit", 'sort':1},
{'chr':"E", 'fg':"brightblue", 'text':"Air elemental", 'sort':1},
{'chr':"E", 'fg':"brightblue", 'text':"Air spirit", 'sort':1},
{'chr':"E", 'fg':"brightblue", 'text':"Ariel, Queen of Air", 'sort':1},
{'chr':"E", 'fg':"brown", 'text':"Earth elemental", 'sort':1},
{'chr':"E", 'fg':"brown", 'text':"Earth spirit", 'sort':1},
{'chr':"E", 'fg':"brown", 'text':"Quaker, Master of Earth", 'sort':1},
{'chr':"E", 'fg':"gray", 'text':"Will o' the wisp", 'sort':1},
{'chr':"E", 'fg':"green", 'text':"Ooze elemental", 'sort':1},
{'chr':"E", 'fg':"orange", 'text':"Magma elemental", 'sort':1},
{'chr':"E", 'fg':"orange", 'text':"Smoke elemental", 'sort':1},
{'chr':"E", 'fg':"red", 'text':"Fire elemental", 'sort':1},
{'chr':"E", 'fg':"red", 'text':"Fire spirit", 'sort':1},
{'chr':"E", 'fg':"red", 'text':"Vargo, Tyrant of Fire", 'sort':1},
{'chr':"E", 'fg':"white", 'text':"Ice elemental", 'sort':1},
{'chr':"E", 'fg':"yellow", 'text':"Invisible stalker", 'sort':1},
{'chr':"F", 'fg':"brown", 'text':"Giant bronze dragon fly", 'sort':1},
{'chr':"F", 'fg':"gray", 'text':"Giant black dragon fly", 'sort':1},
{'chr':"F", 'fg':"green", 'text':"Giant green dragon fly", 'sort':1},
{'chr':"F", 'fg':"white", 'text':"Giant white dragon fly", 'sort':1},
{'chr':"F", 'fg':"yellow", 'text':"Giant gold dragon fly", 'sort':1},
{'chr':"G", 'fg':"blue", 'text':"Banshee", 'sort':1},
{'chr':"G", 'fg':"brightblue", 'text':"Lost soul", 'sort':1},
{'chr':"G", 'fg':"brightgreen", 'text':"Spirit troll", 'sort':1},
{'chr':"G", 'fg':"brown", 'text':"Moaning spirit", 'sort':1},
{'chr':"G", 'fg':"brown", 'text':"Spectre", 'sort':1},
{'chr':"G", 'fg':"darkgray", 'text':"Shade", 'sort':1},
{'chr':"G", 'fg':"darkgray", 'text':"Shadow", 'sort':1},
{'chr':"G", 'fg':"gray", 'text':"Poltergeist", 'sort':1},
{'chr':"G", 'fg':"green", 'text':"Green glutton ghost", 'sort':1},
{'chr':"G", 'fg':"magenta", 'text':"Phantom", 'sort':1},
{'chr':"G", 'fg':"orange", 'text':"Dread", 'sort':1},
{'chr':"G", 'fg':"orange", 'text':"Dread", 'sort':1},
{'chr':"G", 'fg':"orange", 'text':"Tselakus, the Dreadlord", 'sort':1},
{'chr':"G", 'fg':"red", 'text':"Dreadlord", 'sort':1},
{'chr':"G", 'fg':"white", 'text':"Ghost", 'sort':1},
{'chr':"G", 'fg':"yellow", 'text':"Dreadmaster", 'sort':1},
{'chr':"H", 'fg':"brown", 'text':"Griffon", 'sort':1},
{'chr':"H", 'fg':"brown", 'text':"Hippogriff", 'sort':1},
{'chr':"H", 'fg':"darkgray", 'text':"Black harpy", 'sort':1},
{'chr':"H", 'fg':"gray", 'text':"Minotaur", 'sort':1},
{'chr':"H", 'fg':"magenta", 'text':"Baphomet the Minotaur Lord", 'sort':1},
{'chr':"H", 'fg':"magenta", 'text':"Jabberwock", 'sort':1},
{'chr':"H", 'fg':"orange", 'text':"Gorgimaera", 'sort':1},
{'chr':"H", 'fg':"red", 'text':"Chimaera", 'sort':1},
{'chr':"H", 'fg':"white", 'text':"White harpy", 'sort':1},
{'chr':"H", 'fg':"yellow", 'text':"Manticore", 'sort':1},
{'chr':"I", 'fg':"brightgreen", 'text':"Giant fruit fly", 'sort':1},
{'chr':"I", 'fg':"darkgray", 'text':"Neekerbreeker", 'sort':1},
{'chr':"I", 'fg':"gray", 'text':"Giant flea", 'sort':1},
{'chr':"I", 'fg':"red", 'text':"Giant firefly", 'sort':1},
{'chr':"I", 'fg':"yellow", 'text':"Hummerhorn", 'sort':1},
{'chr':"J", 'fg':"brown", 'text':"Large brown snake", 'sort':1},
{'chr':"J", 'fg':"darkgray", 'text':"Black mamba", 'sort':1},
{'chr':"J", 'fg':"gray", 'text':"Large grey snake", 'sort':1},
{'chr':"J", 'fg':"green", 'text':"King cobra", 'sort':1},
{'chr':"J", 'fg':"orange", 'text':"Copperhead snake", 'sort':1},
{'chr':"J", 'fg':"red", 'text':"Rattlesnake", 'sort':1},
{'chr':"J", 'fg':"white", 'text':"Large white snake", 'sort':1},
{'chr':"J", 'fg':"yellow", 'text':"Large yellow snake", 'sort':1},
{'chr':"K", 'fg':"brown", 'text':"Killer brown beetle", 'sort':1},
{'chr':"K", 'fg':"darkgray", 'text':"Death watch beetle", 'sort':1},
{'chr':"K", 'fg':"green", 'text':"Killer stag beetle", 'sort':1},
{'chr':"K", 'fg':"magenta", 'text':"Killer iridescent beetle", 'sort':1},
{'chr':"K", 'fg':"orange", 'text':"Killer fire beetle", 'sort':1},
{'chr':"K", 'fg':"red", 'text':"Killer red beetle", 'sort':1},
{'chr':"K", 'fg':"white", 'text':"Killer white beetle", 'sort':1},
{'chr':"K", 'fg':"yellow", 'text':"Killer slicer beetle", 'sort':1},
{'chr':"L", 'fg':"brightblue", 'text':"Archlich", 'sort':1},
{'chr':"L", 'fg':"brown", 'text':"Demilich", 'sort':1},
{'chr':"L", 'fg':"darkgray", 'text':"Black reaver", 'sort':1},
{'chr':"L", 'fg':"magenta", 'text':"Vecna, the Emperor Lich", 'sort':1},
{'chr':"L", 'fg':"orange", 'text':"Lich", 'sort':1},
{'chr':"L", 'fg':"red", 'text':"Master lich", 'sort':1},
{'chr':"L", 'fg':"yellow", 'text':"Feagwath, the Undead Sorcerer", 'sort':1},
{'chr':"M", 'fg':"brightgreen", 'text':"7-headed hydra", 'sort':1},
{'chr':"M", 'fg':"brown", 'text':"2-headed hydra", 'sort':1},
{'chr':"M", 'fg':"green", 'text':"5-headed hydra", 'sort':1},
{'chr':"M", 'fg':"magenta", 'text':"The Lernaean Hydra", 'sort':1},
{'chr':"M", 'fg':"orange", 'text':"11-headed hydra", 'sort':1},
{'chr':"M", 'fg':"orange", 'text':"3-headed hydra", 'sort':1},
{'chr':"M", 'fg':"red", 'text':"9-headed hydra", 'sort':1},
{'chr':"M", 'fg':"yellow", 'text':"4-headed hydra", 'sort':1},
{'chr':"O", 'fg':"blue", 'text':"Ogre chieftain", 'sort':1},
{'chr':"O", 'fg':"brightgreen", 'text':"Ogre shaman", 'sort':1},
{'chr':"O", 'fg':"brown", 'text':"Cave ogre", 'sort':1},
{'chr':"O", 'fg':"brown", 'text':"Ogre", 'sort':1},
{'chr':"O", 'fg':"darkgray", 'text':"Black ogre", 'sort':1},
{'chr':"O", 'fg':"magenta", 'text':"Lokkak, the Ogre Chieftain", 'sort':1},
{'chr':"O", 'fg':"red", 'text':"Ogre mage", 'sort':1},
{'chr':"P", 'fg':"blue", 'text':"Cloud giant", 'sort':1},
{'chr':"P", 'fg':"brightblue", 'text':"Storm giant", 'sort':1},
{'chr':"P", 'fg':"brown", 'text':"Cyclops", 'sort':1},
{'chr':"P", 'fg':"brown", 'text':"Hill giant", 'sort':1},
{'chr':"P", 'fg':"darkgray", 'text':"Morgoth, Lord of Darkness", 'sort':1},
{'chr':"P", 'fg':"gray", 'text':"Atlas, the Titan", 'sort':1},
{'chr':"P", 'fg':"gray", 'text':"Stone giant", 'sort':1},
{'chr':"P", 'fg':"green", 'text':"Polyphemus, the Blind Cyclops", 'sort':1},
{'chr':"P", 'fg':"magenta", 'text':"Kronos, Lord of the Titans", 'sort':1},
{'chr':"P", 'fg':"orange", 'text':"Greater titan", 'sort':1},
{'chr':"P", 'fg':"red", 'text':"Fire giant", 'sort':1},
{'chr':"P", 'fg':"white", 'text':"Frost giant", 'sort':1},
{'chr':"P", 'fg':"yellow", 'text':"Lesser titan", 'sort':1},
{'chr':"Q", 'fg':"brightblue", 'text':"Master quylthulg", 'sort':1},
{'chr':"Q", 'fg':"brightgreen", 'text':"Greater draconic quylthulg", 'sort':1},
{'chr':"Q", 'fg':"brown", 'text':"Greater rotting quylthulg", 'sort':1},
{'chr':"Q", 'fg':"brown", 'text':"Rotting quylthulg", 'sort':1},
{'chr':"Q", 'fg':"green", 'text':"Draconic quylthulg", 'sort':1},
{'chr':"Q", 'fg':"magenta", 'text':"Nexus quylthulg", 'sort':1},
{'chr':"Q", 'fg':"magenta", 'text':"Qlzqqlzuup, the Emperor Quylthulg", 'sort':1},
{'chr':"Q", 'fg':"orange", 'text':"Greater demonic quylthulg", 'sort':1},
{'chr':"Q", 'fg':"red", 'text':"Demonic quylthulg", 'sort':1},
{'chr':"Q", 'fg':"yellow", 'text':"Quylthulg", 'sort':1},
{'chr':"R", 'fg':"blue", 'text':"Night lizard", 'sort':1},
{'chr':"R", 'fg':"brown", 'text':"Cave lizard", 'sort':1},
{'chr':"R", 'fg':"brown", 'text':"Rock lizard", 'sort':1},
{'chr':"R", 'fg':"darkgray", 'text':"Greater basilisk", 'sort':1},
{'chr':"R", 'fg':"gray", 'text':"Basilisk", 'sort':1},
{'chr':"R", 'fg':"green", 'text':"Giant green frog", 'sort':1},
{'chr':"R", 'fg':"magenta", 'text':"The Tarrasque", 'sort':1},
{'chr':"R", 'fg':"orange", 'text':"Salamander", 'sort':1},
{'chr':"R", 'fg':"red", 'text':"Giant red frog", 'sort':1},
{'chr':"R", 'fg':"yellow", 'text':"Giant salamander", 'sort':1},
{'chr':"S", 'fg':"blue", 'text':"Drider", 'sort':1},
{'chr':"S", 'fg':"brightblue", 'text':"Phase spider", 'sort':1},
{'chr':"S", 'fg':"brown", 'text':"Giant brown tick", 'sort':1},
{'chr':"S", 'fg':"brown", 'text':"Wood spider", 'sort':1},
{'chr':"S", 'fg':"darkgray", 'text':"Cave spider", 'sort':1},
{'chr':"S", 'fg':"darkgray", 'text':"Shelob, Spider of Darkness", 'sort':1},
{'chr':"S", 'fg':"darkgray", 'text':"Ungoliant, the Unlight", 'sort':1},
{'chr':"S", 'fg':"gray", 'text':"Giant grey scorpion", 'sort':1},
{'chr':"S", 'fg':"green", 'text':"Mirkwood spider", 'sort':1},
{'chr':"S", 'fg':"magenta", 'text':"Giant spider", 'sort':1},
{'chr':"S", 'fg':"orange", 'text':"Aranea", 'sort':1},
{'chr':"S", 'fg':"orange", 'text':"Giant fire tick", 'sort':1},
{'chr':"S", 'fg':"orange", 'text':"Giant tarantula", 'sort':1},
{'chr':"S", 'fg':"red", 'text':"Elder aranea", 'sort':1},
{'chr':"S", 'fg':"red", 'text':"Giant red scorpion", 'sort':1},
{'chr':"S", 'fg':"white", 'text':"Giant white tick", 'sort':1},
{'chr':"S", 'fg':"yellow", 'text':"Giant yellow scorpion", 'sort':1},
{'chr':"T", 'fg':"blue", 'text':"Ettin", 'sort':1},
{'chr':"T", 'fg':"brightblue", 'text':"Water troll", 'sort':1},
{'chr':"T", 'fg':"brightgreen", 'text':"Troll priest", 'sort':1},
{'chr':"T", 'fg':"brown", 'text':"Cave troll", 'sort':1},
{'chr':"T", 'fg':"brown", 'text':"Half-troll", 'sort':1},
{'chr':"T", 'fg':"darkgray", 'text':"Rogrog the Black Troll", 'sort':1},
{'chr':"T", 'fg':"gray", 'text':"Bert the Stone Troll", 'sort':1},
{'chr':"T", 'fg':"gray", 'text':"Bill the Stone Troll", 'sort':1},
{'chr':"T", 'fg':"gray", 'text':"Stone troll", 'sort':1},
{'chr':"T", 'fg':"gray", 'text':"Tom the Stone Troll", 'sort':1},
{'chr':"T", 'fg':"green", 'text':"Forest troll", 'sort':1},
{'chr':"T", 'fg':"magenta", 'text':"Troll chieftain", 'sort':1},
{'chr':"T", 'fg':"orange", 'text':"Algroth", 'sort':1},
{'chr':"T", 'fg':"red", 'text':"Eldrak", 'sort':1},
{'chr':"T", 'fg':"white", 'text':"Ice troll", 'sort':1},
{'chr':"T", 'fg':"yellow", 'text':"Olog", 'sort':1},
{'chr':"U", 'fg':"blue", 'text':"Pazuzu, Lord of Air", 'sort':1},
{'chr':"U", 'fg':"brightblue", 'text':"Horned Reaper", 'sort':1},
{'chr':"U", 'fg':"brightgreen", 'text':"Barbazu", 'sort':1},
{'chr':"U", 'fg':"brown", 'text':"Erinyes", 'sort':1},
{'chr':"U", 'fg':"brown", 'text':"Glabrezu", 'sort':1},
{'chr':"U", 'fg':"gray", 'text':"Osyluth", 'sort':1},
{'chr':"U", 'fg':"gray", 'text':"Vrock", 'sort':1},
{'chr':"U", 'fg':"green", 'text':"Hezrou", 'sort':1},
{'chr':"U", 'fg':"magenta", 'text':"Gothmog, the High Captain of Balrogs", 'sort':1},
{'chr':"U", 'fg':"magenta", 'text':"Greater Balrog", 'sort':1},
{'chr':"U", 'fg':"magenta", 'text':"Lesser Balrog", 'sort':1},
{'chr':"U", 'fg':"magenta", 'text':"Lungorthin, the Balrog of White Fire", 'sort':1},
{'chr':"U", 'fg':"magenta", 'text':"The Balrog of Moria", 'sort':1},
{'chr':"U", 'fg':"orange", 'text':"Bile Demon", 'sort':1},
{'chr':"U", 'fg':"orange", 'text':"Pit Fiend", 'sort':1},
{'chr':"U", 'fg':"red", 'text':"Nalfeshnee", 'sort':1},
{'chr':"U", 'fg':"white", 'text':"Gelugon", 'sort':1},
{'chr':"U", 'fg':"yellow", 'text':"Marilith", 'sort':1},
{'chr':"V", 'fg':"blue", 'text':"Vampire lord", 'sort':1},
{'chr':"V", 'fg':"gray", 'text':"Vampire", 'sort':1},
{'chr':"V", 'fg':"green", 'text':"Master vampire", 'sort':1},
{'chr':"V", 'fg':"magenta", 'text':"Thuringwethil, the Vampire Messenger", 'sort':1},
{'chr':"V", 'fg':"red", 'text':"Elder vampire", 'sort':1},
{'chr':"W", 'fg':"blue", 'text':"Grave wight", 'sort':1},
{'chr':"W", 'fg':"brightgreen", 'text':"Nether wraith", 'sort':1},
{'chr':"W", 'fg':"darkgray", 'text':"Adunaphel the Quiet", 'sort':1},
{'chr':"W", 'fg':"darkgray", 'text':"Akhorahil the Blind", 'sort':1},
{'chr':"W", 'fg':"darkgray", 'text':"Black wraith", 'sort':1},
{'chr':"W", 'fg':"darkgray", 'text':"Dwar, Dog Lord of Waw", 'sort':1},
{'chr':"W", 'fg':"darkgray", 'text':"Hoarmurath of Dir", 'sort':1},
{'chr':"W", 'fg':"darkgray", 'text':"Ji Indur Dawndeath", 'sort':1},
{'chr':"W", 'fg':"darkgray", 'text':"Khamul, the Black Easterling", 'sort':1},
{'chr':"W", 'fg':"darkgray", 'text':"Nightcrawler", 'sort':1},
{'chr':"W", 'fg':"darkgray", 'text':"Nightwalker", 'sort':1},
{'chr':"W", 'fg':"darkgray", 'text':"Nightwing", 'sort':1},
{'chr':"W", 'fg':"darkgray", 'text':"Ren the Unclean", 'sort':1},
{'chr':"W", 'fg':"darkgray", 'text':"The Witch-King of Angmar", 'sort':1},
{'chr':"W", 'fg':"darkgray", 'text':"Uvatha the Horseman", 'sort':1},
{'chr':"W", 'fg':"gray", 'text':"Grey wraith", 'sort':1},
{'chr':"W", 'fg':"green", 'text':"Forest wight", 'sort':1},
{'chr':"W", 'fg':"magenta", 'text':"Barrow wight", 'sort':1},
{'chr':"W", 'fg':"red", 'text':"Emperor wight", 'sort':1},
{'chr':"W", 'fg':"white", 'text':"White wraith", 'sort':1},
{'chr':"X", 'fg':"brown", 'text':"Umber hulk", 'sort':1},
{'chr':"X", 'fg':"brown", 'text':"Xorn", 'sort':1},
{'chr':"X", 'fg':"gray", 'text':"Xaren", 'sort':1},
{'chr':"Y", 'fg':"green", 'text':"Sasquatch", 'sort':1},
{'chr':"Y", 'fg':"white", 'text':"Yeti", 'sort':1},
{'chr':"Z", 'fg':"blue", 'text':"Energy hound", 'sort':1},
{'chr':"Z", 'fg':"brightblue", 'text':"Time hound", 'sort':1},
{'chr':"Z", 'fg':"brightgreen", 'text':"Ethereal hound", 'sort':1},
{'chr':"Z", 'fg':"brightgreen", 'text':"Nether hound", 'sort':1},
{'chr':"Z", 'fg':"brown", 'text':"Earth hound", 'sort':1},
{'chr':"Z", 'fg':"brown", 'text':"Impact hound", 'sort':1},
{'chr':"Z", 'fg':"darkgray", 'text':"Dark hound", 'sort':1},
{'chr':"Z", 'fg':"gray", 'text':"Gravity hound", 'sort':1},
{'chr':"Z", 'fg':"gray", 'text':"Inertia hound", 'sort':1},
{'chr':"Z", 'fg':"gray", 'text':"Water hound", 'sort':1},
{'chr':"Z", 'fg':"green", 'text':"Air hound", 'sort':1},
{'chr':"Z", 'fg':"magenta", 'text':"Aether hound", 'sort':1},
{'chr':"Z", 'fg':"magenta", 'text':"Chaos hound", 'sort':1},
{'chr':"Z", 'fg':"magenta", 'text':"Multi-hued hound", 'sort':1},
{'chr':"Z", 'fg':"magenta", 'text':"Nexus hound", 'sort':1},
{'chr':"Z", 'fg':"orange", 'text':"Light hound", 'sort':1},
{'chr':"Z", 'fg':"orange", 'text':"Plasma hound", 'sort':1},
{'chr':"Z", 'fg':"red", 'text':"Fire hound", 'sort':1},
{'chr':"Z", 'fg':"white", 'text':"Clear hound", 'sort':1},
{'chr':"Z", 'fg':"white", 'text':"Cold hound", 'sort':1},
{'chr':"Z", 'fg':"yellow", 'text':"Vibration hound", 'sort':1},

{ },

{'chr':"a", 'fg':"blue", 'text':"Giant blue ant", 'sort':1},
{'chr':"a", 'fg':"darkgray", 'text':"Giant black ant", 'sort':1},
{'chr':"a", 'fg':"gray", 'text':"Giant grey ant", 'sort':1},
{'chr':"a", 'fg':"gray", 'text':"Giant silver ant", 'sort':1},
{'chr':"a", 'fg':"gray", 'text':"Soldier ant", 'sort':1},
{'chr':"a", 'fg':"magenta", 'text':"The Queen Ant", 'sort':1},
{'chr':"a", 'fg':"orange", 'text':"Giant army ant", 'sort':1},
{'chr':"a", 'fg':"orange", 'text':"Giant fire ant", 'sort':1},
{'chr':"a", 'fg':"red", 'text':"Giant red ant", 'sort':1},
{'chr':"a", 'fg':"white", 'text':"Giant white ant", 'sort':1},
{'chr':"b", 'fg':"blue", 'text':"Blue dragon bat", 'sort':1},
{'chr':"b", 'fg':"brown", 'text':"Giant brown bat", 'sort':1},
{'chr':"b", 'fg':"brown", 'text':"Giant tan bat", 'sort':1},
{'chr':"b", 'fg':"darkgray", 'text':"Vampire bat", 'sort':1},
{'chr':"b", 'fg':"green", 'text':"Bat of Gorgoroth", 'sort':1},
{'chr':"b", 'fg':"magenta", 'text':"Disenchanter bat", 'sort':1},
{'chr':"b", 'fg':"orange", 'text':"Doombat", 'sort':1},
{'chr':"b", 'fg':"orange", 'text':"Fruit bat", 'sort':1},
{'chr':"b", 'fg':"red", 'text':"Red dragon bat", 'sort':1},
{'chr':"c", 'fg':"blue", 'text':"Metallic blue centipede", 'sort':1},
{'chr':"c", 'fg':"brown", 'text':"Stegocentipede", 'sort':1},
{'chr':"c", 'fg':"green", 'text':"Metallic green centipede", 'sort':1},
{'chr':"c", 'fg':"orange", 'text':"Carrion crawler", 'sort':1},
{'chr':"c", 'fg':"orange", 'text':"Carrion crawler", 'sort':1},
{'chr':"c", 'fg':"red", 'text':"Metallic red centipede", 'sort':1},
{'chr':"c", 'fg':"white", 'text':"Giant clear centipede", 'sort':1},
{'chr':"c", 'fg':"white", 'text':"Giant white centipede", 'sort':1},
{'chr':"c", 'fg':"yellow", 'text':"Giant yellow centipede", 'sort':1},
{'chr':"d", 'fg':"blue", 'text':"Baby blue dragon", 'sort':1},
{'chr':"d", 'fg':"blue", 'text':"Mature blue dragon", 'sort':1},
{'chr':"d", 'fg':"blue", 'text':"Young blue dragon", 'sort':1},
{'chr':"d", 'fg':"brightblue", 'text':"Law drake", 'sort':1},
{'chr':"d", 'fg':"brightgreen", 'text':"Shadow drake", 'sort':1},
{'chr':"d", 'fg':"brown", 'text':"Baby bronze dragon", 'sort':1},
{'chr':"d", 'fg':"brown", 'text':"Crystal drake", 'sort':1},
{'chr':"d", 'fg':"brown", 'text':"Mature bronze dragon", 'sort':1},
{'chr':"d", 'fg':"brown", 'text':"Young bronze dragon", 'sort':1},
{'chr':"d", 'fg':"gray", 'text':"Baby black dragon", 'sort':1},
{'chr':"d", 'fg':"gray", 'text':"Mature black dragon", 'sort':1},
{'chr':"d", 'fg':"gray", 'text':"Young black dragon", 'sort':1},
{'chr':"d", 'fg':"green", 'text':"Baby green dragon", 'sort':1},
{'chr':"d", 'fg':"green", 'text':"Mature green dragon", 'sort':1},
{'chr':"d", 'fg':"green", 'text':"Wyvern", 'sort':1},
{'chr':"d", 'fg':"green", 'text':"Young green dragon", 'sort':1},
{'chr':"d", 'fg':"magenta", 'text':"Baby multi-hued dragon", 'sort':1},
{'chr':"d", 'fg':"magenta", 'text':"Balance drake", 'sort':1},
{'chr':"d", 'fg':"magenta", 'text':"Chaos drake", 'sort':1},
{'chr':"d", 'fg':"magenta", 'text':"Kavlax the Many-Headed", 'sort':1},
{'chr':"d", 'fg':"magenta", 'text':"Mature multi-hued dragon", 'sort':1},
{'chr':"d", 'fg':"magenta", 'text':"Young multi-hued dragon", 'sort':1},
{'chr':"d", 'fg':"orange", 'text':"Ethereal drake", 'sort':1},
{'chr':"d", 'fg':"orange", 'text':"Pseudo-dragon", 'sort':1},
{'chr':"d", 'fg':"red", 'text':"Baby red dragon", 'sort':1},
{'chr':"d", 'fg':"red", 'text':"Mature red dragon", 'sort':1},
{'chr':"d", 'fg':"red", 'text':"Young red dragon", 'sort':1},
{'chr':"d", 'fg':"white", 'text':"Baby white dragon", 'sort':1},
{'chr':"d", 'fg':"white", 'text':"Mature white dragon", 'sort':1},
{'chr':"d", 'fg':"white", 'text':"Young white dragon", 'sort':1},
{'chr':"d", 'fg':"yellow", 'text':"Baby gold dragon", 'sort':1},
{'chr':"d", 'fg':"yellow", 'text':"Mature gold dragon", 'sort':1},
{'chr':"d", 'fg':"yellow", 'text':"Young gold dragon", 'sort':1},
{'chr':"e", 'fg':"blue", 'text':"Beholder hive-mother", 'sort':1},
{'chr':"e", 'fg':"brightblue", 'text':"Spectator", 'sort':1},
{'chr':"e", 'fg':"brown", 'text':"Beholder", 'sort':1},
{'chr':"e", 'fg':"brown", 'text':"Undead beholder", 'sort':1},
{'chr':"e", 'fg':"darkgray", 'text':"Gauth", 'sort':1},
{'chr':"e", 'fg':"green", 'text':"Evil eye", 'sort':1},
{'chr':"e", 'fg':"magenta", 'text':"Disenchanter eye", 'sort':1},
{'chr':"e", 'fg':"magenta", 'text':"Omarax, the Eye Tyrant", 'sort':1},
{'chr':"e", 'fg':"orange", 'text':"Floating eye", 'sort':1},
{'chr':"e", 'fg':"orange", 'text':"Radiation eye", 'sort':1},
{'chr':"e", 'fg':"red", 'text':"Bloodshot eye", 'sort':1},
{'chr':"f", 'fg':"brown", 'text':"Panther", 'sort':1},
{'chr':"f", 'fg':"brown", 'text':"Scrawny cat", 'sort':1},
{'chr':"f", 'fg':"brown", 'text':"Wild cat", 'sort':1},
{'chr':"f", 'fg':"darkgray", 'text':"Displacer beast", 'sort':1},
{'chr':"f", 'fg':"magenta", 'text':"The Cat Lord", 'sort':1},
{'chr':"f", 'fg':"orange", 'text':"Tiger", 'sort':1},
{'chr':"f", 'fg':"yellow", 'text':"Sabre-tooth tiger", 'sort':1},
{'chr':"g", 'fg':"brightblue", 'text':"Mithril golem", 'sort':1},
{'chr':"g", 'fg':"brightgreen", 'text':"Colossus", 'sort':1},
{'chr':"g", 'fg':"brown", 'text':"Clay golem", 'sort':1},
{'chr':"g", 'fg':"brown", 'text':"Eog golem", 'sort':1},
{'chr':"g", 'fg':"darkgray", 'text':"Bone golem", 'sort':1},
{'chr':"g", 'fg':"darkgray", 'text':"Pukelman", 'sort':1},
{'chr':"g", 'fg':"gray", 'text':"Iron golem", 'sort':1},
{'chr':"g", 'fg':"gray", 'text':"Stone golem", 'sort':1},
{'chr':"g", 'fg':"green", 'text':"Drolem", 'sort':1},
{'chr':"g", 'fg':"orange", 'text':"Bronze golem", 'sort':1},
{'chr':"g", 'fg':"orange", 'text':"Flesh golem", 'sort':1},
{'chr':"g", 'fg':"red", 'text':"Silent watcher", 'sort':1},
{'chr':"g", 'fg':"yellow", 'text':"Colbran", 'sort':1},
{'chr':"h", 'fg':"blue", 'text':"Scruffy looking hobbit", 'sort':1},
{'chr':"h", 'fg':"brightblue", 'text':"Fundin Bluecloak", 'sort':1},
{'chr':"h", 'fg':"brightblue", 'text':"Smeagol", 'sort':1},
{'chr':"h", 'fg':"brightgreen", 'text':"Dark elven druid", 'sort':1},
{'chr':"h", 'fg':"brown", 'text':"Bullroarer the Hobbit", 'sort':1},
{'chr':"h", 'fg':"brown", 'text':"Dark elven warrior", 'sort':1},
{'chr':"h", 'fg':"darkgray", 'text':"Dark elf", 'sort':1},
{'chr':"h", 'fg':"darkgray", 'text':"Eol, the Dark Elf", 'sort':1},
{'chr':"h", 'fg':"darkgray", 'text':"Maeglin, the Traitor of Gondolin", 'sort':1},
{'chr':"h", 'fg':"gray", 'text':"Dark elven lord", 'sort':1},
{'chr':"h", 'fg':"green", 'text':"Dark elven priest", 'sort':1},
{'chr':"h", 'fg':"magenta", 'text':"Mind flayer", 'sort':1},
{'chr':"h", 'fg':"orange", 'text':"Dark elven sorcerer", 'sort':1},
{'chr':"h", 'fg':"orange", 'text':"Ibun, Son of Mim", 'sort':1},
{'chr':"h", 'fg':"orange", 'text':"Khim, Son of Mim", 'sort':1},
{'chr':"h", 'fg':"orange", 'text':"Mim, Betrayer of Turin", 'sort':1},
{'chr':"h", 'fg':"red", 'text':"Dark elven mage", 'sort':1},
{'chr':"h", 'fg':"red", 'text':"Gnome mage", 'sort':1},
{'chr':"h", 'fg':"red", 'text':"Gnome mage", 'sort':1},
{'chr':"h", 'fg':"white", 'text':"Farmer Maggot", 'sort':1},
{'chr':"h", 'fg':"yellow", 'text':"Nar, the Dwarf", 'sort':1},
{'chr':"i", 'fg':"blue", 'text':"Blue icky thing", 'sort':1},
{'chr':"i", 'fg':"gray", 'text':"Blubbering icky thing", 'sort':1},
{'chr':"i", 'fg':"gray", 'text':"Grey icky thing", 'sort':1},
{'chr':"i", 'fg':"green", 'text':"Green icky thing", 'sort':1},
{'chr':"i", 'fg':"red", 'text':"Bloodshot icky thing", 'sort':1},
{'chr':"i", 'fg':"white", 'text':"Clear icky thing", 'sort':1},
{'chr':"i", 'fg':"white", 'text':"White icky thing", 'sort':1},
{'chr':"j", 'fg':"blue", 'text':"Blue jelly", 'sort':1},
{'chr':"j", 'fg':"blue", 'text':"Blue ooze", 'sort':1},
{'chr':"j", 'fg':"brightgreen", 'text':"Gelatinous cube", 'sort':1},
{'chr':"j", 'fg':"brown", 'text':"Ochre jelly", 'sort':1},
{'chr':"j", 'fg':"brown", 'text':"Rot jelly", 'sort':1},
{'chr':"j", 'fg':"darkgray", 'text':"Black ooze", 'sort':1},
{'chr':"j", 'fg':"darkgray", 'text':"Black pudding", 'sort':1},
{'chr':"j", 'fg':"gray", 'text':"Acidic cytoplasm", 'sort':1},
{'chr':"j", 'fg':"gray", 'text':"Silver jelly", 'sort':1},
{'chr':"j", 'fg':"green", 'text':"Green jelly", 'sort':1},
{'chr':"j", 'fg':"green", 'text':"Green ooze", 'sort':1},
{'chr':"j", 'fg':"magenta", 'text':"Grape jelly", 'sort':1},
{'chr':"j", 'fg':"orange", 'text':"Spotted jelly", 'sort':1},
{'chr':"j", 'fg':"red", 'text':"Red jelly", 'sort':1},
{'chr':"j", 'fg':"white", 'text':"White jelly", 'sort':1},
{'chr':"j", 'fg':"yellow", 'text':"Yellow jelly", 'sort':1},
{'chr':"k", 'fg':"blue", 'text':"Large kobold", 'sort':1},
{'chr':"k", 'fg':"brightgreen", 'text':"Kobold", 'sort':1},
{'chr':"k", 'fg':"gray", 'text':"Kobold archer", 'sort':1},
{'chr':"k", 'fg':"magenta", 'text':"Mughash the Kobold Lord", 'sort':1},
{'chr':"k", 'fg':"red", 'text':"Kobold shaman", 'sort':1},
{'chr':"k", 'fg':"yellow", 'text':"Small kobold", 'sort':1},
{'chr':"l", 'fg':"darkgray", 'text':"Giant black louse", 'sort':1},
{'chr':"l", 'fg':"white", 'text':"Giant white louse", 'sort':1},
{'chr':"m", 'fg':"blue", 'text':"Shimmering mold", 'sort':1},
{'chr':"m", 'fg':"brown", 'text':"Brown mold", 'sort':1},
{'chr':"m", 'fg':"darkgray", 'text':"Death mold", 'sort':1},
{'chr':"m", 'fg':"gray", 'text':"Grey mold", 'sort':1},
{'chr':"m", 'fg':"green", 'text':"Green mold", 'sort':1},
{'chr':"m", 'fg':"magenta", 'text':"Disenchanter mold", 'sort':1},
{'chr':"m", 'fg':"orange", 'text':"Hairy mold", 'sort':1},
{'chr':"m", 'fg':"red", 'text':"Red mold", 'sort':1},
{'chr':"m", 'fg':"yellow", 'text':"Yellow mold", 'sort':1},
{'chr':"n", 'fg':"brightblue", 'text':"Guardian naga", 'sort':1},
{'chr':"n", 'fg':"darkgray", 'text':"Black naga", 'sort':1},
{'chr':"n", 'fg':"green", 'text':"Green naga", 'sort':1},
{'chr':"n", 'fg':"magenta", 'text':"Medusa, the Gorgon", 'sort':1},
{'chr':"n", 'fg':"red", 'text':"Red naga", 'sort':1},
{'chr':"n", 'fg':"white", 'text':"Spirit naga", 'sort':1},
{'chr':"o", 'fg':"blue", 'text':"Lugdush, the Uruk", 'sort':1},
{'chr':"o", 'fg':"blue", 'text':"Ugluk, the Uruk", 'sort':1},
{'chr':"o", 'fg':"brightblue", 'text':"Uruk", 'sort':1},
{'chr':"o", 'fg':"brightgreen", 'text':"Cave orc", 'sort':1},
{'chr':"o", 'fg':"brown", 'text':"Hill orc", 'sort':1},
{'chr':"o", 'fg':"brown", 'text':"Snaga", 'sort':1},
{'chr':"o", 'fg':"darkgray", 'text':"Black orc", 'sort':1},
{'chr':"o", 'fg':"gray", 'text':"Half-orc", 'sort':1},
{'chr':"o", 'fg':"green", 'text':"Gorbag, the Orc Captain", 'sort':1},
{'chr':"o", 'fg':"green", 'text':"Shagrat, the Orc Captain", 'sort':1},
{'chr':"o", 'fg':"green", 'text':"Ufthak of Cirith Ungol", 'sort':1},
{'chr':"o", 'fg':"magenta", 'text':"Azog, King of the Uruk-Hai", 'sort':1},
{'chr':"o", 'fg':"magenta", 'text':"Bolg, Son of Azog", 'sort':1},
{'chr':"o", 'fg':"orange", 'text':"Orc captain", 'sort':1},
{'chr':"o", 'fg':"red", 'text':"Orc shaman", 'sort':1},
{'chr':"o", 'fg':"yellow", 'text':"Golfimbul, the Hill Orc Chief", 'sort':1},
{'chr':"o", 'fg':"yellow", 'text':"Grishnakh, the Hill Orc", 'sort':1},
{'chr':"o", 'fg':"yellow", 'text':"Lagduf, the Snaga", 'sort':1},
{'chr':"p", 'fg':"blue", 'text':"Bandit", 'sort':1},
{'chr':"p", 'fg':"blue", 'text':"Brigand", 'sort':1},
{'chr':"p", 'fg':"blue", 'text':"Master rogue", 'sort':1},
{'chr':"p", 'fg':"blue", 'text':"Master thief", 'sort':1},
{'chr':"p", 'fg':"blue", 'text':"Novice rogue", 'sort':1},
{'chr':"p", 'fg':"blue", 'text':"Novice rogue", 'sort':1},
{'chr':"p", 'fg':"brightblue", 'text':"Harowen the Black Hand", 'sort':1},
{'chr':"p", 'fg':"brightblue", 'text':"Wormtongue, Agent of Saruman", 'sort':1},
{'chr':"p", 'fg':"brightgreen", 'text':"Druid", 'sort':1},
{'chr':"p", 'fg':"brightgreen", 'text':"Patriarch", 'sort':1},
{'chr':"p", 'fg':"brown", 'text':"Angamaite of Umbar", 'sort':1},
{'chr':"p", 'fg':"brown", 'text':"Berserker", 'sort':1},
{'chr':"p", 'fg':"brown", 'text':"Brodda, the Easterling", 'sort':1},
{'chr':"p", 'fg':"brown", 'text':"Hardened warrior", 'sort':1},
{'chr':"p", 'fg':"brown", 'text':"Novice warrior", 'sort':1},
{'chr':"p", 'fg':"brown", 'text':"Novice warrior", 'sort':1},
{'chr':"p", 'fg':"brown", 'text':"Sangahyando of Umbar", 'sort':1},
{'chr':"p", 'fg':"brown", 'text':"Swordsman", 'sort':1},
{'chr':"p", 'fg':"brown", 'text':"Uldor the Accursed", 'sort':1},
{'chr':"p", 'fg':"brown", 'text':"Ulfang the Black", 'sort':1},
{'chr':"p", 'fg':"brown", 'text':"Ulfast, Son of Ulfang", 'sort':1},
{'chr':"p", 'fg':"brown", 'text':"Ulwarth, Son of Ulfang", 'sort':1},
{'chr':"p", 'fg':"darkgray", 'text':"Death knight", 'sort':1},
{'chr':"p", 'fg':"gray", 'text':"Black knight", 'sort':1},
{'chr':"p", 'fg':"gray", 'text':"Gorlim, Betrayer of Barahir", 'sort':1},
{'chr':"p", 'fg':"gray", 'text':"Novice ranger", 'sort':1},
{'chr':"p", 'fg':"gray", 'text':"Novice ranger", 'sort':1},
{'chr':"p", 'fg':"gray", 'text':"Ranger Chieftain", 'sort':1},
{'chr':"p", 'fg':"gray", 'text':"Ranger", 'sort':1},
{'chr':"p", 'fg':"green", 'text':"Novice priest", 'sort':1},
{'chr':"p", 'fg':"green", 'text':"Novice priest", 'sort':1},
{'chr':"p", 'fg':"green", 'text':"Priest", 'sort':1},
{'chr':"p", 'fg':"magenta", 'text':"Lorgan, Chief of the Easterlings", 'sort':1},
{'chr':"p", 'fg':"magenta", 'text':"Saruman of Many Colours", 'sort':1},
{'chr':"p", 'fg':"magenta", 'text':"Sauron, the Sorcerer", 'sort':1},
{'chr':"p", 'fg':"magenta", 'text':"The Mouth of Sauron", 'sort':1},
{'chr':"p", 'fg':"orange", 'text':"Castamir the Usurper", 'sort':1},
{'chr':"p", 'fg':"orange", 'text':"Demonologist", 'sort':1},
{'chr':"p", 'fg':"orange", 'text':"Enchantress", 'sort':1},
{'chr':"p", 'fg':"orange", 'text':"Grand master mystic", 'sort':1},
{'chr':"p", 'fg':"orange", 'text':"Illusionist", 'sort':1},
{'chr':"p", 'fg':"orange", 'text':"Master mystic", 'sort':1},
{'chr':"p", 'fg':"orange", 'text':"Mystic", 'sort':1},
{'chr':"p", 'fg':"orange", 'text':"Necromancer", 'sort':1},
{'chr':"p", 'fg':"orange", 'text':"Sorcerer", 'sort':1},
{'chr':"p", 'fg':"red", 'text':"Mage", 'sort':1},
{'chr':"p", 'fg':"red", 'text':"Novice mage", 'sort':1},
{'chr':"p", 'fg':"red", 'text':"Novice mage", 'sort':1},
{'chr':"p", 'fg':"white", 'text':"Knight Templar", 'sort':1},
{'chr':"p", 'fg':"white", 'text':"Novice paladin", 'sort':1},
{'chr':"p", 'fg':"white", 'text':"Novice paladin", 'sort':1},
{'chr':"p", 'fg':"white", 'text':"Paladin", 'sort':1},
{'chr':"p", 'fg':"yellow", 'text':"Ar-Pharazon the Golden", 'sort':1},
{'chr':"p", 'fg':"yellow", 'text':"Dagashi", 'sort':1},
{'chr':"p", 'fg':"yellow", 'text':"Ninja", 'sort':1},
{'chr':"q", 'fg':"brightgreen", 'text':"Night mare", 'sort':1},
{'chr':"q", 'fg':"brown", 'text':"Cave bear", 'sort':1},
{'chr':"q", 'fg':"brown", 'text':"Grizzly bear", 'sort':1},
{'chr':"q", 'fg':"darkgray", 'text':"Beorn, the Shape-Changer", 'sort':1},
{'chr':"q", 'fg':"darkgray", 'text':"Werebear", 'sort':1},
{'chr':"q", 'fg':"gray", 'text':"Mumak", 'sort':1},
{'chr':"q", 'fg':"gray", 'text':"Mumak", 'sort':1},
{'chr':"q", 'fg':"green", 'text':"Catoblepas", 'sort':1},
{'chr':"r", 'fg':"darkgray", 'text':"Wererat", 'sort':1},
{'chr':"r", 'fg':"gray", 'text':"Giant grey rat", 'sort':1},
{'chr':"r", 'fg':"gray", 'text':"Giant white rat", 'sort':1},
{'chr':"r", 'fg':"gray", 'text':"Silver mouse", 'sort':1},
{'chr':"r", 'fg':"white", 'text':"Giant white mouse", 'sort':1},
{'chr':"s", 'fg':"magenta", 'text':"Cantoras, the Skeletal Lord", 'sort':1},
{'chr':"s", 'fg':"orange", 'text':"Skull druj", 'sort':1},
{'chr':"s", 'fg':"red", 'text':"Eye druj", 'sort':1},
{'chr':"s", 'fg':"white", 'text':"Skeleton ettin", 'sort':1},
{'chr':"s", 'fg':"white", 'text':"Skeleton human", 'sort':1},
{'chr':"s", 'fg':"white", 'text':"Skeleton kobold", 'sort':1},
{'chr':"s", 'fg':"white", 'text':"Skeleton orc", 'sort':1},
{'chr':"s", 'fg':"white", 'text':"Skeleton troll", 'sort':1},
{'chr':"s", 'fg':"yellow", 'text':"Hand druj", 'sort':1},
{'chr':"t", 'fg':"blue", 'text':"Squint-eyed rogue", 'sort':1},
{'chr':"t", 'fg':"brightblue", 'text':"Battle-scarred veteran", 'sort':1},
{'chr':"t", 'fg':"brightgreen", 'text':"Village idiot", 'sort':1},
{'chr':"t", 'fg':"brown", 'text':"Mangy-looking leper", 'sort':1},
{'chr':"t", 'fg':"brown", 'text':"Pitiful-looking beggar", 'sort':1},
{'chr':"t", 'fg':"darkgray", 'text':"Filthy street urchin", 'sort':1},
{'chr':"t", 'fg':"gray", 'text':"Blubbering idiot", 'sort':1},
{'chr':"t", 'fg':"green", 'text':"Boil-covered wretch", 'sort':1},
{'chr':"t", 'fg':"orange", 'text':"Aimless-looking merchant", 'sort':1},
{'chr':"t", 'fg':"red", 'text':"Mean-looking mercenary", 'sort':1},
{'chr':"t", 'fg':"yellow", 'text':"Singing, happy drunk", 'sort':1},
{'chr':"u", 'fg':"brown", 'text':"Lemure", 'sort':1},
{'chr':"u", 'fg':"brown", 'text':"Manes", 'sort':1},
{'chr':"u", 'fg':"darkgray", 'text':"Death quasit", 'sort':1},
{'chr':"u", 'fg':"green", 'text':"Imp", 'sort':1},
{'chr':"u", 'fg':"magenta", 'text':"Draebor, the Imp", 'sort':1},
{'chr':"u", 'fg':"orange", 'text':"Quasit", 'sort':1},
{'chr':"u", 'fg':"orange", 'text':"Tengu", 'sort':1},
{'chr':"u", 'fg':"red", 'text':"Bodak", 'sort':1},
{'chr':"u", 'fg':"yellow", 'text':"Homunculus", 'sort':1},
{'chr':"v", 'fg':"blue", 'text':"Energy vortex", 'sort':1},
{'chr':"v", 'fg':"brightblue", 'text':"Time vortex", 'sort':1},
{'chr':"v", 'fg':"brown", 'text':"Shardstorm", 'sort':1},
{'chr':"v", 'fg':"gray", 'text':"Water vortex", 'sort':1},
{'chr':"v", 'fg':"magenta", 'text':"Aether vortex", 'sort':1},
{'chr':"v", 'fg':"magenta", 'text':"Chaos vortex", 'sort':1},
{'chr':"v", 'fg':"magenta", 'text':"Nexus vortex", 'sort':1},
{'chr':"v", 'fg':"magenta", 'text':"Storm of Unmagic", 'sort':1},
{'chr':"v", 'fg':"orange", 'text':"Plasma vortex", 'sort':1},
{'chr':"v", 'fg':"orange", 'text':"Shimmering vortex", 'sort':1},
{'chr':"v", 'fg':"red", 'text':"Fire vortex", 'sort':1},
{'chr':"v", 'fg':"white", 'text':"Cold vortex", 'sort':1},
{'chr':"w", 'fg':"blue", 'text':"Blue worm mass", 'sort':1},
{'chr':"w", 'fg':"darkgray", 'text':"Nether worm mass", 'sort':1},
{'chr':"w", 'fg':"darkgray", 'text':"Wereworm", 'sort':1},
{'chr':"w", 'fg':"green", 'text':"Green worm mass", 'sort':1},
{'chr':"w", 'fg':"magenta", 'text':"Disenchanter worm mass", 'sort':1},
{'chr':"w", 'fg':"magenta", 'text':"Purple worm", 'sort':1},
{'chr':"w", 'fg':"red", 'text':"Red worm mass", 'sort':1},
{'chr':"w", 'fg':"white", 'text':"Clear worm mass", 'sort':1},
{'chr':"w", 'fg':"white", 'text':"White worm mass", 'sort':1},
{'chr':"w", 'fg':"yellow", 'text':"Yellow worm mass", 'sort':1},
{'chr':"y", 'fg':"blue", 'text':"Blue yeek", 'sort':1},
{'chr':"y", 'fg':"brightblue", 'text':"Orfax, Son of Boldor", 'sort':1},
{'chr':"y", 'fg':"brown", 'text':"Brown yeek", 'sort':1},
{'chr':"y", 'fg':"brown", 'text':"Master yeek", 'sort':1},
{'chr':"y", 'fg':"magenta", 'text':"Boldor, King of the Yeeks", 'sort':1},
{'chr':"z", 'fg':"brown", 'text':"Ghast", 'sort':1},
{'chr':"z", 'fg':"brown", 'text':"Ghoul", 'sort':1},
{'chr':"z", 'fg':"gray", 'text':"Zombified human", 'sort':1},
{'chr':"z", 'fg':"gray", 'text':"Zombified kobold", 'sort':1},
{'chr':"z", 'fg':"gray", 'text':"Zombified orc", 'sort':1},
{'chr':"z", 'fg':"white", 'text':"Mummified human", 'sort':1},
{'chr':"z", 'fg':"white", 'text':"Mummified orc", 'sort':1},
{'chr':"z", 'fg':"white", 'text':"Mummified troll", 'sort':1},
{'chr':"z", 'fg':"yellow", 'text':"Greater mummy", 'sort':1},

{ },

{'chr':"!", 'fg':"white", 'text':"Potion mimic", 'sort':1},
{'chr':"$", 'fg':"brightblue", 'text':"Creeping mithril coins", 'sort':1},
{'chr':"$", 'fg':"brightgreen", 'text':"Creeping adamantite coins", 'sort':1},
{'chr':"$", 'fg':"brown", 'text':"Creeping copper coins", 'sort':1},
{'chr':"$", 'fg':"gray", 'text':"Creeping silver coins", 'sort':1},
{'chr':"$", 'fg':"yellow", 'text':"Creeping gold coins", 'sort':1},
{'chr':",", 'fg':"brightblue", 'text':"Magic mushroom patch", 'sort':1},
{'chr':",", 'fg':"gray", 'text':"Grey mushroom patch", 'sort':1},
{'chr':",", 'fg':"green", 'text':"Shambling mound", 'sort':1},
{'chr':",", 'fg':"magenta", 'text':"Purple mushroom patch", 'sort':1},
{'chr':",", 'fg':"orange", 'text':"Shrieker mushroom patch", 'sort':1},
{'chr':",", 'fg':"orange", 'text':"Spotted mushroom patch", 'sort':1},
{'chr':",", 'fg':"red", 'text':"Memory moss", 'sort':1},
{'chr':",", 'fg':"white", 'text':"Clear mushroom patch", 'sort':1},
{'chr':",", 'fg':"yellow", 'text':"Yellow mushroom patch", 'sort':1},
{'chr':".", 'fg':"white", 'text':"Lurker", 'sort':1},
{'chr':".", 'fg':"white", 'text':"Trapper", 'sort':1},
{'chr':"=", 'fg':"white", 'text':"Ring mimic", 'sort':1},
{'chr':"?", 'fg':"white", 'text':"Scroll mimic", 'sort':1},
{'chr':"@", 'fg':"white", 'text':"player", 'sort':1},
{'chr':"~", 'fg':"gray", 'text':"Chest mimic", 'sort':1},


{ },

{'chr':"#", 'fg':"white", 'text':"granite wall", 'sort':4},
{'chr':"#", 'fg':"white", 'text':"permanent wall", 'sort':4},
{'chr':"#", 'fg':"white", 'text':"secret door", 'sort':4},
{'chr':"%", 'fg':"gray", 'text':"magma vein", 'sort':4},
{'chr':"%", 'fg':"white", 'text':"quartz vein", 'sort':4},
{'chr':"'", 'fg':"brown", 'text':"broken door", 'sort':4},
{'chr':"'", 'fg':"brown", 'text':"open door", 'sort':4},
{'chr':"*", 'fg':"orange", 'text':"magma vein with treasure", 'sort':4},
{'chr':"*", 'fg':"orange", 'text':"quartz vein with treasure", 'sort':4},
{'chr':"+", 'fg':"brown", 'text':"door", 'sort':4},
{'chr':"+", 'fg':"brown", 'text':"jammed door", 'sort':4},
{'chr':"+", 'fg':"brown", 'text':"locked door", 'sort':4},
{'chr':".", 'fg':"white", 'text':"invisible trap", 'sort':4},
{'chr':".", 'fg':"white", 'text':"open floor", 'sort':4},
{'chr':"1", 'fg':"brown", 'text':"General Store", 'sort':4},
{'chr':"2", 'fg':"gray", 'text':"Armoury", 'sort':4},
{'chr':"3", 'fg':"white", 'text':"Weapon Smiths", 'sort':4},
{'chr':"4", 'fg':"green", 'text':"Temple", 'sort':4},
{'chr':"5", 'fg':"blue", 'text':"Alchemy Shop", 'sort':4},
{'chr':"6", 'fg':"red", 'text':"Magic Shop", 'sort':4},
{'chr':"7", 'fg':"darkgray", 'text':"Black Market", 'sort':4},
{'chr':"8", 'fg':"yellow", 'text':"Home", 'sort':4},
{'chr':":", 'fg':"white", 'text':"pile of rubble", 'sort':4},
{'chr':";", 'fg':"yellow", 'text':"glyph of warding", 'sort':4},
{'chr':"<", 'fg':"white", 'text':"up staircase", 'sort':4},
{'chr':">", 'fg':"white", 'text':"down staircase", 'sort':4},
{'chr':"^", 'fg':"brown", 'text':"discolored spot", 'sort':4},
{'chr':"^", 'fg':"gray", 'text':"pit", 'sort':4},
{'chr':"^", 'fg':"green", 'text':"gas trap", 'sort':4},
{'chr':"^", 'fg':"orange", 'text':"strange rune", 'sort':4},
{'chr':"^", 'fg':"red", 'text':"dart trap", 'sort':4},
{'chr':"^", 'fg':"white", 'text':"trap door", 'sort':4}

);

var nethack_symbols = new Array();

var buttonfunclist = new Array(
    /*   0 */ {'desc': "Fill panel with pen char", 'undo':1},
    /*   1 */ {'desc': "Clear panel", 'undo':1},
    /*   2 */ {'desc': "Remove panel colors", 'undo':1},
    /*   3 */ {'desc': "Randomly replace pen characters with ctrl_pen characters", 'undo':1},
    /*   4 */ {'desc': "Randomly scatter pen characters in the panel", 'undo':1},
    /*   5 */ {'desc': "Generate random panel", 'undo':1},
    /*   6 */ {'desc': "Generate random panel, dungeon room", 'undo':1},
    /*   7 */ {'desc': "Generate random panel, field", 'undo':1},
    /*   8 */ {'desc': "Generate random panel, splatterfield", 'undo':1},
    /*   9 */ {'desc': "Generate random panel, reverse splatterfield", 'undo':1},
    /*  10 */ {'desc': "Generate random panel, dug randwalk", 'undo':1},
    /*  11 */ {'desc': "Generate random panel, mines", 'undo':1},
    /*  12 */ {'desc': "Generate random panel, maze", 'undo':1},
    /*  13 */ {'desc': "Shift panel contents up", 'undo':1},
    /*  14 */ {'desc': "Shift panel contents left", 'undo':1},
    /*  15 */ {'desc': "Shift panel contents right", 'undo':1},
    /*  16 */ {'desc': "Shift panel contents down", 'undo':1},
    /*  17 */ {'desc': "Move symbols towards cursor", 'undo':1},
    /*  18 */ {'desc': "Move symbols randomly", 'undo':1},
    /*  19 */ {'desc': "Move symbols upwards", 'undo':1},
    /*  20 */ {'desc': "Move symbols downwards", 'undo':1},
    /*  21 */ {'desc': "Move symbols left", 'undo':1},
    /*  22 */ {'desc': "Move symbols right", 'undo':1},
    /*  23 */ {'desc': "Generate a maze, using pen", 'undo':1},
    /*  24 */ {'desc': "Wallify", 'undo':1},
    /*  25 */ {'desc': "Generate a gravestone", 'undo':1},
    /*  26 */ {'desc': "Paste panel", 'undo':1},
    /*  27 */ {'desc': 'Toggle bold attribute at panel hover position on or off', 'undo':1},
    /*  28 */ {'desc': 'Toggle reverse attribute at panel hover position on or off', 'undo':1},
    /*  29 */ {'desc': 'Toggle underline attribute at panel hover position on or off', 'undo':1},
    /*  30 */ {'desc': 'Toggle italic attribute at panel hover position on or off', 'undo':1},
    /*  31 */ {'desc': 'Toggle color brightness at panel hover position on or off', 'undo':1},
    /*  32 */ {'desc': 'Set color at panel hover position to current pen color', 'undo':1},
    /*  33 */ undefined,
    /*  34 */ undefined,
    /*  35 */ undefined,
    /*  36 */ undefined,
    /*  37 */ undefined,
    /*  38 */ undefined,
    /*  39 */ undefined,
    /*  40 */ {'desc': "Download comic strip"},
    /*  41 */ {'desc': "Submit comic strip to the database (login required)"},
    /*  42 */ {'desc': "Parse comic code"},
    /*  43 */ {'desc': "Pen: Clear pen color"},
    /*  44 */ {'desc': "Pen: Random pen color"},
    /*  45 */ {'desc': "Pen: Set Pen to random monster"},
    /*  46 */ {'desc': "Pen: Save Pen"},
    /*  47 */ {'desc': "Pen: Randomize Pen"},
    /*  48 */ {'desc': "Insert Pen into panel text"},
    /*  49 */ undefined,
    /*  50 */ {'desc': "Editmode: Draw", 'key':'d'},
    /*  51 */ {'desc': "Editmode: Color picker"},
    /*  52 */ undefined,
    /*  53 */ {'desc': "Editmode: Flood fill"},
    /*  54 */ {'desc': "Editmode: Lines"},
    /*  55 */ {'desc': "Editmode: Rectangles"},
    /*  56 */ {'desc': "Editmode: Filled rectangles"},
    /*  57 */ {'desc': "Editmode: Room rectangle"},
    /*  58 */ undefined,
    /*  59 */ undefined,
    /*  60 */ {'desc': "Copy panel"},
    /*  61 */ {'desc': "Add panel"},
    /*  62 */ {'desc': "Delete panel"},
    /*  63 */ {'desc': "Undo panel changes"},
    /*  64 */ {'desc': "Go to previous panel"},
    /*  65 */ {'desc': "Go to next panel"},
    /*  66 */ undefined,
    /*  67 */ undefined,
    /*  68 */ undefined,
    /*  69 */ undefined,
    /*  70 */ {'desc': "Pen: Swap Pen and ctrl_pen", 'key':'x'},
    /*  71 */ {'desc': "Pen: Colorpick the symbol you hover on", 'key':'z'},
    /*  72 */ {'desc': "Save current panel hover position as the start point for lines and rectangles", 'key':'s'},
    /*  73 */ {'desc': "Set current panel hover position as cursor location", 'key':'m'},
    /*  74 */ {'desc': "Show help window", 'key':'?'},
    /*  75 */ {'desc': "Editmode: Toggle between colorpicker and draw mode", 'key':'c'},
    /*  76 */ {'desc': "Editmode: Toggle between flood fill and draw mode", 'key':'f'},
    /*  77 */ {'desc': "Editmode: Toggle between lines and draw mode", 'key':'g'},
    /*  78 */ {'desc': "Editmode: Toggle between rectangles, filled rectangles and draw modes", 'key':'v'},
    /*  79 */ {'desc': "Show configuration window"},
    /*  80 */ {'desc': "Show map template window"},
    /*  81 */ {'desc': 'Generate a random shop', 'undo':1},
    /*  82 */ {'desc': 'Generate a scroll shop', 'undo':1},
    /*  83 */ {'desc': 'Generate a spellbook shop', 'undo':1},
    /*  84 */ {'desc': 'Generate a ring shop', 'undo':1},
    /*  85 */ {'desc': 'Generate a delicatessen', 'undo':1},
    /*  86 */ {'desc': 'Generate a tool shop', 'undo':1},
    /*  87 */ {'desc': 'Generate a potion shop', 'undo':1},
    /*  88 */ {'desc': 'Generate a jeweler\'s shop', 'undo':1},
    /*  89 */ {'desc': 'Generate a armor shop', 'undo':1},
    /*  90 */ {'desc': 'Generate a weapon shop', 'undo':1},
    /*  91 */ {'desc': "Show or hide Pen symbol selection popup", 'key':'e'},
    /*  92 */ {'desc': 'Pen: Toggle bold attribute on or off'},
    /*  93 */ {'desc': 'Pen: Toggle reverse attribute on or off'},
    /*  94 */ {'desc': 'Pen: Toggle underline attribute on or off'},
    /*  95 */ {'desc': "Show or hide Extended char selection popup"},
    /*  96 */ {'desc': "Show or hide Box Drawing char selection popup"},
    /*  97 */ {'desc': "Move current panel left"},
    /*  98 */ {'desc': "Move current panel right"},
    /*  99 */ {'desc': "Show or hide Game Symbols char selection popup"},
    /* 100 */ {'desc': "Reset comic strip"},
    /* 101 */ {'desc': 'Pen: Toggle italic attribute on or off'},
    /* 102 */ {'desc': "Insert panel text into panel as top statusline text", 'undo':1},
    /* 103 */ {'desc': "Editmode: Toggle character lock on/off"}
);

var buttonfunc_act_desc = new Array();

var default_keybinding_keys = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
var keybinding_keys = default_keybinding_keys;

/* saved pen quick keys override these */
var default_keybindings = new Array();

for (var i = 0; i < buttonfunclist.length; i++) {
    var b = buttonfunclist[i];
    if (b) {
	if (b.key) default_keybindings.push({'key':b.key, 'act':i});
	buttonfunc_act_desc.push({'act':i, 'desc':b.desc});
    }
}

buttonfunc_act_desc.sort(
    function(a,b)
    {
	if (a.desc < b.desc) return -1;
	if (a.desc > b.desc) return 1;
	return 0;
    }
);

var keybindings = default_keybindings;

var selected_map_template = 0;
var map_templates_panels = new Array();
var map_templates = new Array(
    {'name':'Minetown v1', 'map':
     "                                                                                \n"+
     "                                                                                \n"+
     "    ----- ################################################                      \n"+
     "    |...| #  -----       --------------------------------#                      \n"+
     "    |...|## #+...+#####  |..............................|#                      \n"+
     "    |...+####|...|    #  |.------+--------------..-----.|#                      \n"+
     "    |...|#  #+...S#######|.|....|..|...|....|..+..+...|.|#                      \n"+
     "    -S-+-####|...|      #+.|....|..|...|....|..|..|...|.|#                      \n"+
     "     # #  #  -----      #|.---+-----...-+-------..|...|.|#                      \n"+
     "     ###  #             #|......|..|...|.|..|..|.------.|#                      \n"+
     "       #  #             #|.----.|..-+---.|..|..|.|....|.|############           \n"+
     "       #  #             #|.|..+.-+--..{..-+--..|.+....|.|        ---+----       \n"+
     "       #  #             #|.|..|.............-+--.|....|.|        |......|       \n"+
     "     ###  #             #|.----+---.----+--......|....|.|        |......|       \n"+
     "     # #  #             #|.|..|...|.+..|..-+-----------.S########+......|       \n"+
     "   --+-+--#             #|.|..|...|.|..|..|....|K.|...+.|        --------       \n"+
     "   |.....+#             #|.|..|...|.----..|....|..|...|.|                       \n"+
     "   |.....|              #|.-+------..{.---------+------.|                       \n"+
     "   |.....|              #|..............................|                       \n"+
     "   -------              #--------------------------------                       \n"+
     "                                                                                \n",
     'replaces':new Array(
	 {'from':{'chr':'K'}, 'to':{'chr':'#'}},
	 {'from':{'chr':'+'}, 'to':{'chr':'+', 'fg':'brown'}},
	 {'from':{'chr':'S'}, 'to':{'chr':'+', 'fg':'brown'}},
	 {'from':{'chr':'{'}, 'to':{'chr':'{', 'fg':'blue'}})
    },
    {'name':'Minetown v2', 'map':
     "                                                                                \n"+
     "            -----                                                               \n"+
     "            |.k^S#      ---------------------------------                       \n"+
     "            |>.@|# #    |.+..|..|..+....+..|..|x.|..+...|                       \n"+
     "            ---S-# #    |.|..|..|..|....|@f|..|x.|..|...|###################    \n"+
     "               # # ###  |.----+-----....----+--+-----@..|#              ---S--  \n"+
     "               # #   #  |.........................@.....|#            ##S....|  \n"+
     "               # #   ##0|.-+-----+--.......---+---+--...|#            # |....|  \n"+
     "               # #     #|.|..|..|..|......{|....|...|...|#          ### |.<..|  \n"+
     "               # #     #|.|..|..|d.|....@..|....|...|...|#          #   ------  \n"+
     "               # ##     |.----+-----.......|..G@|...|...|#        ###           \n"+
     "        -------S--#     |.............{....|..G.|...|...|#        #             \n"+
     "        |.......h|###   |.-------+-------.----------|...|#      ###             \n"+
     "        |........|  #   |@+@m[m|...|(((@+.|...G|(((@+...|#      #               \n"+
     "        |........|  ### |.|.%[)|...|(((.|.+....|(((.|...+########               \n"+
     "        |........|    # |.|.mm)|.F.|(((.|.|....|(((.|...|#                      \n"+
     "        ----------    ##+.---------------.-----------...|#                      \n"+
     "                        |......@........................|#                      \n"+
     "                        ---------------------------------#                      \n"+
     "                                                                                \n",
     'replaces':new Array(
	 {'from':{'chr':'@'}, 'to':{'chr':'@', 'fg':'white'}},
	 {'from':{'chr':'+'}, 'to':{'chr':'+', 'fg':'brown'}},
	 {'from':{'chr':'S'}, 'to':{'chr':'.'},              'chance':50},
	 {'from':{'chr':'S'}, 'to':{'chr':'+', 'fg':'brown'}},
	 {'from':{'chr':'{'}, 'to':{'chr':'{', 'fg':'blue'}},
	 {'from':{'chr':'('}, 'to':{'chr':'(', 'fg':'white'}},
	 {'from':{'chr':'('}, 'to':{'chr':'(', 'fg':'cyan'}, 'chance':50},
	 {'from':{'chr':'d'}, 'to':{'chr':'d', 'fg':'white'}},
	 {'from':{'chr':'f'}, 'to':{'chr':'f', 'fg':'white'}},
	 {'from':{'chr':'F'}, 'to':{'chr':'F', 'fg':'red'}},
	 {'from':{'chr':'h'}, 'to':{'chr':'h', 'fg':'red'}},
	 {'from':{'chr':'k'}, 'to':{'chr':'k', 'fg':'red'}},
	 {'from':{'chr':'x'}, 'to':{'chr':'x', 'fg':'magenta'}},
	 {'from':{'chr':'G'}, 'to':{'chr':'G', 'fg':'brightblue'}},
	 {'from':{'chr':'m'}, 'to':{'chr':'m', 'fg':'brown'}},
	 {'from':{'chr':'m'}, 'to':{'chr':'m', 'fg':'red'}, 'chance':50},
	 {'from':{'chr':'['}, 'to':{'chr':'[', 'fg':'cyan'}},
	 {'from':{'chr':'['}, 'to':{'chr':'[', 'fg':'brown'}, 'chance':50},
	 {'from':{'chr':'^'}, 'to':{'chr':'^', 'fg':'random'}},
	 {'from':{'chr':'%'}, 'to':{'chr':'%', 'fg':'random'}}
     )
    },
    {'name':'Mine\'s End v1', 'map':
     "                                                                        \n"+
     "                           ---------     -------------       -------    \n"+
     "                           |  h h  |     |       |   |       |     |m   \n"+
     "       ---------        ----       -------           |       |--   ---  \n"+
     "       |       |        |        ... G             ---      --       |  \n"+
     "       |      -------   |--      k@.  <           d|m       |       --  \n"+
     "       |  --   y    -----     u  .f.               |        | -  ----   \n"+
     "       --  -- ----- h      |    **  :      ^   G --|        |-  --      \n"+
     "        --  -- m| -----------           f      --- ----------h --       \n"+
     "         |  i-- |    | *|   |*  ^ % G%  h  --- G       ZZ     --        \n"+
     "        ----  -----  ------------q  G   *--- ------------   --|         \n"+
     "        |      ^  --            ----------              ---   -- -----  \n"+
     "       --     ---  --                           --------  --   ---h  -- \n"+
     "    ---- a|  -- --  ---------------------      --      --  ---        | \n"+
     "  ---*   -----   --  |             (*   ---    |  *     |    |       -- \n"+
     "  |       |       --                      |    --      -|    |--  ----  \n"+
     "  --- -- --        ----             ^   ---     ------ ^------   --     \n"+
     "    |    |m           |          (    |  |          *|           |      \n"+
     "    ------            --------------------           ------------       \n"+
     "                                                                        \n",
     'replaces':new Array(
	 {'from':{'chr':'@'}, 'to':{'chr':'@', 'fg':'white'}},
	 {'from':{'chr':'f'}, 'to':{'chr':'f', 'fg':'white'}},
	 {'from':{'chr':'d'}, 'to':{'chr':'d', 'fg':'white'}},
	 {'from':{'chr':'G'}, 'to':{'chr':'G', 'fg':'brightblue'}, 'chance':25},
	 {'from':{'chr':'G'}, 'to':{'chr':'G', 'fg':'blue'}, 'chance':25},
	 {'from':{'chr':'G'}, 'to':{'chr':'G', 'fg':'brown'}},
	 {'from':{'chr':'h'}, 'to':{'chr':'h', 'fg':'green'}, 'chance':25},
	 {'from':{'chr':'h'}, 'to':{'chr':'h', 'fg':'red'}},
	 {'from':{'chr':'^'}, 'to':{'chr':'^', 'fg':'random'}},
	 {'from':{'chr':'*'}, 'to':{'chr':'*', 'fg':'random'}},
	 {'from':{'chr':'i'}, 'to':{'chr':'i', 'fg':'green'}},
	 {'from':{'chr':'a'}, 'to':{'chr':'a', 'fg':'red'}},
	 {'from':{'chr':'Z'}, 'to':{'chr':'Z', 'fg':'green'}},
	 {'from':{'chr':'m'}, 'to':{'chr':'m', 'fg':'brown'}},
	 {'from':{'chr':'k'}, 'to':{'chr':'k', 'fg':'brown'}},
	 {'from':{'chr':'y'}, 'to':{'chr':'y', 'fg':'yellow'}},
	 {'from':{'chr':'('}, 'to':{'chr':'(', 'fg':'brown'}},
	 {'from':{'chr':'('}, 'to':{'chr':'(', 'fg':'cyan'}, 'chance':50},
	 {'from':{'chr':'%'}, 'to':{'chr':'%', 'fg':'random'}}
     )
    },
    {'name':'Oracle', 'map':
     "                                                                               \n"+
     "                     --------                                                  \n"+
     "     ---------#######|......+############                                      \n"+
     "     |..<.S..+#      |.b...%|                         ----------               \n"+
     "     |.......|      #+......+#                        |......^.|     -------   \n"+
     "     --.------      #--------# ############           |....%...|   ##+.....|   \n"+
     "       #####        #        #   ---------.---        |........|   # |.....|   \n"+
     "           #        #        #   |`.........`|        |.:....>.+#### |...).|   \n"+
     "           ###      #        #   |.....`.....|      ##+k.......|     |.....|   \n"+
     "             #      #        #   |...-----.e.|      # ----------     |^....|   \n"+
     "             ##     #        ### |...|.{.|...+#######                -------   \n"+
     "        ------.-----#          # |..`|{Y{.`..|                                 \n"+
     "        |..........|#          ##+...|.{.|...|                                 \n"+
     "        |F.........|#            |...-----...|                                 \n"+
     "        |..........|#            |.....`..@..|                                 \n"+
     "        |.....?....+#            |`.........`|                                 \n"+
     "        |..........|             -------------                                 \n"+
     "        |.......S..|                                                           \n"+
     "        ------------                                                           \n"+
     "                                                                               \n",
     'replaces':new Array(
	 {'from':{'chr':'@'}, 'to':{'chr':'@', 'fg':'white'}},
	 {'from':{'chr':'f'}, 'to':{'chr':'f', 'fg':'white'}},
	 {'from':{'chr':'Y'}, 'to':{'chr':'@', 'fg':'brightblue'}},
	 {'from':{'chr':':'}, 'to':{'chr':':', 'fg':'yellow'}},
	 {'from':{'chr':'F'}, 'to':{'chr':'F', 'fg':'yellow'}},
	 {'from':{'chr':'k'}, 'to':{'chr':'k', 'fg':'red'}},
	 {'from':{'chr':'e'}, 'to':{'chr':'e', 'fg':'blue'}},
	 {'from':{'chr':'Z'}, 'to':{'chr':'Z', 'fg':'random'}},
	 {'from':{'chr':'?'}, 'to':{'chr':'?', 'fg':'white'}},
	 {'from':{'chr':'`'}, 'to':{'chr':'`', 'fg':'white'}},
	 {'from':{'chr':')'}, 'to':{'chr':')', 'fg':'brown'}},
	 {'from':{'chr':')'}, 'to':{'chr':')', 'fg':'cyan'}, 'chance':50},
	 {'from':{'chr':'{'}, 'to':{'chr':'{', 'fg':'blue'}},
	 {'from':{'chr':'^'}, 'to':{'chr':'^', 'fg':'random'}},

	 {'from':{'chr':'+'}, 'to':{'chr':'.'},               'chance': 50},
	 {'from':{'chr':'+'}, 'to':{'chr':'-', 'fg':'brown'}, 'chance': 50},
	 {'from':{'chr':'+'}, 'to':{'chr':'+', 'fg':'brown'}},

	 {'from':{'chr':'S'}, 'to':{'chr':'+', 'fg':'random'}},
	 {'from':{'chr':'%'}, 'to':{'chr':'%', 'fg':'random'}}
     )
    },
    {'name':'Sokoban 1-1', 'map':
     "-------- ------\n"+
     "|<|>...---....|\n"+
     "|^|-.00....0..|\n"+
     "|^||..00|.0.0.|\n"+
     "|^||....|.....|\n"+
     "|^|------0----|\n"+
     "|^|    |......|\n"+
     "|^------......|\n"+
     "|..^^^^000....|\n"+
     "|..-----......|\n"+
     "----   --------",
     'replaces':new Array(
	 {'from':{'chr':'^'}, 'to':{'chr':'^', 'fg':'darkgray'}}
     )
    },
    {'name':'Sokoban 2-1', 'map':
     "-----------       -----------\n"+
     "|....|....---     |.........|\n"+
     "|..00|00...>|     |.........|\n"+
     "|.....0...---     |.........|\n"+
     "|....|....|       |....<....|\n"+
     "|-.---------      |.........|\n"+
     "|..0.|.....|      |.........|\n"+
     "|.00.|0.0.0|      |.........|\n"+
     "|..0.....0.|      |.........|\n"+
     "|.000|0..0.----------------+|\n"+
     "|....|..0.0.^^^^^^^^^^^^^^^.|\n"+
     "-----------------------------",
     'replaces':new Array(
	 {'from':{'chr':'^'}, 'to':{'chr':'^', 'fg':'brown'}},
	 {'from':{'chr':'+'}, 'to':{'chr':'+', 'fg':'brown'}}
     )
    },
    {'name':'Sokoban 3-1', 'map':
     "  --------          \n"+
     "---.|....|          \n"+
     "|...0....|----------\n"+
     "|.-.00-00|.|.......|\n"+
     "|.00-......|.......|\n"+
     "|.-..0.|...|.......|\n"+
     "|....-0--0-|...<...|\n"+
     "|..00..0...|.......|\n"+
     "|.--...|...|.......|\n"+
     "|....-0|---|.......|\n"+
     "---..0.-----------+|\n"+
     "  |..0>^^^^^^^^^^^.|\n"+
     "  ------------------",
     'replaces':new Array(
	 {'from':{'chr':'^'}, 'to':{'chr':'^', 'fg':'brown'}},
	 {'from':{'chr':'+'}, 'to':{'chr':'+', 'fg':'brown'}}
     )
    },
    {'name':'Sokoban 4-1', 'map':
     "  ------------------------\n"+
     "  |..^^^^^^^^^^^^^^^^^^..|\n"+
     "  |..-------------------.|\n"+
     "----.|    -----        |.|\n"+
     "|..|0--  --...|        |.|\n"+
     "|.....|--|.0..|        |.|\n"+
     "|.00..|..|..0.|        |.|\n"+
     "--..00|...00.--        |.|\n"+
     " |0..0...|0..|   ------|.|\n"+
     " |.00.|..|..0| --|dFZ:B|.|\n"+
     " |.0.0---|.0.| |.+FFFh:|.|\n"+
     " |m......|..-- |-|FdFh.|.|\n"+
     " ----.0..|.--  |.+d:ex.+.|\n"+
     "    ---.--.|   |-|FdFrx|--\n"+
     "     |.m...|   |.+o:FFB|  \n"+
     "     |<.|..|   --|FF:bF|  \n"+
     "     -------     -------  ",
     'replaces':new Array(
	 {'from':{'chr':'^'}, 'to':{'chr':'^', 'fg':'brown'}},
	 {'from':{'chr':'+'}, 'to':{'chr':'+', 'fg':'brown'}},
	 {'from':{'chr':'F'}, 'to':{'chr':'F', 'fg':'yellow'}},
	 {'from':{'chr':'F'}, 'to':{'chr':'F', 'fg':'brightgreen'}, 'chance':50},
	 {'from':{'chr':'F'}, 'to':{'chr':'F', 'fg':'green'}, 'chance':20},
	 {'from':{'chr':'F'}, 'to':{'chr':'F', 'fg':'magenta'}, 'chance':20},
	 {'from':{'chr':'h'}, 'to':{'chr':'h', 'fg':'red'}},
	 {'from':{'chr':'h'}, 'to':{'chr':'h', 'fg':'brightgreen'}, 'chance':50},
	 {'from':{'chr':'d'}, 'to':{'chr':'d', 'fg':'red'}},
	 {'from':{'chr':'d'}, 'to':{'chr':'d', 'fg':'brown'}, 'chance':50},
	 {'from':{'chr':':'}, 'to':{'chr':':', 'fg':'green'}},
	 {'from':{'chr':':'}, 'to':{'chr':':', 'fg':'yellow'}, 'chance':50},
	 {'from':{'chr':'x'}, 'to':{'chr':'x', 'fg':'magenta'}},
	 {'from':{'chr':'B'}, 'to':{'chr':'B', 'fg':'brown'}},
	 {'from':{'chr':'r'}, 'to':{'chr':'r', 'fg':'brown'}},
	 {'from':{'chr':'b'}, 'to':{'chr':'b', 'fg':'green'}},
	 {'from':{'chr':'m'}, 'to':{'chr':'m', 'fg':'magenta'}}
     )
    },
    {'name':'Medusa v1', 'map':
     "}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}\n"+
     "}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}\n"+
     "}};}}}}}..}}}}}...'..}}}}}}}};}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}....}}}...}}}}}\n"+
     "}...}}.....}}}}}....}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}T}}}}}}}...........i...}\n"+
     "}....}}}}}}}}}}....}}}..}}}}}}}}}}}.......}}}}}}}}}}}}}}}}..}}.....}}}...}}\n"+
     "}...\"}}}}}}}}.....}}}}..}}}}}}.................}}}}}}}}}}}.}}}}...^.}}...}}\n"+
     "}....}}}}}};}}}}}.}}}}.}}}}}}.-----------------.}}}}}}}}}}}}}}}}}.........}\n"+
     "}....}}}}}}}}}}}}}}}}}}.}}}...|       ^       |...}}}}}}}}}}}}}}}}}}}....}}\n"+
     ";.....}.}}....}}}}}}}}}.}}....--------+--------....}}}}}}..}}}}}}}}}}}...}}\n"+
     "}.^....}}}}.(}}}}}}}}}}}}}.C....`.|       |........}}}}}.O..}}}}}}}}}}}}}}}\n"+
     "}.....}}}}}}}}}}}}}}}}}}}}.....u.*| Y     |........}}}}}d..}}}}}}}}}.}}}}}}\n"+
     "}.....}}}}}}}}}}}}}}}}}}}}.`[.--------+--------....}}}}}}.}.}}}}T}}}}}}}}}}\n"+
     "}......}}}}}}}}}}}}}}}}}}}}...|       ^       |.n.}}}}}}}}}}}}}}}}}^}}}}}}}\n"+
     "}.......}}}}}}}..}}}}}};}}}}}.-----------------.}}}}}}}}}}}}}}}}}....}}}}}}\n"+
     "}.@`.<...}}.}}...h}}}}}}}}}}}}.=.^.i...........}}}}}..}}}}}}}}}.....)`}}}}}\n"+
     "}.......}}}}}}}......}}}}}}}}}}}}}})i.....}}}}}}}}}.....}}}}}}...}}..}}}}}}\n"+
     "}.....}}}}}}}}}}}.....}}}}}}}}}}}}}}}}}}}}}}.}}}}}}}..}}}}}}}}}}....}}}}}}}\n"+
     "}}..}}}}}}}}}}}}}`...}}}}}}}}}}}}}}}}}}}}}}...}}..}}}}}}}.}}.}}}}..}}}}}}}}\n"+
     "}}}};}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}\n"+
     "}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}",
     'replaces':new Array(
	 {'from':{'chr':'@'}, 'to':{'chr':'@', 'fg':'white'}},
	 {'from':{'chr':'u'}, 'to':{'chr':'u', 'fg':'white'}},
	 {'from':{'chr':'Y'}, 'to':{'chr':'@', 'fg':'brightgreen'}},
	 {'from':{'chr':'}'}, 'to':{'chr':'}', 'fg':'blue'}},
	 {'from':{'chr':'^'}, 'to':{'chr':'^', 'fg':'random'}},
	 {'from':{'chr':';'}, 'to':{'chr':';', 'fg':'blue'}},
	 {'from':{'chr':';'}, 'to':{'chr':';', 'fg':'cyan'}, 'chance':50},
	 {'from':{'chr':'`'}, 'to':{'chr':'`', 'fg':'white'}},
	 {'from':{'chr':'='}, 'to':{'chr':'=', 'fg':'random'}},
	 {'from':{'chr':'*'}, 'to':{'chr':'*', 'fg':'random'}},
	 {'from':{'chr':'"'}, 'to':{'chr':'"', 'fg':'cyan'}},
	 {'from':{'chr':'T'}, 'to':{'chr':'T', 'fg':'blue'}},
	 {'from':{'chr':'+'}, 'to':{'chr':'+', 'fg':'brown'}},
	 {'from':{'chr':'C'}, 'to':{'chr':'C', 'fg':'green'}},
	 {'from':{'chr':'h'}, 'to':{'chr':'h', 'fg':'brown'}},
	 {'from':{'chr':'i'}, 'to':{'chr':'i', 'fg':'red'}},
	 {'from':{'chr':'n'}, 'to':{'chr':'n', 'fg':'green'}},
	 {'from':{'chr':'O'}, 'to':{'chr':'O', 'fg':'magenta'}},
	 {'from':{'chr':'d'}, 'to':{'chr':'d', 'fg':'brown'}},
	 {'from':{'chr':'('}, 'to':{'chr':'(', 'fg':'white'}},
	 {'from':{'chr':')'}, 'to':{'chr':')', 'fg':'cyan'}},
	 {'from':{'chr':'['}, 'to':{'chr':'[', 'fg':'brown'}}
     )
    },
    {'name':'Medusa v2', 'map':
     "}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}\n"+
     "};}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}\n"+
     "}------}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}-------}}}}}}}}--------------}\n"+
     "}|    |}}}}}}}}}..}.}}..}}}}}}}}}}}}}..}}}}}}|.....--}}}}}}}|    E       |}\n"+
     "}|    |.}}}}}}}}}}}.}...}}..}}}}}}}}}}}}}}}}}|--......}}}}}.|         A  |}\n"+
     "}|H   |.}}}}}}---}}}}}}}}}}}}}}}}}}}}}}}}}}---...|..|}}}}}}.|  ----------|}\n"+
     "}|    |.}}}}}}|...}}}}}}}}}.}}...}.}}}}.}}}......----}}}}}}.|^ q     M   |}\n"+
     "}|    |.}}}}}}|..W --}}}}}}}}}}}}}}}}}}}}}}----.s.-|}}}}}}}.|  --------+-|}\n"+
     ";|    |.}}}}}}}......}}}}...}}}}}}.}}}}}}}}}}}---..|--}}}}}.|  |''|   | A|}\n"+
     "}|  < |.}}}}}}-....|}}}}}}}------}}}}}}}}}}}}}}|.M.|.|}}}}}.|  |''|   |  |}\n"+
     "}|    |.}}}}}}}}}---}}}}}}}.....a..}}}}}}}}}}---.|....}}}}}.|  |SS| @ |  |}\n"+
     "}|    |.}}}}}}}}}}}}}}}}}}|.p..|.a.|}}}}}}}}--...|---.}}}}}.|  |  |   | y|}\n"+
     "}| ^  |.}}}}}}..}}}}}}}}}}---..--------}}}}}|..---}}}}}}}}}.|  |  -------|}\n"+
     "}|   }|^..;;}.}}}}}}...}}}}}|-..w.......}}}}..--}}}}}}}}}}}.|  |         |}\n"+
     "}|g  }|...;;.}}}}}}}}}}}}}}}|..--------}}}}}}}}}}}}}}...}}}.|  --------  |}\n"+
     "}|   }|...;;}}}}}..}}}}}}----..|....|}}}}}}}}}}}}}}}}}..}}}.|        ^e  |}\n"+
     "}|    |}}}}}....}}}}..}}.|.......----}}......}}}}}}.......}}|  Y q       |}\n"+
     "}------}}}}}}}}}}}}}}}}}}---------}}}}}}}}}}}}}}}}}}}}}}}}}}--------------}\n"+
     "}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}\n"+
     "}}}};}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}",
     'replaces':new Array(
	 {'from':{'chr':'@'}, 'to':{'chr':'@', 'fg':'brightgreen'}},
	 {'from':{'chr':'+'}, 'to':{'chr':'+', 'fg':'brown'}},
	 {'from':{'chr':'}'}, 'to':{'chr':'}', 'fg':'blue'}},
	 {'from':{'chr':'^'}, 'to':{'chr':'^', 'fg':'random'}},
	 {'from':{'chr':';'}, 'to':{'chr':';', 'fg':'blue'}},
	 {'from':{'chr':';'}, 'to':{'chr':';', 'fg':'cyan'}, 'chance':50},
	 {'from':{'chr':';'}, 'to':{'chr':';', 'fg':'red'},  'chance':5},
	 {'from':{'chr':'`'}, 'to':{'chr':'`', 'fg':'white'}},
	 {'from':{'chr':'g'}, 'to':{'chr':'g', 'fg':'green'}},
	 {'from':{'chr':'H'}, 'to':{'chr':'H', 'fg':'magenta'}},
	 {'from':{'chr':'A'}, 'to':{'chr':'A', 'fg':'green'}},
	 {'from':{'chr':'S'}, 'to':{'chr':'S', 'fg':'green'}},
	 {'from':{'chr':'y'}, 'to':{'chr':'y', 'fg':'yellow'}},
	 {'from':{'chr':'q'}, 'to':{'chr':'q', 'fg':'brown'}},
	 {'from':{'chr':'w'}, 'to':{'chr':'w', 'fg':'magenta'}},
	 {'from':{'chr':'s'}, 'to':{'chr':'s', 'fg':'magenta'}},
	 {'from':{'chr':'E'}, 'to':{'chr':'E', 'fg':'yellow'}},
	 {'from':{'chr':'e'}, 'to':{'chr':'e', 'fg':'red'}},
	 {'from':{'chr':'a'}, 'to':{'chr':'a', 'fg':'yellow'}}
     )
    },
    {'name':'Castle', 'map':
     " -----------------------------------------------------------------------------\n"+
     " |     |}}}}};}}}                                             }}};}}}}}|  0  |\n"+
     " |-- | |}-------}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}-------}| --- |\n"+
     " |  *| |}| @ @ |-----------------------------------------------| @(@ |}|  $| |\n"+
     " | ----|}|     +                                               +     |}|-- | |\n"+
     " | |  <|}-------------------------------+-----------------------------}|   | |\n"+
     " | | | |}}}}}}|  @ @   |@@@@@@@@@ +N  X  T  O |*******|D|[[[[[[[|}}}}}}----- |\n"+
     " |   | |.....}| @   @  |@@@@@@@@@ | R  H  M  E|*******|D|[[[[[[[|}       |   |\n"+
     " |---- |.....;|        |----------|L  Z  N  X |-----------------|;     | | | |\n"+
     " |^    |.....}#  @{    +          + T  O  R \\(| ^   ^   ^   ^  ^+      |   | |\n"+
     " | -----.Y...;|        |----------|H  M  E  L |-----------------|;     |---- |\n"+
     " |   | .f....}| @   @  |@@@@@@@@@ | Z  N  X  T|)))))))|D|%%%%%%%|}     | |   |\n"+
     " | | | |}}}}}}|  @ @   |@@@@@@@@@ +O  R  H  M |)))))))|D|%%%%%%%|}}}}}}| | --|\n"+
     " | |   |}-------------------------------+-----------------------------}| |   |\n"+
     " | |---|}|     +                                               +     |}| --- |\n"+
     " |*| a |}| @ @ |-----------------------------------------------| @ @ |}|     |\n"+
     " | ---a|}-------}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}-------}| ----|\n"+
     " |     |}}}}};}}}                                             }}};}}}}}|     |\n"+
     " -----------------------------------------------------------------------------",
     'replaces':new Array(
	 {'from':{'chr':'@'}, 'to':{'chr':'@', 'fg':'green'}, 'chance':10},
	 {'from':{'chr':'@'}, 'to':{'chr':'@', 'fg':'red'}, 'chance':5},
	 {'from':{'chr':'@'}, 'to':{'chr':'@', 'fg':'blue'}, 'chance':1},
	 {'from':{'chr':'Y'}, 'to':{'chr':'@', 'fg':'white'}},
	 {'from':{'chr':'f'}, 'to':{'chr':'f', 'fg':'white'}},
	 {'from':{'chr':'#'}, 'to':{'chr':'#', 'fg':'brown'}},
	 {'from':{'chr':'{'}, 'to':{'chr':'{', 'fg':'blue'}},
	 {'from':{'chr':'}'}, 'to':{'chr':'}', 'fg':'blue'}},
	 {'from':{'chr':'+'}, 'to':{'chr':'+', 'fg':'brown'}},
	 {'from':{'chr':'('}, 'to':{'chr':'(', 'fg':'brown'}},
	 {'from':{'chr':'^'}, 'to':{'chr':'^', 'fg':'random'}},
	 {'from':{'chr':'*'}, 'to':{'chr':'*', 'fg':'random'}},
	 {'from':{'chr':'D'}, 'to':{'chr':'D', 'fg':'random'}},
	 {'from':{'chr':'a'}, 'to':{'chr':'a', 'fg':'yellow'}},
	 {'from':{'chr':'$'}, 'to':{'chr':'$', 'fg':'yellow'}},
	 {'from':{'chr':'\\'}, 'to':{'chr':'\\', 'fg':'yellow'}},
	 {'from':{'chr':')'}, 'to':{'chr':')', 'fg':'brown'}},
	 {'from':{'chr':')'}, 'to':{'chr':')', 'fg':'cyan'}, 'chance':50},
	 {'from':{'chr':'['}, 'to':{'chr':'[', 'fg':'brown'}},
	 {'from':{'chr':'['}, 'to':{'chr':'[', 'fg':'cyan'}, 'chance':50},
	 {'from':{'chr':'['}, 'to':{'chr':'[', 'fg':'random'}, 'chance':5},
	 {'from':{'chr':'%'}, 'to':{'chr':'%', 'fg':'brown'}},
	 {'from':{'chr':'%'}, 'to':{'chr':'%', 'fg':'random'}, 'chance':5},
	 {'from':{'chr':'O'}, 'to':{'chr':'O', 'fg':['brown','magenta']}},
	 {'from':{'chr':'N'}, 'to':{'chr':'N', 'fg':'random'}},
	 {'from':{'chr':'X'}, 'to':{'chr':'X', 'fg':'brown'}},
	 {'from':{'chr':'L'}, 'to':{'chr':'L', 'fg':['brown','red','magenta']}},
	 {'from':{'chr':'R'}, 'to':{'chr':'R', 'fg':'blue'}},
	 {'from':{'chr':'T'}, 'to':{'chr':'T', 'fg':['brown', 'white', 'cyan', 'blue', 'magenta']}},
	 {'from':{'chr':'E'}, 'to':{'chr':'E', 'fg':'brightblue'}},
	 {'from':{'chr':'M'}, 'to':{'chr':'M', 'fg':'brown'}},
	 {'from':{'chr':'Z'}, 'to':{'chr':'Z', 'fg':'green'}},
	 {'from':{'chr':'H'}, 'to':{'chr':'H', 'fg':['gray','cyan','yellow','white','blue','brown']}}
     )
    },
    {'name':'Valley of the Dead', 'map':
     "----------------  -------       ------------------   ----------------- -----\n"+
     "|> ^|Z|  |    ^|  |Z&W&Z--      |                |   |      ^        | |   |\n"+
     "----|^| --B---B|  |ZWZ W --- ----          ----- -----    ---        --- | |\n"+
     "    | | |  | | | --ZVZZZWZZ| |  Z          |   |       ---| |-           |--\n"+
     "    |   |  | | | |WWWZ ZZ-----       ------|   |--------  ---      -------  \n"+
     "-----------| |^| |-&WZZZZ| |    |   -- |   -----                ----        \n"+
     "|.....|M   --- | |ZZZWWZW| |   V|   |  |M             -----------           \n"+
     "|....M| |      | |WZWZ --- |      ---  |L   ---       |                     \n"+
     "|.....| |------| |WZWZ--   --    -- --------| ----    ---------------       \n"+
     "|.....---Z     ---B  --     |   --  |ZWZ ZZ |    |                  |       \n"+
     "|.._@..    --        --    --   |   |WZZZ ZV|    |   --             |       \n"+
     "|.....| V ----      Z ------    |   |ZZVZVZ^---- |   --             --      \n"+
     "|.....|--      ---   ^       --------ZWVZZZWZWZ| |       ---------   --     \n"+
     "|.....| |------| ---       ---   |   WZZZVW----- -----    | | |  |    ---   \n"+
     "|.....| |ZWWZ W--- ------  | -----   ZZ ZWZ|       | -------- -- |-     ----\n"+
     "------- |ZZZZ WWZ|  | |  V | |     ----    ---------           ---         |\n"+
     "        |^^W ZZZ |  |   |  | |     |  |-        ^    --------           ----\n"+
     "        --&WZZZ-----------^| |    -----     ----------     |      <  ----   \n"+
     "         |ZZ|  M           | | |          | |              | |        |     \n"+
     "         ------------------- ----------------              ------------     ",
     'replaces':new Array(
	 {'from':{'chr':'@'}, 'to':{'chr':'@', 'fg':'white'}},
	 {'from':{'chr':'^'}, 'to':{'chr':'^', 'fg':'random'}},
	 {'from':{'chr':'W'}, 'to':{'chr':'W', 'fg':'darkgray'}},
	 {'from':{'chr':'Z'}, 'to':{'chr':'Z', 'fg':['white','brown','green','grey','red']}},
	 {'from':{'chr':'M'}, 'to':{'chr':'M', 'fg':'brown'}},
	 {'from':{'chr':'V'}, 'to':{'chr':'V', 'fg':['red','blue']}},
	 {'from':{'chr':'B'}, 'to':{'chr':'B', 'fg':['darkgray','brown']}},
	 {'from':{'chr':'&'}, 'to':{'chr':'&', 'fg':'red'}, 'chance':50},
	 {'from':{'chr':'L'}, 'to':{'chr':'L', 'fg':['brown','red','magenta']}}
     )
    },
    {'name':'Asmodeus', 'map':
 "-----------------------------------------------------------------------------\n"+
 "|  <  |  ^                              |             |        ^|  $  | |   |\n"+
 "| --- | --- --------------------------- ------- --- | | ----- --- --- | | | |\n"+
 "| | |*  |   |---------------------|  *|       | |   |$|0  |   |   |   |   | |\n"+
 "| | ----- | ||             | V   || --------- --- --- --- | --| ----- ----- |\n"+
 "|  ^  |   | ||    ^ ? *    |     ||            *  |       |  $|     |       |\n"+
 "| ----- --| ||---+------------V ^|--------------------------------- |------ |\n"+
 "|.|0 ^  | | ||     |         |-+----------------------------------| |    [| |\n"+
 "|@| ----- | ||? ---|   &     |   ?   &              &            |- | ----- |\n"+
 "|.| | |     || )|  | ^     ! |  ^[       ^ ^                     +  |0|     |\n"+
 "| | | | ----||  |  |     X>  |             &                   ^ |--- | ----|\n"+
 "| | |0 ^ $  ||  |  | )    ^  |-+----------------------------------|   |    0|\n"+
 "|-- | ----- ||  |  -----------   |--------------------------------- | ----- |\n"+
 "|   | |   | ||L |V[        |  ! ^||     |   |       |*      |       |     | |\n"+
 "| ----| | |------------------------ | --- | | --- --- --- --| | | --------- |\n"+
 "|     | | |   |    *|       |   |   |     |   |   |   | |   | | |[|      /  |\n"+
 "| --- | | | | | --- | ----- | | | ------------| --- --- --- | | --- --------|\n"+
 "|0  |0  |   |     |       |   |          0    |           |   |             |\n"+
 "-----------------------------------------------------------------------------",
     'replaces':new Array(
	 {'from':{'chr':'@'}, 'to':{'chr':'@', 'fg':'white'}},
	 {'from':{'chr':'^'}, 'to':{'chr':'^', 'fg':['blue', 'red', 'red', 'random']}},
	 {'from':{'chr':'$'}, 'to':{'chr':'$', 'fg':'yellow'}},
	 {'from':{'chr':'*'}, 'to':{'chr':'*', 'fg':'random'}},
	 {'from':{'chr':'+'}, 'to':{'chr':'+', 'fg':'brown'}},
	 {'from':{'chr':'['}, 'to':{'chr':'[', 'fg':['brown','cyan']}},
	 {'from':{'chr':')'}, 'to':{'chr':')', 'fg':['gray', 'brown', 'cyan']}},
	 {'from':{'chr':'?'}, 'to':{'chr':'?', 'fg':'white'}},
	 {'from':{'chr':'!'}, 'to':{'chr':'!', 'fg':'random'}},
	 {'from':{'chr':'V'}, 'to':{'chr':'V', 'fg':['red','blue']}},
	 {'from':{'chr':'L'}, 'to':{'chr':'L', 'fg':['brown', 'red', 'magenta']}},
	 {'from':{'chr':'&'}, 'to':{'chr':'&', 'fg':'red'}},
	 {'from':{'chr':'X'}, 'to':{'chr':'&', 'fg':'magenta'}}
     )
    },
    {'name':'Fort Ludios', 'map':
     "--------------------------------------------------------------------------\n"+
     "|        |                                                               |\n"+
     "|        | @      @         @         @                    ------------  |\n"+
     "-------+--  @                                              |@@@@@@@@@@|  |\n"+
     "      |        }}}}}}}                    }}}}}}}          |   @@@@@@@|  |\n"+
     "      |        }-----}         D          }-----}          --+--+--@@@|  |\n"+
     "    ---        }|   |}}}}}}}}}}}}}}}}}}}}}}|   |}                 |@@@|  |\n"+
     "    |          }--------------------------------}                 |@@@|  |\n"+
     "    |        @ ;}}|        ^^  ^ ^|zzzzzzzzzz|;}}                 +@@@|  |\n"+
     "-------         D}|    ^ ^^^^^^   |zzzzzzzzzz|}        @          |@@@|  |\n"+
     "|zzzzz|  @       }|^    ^^  ^^ ^ ^|zzzzzzCzzz|}D       @          |@@@|  |\n"+
     "|zzzzz+        ;}}|^^  ^  ^ ^  ^^^|zzzzzzzzzz|;}}                 +@@@|  |\n"+
     "|zzzzz|        }--------------------------------}                 |@@@|  |\n"+
     "|zz   |   @    }|   |}}}}}}}}}}}}}}}}}}}}}}|   |}   @             |@@@|  |\n"+
     "|zz------ @    }-----}         D          }-----}   @      --+--+--@@@|  |\n"+
     "|zz| ...|      }}}}}}}                    }}}}}}}          |@@@@@@@@@@|  |\n"+
     "|zz| .X.|                   @ @       @             @      |@@@@@@@@@@|  |\n"+
     "-----------                                                ------------  |\n"+
     "          |                                                              |\n"+
     "          ----------------------------------------------------------------",
     'replaces':new Array(
	 {'from':{'chr':'+'}, 'to':{'chr':'+', 'fg':'brown'}},
	 {'from':{'chr':'}'}, 'to':{'chr':'}', 'fg':'blue'}},
	 {'from':{'chr':';'}, 'to':{'chr':';', 'fg':['blue','brightblue']}},
	 {'from':{'chr':'D'}, 'to':{'chr':'D', 'fg':'random'}},
	 {'from':{'chr':'@'}, 'to':{'chr':'@', 'fg':'red'}, 'chance':8},
	 {'from':{'chr':'@'}, 'to':{'chr':'@', 'fg':'green'}, 'chance':8},
	 {'from':{'chr':'z'}, 'to':{'chr':'o', 'fg':['yellow','blue','magenta']}, 'chance':20},
	 {'from':{'chr':'z'}, 'to':{'chr':'D', 'fg':'random'}, 'chance':30},
	 {'from':{'chr':'z'}, 'to':{'chr':'H', 'fg':['gray','cyan','yellow','white','blue','brown']}, 'chance':35},
	 {'from':{'chr':'z'}, 'to':{'chr':'G', 'fg':['blue','brown','magenta']}, 'chance':40},
	 {'from':{'chr':'z'}, 'to':{'chr':'T', 'fg':['brown', 'white', 'cyan', 'blue', 'magenta']}, 'chance':40},
	 {'from':{'chr':'z'}, 'to':{'chr':'h', 'fg':['brown','blue','red','green','magenta']}},
	 {'from':{'chr':'^'}, 'to':{'chr':'^', 'fg':'red'}},
	 {'from':{'chr':'^'}, 'to':{'chr':'^', 'fg':'darkgray', 'chance':45}},
	 {'from':{'chr':'X'}, 'to':{'chr':'^', 'fg':'brightmagenta'}},
	 {'from':{'chr':'C'}, 'to':{'chr':'@', 'fg':'magenta'}}
     )
    },
    {'name':'Barbarian Quest Home', 'map':
  "..................................}}........................................\n"+
  "..........O........................};.O.....................................\n"+
  "...................................}}OOOO.....................^.............\n"+
  "....................................}}.OO...................................\n"+
  "........--------------......-----....}}}.O..................................\n"+
  "........|(@@|........|.@....+   |...}}}.O...................................\n"+
  "........|----.@......|......|   |....}}.....................................\n"+
  "........|.C.@...@..@.+......-----....X......................................\n"+
  "........|----........|...............}}.....................................\n"+
  "........|>@@|........|...-----.......;}}....................................\n"+
  "........--------------...+   |......}}}}}...................................\n"+
  ".........................|   |.......}}}....................................\n"+
  "...-----......-----......|----........}}....................................\n"+
  "...|   +......|   +..--+-|.............}}.O.................................\n"+
  "...|   |......|   |. |   |..............}}..................................\n"+
  "...-----......-----. |   |.............;}}}O................................\n"+
  ".....................-----............}}..}}................................\n"+
  ".....................................}}...}}................................\n"+
  "....................................}}...}}.................................\n"+
  "....................................}}....}}................................",
     'replaces':new Array(
	 {'from':{'chr':'}'}, 'to':{'chr':'}', 'fg':'blue'}},
	 {'from':{'chr':';'}, 'to':{'chr':';', 'fg':['blue', 'brightblue']}},
	 {'from':{'chr':'O'}, 'to':{'chr':'O', 'fg':'brown'}},
	 {'from':{'chr':'@'}, 'to':{'chr':'@', 'fg':'white'}},
	 {'from':{'chr':'+'}, 'to':{'chr':'+', 'fg':'brown'}},
	 {'from':{'chr':'('}, 'to':{'chr':'(', 'fg':'brown'}},
	 {'from':{'chr':'^'}, 'to':{'chr':'^', 'fg':'brightmagenta'}},
	 {'from':{'chr':'X'}, 'to':{'chr':'^', 'fg':'darkgray'}},
	 {'from':{'chr':'C'}, 'to':{'chr':'@', 'fg':'magenta'}}
     )
    },
    {'name':'Caveman Quest Home', 'map':
  " --------   ----------------------------     -----      --------------      \n"+
  "--......|   |.......@@@................--   --   -----  |    --      -----  \n"+
  "|......--  ---......@@.............C_@..--  |  h     -- ----    ----     -- \n"+
  "-->...-|  --........@@...................|  |   h     |    |-----| h  --  --\n"+
  " ----  |  |......................---------  ---  h    ------  -----  h |-  |\n"+
  "  ---  |  --....................--      -------------  --       ----  --   |\n"+
  "  |  ---   ------------  --------      --     -----       ---    | ---|    |\n"+
  "  --  --    --...--.| |  --           --        --  -----  ---  --   --   --\n"+
  "   --  --   |......-- --  --          |            --   --  ----------   -| \n"+
  " ------ --- --....--   -- @-------------        ----   ----  --  h     ^  --\n"+
  "--...---  -----..--     |             ------------------       h   h       |\n"+
  "|.....---     ------------                               ------      h    --\n"+
  "--......                ------------   ---------------------- --------   -| \n"+
  " |.....----- --          --------    | --  --   -- h        ----     --   --\n"+
  " --...-- --  |---------             -|  -- |         h         -- ----|    |\n"+
  "  --------..-|  ---..---         ------..----   --     h    --  ---   |-   |\n"+
  "    ---......---|.....-- ---------|........---------  ---------  |    --   |\n"+
  "    |..........||..........|      |-.....|...|    |     |     --        ----\n"+
  "    ---..--...----.--.....--      |....----..|    --   --      ----  ----   \n"+
  "      ---------  ----------       ------  ----     -----          ----      ",
     'replaces':new Array(
	 {'from':{'chr':'h'}, 'to':{'chr':'h', 'fg':'brown'}},
	 {'from':{'chr':'@'}, 'to':{'chr':'@', 'fg':'white'}},
	 {'from':{'chr':'^'}, 'to':{'chr':'^', 'fg':'brightmagenta'}},
	 {'from':{'chr':'C'}, 'to':{'chr':'@', 'fg':'magenta'}}
     )
    },
    {'name':'Caveman Quest Goal', 'map':
  "           -----------------------           \n"+
  "          --................!....--          \n"+
  "         --.................*....<--         \n"+
  "        --...................!.....--        \n"+
  "       --...........................--       \n"+
  "      --.................?...........--      \n"+
  "     --...............................--     \n"+
  "    --.......[......@..................--    \n"+
  "   --......F...........?.......[........--   \n"+
  "  --................)....................--  \n"+
  "  |......D................................|  \n"+
  "  --.....).....................F.........--  \n"+
  "   --.........[.........................--   \n"+
  "    --......F..........................--    \n"+
  "     --......)....................+..)--     \n"+
  "      --.............................--      \n"+
  "       --....%......................--       \n"+
  "        --.........................--        \n"+
  "         --.......................--         \n"+
  "          -------------------------          ",
     'replaces':new Array(
	 {'from':{'chr':'@'}, 'to':{'chr':'@', 'fg':'white'}},
	 {'from':{'chr':'?'}, 'to':{'chr':'?', 'fg':'white'}},
	 {'from':{'chr':'%'}, 'to':{'chr':'%', 'fg':'brown'}},
	 {'from':{'chr':')'}, 'to':{'chr':')', 'fg':['brown','cyan']}},
	 {'from':{'chr':'['}, 'to':{'chr':'[', 'fg':['brown','cyan']}},
	 {'from':{'chr':'+'}, 'to':{'chr':'+', 'fg':'random'}},
	 {'from':{'chr':'!'}, 'to':{'chr':'!', 'fg':'random'}},
	 {'from':{'chr':'F'}, 'to':{'chr':'F', 'fg':'magenta'}},
	 {'from':{'chr':'D'}, 'to':{'chr':'D', 'fg':'magenta'}}
     )
    },
    {'name':'Astral Plane', 'map':
  "                              ---------------                              \n"+
  "                              |             |                              \n"+
  "                              |  ---------  |                              \n"+
  "                              |  |       |  |                              \n"+
  "---------------               |  | L @   |  |               ---------------\n"+
  "|         A   |               |  |  V_   |  |               | @AA         |\n"+
  "|  ---------AA--   ---------  |  |       |  |  ---------   --A ---------  |\n"+
  "|  |       |D @-- --@      -- |A |   @   |AA| --    &@ -- --   |       |  |\n"+
  "|  |       | @@V--- A@      --| A----+----  |--      @@ --- @@ |       |  |\n"+
  "|  |   _@  +@    +@ @A  &    || A @@    @ A ||         A@+  @  +  @_   |  |\n"+
  "|  |       | @  --- @       ----- @D L @@ -----  @    A --- @ @|       |  |\n"+
  "|  |       |  @-- --       --   -----+-----   --     @ -- --   |       |  |\n"+
  "|  --------- A--   ----+----    --@     @--    ----+----   --AA---------  |\n"+
  "|         A  A|      |   -------- @ A @A  --------   |      |   A         |\n"+
  "---------------      |   D .@. |           |         |      ---------------\n"+
  "                     -------@.A--   &     --   -------                     \n"+
  "                           |  L --       --    |                           \n"+
  "                           ---   ----+----   ---                           \n"+
  "                             |       V @     |                             \n"+
  "                             -----------------                             ",
     'replaces':new Array(
	 {'from':{'chr':'A'}, 'to':{'chr':'A', 'fg':'white'}},
	 {'from':{'chr':'&'}, 'to':{'chr':'&', 'fg':'magenta'}},
	 {'from':{'chr':'@'}, 'to':{'chr':'@', 'fg':'white'}},
	 {'from':{'chr':'+'}, 'to':{'chr':'+', 'fg':'brown'}},
	 {'from':{'chr':'L'}, 'to':{'chr':'L', 'fg':['brown', 'red', 'magenta']}},
	 {'from':{'chr':'D'}, 'to':{'chr':'D', 'fg':'random'}},
	 {'from':{'chr':'V'}, 'to':{'chr':'V', 'fg':['red', 'blue']}}
     )
    }

);

var nethack_shop_types = new Array(
    {'chr':'?', 'act':82},
    {'chr':'+', 'act':83},
    {'chr':'=', 'act':84},
    {'chr':'%', 'act':85},
    {'chr':'(', 'act':86},
    {'chr':'!', 'act':87},
    {'chr':'/', 'act':88},
    {'chr':'[', 'act':89},
    {'chr':')', 'act':90},
    {'chr':'general', 'act':81}
);

var dud_cookie_prefix = "dudley_diy_";

var default_quick_pen_keys = "1234567890";
var quick_pen_keys = default_quick_pen_keys;

var editmode_str = new Array("Drawing Pen", "ColorPicker", "TextWriter", "FloodFill", "LineDraw", "Rectangle", "FillRect", "RoomWallRect");

var editmode = 0;

var pen = {'chr':"."};
var ctrl_pen = {'chr':" "};

var default_saved_pens = new Array(
{'chr':".", 'fg': "gray"},
{'chr':" ", 'fg': "gray"},
{'chr':"|", 'fg': "gray"},
{'chr':"-", 'fg': "gray"},
{'chr':"+", 'fg': "brown"},
{'chr':"|", 'fg': "brown"},
{'chr':"-", 'fg': "brown"},
{'chr':"#", 'fg': "gray"},
{'chr':"@", 'fg': "white"},
{'chr':"f", 'fg': "white"},
{'chr':"d", 'fg': "white"}
);
var saved_pens = default_saved_pens;

var preview_window = undefined;
var configuration_window = undefined;
var map_template_window = undefined;

var curr_maptemplatedata = undefined;

var code_checkbox;
var preview_checkbox;
var shift_key, ctrl_key, alt_key;

var hovering_on_editpanel = 0;
var current_pos_x = 0;
var current_pos_y = 0;

var cursor_x = 0;
var cursor_y = 0;

var PANEL_WID = 20;
var PANEL_HEI =  9;

var editpanel_dirty = 0;
var editpanel_strippanel;
var editpaneldata;
var editpanel_copy;

var FORCE_STRIP_WID = 0;
var STRIP_WID = 3;
var STRIP_HEI = 1;

var n_panels = STRIP_WID*STRIP_HEI;
var panels = new Array();
var stripdata = new Array();

var dudley_mouse_pos_x = 0;
var dudley_mouse_pos_y = 0;
