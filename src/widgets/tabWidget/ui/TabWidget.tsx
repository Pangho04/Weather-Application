import { useLocation } from 'react-router-dom';

function TabWidget() {
  const location = useLocation();

  const homePath = '/';
  const searchPath = '/search';
  const favoritesPath = '/favorites';

  return (
    <div
      role="tablist"
      className="fixed bottom-20 left-1/2 -translate-x-1/2 tabs tabs-box tabs-xl z-50 shadow-lg bg-base-100/80 backdrop-blur bg-base-300"
    >
      <a
        role="tab"
        className={`tab ${location.pathname === homePath && 'tab-active'}`}
        href={homePath}
      >
        홈
      </a>
      <a
        role="tab"
        className={`tab ${location.pathname === searchPath && 'tab-active'}`}
        href={searchPath}
      >
        검색
      </a>
      <a
        role="tab"
        className={`tab ${location.pathname === favoritesPath && 'tab-active'}`}
        href={favoritesPath}
      >
        즐겨찾기
      </a>
    </div>
  );
}

export default TabWidget;
