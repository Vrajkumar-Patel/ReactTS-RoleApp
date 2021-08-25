import React, { useState } from "react";
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Typography,
  Button,
  Space,
} from "antd";

interface Item {
  key: string;
  task: string;
}

const originData: Item[] = [];

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const Admin2 = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [count, setCount] = useState<number>(0);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Task",
      dataIndex: "task",
      width: "50%",
      editable: true,
    },

    {
      title: "Actions",
      //   dataIndex: 'operation',
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Space>
              <Button
                type="primary"
                style={{ background: "#27ae60", border: "none" }}
              >
                <a href="javascript:;" onClick={() => save(record.key)}>
                  Save
                </a>
              </Button>
              <Button
                type="primary"
                style={{ background: "#95a5a6", border: "none" }}
              >
                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                  <a>Cancel</a>
                </Popconfirm>
              </Button>
            </Space>
          </span>
        ) : (
          <>
            <Space>
              <Button type="primary">
                <Typography.Link
                  disabled={editingKey !== ""}
                  onClick={() => edit(record)}
                >
                  Edit
                </Typography.Link>
              </Button>
              <Button
                type="primary"
                style={{ background: "red", border: "none" }}
              >
                <Typography.Link
                  disabled={editingKey !== ""}
                  onClick={() => handleDelete(record.key)}
                >
                  Delete
                </Typography.Link>
              </Button>
            </Space>
          </>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const AddTask = () => {
    const newTasks: Item[] = [...data];
    newTasks.push({
      key: count.toString(),
      task: "Write you task Here",
    });
    setData(newTasks);
    setCount(count + 1);
  };

  const handleDelete = (key: string) => {
    const newTasks: Item[] = [...data];
    const index = newTasks.findIndex((item) => item.key === key);
    newTasks.splice(index, 1);
    setData(newTasks);
  };

  return (
    <Form form={form} component={false}>
      <Button onClick={AddTask} type="primary" style={{ width: "100%" }}>
        Add Task
      </Button>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default Admin2;
