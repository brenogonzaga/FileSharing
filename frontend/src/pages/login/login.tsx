import styles from './login.module.scss';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { handleLogin } from '@/api/main/helpers/account';
import { LoginModel } from '@/api/models/account';
import { Header } from '@/components/header/header';
import { Input } from '@/components/input/input';

export const Login = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>('');
  const [form, setForm] = useState<LoginModel>({} as LoginModel);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    const result = await handleLogin(form);
    if (result.includes('logado')) {
      navigate('/dashboard');
    }
    setMessage(result);
    event.preventDefault();
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1>Login</h1>
        <form>
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
        <button className={styles.btn} onClick={(e) => handleSubmit(e)}>
          Entrar
        </button>
        <p>Não possui uma conta?</p>
        <Link to='/signup'>Criar conta</Link>
      </div>
    </>
  );
};
