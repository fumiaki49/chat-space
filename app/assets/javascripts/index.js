$(document).on('turbolinks:load', function() {

  var searchResult = $('#user-search-result');

  function appendbuildHTML(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
                </div>`
    searchResult.append(html);
  }

  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ msg }</p>
                </div>`
    searchResult.append(html);
  }


  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json',
    })
    .done(function(users) {
      $('#user-search-result').empty();
        if (users.length !== 0) {
            users.forEach(function(user) {
            appendbuildHTML(user);
          });
        }
        else {
          appendErrMsgToHTML("一致するユーザーがいません");
        }
      })
    .fail(function() {
      alert('ユーザー検索に失敗しました。');
    })
  });

  $('#user-search-result').on("click", 'a', function() {
    $("#user-search-result").empty();
  })
});