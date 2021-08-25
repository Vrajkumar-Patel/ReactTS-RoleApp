import React, { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import toast from "react-hot-toast";
import { Link, Redirect, useHistory } from "react-router-dom";
import { auth } from "../fire";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setUserData, setIsAuth } from "../redux/UserReducer";
import { UserDataType, Users } from "../types";
import { StateType } from "../redux/store";

const { Option } = Select;

const Signup: React.FC = () => {
  const { isAuth } = useSelector((state: StateType) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  // const [previousUsers, setPreviousUsers] = useState<UserDataType[]>([]);

  const handleSignUp = (values: any) => {
    const { email, password, name, role, age } = values;
    if (email && password) {
      auth.createUserWithEmailAndPassword(email, password).then(({ user }) => {
        let previousUsers;
        let stringUsers = localStorage.getItem('users');
        if ( stringUsers !== null) {
          previousUsers = JSON.parse(stringUsers) 
        } else {
          previousUsers = []
        }
        previousUsers?.push({
          email: user?.email!,
          uid: user?.uid!,
          name,
          role,
          age,
        });
        localStorage.setItem("users", JSON.stringify(previousUsers));
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: user?.email!,
            uid: user?.uid!,
            name,
            role,
            age,
          })
        );
        localStorage.setItem('isAuth' , JSON.stringify(true))

        dispatch(
          setUser({
            email: user?.email!,
            uid: user?.uid!,
          })
        );
        dispatch(
          setUserData({
            email: user?.email!,
            uid: user?.uid!,
            name,
            role,
            age,
          })
        );
        dispatch(setIsAuth(true));
      });
    }
    if (role === Users.Admin) {
      return history.push("admin");
    } else if (role === Users.Manager) {
      return history.push("manager");
    } else if (role === Users.Customer) {
      return history.push("customer");
    }
  };

  const user = JSON.parse(localStorage.getItem("user")!);

  if (isAuth && user) {
    if (user.role === Users.Admin) {
      return <Redirect to="/admin" />;
    } else if (user.role === Users.Manager) {
      return <Redirect to="/manager" />;
    } else if (user.role === Users.Customer) {
      return <Redirect to="/customer" />;
    }
  }

  return (
    <div className="signup">
      <div className="signup_container">
        <h1
          style={{
            textAlign: "center",
            marginBottom: "25px",
            color: "whitesmoke",
          }}
        >
          Sign Up
        </h1>
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          // onSubmitCapture={e => e.preventDefault()}
          wrapperCol={{ span: 17 }}
          initialValues={{ remember: true }}
          onFinish={handleSignUp}
          onFinishFailed={() => toast.error("Sign Up Failed")}
        >
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true }]}
            style={{ color: "whitesmoke" }}
          >
            <Select
              placeholder="Select a option and change input text above"
              //   onChange={onGenderChange}
              allowClear
            >
              <Option value="Admin">Admin</Option>
              <Option value="Manager">Manager</Option>
              <Option value="Customer">Customer</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your Name!" }]}
            style={{ color: "whitesmoke" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
            style={{ color: "whitesmoke" }}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: "Please input your Age!" }]}
            style={{ color: "whitesmoke" }}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
            style={{ color: "whitesmoke" }}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ borderColor: "white" }}
            >
              Sign Up
            </Button>
          </Form.Item>
          <p style={{ textAlign: "center" }}> Already Have an account?</p>
          <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
            <Button
              type="primary"
              style={{ background: "#173479", borderColor: "white" }}
            >
              <Link to="/signin">Sign In</Link>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
