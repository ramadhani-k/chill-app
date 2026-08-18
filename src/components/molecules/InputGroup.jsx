import { useState } from 'react';
import Label from '../atoms/Label';
import Input from '../atoms/Input';

export default function InputGroup({ label, id, type = 'text', placeholder, required }) {
    const [showPassword, setShowPassword] = useState(false);

    const isPasswordType = type === 'password';
    const currentType = isPasswordType ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className="text-left mb-4">
            <Label htmlFor={id}>{label}</Label>
            <div className="relative w-full">
                <Input id={id} type={currentType} placeholder={placeholder} required={required} />

                {/* Render icon mata hanya jika inputnya bertipe password */}
                {isPasswordType && (
                    <img
                        src={showPassword ? "images/eye-icon.png" : "images/eye-off-icon.png"}
                        alt="Toggle Password"
                        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer w-4.5 h-4.5"
                        onClick={() => setShowPassword(!showPassword)}
                    />
                )}
            </div>
        </div>
    );
}