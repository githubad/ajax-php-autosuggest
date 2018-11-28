// note: IE8 doesn't support DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {

  var suggestions = document.getElementById("suggestions");
  var form = document.getElementById("search-form");
  var search = document.getElementById("search");

  function suggestionsToList(items) {
  let output = '';
  for (var i = 0; i < items.length; i++) {
    output += '<li>';
    output += '<a href="search.php?q='+ items[i] +'">';
    output += items[i];
    output += '</a>';
    output += '</li>';



  }
  return output;
  }

  function showSuggestions(json) {
    suggestions.style.display = "block";
    var li_list = suggestionsToList(json)
    suggestions.innerHTML = li_list;;
  }

  function getSuggestions() {
    var q = search.value;
      // console.log('getSuggestions');
        if(q.length < 3 ){
          suggestions.style.display = "none";
          return;
        }
      fetch("autosuggest.php?q=" + q,
        {
        method:"GET",
        headers: {
          // Not to use FormData with content type, used for gatherFormData
          // "Content-type":"application/x-www-form-urlencoded",
          "X-REQUESTED-WITH" : "XMLHttpRequest"
        },
        credentials: 'same-origin' })
      .then(response => response.text() )
      .then(data => {

        console.log('Result ' + data);

        var json = JSON.parse(data);
        showSuggestions(json);
    });

    }

  search.addEventListener("input", getSuggestions);

});
