import styles from './password-modal.module.scss';
import { useState } from 'react';
import { handleFileDownload } from '@/api/main/helpers/file';
import { FileResponse } from '@/api/models/file';
import { Input } from '@/components/input/input';

type Props = {
  file: FileResponse;
  toggleModal: () => void;
};

export const ModalPassword = ({ file, toggleModal }: Props) => {
  const [password, setPassword] = useState('');
  const [messsage, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!password) {
      setMessage('Digite a senha!');
      return;
    }
    const response = await handleFileDownload({ fileId: file.fileId, password });
    if (response === '400') {
      setMessage('Senha incorreta!');
      return;
    }
    setMessage('Arquivo baixado com sucesso!');
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
            name='password'
            type='password'
            placeholder='Digite a senha'
            value={password}
            disabled={false}
            onChange={handleChange}
          />
          {messsage && <span>{messsage}</span>}
          <button onClick={handleSubmit} className={styles.btn}>
            Baixar
          </button>
        </div>
      </div>
    </div>
  );
};
