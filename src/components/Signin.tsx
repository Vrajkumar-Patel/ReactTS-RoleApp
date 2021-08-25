import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, Redirect, useHistory } from "react-router-dom";
import { auth } from "../fire";
import { UserDataType, Users } from "../types";
import { useDispatch, useSelector } from 'react-redux'
import { setIsAuth, setUser, setUserData } from "../redux/UserReducer";
import { StateType } from "../redux/store";

const Signin: React.FC = () => {
  const {isAuth} = useSelector((state: StateType) => state.user)
  const history = useHistory();
  const dispatch = useDispatch();
  const [previousUsers, setPreviousUsers] = useState<UserDataType[]>();

  const handleSignin = (values: any) => {
    const { email, password } = values;

    if (email && password) {
      auth.signInWithEmailAndPassword(email, password).then(({ user }) => {
        dispatch(setIsAuth(true))
        localStorage.setItem('isAuth', JSON.stringify(true))
        if (localStorage.getItem("users") !== undefined || null) {
          setPreviousUsers(JSON.parse(localStorage.getItem("users")!));
        }
        if (previousUsers) {
          let currentUser = previousUsers!.find((user) => user.email === email);
          localStorage.setItem("user", JSON.stringify(currentUser));
          dispatch(setUser({
            email: user?.email!,
            uid: user?.uid!,
          }))
          dispatch(setUserData(currentUser))

          if (currentUser?.role === Users.Admin) {
            return history.push("admin");
          } else if (currentUser?.role === Users.Manager) {
            return history.push("manager");
          } else if (currentUser?.role === Users.Customer) {
            return history.push("customer");
          }
        }
      });
    }
  };

  const user = JSON.parse(localStorage.getItem('user')!)

  if (isAuth && user) {
    if (user.role === Users.Admin) {
      return <Redirect to='/admin' />
    } else if (user.role === Users.Manager) {
      return <Redirect to='/manager' />
    } else if (user.role === Users.Customer) {
      return <Redirect to='/customer' />
    }
  }

  return (
    <div className="signin">
      <div className="signin_container">
        <h1
          style={{
            textAlign: "center",
            marginBottom: "25px",
            color: "whitesmoke",
          }}
        >
          Sign In
        </h1>
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 17 }}
          initialValues={{ remember: true }}
          onFinish={handleSignin}
          onFinishFailed={() => toast.error("Sign In Failed")}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
            style={{ color: "whitesmoke" }}
          >
            <Input />
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
              Sign In
            </Button>
          </Form.Item>
          <p style={{ textAlign: "center" }}> Don't Have an account?</p>
          <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
            <Button
              type="primary"
              style={{ background: "#173479", borderColor: "white" }}
            >
              <Link to="/signup">Sign Up</Link>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Signin;
