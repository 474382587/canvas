import { Modal, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const Item = Form.Item;

const SaveModal = ({ open, setOpen, onSubmit }) => {
  // const form = useForm()
  const [form] = Form.useForm();

  return (
    <Modal
      bodyStyle={{ padding: 20 }}
      open={open}
      onOk={() => {
        onSubmit(form.getFieldsValue());

        setOpen(false);
      }}
      onCancel={() => setOpen(false)}
    >
      <Form form={form}>
        <Item name="title" label="Title">
          <Input />
        </Item>
        <Item name="description" label="Description">
          <TextArea />
        </Item>
      </Form>
    </Modal>
  );
};

export default SaveModal;
