import './TitleScreen.css';
import Button from '../button/Button';

type TitleProps = {
  selectNumOfCards: string;
  handleOptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  gameStart: () => void;
};

const Title = ({
  selectNumOfCards,
  handleOptionChange,
  gameStart,
}: TitleProps) => {
  return (
    <div className="title_content">
      <div className="select_wrap">
        <p>枚数を選択</p>
        <div className="select_input_wrap">
          <input
            type="radio"
            id="card26"
            name="numOfCards"
            value="option26"
            checked={selectNumOfCards === 'option26'}
            onChange={handleOptionChange}
          />
          <label htmlFor="card26" className="title_label">
            26枚
          </label>
          <input
            type="radio"
            id="card52"
            name="numOfCards"
            value="option52"
            checked={selectNumOfCards === 'option52'}
            onChange={handleOptionChange}
          />
          <label htmlFor="card52" className="title_label">
            52枚
          </label>
        </div>
      </div>
      <div className="title_btn_wrap">
        <div className="title_start_button">
          <Button btnTxt="スタート" onClick={gameStart} />
        </div>
      </div>
    </div>
  );
};

export default Title;
