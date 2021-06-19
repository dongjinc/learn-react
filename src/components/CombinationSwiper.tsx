import { Carousel, Img, ImgContainer, Swipe, useSwipe } from '@qunhe/muya-ui';
import { throttle } from 'lodash';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
const { PagerButton } = Carousel;
const imgs = [
  '//qhyxpicoss.kujiale.com/r/2019/08/27/L3D186S20ENDIB5TT7YUI5NYALUF3P3WW888_1920x1080.jpg',
  '//qhyxpicoss.kujiale.com/r/2019/08/23/L3D206S20ENDIBAMP6YUI5NYALUF3P3WE888_2560x1440.jpg',
  '//qhyxpicoss.kujiale.com/r/2019/08/07/L3D206S8ENDIBKVORYUI5L7ELUF3P3XE888_2560x1440.jpg',
  '//qhyxpicoss.kujiale.com/r/2019/08/24/L3D186S21ENDIB7VLLYUI5NFSLUF3P3W2888_1920x1080.jpg',
  '//qhyxpicoss.kujiale.com/r/2019/08/23/L3D123S21ENDIBAGI2AUI5NYALUF3P3XC888_3200x2400.jpg',
  '//qhyxpicoss.kujiale.com/r/2019/06/25/L3D206S8ENDIAHI4TYUI5NYALUF3P3X6888_2560x1440.jpg',
  '//qhyxpicoss.kujiale.com/r/2019/06/25/L3D206S8ENDIAHI4TYUI5NYALUF3P3X6888_2560x1440.jpg',
  '//qhyxpicoss.kujiale.com/r/2019/06/25/L3D206S8ENDIAHI4TYUI5NYALUF3P3X6888_2560x1440.jpg',
  '//qhyxpicoss.kujiale.com/r/2019/06/25/L3D206S8ENDIAHI4TYUI5NYALUF3P3X6888_2560x1440.jpg',
  '//qhyxpicoss.kujiale.com/r/2019/06/25/L3D206S8ENDIAHI4TYUI5NYALUF3P3X6888_2560x1440.jpg',
  '//qhyxpicoss.kujiale.com/r/2019/06/25/L3D206S8ENDIAHI4TYUI5NYALUF3P3X6888_2560x1440.jpg',
];
const Container = styled(ImgContainer)`
  display: flex;
  position: relative;
`;

const Mask = styled.div`
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;
const ActiveMask = styled.div`
  box-sizing: border-box;
  border: 4px solid #1a7af8;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;
const IndexImg = styled(Img)`
  height: 90px;
  position: relative;
`;
const PagerButtonCol = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 10;
  opacity: 0;
`;
const StyledIndexContainer = styled.div`
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  position: relative;

  &:hover {
    ${PagerButtonCol} {
      opacity: 1;
    }
  }
`;
const StyledSwipe = styled(Swipe)`
  margin: 0;
  width: 460px;
`;

function Demo1(){
  console.log('opp!!!')
  return (
    <div>123</div>
  )
}

export default function VerticalDemo() {
  const {
    stepIndex,
    offset,
    onNext,
    hasNext,
    hasPrev,
    onStepsChange,
    onPrev,
    onWheel,
    onWheelActive,
    onWheelDisable,
  } = useSwipe(); // 注意：https://reactjs.org/docs/events.html#event-pooling

  const wheelHandler = throttle(onWheel, 50, {
    leading: true,
    trailing: false,
  });
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0)
  useEffect(() => {
    setInterval(() => {
      setCount(count => count + 1)
    }, 4000) 
  }, [])
  return (
    <Container>
      {count}
      <Demo1 />
      <StyledIndexContainer>
          <PagerButton
            size="xl"
            arrow="left"
            disabled={!hasPrev}
            onClick={onPrev}
          />
        <StyledSwipe
          equalNum={4}
          gutter={8}
          offset={offset}
          onStepsChange={onStepsChange}
          stepIndex={stepIndex}
          onWheel={wheelHandler}
          onMouseEnter={onWheelActive}
          onMouseLeave={onWheelDisable}
        >
          {imgs.map((imgSrc, i) => {
            const selected = index === i;
            let node;

            if (!selected) {
              node = <Mask />;
            } else {
              node = <ActiveMask />;
            }

            const onClick = () => {
              setIndex(i);
            };

            return (
              <IndexImg key={i} onClick={onClick} src={imgSrc}>
                {node}
              </IndexImg>
            );
          })}
        </StyledSwipe>

          <PagerButton
            size="xl"
            arrow="right"
            disabled={!hasNext}
            onClick={onNext}
          />
      </StyledIndexContainer>
      {/* <StyledMainSwipe equalNum={1} stepIndex={index} duration={600}>
        {imgs.map((item, i) => (
          <StyledMainImg key={i} src={item} />
        ))}
      </StyledMainSwipe> */}
    </Container>
  );
}
