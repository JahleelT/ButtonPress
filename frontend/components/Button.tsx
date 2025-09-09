import React from 'react';


interface ButtonProps {
  children: React.ReactNode;
  color?: string;
  textColor?: string;
  onClick?: (() => void);
  disabled?: boolean;
}


export const Button: React.FC<ButtonProps> = ({ children, color = "bg-blue-500", textColor = "text-black", onClick, disabled=false }) => {

  return (

    <button
      onClick={onClick}
      className={`px-4 py-2 ${color} border border-black ${textColor} font-semibold rounded-lg shadow-md ${disabled ? "opacity-50 cursor-not-allowed" : "hover:brightness-110 active:scale-95"} transition mt-2 w-full`}>
        {children}
    </button>

  );
}

export default Button;
