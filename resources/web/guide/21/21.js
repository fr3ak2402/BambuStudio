function OnInit()
{
	//let strInput=JSON.stringify(cData);
	//HandleStudio(strInput);
	
	TranslatePage();
	
	RequestProfile();
}



function RequestProfile()
{
	var tSend={};
	tSend['sequence_id']=Math.round(new Date() / 1000);
	tSend['command']="request_userguide_profile";
	
	SendWXMessage( JSON.stringify(tSend) );
}

function HandleStudio( pVal )
{
//	alert(strInput);
//	alert(JSON.stringify(strInput));
//	
//	let pVal=IsJson(strInput);
//	if(pVal==null)
//	{
//		alert("Msg Format Error is not Json");
//		return;
//	}
	
	let strCmd=pVal['command'];
	//alert(strCmd);
	
	if(strCmd=='response_userguide_profile')
	{
		HandleModelList(pVal['response']);
	}
}


function ShowPrinterThumb(pItem, strImg)
{
	$(pItem).attr('src',strImg);
	$(pItem).attr('onerror',null);
}

function HandleModelList( pVal )
{
	if( !pVal.hasOwnProperty("model") )
		return;

    let pModel=pVal['model'];
	
	let nTotal=pModel.length;
	let ModelHtml={};
	for(let n=0;n<nTotal;n++)
	{
		let OneModel=pModel[n];
		
		let strVendor=OneModel['vendor'];
		
		//Add Vendor Html Node
		if($(".OneVendorBlock[vendor='"+strVendor+"']").length==0)
		{
			let sVV=strVendor;
			if( sVV=="BBL" )
				sVV="Bambu Lab";
			
			let VendorIconImage="../../../profiles/"+strVendor+"/"+strVendor+"_icon.png";
			
			let HtmlNewVendor='<div class="OneVendorBlock" Vendor="'+strVendor+'" VendorName="'+sVV+'">'+
'<div class="BlockBanner">'+
'	<div class="BannerBtns">'+
'		<div class="SmallBtn_Green trans" tid="t11" onClick="SelectPrinterAll('+"\'"+strVendor+"\'"+')">all</div>'+
'		<div class="SmallBtn trans" tid="t12" onClick="SelectPrinterNone('+"\'"+strVendor+"\'"+')">none</div>'+
'	</div>'+
'	<div class="VendorIcon">'+
'	<img src="'+VendorIconImage+'"/>'+
'	</div>'+
'	<a>'+sVV+'</a>'+
'</div>'+
'<div class="PrinterArea">	'+
'</div>'+
'</div>';
			
			if(sVV=='Bambu Lab')
				$('#Content').html( HtmlNewVendor + $('#Content').html() );
			else
				$('#Content').append( HtmlNewVendor );
		}
		
		let ModelName=OneModel['model'];
		
		//Collect Html Node Nozzel Html
		if( !ModelHtml.hasOwnProperty(strVendor))
			ModelHtml[strVendor]='';
			
		let NozzleArray=OneModel['nozzle_diameter'].split(';');
		let HtmlNozzel='';
		for(let m=0;m<NozzleArray.length;m++)
		{
			let nNozzel=NozzleArray[m];
			HtmlNozzel+='<div class="pNozzel TextS2"><input type="checkbox" model="'+OneModel['model']+'" nozzel="'+nNozzel+'" vendor="'+strVendor+'" /><span>'+nNozzel+'</span><span class="trans" tid="t13">mm nozzle</span></div>';
		}

		//GalaxySlicerNeo: the cover image path is different from the profile manager profiles
		var CoverImage="";
		var CoverImage2="";
		var CoverImage3="";
		
		if (strVendor == "BBL") {
			CoverImage="../../image/printer/"+OneModel['model']+"_cover.png";
			CoverImage2="../../../profiles/"+strVendor+"/"+OneModel['model']+"_cover.png";
			CoverImage3=pVal['configpath']+"/system/"+strVendor+"/"+OneModel['model']+"_cover.png";
		}
		else {
			CoverImage2="../../../profiles/"+strVendor+"/assets/cover/"+OneModel['model']+"_cover.png";
			CoverImage3=pVal['configpath']+"/system/"+strVendor+"/assets/cover/"+OneModel['model']+"_cover.png";
		}

		//alert( 'FinalCover: '+FinalCover );
		ModelHtml[strVendor]+='<div class="PrinterBlock">'+
        '	<div class="PImg"><img src="'+CoverImage3+'" onerror="ShowPrinterThumb(this,\''+CoverImage2+'\')" /></div>'+
        '    <div class="PName">'+OneModel['model']+'</div>'+ HtmlNozzel +'</div>';
		
	}
	
	//Update Nozzel Html Append
	for( let key in ModelHtml )
	{
		$(".OneVendorBlock[vendor='"+key+"'] .PrinterArea").append( ModelHtml[key] );
	}
	
	
	//Update Checkbox
	$('input').prop("checked", false);
	for(let m=0;m<nTotal;m++)
	{
		let OneModel=pModel[m];
	
		let SelectList=OneModel['nozzle_selected'];
		if(SelectList!='')
		{
			SelectList=OneModel['nozzle_selected'].split(';');
    		let nLen=SelectList.length;
		
		    for(let a=0;a<nLen;a++)
		    {
			    let nNozzel=SelectList[a];
			    $("input[vendor='"+OneModel['vendor']+"'][model='"+OneModel['model']+"'][nozzel='"+nNozzel+"']").prop("checked", true);
		    }
		}
		else
		{
			$("input[vendor='"+OneModel['vendor']+"'][model='"+OneModel['model']+"']").prop("checked", false);
		}
	}	

	let AlreadySelect=$("input:checked");
	let nSelect=AlreadySelect.length;
	if(nSelect==0)
	{
		$("input[nozzel='0.4'][vendor='BBL']").prop("checked", true);
	}
	
	TranslatePage();
}


function SelectPrinterAll( sVendor )
{
	$("input[vendor='"+sVendor+"']").prop("checked", true);
}


function SelectPrinterNone( sVendor )
{
	$("input[vendor='"+sVendor+"']").prop("checked", false);
}


//
function GotoFilamentPage()
{
	let nChoose=OnExit();
	
	if(nChoose>0)
		window.open('../22/index.html','_self');
}

function OnExit()
{	
	let ModelAll={};
	
	let ModelSelect=$("input:checked");
	let nTotal=ModelSelect.length;

	if( nTotal==0 )
	{
		ShowNotice(1);
		
		return 0;
	}
	
	for(let n=0;n<nTotal;n++)
	{
	    let OneItem=ModelSelect[n];
		
		let strModel=OneItem.getAttribute("model");
		let strVendor=OneItem.getAttribute("vendor");
		let strNozzel=OneItem.getAttribute("nozzel");
			
		//alert(strModel+strVendor+strNozzel);
		
		if(!ModelAll.hasOwnProperty(strModel))
		{
			//alert("ADD: "+strModel);
			
			ModelAll[strModel]={};
		
			ModelAll[strModel]["model"]=strModel;
			ModelAll[strModel]["nozzle_diameter"]='';
			ModelAll[strModel]["vendor"]=strVendor;
		}
		
		ModelAll[strModel]["nozzle_diameter"]+=ModelAll[strModel]["nozzle_diameter"]==''?strNozzel:';'+strNozzel;
	}
		
	var tSend={};
	tSend['sequence_id']=Math.round(new Date() / 1000);
	tSend['command']="save_userguide_models";
	tSend['data']=ModelAll;
	
	SendWXMessage( JSON.stringify(tSend) );

    return nTotal;
}


function ShowNotice( nShow )
{
	if(nShow==0)
	{
		$("#NoticeMask").hide();
		$("#NoticeBody").hide();
	}
	else
	{
		$("#NoticeMask").show();
		$("#NoticeBody").show();
	}
}

function FilterVendor()
{
    var inputValue = $('#Search').val();
    
    if (inputValue.trim() !== '') 
	{
        var searchedVendor = $('#Search').val().trim().toLowerCase();

        // Search for elements with the attribute "VendorName" and check them
        $('[VendorName]').each(function() 
		{
            var nameVendor = $(this).attr('VendorName').toLowerCase();
            
            if (nameVendor.includes(searchedVendor)) 
			{
                $(this).show(); // The element's vendor value contains the searched string, show it
            } 
			else 
			{
                $(this).hide(); // The element has a different vendor value or doesn't contain the string, hide it
            }
        });
    } 
	else 
	{
        $('[VendorName]').show();
    }
}

$(document).ready(function()
{		
    $('#Search').on('input', function() 
	{
        FilterVendor();
    });

    $('#Clear').click(function() 
	{
        $('#Search').val(''); // Clear the input field
        $('[VendorName]').show(); // Show all Vendor elements
    });
});

function GotoManagerPage()
{
	window.open('../../profile_manager/5/index.html','_self');
}