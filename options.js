document.addEventListener('DOMContentLoaded', function() {
  const salaryInput = document.getElementById('salaryInput');
  const addSalaryButton = document.getElementById('addSalaryButton');
  const linkInput = document.getElementById('linkInput');
  const addLinkButton = document.getElementById('addLinkButton');
  const saveButton = document.getElementById('saveButton');
  const salaryList = document.getElementById('salaryList');
  const linkList = document.getElementById('linkList');

  // Load existing options from storage
  chrome.storage.sync.get(['salaryOptions', 'linkOptions'], function(data) {
      const salaryOptions = data.salaryOptions || [];
      const linkOptions = data.linkOptions || [];
      salaryOptions.forEach(option => addOptionToList(option, salaryList));
      linkOptions.forEach(option => addOptionToList(option, linkList));
  });

  // Add salary option to the list
  addSalaryButton.addEventListener('click', function() {
      const salary = salaryInput.value.trim();
      if (salary) {
          addOptionToList(salary, salaryList);
          salaryInput.value = '';
      }
  });

  // Add link option to the list
  addLinkButton.addEventListener('click', function() {
      const link = linkInput.value.trim();
      if (link) {
          addOptionToList(link, linkList);
          linkInput.value = '';
      }
  });

  // Save the updated options to storage
  saveButton.addEventListener('click', function() {
      const salaryOptions = [];
      salaryList.querySelectorAll('li').forEach(function(li) {
          salaryOptions.push(li.firstChild.textContent);
      });

      const linkOptions = [];
      linkList.querySelectorAll('li').forEach(function(li) {
          linkOptions.push(li.firstChild.textContent);
      });

      chrome.storage.sync.set({ salaryOptions: salaryOptions, linkOptions: linkOptions }, function() {
          alert('Options saved.');
      });
  });

  function addOptionToList(option, list) {
      const li = document.createElement('li');
      const textNode = document.createTextNode(option);

      // Create remove button
      const removeButton = document.createElement('span');
      removeButton.textContent = ' Remove';
      removeButton.className = 'remove-button';
      removeButton.addEventListener('click', function() {
          li.remove();
      });

      li.appendChild(textNode);
      li.appendChild(removeButton);
      list.appendChild(li);
  }
});
