import styles from './index.module.scss';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/header/header';

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, []);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Compartilhamento seguro de arquivos com File Sharing APP</h1>
          <div>
            <span>Segurança e Privacidade Aprimoradas:</span>
            <p>
              Nossa plataforma prioriza a segurança dos dados dos usuários, garantindo que todos os arquivos
              compartilhados sejam criptografados de ponta a ponta. Dessa forma, somente os destinatários
              autorizados poderão acessar o conteúdo, mantendo a privacidade e confidencialidade das
              informações.
            </p>
          </div>
          <div>
            <span>Acesso Multiplataforma:</span>
            <p>
              Acesse a plataforma a partir de qualquer dispositivo, seja um computador, tablet ou smartphone.
              Garantimos que você possa compartilhar e acessar seus arquivos de forma conveniente e segura, em
              qualquer lugar e a qualquer momento.
            </p>
          </div>
          <div>
            <span>Respeito à Privacidade dos Usuários:</span>
            <p>
              Nossa plataforma não armazena nenhum dado pessoal dos usuários, garantindo que as informações
              compartilhadas sejam mantidas em sigilo. Além disso, os arquivos compartilhados não são
              armazenados em nossos servidores, sendo mantidos apenas os arquivos criptografados.
            </p>
          </div>
        </div>
        <div>
          <img src='home.webp' alt='' className={styles.image} />
        </div>
      </div>
    </>
  );
};
