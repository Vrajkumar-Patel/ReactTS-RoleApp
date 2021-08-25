import { Button, Form, Input, InputNumber, Mentions, Space } from "antd";
import React, { useState } from "react";
import { UserDataType } from "../types";
import { Link, Redirect } from "react-router-dom";
import toast from "react-hot-toast";

const Customer: React.FC = () => {
  const [nameEdit, setNameEdit] = useState<boolean>(false);
  const [emailEdit, setEmailEdit] = useState<boolean>(false);
  const [ageEdit, setAgeEdit] = useState<boolean>(false);

  const userDetails: UserDataType = JSON.parse(localStorage.getItem("user")!);

  const onFinish = (values: any) => {
    console.log(values);
    const { userid, role, name, email, age } = values;
    localStorage.setItem(
      "user",
      JSON.stringify({
        name,
        email,
        role,
        age,
        uid: userid,
      })
    );
    const newUserData: UserDataType = {
      name,
      email,
      role,
      age,
      uid: userid,
    };
    const usersData: UserDataType[] = JSON.parse(
      localStorage.getItem("users")!
    );
    const removedUsersData: UserDataType[] = usersData.filter(
      (user) => user.email !== email
    );
    removedUsersData.push(newUserData);
    localStorage.setItem("users", JSON.stringify(removedUsersData));
    toast.success("Data Changed Successfully");
  };

  if (!userDetails) {
    return <Redirect to="/" />;
  }

  return (
    <div className="manager">
      <Form
        name="managerDetails"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 17 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="UserID"
          name="userid"
          //   rules={[{ required: true, message: "Please input your User ID!" }]}
          initialValue={userDetails.uid}
        >
          <Mentions
            placeholder={userDetails.uid}
            defaultValue={userDetails.uid}
            value={userDetails.uid}
            readOnly
          />
        </Form.Item>
        <Form.Item label="Role" name="role" initialValue={userDetails.role}>
          <Mentions
            placeholder={userDetails.role}
            defaultValue={userDetails.role}
            value={userDetails.role}
            readOnly
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          //   rules={[{ required: true, message: "Please input your User ID!" }]}
          initialValue={userDetails.email}
        >
          <Mentions
            placeholder={userDetails.email}
            defaultValue={userDetails.email}
            value={userDetails.email}
            readOnly
          />
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your Name!" }]}
          className="formItem_input"
        >
          <Input
            placeholder={userDetails.name}
            defaultValue={userDetails.name}
            // value={userDetails.name}
          />
        </Form.Item>
        <Form.Item
          label="Age"
          name="age"
          rules={[{ required: true, message: "Please input your age!" }]}
        >
          <InputNumber
            max={99}
            min={10}
            placeholder={userDetails.age}
            defaultValue={parseInt(userDetails.age)}
            // value={parseInt(userDetails.age)}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
          <Button
            //   disabled={}
            htmlType="submit"
            type="primary"
            style={{ background: "#173479", borderRadius: "20px" }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Customer;
