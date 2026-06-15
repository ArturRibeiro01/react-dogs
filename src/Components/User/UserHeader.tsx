import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { AccountHeader } from './UserHeader.styles';
import UserHeaderNav from './UserHeaderNav';

const UserHeader = () => {
  const [title, setTitle] = useState('');
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;
    switch (pathname) {
      case '/conta/postar':
        setTitle('Publicar post');
        break;
      case '/conta/estatisticas':
        setTitle('Estatísticas');
        break;
      default:
        setTitle('Minha conta');
    }
  }, [location]);

  return (
    <AccountHeader>
      <h1 className="title">{title}</h1>
      <UserHeaderNav />
    </AccountHeader>
  );
};

export default UserHeader;
