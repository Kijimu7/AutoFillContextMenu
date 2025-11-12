// Function to autofill dropdowns and radio buttons
function autoFillDropdownAndRadio() {
    const authorizedOptionsYes = ["yes", "authorized", "legally authorized", "u.s"];
    const authorizedOptionsNo = ["no", "not authorized"];
    
    // Function to select matching dropdown options
    function fillDropdown(select, options) {
        for (const option of select.options) {
            if (options.some(answer => option.textContent.toLowerCase().includes(answer))) {
                select.value = option.value;
                const event = new Event('change', { bubbles: true });
                select.dispatchEvent(event);  // Dispatch change event after setting value
                console.log(`Dropdown option selected: ${option.textContent}`);
                break;
            }
        }
    }

    // Function to select matching radio buttons
    function fillRadioButtons(radio, options) {
        const label = document.querySelector(`label[for="${radio.id}"]`);
        if (label && options.some(answer => label.textContent.toLowerCase().includes(answer))) {
            radio.checked = true;
            const event = new Event('change', { bubbles: true });
            radio.dispatchEvent(event);  // Dispatch change event after checking the radio button
            console.log(`Radio button selected: ${label.textContent}`);
        }
    }

    try {
        // Fill "Are you legally authorized to work?" dropdowns
        const selectElements = document.querySelectorAll('select');
        if (selectElements.length > 0) {
            selectElements.forEach(select => {
                fillDropdown(select, authorizedOptionsYes);  // Auto-select 'Yes' related options
            });
        } else {
            console.log("No select elements found on the page.");
        }

        // Fill "Are you legally authorized to work?" radio buttons
        const radioGroups = document.querySelectorAll('input[type="radio"]');
        if (radioGroups.length > 0) {
            radioGroups.forEach(radio => {
                fillRadioButtons(radio, authorizedOptionsYes);  // Auto-select 'Yes' related options
            });
        } else {
            console.log("No radio button groups found on the page.");
        }

        // If the question needs to select "No"
        selectElements.forEach(select => {
            fillDropdown(select, authorizedOptionsNo);  // Auto-select 'No' related options if applicable
        });

        radioGroups.forEach(radio => {
            fillRadioButtons(radio, authorizedOptionsNo);  // Auto-select 'No' related options if applicable
        });
    } catch (error) {
        console.error("Error filling dropdowns or radio buttons:", error);
    }
}


// Run the script when the page is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        autoFillDropdownAndRadio();
    } catch (error) {
        console.error("Error executing autofill script:", error);
    }
});
