import { Link, Row, Space } from "@qunhe/muya-ui";
import { useState } from "react";
export default function BasicDemo() {
  const [busy, setBusy] = useState(false);
  return (
    <Space direction="vertical" spacing="s5">
      <Row>
        <Link
          constant={true}
          autoLoading
          htmlType="submit"
          href={undefined}
          target="_blank"
          type="normal"
          fontWeight="bold"
          onClick={() => {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(1)
                }, 5000)
            })
          }}
        >
          我是常规型链接
        </Link>
      </Row>
      <Row>
        <Link href="https://www.kujiale.com" target="_blank">
          我是强调型链接
        </Link>
      </Row>
      <Row>
        <Link href="https://www.kujiale.com" disabled>
          我是禁用链接
        </Link>
      </Row>
    </Space>
  );
}
