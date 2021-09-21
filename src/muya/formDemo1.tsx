// form表单基本使用
import {
  Button,
  Form,
  FormItem,
  IButtonNode,
  IFormBag,
  IFormItemProps,
  Input,
  InputNumber,
  RangeInput,
} from "@qunhe/muya-ui";
import { MouseEventHandler, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { ReactInfo } from "../interface";
import { RuleItem } from "async-validator/dist-types";
import { isEmpty, min } from "lodash";

type FormItems = Omit<IFormItemProps<any>, "children"> & { ele: JSX.Element };
// interface FormItemInfo {
//     rule: RuleI | RuleItem[]
// }

const requireValidate = (): RuleItem => {
  return {
    required: true,
    message: '该选项必填！'
  };
};

const formItemList: FormItems[] = [
  {
    label: "账号",
    name: "name",
    rule: [requireValidate()],
    ele: <Input />,
  },
  {
      label: '密码',
      name: 'password',
      ele: <Input type="password" />
  },
  {
      label: '幸运数字',
      name: 'inputNumber',
      rule: [{
          type: 'number',
          required: true,
          message: '必须填写合法数字',
        }],
      ele: <InputNumber />
  },
  {
      label: '回家的路',
      name: 'way',
      getValueFromEvent: e => e.value,
      rule: [
          {
              type: 'array',
              required: true,
              asyncValidator: (_r, v, cb) => {
                  if(v.length === 0){
                      return cb('不能为空！')
                  }
                  if(!v.every((c: any) => !!c)){
                    return cb('asd')
                  }
                  cb()
              },
              min: 2
          }
      ],
      ele: <RangeInput placeholder={['起点', '终点']} width={200} middleNode={['至']} />
  }
];

export default function Simple() {
  const buttonRef = useRef(0);
  const formBagRef = useRef<IFormBag<any>>();
  const [defaultInputNumber, setDefaultInputNumber] = useState(0);

  const formItemMemo = useMemo(() => {
    const formItems = formItemList.map((item) => {
      const { ele, ...rest } = item;
      return (
        <FormItem key={item.name} {...rest}>
          {ele}
        </FormItem>
      );
    });
    console.log(formItems);
    return formItems;
  }, []);

  const onSubmitClick = (e) => {
    // setDefaultInputNumber(defaultInputNumber + 1)
    buttonRef.current++;
    formBagRef.current.setFieldValue("inputNumber", buttonRef.current);
    // console.log('come me')
    // const inp = document.querySelector('button')
    // console.log(inp, 'inp')
    // inp.style.backgroundColor = 'deeppink'
    // inp.style.color = "#fff"
    // @ts-ignore
    // ReactDOM.findDOMNode(inp).style.color = "#fff"
    // -----
    // e.target.style.backgroundColor = '#90f'
    // -----
    // buttonRef.current.style.backgroundColor = '#90f'
  };
  const handleSubmit = (form, helper) => {
    console.log(form, helper);
    helper.setFieldValue("password", 12);
  };
  return (
    <>
      <Button onClick={onSubmitClick}>come</Button>
      <Form
        formBagRef={formBagRef}
        inlineSpacing={48}
        defaultValues={{
            way: []
        }}
        onSubmit={handleSubmit}
      >
       {formItemMemo}
        <FormItem>
          <Button htmlType="reset">重置</Button>
          <Button htmlType="submit" type="primary">
            提交
          </Button>
        </FormItem>
      </Form>
    </>
  );
}
