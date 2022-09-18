import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import { Input } from './Form/Input';

import { Check, GameController } from 'phosphor-react';
import { FormEvent, useEffect, useState } from 'react';

interface GameInterface {
  id: string;
  title: string;
}

export function CreateAdModal() {
  const [games, setGames] = useState<GameInterface[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => {
        setGames(data);
      });
  }, []);

  function handleCreateAd(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    console.log(data.weekDays)
  }

  return (
    <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed'/>

          <Dialog.Content className="fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
            <Dialog.Title className='text-3xl font-black'>
              Publique um anúncio
            </Dialog.Title>
            <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className='font-semibold' htmlFor="game">Qual o game?</label>
                <select
                  className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none" 
                  id="game"
                  name="game" 
                  defaultValue=""
                >
                  <option disabled value="">Selecione o game que deseja jogar</option>
                  {games.map(game => {
                    return <option key={game.id} value={game.id}>{game.title}</option>
                  })}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="name">Seu nome (ou nickname)</label>
                <Input name="name" id="name" placeholder='Como te chamam dentro do game?' />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                  <Input name="yearsPlaying" id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO"/>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="discord">Discord</label>
                  <Input name="discord" id="discord" placeholder='Usuario#0000'/>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="weekDays">Quando costuma jogar?</label>
                    <ToggleGroup.Root 
                      type="multiple" 
                      className="grid grid-cols-4 gap-2"
                      value={weekDays}
                      onValueChange={setWeekDays}
                    >
                      <ToggleGroup.Item 
                        title="Domingo"
                        value="0"
                        className={`w-8 h-8 ${weekDays.includes('0') ? "bg-violet-500" : "bg-zinc-900"}`}
                      >
                          D
                      </ToggleGroup.Item>
                      <ToggleGroup.Item 
                        title="Segunda"
                        value="1"
                        className={`w-8 h-8 ${weekDays.includes('1') ? "bg-violet-500" : "bg-zinc-900"}`}
                      >
                        S
                      </ToggleGroup.Item>
                      <ToggleGroup.Item 
                        title="Terça"
                        value="2"
                        className={`w-8 h-8 ${weekDays.includes('2') ? "bg-violet-500" : "bg-zinc-900"}`}
                      >
                        T
                      </ToggleGroup.Item>
                      <ToggleGroup.Item 
                        title="Quarta"
                        value="3"
                        className={`w-8 h-8 ${weekDays.includes('3') ? "bg-violet-500" : "bg-zinc-900"}`}
                      >
                        Q
                      </ToggleGroup.Item>
                      <ToggleGroup.Item 
                        title="Quinta"
                        value="4"
                        className={`w-8 h-8 ${weekDays.includes('4') ? "bg-violet-500" : "bg-zinc-900"}`}
                      >
                        Q
                      </ToggleGroup.Item>
                      <ToggleGroup.Item 
                        title="Sexta"
                        value="5"
                        className={`w-8 h-8 ${weekDays.includes('5') ? "bg-violet-500" : "bg-zinc-900"}`}
                      >
                        S
                      </ToggleGroup.Item>
                      <ToggleGroup.Item 
                        title="Sábado"
                        value="6"
                        className={`w-8 h-8 ${weekDays.includes('6') ? "bg-violet-500" : "bg-zinc-900"}`}
                      >
                        S
                      </ToggleGroup.Item>
                    </ToggleGroup.Root>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="hourStart">Qual horário do dia?</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input name="hourStart" id="hourStart" type="time" placeholder='De'/>
                    <Input name="hourEnd" id="hourEnd" type="time" placeholder='Até'/>
                  </div>
                </div>
              </div>

              <label className="mt-2 flex items-center gap-2 text-sm">
                <Checkbox.Root className="w-6 h-6 p-1 rounded bg-zinc-900">
                  <Checkbox.Indicator>
                    <Check className="w-4 h-4 text-emerald-400" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                Costumo me conectar ao chat de voz
              </label>

              <footer className="mt-4 flex justify-end gap-4">
                <Dialog.Close 
                  type="button"
                  className="bg-zinc-500 px-5 h-12 rounded-md text-semibold hover:bg-zinc-600 transition-colors"
                >
                  Cancelar
                </Dialog.Close>
                <button 
                  type="submit"
                  className="bg-violet-500 px-5 h-12 rounded-md text-semibold flex items-center gap-3 hover:bg-violet-600 transition-colors"
                >
                  <GameController className="w-6 h-6"/>
                  Encontrar duo
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
  );
}