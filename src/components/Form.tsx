import { IComponentSizeSpec } from '@qunhe/muya-theme-light'
import { Button, ButtonGroup, Space, Form, Input } from '@qunhe/muya-ui'
import { useCallback, useState } from 'react'
const defaultValues = {
    name: '',
    password: ''
}
export function FormDemo1(){
    const [size, setSize] = useState<IComponentSizeSpec>('m')
    const handleSubmit = useCallback(values => {
        alert(JSON.stringify(values, null, 4))
    }, [])
    console.log(1)
    return (
        <Space direction="vertical" spacing="s5" block>
            <ButtonGroup outline>
                <Button selected={size === 'xl'} onClick={() => setSize('xl')}>
                    xl
                </Button>
                <Button selected={size === 'l'} onClick={() => setSize('l')}>
                    l
                </Button>
                <Button selected={size === 'm'} onClick={() => setSize('m')}>
                    m
                </Button>
                <Button selected={size === 's'} onClick={() => setSize('s')}>
                    s
                </Button>
            </ButtonGroup>
            <Form defaultValues={defaultValues} onSubmit={handleSubmit} size={size} labelWidth={100}>
                <Form.Item name="name" label="用户名" rule={[
                    {
                        type: 'string',
                        required: true,
                        min: 3,
                        message: '用户名长度不能小于3'
                    }
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item name="password" label="密码" rule={[
                    {
                        type: 'string',
                        required: true,
                        min: 3,
                        message: '请输入密码'
                    }
                ]}>
                    <Input />
                </Form.Item>
            </Form>
        </Space>
    )
}

