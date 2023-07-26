import styles from './signup.module.scss';
import { useState } from 'react';
import { handleSignup } from '@/api/main/helpers/account';
import { SignupModel } from '@/api/models/account';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/header/header';
import { Input } from '../../components/input/input';

export const Signup = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>('');
  const [form, setForm] = useState<SignupModel>({} as SignupModel);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    const result = await handleSignup(form);
    if (result.includes('sucess')) {
      navigate('/login');
    }
    setMessage(result);
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1>Signup</h1>
        <form>
          <Input
            label='Nome'
            name='name'
            type='text'
            placeholder='nome'
            value={form.name}
            disabled={false}
            onChange={handleChange}
          />
          <Input
            label='Usuário'
            name='username'
            type='text'
            placeholder='usuário'
            value={form.username}
            disabled={false}
            onChange={handleChange}
          />
          <Input
            label='Senha'
            name='password'
            type='password'
            placeholder='senha'
            value={form.password}
            disabled={false}
            onChange={handleChange}
          />
        </form>
        {message && <p>{message}</p>}
        <button className={styles.btn} onClick={handleSubmit}>
          Criar conta
        </button>
      </div>
    </>
  );
};
