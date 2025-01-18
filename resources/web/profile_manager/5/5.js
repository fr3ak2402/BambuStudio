function OnInit()
{
	TranslatePage();
	
	RequestInstalledProfiles()
}

function RequestInstalledProfiles()
{
    $("#LoadingMask").show();
    $("#LoadingBody").show();
    $("#LoadingText").show();
    
    var tSend={};
    tSend['sequence_id']=Math.round(new Date() / 1000);
    tSend['command']="request_installed_profilemanager_profiles";
    
    SendWXMessage( JSON.stringify(tSend) );
}

function HandleInstalledProfiles(pVal) {
    let strCmd = pVal['command'];
    // Check if the command is the expected one
    if (strCmd == 'response_installed_profilemanager_profiles') {
        HandleProfileList(pVal['response']);
    }
}

function HandleProfileList(pVal) {
    // Check if pVal is an array (expected data type for vendor list)
    if (!Array.isArray(pVal)) {
        console.error("Expected an array of vendor data, but got:", pVal);
        return;
    }

    // Initialize an array to store the HTML strings for the vendor entries
    let VendorHtml = [];
    
    // Iterate through each vendor data item in the array
    pVal.forEach((vendorData, index) => {
        // Check if the necessary fields (vendor, version, checked) exist in the vendor object
        if (vendorData.hasOwnProperty("vendor") && vendorData.hasOwnProperty("version")) {
            // Generate HTML for the current vendor entry
            let vendorEntry = `
                <div class="VendorEntry">
                    <img class="VendorImage" src="https://github.com/fr3ak2402/GalaxySlicerNeo-Profile-Library/blob/main/Logos/${vendorData.vendor}.png?raw=true" />
                    <label for="vendor${index}">${vendorData.vendor}</label>
                    <span class="VersionField">${vendorData.version}</span>
                </div>
            `;
            // Add the generated HTML to the VendorHtml array
            VendorHtml.push(vendorEntry);
        } else {
            // Log an error if any necessary field is missing from the vendor data
            console.error("Invalid vendor data at index " + index, vendorData);
        }
    });

    // If VendorHtml has any entries, insert the generated HTML into the VendorBlock container
    if (VendorHtml.length > 0) {
        document.getElementById('VendorBlock').innerHTML = VendorHtml.join('');
    } else {
        // Log a message if no valid vendor data was found
        console.log("No valid vendor data to display.");

        // Insert a placeholder message into the VendorBlock container
        document.getElementById('VendorBlock').innerHTML = `
            <div class="VendorEntry">
                <span class="NoVendorsMessage">No installed profiles found.</span>
            </div>
        `;

        // Hide the "Remove" button
		$("#UpdateBtn").hide();

        // Hide the "Update" button
		$("#RemoveBtn").hide();
    }

    $("#LoadingMask").hide();
    $("#LoadingBody").hide();
    $("#LoadingText").hide();
}

function InstallProfiles()
{
    window.open('../6/index.html','_self');
}