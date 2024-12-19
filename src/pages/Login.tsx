import { Button, Form, FormProps, Input } from "antd";
import { LoginType } from "../types";
import { useLogin } from "../hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../utils/Notification";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const onFinish: FormProps<LoginType>["onFinish"] = async (values) => {
    try {
      setIsLoading(true);
      await useLogin(values);
      Notification("success", "Kirish muvaffaqiyatli bo'ldi");
      navigate("/");
    } catch (err) {
      Notification("error", "Kirishda xatolik yuz berdi");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-start md:gap-x-[80px] gap-x-10">
      <img
        className="h-screen w-[50%] object-cover max-sm:hidden "
        src="/login-img.png"
        alt="Najot ta'lim img"
      />
      <div className="pt-[60px] max-w-full sm:max-w-[380px]  max-sm:p-4 w-full pr-4 max-sm:mt-6">
        <img
          className="sm:mb-[129px] mb-10 " 
          src="login-logo.svg"
          alt="logo icon"
          width={202}
          height={41}
        />
        <h2 className="mb-8 text-[32px] max-md:text-center leading-[48px] font-semibold">
          Tizimga kirish
        </h2>
        <Form
          onFinish={onFinish}
          layout="vertical"
          className="w-full"
          autoComplete="off"
        >
          <Form.Item<LoginType>
            label="Login"
            name="login"
            rules={[{ required: true, message: "Login kiriting!" }]}
          >
            <Input size="large" placeholder="Loginni kiriting" />
          </Form.Item>

          <Form.Item<LoginType>
            label="Parol"
            name="password"
            rules={[{ required: true, message: "Parol kiriting!" }]}
          >
            <Input.Password placeholder="Parolni kiriting" size="large" />
          </Form.Item>
          <Form.Item label={null}>
            <Button
              size="large"
              loading={isLoading}
              className="!bg-[#0EB182] w-full hover:!bg-[#0EB182]/80"
              type="primary"
              htmlType="submit"
            >
              Kirish
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
