$(document).on('turbolinks:load',function() {

  var searchResult = $('#user-search-result');
  var member_list = $('#member_search_result');
  
  function appendUsers(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
                </div>`
    searchResult.append(html);
  }

  function appendNewMembers(name, user_id) {
    var html = `<div class='chat-group-user clearfix js-new-member' id='${ user_id } '>
                  <input name='group[user_ids][]' type='hidden' value='${ user_id } ' id= 'group_user_ids'>
                  <p class='chat-group-user__name'>${ name } </p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    member_list.append(html);
  }


  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ msg }</p>
                </div>`
    searchResult.append(html);
  }

  $(function(){
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
              appendUsers(user);
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

    $(function(){
      $('#user-search-result').on("click", '.user-search-add', function() {
        var user_id = $(this).attr('data-user-id');
        var name = $(this).attr('data-user-name');
        $(this).parent().remove();
        appendNewMembers(name, user_id);
      });
      
      $(document).on("click", '.user-search-remove', function() {
        $(this).parent().remove();
      });
    });
  });
});