import './cardList.css';
import Card from '../card/Card';
import { card } from '../../App';

type CardListProps = {
  cards: card[];
  onCardClick: (index: number) => void;
};

const CardList = ({ cards, onCardClick }: CardListProps) => {
  return (
    <ul className="cards">
      {cards.map((card, index) => (
        <Card key={index} card={card} index={index} onClick={onCardClick} />
      ))}
    </ul>
  );
};

export default CardList;
