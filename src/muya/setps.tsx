import { Carousel, Space, Step, Steps } from "@qunhe/muya-ui";
import React, { useCallback, useState } from "react";
import styled from "styled-components";

const {IndexIndicator} = Carousel

const stepsData = ["步骤一", "步骤二", "步骤三", "步骤四", "步骤五"];
const StyledContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  font-size: 14px;
  background-color: cadetblue;
  min-height: 200px;
`;

const StyledCarousel = styled(Carousel)`
  height: 400px;
`;
const StyledA = styled.a`
  width: 100%;
  height: 100%;
  display: block;
`;
export default function OnchangeDemo() {
  const [current, setCurrent] = useState(1);
  const handleChange = useCallback((next: number) => {
    setCurrent(next);
  }, []);

  const imgItems = React.useMemo(() => {
    return [
      "//qhyxpicoss.kujiale.com/r/2019/08/27/L3D186S20ENDIB5TT7YUI5NYALUF3P3WW888_1920x1080.jpg",
      "//qhyxpicoss.kujiale.com/r/2019/08/23/L3D206S20ENDIBAMP6YUI5NYALUF3P3WE888_2560x1440.jpg",
      "//qhyxpicoss.kujiale.com/r/2019/08/07/L3D206S8ENDIBKVORYUI5L7ELUF3P3XE888_2560x1440.jpg",
      "//qhyxpicoss.kujiale.com/r/2019/08/24/L3D186S21ENDIB7VLLYUI5NFSLUF3P3W2888_1920x1080.jpg",
      "//qhyxpicoss.kujiale.com/r/2019/08/23/L3D123S21ENDIBAGI2AUI5NYALUF3P3XC888_3200x2400.jpg",
      "//qhyxpicoss.kujiale.com/r/2019/06/25/L3D206S8ENDIAHI4TYUI5NYALUF3P3X6888_2560x1440.jpg",
    ].map((imgSrc) => ({
      imgSrc,
      children: <StyledA href={imgSrc} />,
    }));
  }, []);

  return (
    <Space direction="vertical" spacing="s7" block>
      <Steps current={current} onChange={handleChange}>
        <Steps.Step title="已完成" description="这里是描述部分"></Steps.Step>
        <Steps.Step title="处理中" description="这里是描述部分"></Steps.Step>
        <Steps.Step title="等待处理" description="这里是描述部分"></Steps.Step>
      </Steps>
      <StyledCarousel
        indicator="none"
        lazy="off"
        animation="grow"
        autoplay={5}
        duration={1000}
        arrowSize="xl"
        imgs={imgItems}
        // animation="swipe"
        arrow="none"
        indicatorTrigger="hover"
        defaultIndex={0}
        index={current}
        
      >
          <IndexIndicator index={current} num={2} color="#000" />
      </StyledCarousel>

      <StyledContent>{`${stepsData[current]}内容`}</StyledContent>
    </Space>
  );
}
