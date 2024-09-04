import Button from '../button/Button';
import './GameSetScreen.css';

type props = {
  misCount: number;
  onOnceAgain: () => void;
  toTitle: () => void;
};

const GameSetScreen = ({ misCount, onOnceAgain, toTitle }: props) => {
  return (
    <div className="game_set_screen">
      <div className="game_set_title">game set</div>
      <div className="game_set_misCount_title">ミス回数</div>
      <div className="game_set_miscount">{misCount}</div>
      <div className="game_set_button_wrap">
        <div className="game_set_re_start_button">
          <Button btnTxt="もう一度" onClick={onOnceAgain} />
        </div>
        <div className="game_set_title_back_button">
          <Button btnTxt="タイトルへ戻る" onClick={toTitle} />
        </div>
      </div>
    </div>
  );
};

export default GameSetScreen;
