import { ReactElement } from "react";

type ButtonProps = {
  text: string;
  type?: "submit" | "button";
  size: "lg" | "sm" | "md";
  disabled?: boolean;
  startIcon?: ReactElement;
  onClickWithEvent?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClickWithoutEvent?: () => void;
  endIcon?: ReactElement;
  widthFull?: boolean;
  variant: "primary" | "secondary" | "danger";
};

const styleVairant = {
  primary: "bg-primary-500  text-white",
  secondary: "bg-secondary-500",
  danger: "bg-red-400 transition-colors hover:bg-red-500  text-white",
};

const styleSize = {
  lg: "px-6 py-3",
  md: "px-4 py-2",
  sm: "px-3 py-1",
};
const defaultStyles = "px-4 py-2  w-fit justify-center rounded-md font-light flex items-center";

const Button = ({ variant,type,disabled,widthFull,onClickWithoutEvent,size, text, startIcon, endIcon,onClickWithEvent }: ButtonProps) => {
  console.log("text and disabled is -----> ",text,disabled)
  return (
    <button type={type} disabled={disabled} onClick={onClickWithEvent?onClickWithEvent:onClickWithoutEvent} 
    className={defaultStyles + " "+ styleSize[size]  + " " + styleVairant[variant] +  " "+`${widthFull && 'w-full'}`
    + " " + `${disabled && 'opacity-50 cursor-not-allowed'}`
    }>
      {startIcon && <span className="pr-2">{startIcon}</span>}
      {text}
      {endIcon && <span className="pl-2">{startIcon}</span>}
    </button>
  );
};

export default Button;
