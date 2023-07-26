import styles from './header.module.scss';
import { Link, useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();

  const handleClickLogo = () => {
    navigate('/');
  };

  return (
    <header className={styles.container}>
      <span className={styles.logo} onClick={handleClickLogo}>
        File Sharing
      </span>
      <div className={styles.menu}>
        <Link to='/'>Início</Link>
        <Link to='/login'>Iniciar sessão</Link>
        <Link to='/signup'>Criar conta</Link>
      </div>
    </header>
  );
};
