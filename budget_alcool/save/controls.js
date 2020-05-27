// Copyright infocosme
// Module "Fonction formulaire"
// Développer par infocosme pour infocosme
// Version 11-09-2009

function hexaoctet(val)
 {
	var tc=new Array('0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F');
	var v=parseInt(val);
	return tc[parseInt(v / 16)]+tc[v%16];
 }

function strcode(val)
{
	var lg=val.lenght;
	var ret='';
	for (var i=0; i<val.length; i++)
	{
		var c=val.charAt(i);
		if((c>='0' && c<='9') || (c>='a' && c<='z') || (c>='A' && c<='Z'))
		{
			ret=ret+c;
		}
		else
		{
			conv=escape(c);
			if(conv!=c)
				ret=ret+conv; // deja encodé
			else
			  ret=ret+'%'+hexaoctet(val.charCodeAt(i));
		}
	}
	return ret;
}

function	SetCheckboxList(obj,val)
	{
	var lst=obj.getElementsByTagName("input")
	var last = lst.length;
	
	for(i=0;i<last;i++)
		if(lst[i].type=="checkbox")
			lst[i].checked=val;
}

function DoProc(form,proc,url,urltarget)
{
 	if(proc!=undefined)
   	form.proc.value = proc;
 	if(url!=undefined)
    form.action = url;
 	if(urltarget!=undefined)
    form.target = urltarget;
	 form.submit();
}

function DoProcIfConfirm(form,proc,message,url,urltarget)
{
  if(message=="")
    message="Confirmez-vous?";
 	if(confirm(message))
  {
   	if(proc!=undefined)
     	form.proc.value = proc;
   	if(url!=undefined)
     form.action = url;
   	if(urltarget!=undefined)
      form.target = urltarget;
  	 form.submit();
  }
}

function DoProcIfVerifie(form,proc,actionScript,url,urltarget)
{
	var	errStr="";
// attention le code actionScript contient les variables locales 'form' et 'errStr'
//	alert(actionScript);
	eval(actionScript);

	if (errStr=="")
	{
 	if(proc!=undefined)
   	form.proc.value = proc;
 	if(url!=undefined)
   	form.action = url;
 	if(urltarget!=undefined)
   	form.target = urltarget;
  form.submit();
	}
 else
		alert("Impossible d'enregistrer votre demande :\n"+errStr);
}

function Valid(elem)
{
	/*var classExist = elem.getAttribute('class').replace('InputInvalid', '');
	elem.setAttribute('class', classExist); */
	elem.style.borderColor = '';
	elem.style.backgroundColor = 'white';
}

function Invalid(elem)
{
/* 	var classExist = elem.getAttribute('class').replace('InputInvalid', '');
	elem.setAttribute('class', 'InputInvalid '+classExist);
 */	elem.style.borderColor = 'red';
	elem.style.backgroundColor = '#FFE0E0';
}

function ChkUrl(obj, oblig)
{
	var ret = true;
	var d = obj.value;
  var exp = /^(http|https)+[\:\/\/]+[a-z0-9]+([a-z\d_\-\/]+)*\.+[a-z\d_\-\/]/;

  if ( d != '' )
	{
		if ( !exp.test(d) )
		{
			ret = false;
		}
	}
	else if ( oblig == true )
		ret = false;

	if ( ret )
		Valid(obj);
	else
  	Invalid(obj);

	return ret;
}

function ChkTel(obj, oblig)
{
	var ret = true;
	var d = obj.value;

	if (d == '')
	{
		if ( oblig == true )
			ret = false;
	}
	else
	{
		for (i=0;i<d.length;i++)
		{
			var c=d.charAt(i);
			if (c != '.' && c != '+' && c!='-' && c!='/' && c!='(' && c!=')' && isNaN(c))
				ret = false;
		}
	}

	if ( ret )
		Valid(obj);
	else
		Invalid(obj);

	return ret;
}

/*function ChkTel(obj, mini)
{
	var ret = true;
	var d = obj.value;
	var exp = /^\d{10}$/;
	var n = "";
	var j = 0;

 if (d == '')
	{
  if( mini > 0 )
  		ret = false;
	}
	else
	{
		for (i=0;i<d.length;i++)
		{
		 var c=d.charAt(i);
			if (c!=' ' && c!='.' && c!='-' && c!='+' && c!='/' && c!='(' && c!=')' )
     n = n + c;
		}
	 d=n;

		if (!exp.test(d))
			ret = false;
		else
			obj.value = d;
	}

	if ( ret )
		Valid(obj);
	else
		Invalid(obj);

	return ret;
}
*/
function ChkTime(obj,oblig)
{
 var d = obj.value;
 d=d.replace(/^ */,"");  //ltrim
 d=d.replace(/ *$/,"");  //rtrim

	if (d.length<oblig)
 {
 	 Invalid(obj);
	 	return false;
 }
	if (d.length==0)
 {
 	 Valid(obj);
	 	return true;
 }

 d = d.replace(/[\-\+\.]/g,":");
	var t = (d+":0:0").split(":");

 if(t[0].length==0) t[0]="0";
 if(t[1].length==0) t[1]="0";
 if(t[2].length==0) t[2]="0";

	if (isNaN(t[0])||isNaN(t[1])||isNaN(t[2]))
 {
 	 Invalid(obj);
	 	return false;
 }

 hh=parseInt(t[0]+".0"); // ".0"+ force la base 10
 mm=parseInt(t[1]+".0");
 ss=parseInt(t[2]+".0");
 if(hh<0 || hh>23 || mm<0 || mm>59 || ss<0 || ss>59)
 {
 	 Invalid(obj);
	 	return false;
 }

 hh=(hh<10?"0"+hh:hh);
 mm=(mm<10?"0"+mm:mm);
 ss=(ss<10?"0"+ss:ss);
	obj.value=hh + ":" + mm + ":" + ss;

	Valid(obj);
	return true;
}

function ChkDate(obj,oblig)
{
  var d = obj.value;
  var sep = new Array("/","-"," ",".");
	var today = new Date();

	if ( d.length == 0 )
	{
		if ( oblig == true )
		{
			Invalid(obj);
			return false;
		}
		else
		{
			Valid(obj);
			return true;
		}
	}

	for ( i=0; i<sep.length;i++)
	{
		t = d.split(sep[i]);
		if ( t.length > 1 )
			i = sep.length;
	}

	if ( t.length == 1 ) // Pas de /
	{
		j=parseInt(d.substr(0,2),10)
		m=parseInt(d.substr(2,2),10)
		a=parseInt(d.substring(4),10)
	}
	else
	{
		j = parseInt(t[0],10);
		m = parseInt(t[1],10);
		a = parseInt(t[2],10);
	}

	if ( isNaN(m) )
		m = today.getMonth()+1;
	if ( isNaN(a) )
		a = today.getYear();
	if ( a <= 50 )
		a = a + 2000;
	else if ( a <= 1000 )
		a = a + 1900;

	var ladate = new Date(a,m-1,j)
	var annee = ladate.getYear()

	if ( annee < 1000 )
		annee = annee + 1900;

	if ( ladate.getDate() == j && ladate.getMonth() == m-1 && annee == a )
  {
		var	jz = "";
		var	mz = "";

		if ( j < 10 )
			jz = "0";
		if ( m < 10 )
			mz = "0";
		obj.value = jz + j + "/" + mz + m + "/" + a;
		Valid(obj);
		return true;
	}
	else
	{
		Invalid(obj);
		return false;
	}
}

function ChkHeure(obj,oblig){
	var time = obj.value;
	var sep = new Array("/","-"," ",".",":");
	
	if ( time.length == 0 ){
		if ( oblig == true ){
			Invalid(obj);
			return false;
		}else{
			Valid(obj);
			return true;
		}
	}
	
	for ( i=0; i<sep.length;i++){
		t = time.split(sep[i]);
		if ( t.length > 1 )
			i = sep.length;
	}
	
	h = parseInt(t[0],10);
	m = parseInt(t[1],10);

	if (isNaN(h)){
		Invalid(obj);
		return false;
	}else if(isNaN(m)){
		m = 0;
	}

	if(h<0 || h>23 || m<0 || m>59){
		Invalid(obj);
		return false;
	}

	h=(h<10?"0"+h:h);
	m=(m<10?"0"+m:m);
	obj.value=h+":"+m;

	Valid(obj);
	return true;

}

function ChkNum(obj,mini,maxi)
{
	var ret = true;
	var d = obj.value;

  if (d.length < mini || d.length > maxi)
    ret = false;

  if (isNaN(d))
    ret = false;

	if ( ret )
		Valid(obj);
	else
		Invalid(obj);

	return ret;
}

function ChkRadio(inputname,obligatoire)
{
	var ret = false;
 	var lstobj=document.getElementsByName(inputname);

	if(obligatoire==undefined || obligatoire==0)
  	var ret = true;
	else
  {
    for(var i=0; i<lstobj.length;i++)
      if(lstobj[i].checked==true)
				ret = true;
  }

	if(ret)
    for(var i=0; i<lstobj.length;i++)
  		Valid(lstobj[i]);
  else
    for(var i=0; i<lstobj.length;i++)
  		Invalid(lstobj[i]);

	return ret;
}

function ChkImgDim(obj)
{
  var d = obj.value;
	exp = /^\d+x\d+$/;

	if ( d != '' )
	if ( !exp.test(d) )
	{
		alert("Format accepté : longxhaut !");
		obj.focus();
		obj.select();
	}
}

function ChkImgUrl(obj)
{
	var d = obj.value;

	if ( d != '' )
	{
		if ( ChkUrl(obj) )
		{
			var nb = d.length;
			var s = d.substring(nb-4,nb);
			s = s.toLowerCase();

			if (s != '.gif'
      &&  s != '.jpg'
      &&  s != '.bmp'
      &&  s != '.png' )
			{
				alert("L'URL incorrecte !\nL'URL ne pointe pas sur une image au format reconnu : .gif .jpg .bmp .png");
				obj.focus();
				obj.select();
			}
		}
  }
}

function ChkLength(obj,mini,maxi)
{
	var ret = true;
	var d = obj.value;

	if ( d.length < mini || d.length > maxi)
		ret = false;

	if ( ret )
		Valid(obj);
	else
		Invalid(obj);

	return ret;
}

function ChkFileExist(objold,objnew,mini)
{
	var ret = true;
	var o;
	var n = objnew.value;
  if(objold==undefined)
    o="";
	else
	  o = objold.value;

	if (n.length < mini && o.length < mini)
		ret = false;

	if (ret)
		Valid(objnew);
	else
		Invalid(objnew);

	return ret;
}

function ChkMail(obj, oblig)
{
	var ret = true;
	var d = obj.value.toLowerCase();
	var exp = /^[a-z\d_\-]+(\.[a-z\d_\-]+)*@[a-z\d\-]+(\.[a-z\d_\-]+)+$/;

	if ( d != '' )
	{
		if ( !exp.test(d) )
			ret = false;
	}
	else if ( oblig == true )
		ret = false;

	if ( ret )
		Valid(obj);
	else
		Invalid(obj);

	return ret;
}

/*
 * chkPercent
 * Summary. Check if object value is a percentage.
 * Description. Verify if is require or not, and the value like 000.00 (, accepted).
 *
 * @param {object}	obj 				Object jQuery ou objet DOM.
 * @param {bool} 	[required=false] 	Champ obligatoire ?
 *
 * @return {bool}	If is valid return true else return false.
*/
function chkPercent(obj, required)
{
	let objValue, returnValue;
	// Valeurs par défaut
	if (required === undefined)
		required = false;

	// Gestion de jQuery
	if (obj.value === undefined)
	{
		objValue = obj.val();
		obj = obj[0];
	}
	else
		objValue = obj.value;

	// Normalisation (,=>.)
	objValue = objValue.replace(",",".");

	if (objValue === "")
		returnValue = !required;
	else
	{	
		let regexTypePercent = /^(\d{1,3})\.?(\d{0,2})$$/;
		returnValue = regexTypePercent.test(objValue);
	}

	if (returnValue)
	{
		Valid(obj);
		return true;
	}
	else
	{
		Invalid(obj);
		return false;
	}
}

function ChkFloat(obj,oblig,maxi,dec)
{
  var d = obj.value;
  var ret = true;

  if(oblig==undefined)
    oblig=false;// non obligatoire par defaut
  if(maxi==undefined)
    maxi=30;// nombre de chiffres significatifs maxi
  if(dec==undefined)
    dec=2;// nombre de chiffres apres la virgule maxi

  if(d.match(/-/))
    signe="-";// signe negatif 
  else
    signe="";
    
  d = d.replace(",","."); // norme = point
  d = d.replace(/[\+\- ]/g,""); // le signe et le point ne compte pas dans la longueur
  var tab = (d + ".").split(".");

  if ( oblig && d.length == 0 )
		ret = false;
  else if ((tab[0].length + tab[1].length) > maxi || tab[1].length > dec )
    ret = false;
  else if ( isNaN(tab[0]) || isNaN(tab[1]) )
    ret = false;

	if (ret)
		Valid(obj);
	else
		Invalid(obj);

  obj.value=signe + d;
  
  // alert(obj.value + " , " + d + " , " + mini + " , " + maxi + " , " + dec);
  return ret;
}

function ChkFormatNum(obj,obligatoire,format) 
{
  var v = obj.value;
  var f = format;
  var signe=false;
  if(f.match(/-/))
    signe=true;
  else
    signe=false;
  v=v.replace(/,/g,".");
  v=v.replace(/[^\d\.\-]/g,"");
  f=f.replace(/,/g,".");
  f=f.replace(/[^9\.]/g,"");
  tf=f.split(".");

  if(v.length==0 && obligatoire==0)
    ret=true;
  else if(v.length==0 && obligatoire==1)
    ret=false;
  else if(tf.length==1 || tf.length==2)
    if(signe)
      if(v>-Math.pow(10,tf[0].length) && v<Math.pow(10,tf[0].length))
        ret=true;
      else
        ret=false;
    else
      if(v>=0 && v<Math.pow(10,tf[0].length))
        ret=true;
      else
        ret=false;
  else
    ret=false;

	if (ret)
		Valid(obj);
	else
		Invalid(obj);

  obj.value=v;
  return ret;
}

// Fonction affichage *********************************

function ReplaceClass(el,oldclass,newclass)
{
  var cl=" "+el.className+" ";
  var rg= new RegExp(" "+oldclass+" ", "gi");
  if(cl.match(rg))
    cl=cl.replace(rg," ");// supprime la classe
  var rg= new RegExp(" "+newclass+" ", "gi");
  if(!cl.match(rg))
    cl=cl+" "+newclass;// ajoute la classe
  el.className=cl;
}

var OpenCloseTableau = new Array();
function OpenClose(id,noclose)
{
  var	el = document.getElementById(id);
  var list=id.split(":");
  
  if(list.length>1)
    group=list[0];
  else
    group="";

  if (el.className.match(/\bclose\b/gi))
  {
    ReplaceClass(el,"close","open");
    if(group.length>0)
    {
      if(OpenCloseTableau[group]!=id)
      { 
        if(OpenCloseTableau[group]!=undefined)
        {
          var	elold = document.getElementById(OpenCloseTableau[group]);
          ReplaceClass(elold,"open","close");
        }
        OpenCloseTableau[group]=id;
      }
    }
  }
  else
    if (noclose==undefined)
      ReplaceClass(el,"open","close");
}

function InitOpenClose(listtags)
{
  // utilise le 'Id' pour connaitre le nom du group id = 'groupid:labelid'
  var tags=listtags.split(",");
  for (var t=0; t<tags.length; t++)
  {
    var tag = tags[t];
    var lstobj=document.getElementsByTagName(tag);
    for(var i=0;i<lstobj.length;i++)
      if (lstobj[i].className.match(/\bopen\b/gi))
      {
        var idname=lstobj[i].id;
        var list=idname.split(":");
        
        if(list.length>1)
          group=list[0];
        else
          group="";

        if(group.length>0)
          OpenCloseTableau[group]=idname; // memorise le dernier ouvert dans le groupe
      } 
  }
}

function InitPage() // fonction generique d'initialisation de page. vous pouvez inclure toute procedure init de page generique
{
  InitOpenClose('DL');
}

// affichage help

function HideHelp(obj)
{
	document.getElementById("Aide").style.display = 'none';
	document.getElementById("Aide").style.visibility = 'hidden';
}

function DoHelp(obj,maxVal)
{
	 var	el = document.getElementById("Aide");
	 var	tmp = obj;
	 var	x = 0;
	 var	y = 0;
	 var	msg;

	 if ( el )
  {
  		while ( tmp.position='undefined'  && tmp.offsetParent )
  		{
  			tmp = tmp.offsetParent;
  				x += tmp.offsetLeft;
  				y += tmp.offsetTop;
    }
	  	el.style.position='absolute';
 	  el.style.top=y + obj.offsetTop + 'px';
 	  el.style.left=x + obj.offsetWidth + obj.offsetLeft + 'px';
 	  if ( x + obj.offsetLeft + obj.offsetWidth + 100 >= document.width )
   	{
      el.style.left = x + obj.offsetLeft;
      el.style.top = y + obj.offsetTop + obj.offsetHeight;
    }

    msg = obj.title;
    if ( maxVal && maxVal>0 )
    {
	  	  var nb = maxVal - CountChar(obj,maxVal);
      var txt = '<br>' + maxVal + ' car. maxi.';
      var txt2= ', reste ' + nb;

      if ( nb < 0 )
      		nb = 0;
      if ( nb != maxVal )
       	msg = txt + txt2;
      else
       	msg = txt;

      msg = obj.title + msg;
    }

    if ( msg != '' )
    {
		    if ( nb == 0 )
		    	msg = '<img src="/img/attention.gif"> ' + msg;
		    else
		    	msg = '<img src="/img/information.gif"> ' + msg;

		    el.innerHTML = msg;
		    if ( el.style.visibility != 'visible' )
		    {
		     	el.style.display = 'block';
			     el.style.visibility = 'visible';
		    }
    }
  }
}


// ancienne fonctions ****************


function ShowOrHideDiv(div)
{
  var	el = document.getElementById(div);

	if(el.className != 'hidden')
		el.className = 'hidden';
  else
		el.className = 'visible';
}

function ShowOrHide(obj,div)
{
	if ( obj.id == 'imgPlus' )
	{
		obj.src = '/images/iconeVisible1.gif';
		document.getElementById(div).className = 'visible';
		obj.id = 'imgMoins';
	}
	else
	{
		obj.src = '/images/iconeHidden1.gif';
		document.getElementById(div).className = 'hidden';
		obj.id = 'imgPlus';
	}
}

function Hide(obj,div)
{
	if ( obj.id == 'imgPlus' )
	{
		obj.src = '/images/iconeVisible1.gif';
		document.getElementById(div).className = 'visible';
		obj.id = 'imgMoins';
	}
}

function ToggleDiv(obj,inOut)
{
  var d = obj.src;
	var res = null;
	var i = d.lastIndexOf("/");
	var str = d.substring(i);
	var reg1 = new RegExp("1", "i");
	var reg0 = new RegExp("0", "i");
	if ( reg0.test(str) && inOut == 1 )
		res = str.replace(reg0, "1");
	else if ( reg1.test(str) && inOut == 0 )
		res = str.replace(reg1, "0");
	if ( res != null )
		obj.src =  d.substring(0,i) + res;
}

function ShowDivNear(obj,div)
{
	var	el = document.getElementById(div);
	var	tmp = obj;
	var x = 0;
	var y = 0;

	if ( el )
  {
		while ( tmp.offsetParent )
	  {
			tmp = tmp.offsetParent;
			x += tmp.offsetLeft;
			y += tmp.offsetTop;
		}
		el.style.top=y + obj.offsetTop;
		el.style.left=x + obj.offsetWidth + obj.offsetLeft;
		el.style.display = 'block';
		el.style.visibility = 'visible';
	}
}

function ShowDivInstead(obj,div) // Superpose la div à l'objet selectionné
{
	var	el = document.getElementById(div);
	var	tmp = obj;
	var x = 0;
	var y = 0;
if ( el )
  {
		while ( tmp.offsetParent )
	  {
			tmp = tmp.offsetParent;
			x += tmp.offsetLeft;
			y += tmp.offsetTop;
		}
		el.style.top = y + obj.offsetTop + 10 +'px';
		el.style.left = x + obj.offsetLeft + 10 +'px';
		el.style.width = obj.offsetWidth - 20 +'px';
		el.style.height =  obj.offsetHeight - 20 +'px';
		el.style.display = 'block';
		el.style.visibility = 'visible';
	}
}


//***********

function HideDiv(div)
{
	document.getElementById(div).style.display = 'none';
	document.getElementById(div).style.visibility = 'hidden';
}


function ShowDiv(div)
{
	document.getElementById(div).style.display = 'block';
	document.getElementById(div).style.visibility = 'visible';
}

function FocusChamp(chp,chpMax,affmsg,aideimg)
{
	var	clearImg = false;

	if ( chpMax )
  	AffCountChar(chp,chpMax,affmsg,aideimg);
	else if ( affmsg )
	{
		affmsg.value = '';
		clearImg = true;
	}
	if ( !clearImg )
	{
		if ( aideimg )
  		aideimg.src = '/image/information.gif';
	}
	else if ( aideimg )
		aideimg.src = '/image/1pix.gif';
}

function ZoomImage(obj,w,h)
{
	var	el = document.getElementById("ZoomImgDiv");
	var	img = document.getElementById("ZoomImg");
	var	tmp = obj;
	var x = 0;
	var y = 0;

	if ( el )
  {
		img.src = obj.src;
		img.height = h;
		img.width = w;

		while ( tmp.offsetParent )
		{
			tmp = tmp.offsetParent;
			x += tmp.offsetLeft;
			y += tmp.offsetTop;
		}
		el.style.top=y + obj.offsetTop + 1 - obj.offsetHeight/2; /* obj.offsetHeight +  */
		if ( x > 300 )
			el.style.left=x + obj.offsetLeft - obj.offsetWidth;
		else
			el.style.left=x + obj.offsetLeft;
	}

	el.style.display = 'block';
	el.style.visibility = 'visible';
}

function HideZoomImage()
{
	var	el = document.getElementById("ZoomImgDiv");

	el.style.display = 'none';
	el.style.visibility = 'hidden';
}

function CountChar(f,maxi)
{
	var txt = f.value;
  var nb = txt.length;

  if (nb > maxi)
  {
    f.value=txt.substring(0,maxi);
    nb = maxi;
  }
  return nb;
}

function AffCountChar(chp,chpMax,affmsg,aideimg)
{
	if ( chpMax )
	{
		var maxi = chpMax.value;
		var nb = maxi - CountChar(chp,maxi);
		var txt = 'Ne pas dépasser ' + maxi + ' caractères';
		var txt2= ', reste ' + nb;

		if ( affmsg )
		{
			if ( nb < 0 )
				nb = 0;
			if ( nb != maxi )
				affmsg.value = txt + txt2;
  		else
				affmsg.value = txt;
		}
		if ( aideimg )
		{
			if ( nb == 0 )
	   		aideimg.src = '/img/attention.gif';
			else
		  	aideimg.src = '/img/information.gif';
		}
	}
}


function ShowHelp(obj)
{
  var	el = document.getElementById("Aide");
	var	tmp = obj;
	var x = 0;
	var y = 0;

	if ( el )
  {
		while ( tmp.offsetParent )
		{
			tmp = tmp.offsetParent;
			x += tmp.offsetLeft;
			y += tmp.offsetTop;
		}
		el.style.top=y + obj.offsetTop;
		el.style.left=x + obj.offsetWidth + obj.offsetLeft;

		if ( obj.title != '' )
    {
			el.innerHTML = obj.title;
			el.style.display = 'block';
			el.style.visibility = 'visible';
		}
	}
}

// fonctions de formulaire Ancienne version


function CheckInt(obj, nbcar, oblig)
{
	var ret = true;
	var d = obj.value;
	
	if ( nbcar )
		exp = new RegExp(["^\\d{"+nbcar+"}$"]);
	else
		exp = /^\d+$/;
	
	if ( d != '' )
		{
		if ( !exp.test(d) )
			{
			ret = false;
			}
		}
	else if ( oblig == true )
		ret = false;
	
	if ( ret )
		Valid(obj);
	else
		Invalid(obj);
	
	return ret;
}

function CheckDecimal(obj, oblig)
{
	var ret = true;
	var valeur = obj.value;
	if ( valeur != '' )
	{
		if(!isNaN(valeur) )
			ret = true;
		else
			ret= false;
	}	
	else if ( oblig == true )
		ret = false;
		
	if (ret)
		Valid(obj);
	else
		Invalid(obj);
	
	return ret;
}

function CheckLength(obj, nbcar, oblig)
{
	var ret = true;
	var d = obj.value;
	
	if( d !='' )
	{
		if ( d.length < nbcar )
			ret = false;
	} else if ( oblig == true )
		ret = false;
	
	if ( ret )
		Valid(obj);
	else
		Invalid(obj);
	
	return ret;
}

function CheckFloat(obj,oblig)
{
	var d = obj.value;
	var ret = true;
	
	if ( d.length == 0 )
		{
		if ( oblig == true )
			{
			ret = false;
			}
		else
			{
			ret = true;
			}
		}
	else if ( isNaN(d) )
		{
		r = new RegExp(" ","g");
		obj.value = d.replace(r,"");
		obj.value = obj.value.replace(",",".");
		
		ret = !isNaN(obj.value);
		}
	
	if ( ret )
		Valid(obj);
	else
		Invalid(obj);
	
	return ret;
}
function CheckNum(obj, nbcar, oblig)
{
	var ret = true;
	var d = obj.value;
	
	if ( nbcar )
		exp = new RegExp(["^\\d{"+nbcar+"}$"]);
	else
		exp = /^\d+$/;
	
	if ( d != '' )
		{
		if ( !exp.test(d) )
			{
			ret = false;
			}
		}
	else if ( oblig == true )
		ret = false;
	
	if ( ret )
		Valid(obj);
	else
		Invalid(obj);
	
	return ret;
}

	function TextMax(f,max)
		{
		var txt = f.value;
		var nb = txt.length;
		if (nb > max) { 
			alert(max+" caractères autorisés dans ce champ !");
			f.value=txt.substring(0,max);
			}
		}
