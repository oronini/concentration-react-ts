import './App.css';
import { useEffect, useState } from 'react';
import CardList from './component/cardList/CardList';
import GameSetScreen from './component/gameSetScreen/GameSetScreen';
import { numBlackArray, numRedArray } from './cardSet/cardSet';
import TitleScreen from './component/titleScreen/TitleScreen';
import GamePlayOther from './component/gamePlayOther/GamePlayOther';

export type card = {
  num: string;
  color: string;
  open: boolean;
  first: boolean;
  jug: boolean;
};

function App() {
  const shuffle = (array: card[]): card[] => {
    const newArray = [...array];
    newArray.map((card) => (card.jug = false));
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const shuffleCard = (array: Array<card>) => {
    return shuffle(array);
  };

  const shuffleCard26 = shuffleCard([...numBlackArray, ...numRedArray]);
  const shuffleCard52 = shuffleCard([
    ...numBlackArray,
    ...numRedArray,
    ...numBlackArray,
    ...numRedArray,
  ]);

  const [cards, setCards] = useState(shuffleCard([]));
  const [isTitle, setIsTitle] = useState(true);
  const [isFirst, setIsFirst] = useState(true);
  const [isSecond, setIsSecond] = useState(false);
  const [clickRestrictions, setClickRestrictions] = useState(false);
  const [firstId, setFirstId] = useState<number | undefined>();
  const [secondId, setSecondId] = useState<number | undefined>();
  const [misCount, setMisCount] = useState(0);
  const [gameSet, setGameSet] = useState(false);
  const [selectNumOfCards, setSelectNumOfCards] = useState('');

  useEffect(() => {
    if (isSecond === false) {
      return;
    }

    const timer = setTimeout(() => {
      if (firstId !== undefined && secondId !== undefined) {
        const newCards = [...cards];
        newCards[firstId] = { ...newCards[firstId], open: false };
        newCards[secondId] = { ...newCards[secondId], open: false };
        setCards(newCards);
      }
      setIsSecond(false);
      setClickRestrictions(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isSecond]);

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectNumOfCards(e.target.value);
  };

  const clicked = (index: number) => {
    if (clickRestrictions || cards[index].open) {
      return;
    } else if (isFirst) {
      setClickRestrictions(true);
      const newCards = [...cards];
      newCards[index] = { ...newCards[index], open: true };
      setFirstId(index);
      setCards(newCards);
      setIsFirst(false);
      setClickRestrictions(false);
    } else {
      setClickRestrictions(true);
      const newCards = [...cards];
      newCards[index] = { ...newCards[index], open: true };
      setCards(newCards);
      setSecondId(index);
      if (
        firstId !== undefined &&
        newCards[index].num !== newCards[firstId].num
      ) {
        setMisCount((prev) => prev + 1);
        setIsSecond(true);
      } else if (
        firstId !== undefined &&
        newCards[index].num === newCards[firstId].num
      ) {
        newCards[firstId] = { ...newCards[firstId], jug: true };
        newCards[index] = { ...newCards[index], jug: true };
        setCards(newCards);
        const tes = newCards.filter((jug) => {
          return jug.jug === false;
        });
        if (tes.length === 0) {
          setGameSet(true);
        }
        setClickRestrictions(false);
      }
      setIsFirst(true);
    }
  };

  const gameStart = () => {
    setIsTitle(false);
    if (selectNumOfCards === 'option26') {
      setCards(shuffleCard26);
    } else {
      setCards(shuffleCard52);
    }
  };

  const toTitle = () => {
    setIsTitle(true);
    setGameSet(false);
    setMisCount(0);
    setIsFirst(true);
    setSelectNumOfCards('');
  };

  const onceAgain = () => {
    if (selectNumOfCards === 'option26') {
      setCards(shuffleCard26);
    } else {
      setCards(shuffleCard52);
    }
    setIsFirst(true);
    setGameSet(false);
    setMisCount(0);
  };

  return (
    <div className="app">
      {isTitle ? (
        <TitleScreen
          selectNumOfCards={selectNumOfCards}
          handleOptionChange={handleOptionChange}
          gameStart={gameStart}
        />
      ) : (
        <div className="game_content">
          {gameSet ? (
            <GameSetScreen
              misCount={misCount}
              onOnceAgain={onceAgain}
              toTitle={toTitle}
            />
          ) : (
            <GamePlayOther
              misCount={misCount}
              onceAgain={onceAgain}
              toTitle={toTitle}
            />
          )}
          <CardList cards={cards} onCardClick={clicked} />
        </div>
      )}
    </div>
  );
}

export default App;
