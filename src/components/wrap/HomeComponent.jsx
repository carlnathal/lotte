import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "jquery.easing";

function HomeComponent(props) {
  const [state, setState] = useState();

  const slideRef = useRef();

  //섹션1 슬라이드 애니메이션 변수
  const setId = useRef(0);
  const cnt = useRef(0);
  const playAutoSlide = useRef(true);

  //섹션4 슬라이드 애니메이션 변수
  const cntSec4 = useRef(0);

  //섹션5 슬라이드 애니메이션 변수
  const setIdSec5 = useRef(0);
  const cntSec5 = useRef(0);

  const slide = () => {
    const mainSlide = () => {
      $("#section1 .slide-wrap")
        .stop()
        .animate(
          { left: `${-100 * cnt.current}%` },
          2000,
          "easeOutCubic",
          () => {
            if (cnt.current > 2) {
              cnt.current = 0;
            }
            if (cnt < 0) {
              cnt.current = 2;
            }
            //마지막 페이크 슬라이드1이나 제일 처음 페이크 슬라이드3으로 이동해주는 역할
            $("#section1 .slide-wrap")
              .stop()
              .animate({ left: `${-100 * cnt.current}%` }, 0);
            const slideDots = [".slick-dots1", ".slick-dots2", ".slick-dots3"];
            slideDots.forEach((item, index) => {
              if (cnt.current === index) {
                $(item).addClass("on");
              } else {
                $(item).removeClass("on");
              }
            });
          }
        );
    };
    const nextCount = () => {
      cnt.current += 1;
      mainSlide();
    };
    const next = () => {
      cnt.current--;
      mainSlide();
    };
    const autoTimer = () => {
      if (playAutoSlide.current === true) {
        setId.current = setInterval(nextCount, 6000);
      }
    };
    autoTimer();
  };
  //슬라이드 양쪽 애로우 버튼 쇼 하이드 애니메이션
  //처음 렌더링시에 슬라이드 실행
  useEffect(() => {
    //슬라이드 양쪽 애로우 버튼 쇼 하이드 애니메이션
    document
      .querySelector("#section1 .slide-wrap")
      .addEventListener("mouseover", slideHoverArrowAddOn);
    document
      .querySelector(".slick-prev-arrow")
      .addEventListener("mouseover", slideHoverArrowAddOn);
    document
      .querySelector(".slick-next-arrow")
      .addEventListener("mouseover", slideHoverArrowAddOn);
    document
      .querySelector("#section1 .slide-wrap")
      .addEventListener("mouseout", slideHoverArrowRemoveOn);
    //섹션1 슬라이드

    slide();
    slideSec5();
    slideDragDrop();
    showGotop();
  }, []);

  //슬라이드 닷 클릭시 페이지 이동 애니메이션
  const onClickSlickDots = (e) => {
    clearInterval(setId.current);
    let index = 0;
    e.preventDefault();
    switch (e.target.className) {
      case "slick-dots slick-dots1":
        index = 0;
        break;
      case "slick-dots slick-dots2":
        index = 1;
        break;
      case "slick-dots slick-dots3":
        index = 2;
        break;
      default:
    }
    const changeSlide = (n) => {
      clearInterval(setId.current);
      slide();
      $(".slick-dots").removeClass("on");
      $(`.slick-dots${n + 1}`).addClass("on");
      $("#section1 .slide-wrap")
        .stop()
        .animate(
          { left: `${-100 * n}%` },
          2000,
          "easeOutCubic",
          function () {}
        );
    };

    changeSlide(index);
  };

  //슬라이드 양쪽 애로우 버튼 쇼 하이드 애니메이션
  const slideHoverArrowAddOn = (e) => {
    document.querySelector(".slick-prev-arrow").classList.add("on");
    document.querySelector(".slick-next-arrow").classList.add("on");
  };
  const slideHoverArrowRemoveOn = (e) => {
    document.querySelector(".slick-prev-arrow").classList.remove("on");
    document.querySelector(".slick-next-arrow").classList.remove("on");
  };
  //섹션1 슬라이드 재생 일시정지 버튼
  const onClickSlidePlayBtn = (e) => {
    e.target.classList.toggle("off");
    if (e.target.className === "off") {
      clearTimeout(setId.current);
      playAutoSlide.current = false;
    } else {
      playAutoSlide.current = true;
      slide();
    }
  };
  //이전 슬라이드 다음슬라이드 버튼 클릭 애니메이션
  const onClickPrevArrow = (e) => {
    e.preventDefault();

    const mainSlide = () => {
      console.log(cnt.current);
      $("#section1 .slide-wrap")
        .stop()
        .animate(
          { left: `${-100 * cnt.current}%` },
          600,
          "easeOutCubic",
          () => {
            if (cnt.current > 2) {
              cnt.current = 0;
            }
            if (cnt.current < 0) {
              cnt.current = 2;
            }
            //마지막 페이크 슬라이드1이나 제일 처음 페이크 슬라이드3으로 이동해주는 역할
            $("#section1 .slide-wrap")
              .stop()
              .animate({ left: `${-100 * cnt.current}%` }, 0);
            const slideDots = [".slick-dots1", ".slick-dots2", ".slick-dots3"];
            slideDots.forEach((item, index) => {
              if (cnt.current === index) {
                $(item).addClass("on");
              } else {
                $(item).removeClass("on");
              }
            });
          }
        );
    };
    if (!$("#section1 .slide-wrap").is(":animated")) {
      clearInterval(setId.current);
      cnt.current--;
      mainSlide();
      slide();
    }
  };
  const onClickNextArrow = (e) => {
    e.preventDefault();

    const mainSlide = () => {
      console.log(cnt.current);
      $("#section1 .slide-wrap")
        .stop()
        .animate(
          { left: `${-100 * cnt.current}%` },
          600,
          "easeOutCubic",
          () => {
            if (cnt.current > 2) {
              cnt.current = 0;
            }
            if (cnt.current < 0) {
              cnt.current = 2;
            }
            //마지막 페이크 슬라이드1이나 제일 처음 페이크 슬라이드3으로 이동해주는 역할
            $("#section1 .slide-wrap")
              .stop()
              .animate({ left: `${-100 * cnt.current}%` }, 0);
            const slideDots = [".slick-dots1", ".slick-dots2", ".slick-dots3"];
            slideDots.forEach((item, index) => {
              if (cnt.current === index) {
                $(item).addClass("on");
              } else {
                $(item).removeClass("on");
              }
            });
          }
        );
    };
    if (!$("#section1 .slide-wrap").is(":animated")) {
      clearInterval(setId.current);
      cnt.current++;
      mainSlide();
      slide();
    }
  };
  //섹션1 드래그 애니메이션
  const slideDragDrop = (e) => {
    let touchStart = 0;
    let touchEnd = 0;
    let mouseDown = false;
    let dragStart = 0;
    let dragEnd = 0;
    let winWidth = $(window).innerWidth();

    $("#section1").on({
      //마우스 다운과 마우스 업의 위치 서로 비교해서
      //다음페이지로 갈지 이전페이지로 갈지 결정
      mousedown(e) {
        winWidth = $(window).innerWidth();
        clearInterval(setId);
        mouseDown = true;
        touchStart = e.clientX;
        dragStart =
          e.clientX - $("#section1 .slide-wrap").offset().left - winWidth;
        //오프셋 레프트는 몇번째 섹션인지를 알려준다.
        //첫번째 섹션 자체도 앞에 하나가 더 마진으로 빠져 있으니까 -1690
      },
      mouseup(e) {
        touchEnd = e.clientX;
        //터치 스타트가 터치 엔드보다 큰 경우
        //터치 스타트가 오른쪽에 에 있다는 뜻
        //그러니까 다음 슬라이드로 가겠다는 뜻
        if (touchStart - touchEnd > 0) {
          const mainSlide = () => {
            console.log(cnt.current);
            $("#section1 .slide-wrap")
              .stop()
              .animate(
                { left: `${-100 * cnt.current}%` },
                600,
                "easeOutCubic",
                () => {
                  if (cnt.current > 2) {
                    cnt.current = 0;
                  }
                  if (cnt.current < 0) {
                    cnt.current = 2;
                  }
                  //마지막 페이크 슬라이드1이나 제일 처음 페이크 슬라이드3으로 이동해주는 역할
                  $("#section1 .slide-wrap")
                    .stop()
                    .animate({ left: `${-100 * cnt.current}%` }, 0);
                  const slideDots = [
                    ".slick-dots1",
                    ".slick-dots2",
                    ".slick-dots3",
                  ];
                  slideDots.forEach((item, index) => {
                    if (cnt.current === index) {
                      $(item).addClass("on");
                    } else {
                      $(item).removeClass("on");
                    }
                  });
                }
              );
          };
          if (!$("#section1 .slide-wrap").is(":animated")) {
            clearInterval(setId.current);
            cnt.current++;
            mainSlide();
            slide();
          }
        }
        //터치스타트가 터치 엔드보다 작은 경우
        //터치 스타트가 왼쪽에 있다는 뜻
        //그너니까 이전 슬라이드로 가겠다는 뜻
        if (touchStart - touchEnd < 0) {
          const mainSlide = () => {
            console.log(cnt.current);
            $("#section1 .slide-wrap")
              .stop()
              .animate(
                { left: `${-100 * cnt.current}%` },
                600,
                "easeOutCubic",
                () => {
                  if (cnt.current > 2) {
                    cnt.current = 0;
                  }
                  if (cnt.current < 0) {
                    cnt.current = 2;
                  }
                  //마지막 페이크 슬라이드1이나 제일 처음 페이크 슬라이드3으로 이동해주는 역할
                  $("#section1 .slide-wrap")
                    .stop()
                    .animate({ left: `${-100 * cnt.current}%` }, 0);
                  const slideDots = [
                    ".slick-dots1",
                    ".slick-dots2",
                    ".slick-dots3",
                  ];
                  slideDots.forEach((item, index) => {
                    if (cnt.current === index) {
                      $(item).addClass("on");
                    } else {
                      $(item).removeClass("on");
                    }
                  });
                }
              );
          };
          if (!$("#section1 .slide-wrap").is(":animated")) {
            clearInterval(setId.current);
            cnt.current--;
            mainSlide();
            slide();
          }
        }
        mouseDown = false;
      },
      mousemove(e) {
        if (mouseDown !== true) return;

        dragEnd = e.clientX;
        $("#section1 .slide-wrap").css({ left: dragEnd - dragStart });
      },
    });
  };
  //섹션3 호텔 브랜드 마우스 오버시에 아래 파라박스 및 배경 체인지 애니메이션
  const onMouseOverHotelBrand = (e) => {
    let showSlide = "";
    switch (e.target.className) {
      case "a-hotel1":
        showSlide = ".slide1";
        break;
      case "a-hotel2":
        showSlide = ".slide2";
        break;
      case "a-hotel3":
        showSlide = ".slide3";
        break;
      case "a-hotel4":
        showSlide = ".slide4";
        break;
      case "a-hotel5":
        showSlide = ".slide5";
        break;
      case "a-hotel6":
        showSlide = ".slide6";
        break;

      default:
        break;
    }
    $("#section3 .slide").not(showSlide).stop().animate({ opacity: 0 }, 300);
    $(`#section3 ${showSlide}`).stop().animate({ opacity: 1 }, 300);
    $(".hotels a").not(e.target).stop().animate({ opacity: 0.4 }, 600);
    $(".hotels a").not(e.target).next().stop().css({ zIndex: "0" });
    $(e.target).stop().next().css({ zIndex: "1" });
    $(".hotels a").not(e.target).next().stop().animate({ opacity: 0 }, 0);
    $(e.target).stop().animate({ opacity: 1 }, 600);
    $(e.target).next().stop().animate({ opacity: 1 }, 600);
    $(".hotels a")
      .not(e.target)
      .next()
      .find("h3")
      .stop()
      .animate({ top: `100px` }, 0);
    $(".hotels a")
      .not(e.target)
      .next()
      .find("p")
      .stop()
      .animate({ top: `100px` }, 0);
    $(".hotels a")
      .not(e.target)
      .next()
      .find("button")
      .stop()
      .animate({ top: `100px` }, 0);
    $(e.target).next().find("h3").stop().animate({ top: `0px` }, 500);
    $(e.target).next().find("p").stop().animate({ top: `0px` }, 600);
    $(e.target)
      .next()
      .find("button")
      .stop()
      .animate({ top: `0px` }, 650, "easeOutQuad");
  };
  //섹션4 prev-btn 애니메이션
  const onClickPrevBtn = (e) => {
    cntSec4.current += -1;
    $("#section4 .slide-wrap")
      .stop()
      .animate(
        { left: `${-100 * cntSec4.current}%` },
        600,
        "easeOutCubic",
        () => {
          if (cntSec4.current === -1) {
            cntSec4.current = 27;
          }
          if (cntSec4.current === 28) {
            cntSec4.current = 0;
          }
          $("#section4 .slide-wrap")
            .stop()
            .animate({ left: `${-100 * cntSec4.current}%` }, 0);
        }
      );
  };
  //섹션4 next-btn 애니메이션
  const onClickNextBtn = (e) => {
    cntSec4.current += 1;
    $("#section4 .slide-wrap")
      .stop()
      .animate(
        { left: `${-100 * cntSec4.current}%` },
        600,
        "easeOutCubic",
        () => {
          if (cntSec4.current === -1) {
            cntSec4.current = 27;
          }
          if (cntSec4.current === 28) {
            cntSec4.current = 0;
          }
          $("#section4 .slide-wrap")
            .stop()
            .animate({ left: `${-100 * cntSec4.current}%` }, 0);
        }
      );
  };

  //섹션5 슬라이드 애니메이션
  const slideSec5 = () => {
    const mainSlide = () => {
      $("#section5 .slide-wrap")
        .stop()
        .animate(
          { left: `${-100 * cntSec5.current}%` },
          2000,
          "easeOutCubic",
          () => {
            if (cntSec5.current > 3) {
              cntSec5.current = 0;
            }
            if (cntSec5 < 0) {
              cntSec5.current = 3;
            }
            //마지막 페이크 슬라이드1이나 제일 처음 페이크 슬라이드3으로 이동해주는 역할
            $("#section5 .slide-wrap")
              .stop()
              .animate({ left: `${-100 * cntSec5.current}%` }, 0);
            const slideDots = [
              ".sec5-slick-dots-1",
              ".sec5-slick-dots-2",
              ".sec5-slick-dots-3",
              ".sec5-slick-dots-4",
            ];
            slideDots.forEach((item, index) => {
              if (cntSec5.current === index) {
                $(item).addClass("on");
              } else {
                $(item).removeClass("on");
              }
            });
          }
        );
    };
    const nextCount = () => {
      cntSec5.current += 1;
      mainSlide();
    };
    const autoTimer = () => {
      setIdSec5.current = setInterval(nextCount, 6000);
    };
    autoTimer();
  };
  //섹션5 이전 슬라이드 다음슬라이드 버튼 클릭 애니메이션
  const onClickPrevArrowSec5 = (e) => {
    e.preventDefault();

    const mainSlide = () => {
      $("#section5 .slide-wrap")
        .stop()
        .animate(
          { left: `${-100 * cntSec5.current}%` },
          2000,
          "easeOutCubic",
          () => {
            if (cntSec5.current > 3) {
              cntSec5.current = 0;
            }
            if (cntSec5 < 0) {
              cntSec5.current = 3;
            }
            //마지막 페이크 슬라이드1이나 제일 처음 페이크 슬라이드3으로 이동해주는 역할
            $("#section5 .slide-wrap")
              .stop()
              .animate({ left: `${-100 * cntSec5.current}%` }, 0);
            const slideDots = [
              ".sec5-slick-dots-1",
              ".sec5-slick-dots-2",
              ".sec5-slick-dots-3",
              ".sec5-slick-dots-4",
            ];
            slideDots.forEach((item, index) => {
              if (cntSec5.current === index) {
                $(item).addClass("on");
              } else {
                $(item).removeClass("on");
              }
            });
          }
        );
    };
    if (!$("#section5 .slide-wrap").is(":animated")) {
      clearInterval(setIdSec5.current);
      cntSec5.current += -1;
      mainSlide();
      slideSec5();
    }
  };
  const onClickNextArrowSec5 = (e) => {
    e.preventDefault();

    const mainSlide = () => {
      $("#section5 .slide-wrap")
        .stop()
        .animate(
          { left: `${-100 * cntSec5.current}%` },
          2000,
          "easeOutCubic",
          () => {
            if (cntSec5.current > 3) {
              cntSec5.current = 0;
            }
            if (cntSec5 < 0) {
              cntSec5.current = 3;
            }
            //마지막 페이크 슬라이드1이나 제일 처음 페이크 슬라이드3으로 이동해주는 역할
            $("#section5 .slide-wrap")
              .stop()
              .animate({ left: `${-100 * cntSec5.current}%` }, 0);
            const slideDots = [
              ".sec5-slick-dots-1",
              ".sec5-slick-dots-2",
              ".sec5-slick-dots-3",
              ".sec5-slick-dots-4",
            ];
            slideDots.forEach((item, index) => {
              if (cntSec5.current === index) {
                $(item).addClass("on");
              } else {
                $(item).removeClass("on");
              }
            });
          }
        );
    };
    if (!$("#section5 .slide-wrap").is(":animated")) {
      clearInterval(setIdSec5.current);
      cntSec5.current += 1;
      mainSlide();
      slideSec5();
    }
  };
  //섹션5 슬라이드 재생 일시정지 버튼
  const onClickSlidePlayBtnSec5 = (e) => {
    e.target.classList.toggle("off");
    if (e.target.className === "off") {
      clearTimeout(setIdSec5.current);
    } else {
      slide();
    }
  };
  //풋터 패밀리 사이트 클릭시 올라오는 애니메이션
  const onClickFamilySite = (e) => {
    e.preventDefault();
    $(".family-site").slideToggle();
    document.querySelector(".other-site span").classList.toggle("on");
  };
  //풋터 아더 사이트 클릭시 해당 사이트 스팬에 배정
  const onClickOtherSite = (e) => {
    const clickInnerText = e.target.innerText;
    document.querySelector(".other-site span").innerText = clickInnerText;
    $(".family-site").slideToggle();
    document.querySelector(".other-site span").classList.toggle("on");
  };
  //스크롤시에 픽스드 메뉴에 고탑 이미지 나오게 하는 애니메이션
  const showGotop = () => {
    $(window).scroll(() => {
      let windowTop = $(window).scrollTop();
      if (windowTop > 0) {
        $("#gotop .row4 a").css({ display: "inline-block" });
        $("#gotop .row4 a")
          .stop()
          .animate({ height: "40px", opacity: "1" }, 1000);
      }
      if (windowTop === 0) {
        $("#gotop .row4 a").css({ display: "none" });
        $("#gotop .row4 a").stop().animate({ height: "0", opacity: "0" }, 1000);
      }
    });
  };
  //반응형 섹션3 파라박스 토글슬라이드
  const onClickResponseHotelA = (e) => {
    e.preventDefault();
    let showSlide = "";
    switch (e.target.className) {
      case "a-hotel response-hotel1":
        showSlide = $(".slide1");
        break;
      case "a-hotel response-hotel2":
        showSlide = $(".slide2");
        break;
      case "a-hotel response-hotel3":
        showSlide = $(".slide3");
        break;
      case "a-hotel response-hotel4":
        showSlide = $(".slide4");
        break;
      case "a-hotel response-hotel5":
        showSlide = $(".slide5");
        break;
      case "a-hotel response-hotel6":
        showSlide = $(".slide6");
        break;

      default:
        break;
    }
    console.log(e.target.className);
    console.log(showSlide);
    $(".a-hotel").not(e.target).next(".para-box").slideUp();
    $(".a-hotel").filter(e.target).next(".para-box").slideToggle();
    $("#section3 .response-slide")
      .not(showSlide)
      .stop()
      .animate({ opacity: 0 }, 300);
    $(showSlide).stop().animate({ opacity: 1 }, 300);
  };

  return (
    <main id="main">
      <section id="section1">
        <div className="slide-container">
          <div className="slide-view">
            <div className="slide-wrap" ref={slideRef}>
              <div className="slide slide3">
                <div className="container">
                  <div className="content">
                    <div className="title">
                      <h2>LOTTE HOTEL REWARDS</h2>
                      <h3>
                        전 세계 체인 호텔의 리워즈 상품과 혜택으로
                        라이프스타일에 다채로움을 더하세요.
                      </h3>
                      <a href="#!">
                        <span>자세히 보기</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="slide slide1">
                <div className="container">
                  <div className="content">
                    <div className="title">
                      <h2>SIGNIEL SEOUL 6th Anniversary</h2>
                      <h3>
                        시그니엘 서울 개관 6주년 기념 가사의 마음을 담은 이벤트
                      </h3>
                      <a href="#!">
                        <span>자세히 보기</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="slide slide2">
                <div className="container">
                  <div className="content">
                    <div className="title">
                      <h2>L7 WEST LAKE HANOI</h2>
                      <h3>
                        해외 첫 L7 호텔, L7 WEST LAKE HANOI 홈페이지 신규 오픈
                        2023.04.14
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="slide slide3">
                <div className="container">
                  <div className="content">
                    <div className="title">
                      <h2>LOTTE HOTEL REWARDS</h2>
                      <h3>
                        전 세계 체인 호텔의 리워즈 상품과 혜택으로
                        라이프스타일에 다채로움을 더하세요.
                      </h3>
                      <a href="#!">
                        <span>자세히 보기</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="slide slide1">
                <div className="container">
                  <div className="content">
                    <div className="title">
                      <h2>SIGNIEL SEOUL 6th Anniversary</h2>
                      <h3>
                        시그니엘 서울 개관 6주년 기념 가사의 마음을 담은 이벤트
                      </h3>
                      <a href="#!">
                        <span>자세히 보기</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={onClickPrevArrow}
            className="slick-prev-arrow"
          ></button>
          <button
            onClick={onClickNextArrow}
            className="slick-next-arrow"
          ></button>
          <div className="bottom-button-container">
            <div className="container">
              <ul>
                <li
                  onClick={onClickSlickDots}
                  className="slick-dots slick-dots1 on"
                >
                  <i></i>
                </li>
                <li
                  onClick={onClickSlickDots}
                  className="slick-dots slick-dots2"
                >
                  <i></i>
                </li>
                <li
                  onClick={onClickSlickDots}
                  className="slick-dots slick-dots3"
                >
                  <i></i>
                </li>
              </ul>
              <button onClick={onClickSlidePlayBtn}></button>
            </div>
          </div>
          <div className="scroll-gif-container">
            <button type="button">
              <span>
                <img src="./img/icon-pagedown.gif" alt="" />
              </span>
            </button>
          </div>
        </div>
      </section>
      <section id="section2">
        <div className="container">
          <div className="gap">
            <div className="title">
              <div className="main-title">
                <h2>Room Packages & Offers</h2>
              </div>
              <div className="more-promotion">
                <a href="#!">
                  <span>프로모션 더보기</span>
                </a>
              </div>
            </div>
            <div className="content">
              <div className="col col1">
                <div className="gap">
                  <div className="img-box">
                    <img
                      src="./img/main-promo720-g-0228-d.jpg.thumb.768.768.jpg"
                      alt=""
                    />
                  </div>
                  <h2>
                    SPRING
                    <br/>
                    HOLIDAY
                  </h2>
                  <div className="para-box">
                    <p>
                      롯데호텔에서 제공하는
                      <br/>
                      다양한 혜택을 확인해보세요.
                    </p>
                  </div>
                  <button type="button">GO TO OFFERS</button>
                </div>
              </div>
              <div className="col col2">
                <div className="gap">
                  <div className="img-box">
                    <img
                      src="./img/230119-02-405-mai-GLOBA.jpg.thumb.768.768.jpg"
                      alt=""
                    />
                  </div>
                  <h2>
                    BED & BREAKFAST
                    <br/>
                    PACKAGE
                  </h2>
                  <div className="para-box">
                    <p>
                      고객님의 여유로운 호텔스테이를 위해
                      <br />
                      조식포함 상품을 준비하였습니다.
                    </p>
                  </div>
                  <button type="button">GO TO OFFERS</button>
                </div>
              </div>
              <div className="col col3">
                <div className="gap">
                  <div className="img-box">
                    <img
                      src="./img/230119-03-405-mai-GLOBA.jpg.thumb.768.768.jpg"
                      alt=""
                    />
                  </div>
                  <h2>
                    LOTTE HOTEL
                    <br />
                    REWARDS ONLY
                  </h2>
                  <div className="para-box">
                    <p>
                      전 세계 롯데호텔앤리조트의 객실을
                      <br />
                      리워즈 회원 전용 가격으로 만나보세요.
                    </p>
                  </div>
                  <button type="button">GO TO OFFERS</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="section3">
        <div className="container">
          <div className="content">
            <div className="title">
              <div className="row1">
                <h2>LOTTE HOTELS & RESORTS Brands</h2>
              </div>
              <div className="row2">
                <div className="gap">
                  <div className="hotels hotel1">
                    <a
                      className="a-hotel1"
                      onMouseOver={onMouseOverHotelBrand}
                      href="#!"
                    >
                      <i></i>
                      <img src="./img/main-brand-signiel.png" alt="" />
                    </a>
                    <div className="para-box">
                      <h3>Live beyond Expectations</h3>
                      <p>
                        시그니엘은 당신이 기대하는 모든 것, 그 이상의 가치를
                        제공합니다. 어느 곳에서도 경험하지 못할 최상의
                        <br /> 퍼스널 서비스와 함께 럭셔리 스타일을 선보입니다.
                        <br />
                        삶이 선사하는 최고의 특권을 누리는 곳, 시그니엘에 머무는
                        것은 잊지 못할 경험이 될 것입니다.
                      </p>
                      <button type="button">
                        <span>자세히 보기</span>
                      </button>
                    </div>
                  </div>
                  <div className="hotels hotel2">
                    <a
                      className="a-hotel2"
                      onMouseOver={onMouseOverHotelBrand}
                      href="#!"
                    >
                      <i></i>
                      <img
                        src="./img/main-brand-lotte-hotels-resorts.png"
                        alt=""
                      />
                    </a>
                    <div className="para-box">
                      <h3>Enriching moments at global destination</h3>
                      <p>
                        롯데호텔은 섬세하고 품격 있는 시설과 서비스로 비교할 수
                        없는 명성과 대표성을 가지고 있습니다. 전 세계 어디에서나
                        보증된 서비스와 시설을 제공하고 있으며 고객에게 변함없는
                        만족감을 선사하고 있습니다. 품격 높은 삶을 즐기는 당신의
                        여유와 자긍심에 걸맞는 세심한 서비스로 배려와 감동을
                        약속합니다.
                      </p>
                      <button type="button">
                        <span>자세히 보기</span>
                      </button>
                    </div>
                  </div>
                  <div className="hotels hotel3">
                    <a
                      className="a-hotel3"
                      onMouseOver={onMouseOverHotelBrand}
                      href="#!"
                    >
                      <i></i>
                      <img src="./img/main-brand-l7-hotels.png" alt="" />
                    </a>
                    <div className="para-box">
                      <h3>A journey for inspiration</h3>
                      <p>
                        L7호텔은 문화창조자들과 밀레니얼 세대에게 새로운 경험과
                        영감을 전달하기 위해 만들어진 라이프스타일 호텔입니다.
                      </p>
                      <button type="button">
                        <span>자세히 보기</span>
                      </button>
                    </div>
                  </div>
                  <div className="hotels hotel4">
                    <a
                      className="a-hotel4"
                      onMouseOver={onMouseOverHotelBrand}
                      href="#!"
                    >
                      <i></i>
                      <img
                        src="./img/main-brand-lotte-city-hotels.png"
                        alt=""
                      />
                    </a>
                    <div className="para-box">
                      <h3>Modern convenience and design for balanced travel</h3>
                      <p>
                        모든 것이 비즈니스맨들을 위하여 이상적으로
                        설계되었습니다.
                        <br />
                        롯데시티호텔의 편리한 서비스, 모던한 객실과 함께 균형
                        있는
                        <br />
                        비즈니스 여행을 계획할 수 있습니다. 롯데시티호텔은
                        당신이 호텔의
                        <br />
                        모든 부분을 어려움 없이 즐길 수 있도록 늘 가까이에
                        있습니다.
                      </p>
                      <button type="button">
                        <span>자세히 보기</span>
                      </button>
                    </div>
                  </div>
                  <div className="hotels hotel5">
                    <a
                      className="a-hotel5"
                      onMouseOver={onMouseOverHotelBrand}
                      href="#!"
                    >
                      <i></i>
                      <img src="./img/221229-228-logo-resort.png" alt="" />
                    </a>
                    <div className="para-box">
                      <h3>Design the Value of Time</h3>
                      <p>
                        다양한 즐길거리로 가득한 테마 휴양 리조트, 롯데리조트는
                        그 자체로 여행의 목적지가 됩니다. 자연이 주는 편안함과
                        안락하고 세련된
                        <br />
                        객실에서 당신의 여행은 완벽해 집니다.
                      </p>
                      <button type="button">
                        <span>자세히 보기</span>
                      </button>
                    </div>
                  </div>
                  <div className="hotels hotel6">
                    <a
                      className="a-hotel6"
                      onMouseOver={onMouseOverHotelBrand}
                      href="#!"
                    >
                      <i></i>
                      <img src="./img/main-brand-VL.png" alt="" />
                    </a>
                    <div className="para-box">
                      <h3>Vitality & Liberty</h3>
                      <p>
                        VL은 롯데호텔의 프리미엄 시니어 레지던스 브랜드입니다.
                        <br />
                        당신을 완전히 자유롭게 할 VL에서 전혀 새로운 라이프
                        스타일과 삶의 균형을 완성하십시오.
                      </p>
                      <button type="button">
                        <span>자세히 보기</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="slide slide1"></div>
            <div className="slide slide2"></div>
            <div className="slide slide3"></div>
            <div className="slide slide4"></div>
            <div className="slide slide5"></div>
            <div className="slide slide6"></div>
            <div className="response-title">
              <div className="row1">
                <h2>LOTTE HOTELS & RESORTS Brands</h2>
              </div>
              <div className="row2">
                <div className="gap">
                  <div className="hotels hotel1">
                    <a
                      onClick={onClickResponseHotelA}
                      className="a-hotel response-hotel1"
                      href="#!"
                    >
                      <i></i>
                      <img src="./img/main-brand-signiel.png" alt="" />
                    </a>
                    <div className="para-box">
                      <h3>Live beyond Expectations</h3>
                      <p>
                        시그니엘은 당신이 기대하는 모든 것, 그 이상의 가치를
                        제공합니다. 어느 곳에서도 경험하지 못할 최상의
                        <br /> 퍼스널 서비스와 함께 럭셔리 스타일을 선보입니다.
                        <br />
                        삶이 선사하는 최고의 특권을 누리는 곳, 시그니엘에 머무는
                        것은 잊지 못할 경험이 될 것입니다.
                      </p>
                      <button type="button">
                        <span>자세히 보기</span>
                      </button>
                    </div>
                  </div>
                  <div className="hotels hotel2">
                    <a
                      onClick={onClickResponseHotelA}
                      className="a-hotel response-hotel2"
                      href="#!"
                    >
                      <i></i>
                      <img
                        src="./img/main-brand-lotte-hotels-resorts.png"
                        alt=""
                      />
                    </a>
                    <div className="para-box">
                      <h3>Enriching moments at global destination</h3>
                      <p>
                        롯데호텔은 섬세하고 품격 있는 시설과 서비스로 비교할 수
                        없는 명성과 대표성을 가지고 있습니다. 전 세계 어디에서나
                        보증된 서비스와 시설을 제공하고 있으며 고객에게 변함없는
                        만족감을 선사하고 있습니다. 품격 높은 삶을 즐기는 당신의
                        여유와 자긍심에 걸맞는 세심한 서비스로 배려와 감동을
                        약속합니다.
                      </p>
                      <button type="button">
                        <span>자세히 보기</span>
                      </button>
                    </div>
                  </div>
                  <div className="hotels hotel3">
                    <a
                      onClick={onClickResponseHotelA}
                      className="a-hotel response-hotel3"
                      href="#!"
                    >
                      <i></i>
                      <img src="./img/main-brand-l7-hotels.png" alt="" />
                    </a>
                    <div className="para-box">
                      <h3>A journey for inspiration</h3>
                      <p>
                        L7호텔은 문화창조자들과 밀레니얼 세대에게 새로운 경험과
                        영감을 전달하기 위해 만들어진 라이프스타일 호텔입니다.
                      </p>
                      <button type="button">
                        <span>자세히 보기</span>
                      </button>
                    </div>
                  </div>
                  <div className="hotels hotel4">
                    <a
                      onClick={onClickResponseHotelA}
                      className="a-hotel response-hotel4"
                      href="#!"
                    >
                      <i></i>
                      <img
                        src="./img/main-brand-lotte-city-hotels.png"
                        alt=""
                      />
                    </a>
                    <div className="para-box">
                      <h3>Modern convenience and design for balanced travel</h3>
                      <p>
                        모든 것이 비즈니스맨들을 위하여 이상적으로
                        설계되었습니다.
                        <br />
                        롯데시티호텔의 편리한 서비스, 모던한 객실과 함께 균형
                        있는
                        <br />
                        비즈니스 여행을 계획할 수 있습니다. 롯데시티호텔은
                        당신이 호텔의
                        <br />
                        모든 부분을 어려움 없이 즐길 수 있도록 늘 가까이에
                        있습니다.
                      </p>
                      <button type="button">
                        <span>자세히 보기</span>
                      </button>
                    </div>
                  </div>
                  <div className="hotels hotel5">
                    <a
                      onClick={onClickResponseHotelA}
                      className="a-hotel response-hotel5"
                      href="#!"
                    >
                      <i></i>
                      <img src="./img/221229-228-logo-resort.png" alt="" />
                    </a>
                    <div className="para-box">
                      <h3>Design the Value of Time</h3>
                      <p>
                        다양한 즐길거리로 가득한 테마 휴양 리조트, 롯데리조트는
                        그 자체로 여행의 목적지가 됩니다. 자연이 주는 편안함과
                        안락하고 세련된
                        <br />
                        객실에서 당신의 여행은 완벽해 집니다.
                      </p>
                      <button type="button">
                        <span>자세히 보기</span>
                      </button>
                    </div>
                  </div>
                  <div className="hotels hotel6">
                    <a
                      onClick={onClickResponseHotelA}
                      className="a-hotel response-hotel6"
                      href="#!"
                    >
                      <i></i>
                      <img src="./img/main-brand-VL.png" alt="" />
                    </a>
                    <div className="para-box">
                      <h3>Vitality & Liberty</h3>
                      <p>
                        VL은 롯데호텔의 프리미엄 시니어 레지던스 브랜드입니다.
                        <br />
                        당신을 완전히 자유롭게 할 VL에서 전혀 새로운 라이프
                        스타일과 삶의 균형을 완성하십시오.
                      </p>
                      <button type="button">
                        <span>자세히 보기</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="response-slide slide1">
              <img src="./img/mai-brand-signiel-pc.webp" alt="" />
            </div>
            <div className="response-slide slide2">
              <img src="./img/mai-brand-hotels-pc.webp" alt="" />
            </div>
            <div className="response-slide slide3">
              <img src="./img/mai-brand-l7-pc.webp" alt="" />
            </div>
            <div className="response-slide slide4">
              <img src="./img/mai-brand-city-pc.webp" alt="" />
            </div>
            <div className="response-slide slide5">
              <img src="./img/221219-01-2000-ove-global.webp" alt="" />
            </div>
            <div className="response-slide slide6">
              <img src="./img/mai-brand-VL-pc.webp" alt="" />
            </div>
          </div>
        </div>
      </section>
      <section id="section4">
        <div className="container">
          <div className="gap">
            <div className="content">
              <div className="slide-view">
                <div className="slide-wrap">
                  <div className="slide slide28">
                    <div className="container">
                      <div className="gap">
                        <div className="content"></div>
                        <div className="title">
                          <h3>LOTTE City Hotel Tashkent Palace</h3>
                          <p>
                            1958년에 건축되어 우즈베키스탄 문화유산 지정 건물인
                            롯데시티호텔 타슈켄트팰리스는 클래식한 외관이
                            매력적인
                            <br />
                            호텔입니다. 공항에서 차로 10분 거리인 우즈베키스탄
                            중심지에 위치하며 알리쉐르 나보이 오페라 발레 극장,
                            <br />
                            무역센터, 중앙은행 등 주요건물이 바로 옆에 있습니다.
                          </p>
                          <button type="button">
                            <a href="#!">호텔 바로가기</a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slide slide1">
                    <div className="container">
                      <div className="gap">
                        <div className="content"></div>
                        <div className="title">
                          <h3>LOTTE HOTEL SEOUL</h3>
                          <p>
                            국내 최고의 럭셔리 비즈니스 호텔인 롯데호텔 서울은
                            1,015실 규모를 자랑하며 서울 소공동에 자리잡고
                            있습니다.
                            
                            명동, 을지로, 청계천 등 서울의 중심 관광지들로의
                            접근성이 뛰어나 서울 관광을 위한 최적의 위치를
                            자랑합니다.
                          </p>
                          <button type="button">
                            <a href="#!">호텔 바로가기</a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slide slide2">
                    <div className="container">
                      <div className="gap">
                        <div className="content"></div>
                        <div className="title">
                          <h3>SIGNIEL BUSAN</h3>
                          <p>
                            시그니엘 부산은 해운대의 랜드마크
                            '엘시티(LCT)'타워에 위치한 260실 규모의 럭셔리
                            호텔입니다. '시그니엘 서울'에
                            
                            이은 시그니엘의 두번째 호텔로 부산 해운대의 환상적인
                            오션뷰와 광안대교를 감상하며 진정한 여유를 누릴 수
                            있는
                            
                            완벽한 여정이 준비되어 있습니다.
                          </p>
                          <button type="button">
                            <a href="#!">호텔 바로가기</a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slide slide3">
                    <div className="container">
                      <div className="gap">
                        <div className="content"></div>
                        <div className="title">
                          <h3>L7 GANGNAM</h3>
                          <p>
                            패션쇼 런웨이처럼 화려한 유행의 거리 강남. 이
                            감각적인 도시의 문화를 닮은 L7 강남은 서울 강남의
                            중심에 위치한
                            
                            라이프스타일 호텔입니다. 서울에서 가장 트렌디한 모든
                            것을 TV 채널 돌리듯 쉽게 즐길 수 있습니다.
                          </p>
                          <button type="button">
                            <a href="#!">호텔 바로가기</a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slide slide4">
                    <div className="container">
                      <div className="gap">
                        <div className="content"></div>
                        <div className="title">
                          <h3>LOTTE HOTEL GUAM</h3>
                          <p>
                            롯데호텔 괌은 대표적 휴양지인 투몬비치 앞에 위치하며
                            아름다운 오션 프론트 뷰를 자랑합니다. 공항으로부터
                            차로
                            
                            15분 거리, 플레저 아일랜드로부터 도보로 5분 거리에
                            있으며 인근에는 다양한 고급레스토랑, 카페,
                            쇼핑센터가
                            
                            있습니다.
                          </p>
                          <button type="button">
                            <a href="#!">호텔 바로가기</a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slide slide5">
                    <div className="container">
                      <div className="gap">
                        <div className="content"></div>
                        <div className="title">
                          <h3>LOTTE City Hotel Daejeon</h3>
                          <p>
                            동북아의 대표적인 연구개발과 교육의 허브이며, 첨단
                            과학 기술의 메카이자 대한민국의 실리콘밸리인 대전에
                            위치한
                            
                            롯데시티호텔 대전은 2014년 3월에 오픈하였습니다.
                            대전 컨벤션센터 앞에 위치한 18층 규모의 호텔로
                            모던한
                            
                            디자인의 306개의 객실, 아름다운 스카이 뷰를 자랑하는
                            고급 레스토랑 및 다목적 연회장을 보유하고 있습니다.
                          </p>
                          <button type="button">
                            <a href="#!">호텔 바로가기</a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slide slide6">
                    <div className="container">
                      <div className="gap">
                        <div className="content"></div>
                        <div className="title">
                          <h3>SIGNIEL SEOUL</h3>
                          <p>
                            국내 최고층 건물인 롯데월드타워 76층~101층에 위치한
                            시그니엘 서울은 한국의 아름다움을 현대적인 감각으로
                            
                            풀어낸 객실(235실)에서 서울의 파노라믹한
                            스카이라인과 환상적인 야경을 조망할 수 있으며 일몰과
                            일출을 한
                            자리에서 감상할 수 있는 국내 유일의 호텔입니다.
                          </p>
                          <button type="button">
                            <a href="#!">호텔 바로가기</a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slide slide7">
                    <div className="container">
                      <div className="gap">
                        <div className="content"></div>
                        <div className="title">
                          <h3>LOTTE HOTEL WORLD</h3>
                          <p>
                            리조트 형 비즈니스 호텔인 롯데호텔 월드는 서울
                            강남의 요지, 잠실에 위치해 뛰어난 접근성을
                            자랑합니다. 세계 최대
                            
                            규모의 실내 놀이공원인 롯데월드 어드벤쳐, 아시아
                            최대 규모의 멀티플렉스 롯데월드몰과 바로 연결되어
                            있으며,
                            
                            아름답고 자연친화적인 석촌호수가 인접해 뛰어난
                            경관을 자랑합니다.
                          </p>
                          <button type="button">
                            <a href="#!">호텔 바로가기</a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slide slide8">
                    <div className="container">
                      <div className="gap">
                        <div className="content"></div>
                        <div className="title">
                          <h3>LOTTE HOTEL HANOI</h3>
                          <p>
                            하노이의 새로운 랜드마크로 자리매김한 65층 롯데센터
                            하노이의 상층부에 위치한 롯데호텔 하노이는 높은
                            수준의
                            
                            서비스 품질과 최신의 시설로 특급호텔의 새로운 기준을
                            제시합니다.
                          </p>
                          <button type="button">
                            <a href="#!">호텔 바로가기</a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slide slide9">
                    <div className="container">
                      <div className="gap">
                        <div className="content"></div>
                        <div className="title">
                          <h3>LOTTE HOTEL JEJU</h3>
                          <p>
                            환상의 섬 제주도 중문관광단지에 위치한 롯데호텔
                            제주는 500개의 객실을 갖춘 한국 최고의 리조트
                            호텔입니다.
                            
                            남아프리카의 리조트 호텔 ‘The Palace of the Lost
                            City’를 모델로 설계되어 천혜의 제주 자연과 어우러진
                            이국적인
                            
                            분위기를 느낄 수 있습니다.
                          </p>
                          <button type="button">
                            <a href="#!">호텔 바로가기</a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slide slide10">
                    <div className="container">
                      <div className="gap">
                        <div className="content"></div>
                        <div className="title">
                          <h3>LOTTE HOTEL MOSCOW</h3>
                          <p>
                            300개의 객실을 갖춘 롯데호텔 모스크바는 러시아를
                            대표하는 붉은 광장과 크레믈린 궁전, 볼쇼이 극장과
                            근접한
                            
                            금융과 쇼핑의 중심지 뉴 아르바트 거리에 위치하고
                            있습니다. 롯데호텔이 아시아지역 밖으로 처음 진출한
                            지점으로
                            
                            롯데호텔만의 세심한 서비스와 감각적인 분위기를
                            그대로 담아 현재 러시아 최고의 호텔로
                            자리매김하였습니다.
                          </p>
                          <button type="button">
                            <a href="#!">호텔 바로가기</a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slide slide11">
                    <div className="container">
                      <div className="gap">
                        <div className="content"></div>
                        <div className="title">
                          <h3>LOTTE HOTEL SEATTLE</h3>
                          <p>
                            현재와 과거가 공존하는 롯데호텔 시애틀은 시애틀
                            다운타운의 또 다른 명소가 되었습니다. 호텔은 미국의
                            첫 번째
                            
                            감리교회 The Sanctuary를 품고 있습니다. 파이프
                            오르간 장식과 스테인드 글라스로 유명한 The
                            Sanctuary는
                            
                            미국에서 가장 오래된 Beaux-Art 건축물 중 하나로
                            꼽힙니다.
                          </p>
                          <button type="button">
                            <a href="#!">호텔 바로가기</a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slide slide12">
                    <div className="container">
                      <div className="gap">
                        <div className="content"></div>
                        <div className="title">
                          <h3>LOTTE HOTEL BUSAN</h3>
                          <p>
                            감각적인 라이프 스타일을 추구하는 고객은 모던하고
                            세련된 스타일로 리노베이션 된 객실에 만족할 것이며,
                            야구도시
                            
                            부산을 배경으로 마련한 추신수 스타 룸은 외국인 전용
                            카지노와 함께 특별한 즐거움이 될 것입니다.
                          </p>
                          <button type="button">
                            <a href="#!">호텔 바로가기</a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slide slide13">
                    <div className="container">
                      <div className="gap">
                        <div className="content"></div>
                        <div className="title">
                          <h3>LOTTE HOTEL ST.PETERSBURG</h3>
                          <p>
                            새로운 럭셔리 롯데호텔 상트페테르부르크는 1851년에
                            지어진 역사 깊은 건물에 자리 잡고 있으며
                            
                            상트페테르부르크에서 가장 유명한 곳인 성 이삭 광장에
                            위치하고 있습니다.
                          </p>
                          <button type="button">
                            <a href="#!">호텔 바로가기</a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slide slide14">
                    <div className="container">
                      <div className="gap">
                        <div className="content"></div>
                        <div className="title">
                          <h3>LOTTE HOTEL ULSAN</h3>
                          <p>
                            관광과 산업이 공존하는 울산 신 도심에 위치한 200실
                            규모의 롯데호텔 울산은 공항, 버스터미널, 쇼핑타운,
                            
                            금융지역과 인접하여 비즈니스와 관광 등 어떤 목적의
                            여행에도 최상의 만족을 드립니다.
                          </p>
                          <button type="button">
                            <a href="#!">호텔 바로가기</a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slide slide15">
                    <div className="container">
                      <div className="gap">
                        <div className="content"></div>
                        <div className="title">
                          <h3>LOTTE HOTEL VLADIVOSTOK</h3>
                          <p>
                            롯데호텔 블라디보스토크는 수준 높은 최초의 5성급
                            호텔로 수많은 정치, 사회 및 경제 행사의 대표적인
                            장소입니다.
                            
                            롯데호텔 블라디보스토크는 1997년에 건립되었으며
                            블라디보스토크의 비즈니스 및 문화 중심지에 위치해
                            있습니다.
                          </p>
                          <button type="button">
                            <a href="#!">호텔 바로가기</a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slide slide16">
                    <div className="container">
                      <div className="gap">
                        <div className="content"></div>
                        <div className="title">
                          <h3>LOTTE City Hotel Jeju</h3>
                          <p>
                            제주의 대표적 절경인 주상절리와 폭포, 그리고
                            돌하르방을 형상화하여 설계된 롯데시티호텔 제주는
                            관광은 물론
                            
                            비즈니스 고객에게도 최적의 호텔입니다. 제주도 건물
                            중 최고 높이인 롯데시티호텔 제주는 제주국제공항에서
                            차로
                            
                            5분 거리에 위치하여 있으며 제주시내 및 공항 활주로,
                            바다와 한라산까지 한눈에 보이는 최고의 전망을
                            자랑합니다.
                          </p>
                          <button type="button">
                            <a href="#!">호텔 바로가기</a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slide slide17">
                    <div className="container">
                      <div className="gap">
                        <div className="content"></div>
                        <div className="title">
                          <h3>LOTTE ARAI RESORT</h3>
                          <p>
                            롯데아라이리조트는 묘코산에서 바다로 이어지는 산들과
                            멀리 펼쳐지는 전원 풍경이 아름다운 자연속에 자리잡고
                            
                            있습니다. 끝없이 펼쳐진 설경에서의 15개의 코스의
                            스키장과, 아시아 최장 1,501m에 달하는 짚라인, 짚투어
                            등의
                            
                            액티비티가 완비되어 있어 아시아 최고의 레저시설을
                            제공합니다.
                          </p>
                          <button type="button">
                            <a href="#!">호텔 바로가기</a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slide slide18">
                    <div className="container">
                      <div className="gap">
                        <div className="content"></div>
                        <div className="title">
                          <h3>LOTTE City Hotel Guro</h3>
                          <p>
                            롯데시티호텔 구로는 서울 서남권의 랜드마크 호텔로서
                            IT 산업의 메카인 구로디지털 밸리에 위치한 프리미엄
                            업
                            스케일 호텔입니다. 20층 규모의 탁 트인 시내 전망을
                            갖춘 287실의 고급스러운 객실과 스타일리시한 뷔페
                            
                            레스토랑이 준비되어 있으며 야외 테라스와
                            연회장에서는 고품격 웨딩 및 다양한 연회를 즐기실 수
                            있습니다.
                          </p>
                          <button type="button">
                            <a href="#!">호텔 바로가기</a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slide slide19">
                    <div className="container">
                      <div className="gap">
                        <div className="content"></div>
                        <div className="title">
                          <h3>L7 MYEONGDONG</h3>
                          <p>
                            L7 명동은 트렌디한 감각과 안락한 분위기가 어우러진
                            라이프스타일 호텔입니다. 고객의 라이프스타일과 지역
                            문화가
                            
                            어우러져 새로운 문화를 만들어 내는 도심 속 휴식
                            공간으로 롯데면세점, 롯데백화점 등의 쇼핑몰과
                            경복궁, 남산 등의
                            
                            관광지가 가까운 거리에 위치하고 있습니다.
                          </p>
                          <button type="button">
                            <a href="#!">호텔 바로가기</a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slide slide20">
                    <div className="container">
                      <div className="gap">
                        <div className="content"></div>
                        <div className="title">
                          <h3>LOTTE HOTEL SAIGON</h3>
                          <p>
                            롯데호텔 사이공은 호치민 시를 대표하는 5성급
                            호텔이며 유유히 흐르는 사이공 강의 아름다운 풍광과
                            도시의
                            
                            화려함을 동시에 느낄 수 있는 특별한 장소입니다.
                            호치민 시의 풍요롭고 아름다운 자연이 함께하는
                            롯데호텔
                            
                            사이공에서 여행객들은 편안한 휴식을 즐기며 잊을 수
                            없는 추억을 쌓을 수 있습니다.
                          </p>
                          <button type="button">
                            <a href="#!">호텔 바로가기</a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slide slide21">
                    <div className="container">
                      <div className="gap">
                        <div className="content"></div>
                        <div className="title">
                          <h3>LOTTE City Hotel Gimpo</h3>
                          <p>
                            김포공항 바로 옆에 자리잡고 있는 롯데시티호텔
                            김포공항은 인천국제공항 및 서울 도심까지 40분 이내에
                            이동할 수
                            있어 최적의 접근성을 자랑합니다. 또한 총 197개의
                            세련된 객실과 비즈니스를 위한 다양한 편의시설 및
                            고품격
                            
                            서비스를 합리적인 가격에 제공해드리는 객실 특화형
                            프리미엄 비즈니스 호텔입니다.
                          </p>
                          <button type="button">
                            <a href="#!">호텔 바로가기</a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slide slide22">
                    <div className="container">
                      <div className="gap">
                        <div className="content"></div>
                        <div className="title">
                          <h3>L7 HONGDAE</h3>
                          <p>
                            예술적인 감성 가득한 멋진 사람들의 이야기가 담겨
                            있는 L7 홍대는 평범한 일상을 축제로 만드는 유쾌한
                            문화
                            
                            스테이션입니다.
                          </p>
                          <button type="button">
                            <a href="#!">호텔 바로가기</a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slide slide23">
                    <div className="container">
                      <div className="gap">
                        <div className="content"></div>
                        <div className="title">
                          <h3>LOTTE City Hotel Mapo</h3>
                          <p>
                            롯데시티호텔 마포는 서울에 머무는 국내외 비즈니스
                            고객과 관광객을 위한 객실특화형 프리미엄 비즈니스
                            
                            호텔입니다. 공항철도와 지하철을 비롯한 대중교통
                            이용이 매우 편리하며, 서울 도심 및 시내 관광지로
                            접근성이
                            
                            뛰어납니다.
                          </p>
                          <button type="button">
                            <a href="#!">호텔 바로가기</a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slide slide24">
                    <div className="container">
                      <div className="gap">
                        <div className="content"></div>
                        <div className="title">
                          <h3>LOTTE HOTEL YANGON</h3>
                          <p>
                            롯데호텔 양곤은 미얀인들의 성지인 쉐다곤 파고다의
                            북쪽, 양곤 최고 유원지인 인야 호수의 서쪽에 위치하고
                            
                            있습니다. 아름다운 인야 호수가 내려다 보이는 객실,
                            대규모 국제행사 및 세미나를 위한 연회장, 다양한
                            레스토랑 등
                            차별화된 시설은 성공적인 비즈니스와 안락한 휴식을
                            선사합니다.
                          </p>
                          <button type="button">
                            <a href="#!">호텔 바로가기</a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slide slide25">
                    <div className="container">
                      <div className="gap">
                        <div className="content"></div>
                        <div className="title">
                          <h3>LOTTE City Hotel Myeongdong</h3>
                          <p>
                            롯데시티호텔 명동은 서울 시내 비즈니스와 쇼핑의
                            중심지인 명동과 서울의 오아시스인 청계천 사이에
                            위치하고
                            
                            있으며, 27층 규모의 탁 트인 전망과 430개의 객실과
                            뷔페 레스토랑, 미팅룸, 피트니스 등을 갖춘 프리미엄
                            비즈니스
                            
                            호텔입니다.
                          </p>
                          <button type="button">
                            <a href="#!">호텔 바로가기</a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slide slide26">
                    <div className="container">
                      <div className="gap">
                        <div className="content"></div>
                        <div className="title">
                          <h3>LOTTE City Hotel Ulsan</h3>
                          <p>
                            한국 최대의 산업과 관광으로 이루어진 울산 중심에
                            위치한 354실 규모의 롯데시티호텔 울산은 금융권,
                            쇼핑타운,
                            
                            공항, 버스터미널과 인접하여, 비즈니스와 관광에
                            특화된 비즈니스 호텔로서 고객 한 분 한 분이 만족할수
                            있도록
                            
                            품격과 서비스를 높였습니다.
                          </p>
                          <button type="button">
                            <a href="#!">호텔 바로가기</a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slide slide27">
                    <div className="container">
                      <div className="gap">
                        <div className="content"></div>
                        <div className="title">
                          <h3>LOTTE HOTEL SAMARA</h3>
                          <p>
                            롯데호텔 사마라는 사마라 최초의 5성급 호텔로 도시
                            중심부에 자리하고 있어 이용이 편리하며 럭셔리한 숙박
                            시설,
                            
                            우아한 인테리어, 최상급 서비스로 잊지 못할 경험을
                            약속드립니다.
                          </p>
                          <button type="button">
                            <a href="#!">호텔 바로가기</a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slide slide28">
                    <div className="container">
                      <div className="gap">
                        <div className="content"></div>
                        <div className="title">
                          <h3>LOTTE City Hotel Tashkent Palace</h3>
                          <p>
                            1958년에 건축되어 우즈베키스탄 문화유산 지정 건물인
                            롯데시티호텔 타슈켄트팰리스는 클래식한 외관이
                            매력적인
                            
                            호텔입니다. 공항에서 차로 10분 거리인 우즈베키스탄
                            중심지에 위치하며 알리쉐르 나보이 오페라 발레 극장,
                            
                            무역센터, 중앙은행 등 주요건물이 바로 옆에 있습니다.
                          </p>
                          <button type="button">
                            <a href="#!">호텔 바로가기</a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slide slide1">
                    <div className="container">
                      <div className="gap">
                        <div className="content"></div>
                        <div className="title">
                          <h3>LOTTE HOTEL SEOUL</h3>
                          <p>
                            국내 최고의 럭셔리 비즈니스 호텔인 롯데호텔 서울은
                            1,015실 규모를 자랑하며 서울 소공동에 자리잡고
                            있습니다.
                            
                            명동, 을지로, 청계천 등 서울의 중심 관광지들로의
                            접근성이 뛰어나 서울 관광을 위한 최적의 위치를
                            자랑합니다.
                          </p>
                          <button type="button">
                            <a href="#!">호텔 바로가기</a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={onClickPrevBtn}
                className="prev-btn"
                type="button"
              ></button>
              <button
                onClick={onClickNextBtn}
                className="next-btn"
                type="button"
              ></button>
            </div>
          </div>
        </div>
      </section>
      <section id="section5">
        <div className="container">
          <div className="gap">
            <div className="content">
              <div className="slide-view">
                <div className="slide-wrap">
                  <div className="slide slide4"></div>
                  <div className="slide slide1"></div>
                  <div className="slide slide2"></div>
                  <div className="slide slide3"></div>
                  <div className="slide slide4"></div>
                  <div className="slide slide1"></div>
                </div>
                <div className="slick-dots-container">
                  <div className="container">
                    <ul>
                      <li className="sec5-slick-dots sec5-slick-dots-1 on">
                        <i></i>
                      </li>
                      <li className="sec5-slick-dots sec5-slick-dots-2">
                        <i></i>
                      </li>
                      <li className="sec5-slick-dots sec5-slick-dots-3">
                        <i></i>
                      </li>
                      <li className="sec5-slick-dots sec5-slick-dots-4">
                        <i></i>
                      </li>
                    </ul>
                    <button onClick={onClickSlidePlayBtnSec5}></button>
                  </div>
                </div>
                <button
                  onClick={onClickPrevArrowSec5}
                  className="prev-btn"
                ></button>
                <button
                  onClick={onClickNextArrowSec5}
                  className="next-btn"
                ></button>
              </div>
            </div>
            <div className="para-box">
              <p>
                롯데호텔앤리조트는 한국에서 가장 큰 호텔그룹으로 아시아를 넘어
                세계로 뻗어가는 글로벌 호텔로서 전세계 어디에서나 한결같이 품격
                있는 서비스와 시설로 고객에게 깊은 감동을 주는 브랜드를 지향하고
                있습니다. 롯데호텔앤리조트에서는 균형 있는 라이프스타일을
                추구하며 품격의 가치를 아는 고객 분들을 위해 세련되고 안락한
                객실과 세심한 배려가 묻어나는 고품격 호텔 서비스를 준비하고
                있습니다. 호텔 레스토랑과 라운지, 바에서 제공되는 최고급 요리는
                즐거운 경험을 제공하며 다양한 부대시설은 비즈니스와 레저를 모두
                즐기고 싶어하시는 고객 분들을 만족 시키는데 부족함이 없습니다.
                시그니엘, 롯데호텔, L7호텔 및 롯데시티호텔을 특별한 가격과
                구성으로 만나보실 수 있는 호텔 패키지, 특별 혜택 이벤트 및
                프로모션을 공식사이트에서 확인해보세요.{" "}
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer id="footer">
        <div className="row1">
          <div className="container">
            <div className="hotel-brand">
              <ul>
                <li>
                  <a href="#!">
                    <img src="./img/footer_logo_signiel.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <img src="./img/footer_logo_lottehotel.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <img src="./img/footer_logo_l7.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <img src="./img/footer_logo_city.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <img src="./img/footer_logo_resort.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <img src="./img/footer_logo_vl.png" alt="" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="app-brand">
              <ul>
                <li>
                  <a href="#!">
                    <img src="./img/footer_appstore.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <img src="./img/footer-googleplay.png" alt="" />
                  </a>
                </li>
              </ul>
              <ul>
                <li>
                  <a href="#!">
                    <img src="./img/footer-lhm.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <img src="./img/footer-sns-tripa.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <img src="./img/footer-sns-facebook.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <img src="./img/footer-sns-instagram.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <img src="./img/footer-sns-youtube.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <img src="./img/footer-sns-blog.png" alt="" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row2">
          <div className="container">
            <div className="col1">
              <div className="logo-box">
                <img src="./img/footer-logo.png" alt="" />
              </div>
              <div className="info-box">
                <div className="row1">
                  <h3>㈜호텔롯데</h3>
                  <address>04533, 서울특별시 중구 을지로 30</address>
                  <p>/ +82-2-771-1000</p>
                </div>
                <div className="row2">
                  <span>대표이사 이완신 / </span>
                  <span>사업자등록번호 104-81-25980 / </span>
                </div>
                <div className="row3">
                  <span>통신판매신고번호 중구02802호</span>
                </div>
              </div>
            </div>
            <div className="col2">
              <ul>
                <li>
                  <a href="#!">호텔찾기</a>
                </li>
                <li>
                  <a href="#!">(주)호텔롯데임직워</a>
                </li>
                <li>
                  <a href="#!">롯데호텔 소개</a>
                </li>
                <li>
                  <a href="#!">브랜드 소개</a>
                </li>
                <li>
                  <a href="#!">수상</a>
                </li>
                <li>
                  <a href="#!">갤러리</a>
                </li>
              </ul>
              <ul>
                <li>
                  <a href="#!">고객의 소리</a>
                </li>
                <li>
                  <a href="#!">지점별 연락처</a>
                </li>
                <li>
                  <a href="#!">신문고(제보)</a>
                </li>
                <li>
                  <a href="#!">컴플라이언스</a>
                </li>
                <li>
                  <a href="#!">채용</a>
                </li>
                <li>
                  <a href="#!">ART COLLECTION</a>
                </li>
              </ul>
              <ul>
                <li>
                  <a href="#!">서비스아카데미</a>
                </li>
                <li>
                  <a href="#!">시니어 레지던스 VL</a>
                </li>
                <li>
                  <a href="#!">신규 개발</a>
                </li>
                <li>
                  <a href="#!">임직원</a>
                </li>
                <li>
                  <a href="#!">사이트맵</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row3">
          <div className="container">
            <div className="col1">
              <ul>
                <li>
                  <a href="#!">개인정보처리방침</a>
                </li>
                <li>
                  <i></i>
                </li>
                <li>
                  <a href="#!">사이트 이용약관</a>
                </li>
                <li>
                  <i></i>
                </li>
                <li>
                  <a href="#!">약관 및 정책</a>
                </li>
                <li>
                  <i></i>
                </li>
                <li>
                  <a href="#!">쿠키 설정</a>
                </li>
              </ul>
            </div>
            <div className="col2">
              <div className="other-site">
                <span onClick={onClickFamilySite}>패밀리사이트</span>
                <div className="family-site">
                  <ul>
                    <li onClick={onClickOtherSite}>(주)호텔롯데</li>
                    <li onClick={onClickOtherSite}>롯데지주</li>
                    <li onClick={onClickOtherSite}>롯데건설</li>
                    <li onClick={onClickOtherSite}>롯데글로벌로지스</li>
                    <li onClick={onClickOtherSite}>롯데기공</li>
                    <li onClick={onClickOtherSite}>롯데렌탈</li>
                    <li onClick={onClickOtherSite}>롯데이네오스화학</li>
                    <li onClick={onClickOtherSite}>롯데물산</li>
                    <li onClick={onClickOtherSite}>롯데스카이힐CC</li>
                    <li onClick={onClickOtherSite}>롯데상사</li>
                    <li onClick={onClickOtherSite}>롯데시네마</li>
                    <li onClick={onClickOtherSite}>롯데아사히주류</li>
                    <li onClick={onClickOtherSite}>롯데알미늄</li>
                    <li onClick={onClickOtherSite}>롯데엠시시</li>
                    <li onClick={onClickOtherSite}>롯데인재개발원</li>
                    <li onClick={onClickOtherSite}>롯데자이언츠</li>
                    <li onClick={onClickOtherSite}>롯데정밀화학</li>
                    <li onClick={onClickOtherSite}>롯데정보통신</li>
                    <li onClick={onClickOtherSite}>롯데제과</li>
                    <li onClick={onClickOtherSite}>롯데제이티비</li>
                    <li onClick={onClickOtherSite}>롯데중앙연구소</li>
                    <li onClick={onClickOtherSite}>롯데캐피탈</li>
                    <li onClick={onClickOtherSite}>롯데케미칼</li>
                    <li onClick={onClickOtherSite}>롯데푸드</li>
                    <li onClick={onClickOtherSite}>롯데하이마트</li>
                    <li onClick={onClickOtherSite}>롯데쇼핑e커머스</li>
                    <li onClick={onClickOtherSite}>롯데호텔</li>
                    <li onClick={onClickOtherSite}>대흥기획</li>
                    <li onClick={onClickOtherSite}>캐논코리아</li>
                  </ul>
                </div>
                <button type="button">이동</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div id="gotop">
        <div className="container">
          <div className="gap">
            <div className="content">
              <div className="row row1">
                <a href="#!"></a>
              </div>
              <div className="row row2">
                <a href="#!"></a>
              </div>
              <div className="row row3">
                <a href="#!"></a>
              </div>
              <div className="row row4">
                <a href="#wrap"></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
HomeComponent.defaultProps = {
  setId: 0,
  cnt: 0,
};

export default HomeComponent;
