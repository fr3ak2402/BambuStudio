var LangText={
	"en": {
		"t1": "Welcome to GalaxySlicer neo",
		"t2": "GalaxySlicer neo will be setup in several steps. Let's start!",
		"t3": "User Agreement",
		"t4": "Disagree",
		"t5": "Agree",
		"t6": "We kindly request your help to improve everyone's printing.<br/>Come and Join our Customer Experience Improvement Program",
		"t7": "Join our Customer Experience Improvement Program",
		"t8": "Back",
		"t9": "Next",
		"t10": "Printer Selection",
		"t11": "All",
		"t12": "Clear all",
		"t13": "mm nozzle",
		"t14": "Filament Selection",
		"t15": "Printer",
		"t16": "Filament type",
		"t17": "Vendor",
		"t18": "error",
		"t19": "At least one filament must be selected.",
		"t20": "Do you want to use default filament ?",
		"t21": "yes",
		"t22": "no",
		"t23": "Release note",
		"t24": "Get Started",
		"t25": "Finish",
		"t26": "Login",
		"t27": "Register",
		"t28": "Models",
		"t29": "Mall",
		"t30": "Manual",
		"t31": "New Project",
		"t32": "Create new project",
		"t33": "Open Project",
		"t34": "hotspot",
		"t35": "Recently Opened",
		"t36": "ok",
		"t37": "At least one printer must be selected.",
		"t38": "Cancel",
		"t39": "Confirm",
		"t40": "Network disconnect, please check and try again later.",
		"t47": "Please select your login region",
		"t48": "Asia-Pacific",
		"t49": "Chinese Mainland",
		"t50": "Log out",
		"t52": "Skip",
		"t53": "Join",
		"t54": "In the 3D Printing community, we learn from each other's successes and failures to adjust our own slicing parameters and settings. GalaxySlicer neo follows the same principle and uses machine learning to improve its performance from the successes and failures of the vast number of prints by our users. We are training GalaxySlicer neo to be smarter by feeding them the real-world data. If you are willing, this service will access information from your error logs and usage logs, which may include information described in ",
		"t55": "Privacy Policy",
		"t56": ". We will not collect any Personal Data by which an individual can be identified directly or indirectly, including without limitation names, addresses, payment information, or phone numbers. By enabling this service, you agree to these terms and the statement about Privacy Policy.",
		"t57": "",
		"t58": "",
		"t59": ".",
		"t60": "Europe",
		"t61": "North America",
		"t62": "Others",
		"t63": "After changing the region, your account will be logged out. Please log in again later.",
		"t64": "Bambu Network plug-in",
		"t65": "Sending print job via WLAN",
		"t66": "Full remote control",
		"t67": "Liveview streaming",
		"t68": "User data synchronization",
		"t69": "Install Bambu Network plug-in",
		"t70": "",
		"t71": "Downloading",
		"t72": "Downloading failed",
		"t73": "Installation successful.",
		"t74": "Restart",
		"t75": "Bambu Network plug-in provides the following features:",
		"t76": "Bambu Network plug-in not detected. Click ",
		"t77": "here",
		"t78": " to install it.",
		"t79": "Failed to install plug-in. ",
		"t80": "Try the following steps:",
		"t81": "1, Click ",
		"t82": " to open the plug-in directory",
		"t83": "2, Close all open GalaxySlicer neo",
		"t84": "3, Delete all files under the plug-in directory",
		"t85": "4, Reopen GalaxySlicer neo and install the plug-in again",
		"t86": "Close",
		"t87": "User Manual",
		"t88": "Remove",
		"t89": "Open Containing Folder",
		"t90": "3D Model",
		"t91": "Download 3D models",
		"t92": "Create by",
		"t93": "Remixed by",
		"t94": "Shared by",
		"t95": "Model Information",
		"t96": "Accessories",
		"t97": "Profile Information",
		"t98": "Model name",
		"t100": "Model description",
		"t101": "BOM",
		"t102": "Assembly Guide",
		"t103": "Other",
		"t104": "Profile name",
		"t105": "Profile Author",
		"t106": "Profile description",
		"t107": "Online Models",
		"t108": "MORE",
		"t109": "System Filaments",
		"t110": "Custom Filaments",
		"t111": "Create New",
		"t112": "Join the Program",
		"t113": "You may change your choice in preference anytime.",
		"t114": "Home",
		"t115": "Batch",
		"t116": "Retry",
		"t117": "Print History",
		"t118": "Printing",
		"t119": "Success",
		"t120": "Canceled",
		"t121": "Search",
		"t122": "Search online models",
		"t123": "Plate",
		"t124": ""
	}
};

var LANG_COOKIE_NAME="BambuWebLang";
var LANG_COOKIE_EXPIRESECOND= 365*86400;

function TranslatePage()
{
	let strLang=GetQueryString("lang");
	if(strLang!=null)
	{
		//setCookie(LANG_COOKIE_NAME,strLang,LANG_COOKIE_EXPIRESECOND,'/');
		localStorage.setItem(LANG_COOKIE_NAME,strLang);
	}
	else
	{
		//strLang=getCookie(LANG_COOKIE_NAME);
		strLang=localStorage.getItem(LANG_COOKIE_NAME);
	}
	
	//alert(strLang);
	
	if( !LangText.hasOwnProperty(strLang) )
		strLang="en";

    let AllNode=$(".trans");
	let nTotal=AllNode.length;
	for(let n=0;n<nTotal;n++)
	{
		let OneNode=AllNode[n];
		
		let tid=$(OneNode).attr("tid");
		if( LangText[strLang].hasOwnProperty(tid) )
		{
			$(OneNode).html(LangText[strLang][tid]);
		}
		else if(strLang!='en' && LangText['en'].hasOwnProperty(tid) )
		{
			$(OneNode).html(LangText['en'][tid]);
		}		
	}
}

function GetCurrentTextByKey( key )
{
	let strLang=GetQueryString("lang");
	if(strLang!=null)
	{
		//setCookie(LANG_COOKIE_NAME,strLang,LANG_COOKIE_EXPIRESECOND,'/');
		localStorage.setItem(LANG_COOKIE_NAME,strLang);
	}
	else
	{
		//strLang=getCookie(LANG_COOKIE_NAME);
		strLang=localStorage.getItem(LANG_COOKIE_NAME);
	}
	
	//alert(strLang);
	
	if( !LangText.hasOwnProperty(strLang) )
		strLang="en";

	let strText='';
	if( LangText[strLang].hasOwnProperty(key) )
	{
		strText=LangText[strLang][key];
	}
	else if(strLang!='en' && LangText['en'].hasOwnProperty(key) )
	{
		strText=LangText['en'][key];
	}	
	
	return strText;
}
