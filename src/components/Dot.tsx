"use client";

interface DotProps {
    color?: string; // Warna dot
    size?: number;  // Ukuran dot
}

const Dot:React.FC<DotProps> = ({color= "gray", size=8}) => {
    return (
        <div
            style={{
                backgroundColor: color,
                width: size,
                height: size,
            }}
            className="rounded-full"
        ></div>
    )
}

export default Dot;