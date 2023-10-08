const API_URL = 'http://localhost:8080/contacts';

$(document).ready(function () {
  const url = window.location.pathname;

  // When open index, get contact lists and append rows to table
  if (url.includes('index.html')) {
    $.ajax({
      url: API_URL
    }).then(function (data) {
      let tableRows;

      data.forEach((d) => {
        tableRows += `
        <tr>
          <td>${d.id}</td>
          <td>${d.first_name}</td>
          <td>${d.last_name}</td>
          <td>${d.email}</td>
          <td>+${d.country_code} ${d.phone}</td>
          <td>${d.notes}</td>
          <th><a class="waves-effect waves-light btn" onclick="viewContact(${d.id})">View</a></th>
          <th><a class="waves-effect waves-light btn" onclick="deleteContact(${d.id})">Delete</a></th>
        </tr>
      `;
      });
      $('.contacts tbody').append(tableRows);
    });
  }

  if (url.includes('add.html')) {
    // Init Character Counter
    var inputCount = document.querySelectorAll(
      '#first_name, #last_name, #email, #country_code, #phone, #notes'
    );
    M.CharacterCounter.init(inputCount);
  }

  if (url.includes('view.html')) {
    const pathParameter = window.location.search;
    const id = pathParameter.split('=')[1];
    if (!id) {
      alert('Something went wrong, please try again');
      location.replace('index.html');
    } else {
      $.get(`${API_URL}/${id}`)
        .fail(function (data) {
          alert('Something went wrong, please try again');
        })
        .done(function (data) {
          const { first_name, last_name, email, phone, country_code, notes } = data[0];
          document.getElementById('first_name').value = first_name;
          document.getElementById('last_name').value = last_name;
          document.getElementById('email').value = email;
          document.getElementById('country_code').value = country_code;
          document.getElementById('phone').value = phone;
          document.getElementById('notes').value = notes;
          M.updateTextFields();

          document
            .getElementById('update_contact_form')
            .setAttribute('onsubmit', `update_contact(${id})`);
        });
    }
  }
});

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('select');
  var options = {};
  var instances = M.FormSelect.init(elems, options);
});

function add_contact() {
  event.preventDefault();
  const firstName = document.getElementById('first_name').value;
  const lastName = document.getElementById('last_name').value;
  const email = document.getElementById('email').value;
  const countryCode = document.getElementById('country_code').value;
  const phone = document.getElementById('phone').value;
  const notes = document.getElementById('notes').value;

  $.post(API_URL, { firstName, lastName, email, countryCode, phone, notes })
    .fail(function (data) {
      console.log(data.responseText);
      alert('Something went wrong, please check your inputs');
    })
    .done(function (data) {
      alert('Success');
      location.replace('index.html');
    });
}

function deleteContact(id) {
  $.ajax({
    url: `${API_URL}/${id}`,
    type: 'DELETE',
    success: function (data) {
      console.log(data);
      alert('Success');
      location.replace('index.html');
    }
  }).fail(function (data) {
    console.log(data.responseText);
    alert('Something went wrong, please refresh and try again');
  });
}

function viewContact(id) {
  location.replace(`view.html?id=${id}`);
}

function update_contact(id) {
  event.preventDefault();
  const firstName = document.getElementById('first_name').value;
  const lastName = document.getElementById('last_name').value;
  const email = document.getElementById('email').value;
  const countryCode = document.getElementById('country_code').value;
  const phone = document.getElementById('phone').value;
  const notes = document.getElementById('notes').value;

  $.ajax({
    url: `${API_URL}/${id}`,
    type: 'PUT',
    data: { firstName, lastName, email, countryCode, phone, notes },
    success: function (data) {
      console.log(data);
      alert('Success');
      location.replace('index.html');
    }
  }).fail(function (data) {
    console.log(data.responseText);
    alert('Something went wrong, please refresh and try again');
  });
}
