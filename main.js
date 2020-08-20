const membersTemplate = Handlebars.compile(
  document.getElementById('members-template').innerHTML
);

const reposTemplate = Handlebars.compile(
  document.getElementById('repos-template').innerHTML
);

Handlebars.registerHelper('relative-date', function(date) {
  return moment(date).fromNow();
});

// Approach 1
// $('#members-link').on('click', function(e) {
//   e.preventDefault();
//   $('#results').html('Loading ...');
//
//   $.ajax({
//     type: 'GET',
//     url: 'https://api.github.com/orgs/emberjs/members'
//   }).then((members) => {
//     let html = membersTemplate({
//       members
//     });
//
//     $('#results').html(html);
//   }).catch((error) => {
//     console.error(error);
//   });
// });

// Approach 2
$('#members-link').on('click', async function(e) {
  e.preventDefault();
  $('#results').html('Loading ...');

  try {
    let members = await $.ajax({
      type: 'GET',
      url: 'https://api.github.com/orgs/emberjs/members'
    });

    let html = membersTemplate({
      members
    });

    $('#results').html(html);
  } catch (error) {
    console.error(error);
  }
});

// do this as a class exercise
$('#repos-link').on('click', async function(e) {
  e.preventDefault();
  $('#results').html('Loading ...');

  try {
    let repos = await $.getJSON('https://api.github.com/orgs/emberjs/repos');
    let html = reposTemplate({
      repos
    });

    $('#results').html(html);
  } catch (error) {
    console.error(error);
  }
});

$('#results').on('click', '.repo', function() {
  alert('hi');
});
