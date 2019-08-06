$(document).on('turbolinks:load', function() {

  function buildMessageHTML(message) {
      var img = message.image.url ? `<img src= ${ message.image.url }>` : "";
      var html = `<div class="message" data-id= "${message.id}">
                    <div class="message__upper-info">
                      <div class="message__upper-info__talker">
                      ${message.user_name}
                      </div>
                      <div class="message__upper-info__date">
                      ${message.created_at}
                      </div>
                    </div>
                    <div class="message__text">
                      <p class="lower-message__content">
                      ${message.content}
                      </p>
                      ${img}
                    </div>
                  </div>`
      return html;
    };
  
    
    $('#new_message').on('submit', function(e) {
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action')
      
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      
      .done(function(data){
        var html = buildMessageHTML(data);
        $(".messages").append(html);
        $(".new_message")[0].reset();
        $(".messages").animate({ scrollTop: $(".messages")[0].scrollHeight});
      })
      
      .fail(function(){
        alert('メッセージを入力してください');
      })
      
      .always(function(){
        $('.form__submit').prop('disabled', false);
      })
  
    })
  
    var reloadMessages = function () {
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
        
        var last_message_id = $('.message:last').data("message-id");
  
        $.ajax({
          url: "api/messages",
          type: 'GET',
          dataType: 'json',
          data: {last_id: last_message_id}
        })
        .done(function (messages) {
          var insertHTML = '';        
          messages.forEach(function(message) {
            insertHTML = buildMessageHTML(message);
            $('.messages').append(insertHTML);
          });
        })
        
        .fail(function() {
          alert('自動更新に失敗しました。');
        });
  
       };     
      };
     setInterval(reloadMessages, 5000);       
});