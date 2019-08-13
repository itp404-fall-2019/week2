// Approach 1 - build HTML string and sanitize HTML
// $('#members-link').on('click', function(e) {
//   e.preventDefault();
//   $('#results').html('Loading ...');
//
//   $.ajax({
//     type: 'GET',
//     url: 'https://api.github.com/orgs/emberjs/members'
//   }).then((members) => {
//     let html = '';
//
//     let results = members.forEach((member) => {
//       html += `
//         <img
//           src="${member.avatar_url}"
//           width="150"
//           title="${member.login}"
//           alt="image of ${member.login}">
//       `;
//     });
//
//     let sanitizedHtml = DOMPurify.sanitize(html);
//
//     $('#results').html(sanitizedHtml);
//   });
// });

// Approach 2 - Create nodes
$('#members-link').on('click', function(e) {
  e.preventDefault();
  $('#results').html('Loading ...');

  $.ajax({
    type: 'GET',
    url: 'https://api.github.com/orgs/emberjs/members'
  }).then((members) => {
    let fragment = document.createDocumentFragment();

    let results = members.forEach((member) => {
      let image = document.createElement('img');
      image.src = member.avatar_url;
      image.width = 150;
      image.title = member.login;
      image.alt = `image of ${member.login}`;
      fragment.append(image);
    });

    $('#results').html(fragment);
  });
});

// do this as a class exercise
$('#repos-link').on('click', function(e) {
  e.preventDefault();
  $('#results').html('Loading ...');

  $.getJSON('https://api.github.com/orgs/emberjs/repos').then((repos) => {
    let html = '';

    let results = repos.forEach((repo) => {
      html += `
        <div>
          <h3>${repo.name}</h3>
          <p>${repo.description}</p>
        </div>
      `;
    });

    let sanitizedHtml = DOMPurify.sanitize(html);

    $('#results').html(sanitizedHtml);
  });
});
