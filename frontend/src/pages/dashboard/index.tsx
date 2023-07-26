import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleFindFiles, handleFindSharedFiles } from '@/api/main/helpers/file';
import { FileResponse } from '@/api/models/file';
import { HeaderDashboard } from '@/components/header/header-dashboard';
import { ListFiles } from '@/components/list-files/list-files';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<FileResponse[]>([]);
  const [isShared, setIsShared] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
    getFiles();
  }, []);

  const getFiles = async () => {
    const files = await handleFindFiles();
    setFiles(files);
    setIsShared(true);
  };

  const getSharedFiles = async () => {
    const files = await handleFindSharedFiles();
    setFiles(files);
    setIsShared(false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <div className={styles.container}>
        <HeaderDashboard />
        <div className={styles.dashboard}>
          <div className={styles.sidebar}>
            <div className={styles.items}>
              <button onClick={getFiles}>Meus arquivos</button>
              <button onClick={getSharedFiles}>Compartilhados comigo</button>
            </div>
            <div className={styles.items}>
              <button onClick={logout}>Sair</button>
            </div>
          </div>
          <div className={styles.content}>
            <ListFiles files={files} isShared={isShared} />
          </div>
        </div>
      </div>
    </>
  );
};
