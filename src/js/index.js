//var $ = require('jquery');

$(function(){


  //**********************************
  //1.TODO追加
  //**********************************
  $('.js-addTodo__submit').on('click', function(e){
    //=== リロードキャンセル ===
    e.preventDefault();
    //=== 変数格納 ===
    //入力内容を取得
    var text = $('.js-addTodo__input').val();
    //TODO一覧への追加要素
    var listItem = '<li class="todoList__item js-todoList__item" data-text="' + text + '">' +
                      '<i class="far fa-square todoList__checkBox js-todoList__checkBox--do"></i>' +
                      '<span class="todoList__text js-todoList__text">' + text + '</span>' +
                      '<input class="todoList__edit js-todoList__edit" type="text" value="' + text + '">' +
                      '<i class="fas fa-trash-alt todoList__trash js-todoList__trash"></i>' +
                   '</li>'
    //=== TODO一覧部分への追加処理 ===
    if(!text){
      $('.js-addTodo__valid').show();
    }else{
      $('.js-addTodo__valid').hide();
      $('.js-addTodo__input').val(''); //入力内容をTODO一覧部分追加時に空にする(内容は変数に格納済み)
      $('.js-todoList').prepend(listItem);
    }
  });

  //**********************************
  // 2.キーワード検索
  //**********************************
  //=== inputタグ内に入力があれば、検索をかける ===
  $('.js-search__box').on('keyup', function(){
    //検索キーワードを変数に格納
    var searchText = $(this).val();
    //=== liタグ群をeachメソッドでループ＋条件に引っかかったものだけを表示(そうでない場合、非表示) ===
    $('.js-todoList__item').each(function(index, element){
      //data-textの値を取得
      var text = $(element).data('text');
      if( text.match(new RegExp(searchText, "g")) ){
        $(element).show();
      }else{
        $(element).hide();
      }
    });
  });

  //**********************************
  //3.TASK一覧(TODOリスト一覧)
  //**********************************
  //=== 実行済みに変更＋未完了に戻す ===
  //実行済み変更処理
  $(document).on('click', '.js-todoList__checkBox--do', function(){
    //var $this = $(this); =>ハッシュ化(使うたびに、jQueryで操作できる形式に変換するので処理が遅くなる)
    $(this).removeClass('fa-square').addClass('fa-check-square')
           .removeClass('js-todoList__checkBox--do').addClass('js-todoList__checkBox--done')
           .closest('.js-todoList__item').addClass('todoList__item--done');
  });
  //未完了に戻す処理
  $(document).on('click', '.js-todoList__checkBox--done', function(){
    $(this).addClass('fa-square').removeClass('fa-check-square')
           .addClass('js-todoList__checkBox--do').removeClass('js-todoList__checkBox--done')
           .closest('.js-todoList__item').removeClass('todoList__item--done');
  });
  //=== TASKを削除 ===
  $(document).on('click', '.js-todoList__trash', function(){
    $(this).closest('.js-todoList__item').fadeOut('slow', function(){ $(this).remove(); });
  });

  //=== TODO内容編集 ===
  //編集エリア(inputタグ)表示＋テキスト表示エリア(spanタグ)非表示
  $(document).on('click', '.js-todoList__text', function(){
    $(this).hide().siblings('.js-todoList__edit').show();
  });
  //enterキーがダブルクリックされたら編集終了＋テキストエリアに反映
  $(document).on('keyup', '.js-todoList__edit', function(e){
    var changeText = $(this).val();
    if(changeText){
      if( e.keyCode === 13 && e.shiftKey === true){
        $(this).hide().siblings('.js-todoList__text').text(changeText).show()
        .closest('.js-todoList__item').attr('data-text', changeText);
      }
    }
  });


});
