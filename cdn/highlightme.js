function highlightme(elmnt, lang, mode) {
 lang = (lang || "html");
 var elmntObj = (document.getElementById(elmnt) || elmnt);
 var elmntTxt = elmntObj.innerHTML;
 var tagcolor = "mediumblue";
 var tagnamecolor = "brown";
 var attributecolor = "red";
 var attributevaluecolor = "mediumblue";
 var commentcolor = "green";
 var cssselectorcolor = "brown";
 var csspropertycolor = "red";
 var csspropertyvaluecolor = "mediumblue";
 var cssdelimitercolor = "black";
 var cssimportantcolor = "red";  
 var jscolor = "black";
 var jskeywordcolor = "mediumblue";
 var jsstringcolor = "brown";
 var jsnumbercolor = "red";
 var jspropertycolor = "mediumblue";
 var plaintextcolor = "black";
 elmntObj.style.fontFamily = "Consolas,'Courier New', monospace";
 elmntObj.style.backgroundColor = "#eee";
 elmntObj.style.borderRadius = "3px";
 elmntObj.style.padding = "0 3px";
 elmntObj.style.fontWeight = "bold";
 elmntObj.style.overflow = "auto";
 elmntObj.style.whiteSpace = "nowrap";
 elmntObj.style.whiteSpace = "pre";
 elmntObj.style.display = "flex";
 elmntObj.style.alignItems = "center";
 
 if(mode == "dark") {
 	tagcolor = "#ffc04e";
  tagnamecolor = "#ffc04e";
  attributecolor = "#aeb3ba";
  attributevaluecolor = "#007a0c";
  cssselectorcolor = "#eb791c";
  csspropertycolor = "#ffc04e";
  csspropertyvaluecolor = "#aeb3ba";
  cssdelimitercolor = "#aeb3ba";
  cssimportantcolor = "#aeb3ba";
  jscolor = "#aeb3ba";
  jskeywordcolor = "#eb791c";
  jsstringcolor = "#007a0c";
  jsnumbercolor = "#aeb3ba";
  jspropertycolor = "#eb791c";
  plaintextcolor = "white";
  elmntObj.style.backgroundColor = "#272b2d";
  elmntObj.style.color = "#aeb3b9";
 }
 
 if(!lang) {lang = "html";}
 if(lang == "html") {elmntTxt = htmlMode(elmntTxt);}
 if(lang == "xml") {elmntTxt = xmlMode(elmntTxt);}
 if(lang == "css") {elmntTxt = cssMode(elmntTxt);}
 if(lang == "js") {elmntTxt = jsMode(elmntTxt);}
 if(lang == "plaintext" || lang == "nohighlight"){elmntTxt = plainMode(elmntTxt);}
 elmntObj.innerHTML = elmntTxt;

 function extract(str, start, end, func, repl) {
  var s, e, d = "", a = [];
  while(str.search(start) > -1) {
   s = str.search(start);
   e = str.indexOf(end, s);
   if(e == -1) {e = str.length;}
   if(repl) {
    a.push(func(str.substring(s, e + (end.length))));      
    str = str.substring(0, s) + repl + str.substr(e + (end.length));
   } else {
    d += str.substring(0, s);
    d += func(str.substring(s, e + (end.length)));
    str = str.substr(e + (end.length));
   }
  }
  this.rest = d + str;
  this.arr = a;
 }
 
 function htmlMode(txt) {
  var rest = txt, done = "", php, comment, angular, startpos, endpos, note, i;
  comment = new extract(rest, "&lt;!--", "--&gt;", commentMode, "W3HTMLCOMMENTPOS");
  rest = comment.rest;
  while(rest.indexOf("&lt;") > -1) {
   note = "";
   startpos = rest.indexOf("&lt;");
   if(rest.substr(startpos, 9).toUpperCase() == "&LT;STYLE") {note = "css";}
   if(rest.substr(startpos, 10).toUpperCase() == "&LT;SCRIPT") {note = "javascript";}        
   endpos = rest.indexOf("&gt;", startpos);
   if(endpos == -1) {endpos = rest.length;}
   done += rest.substring(0, startpos);
   done += tagMode(rest.substring(startpos, endpos + 4));
   rest = rest.substr(endpos + 4);
   if(note == "css") {
    endpos = rest.indexOf("&lt;/style&gt;");
    if(endpos > -1) {
     done += cssMode(rest.substring(0, endpos));
     rest = rest.substr(endpos);
    }
   }
   if(note == "javascript") {
    endpos = rest.indexOf("&lt;/script&gt;");
    if(endpos > -1) {
     done += jsMode(rest.substring(0, endpos));
     rest = rest.substr(endpos);
    }
   }
  }
  rest = done + rest;
  for(i = 0; i < comment.arr.length; i++) {
   rest = rest.replace("W3HTMLCOMMENTPOS", comment.arr[i]);
  }
  return rest;
 }
 function xmlMode(txt) {
  var rest = txt, done = "", php, comment, angular, startpos, endpos, note, i;
  comment = new extract(rest, "&lt;!--", "--&gt;", commentMode, "W3HTMLCOMMENTPOS");
  rest = comment.rest;
  while(rest.indexOf("&lt;") > -1) {
   note = "";
   startpos = rest.indexOf("&lt;");        
   endpos = rest.indexOf("&gt;", startpos);
   if(endpos == -1) {endpos = rest.length;}
   done += rest.substring(0, startpos);
   done += tagMode(rest.substring(startpos, endpos + 4));
   rest = rest.substr(endpos + 4);
  }
  rest = done + rest;
  for(i = 0; i < comment.arr.length; i++) {
   rest = rest.replace("W3HTMLCOMMENTPOS", comment.arr[i]);
  }
  return rest;
 }
 function tagMode(txt) {
  var rest = txt, done = "", startpos, endpos, result;
  while(rest.search(/(\s|<br>)/) > -1) {    
   startpos = rest.search(/(\s|<br>)/);
   endpos = rest.indexOf("&gt;");
   if(endpos == -1) {endpos = rest.length;}
   done += rest.substring(0, startpos);
   done += attributeMode(rest.substring(startpos, endpos));
   rest = rest.substr(endpos);
  }
  result = done + rest;
  result = "<span style=color:" + tagcolor + ">&lt;</span>" + result.substring(4);
  if(result.substr(result.length - 4, 4) == "&gt;") {
   result = result.substring(0, result.length - 4) + "<span style=color:" + tagcolor + ">&gt;</span>";
  }
  return "<span style=color:" + tagnamecolor + ">" + result + "</span>";
 }
 function attributeMode(txt) {
  var rest = txt, done = "", startpos, endpos, singlefnuttpos, doublefnuttpos, spacepos;
  while(rest.indexOf("=") > -1) {
   endpos = -1;
   startpos = rest.indexOf("=");
   singlefnuttpos = rest.indexOf("'", startpos);
   doublefnuttpos = rest.indexOf('"', startpos);
   spacepos = rest.indexOf(" ", startpos + 2);
   if(spacepos > -1 && (spacepos < singlefnuttpos || singlefnuttpos == -1) && (spacepos < doublefnuttpos || doublefnuttpos == -1)) {
    endpos = rest.indexOf(" ", startpos);      
   } else if(doublefnuttpos > -1 && (doublefnuttpos < singlefnuttpos || singlefnuttpos == -1) && (doublefnuttpos < spacepos || spacepos == -1)) {
    endpos = rest.indexOf('"', rest.indexOf('"', startpos) + 1);
   } else if(singlefnuttpos > -1 && (singlefnuttpos < doublefnuttpos || doublefnuttpos == -1) && (singlefnuttpos < spacepos || spacepos == -1)) {
    endpos = rest.indexOf("'", rest.indexOf("'", startpos) + 1);
   }
   if(!endpos || endpos == -1 || endpos < startpos) {endpos = rest.length;}
   done += rest.substring(0, startpos);
   done += attributeValueMode(rest.substring(startpos, endpos + 1));
   rest = rest.substr(endpos + 1);
  }
  return "<span style=color:" + attributecolor + ">" + done + rest + "</span>";
 }
 function attributeValueMode(txt) {
  return "<span style=color:" + attributevaluecolor + ">" + txt + "</span>";
 }
 function commentMode(txt) {
  return "<span style=color:" + commentcolor + ">" + txt + "</span>";
 }
 function cssMode(txt) {
  var rest = txt, done = "", s, e, comment, i, midz, c, cc;
  comment = new extract(rest, /\/\*/, "*/", commentMode, "W3CSSCOMMENTPOS");
  rest = comment.rest;
  while(rest.search("{") > -1) {
   s = rest.search("{");
   midz = rest.substr(s + 1);
   cc = 1;
   c = 0;
   for(i = 0; i < midz.length; i++) {
    if(midz.substr(i, 1) == "{") {cc++; c++;}
    if(midz.substr(i, 1) == "}") {cc--;}
    if(cc == 0) {break;}
   }
   if(cc != 0) {c = 0;}
   e = s;
   for(i = 0; i <= c; i++) {
    e = rest.indexOf("}", e + 1);
   }
   if(e == -1) {e = rest.length;}
   done += rest.substring(0, s + 1);
   done += cssPropertyMode(rest.substring(s + 1, e));
   rest = rest.substr(e);
  }
  rest = done + rest;
  rest = rest.replace(/{/g, "<span style=color:" + cssdelimitercolor + ">{</span>");
  rest = rest.replace(/}/g, "<span style=color:" + cssdelimitercolor + ">}</span>");
  for(i = 0; i < comment.arr.length; i++) {
   rest = rest.replace("W3CSSCOMMENTPOS", comment.arr[i]);
  }
  return "<span style=color:" + cssselectorcolor + ">" + rest + "</span>";
 }
 function cssPropertyMode(txt) {
  var rest = txt, done = "", s, e, n, loop;
  if(rest.indexOf("{") > -1 ) {return cssMode(rest);}
  while(rest.search(":") > -1) {
   s = rest.search(":");
   loop = true;
   n = s;
   while(loop == true) {
    loop = false;
    e = rest.indexOf(";", n);
    if(rest.substring(e - 5, e + 1) == "&nbsp;") {
     loop = true;
     n = e + 1;
    }
   }
   if(e == -1) {e = rest.length;}
   done += rest.substring(0, s);
   done += cssPropertyValueMode(rest.substring(s, e + 1));
   rest = rest.substr(e + 1);
  }
  return "<span style=color:" + csspropertycolor + ">" + done + rest + "</span>";
 }
 function cssPropertyValueMode(txt) {
  var rest = txt, done = "", s;
  rest = "<span style=color:" + cssdelimitercolor + ">:</span>" + rest.substring(1);
  while(rest.search(/!important/i) > -1) {
   s = rest.search(/!important/i);
   done += rest.substring(0, s);
   done += cssImportantMode(rest.substring(s, s + 10));
   rest = rest.substr(s + 10);
  }
  result = done + rest;    
  if(result.substr(result.length - 1, 1) == ";" && result.substr(result.length - 6, 6) != "&nbsp;" && result.substr(result.length - 4, 4) != "&lt;" && result.substr(result.length - 4, 4) != "&gt;" && result.substr(result.length - 5, 5) != "&amp;") {
   result = result.substring(0, result.length - 1) + "<span style=color:" + cssdelimitercolor + ">;</span>";
  }
  return "<span style=color:" + csspropertyvaluecolor + ">" + result + "</span>";
 }
 function cssImportantMode(txt) {
  return "<span style=color:" + cssimportantcolor + ";font-weight:bold;>" + txt + "</span>";
 }
 function jsMode(txt) {
  var rest = txt, done = "", esc = [], i, cc, tt = "", sfnuttpos, dfnuttpos, compos, comlinepos, keywordpos, numpos, mypos, dotpos, y;
  for(i = 0; i < rest.length; i++){
   cc = rest.substr(i, 1);
   if(cc == "\\") {
    esc.push(rest.substr(i, 2));
    cc = "W3JSESCAPE";
    i++;
   }
   tt += cc;
  }
  rest = tt;
  y = 1;
  while(y == 1) {
   sfnuttpos = getPos(rest, "'", "'", jsStringMode);
   dfnuttpos = getPos(rest, '"', '"', jsStringMode);
   compos = getPos(rest, /\/\*/, "*/", commentMode);
   comlinepos = getPos(rest, /\/\//, "<br>", commentMode);      
   numpos = getNumPos(rest, jsNumberMode);
   keywordpos = getKeywordPos("js", rest, jsKeywordMode);
   dotpos = getDotPos(rest, jsPropertyMode);
   if(Math.max(numpos[0], sfnuttpos[0], dfnuttpos[0], compos[0], comlinepos[0], keywordpos[0], dotpos[0]) == -1) {break;}
   mypos = getMinPos(numpos, sfnuttpos, dfnuttpos, compos, comlinepos, keywordpos, dotpos);
   if(mypos[0] == -1) {break;}
   if(mypos[0] > -1) {
    done += rest.substring(0, mypos[0]);
    done += mypos[2](rest.substring(mypos[0], mypos[1]));
    rest = rest.substr(mypos[1]);
   }
  }
  rest = done + rest;
  for(i = 0; i < esc.length; i++) {
   rest = rest.replace("W3JSESCAPE", esc[i]);
  }
  return "<span style=color:" + jscolor + ">" + rest + "</span>";
 }
 function jsStringMode(txt) {
  return "<span style=color:" + jsstringcolor + ">" + txt + "</span>";
 }
 function jsKeywordMode(txt) {
  return "<span style=color:" + jskeywordcolor + ">" + txt + "</span>";
 }
 function jsNumberMode(txt) {
  return "<span style=color:" + jsnumbercolor + ">" + txt + "</span>";
 }
 function jsPropertyMode(txt) {
  return "<span style=color:" + jspropertycolor + ">" + txt + "</span>";
 }
 function getDotPos(txt, func) {
  var x, i, j, s, e, arr = [".","<", " ", ";", "(", "+", ")", "[", "]", ",", "&", ":", "{", "}", "/" ,"-", "*", "|", "%"];
  s = txt.indexOf(".");
  if(s > -1) {
   x = txt.substr(s + 1);
   for(j = 0; j < x.length; j++) {
    cc = x[j];
    for(i = 0; i < arr.length; i++) {
     if(cc.indexOf(arr[i]) > -1) {
      e = j;
      return [s + 1, e + s + 1, func];
     }
    }
   }
  }
  return [-1, -1, func];
 }
 function getMinPos() {
  var i, arr = [];
  for(i = 0; i < arguments.length; i++) {
   if(arguments[i][0] > -1) {
    if(arr.length == 0 || arguments[i][0] < arr[0]) {arr = arguments[i];}
   }
  }
  if(arr.length == 0) {arr = arguments[i];}
  return arr;
 }
 function getKeywordPos(typ, txt, func) {
  var words, i, pos, rpos = -1, rpos2 = -1, patt;
  if(typ == "js") {
   words = ["abstract","arguments","boolean","break","byte","case","catch","char","class","const","continue","debugger","default","delete","do","double","else","enum","eval","export","extends","false","final","finally","float","for","function","goto","if","implements","import","in","instanceof","int","interface","let","long","NaN","native","new","null","package","private","protected","public","return","short","static","super","switch","synchronized","this","throw","throws","transient","true","try","typeof","var","void","volatile","while","with","yield"];
  }
  for(i = 0; i < words.length; i++) {
   pos = txt.indexOf(words[i]);
   if(pos > -1) {
    patt = /\W/g;
    if(txt.substr(pos + words[i].length,1).match(patt) && txt.substr(pos - 1,1).match(patt)) {
     if(pos > -1 && (rpos == -1 || pos < rpos)) {
      rpos = pos;
      rpos2 = rpos + words[i].length;
     }
    }
   } 
  }
  return [rpos, rpos2, func];
 }
 function getPos(txt, start, end, func) {
  var s, e;
  s = txt.search(start);
  e = txt.indexOf(end, s + (end.length));
  if(e == -1) {e = txt.length;}
  return [s, e + (end.length), func];
 }
 function getNumPos(txt, func) {
  var arr = ["<br>", " ", ";", "(", "+", ")", "[", "]", ",", "&", ":", "{", "}", "/" ,"-", "*", "|", "%", "="], i, j, c, startpos = 0, endpos, word;
  for(i = 0; i < txt.length; i++) {
   for(j = 0; j < arr.length; j++) {
    c = txt.substr(i, arr[j].length);
    if(c == arr[j]) {
     if(c == "-" && (txt.substr(i - 1, 1) == "e" || txt.substr(i - 1, 1) == "E")) {
      continue;
     }
     endpos = i;
     if(startpos < endpos) {
      word = txt.substring(startpos, endpos);
      if(!isNaN(word)) {return [startpos, endpos, func];}
     }
     i += arr[j].length;
     startpos = i;
     i -= 1;
     break;
    }
   }
  }  
  return [-1, -1, func];
 }
 
 function plainMode(txt) {
 	return "<span style=color:" + plaintextcolor + ">" + txt + "</span>";
 }
}

const nodeListHtml = document.querySelectorAll(".hlme-html");
const nodeListHtmlDark = document.querySelectorAll(".hlme-html-dark");
const nodeListXml = document.querySelectorAll(".hlme-xml");
const nodeListXmlDark = document.querySelectorAll(".hlme-xml-dark");
const nodeListCss = document.querySelectorAll(".hlme-css");
const nodeListCssDark = document.querySelectorAll(".hlme-css-dark");
const nodeListJs = document.querySelectorAll(".hlme-js");
const nodeListJsDark = document.querySelectorAll(".hlme-js-dark");
const nodeListPlainText = document.querySelectorAll(".hlme-plaintext");
const nodeListPlainTextDark = document.querySelectorAll(".hlme-plaintext-dark");
const nodeListNoHighlight = document.querySelectorAll(".hlme-nohighlight");
const nodeListNoHighlightDark = document.querySelectorAll(".hlme-nohighlight-dark");

for(let i = 0; i < nodeListHtml.length; i++){
	highlightme(nodeListHtml[i], "html");
	nodeListHtml[i].style.marginBottom = "10px";
}
for(let i = 0; i < nodeListHtmlDark.length; i++){
	highlightme(nodeListHtmlDark[i], "html", "dark");
	nodeListHtmlDark[i].style.marginBottom = "10px";
}
for(let i = 0; i < nodeListXml.length; i++){
	highlightme(nodeListXml[i], "xml");
	nodeListXml[i].style.marginBottom = "10px";
}
for(let i = 0; i < nodeListXmlDark.length; i++){
 highlightme(nodeListXmlDark[i], "xml", "dark");
	nodeListXmlDark[i].style.marginBottom = "10px";
}
for(let i = 0; i < nodeListCss.length; i++){
	highlightme(nodeListCss[i], "css");
	nodeListCss[i].style.marginBottom = "10px";
}
for(let i = 0; i < nodeListCssDark.length; i++){
	highlightme(nodeListCssDark[i], "css", "dark");
	nodeListCssDark[i].style.marginBottom = "10px";
}
for(let i = 0; i < nodeListJs.length; i++){
	highlightme(nodeListJs[i], "js");
	nodeListJs[i].style.marginBottom = "10px";
}
for(let i = 0; i < nodeListJsDark.length; i++){
 highlightme(nodeListJsDark[i], "js", "dark");
 nodeListJsDark[i].style.marginBottom = "10px"; 
}
for(let i = 0; i < nodeListPlainText.length; i++){
	highlightme(nodeListPlainText[i], "plaintext");
	nodeListPlainText[i].style.marginBottom = "10px";
}
for(let i = 0; i < nodeListPlainTextDark.length; i++){
	highlightme(nodeListPlainTextDark[i], "plaintext", "dark");
	nodeListPlainTextDark[i].style.marginBottom = "10px";
}
for(let i = 0; i < nodeListNoHighlight.length; i++){
	highlightme(nodeListNoHighlight[i], "nohighlight");
	nodeListNoHighlight[i].style.marginBottom = "10px";
}
for(let i = 0; i < nodeListNoHighlightDark.length; i++){
	highlightme(nodeListNoHighlightDark[i], "nohighlight", "dark");
	nodeListNoHighlightDark[i].style.marginBottom = "10px";
}