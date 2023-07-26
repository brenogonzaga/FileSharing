import styles from './share-modal.module.scss';
import { useState } from 'react';
import { handleShareFile } from '@/api/main/helpers/file';
import { FileResponse } from '@/api/models/file';
import { Input } from '@/components/input/input';

type Props = {
  file: FileResponse;
  toggleModal: () => void;
};

export const ModalShare = ({ file, toggleModal }: Props) => {
  const [username, setUsername] = useState('');
  const [messsage, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!username) {
      setMessage('Digite o usuário!');
      return;
    }
    const response = await handleShareFile({ fileId: file.fileId, username });
    setMessage(response);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(file.fileId);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.password}>
        <button onClick={toggleModal} className={styles.close}>
          Fechar
        </button>
        <div className={styles.content}>
          <p>Arquivo: {file.fileName}</p>
          <Input
            name='username'
            type='text'
            placeholder='Digite o nome do usuário'
            value={username}
            disabled={false}
            onChange={handleChange}
          />
          {messsage && <span>{messsage}</span>}
          <button onClick={handleSubmit} className={styles.btn}>
            Compartilhar
          </button>
          <hr />
          <span>Ou</span>
          <p>Compartilhe via: </p>
          <div className={styles.options}>
            <a href={`whatsapp://send?text=Use o código ${file.fileId} para baixar o arquivo.`}>
              <img src='/whatsapp.svg' />
            </a>
            <button onClick={handleCopyText}>Copiar ID</button>
          </div>
        </div>
      </div>
    </div>
  );
};
