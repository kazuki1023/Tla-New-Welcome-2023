import BuildTimeStars from './buildTimeStars'
import Head from 'next/head'
import Script from 'next/script'
import $ from "jquery"
import { useEffect } from 'react'


export default function Home() {
  useEffect(() => {
    <>
    <BuildTimeStars/>
    <Script src="https://cdnjs.cloudflare.com/ajax/libs/vegas/2.4.4/vegas.min.js" strategy='beforeInteractive'></Script>
    </>
/*===========================================================*/
/* 機能編 5-1-1 ドロップダウンメニュー（上）*/
/*===========================================================*/
//ドロップダウンの設定を関数でまとめる
function mediaQueriesWin(){
	var width = $(window).width();
	if(width <= 960) {//横幅が960px以下の場合
		$(".has-child>a").off('click');	//has-childクラスがついたaタグのonイベントを複数登録を避ける為offにして一旦初期状態へ
		$(".has-child>a").on('click', function() {//has-childクラスがついたaタグをクリックしたら
			var parentElem =  $(this).parent();// aタグから見た親要素の<li>を取得し
			$(parentElem).toggleClass('active');//矢印方向を変えるためのクラス名を付与して
			$(parentElem).children('ul').stop().slideToggle(500);//liの子要素のスライドを開閉させる※数字が大きくなるほどゆっくり開く
			return false;//リンクの無効化
		});
	}else{//横幅が960px以上の場合
		$(".has-child>a").off('click');//has-childクラスがついたaタグのonイベントをoff(無効)にし
		$(".has-child>a").removeClass('active');//activeクラスを削除
		$('.has-child').children('ul').css("display","");//スライドトグルで動作したdisplayも無効化にする
	}
}

/*===========================================================*/
/* 機能編 5-1-6 スクロール途中から上部固定 */
/*===========================================================*/

//スクロール途中からヘッダーを出現させるための設定を関数でまとめる
function FixedAnime() {
	var elemTop = $('#service').offset().top;//#serviceの位置まできたら
	var scroll = $(window).scrollTop();

	if(scroll <= 0){//上から20pxスクロールされたら
		$('#header').addClass('DownMove');//DownMoveというクラス名を除き
	} else if (scroll >= elemTop){
			$('#header').removeClass('UpMove');//#headerについているUpMoveというクラス名を除く
			$('#header').addClass('DownMove');//#headerについているDownMoveというクラス名を付与

		}else{
			if($('#header').hasClass('DownMove')){//すでに#headerにDownMoveというクラス名がついていたら
				$('#header').removeClass('DownMove');//DownMoveというクラス名を除き
				$('#header').addClass('UpMove');//UpnMoveというクラス名を付与
			}
		}
}

/*===========================================================*/
/* 機能編 5-1-11 クリックしたらナビが上から下に出現 */
/*===========================================================*/

$(".g-nav-openbtn").click(function () {//ボタンがクリックされたら
	$(this).toggleClass('active');//ボタン自身に activeクラスを付与し
    $("#g-nav").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
});

$("#g-nav a").click(function () {//ナビゲーションのリンクがクリックされたら
    $(".g-nav-openbtn").removeClass('active');//ボタンの activeクラスを除去し
    $("#g-nav").removeClass('panelactive');//ナビゲーションのpanelactiveクラスも除去
});

/*===========================================================*/
/*機能編 8-1-4 ページの指定の範囲内で出現（右から左）*/
/*===========================================================*/

//スクロールした際の動きを関数でまとめる
function setFadeElement(){
	var windowH = $(window).height();	//ウィンドウの高さを取得
	var scroll = $(window).scrollTop(); //スクロール値を取得

    //出現範囲の指定
	var contentsTop = Math.round($('#contact').offset().top);	//要素までの高さ四捨五入した値を取得
	var contentsH = $('#contact').outerHeight(true);	//要素の高さを取得

    //2つ目の出現範囲の指定※任意
	var contentsTop2 = Math.round($('#footer').offset().top);	//要素までの高さ四捨五入した値を取得
	var contentsH2 = $('#footer').outerHeight(true);//要素の高さを取得

    //出現範囲内に入ったかどうかをチェック
	if(scroll+windowH >= contentsTop && scroll+windowH  <= contentsTop+contentsH){
		$("#page-top").addClass("LeftMove");    //入っていたらLeftMoveをクラス追加
		$("#page-top").removeClass("RightMove");   //RightMoveを削除
		$(".hide-btn").removeClass("hide-btn");	  //hide-btnを削除
	}//2つ目の出現範囲に入ったかどうかをチェック※任意
    else if(scroll+windowH >= contentsTop2 && scroll+windowH <= contentsTop2+contentsH2){
		$("#page-top").addClass("LeftMove");    //入っていたらLeftMoveをクラス追加
		$("#page-top").removeClass("RightMove");   //RightMoveを削除
	}//それ以外は
    else{
        if(!$(".hide-btn").length){				//サイト表示時にRightMoveクラスを一瞬付与させないためのクラス付け。hide-btnがなければ下記の動作を行う
        $("#page-top").addClass("RightMove");  //RightMoveをクラス追加
		$("#page-top").removeClass("LeftMove"); //LeftMoveを削除
        }
	}
}

// #page-topをクリックした際の設定
$('#page-top').click(function () {
    $('body,html').animate({
        scrollTop: 0//ページトップまでスクロール
    }, 500);//ページトップスクロールの速さ。数字が大きいほど遅くなる
    return false;//リンク自体の無効化
});

/*===========================================================*/
/*機能編 5-4-1タブメニュー*/
/*===========================================================*/

//任意のタブにURLからリンクするための設定
function GethashID (hashIDName){
	if(hashIDName){
		//タブ設定
		$('.tab li').find('a').each(function() { //タブ内のaタグ全てを取得
			var idName = $(this).attr('href'); //タブ内のaタグのリンク名（例）#lunchの値を取得	
			if(idName == hashIDName){ //リンク元の指定されたURLのハッシュタグ（例）http://example.com/#lunch←この#の値とタブ内のリンク名（例）#lunchが同じかをチェック
				var parentElm = $(this).parent(); //タブ内のaタグの親要素（li）を取得
				$('.tab li').removeClass("active"); //タブ内のliについているactiveクラスを取り除き
				$(parentElm).addClass("active"); //リンク元の指定されたURLのハッシュタグとタブ内のリンク名が同じであれば、liにactiveクラスを追加
				//表示させるエリア設定
				$(".area").removeClass("is-active"); //もともとついているis-activeクラスを取り除き
				$(hashIDName).addClass("is-active"); //表示させたいエリアのタブリンク名をクリックしたら、表示エリアにis-activeクラスを追加
			}
		});
	}
}

//タブをクリックしたら
$('.tab a').on('click', function() {
	var idName = $(this).attr('href'); //タブ内のリンク名を取得
	GethashID (idName);//設定したタブの読み込みと
	return false;//aタグを無効にする
});


// 上記の動きをページが読み込まれたらすぐに動かす
$(window).on('load', function () {
    $('.tab li:first-of-type').addClass("active"); //最初のliにactiveクラスを追加
    $('.area:first-of-type').addClass("is-active"); //最初の.areaにis-activeクラスを追加
	var hashName = location.hash; //リンク元の指定されたURLのハッシュタグを取得
	GethashID (hashName);//設定したタブの読み込み
});

//タブをクリックしたら
$('.tab a').on('click', function() {
	var idName = $(this).attr('href'); //タブ内のリンク名を取得	
	GethashID (idName);//設定したタブの読み込みと
	return false;//aタグを無効にする
});

/*===========================================================*/
/* 機能編 6-1-4 動きを組み合わせて全画面で見せる*/
/*===========================================================*/

//画像の設定

var windowwidth = window.innerWidth || document.documentElement.clientWidth || 0;
		if (windowwidth > 768){
			var responsiveImage = [//PC用の画像
				{ src: 'http://localhost:3000/img/summercamp/IMG_0500.jpg'},
				{ src: '/img/summercamp/IMG_0824.jpg'},
				{ src: '/img/logo/IMG_2305.jpg'}
			];
		} else {
			var responsiveImage = [//タブレットサイズ（768px）以下用の画像
      { src: '/img/summercamp/IMG_0500.jpg'},
      { src: '/img/summercamp/IMG_0824.jpg'},
      { src: '/img/logo/IMG_2305.jpg'}
			];
		}

//Vegas全体の設定
//  vegasを導入

console.log($('.slider')[0]);

<BuildTimeStars/>
// $('.slider')[0].vegas({
// 		overlay: false,//画像の上に網線やドットのオーバーレイパターン画像を指定。
// 		transition: 'fade2',//切り替わりのアニメーション。http://vegas.jaysalvat.com/documentation/transitions/参照。fade、fade2、slideLeft、slideLeft2、slideRight、slideRight2、slideUp、slideUp2、slideDown、slideDown2、zoomIn、zoomIn2、zoomOut、zoomOut2、swirlLeft、swirlLeft2、swirlRight、swirlRight2、burnburn2、blurblur2、flash、flash2が設定可能。
// 		transitionDuration: 1500,//切り替わりのアニメーション時間をミリ秒単位で設定
// 		delay: 2500,//スライド間の遅延をミリ秒単位で。
// 		animationDuration: 1000,//スライドアニメーション時間をミリ秒単位で設定
// 		animation: 'random',//スライドアニメーションの種類。http://vegas.jaysalvat.com/documentation/transitions/参照。kenburns、kenburnsUp、kenburnsDown、kenburnsRight、kenburnsLeft、kenburnsUpLeft、kenburnsUpRight、kenburnsDownLeft、kenburnsDownRight、randomが設定可能。
// 		slides: responsiveImage,//画像設定を読む
//         timer:false,//プログレスバー非表示
// 	});
console.log($('.slider')[0].vegas);



/*===========================================================*/
/* 機能編 7-2-2 虫眼鏡マークをクリックすると全画面表示で検索窓が出現 */
/*===========================================================*/

//開くボタンを押した時には
$(".open-btn").on("click", function () {
    $(".search-wrap").addClass('panelactive');//#search-wrapへpanelactiveクラスを付与
	$('.search-text').focus();//テキスト入力のinputにフォーカス
});

//閉じるボタンを押した時には
$(".close-btn").click(function () {
    $(".search-wrap").removeClass('panelactive');//#search-wrapからpanelactiveクラスを除去
});

/*===========================================================*/
/* 印象編 4 最低限おぼえておきたい動き */
/*===========================================================*/

// 動きのきっかけの起点となるアニメーションの名前を定義
function fadeAnime(){

    // 印象編 4-9、4-10 背景色が伸びて出現（左から・右から）中の要素が出現
    $('.bgappearTrigger').each(function(){ //bgappearTriggerというクラス名が
		var elemPos = $(this).offset().top-50;//要素より、50px上の
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight){
			$(this).addClass('bgappear');// 画面内に入ったらbgappearというクラス名を追記
		}else{
			$(this).removeClass('bgappear');// 画面外に出たらbgappearというクラス名を外す
		}
	});
    //印象編 4-9 背景色が伸びて出現（左から）
	$('.bgLRextendTrigger').each(function(){ //bgLRextendTriggerというクラス名が
		var elemPos = $(this).offset().top-50;//要素より、50px上の
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight){
			$(this).addClass('bgLRextend');// 画面内に入ったらbgLRextendというクラス名を追記
		}else{
			$(this).removeClass('bgLRextend');// 画面外に出たらbgLRextendというクラス名を外す
		}
	});	
    //印象編 4-9 背景色が伸びて出現（右から）
    $('.bgRLextendTrigger').each(function(){ //bgRLextendTriggerというクラス名が
		var elemPos = $(this).offset().top-50;//要素より、50px上の
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight){
			$(this).addClass('bgRLextend');// 画面内に入ったらbgRLextendというクラス名を追記
		}else{
			$(this).removeClass('bgRLextend');// 画面外に出たらbgRLextendというクラス名を外す
		}
	});
    //service-areaスタート
      $('.service-area').each(function(){ //service-areaというクラス名が
		var elemPos = $(this).offset().top-50;//要素より、50px上の
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight){
			$(this).addClass('startwd');// 画面内に入ったらstartwdというクラス名を追記
		}else{
			$(this).removeClass('startwd');// 画面外に出たらstartwdというクラス名を外す
		}
	});
}

/*===========================================================*/
/*  印象編 8-6 アルファベットがランダムに変化して出現*/
/*===========================================================*/
var arr = []
//初期値の設定
function TypingInit() {
	$('.js_typing').each(function (i) { //js_typingクラスを全て処理をおこなう
		arr[i] = new ShuffleText(this);//動作させるテキストを配列に格納
	});
}
//スクロールした際のアニメーションの設定
function TypingAnime() {
	$(".js_typing").each(function (i) {
		var elemPos = $(this).offset().top - 50;//要素より、50px上の
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight) {
			if(!$(this).hasClass("endAnime")){//endAnimeのクラスがあるかチェック
				arr[i].start();//配列で登録テキストのアニメーションをおこなう
				arr[i].duration = 800;//テキストが最終変化するまでの時間※規定値600
				$(this).addClass("endAnime");//１度アニメーションした場合はendAnimeクラスを追加
			}
		}else{
			$(this).removeClass("endAnime"); //範囲外にスクロールした場合はendAnimeのクラスを削除
		}
	});
}

/*===========================================================*/
/* 関数をまとめる */
/*===========================================================*/


// ページがリサイズされたら動かしたい場合の記述
$(window).resize(function() {
	mediaQueriesWin();// 機能編 5-1-1 ドロップダウンメニュー（上）の関数を呼ぶ
});

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
	FixedAnime();// 機能編 5-1-6 スクロール途中から上部固定
	setFadeElement();// 機能編 8-1-4 ページの指定の範囲内で出現（右から左）の関数を呼ぶ
    fadeAnime();// 印象編 4 最低限おぼえておきたい動きの関数を呼ぶ
	TypingInit(); // 印象編 8-6 アルファベットがランダムに変化して出現 初期設定
	TypingAnime();// 印象編 8-6 アルファベットがランダムに変化して出現の関数を呼ぶ
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on('load',function(){

    $("#splash-logo").delay(1200).fadeOut('slow');//ロゴを1.2秒でフェードアウトする記述

    //=====ここからローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJSをまとめる
    $("#splash").delay(1500).fadeOut('slow',function(){
    $('body').addClass('appear');//フェードアウト後bodyにappearクラス付与 
    mediaQueriesWin();// 機能編 5-1-1 ドロップダウンメニュー（上）の関数を呼ぶ
	FixedAnime();// 機能編 5-1-6 スクロール途中から上部固定
	setFadeElement();// 機能編 8-1-4  ページトップリンク:ページの指定の範囲内で出現（右から左）の関数を呼ぶ

    /*機能編 5-4-1タブメニューの読み込み*/
    var hashName = location.hash; //リンク元の指定されたURLのハッシュタグを取得
	GethashID (hashName);//設定したタブの読み込み

	});
    //=====ここまでローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJSをまとめる

    /*===========================================================*/
    /*機能編 4-2-4背景色が伸びる（左から右） */
    /*===========================================================*/

    //=====ここから背景が伸びた後に動かしたいJSをまとめる
    $('.splashbg').on('animationend', function() {

    /* 印象編 4 最低限おぼえておきたい動きの関数を呼ぶ*/
    fadeAnime();
    // 印象編 8-6 アルファベットがランダムに変化して出現
	$(".endAnime").removeClass("endAnime");
	TypingInit(); //印象編 8-6 アルファベットがランダムに変化して出現 初期設定
	TypingAnime();//印象編 8-6 アルファベットがランダムに変化して出現

    });
    //=====ここまで背景が伸びた後に動かしたいJSをまとめる
    
});// ここまでページが読み込まれたらすぐに動かしたい場合の記述

    
  }, [])
  
  
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/vegas/2.4.4/vegas.min.js" strategy='beforeInteractive' ></script>
        <BuildTimeStars/>
      </Head>
      <main>
      <>
  <meta charSet="UTF-8" />
  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>tla 新歓サイト</title>
  {/*=============Google Font ===============*/}
  <link
    href="https://fonts.googleapis.com/css?family=Noto+Sans+JP%7COswald&display=swap"
    rel="stylesheet"
  />
  {/*==============レイアウトを制御する独自のCSSを読み込み===============*/}
  {/*機能編 6-1-4 動きを組み合わせて全画面で見せる*/}
  <link
    rel="stylesheet"
    type="text/css"
    href="https://cdnjs.cloudflare.com/ajax/libs/vegas/2.4.4/vegas.min.css"
  />
  {/*機能編 6-2-1 複数の画像を一覧で見せる*/}
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.10.0/css/lightbox.min.css"
  />
  {/* 人数比、学部比のグラフ作成の外部ライブラリ */}
  {/* 実際のグラフ */}
  {/*自作のCSS*/}
  <link rel="stylesheet" type="text/css" href="css/reset.css" />
  <link rel="stylesheet" type="text/css" href="css/parts.css" />
  <link rel="stylesheet" type="text/css" href="css/layout.css" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/vegas/2.4.4/vegas.min.js" strategy='beforeInteractive' ></script>
  <header id="header">
    {/* <div className="header_logo">
      <img src="./img/logo/IMG_1375.jpg" alt="" className="header_logo_img" />
    </div> */}
    <div className="g-nav-openbtn">
      <div className="openbtn-area">
        <span />
        <span />
        <span />
      </div>
    </div>
    <nav id="g-nav">
      <div id="g-nav-list">
        <ul id="g-navi" className="nav01c">
          <li>
            <a href="#">Top</a>
          </li>
          <li>
            <a href="#news_guide">News</a>
          </li>
          <li>
            <a href="#service">練習頻度 / 練習場所</a>
          </li>
          <li>
            <a href="#ratio_guide">男女比 &amp; 学部比</a>
          </li>
          <li>
            <a href="#appeal_guide">TLAの魅力</a>
          </li>
          <li>
            <a href="#event_guide">イベント</a>
          </li>
        </ul>
      </div>
    </nav>
    <div className="open-btn" />
  </header>
  <div className="search-wrap" id="search-wrap">
    <div className="close-btn">
      <span />
      <span />
    </div>
    <div className="search-area">
      <form role="search" method="get" action="">
        <input
          type="text"
          defaultValue=""
          name=""
          id="search-text"
          className="search-text"
          placeholder="search"
        />
        <input type="submit" id="searchsubmit" defaultValue="" />
      </form>
      {/*/search-area*/}
    </div>
    {/*/search-wrap*/}
  </div>
  <section id="vidual-area">
    <div id="slider-area" className="bgextend bgRLextendTrigger">
      <div className="bgappearTrigger">
        <div id="slider" className='slider'/>
      </div>
      {/*/slider-area*/}
    </div>
    <h2>
      <span className="js_typing">Tennis</span>
      <br />
      <span className="js_typing">Lovers</span>
      <br />
      <span className="js_typing">Association</span>
    </h2>
    <dl>
      <dt>Follow Us</dt>
      <dd>
        <ul className="main_sns">
          <li>
            <a
              href="https://instagram.com/keio_tla_2023?igshid=YmMyMTA2M2Y="
              className="main_sns_item"
              target="_blank"
            >
              <img src="./img/logo/icon-instagram.svg" alt="" />
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/keio_tla_2022_?s=21&t=wRnOSeKC4hdJxhIjLr_weA"
              className="main_sns_item"
              target="_blank"
            >
              <img src="./img/logo/icon-twitter.svg" alt="" />
            </a>
          </li>
        </ul>
      </dd>
    </dl>
    <div className="scrolldown1">
      <span id="news_guide">Scroll</span>
    </div>
    {/*/vidual-area*/}
  </section>
  <main id="main-area">
    <section id="news">
      <h2 className="js_typing">News</h2>
      <div className="tab-area bgextend bgLRextendTrigger">
        <div className="bgappearTrigger">
          <ul className="tab">
            <li className="active">
              <a href="#topics">新歓</a>
            </li>
            <li>
              <a href="#parts">イベント</a>
            </li>
            {/* <li><a href="#cars">活動内容</a></li> */}
          </ul>
          <div className="tab-choice-area">
            <div id="topics" className="area is-active">
              <ul>
                <li>
                  <a href="">
                    <time dateTime="2022-12-17">2022.12.17</time>
                    改選を実施しました！
                  </a>
                </li>
                <li>
                  <a href="">
                    <time dateTime="2022-11-27">2022.11.27</time>
                    ミックスダブルス開催
                  </a>
                </li>
                <li>
                  <a href="#">
                    <time dateTime="2022-10-09">202210.09</time>球技大会開幕
                  </a>
                </li>
              </ul>
            </div>
            <div id="parts" className="area">
              <ul>
                <li>
                  <a href="">
                    <time dateTime="2022-12-17">20212.17</time>
                    改選を実施しました！
                  </a>
                </li>
                <li>
                  <a href="">
                    <time dateTime="2022-11-27">20211.27</time>
                    ミックスダブルス開催
                  </a>
                </li>
                <li>
                  <a href="#">
                    <time dateTime="2022-10-09">20210.09</time>球技大会開幕
                  </a>
                </li>
              </ul>
            </div>
            {/* <div id="cars" class="area">
          <ul>
            <li>
              <a href=""><time datetime="2022-12-17">20212.17</time>改選を実施しました！
              </a>
            </li>
            <li>
              <a href=""><time datetime="2022-11-27">20211.27</time>ミックスダブルス開催
              </a>
            </li>
            <li>
              <a href="#"><time datetime="2022-10-09">20210.09</time>球技大会開幕
              </a>
            </li>
          </ul>
        </div> */}
          </div>
        </div>
      </div>
    </section>
    <section id="service">
      <h2 className="js_typing">慶應公認サークルTLA</h2>
      <p className="service-lead">
        <span className="bgextend bgRLextendTrigger">
          <span className="bgappearTrigger">
            TLAは今年で設立64年目の歴史あるサークル
          </span>
        </span>
      </p>
      <div className="service-area">
        <section className="bgextend bgLRextendTrigger">
          <div className="bgappearTrigger">
            <header>
              <h3 className="js_typing">練習頻度 / 練習場所</h3>
              <h4 className="js_typing">練習頻度</h4>
              <p>月曜 ~ 金曜の週５で活動中</p>
              <p>参加は自由、自分の予定に合わせて練習できます</p>
            </header>
            <h4 className="js_typing">練習場所</h4>
            <p>練習は多摩川のコート、希望があれば新横浜や大井町でも !</p>
            <p>日吉駅から5分</p>
            <p>日吉・三田から乗換なし</p>
            <a href="#contact" className="btnlinestretches2">
              DM
            </a>
          </div>
          <div className="service-img-wrapper bgextend bgLRextendTrigger">
            <div className="bgappearTrigger">
              <div className=" service-img-practice" />
            </div>
          </div>
          <span id="ratio_guide" />
        </section>
        <section className="bgextend bgLRextendTrigger">
          <div className="bgappearTrigger">
            <header>
              <h3 className="js_typing">男女比 &amp; 学部比</h3>
              <p>現在約140人が在籍中</p>
            </header>
            <a href="#contact" className="btnlinestretches2">
              DM
            </a>
          </div>
          <div className="ratio_chart">
            <div className="sex_chart" />
            <div className="faculty_chart" />
          </div>
          <div className="service-img-wrapper bgextend bgLRextendTrigger">
            <div className="bgappearTrigger">
              <div className="service-img01 service-img-propotion" />
            </div>
          </div>
          <span id="appeal_guide" />
        </section>
        <section className="bgextend bgLRextendTrigger">
          <div className="bgappearTrigger">
            <header>
              <h3 className="js_typing">TLAの魅力</h3>
              <p>中規模だからみんな仲良し</p>
              <p>月 ~ 金のいつ参加してもOK</p>
              <p>全体での飲み会なし ×</p>
              <p>テニサー部費最安値</p>
              <p>今年で設立64年目</p>
            </header>
            <a href="#contact" className="btnlinestretches2">
              DM
            </a>
          </div>
          <div className="service-img-wrapper bgextend bgLRextendTrigger">
            <div className="bgappearTrigger">
              <div className="service-img-appeal" />
            </div>
          </div>
        </section>
        <h3 className="js_typing">夏合宿</h3>
        <div className="service-img-wrapper bgextend bgLRextendTrigger">
          <div className="bgappearTrigger">
            <div className="service-img02" />
          </div>
        </div>
      </div>
    </section>
    <div className="news-img-wrapper bgextend bgRLextendTrigger">
      <div className="bgappearTrigger">
        <div className="news-img" />
      </div>
    </div>
    <div className="service-img-wrapper bgextend bgLRextendTrigger summercamp">
      <div className="bgappearTrigger">
        <div className="service-img02" />
      </div>
      <span id="event_guide" />
    </div>
    <h3 className="js_typing event_title">イベント</h3>
    <ul id="gallery" className="gallery">
      <li className="bgextend bgLRextendTrigger zoomInRotate">
        <div className="bgappearTrigger">
          {/* <a
            href="./img/plan/IMG_0691.jpg"
            data-lightbox="gallery-group"
            data-title="2022.11. 球技大会開幕！！！"
          > */}
            <img src="./img/plan/IMG_0691.jpg" alt="" />
          {/* </a> */}
        </div>
      </li>
      <li className="bgextend bgLRextendTrigger zoomInRotate">
        <div className="bgappearTrigger">
          {/* <a
            href="./img/plan/firstgradeCompa.jpg"
            data-lightbox="gallery-group"
            data-title="2022.06 １年生コンパ"
          > */}
            <img src="./img/plan/firstgradeCompa.jpg" alt="" />
          {/* </a> */}
        </div>
      </li>
      <li className="bgextend bgLRextendTrigger zoomInRotate">
        <div className="bgappearTrigger">
          {/* <a
            href="./img/plan/IMG_2306.jpg"
            data-lightbox="gallery-group"
            data-title="2022.09? 女子会？？？"
          > */}
            <img src="./img/plan/IMG_2306.jpg" alt="" />
          {/* </a> */}
        </div>
      </li>
      <li className="bgextend bgLRextendTrigger zoomInRotate">
        <div className="bgappearTrigger">
          {/* <a
            href="./img/plan/IMG_1728.jpg"
            data-lightbox="gallery-group"
            data-title="2022.07 最修練アフター!!!"
          > */}
            <img src="./img/plan/IMG_1728.jpg" alt="" />
          {/* </a> */}
        </div>
      </li>
      <li className="bgextend bgLRextendTrigger zoomInRotate">
        <div className="bgappearTrigger">
          {/* <a
            href="./img/plan/IMG_4135 .JPG"
            data-lightbox="gallery-group"
            data-title="2022.05 練習終わり！"
          > */}
            <img src="./img/plan/IMG_4135 .JPG" alt="" />
          {/* </a> */}
        </div>
      </li>
      <li className="bgextend bgLRextendTrigger zoomInRotate">
        <div className="bgappearTrigger">
          {/* <a
            href="./img/plan/IMG_2547.jpg"
            data-lightbox="gallery-group"
            data-title="2022.8 鎌倉企画"
          > */}
            <img src="./img/plan/IMG_2547.jpg" alt="" />
          {/* </a> */}
        </div>
      </li>
      <li className="bgextend bgLRextendTrigger zoomInRotate">
        <div className="bgappearTrigger">
          {/* <a
            href="./img/summercamp/IMG_2097.jpg"
            data-lightbox="gallery-group"
            data-title="2022.08 夏合宿、サークル対抗！"
          > */}
            <img src="./img/summercamp/IMG_2097.jpg" alt="" />
          {/* </a> */}
        </div>
      </li>
      <li className="bgextend bgLRextendTrigger zoomInRotate">
        <div className="bgappearTrigger">
          {/* <a
            href="./img/summercamp/IMG_3092.jpg"
            data-lightbox="gallery-group"
            data-title="メンバー合宿"
          > */}
            <img src="./img/summercamp/IMG_3092.jpg" alt="" />
          {/* </a> */}
        </div>
      </li>
    </ul>
    <div className="bgextend bgLRextendTrigger">
      <div className="bgappearTrigger">
        <section id="contact">
          <div className="contact-detail">
            <h2>Contact</h2>
            <p>instagram,twitterのDMにて気軽にお問い合わせください</p>
          </div>
          <div className="contact-tel">
            <ul className="contact_sns">
              <li>
                <a
                  href="https://instagram.com/keio_tla_2023?igshid=YmMyMTA2M2Y="
                  className="main_sns_item"
                  target="_blank"
                >
                  <img src="./img/logo/icon-instagram.svg" alt="" />
                </a>
              </li>
              {/*ｕ*/}
              <ul>
                <li>
                  <a
                    href="https://twitter.com/keio_tla_2022_?s=21&t=wRnOSeKC4hdJxhIjLr_weA"
                    className="main_sns_item"
                    target="_blank"
                  >
                    <img src="./img/logo/icon-twitter.svg" alt="" />
                  </a>
                </li>
              </ul>
            </ul>
          </div>
        </section>
      </div>
    </div>
  </main>
  <footer id="footer">
    <div className="footer-info">
      <p className="footer-logo">TLA</p>
      {/* <ul>
      <li><dl><dt>TEL</dt><dd><a href="tel:03-1234-5678">03-1234-5678</a></dd></dl></li>
      <li><dl><dt>営業時間</dt><dd>平日 9:30～18:00</dd><dd>土・日・祝日 10:30～19：00</dd></dl></li>
  </ul> */}
    </div>
    <div className="footer-link">
      <ul>
        <li>
          <a href="#">Top</a>
        </li>
        <li>
          <a href="#news_guide">News</a>
        </li>
        <li>
          <a href="#service">practice</a>
        </li>
        <li>
          <a href="#ratio_guide">ratio</a>
        </li>
        <li>
          <a href="#appeal_guide">魅力</a>
        </li>
        <li>
          <a href="#event_guide">イベント</a>
        </li>
      </ul>
      <small>Copyright © TLA.</small>
    </div>
    <p id="page-top" className="hide-btn">
      <a href="#">
        <span />
      </a>
    </p>
  </footer>
  {/*/container*/}
  {/*=============JS ===============*/}
  {/*jQuery*/}
  {/*機能編 6-1-4 動きを組み合わせて全画面で見せる*/}
  {/*機能編 6-2-1 複数の画像を一覧で見せる*/}
  {/*印象編 8-6 アルファベットがランダムに変化して出現*/}
  {/*自作のJS*/}
    <Script src="https://cdnjs.cloudflare.com/ajax/libs/vegas/2.4.4/vegas.min.js" strategy='beforeInteractive'></Script>
    <Script src="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.10.0/js/lightbox.min.js"></Script>
    <Script src="https://cdn.jsdelivr.net/npm/shuffle-text@0.3.0/build/shuffle-text.min.js"></Script>
</>

      </main>
    </>
  )
}
