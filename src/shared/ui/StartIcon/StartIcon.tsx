type Props = {
  active: boolean;
};

function StartIcon({ active }: Props) {
  return (
    <div className="relative flex items-center justify-center cursor-pointer active:scale-90 transition-transform">
      {/* 테두리용 별 모양 (더 큰 크기) */}
      <div className="mask mask-star-2 size-[19px] absolute bg-gray-500" />
      {/* 내부 별 모양 (테두리 효과를 위한 작은 크기) */}
      <div
        className={`mask mask-star-2 size-[15px] absolute ${active ? 'bg-orange-200' : 'bg-white'}`}
      />
    </div>
  );
}

export default StartIcon;
