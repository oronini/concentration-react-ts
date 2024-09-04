import Button from '../button/Button';
import './GamePlayOther.css';

type GamePlayOtherProps = {
  misCount: number;
  onceAgain: () => void;
  toTitle: () => void;
};

const GamePlayOther = ({
  misCount,
  onceAgain,
  toTitle,
}: GamePlayOtherProps) => {
  return (
    <div className="game_play_other">
      <p className="game_play_miscount">
        ミス回数 : <span>{misCount}</span>
      </p>
      <div className="game_play_button_wrap">
        <div className="game_play_re_start_button">
          <Button btnTxt="リスタート" onClick={onceAgain} />
        </div>
        <div className="game_play_title_back_button">
          <Button btnTxt="タイトルへ戻る" onClick={toTitle} />
        </div>
      </div>
    </div>
  );
};

export default GamePlayOther;
