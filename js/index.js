$(function () {

  $('.slick01').slick({
    autoplay: false,
    autoplaySpeed: 5000,
    appendDots: $('.dots'),
    dots: true,
    slidesToShow: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  });

  var $slider = $('#slider'); // スライダー
  var $thumnailItem = $('#thumnail-list .thumbnail-item'); // サムネイル画像アイテム

  if ($slider.length && $thumnailItem) {

    // サムネイル画像アイテムに data-index でindex番号を付与
    $thumnailItem.each(function () {
      var index = $thumnailItem.index(this);
      $(this).attr("data-index", index);
    });

    // スライダー初期化後、カレントのサムネイル画像にクラス「thumbnail-current」を付ける
    // 「slickスライダー作成」の前にこの記述は書いてください。
    $slider.on('init', function (slick) {
      var index = $(".slide-item.slick-slide.slick-current").attr("data-slick-index");
      $('#thumbnail-list .thumbnail-item' + '[data-index="' + index + '"]').addClass("thumbnail-current");
    });

    //slickスライダー初期化
    $slider.slick({
      autoplay: false,
      fade: true,
      arrows: true,
      // prevArrow:'<p class="arrow_left"></p>',
      // nextArrow:'<p class="arrow_right"></p>',
      infinite: false //これはつけましょう。
    });
    //サムネイル画像アイテムをクリックしたときにスライダー切り替え
    $thumnailItem.on('click', function () {
      var index = $(this).attr("data-index");
      $slider.slick("slickGoTo", index, false);
    });

    //サムネイル画像のカレントを切り替え
    $slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      $thumnailItem.each(function () {
        $(this).removeClass("thumbnail-current");
      });
      $('#thumbnail-list .thumbnail-item' + '[data-index="' + nextSlide + '"]').addClass("thumbnail-current");
    });

  }

  // ハンバーガーメニュー
  $('.js_menu_mobile_toggle').on('click', function () {
    $('.js_head_nav_mobile').toggleClass('menu_mobile_show');
    $('.btn-open').toggleClass('btn-close');
  });

});

//chart.js
//idを取得して変数に代入

var chartEl1 = document.getElementById("chart01");
var chartEl2 = document.getElementById("chart02");
var chartFlag1 = false;
var chartFlag2 = false;

// 1つ目のグラフ
var chartFunc1 = function () {
  var ctx = chartEl1.getContext('2d');
  ctx.canvas.height = 70;
  chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ["なんとか", "テキスト", "漢字"],
      datasets: [{
        label: "Sample data",
        data: [54, 27, 19],
        backgroundColor: [
          '#0049A3',
          '#1D74F7',
          '#AEAEAE',
        ]
      }]
    },
    options: {
      legend: {
        labels: {
          fontColor: "#0049A3",
          fontSize: 14
        }
      }
    }
  });
};


// 2つ目のグラフ
var chartFunc2 = function () {
  var ctx = chartEl2.getContext('2d');
  ctx.canvas.height = 200;
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["Data1", "Data2", "Data3", "Data4", "Data5"],
      datasets: [{
        label: "Sample data",
        backgroundColor: "rgba(0,73,163,0.6)",
        data: [12, 19, 7, 10, 10]
      }]
    },
    options: {
      legend: {
        labels: {
          fontColor: "#0049A3",
          fontSize: 14
        }
      }
    }
  });
};

// スクロール処理
var graphAnim = function () {
  if (chartEl1 === null || chartEl2 === null) return;
  var wy = window.pageYOffset,
    //wb = wy + screen.height - 300, // スクリーンの最下部位置を取得
    wb = wy + window.innerHeight, // ブラウザの最下部位置を取得

    // チャートの位置を取得
    chartElPos1 = wy + chartEl1.getBoundingClientRect().top,
    chartElPos2 = wy + chartEl2.getBoundingClientRect().top;

  // チャートの位置がウィンドウの最下部位置を超えたら起動
  if (wb > chartElPos1 && chartFlag1 == false) {
    chartFunc1();
    chartFlag1 = true;
  }

  if (wb > chartElPos2 && chartFlag2 == false) {
    chartFunc2();
    chartFlag2 = true;
  }
};
window.addEventListener('load', graphAnim); // 読み込み時の処理
window.addEventListener('scroll', graphAnim); // スクロール時の処理

if (typeof AOS !== 'undefined') {
  AOS.init();
}
