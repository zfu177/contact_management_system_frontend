const API_URL = 'http://localhost:8080/contacts';

$(document).ready(function () {
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
        <th><a class="waves-effect waves-light btn">View</a></th>
        <th><a class="waves-effect waves-light btn">Edit</a></th>
        <th><a class="waves-effect waves-light btn" onclick="deleteContact(${d.id})">Delete</a></th>
      </tr>
    `;
    });

    $('.contacts tbody').append(tableRows);
  });
});

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('select');
  var options = {};
  var instances = M.FormSelect.init(elems, options);
});

function add_contact() {
  event.preventDefault();
  const first_name = document.getElementById('first_name').value;
  const last_name = document.getElementById('last_name').value;
  const email = document.getElementById('email').value;
  const country_code = document.getElementById('country_code').value;
  const phone = document.getElementById('phone').value;
  const notes = document.getElementById('notes').value;

  console.log({
    firstName: first_name,
    lastName: last_name,
    email,
    countryCode: parseInt(country_code),
    phone: parseInt(phone),
    notes
  });

  $.post(API_URL, {
    firstName: first_name,
    lastName: last_name,
    email,
    countryCode: 1,
    phone: 212341234123,
    notes
  })
    .fail(function (data) {
      console.log(data.responseText);
      alert('Something went wrong, please check your inputs');
    })
    .done(function (data) {
      alert('Success');
      window.open('index.html');
    });
}

function deleteContact(id) {
  $.ajax({
    url: `${API_URL}/${id}`,
    type: 'DELETE',
    success: function (data) {
      console.log(data);
      alert('Success');
      window.open('index.html');
    }
  }).fail(function (data) {
    console.log(data.responseText);
    alert('Something went wrong, please refresh and try again');
  });
}
