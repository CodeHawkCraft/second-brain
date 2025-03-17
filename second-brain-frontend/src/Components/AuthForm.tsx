import { ErrorMessage, Field, Form, Formik } from 'formik'
import  { useState } from 'react'
import { userSchemaValidations } from '../utils/validations'
import Buttton from './ui/Button';
import { IoEyeOff } from 'react-icons/io5';
import { FaEye } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { login, signUp } from '../api/authApi';
import { useMyContext } from '../Context/Context';
import { User } from '../utils/type';
type AuthData = {
    username: string;
    password: string;
  };
  
  type FormFields = {
    name: keyof AuthData;
    label: string;
    placeholder: string;
    type?: string;
  };
  
  const fields: FormFields[] = [
    {
      name: "username",
      label: "Username",
      placeholder: "Enter your email address",
      type: "text",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      type: "password",
    },
    
  ];
  
const AuthForm = () => {
    const {pathname}=useLocation();
    const {setToken,setUsername}=useMyContext();
    const [showPassword, setShowPassword] = useState(false);
  const navigate=useNavigate();
    async function handleSubmit(values: AuthData) {
      let response;
      if (pathname == "/signin") {
        response = await login(values) as User;
      } else {
        response = await signUp(values)  as User; 
      }
      setToken(response.token);
      setUsername(response.username);
      navigate("/dashboard");
    }
    
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={userSchemaValidations}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting,setValues }) => {
        return (
          <Form className="flex flex-col gap-5">
            {fields.map(({ name, label, placeholder, type, }, index) => (
              <div key={index} className="flex flex-col gap-2">
                <label
                  className="text-sm requiredLabel font-medium text-gray-700"
                  htmlFor={name}
                >
                  {label}
                </label>
                <div className="relative">
                  <Field
                    name={name}
                    placeholder={placeholder}
                    type={type === "password" && showPassword ? "text" : type}
                    className="p-4 rounded-md w-full border outline-none"
                  />
                  {type === "password" && (
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {!showPassword ? <IoEyeOff /> : <FaEye />}
                    </button>
                  )}
                </div>
                <ErrorMessage
                  name={name}
                  component="div"
                  className="text-wrap text-sm text-red-600"
                />
              </div>
            ))}

            <div className='flex gap-3'>
            <Buttton
              type="submit"
              disabled={isSubmitting}
              size="lg"
              widthFull
              variant="primary"
              text="SignIn"
            />

            <Buttton
              size="lg"
              onClickWithEvent={(e)=>{
                e.preventDefault();
                setValues(()=>{
                  return {username:'davinder123',password:'Password2025@'}
                })
              }}
              widthFull
              variant="secondary"
              text="Fill Test Crediantial"
            />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default AuthForm