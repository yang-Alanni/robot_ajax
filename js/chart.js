$(function () {
  resetui();
  // 点击发送按钮，把输入的内容显示在页面
  $(".input_sub").on("click", function () {
    var text = $(".input_txt").val().trim();
    if (text <= 0) return $(".input_txt").val("");
    $(".talk_list").append(`
       <li class="right_word">
            <img src="img/person02.png" /> <span>${text}</span>
        </li>
       `);
    $(".input_txt").val("");
    //    重置滚动条
    resetui();
    getMsg(text);
  });

  //   获取聊天机器人发送回来的消息
  function getMsg(text) {
    $.ajax({
      method: "GET",
      url: "http://www.liulongbin.top:3006/api/robot",
      data: {
        spoken: text,
      },
      success: function (res) {
        // console.log(res);
        if (res.message === "success") {
          var msg = res.data.info.text;
          $(".talk_list").append(`
            <li class="left_word">
            <img src="img/person01.png" /> <span>${msg}</span>
          </li>
            `);
          // 重置滚动条
          resetui();
          getVoice(msg);
        }
      },
    });
  }
  //   获取机器人聊天语言
  function getVoice(text) {
    $.ajax({
      method: "GET",
      url: "http://www.liulongbin.top:3006/api/synthesize",
      data: {
        text: text,
      },
      success: function (res) {
        console.log(res);
        if (res.status === 200) {
          $("#voice").attr("src", res.voiceUrl);
        }
      },
    });
  }
  //   点击回车发送消息
  $(".input_txt").on("keyup", function (e) {
    if (e.keyCode === 13) {
      $(".input_sub").click();
    }
  });
});
