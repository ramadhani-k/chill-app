export default function Input({ id, type = 'text', placeholder, required = false, ...props }) {
    return (
        <input
            id={id}
            type={type}
            placeholder={placeholder}
            required={required}
            // px-4 = padding kiri kanan 16px | py-2.5 = padding atas bawah 10px
            // md:py-3 = padding atas bawah 12px saat layar desktop
            className="w-full px-4 py-2.5 md:py-3 bg-transparent border border-white/20 rounded-[30px] text-white text-[13px] md:text-sm outline-none transition-all duration-300 focus:border-white/50 focus:bg-white/5"
            {...props}
        />
    );
}