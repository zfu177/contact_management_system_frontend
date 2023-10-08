const API_URL = 'http://localhost:8080/contacts';

$(document).ready(function () {
  $.ajax({
    url: `${API_URL}`
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
        <th><a class="waves-effect waves-light btn">Delete</a></th>
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
