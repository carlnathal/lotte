import React from 'react';
import { Link } from 'react-router-dom';


function TopModalComponent() {

  //탑모달 닫기 애니메이션
  const onClickModalClose=(e)=>{
    const topModal = document.getElementById('topModal')

    topModal.classList.add('off')
  }

  return (
    <div id='topModal' className=''>
      <div className="container">
        <div className="gap">
          <div className="content">
            <h2>
              <strong>2023 리워즈 멤버십 리뉴얼 안내</strong>
              <a href="!#">자세히보기</a>
              <button onClick={onClickModalClose}></button>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopModalComponent;