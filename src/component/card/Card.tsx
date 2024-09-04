import './Card.css';
import { card } from '../../App';

type CardProps = {
  card: card;
  index: number;
  onClick: (index: number) => void;
};

const Card = ({ card, index, onClick }: CardProps) => {
  return (
    <li className="card" key={index}>
      <div
        className={`card_inner ${card.open ? 'card_front' : ''}`}
        onClick={() => onClick(index)}
      >
        <span className={`card_color_${card.color}`}>
          {card.open ? card.num : ''}
        </span>
      </div>
    </li>
  );
};

export default Card;
