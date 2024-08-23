import LoginLayout from "@/components/layout/loginLayout/LoginLayout.tsx";
import {Form, Input, Button} from "antd";
import {useNavigate} from "react-router-dom";
import {registerService} from "@/api/user";
import {Link} from "react-router-dom";
import {useState} from "react";

interface RegisterFormData {
    email: string;
    password: string;
}

const RegisterPage = () => {
    const [buttonLoading, setButtonLoading] = useState(false);

    const emailRules = [
        { required: true, message: 'Please provide your email for registration! (｡•̀ᴗ-)✧' },
        { type: 'email', message: 'Hmm, this email seems off. Could you try again? (｡•́︿•̀｡)' },
    ];

    const passwordRules = [
        { required: true, message: 'Don’t forget to set a password for your new account! (｡•̀ᴗ-)✧' },
        { min: 6, max: 20, message: 'Password must be 6-20 characters long. Thank you! (＾▽＾)' },
    ];

    const navigate = useNavigate();
    const register = async (values: RegisterFormData) => {
        if (buttonLoading) return;
        console.log(values);
        try {
            setButtonLoading(true);
            setTimeout(() => {
                setButtonLoading(false);
            }, 2000)
            await registerService(values).then(response => {
                console.log(response);
                if (response.code === 200) {
                    console.log("register successfully");
                    setButtonLoading(false);
                    navigate("/")
                }
            }).catch(error => {
                console.log(error);
                setButtonLoading(false);
            })
        } catch (error) {
            setButtonLoading(false);
            console.log(error);
        }
    }
    return (
        <LoginLayout>
            <div className="flex  justify-center items-start text-white w-full h-full rounded-md ">
                <h1 className="leftBox ">
                    </h1>
                <Form onFinish={register} >
                    <Form.Item className="text-center">
                    <span className="Title">Register</span>
                </Form.Item>
                    <Form.Item name="email" rules={emailRules} className={"w-auto h-auto"}>
                        <Input placeholder="Email" className={"antInput"}/>
                    </Form.Item>
                    <Form.Item name="password" rules={passwordRules}>
                        <Input.Password type="password" placeholder="Password" className={"antInput"}/>
                    </Form.Item>
                    <Form.Item className={"text-white text-left mb-2"}>
                        <p className="changeText">Already have an account? <Link to={"/login"} className={"underline"}>Login</Link></p>
                    </Form.Item>
                    <Form.Item className={"text-center "}>
                        <Button  className={"registerButton"} htmlType="submit" loading={buttonLoading} >{buttonLoading ? "" : "Register"}</Button>
                    </Form.Item>
                </Form>
            </div>

        </LoginLayout>
    )
}

export default RegisterPage;