// api url and query
const url = "https://api.github.com/search/repositories";
let query = "";

// return date in YYYY-MM-DD form
const getDate = () => {
  let inputDate = $("#input-date").val();
  return inputDate;
};

// get the repos from api
const getRepos = () => {
  let xhr = new XMLHttpRequest();
  if (!xhr) {
    return;
  }

  // ensure that api actually worked and response code was successful
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let responseJSON = JSON.parse(xhr.responseText);
      outputResults(responseJSON.items);
    }
  };

  xhr.open("GET", url + query, true);
  xhr.send();
};

// print results
const outputResults = (repos) => {
  let allRepoCards = document.querySelector("#all-repo-cards");
  allRepoCards.innerHTML = "";
  repos.forEach((repo) => {
    // output in card shape
    let repoCard = document.createElement("div");
    repoCard.className = "repo-card";
    repoCard.innerHTML = `<p><strong>Repo name:</strong> ${repo.name}</p><p><strong>Description:</strong> ${repo.description}</p>`;
    repoCard.innerHTML += `<p><strong>Author:</strong> ${repo.owner.login}</p><p><strong>Language</strong> ${repo.language}</p>`;
    repoCard.innerHTML += `<p><a href="https://github.com/${repo.full_name}"><strong>See it here</strong></a></p>`;
    allRepoCards.appendChild(repoCard);
  });
};

const search = () => {
  // get word that user inputted
  let word = $("#input-word").val();
  query = `?q=${encodeURIComponent(
    `created:${getDate()} ${word} in:name,description,readme`
  )}`;
  // get results
  getRepos();
};

// once user presses the submit button, trigger the get request (asynchronous)
$("#search-form").submit((e) => {
  e.preventDefault();
  search();
});