import styles from './delete-modal.module.scss';
import { useState } from 'react';
import { handleDeleteFile } from '@/api/main/helpers/file';
import { FileResponse } from '@/api/models/file';

type Props = {
  file: FileResponse;
  toggleModal: () => void;
};

export const ModalDelete = ({ file, toggleModal }: Props) => {
  const [messsage, setMessage] = useState('');

  const handleDelete = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const response = await handleDeleteFile(file.fileId);
    setMessage(response);
    if (response.includes('sucesso')) {
      window.location.reload();
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.delete}>
        <p>Tem certeza que deseja deletar o arquivo?</p>
        {messsage && <p>{messsage}</p>}
        <button onClick={handleDelete} className={styles.btn}>
          Deletar
        </button>
        <button onClick={toggleModal} className={styles.close}>
          Fechar
        </button>
      </div>
    </div>
  );
};
