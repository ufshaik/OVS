/* globals fetch */
var update = document.getElementById('update')
var del = document.getElementById('delete')


update.addEventListener('click', function () {
  fetch('upcand', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'id':document.getElementById('id').value,
      'name': document.getElementById('name').value,
      'par': document.getElementById('par').value,
      'name2': document.getElementById('name2').value
    })
  })
  .then(response => {
    if (response.ok) return response.json()
  })
  .then(data => {
    console.log(data)
  })
})

del.addEventListener('click', function () {
  fetch('upcand', {
    method: 'delete',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'name': document.getElementById('del').value
    })
  }).then(function (response) {
    window.location.reload()
  })
})


update.addEventListener('click', function () {
  fetch('upvoter', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'id':document.getElementById('id').value,
      'name': document.getElementById('name').value,
      'age': document.getElementById('age').value,
      'name2': document.getElementById('name2').value
    })
  })
  .then(response => {
    if (response.ok) return response.json()
  })
  .then(data => {
    console.log(data)
  })
})

del.addEventListener('click', function () {
  fetch('upvoter', {
    method: 'delete',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'name': document.getElementById('del').value
    })
  }).then(function (response) {
    window.location.reload()
  })
})
