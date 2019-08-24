const membersTemplate = Handlebars.compile(
  document.getElementById('members-template').innerHTML
);

const reposTemplate = Handlebars.compile(
  document.getElementById('repos-template').innerHTML
);

Handlebars.registerHelper('relative-time', function(date) {
  return moment(date).fromNow();
});

$('#members-link').on('click', async function(e) {
  e.preventDefault();
  $('#results').html('Loading ...');

  try {
    let members = await $.ajax({
      type: 'GET',
      url: 'https://api.github.com/orgs/emberjs/members'
    });

    let sanitizedHtml = membersTemplate({ members });
    $('#results').html(sanitizedHtml);
  } catch (error) {
    $('#results').html('Oops, something went wrong.')
  }
});

// do this as a class exercise
$('#repos-link').on('click', async function(e) {
  e.preventDefault();
  $('#results').html('Loading ...');

  let repos = await $.getJSON('https://api.github.com/orgs/emberjs/repos');
  let sanitizedHtml = reposTemplate({ repos });
  $('#results').html(sanitizedHtml);
});

$('#results').on('click', '.repo', function() {
  alert('hi');
});

