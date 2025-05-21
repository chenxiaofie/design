import React from 'react';
import { theme } from 'antd';

interface UnderlineInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const UnderlineInput: React.FC<UnderlineInputProps> = ({
  placeholder,
  value,
  onChange,
}) => {
  const { token } = theme.useToken();

  return (
    <div className="relative group">
      <input
        className="w-0 min-w-[120px] h-8 border-b border-transparent outline-none mx-2 
        transition-all duration-300 ease-in-out
        focus:w-full"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
      <div
        className="absolute bottom-0 left-2 w-full h-[1px] transform origin-left scale-x-0 transition-transform duration-300 ease-in-out group-focus-within:scale-x-100"
        style={{ backgroundColor: token.colorPrimary }}
      />
    </div>
  );
};

export default UnderlineInput;
