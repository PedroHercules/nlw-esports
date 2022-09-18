interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsCount: number;
} 

export function GameBanner(props: GameBannerProps) {
  return (
    <a href="" className='relative rounded-lg overflow-hidden'>
      <img src={props.bannerUrl} alt="banner" />
      <div className='w-full rounded-lg pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 right-0 left-0'>
        <strong className='text-base font-bold text-white block'>{props.title}</strong>
        <span className='text-xs text-zinc-300 text-sm block'>{props.adsCount} anúncio(s)</span>
      </div>
    </a>
  );
}