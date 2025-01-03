function OnInit()
{
    // TranslatePage();
    RequestManagerProfiles();

    const vendors = [
        { vendor: 'AnkerMake', version: '01.01.00.00', checked: true },
        { vendor: 'Snapmaker', version: '01.01.00.00', checked: false },
        { vendor: 'Creality', version: '01.01.00.00', checked: true }
    ];
    addVendors(vendors);
}

function RequestManagerProfiles()
{
	var tSend={};
	tSend['sequence_id']=Math.round(new Date() / 1000);
	tSend['command']="request_profilemanager_profiles";
	
	SendWXMessage( JSON.stringify(tSend) );
}

function HandleManagerProfiles( pVal )
{
	let strCmd=pVal['command'];
	//alert(strCmd);
	
	if(strCmd=='response_profilemanager_profiles')
	{
		HandleVendorList(pVal['response']);
	}
}

function HandleVendorList( pVal )
{
    if( !pVal.hasOwnProperty("vendor") )
        return;

    let pVendor=pVal['vendor'];
    
    let nTotal=pVendor.length;
    let VendorHtml={};
    for(let n=0;n<nTotal;n++)
    {
        VendorHtml[n]=pVendor[n];
    }
    
    //console.log(VendorHtml);
}

function addVendors(vendors) {
    const vendorBlock = document.getElementById('VendorBlock');
    
    // Loop through each vendor and create an entry
    vendors.forEach((vendor, index) => {
      const vendorDiv = document.createElement('div');
      vendorDiv.classList.add('VendorEntry');
  
      const label = document.createElement('label');
      label.setAttribute('for', `vendor${index + 1}`);
      label.textContent = vendor.vendor;
  
      const version = document.createElement('span');
      version.classList.add('VersionField');
      version.textContent = vendor.version;
  
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = `vendor${index + 1}`;
      checkbox.name = `vendor${index + 1}`;

      // Adding a data attribute for the version to easily retrieve later
      checkbox.setAttribute('data-version', vendor.version);
      checkbox.checked = vendor.checked;  // Set the checkbox state from vendors array

  
      vendorDiv.appendChild(label);  // Add label (vendor name)
      vendorDiv.appendChild(version);  // Add version field
      vendorDiv.appendChild(checkbox);  // Add checkbox
      vendorBlock.appendChild(vendorDiv);  // Add the vendor entry to the vendor block
    });
  }