import './styles/main.css';
import imageLogo from './assets/logo-nlw.svg';

import * as Dialog from '@radix-ui/react-dialog';

import { useState, useEffect } from 'react';

import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { CreateAdModal } from './components/CreateAdModal';

interface GameInterface {
  id: string;
  title: string;
  banner: string;
  _count: {
    ads: number;
  } 
}
function App() {
  const [games, setGames] = useState<GameInterface[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => {
        setGames(data);
      });
  }, []);

  return (
    <div className="max-w-[1100px] mx-auto flex flex-col items-center my-20">
      <img src={imageLogo} alt="nlw" />

      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {
          games.map(game => {
            return (
              <GameBanner 
                key={game.id}
                bannerUrl={game.banner}
                title={game.title}
                adsCount={game._count.ads}
              />
            );
          })
        }
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
