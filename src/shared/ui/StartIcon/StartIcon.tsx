type Props = {
  active: boolean;
  size?: number;
};

function StartIcon({ active, size = 15 }: Props) {
  return (
    <div className="relative flex items-center justify-center cursor-pointer active:scale-90 transition-transform">
      {/* 테두리용 별 모양 (더 큰 크기) */}
      <div
        className="mask mask-star-2 absolute bg-gray-500"
        style={{ width: `${size + 4}px`, height: `${size + 4}px` }}
      />
      {/* 내부 별 모양 (테두리 효과를 위한 작은 크기) */}
      <div
        className={`mask mask-star-2 absolute ${active ? 'bg-orange-200' : 'bg-white'}`}
        style={{ width: `${size}px`, height: `${size}px` }}
      />
    </div>
  );
}

export default StartIcon;
