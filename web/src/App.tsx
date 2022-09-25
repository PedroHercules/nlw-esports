import './styles/main.css';
import imageLogo from './assets/logo-nlw.svg';

import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';

import { useState, useEffect } from 'react';

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from "keen-slider/react"

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

  const [ref] = useKeenSlider<HTMLDivElement>({
    mode: "free-snap",
    breakpoints: {
      '(min-width: 400px)': {
        slides: {
          perView: 1.5,
          spacing: 7,
        }
      },
      '(min-width: 700px)': {
        slides: {
          perView: 5.3,
          spacing: 7,
        }
      },
    },
    slides: { 
      perView: 1.3,
      spacing: 7 
    }
  })

  useEffect(() => {
    axios('http://localhost:3333/games').then(response => {
        setGames(response.data);
    });
  }, []);

  return (
    <div className="max-w-[1100px] mx-auto flex flex-col items-center my-20">
      <img src={imageLogo} alt="nlw" />

      <h1 className='text-6xl text-white font-black mt-20 sm:text-3xl md:text-6xl'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.
      </h1>

      <div ref={ref} className='keen-slider mt-5 px-1'>
        {
          games.map(game => {
            return (
              <div className='relative keen-slider__slide rounded-lg'>
                <GameBanner 
                  key={game.id}
                  bannerUrl={game.banner}
                  title={game.title}
                  adsCount={game._count.ads}
                />
              </div>
              
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
