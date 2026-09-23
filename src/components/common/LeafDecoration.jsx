// src/components/common/LeafDecoration.jsx  — add an optional mirror
export default function LeafDecoration({ className = "", mirror = false }) {
  const blade = "M0,0 C-9,-34 -8,-72 0,-104 C8,-72 9,-34 0,0 Z";

  return (
    <svg
      viewBox="0 0 220 190"
      className={className}
      style={mirror ? { transform: "scaleX(-1)" } : undefined}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(196,182)">
        <g transform="rotate(38) scale(0.85)"><path d={blade} fill="#CFEFEB" /></g>
        <g transform="rotate(16) scale(1)"><path d={blade} fill="#A7E1D6" /></g>
        <g transform="rotate(-8) scale(1.08)"><path d={blade} fill="#7ECBBE" /></g>
        <g transform="rotate(-32) scale(0.9)"><path d={blade} fill="#9FDBD1" /></g>
        <g transform="rotate(-54) scale(0.7)"><path d={blade} fill="#CFEFEB" /></g>
      </g>
    </svg>
  );
}