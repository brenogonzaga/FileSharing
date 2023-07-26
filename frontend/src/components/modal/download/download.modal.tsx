import styles from './download-modal.module.scss';
import { useState } from 'react';
import { handleFileDownload } from '@/api/main/helpers/file';
import { FileDownloadModel } from '@/api/models/file';
import { Input } from '@/components/input/input';

type Props = {
  closeModal: () => void;
};

export const ModalDownload = ({ closeModal }: Props) => {
  const [message, setMessage] = useState<string>('');
  const [form, setForm] = useState<FileDownloadModel>({} as FileDownloadModel);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await handleFileDownload(form);
    if (response === '400') {
      setMessage('Senha incorreta!');
      return;
    }
    setMessage(response);
    if (response.includes('sucesso')) {
      window.location.reload();
    }
  };

  const handleFormClick = (event: React.MouseEvent<HTMLFormElement>) => {
    event.stopPropagation();
  };

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <form onSubmit={handleSubmit} className={styles.container} onClick={handleFormClick}>
        <Input
          label='Arquivo ID'
          name='fileId'
          type='text'
          placeholder='ID do arquivo'
          value={form.fileId}
          disabled={false}
          onChange={(e) => handleChange(e)}
        />
        <Input
          label='Senha'
          name='password'
          type='password'
          placeholder='Senha'
          value={form.password}
          disabled={false}
          onChange={(e) => handleChange(e)}
        />
        {message && <p>{message}</p>}
        <button className={styles.btn} disabled={!(form.fileId && form.password)} type='submit'>
          Baixar
        </button>
      </form>
    </div>
  );
};
