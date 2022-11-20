import { Dropdown, Input, MenuProps } from 'antd';
import Search from 'antd/lib/input/Search';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './searchResults.less';
export const SearchResults = () => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState('');
  const onSearch = (e: string) => {
    setSearchValue(e);
    console.log('some async logic');
  };
  const items: MenuProps['items'] = [
    {
      label: <a href="https://www.antgroup.com">1st menu item board:some, column:some, tasks...</a>,
      key: '0',
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu itemboard:some, column:some, tasks...</a>,
      key: '1',
    },
    {
      label: '3rd menu item board:some, column:some, tasks...',
      key: '3',
    },
  ];

  return (
    <>
      {/* open={!!items.length} <--если засунуть в дропдаун, то выпадающее меню будет появляться */}
      <Dropdown menu={{ items }} trigger={['click']} open={!!items.length && !!searchValue}>
        <a
          onClick={(e) => {
            e.preventDefault();
          }}
          className="searchMenu"
        >
          <Input
            placeholder={t('searchTasks')}
            onChange={(e) => {
              onSearch(e.target.value);
            }}
            style={{ width: 250 }}
          />
        </a>
      </Dropdown>
    </>
  );
};
