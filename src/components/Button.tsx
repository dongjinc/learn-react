import {
  Button,
  OutlineButton,
  Space,
  toast,
} from "@qunhe/muya-ui";
import styled, { css, CSSObject } from "styled-components";

const lp = () => {
  return new Promise<void>((res, reject) => {
    setTimeout(() => {
      toast.success("延时事件触发完成");
      reject();
    }, 3000);
  });
};

const cssObject = () => {
    const okl: CSSObject = {}
    okl.background = 'red'
    return css`
        ${okl}
    `
}

const styledDiv = (props) => {
  const { color } = props;
  return css`
    color: ${color};
    ${cssObject()}
  `;
};

const StyledCommon = styled.div`
  ${styledDiv({ color: "red" })}
`;

export function AutoLoadingDemo() {
  const delyEvent = async () => {
    const result = await lp();
    console.log(result);
  };
  
  return (
    <Space
      spacing="s4"
      styles={{
        wrapper: {
          flexWrap: "wrap",
        },
        item: {
          marginBottom: 12,
        },
      }}
    >
      <Button type="primary" onClick={delyEvent} autoLoading>
        <StyledCommon>普通按钮</StyledCommon>
      </Button>
      <OutlineButton type="primary" onClick={delyEvent} autoLoading>
        线框按钮
      </OutlineButton>
    </Space>
  );
}
