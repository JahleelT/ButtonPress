import React from 'react';
import 'tailwindcss';


interface ButtonProps {
  children: React.ReactNode;
  color?: string;
  textColor?: string;
  onClick?: (() => void);
}


export const Button: React.FC<ButtonProps> = ({ children, color = "bg-blue-500", textColor = "text-white", onClick }) => {

  return (

    <button
      onClick={onClick}
      className={`px-4 py-2 ${color} ${textColor} font-semibold rounded-lg shadow-md hover:brightness-110 active:scale-95 transition`}>
        {children}
    </button>

  );
}

export default Button;
