import { Breadcrumbs, Space, InlineButton } from '@qunhe/muya-ui';
export default function BasicDemo() {
  return (
    <Space direction="vertical" spacing="s8" block>
      <Breadcrumbs
        items={[
          {
            label: '顶层',
            url: '.',
          },
          {
            label: '层级二',
            url: '.',
          },
          {
            label: '层级三',
            url: '.',
          },
          {
            label: '当前层',
          },
        ]}
      />
      <Breadcrumbs>
        <InlineButton type="secondary" href="../">
          顶层
        </InlineButton>
        <InlineButton type="secondary" href="../../">
          层级二
        </InlineButton>
        <InlineButton type="secondary" href="../../">
          层级三
        </InlineButton>
        <InlineButton type="normal">当前层</InlineButton>
      </Breadcrumbs>
    </Space>
  );
}