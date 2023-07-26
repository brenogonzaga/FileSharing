import styles from './modal-upload.module.scss';
import { useState } from 'react';
import { handleFileUpload } from '@/api/main/helpers/file';
import { Input } from '@/components/input/input';

type Props = {
  closeModal: () => void;
};

export const ModalUpload = ({ closeModal }: Props) => {
  const [message, setMessage] = useState<string>('');

  const [form, setForm] = useState({
    file: new File([], ''),
    password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    if (event.target.name === 'file') {
      const file = event.target.files?.[0];
      if (file) {
        setForm((prevState) => ({ ...prevState, [name]: file }));
      }
    } else {
      const value = event.target.value;
      setForm((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const closeFile = () => {
    setForm({ ...form, file: new File([], ''), password: '' });
  };

  const validateFileSize = (file: File) => {
    const maxSize = 10000000;
    if (file.size > maxSize) {
      setMessage(`O arquivo deve ter no máximo ${maxSize / 1000000}MB.`);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form.file && validateFileSize(form.file)) {
      const response = await handleFileUpload(form);
      closeFile();
      setMessage(response);
      if (response.includes('sucesso')) {
        window.location.reload();
      }
    }
  };

  const handleFormClick = (event: React.MouseEvent<HTMLFormElement>) => {
    event.stopPropagation();
  };

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <form onSubmit={handleSubmit} className={styles.container} onClick={handleFormClick}>
        {!form.file.name && (
          <Input
            label='Arquivo'
            name='file'
            type='file'
            placeholder='upload'
            value=''
            disabled={false}
            onChange={handleChange}
          />
        )}
        {form.file.name && (
          <div className={styles.progress}>
            <div className={styles.selected}>
              <p>
                Arquivo: <b>{form.file.name}</b>
              </p>
              <button onClick={closeFile}>X</button>
            </div>
          </div>
        )}
        <Input
          label='Senha do arquivo'
          name='password'
          type='password'
          placeholder='senha do arquivo'
          value={form.password}
          disabled={false}
          onChange={handleChange}
        />
        {message && <p>{message}</p>}
        <button className={styles.btn} disabled={!form.file.name} type='submit'>
          Enviar
        </button>
      </form>
    </div>
  );
};
