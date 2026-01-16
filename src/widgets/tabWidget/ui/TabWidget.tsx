import { useLocation } from 'react-router-dom';

function TabWidget() {
  const location = useLocation();

  const homePath = '/';
  const searchPath = '/search';
  const favoritesPath = '/favorites';

  const tabList = [
    {
      text: '홈',
      path: homePath,
      isActive: location.pathname === homePath,
    },
    {
      text: '검색',
      path: searchPath,
      isActive: location.pathname === searchPath,
    },
    {
      text: '즐겨찾기',
      path: favoritesPath,
      isActive: location.pathname === favoritesPath,
    },
  ];

  return (
    <div
      role="tablist"
      className="fixed bottom-10 lg:bottom-20 left-1/2 -translate-x-1/2 tabs tabs-box tabs-lg w-max lg:tabs-xl z-50 shadow-lg bg-base-100/80 backdrop-blur bg-base-300"
    >
      {tabList.map((tabinfo) => (
        <a role="tab" className={`tab ${tabinfo.isActive && 'tab-active'}`} href={tabinfo.path}>
          {tabinfo.text}
        </a>
      ))}
    </div>
  );
}

export default TabWidget;
