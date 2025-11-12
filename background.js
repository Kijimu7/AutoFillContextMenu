chrome.runtime.onInstalled.addListener(() => {
  createContextMenu();
});


// Listener for context menu changes
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && (changes.salaryOptions || changes.linkOptions)) {
      // Update the context menu with the new options
      chrome.contextMenus.removeAll(() => {
          createContextMenu();
      });
  }
});

// Listener for context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId.startsWith('salary_') || info.menuItemId.startsWith('link_')) {
      const item = info.menuItemId.split('_')[1];
      if (item) {
          if (tab && tab.url && (tab.url.startsWith('http') || tab.url.startsWith('https'))) {
              chrome.scripting.executeScript({
                  target: { tabId: tab.id },
                  function: fillText,
                  args: [item]
              }).catch((error) => {
                  console.error('Failed to execute script:', error);
              });
          } else {
              console.warn('Cannot execute script on this URL:', tab.url);
          }
      }
  } else if (info.menuItemId === 'autoFillDropdown') {
      chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: autoFillDropdownAndRadio
      }).catch((error) => {
          console.error('Failed to execute script:', error);
      });
  }
});

// Create the context menu
function createContextMenu() {
  // Parent context menu item
  chrome.contextMenus.create({
      id: "autoFill",
      title: "AutoFill Context Menu",
      contexts: ["selection", "editable"]
  });

  // Load existing options from storage
  chrome.storage.sync.get(['salaryOptions', 'linkOptions'], function(data) {
      const salaryOptions = data.salaryOptions || [];
      const linkOptions = data.linkOptions || [];
      createSalarySubMenu(salaryOptions);
      createLinkSubMenu(linkOptions);
  });
}

// Submenu for Salary
function createSalarySubMenu(salaryOptions) {
  chrome.contextMenus.create({
      id: "salary",
      parentId: "autoFill",
      title: "Salary",
      contexts: ["selection", "editable"]
  });

  salaryOptions.forEach((salary) => {
      chrome.contextMenus.create({
          id: `salary_${salary}`,
          parentId: "salary",
          title: salary,
          contexts: ["selection", "editable"]
      });
  });
}

// Submenu for Links
function createLinkSubMenu(linkOptions) {
  chrome.contextMenus.create({
      id: "link",
      parentId: "autoFill",
      title: "Links",
      contexts: ["selection", "editable"]
  });

  linkOptions.forEach((link) => {
      chrome.contextMenus.create({
          id: `link_${link}`,
          parentId: "link",
          title: link,
          contexts: ["selection", "editable"]
      });
  });
}


// Function to fill text in input elements
function fillText(text) {
  const activeElement = document.activeElement;
  if (activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")) {
      activeElement.value = text;
  }
}

// Auto-fill dropdowns and radio buttons
function autoFillDropdownAndRadio() {
  // Include the same implementation of autoFillDropdownAndRadio as in your contentScript.js
  const authorizedOptionsYes = ["yes", "authorized", "legally authorized", "u.s"];

}


/* chrome.runtime.onInstalled.addListener(() => {
  createContextMenu();
});

// Listener for context menu changes
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && (changes.salaryOptions || changes.linkOptions)) {
      // Update the context menu with the new options
      chrome.contextMenus.removeAll(() => {
          createContextMenu();
      });
  }
});

// Listener for context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId.startsWith('salary_') || info.menuItemId.startsWith('link_')) {
      const item = info.menuItemId.split('_')[1];
      if (item) {
          if (tab && tab.url && (tab.url.startsWith('http') || tab.url.startsWith('https'))) {
              chrome.scripting.executeScript({
                  target: { tabId: tab.id },
                  function: fillText,
                  args: [item]
              }).catch((error) => {
                  console.error('Failed to execute script:', error);
              });
          } else {
              console.warn('Cannot execute script on this URL:', tab.url);
          }
      }
  } else if (info.menuItemId === 'autoFillDropdown') {
      chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: autoFillDropdownAndRadio
      }).catch((error) => {
          console.error('Failed to execute script:', error);
      });
  }
});

// Create the context menu
function createContextMenu() {
  // Parent context menu item
  chrome.contextMenus.create({
      id: "autoFill",
      title: "AutoFill Context Menu",
      contexts: ["selection", "editable"]
  });

  // Load existing options from storage
  chrome.storage.sync.get(['salaryOptions', 'linkOptions'], function(data) {
      const salaryOptions = data.salaryOptions || [];
      const linkOptions = data.linkOptions || [];
      createSalarySubMenu(salaryOptions);
      createLinkSubMenu(linkOptions);
  });
}

function fillText(text) {
  const activeElement = document.activeElement;
  if (activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA") && activeElement.type === "text") {
      activeElement.value = text;
      const event = new Event('input', { bubbles: true });
      activeElement.dispatchEvent(event); // Trigger input event
  }
}


// Submenu for Salary
function createSalarySubMenu(salaryOptions) {
  chrome.contextMenus.create({
      id: "salary",
      parentId: "autoFill",
      title: "Salary",
      contexts: ["selection", "editable"]
  });

  salaryOptions.forEach((salary) => {
      chrome.contextMenus.create({
          id: `salary_${salary}`,
          parentId: "salary",
          title: salary,
          contexts: ["selection", "editable"]
      });
  });
}

// Submenu for Links
function createLinkSubMenu(linkOptions) {
  chrome.contextMenus.create({
      id: "link",
      parentId: "autoFill",
      title: "Links",
      contexts: ["selection", "editable"]
  });

  linkOptions.forEach((link) => {
      chrome.contextMenus.create({
          id: `link_${link}`,
          parentId: "link",
          title: link,
          contexts: ["selection", "editable"]
      });
  });
}

// Function to fill text in input elements
function fillText(text) {
  const activeElement = document.activeElement;
  if (activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")) {
      activeElement.value = text;
  }
}

// Auto-fill dropdowns and radio buttons
function autoFillDropdownAndRadio() {
  // Include the same implementation of autoFillDropdownAndRadio as in your contentScript.js
  const authorizedOptionsYes = ["yes", "authorized", "legally authorized", "u.s"];

  const authorizedOptionsNo = ["no", "not authorized"];

  // Function to select matching dropdown options
  function fillDropdown(select, options) {
      for (const option of select.options) {
          if (options.some(answer => option.textContent.toLowerCase().includes(answer))) {
              select.value = option.value;
              const event = new Event('change', { bubbles: true });
              select.dispatchEvent(event);
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
          radio.dispatchEvent(event);
          console.log(`Radio button selected: ${label.textContent}`);
      }
  }

  try {
      // Fill dropdowns
      const selectElements = document.querySelectorAll('select');
      selectElements.forEach(select => {
          fillDropdown(select, authorizedOptionsYes); // Auto-select 'Yes'
      });

      // Fill radio buttons
      const radioGroups = document.querySelectorAll('input[type="radio"]');
      radioGroups.forEach(radio => {
          fillRadioButtons(radio, authorizedOptionsYes); // Auto-select 'Yes'
      });

      // Optionally handle 'No' answers
      selectElements.forEach(select => {
          fillDropdown(select, authorizedOptionsNo); // Auto-select 'No' if necessary
      });

      radioGroups.forEach(radio => {
          fillRadioButtons(radio, authorizedOptionsNo); // Auto-select 'No' if necessary
      });
  } catch (error) {
      console.error("Error filling dropdowns or radio buttons:", error);
  }
}

// Listener for context menu clicks that autofill dropdowns
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'autoFillDropdown') {
      chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: autoFillDropdownAndRadio
      }).catch((error) => {
          console.error('Failed to execute script:', error);
      });
  }
});

// Add the context menu item
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
      id: "autoFillDropdown",
      title: "AutoFill Dropdown",
      contexts: ["page"]
  });
});



 */