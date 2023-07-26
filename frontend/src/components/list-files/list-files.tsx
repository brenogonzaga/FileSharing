import styles from './list-files.module.scss';
import { useState } from 'react';
import { FileResponse } from '@/api/models/file';
import { ModalButton } from '@/components/modal/button/button.modal';
import { ModalPassword } from '@/components/modal/password/password.modal';
import { ModalShare } from '@/components/modal/share/share.modal';
import { handleDeleteFile } from '@/api/main/helpers/file';
import { ModalDelete } from '../modal/delete/delete.modal';

type Props = {
  files: FileResponse[];
  isShared: boolean;
};

export const ListFiles = ({ files, isShared }: Props) => {
  const [passwordModal, setPasswordModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [file, setFile] = useState<FileResponse>({} as FileResponse);

  const toggleModalPassword = () => {
    setPasswordModal(!passwordModal);
  };

  const toggleModalShare = () => {
    setShareModal(!shareModal);
  };

  const toggleModalDelete = () => {
    setDeleteModal(!deleteModal);
  };

  return (
    <>
      {files.length === 0 ? (
        <div className={styles.empty}>
          <span>Você não possui arquivos</span>
        </div>
      ) : (
        <div className={styles.files}>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Enviado por</th>
                <th>Data</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.fileId}>
                  <td>{file.fileName}</td>
                  <td>{file.sender}</td>
                  <td>{file.created_at}</td>
                  <td>
                    <ModalButton onClick={toggleModalPassword} setFile={setFile} file={file} text='Baixar' />
                  </td>
                  <td>
                    <ModalButton
                      onClick={toggleModalShare}
                      setFile={setFile}
                      file={file}
                      text='Compartilhar'
                      hidden={!isShared}
                    />
                  </td>
                  <td>
                    <ModalButton
                      onClick={toggleModalDelete}
                      setFile={setFile}
                      file={file}
                      text='Deletar'
                      hidden={!isShared}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {passwordModal && <ModalPassword file={file} toggleModal={toggleModalPassword} />}
          {shareModal && <ModalShare file={file} toggleModal={toggleModalShare} />}
          {deleteModal && <ModalDelete file={file} toggleModal={toggleModalDelete} />}
        </div>
      )}
    </>
  );
};
