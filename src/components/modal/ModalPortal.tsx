import ReactDom from 'react-dom';

const ModalPortal = ({ children }: { children: React.ReactNode }) => {
  const el = document.getElementById('modal');
  return ReactDom.createPortal(children, el!);
};

export default ModalPortal;
