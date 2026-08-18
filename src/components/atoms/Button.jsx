export default function Button({ type = 'button', variant = 'primary', onClick, children }) {
    const baseStyle = "w-full py-2.5 md:py-3 px-4 rounded-[30px] text-[13px] md:text-sm transition-all duration-300 flex justify-center items-center gap-2 cursor-pointer";

    const variants = {
        primary: "bg-chill-button hover:bg-chill-button-hover text-white font-bold",
        outline: "bg-transparent border border-white/20 text-white hover:bg-white/5"
    };

    return (
        <button type={type} className={`${baseStyle} ${variants[variant]}`} onClick={onClick}>
            {children}
        </button>
    );
}