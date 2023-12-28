import React from "react";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

function HeaderComponent(props) {
  const [state, setState] = useState(props);
  const citySearchInputRef = useRef();
  const hotelChoiceRef = useRef();
  const checkInoutBoxRef = useRef();
  const roomSelectBoxRef = useRef();
  const roomBoxRef = useRef();

  //랭귀지 클릭시 아래 미니 팝업창 토글 애니메이션
  const onClickLangOpen = (e) => {
    const lang = document.querySelector(".language-box");

    e.preventDefault();
    lang.classList.toggle("on");
  };

  //객실예약 클릭시 아래 메뉴 토글 애니메이션
  const onClickReservOff = (e) => {
    const reserv = document.getElementById("reservation-menu");
    e.preventDefault();
    reserv.classList.toggle("off");
  };

  //스페셜 오퍼 호버시 아래 NAV 내려오는 애니메이션
  const onMouseEnterLi = (e) => {
    const specNav = document.getElementById("special-nav");
    setState({
      ...state,
      onMouseLi: true,
    });
    specNav.classList.add("on");
  };
  const onMouseEnterNav = (e) => {
    const specNav = document.getElementById("special-nav");
    setState({
      ...state,
      onMouseSpecNav: true,
    });
    specNav.classList.add("on");
  };
  const onMouseLeaveLi = (e) => {
    const specNav = document.getElementById("special-nav");
    e.preventDefault();
    setState({
      ...state,
      onMouseLi: false,
    });
    if (state.onMouseSpecNav === false) {
      specNav.classList.remove("on");
    }
  };
  const onMouseLeaveNav = (e) => {
    const specNav = document.getElementById("special-nav");
    setState({
      ...state,
      onMouseSpecNav: false,
    });
    if (state.onMouseLi === false) {
    }
    specNav.classList.remove("on");
  };

  //웨딩&컨벤션 호버시 아래 Nav 내려오는 애니메이션
  const onMouseEnterWedLi = (e) => {
    const wedNav = document.getElementById("wedding-nav");
    setState({
      ...state,
      onMouseWedLi: true,
    });
    wedNav.classList.add("on");
  };
  const onMouseEnterWedNav = (e) => {
    const wedNav = document.getElementById("wedding-nav");
    setState({
      ...state,
      onMouseWedNav: true,
    });
    wedNav.classList.add("on");
  };
  const onMouseLeaveWedLi = (e) => {
    const wedNav = document.getElementById("wedding-nav");
    e.preventDefault();
    setState({
      ...state,
      onMouseWedLi: false,
    });
    if (state.onMouseWedNav === false) {
      wedNav.classList.remove("on");
    }
  };
  const onMouseLeaveWedNav = (e) => {
    const wedNav = document.getElementById("wedding-nav");
    setState({
      ...state,
      onMouseWedNav: false,
    });
    if (state.onMouseLi === false) {
    }
    wedNav.classList.remove("on");
  };

  //도시 호텔 입력상자 포커스시에 하위 메뉴 내려오는 애니
  const onFocusCitySearch = (e) => {
    document.querySelector(".select-box").style.display = "block";
    setTimeout(() => {
      const target = document.querySelector(".select-box");
      setTimeout(() => {
        target.style.zIndex = "3";
      }, 1000);
      target.classList.add("on");
    }, 0);
  };

  //객실 예약 하위 호텔선택 국가 선택시 호텔 목록 내려오는 애니
  const onClickNationHotel = (e) => {
    e.preventDefault();
    console.log(e.target);
    e.target.parentNode.classList.toggle("on");
  };

  //객실 예약 하위 메뉴 올라가는 애니 다른 곳 클릭시
  //체크인아웃 하위 메뉴 올라가는 애니 다른 곳 클릭시
  useEffect(() => {
    document.addEventListener("mousedown", hotelChoiceClickOutside);
    document.addEventListener("mousedown", roomSelectClickOutside);
  }, []);
  //호텔 또는 도시 입력상자 바깥 클릭시 하위 메뉴 올라가는 애니
  const hotelChoiceClickOutside = (e) => {
    if (
      !hotelChoiceRef.current.contains(e.target) &&
      !citySearchInputRef.current.contains(e.target)
    ) {
      document.querySelector(".select-box").classList.remove("on");
      document.querySelector(".select-box").style.zIndex = "1";
      setTimeout(() => {
        document.querySelector(".select-box").style.display = "none";
      }, 1000);
    }
  };
  // 체크인아웃 박스 바깥 클릭시 하위 메뉴 올라가는 애니
  const roomSelectClickOutside = (e) => {
    if (
      !checkInoutBoxRef.current.contains(e.target) &&
      !roomSelectBoxRef.current.contains(e.target) &&
      !roomBoxRef.current.contains(e.target)
    ) {
      document.querySelector(".room-select-box").classList.remove("on");
      document.querySelector(".check-inout-box").style.zIndex = "1";
      document.querySelector(".room-select-box").style.zIndex = "1";
      setTimeout(() => {
        document.querySelector(".room-select-box").style.display = "none";
      }, 1000);
    }
  };
  //체크인아웃 박스 클릭시 하위 메뉴 내려오는 애니
  const onClickCheckInoutBox = (e) => {
    e.preventDefault();
    document.querySelector(".room-select-box").style.display = "block";
    setTimeout(() => {
      document.querySelector(".room-select-box").classList.add("on");
      document.querySelector(".room-select-box").style.zIndex = "3";
      document.querySelector(".check-inout-box").style.zIndex = "2";
    }, 0);
  };
  //달력
  //윤년 계산
  const checkLeapYear = (year) => {
    if (year % 400 === 0) {
      return true;
    } else if (year % 100 === 0) {
      return false;
    } else if (year % 4 === 0) {
      return true;
    } else {
      return false;
    }
  };
  const getFirstDayOfWeek = (year, month) => {
    if (month < 10) month = "0" + month;
    return new Date(year + "-" + month + "-01").getDay();
  };
  const changeCurrentYearMonth = (year, month) => {
    //윤년 체크해서 먼쓰데이 배열에 2월달 값 바꿔주기
    let month_day = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2) {
      if (checkLeapYear(year)) month_day[1] = 29;
    }
    //해당월에 첫날이 무슨 요일인지 인덱스 값 찾아서 변수에 넣기
    let first_day_of_week = getFirstDayOfWeek(year, month);

    let arr_calendar = [];
    //달력의 일자 넣는 배열에 첫날 시작요일에 맞춰서 그 전 요일 빈칸 넣기
    for (let i = 0; i < first_day_of_week; i++) {
      arr_calendar.push("");
    }
    // 해당월의 마지막일까지 달력 일자 넣는 배열에 집어넣기
    for (let i = 1; i <= month_day[month - 1]; i++) {
      arr_calendar.push(String(i));
    }
    // 부족한 요일 빈칸으로 마무리 지어주기
    let remain_day = 7 - (arr_calendar.length % 7);
    if (remain_day < 7) {
      for (let i = 0; i < remain_day; i++) {
        arr_calendar.push("");
      }
    }
    renderCurrentCalendar(arr_calendar);
  };
  const changeNextYearMonth = (year, month) => {
    //윤년 체크해서 먼쓰데이 배열에 2월달 값 바꿔주기
    let month_day = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2) {
      if (checkLeapYear(year)) month_day[1] = 29;
    }
    //해당월에 첫날이 무슨 요일인지 인덱스 값 찾아서 변수에 넣기
    let first_day_of_week = getFirstDayOfWeek(year, month);

    let arr_calendar = [];
    //달력의 일자 넣는 배열에 첫날 시작요일에 맞춰서 그 전 요일 빈칸 넣기
    for (let i = 0; i < first_day_of_week; i++) {
      arr_calendar.push("");
    }
    // 해당월의 마지막일까지 달력 일자 넣는 배열에 집어넣기
    for (let i = 1; i <= month_day[month - 1]; i++) {
      arr_calendar.push(String(i));
    }
    // 부족한 요일 빈칸으로 마무리 지어주기
    let remain_day = 7 - (arr_calendar.length % 7);
    if (remain_day < 7) {
      for (let i = 0; i < remain_day; i++) {
        arr_calendar.push("");
      }
    }
    console.log(arr_calendar);
    renderNextCalendar(arr_calendar);
  };
  const renderCurrentCalendar = (data) => {
    let h = [];
    for (let i = 0; i < data.length; i++) {
      if (i === 0) {
        h.push("<tr>");
      } else if (i % 7 === 0) {
        h.push("</tr>");
        h.push("<tr>");
      }
      h.push("<td>" + data[i] + "</td>");
    }
    h.push("</tr>");
    document.querySelector("#current-td-tbody").innerHTML = h.join("");
  };
  const renderNextCalendar = (data) => {
    let h = [];
    for (let i = 0; i < data.length; i++) {
      if (i === 0) {
        h.push("<tr>");
      } else if (i % 7 === 0) {
        h.push("</tr>");
        h.push("<tr>");
      }
      h.push("<td>" + data[i] + "</td>");
    }
    h.push("</tr>");
    document.querySelector("#next-td-tbody").innerHTML = h.join("");
  };
  const setNextYearMonth = () => {
    if (state.currentMonth === 12) {
      setState({
        ...state,
        nextYear: state.currentYear + 1,
        nextMonth: 1,
      });
    } else {
      setState({
        ...state,
        nextYear: state.currentYear,
        nextMonth: state.currentMonth + 1,
      });
    }
  };
  const setCurrentYearMonth = () => {
    if (state.nextMonth === 1) {
      setState({
        ...state,
        currentYear: state.nextYear - 1,
        currentMonth: 12,
      });
    } else {
      setState({
        ...state,
        currentYear: state.nextYear,
        currentMonth: state.nextMonth - 1,
      });
    }
  };
  //먼저 상태 변수 바꾸고 바뀌면 넥스트이어먼스함수 실행해라
  useEffect(() => {
    setNextYearMonth();
    changeCurrentYearMonth(state.currentYear, state.currentMonth);
    console.log(state.nextYear, state.nextMonth);
  }, []);
  useEffect(() => {
    changeNextYearMonth(state.nextYear, state.nextMonth);
    setCurrentYearMonth();
    changeCurrentYearMonth(state.currentYear, state.currentMonth);
  }, [state.nextYear, state.nextMonth]);
  useEffect(() => {
    changeCurrentYearMonth(state.currentYear, state.currentMonth);
    setNextYearMonth();
    changeNextYearMonth(state.nextYear, state.nextMonth);
  }, [state.currentYear, state.currentMonth]);
  const onClickCalendarPrevBtn = (e) => {
    console.log("실행");
    e.preventDefault();
    let currentYear = state.currentYear;
    let currentMonth = state.currentMonth;
    if (currentMonth === 1) {
      currentYear = state.currentYear - 1;
      currentMonth = 12;
    } else {
      currentYear = state.currentYear;
      currentMonth = state.currentMonth - 1;
    }
    setState({
      ...state,
      currentYear: currentYear,
      currentMonth: currentMonth,
    });
  };
  const onClickCalendarNextBtn = (e) => {
    console.log("실행");
    e.preventDefault();
    let nextYear = state.nextYear;
    let nextMonth = state.nextMonth;
    if (nextMonth === 12) {
      nextYear = state.nextYear + 1;
      nextMonth = 1;
    } else {
      nextYear = state.nextYear;
      nextMonth = state.nextMonth + 1;
    }
    setState({
      ...state,
      nextYear: nextYear,
      nextMonth: nextMonth,
    });
  };

  return (
    <header id="header">
      <div className="container">
        <div className="content">
          <div id="topHeader">
            <h1>
              <Link to="/">
                <img src="./img/gnb_logo_hotelsresorts.png" alt="" />
              </Link>
            </h1>
            <div className="top-nav">
              <ul>
                <li>
                  <a href="!#">호텔찾기</a>
                </li>
                <i>|</i>
                <li>
                  <a href="!#">멤버십</a>
                </li>
                <i>|</i>
                <li>
                  <a href="!#">예약조회</a>
                </li>
                <i>|</i>
                <li>
                  <a href="!#">로그인</a>
                </li>
                <i>|</i>
                <li>
                  <a href="!#">회원가입</a>
                </li>
                <i>|</i>
                <li>
                  <a href="!#" onClick={onClickLangOpen}>
                    한국어
                  </a>
                  <div className="language-box">
                    <ul>
                      <li className="chinese">
                        <a href="!#">中文(简体字)</a>
                      </li>
                      <li className="english">
                        <a href="#!">English</a>
                      </li>
                      <li className="japanese">
                        <a href="#!">日本語</a>
                      </li>
                      <li className="myanmar">
                        <a href="#!">Myanmar</a>
                      </li>
                      <li className="russia">
                        <a href="#!">русский</a>
                      </li>
                      <li className="vietnam">
                        <a href="#!">TiếngViệt</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <i>|</i>
                <li>
                  <a href="!#">KRW</a>
                </li>
              </ul>
              <div className="mob-btn">
                <button>
                  <span></span>
                </button>
              </div>
            </div>
          </div>
          <nav id="nav">
            <div className="row1">
              <ul>
                <li>
                  <span onClick={onClickReservOff}>객실 예약</span>
                </li>
                <li>
                  <Link to="/">다이닝 예약</Link>
                </li>
                <li onMouseLeave={onMouseLeaveLi}>
                  <Link to="/" onMouseEnter={onMouseEnterLi}>
                    스페셜 오퍼
                  </Link>
                </li>
                <li onMouseLeave={onMouseLeaveWedLi}>
                  <Link to="/" onMouseEnter={onMouseEnterWedLi}>
                    웨딩&컨벤션
                  </Link>
                </li>
                <li>
                  <Link to="/">e-SHOP</Link>
                </li>
                <li>
                  <Link to="/">드라이브 스루</Link>
                </li>
                <li>
                  <Link to="/">L VIBES</Link>
                </li>
              </ul>
              <div className="rewards-box">
                <div className="content">
                  <Link>LOTTE HOTEL REWARDS</Link>
                </div>
              </div>
            </div>
            <div id="reservation-menu">
              <div className="container">
                <div className="content">
                  <div className="city-box">
                    <div className="content">
                      <label htmlFor="citySearch">호텔 또는 도시</label>
                      <input
                        onFocus={onFocusCitySearch}
                        type="text"
                        name="city_search"
                        id="citySearch"
                        placeholder="도시, 명소, 호텔을 입력하세요."
                        ref={citySearchInputRef}
                      />
                    </div>
                    <div className="select-box">
                      <div className="container">
                        <div className="current-box">
                          <h4>
                            <img src="./img/icon_16_location.png" alt="" />
                            <span>현 위치</span>
                          </h4>
                          <p>최근 검색 자료가 없습니다.</p>
                        </div>
                        <div className="hotel-choice-box" ref={hotelChoiceRef}>
                          <h4>
                            <img src="./img/icon_18_hotel.png" alt="" />
                            <span>호텔선택</span>
                          </h4>
                          <ul>
                            <li>
                              <a
                                className="nation-hotel-choice"
                                onClick={onClickNationHotel}
                                href="#!"
                              >
                                한국
                              </a>
                              <ul>
                                <li>
                                  <a href="#!">- 시그니엘 서울</a>
                                </li>
                                <li>
                                  <a href="#!">- 시그니엘 부산</a>
                                </li>
                                <li>
                                  <a href="#!">- 롯데호텔 서울</a>
                                </li>
                                <li>
                                  <a href="#!">- 롯데호텔 월드</a>
                                </li>
                                <li>
                                  <a href="#!">- 롯데호텔 부산</a>
                                </li>
                                <li>
                                  <a href="#!">- 롯데호텔 제주</a>
                                </li>
                                <li>
                                  <a href="#!">- 롯데호텔 울산</a>
                                </li>
                                <li>
                                  <a href="#!">- L7 명동</a>
                                </li>
                                <li>
                                  <a href="#!">- L7 강남</a>
                                </li>
                                <li>
                                  <a href="#!">- L7 홍대</a>
                                </li>
                                <li>
                                  <a href="#!">- 롯데시티호텔 마포</a>
                                </li>
                                <li>
                                  <a href="#!">- 롯데시티호텔 김포공항</a>
                                </li>
                                <li>
                                  <a href="#!">- 롯데시티호텔 제주</a>
                                </li>
                                <li>
                                  <a href="#!">- 롯데시티호텔 대전</a>
                                </li>
                                <li>
                                  <a href="#!">- 롯데시티호텔 구로</a>
                                </li>
                                <li>
                                  <a href="#!">- 롯데시티호텔 울산</a>
                                </li>
                                <li>
                                  <a href="#!">- 롯데시티호텔 명동</a>
                                </li>
                                <li>
                                  <a href="#!">- 롯데리조트속초</a>
                                </li>
                                <li>
                                  <a href="#!">- 롯데리조트부여</a>
                                </li>
                                <li>
                                  <a href="#!">- 롯데리조트제주 아트빌라스</a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="nation-hotel-choice"
                                onClick={onClickNationHotel}
                                href="#!"
                              >
                                미국
                              </a>
                              <ul>
                                <li>
                                  <a href="#!">- 롯데뉴욕팰리스</a>
                                </li>
                                <li>
                                  <a href="#!">- 롯데호텔 시애틀</a>
                                </li>
                                <li>
                                  <a href="#!">- 롯데호텔 괌</a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="nation-hotel-choice"
                                onClick={onClickNationHotel}
                                href="#!"
                              >
                                러시아
                              </a>
                              <ul>
                                <li>
                                  <a href="#!">- 롯데호텔 모스크바</a>
                                </li>
                                <li>
                                  <a href="#!">- 롯데호텔 상트페테르부르크</a>
                                </li>
                                <li>
                                  <a href="#!">- 롯데호텔 블라디보스토크</a>
                                </li>
                                <li>
                                  <a href="#!">- 롯데호텔 사마라</a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="nation-hotel-choice"
                                onClick={onClickNationHotel}
                                href="#!"
                              >
                                일본
                              </a>
                              <ul>
                                <li>
                                  <a href="#!">- 롯데아라이리조트</a>
                                </li>
                                <li>
                                  <a href="#!">- 롯데시티호텔긴시초</a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="nation-hotel-choice"
                                onClick={onClickNationHotel}
                                href="#!"
                              >
                                베트남
                              </a>
                              <ul>
                                <li>
                                  <a href="#!">- 롯데호텔 사이공</a>
                                </li>
                                <li>
                                  <a href="#!">- 롯데호텔 하노이</a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="nation-hotel-choice"
                                onClick={onClickNationHotel}
                                href="#!"
                              >
                                미얀마
                              </a>
                              <ul>
                                <li>
                                  <a href="#!">- 롯데호텔 양곤</a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="nation-hotel-choice"
                                onClick={onClickNationHotel}
                                href="#!"
                              >
                                우즈베키스탄
                              </a>
                              <ul>
                                <li>
                                  <a href="#!">- 롯데시티호텔 타슈켄트팰리스</a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="check-inout-box">
                    <div
                      className="content"
                      ref={checkInoutBoxRef}
                      onClick={onClickCheckInoutBox}
                    >
                      <div className="check-in-box">
                        <span>체크인</span>
                        <a href="!#">03월 19일(일)</a>
                      </div>
                      <div className="day-box">
                        <span>1박</span>
                      </div>
                      <div className="check-out-box">
                        <span>체크아웃</span>
                        <a href="!#">03월 25일(토)</a>
                      </div>
                    </div>
                    <div className="room-select-box" ref={roomSelectBoxRef}>
                      <div className="content">
                        <div className="calendar-box">
                          <div className="current-month">
                            <div className="title">
                              <a onClick={onClickCalendarPrevBtn} href="#!">
                                <i></i>
                              </a>
                              <h4>
                                {state.currentYear}년 {state.currentMonth}월
                              </h4>
                            </div>
                            <div className="table-box">
                              <table className="current-table">
                                <thead>
                                  <tr>
                                    <th>일</th>
                                    <th>월</th>
                                    <th>화</th>
                                    <th>수</th>
                                    <th>목</th>
                                    <th>금</th>
                                    <th>토</th>
                                  </tr>
                                </thead>
                                <tbody id="current-td-tbody"></tbody>
                              </table>
                            </div>
                          </div>
                          <div className="next-month">
                            <div className="title">
                              <a onClick={onClickCalendarNextBtn} href="#!">
                                <i></i>
                              </a>
                              <h4>
                                {state.nextYear}년 {state.nextMonth}월
                              </h4>
                            </div>
                            <div className="table-box">
                              <table className="next-table">
                                <thead>
                                  <tr>
                                    <th>일</th>
                                    <th>월</th>
                                    <th>화</th>
                                    <th>수</th>
                                    <th>목</th>
                                    <th>금</th>
                                    <th>토</th>
                                  </tr>
                                </thead>
                                <tbody id="next-td-tbody"></tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        <div className="person-select-box">
                          <div className="content">
                            <div className="child-age-box">
                              <a href="#!">
                                <img src="./img/icon_noti.png" alt="" />
                                <span>어린이 연령 정보</span>
                              </a>
                            </div>
                            <div className="row row1">
                              <div className="title">
                                <h5>객실 1</h5>
                              </div>
                              <div className="adult-box">
                                <button type="button">-</button>
                                <span>성인2</span>
                                <button type="button">+</button>
                              </div>
                              <div className="children-box">
                                <button type="button">-</button>
                                <span>어린이0</span>
                                <button type="button">+</button>
                              </div>
                            </div>
                            <div className="row row2">
                              <div className="title">
                                <h5>객실 2</h5>
                              </div>
                              <div className="adult-box">
                                <button type="button">-</button>
                                <span>성인2</span>
                                <button type="button">+</button>
                              </div>
                              <div className="children-box">
                                <button type="button">-</button>
                                <span>어린이0</span>
                                <button type="button">+</button>
                              </div>
                            </div>
                            <div className="row row3">
                              <div className="title">
                                <h5>객실 3</h5>
                              </div>
                              <div className="adult-box">
                                <button type="button">-</button>
                                <span>성인2</span>
                                <button type="button">+</button>
                              </div>
                              <div className="children-box">
                                <button type="button">-</button>
                                <span>어린이0</span>
                                <button type="button">+</button>
                              </div>
                            </div>
                            <div className="add-room-box">
                              <a href="#!">
                                <span>객실추가</span>
                                <i>+</i>
                              </a>
                            </div>
                            <button type="button">선택완료</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="room-box">
                    <div
                      className="content"
                      ref={roomBoxRef}
                      onClick={onClickCheckInoutBox}
                    >
                      <div className="rooms">
                        <h5>객실수</h5>
                        <a href="!#">1</a>
                      </div>
                      <div className="adult">
                        <h5>성인</h5>
                        <a href="!#">2</a>
                      </div>
                      <div className="child">
                        <h5>어린이</h5>
                        <a href="!#">0</a>
                      </div>
                    </div>
                  </div>
                  <div className="promotion-box">
                    <div className="content">
                      <a href="#!">프로모션 코드</a>
                    </div>
                  </div>
                  <div className="search-box">
                    <div className="content">
                      <button>검색</button>
                    </div>
                  </div>
                  <div className="hide-click-box">
                    <div className="content">
                      <a href="!#">숨기기</a>
                    </div>
                  </div>
                </div>
                <div className="hide-input-box">
                  <div className="box-gap">
                    <input
                      type="text"
                      id="whereToGO"
                      placeholder="어디로 가시나요?"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div id="special-nav">
              <div
                onMouseLeave={onMouseLeaveNav}
                onMouseEnter={onMouseEnterNav}
                className="container"
              >
                <div className="content">
                  <div className="whole">
                    <h4>스페셜 오퍼</h4>
                  </div>
                  <div className="menu">
                    <ul>
                      <li>
                        <a href="!#">객실 프로모션</a>
                      </li>
                      <li>
                        <a href="!#">식음 프로모션</a>
                      </li>
                      <li>
                        <a href="!#">호텔 이벤트</a>
                      </li>
                      <li>
                        <a href="!#">해온 베딩 시스템</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div id="wedding-nav">
              <div
                onMouseLeave={onMouseLeaveWedNav}
                onMouseEnter={onMouseEnterWedNav}
                className="container"
              >
                <div className="content">
                  <div className="whole">
                    <h4>웨딩&컨벤션</h4>
                  </div>
                  <div className="menu-container">
                    <div className="menu">
                      <ul>
                        <li>
                          <a href="!#">호텔웨딩</a>
                        </li>
                        <li>
                          <a href="!#">소개</a>
                        </li>
                        <li>
                          <a href="!#">웨딩홀</a>
                        </li>
                        <li>
                          <a href="!#">웨딩 컨설팅</a>
                        </li>
                      </ul>
                    </div>
                    <div className="menu">
                      <ul>
                        <li>
                          <a href="!#">호텔 컨벤션</a>
                        </li>
                        <li>
                          <a href="!#">소개</a>
                        </li>
                        <li>
                          <a href="!#">연회장</a>
                        </li>
                        <li>
                          <a href="!#">컨벤션 문의</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

HeaderComponent.defaultProps = {
  //스페셜 오퍼 웨딩앤컨벤션 마우스 오버시 NAV 내려오는 애니 변수
  onMouseLi: false,
  onMouseSpecNav: false,
  onMouseWedLi: false,
  onMouseWedNav: false,

  //호텔 또는 도시 포커스시 하위 메뉴 내려오는 애니 변수
  isFocusMenu: false,
  isFocusInputBox: false,

  //객실예약에 사용되는 달력 변수
  currentYear: new Date().getFullYear(),
  currentMonth: new Date().getMonth() + 1,
  nextYear: "",
  nextMonth: "",
};

export default HeaderComponent;
