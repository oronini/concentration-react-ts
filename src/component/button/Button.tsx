import './Button.css';

type props = {
  btnTxt: string;
  onClick: () => void;
};

const Button = ({ btnTxt, onClick }: props) => {
  return (
    <button className="m_button" onClick={onClick}>
      {btnTxt}
    </button>
  );
};

export default Button;
