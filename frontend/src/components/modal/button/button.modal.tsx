import { FileResponse } from '@/api/models/file';

export type Props = {
  onClick: () => void;
  setFile: (file: FileResponse) => void;
  file: FileResponse;
  text: string;
  hidden?: boolean;
};

export const ModalButton = ({ onClick, setFile, file, text, hidden }: Props) => {
  const handleClick = () => {
    setFile(file);
    onClick();
  };
  return hidden ? null : (
    <button style={{ padding: '5px' }} onClick={handleClick}>
      {text}
    </button>
  );
};
