function OnInit()
{
    TranslatePage();
    
    RequestManagerProfiles();

    // Add event listeners to monitor checkbox states
    MonitorCheckboxes();
}

function RequestManagerProfiles()
{
    $("#LoadingMask").show();
    $("#LoadingBody").show();
    $("#LoadingText").show();
    
	var tSend={};
	tSend['sequence_id']=Math.round(new Date() / 1000);
	tSend['command']="request_profilemanager_profiles";
	
	SendWXMessage( JSON.stringify(tSend) );
}

function HandleManagerProfiles(pVal) {
    let strCmd = pVal['command'];
    // Check if the command is the expected one
    if (strCmd == 'response_profilemanager_profiles') {
        HandleVendorList(pVal['response']);
    }
}

function HandleVendorList(pVal) {
    // Check if pVal is an array (expected data type for vendor list)
    if (!Array.isArray(pVal)) {
        console.error("Expected an array of vendor data, but got:", pVal);
        return;
    }

    // Initialize an array to store the HTML strings for the vendor entries
    let VendorHtml = [];
    
    // Iterate through each vendor data item in the array
    pVal.forEach((vendorData, index) => {
        // Check if the necessary fields (vendor, version) exist in the vendor object
        if (vendorData.hasOwnProperty("vendor") && vendorData.hasOwnProperty("version")) {
            // Generate HTML for the current vendor entry
            let vendorEntry = `
                <div class="VendorEntry">
                    <label for="vendor${index}">${vendorData.vendor}</label>
                    <span class="VersionField">${vendorData.version}</span>
                    <input type="checkbox" id="vendor${index}" />
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
                <span class="NoVendorsMessage">No profiles found in the online library.</span>
            </div>
        `;
    }

    $("#LoadingMask").hide();
    $("#LoadingBody").hide();
    $("#LoadingText").hide();
}

function ApplyProfiles() {

    let VendorEntries = document.getElementsByClassName('VendorEntry');

    let VendorData = [];

    for (let i = 0; i < VendorEntries.length; i++) {
        let vendorEntry = VendorEntries[i];

        let vendorName = vendorEntry.querySelector('label').innerText;
        let vendorChecked = vendorEntry.querySelector('input').checked;

        VendorData.push({
            vendor: vendorName,
            checked: vendorChecked
        });
    }

    $("#LoadingMask").show();
    $("#LoadingBody").show();
    $("#InstallingText").show();

    var tSend={};
	tSend['sequence_id']=Math.round(new Date() / 1000);
	tSend['command']="install_profilemanager_profiles";
	tSend['request']=VendorData;

	SendWXMessage( JSON.stringify(tSend) );
}

function HandleProfileInstallation(pVal) {
    let strCmd = pVal['command'];
    // Check if the command is the expected one
    if (strCmd == 'response_install_profilemanager_profiles') {

        let strStatus = pVal['status'];
		
        if (strStatus == true) {
            $("#LoadingMask").hide();
            $("#LoadingBody").hide();
            $("#InstallingText").hide();

            window.open('../1/index.html','_self');
        } else {
            console.error("Profile installation failed");
        }
    }
}

function MonitorCheckboxes() {
    const applyButton = document.getElementById("AcceptBtn");
    applyButton.style.display = "none"; // Hide the button by default

    // Add a change event listener to the entire document
    document.addEventListener("change", function () {
        // Select all checkboxes inside the VendorEntry elements
        const checkboxes = document.querySelectorAll('.VendorEntry input[type="checkbox"]');
        
        // Check if at least one checkbox is selected
        let isChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

        // Show the button if at least one checkbox is checked, otherwise hide it
        applyButton.style.display = isChecked ? "block" : "none";
    });
}