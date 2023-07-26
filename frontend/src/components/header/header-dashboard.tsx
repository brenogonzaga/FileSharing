import styles from './header-dashboard.module.scss';
import { useState } from 'react';
import { ModalDownload } from '@/components/modal/download/download.modal';
import { ModalUpload } from '@/components/modal/upload/upload.modal';

export const HeaderDashboard = () => {
  const [modalDownload, setModalDownload] = useState(false);
  const [modalUpload, setModalUpload] = useState(false);

  const toggleModalDownload = () => {
    setModalDownload(!modalDownload);
    setModalUpload(false);
  };

  const toggleModalUpload = () => {
    setModalUpload(!modalUpload);
    setModalDownload(false);
  };

  return (
    <header className={styles.container}>
      <span className={styles.logo}>File Sharing</span>
      <div className={styles.menu}>
        <a onClick={toggleModalDownload}>Baixar arquivo</a>
        <a onClick={toggleModalUpload}>Enviar arquivo</a>
      </div>
      {modalDownload && <ModalDownload closeModal={toggleModalDownload} />}
      {modalUpload && <ModalUpload closeModal={toggleModalUpload} />}
    </header>
  );
};
