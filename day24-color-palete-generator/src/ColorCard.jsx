export default function ColorCard({ color }) {
  const copyColor = () => {
    navigator.clipboard.writeText(color);
    alert(`Copied ${color} to clipboard!`);
  };

  return (
    <div className="color-card" style={{ background: color }}>
      <p onClick={copyColor}>{color}</p>
    </div>
  );
}
