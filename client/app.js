$( document ).ready(function() {
  loadMessages().then(function(response){
    drawMessages(response);
  }, function(error) {
    console.error("Failed!", error);
  });
});

$('#btn-send').click(function(e){
  e.preventDefault();
  sendMessage();
});

$('#msg-input').keypress(function (e) {
  if (e.which == 13) {
    sendMessage();
    return false;
  }
});

$('body').on('click', 'a.btn-remove', function() {
  message = $(this).closest('li');
  removeMessage(message.attr('id'));
});


var loadMessages = function() {
  return request('GET', 'http://localhost:4567/');
};

var sendMessage = function(){
  var msg = $('#msg-input').val();

  if(msg) {
    postMessage(msg).then(function(response){
      $('#msg-input').val("");
      addMessage(response);
    }, function(error) {
      console.error("Failed!", error);
    });
  }
};

var removeMessage = function(id) {
  deleteMessage(id).then(function(response){
    $('#'+id).remove();
  }, function(error) {
    console.error("Failed!", error);
  });
}

var postMessage = function(text) {
  return request('POST', 'http://localhost:4567/', {"text":text});
};

var deleteMessage = function(id) {
  return request('DELETE', 'http://localhost:4567/' + id);
};

var drawMessages = function(messages) {
  var dummy_message = $('#dummy-message li').clone();

  for (var i = 0; i < messages.length; i++) {
    appendMessage(messages[i]);
  }

  scrollToLast();
};

var addMessage = function(message) {
  appendMessage(message);
  scrollToLast();
};

var appendMessage = function(message) {
  var dummy_message = $('#dummy-message li').clone();

  dummy_message.find(".message-text").text(message.text);
  dummy_message.attr("id", message.id);
  $("ul#chat").append(dummy_message);
};

var scrollToLast = function() {
  $("#chat-panel").scrollTop($("#chat-panel")[0].scrollHeight);
};

var request = function(type, url, data) {
  data = typeof data !== 'undefined' ? data : {};

  return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
    req.open(type, url);

    req.onload = function() {
      if (req.status == 200) {
        resolve(JSON.parse(req.response));
      }
      else {
        reject(Error(req.statusText));
      }
    };

    req.onerror = function() {
      reject(Error("Network Error"));
    };

    if (type == 'POST') {
      req.setRequestHeader("Content-Type","application/json");
      req.send(JSON.stringify(data));
    }
    else {
      req.send();
    }
  });
};
