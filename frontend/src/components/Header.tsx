import { ConnectWallet } from './ConnectWallet';

export function Header() {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center border-b border-bc-primary/30">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-bc-primary rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xl">B</span>
        </div>
        <span className="text-bc-text font-semibold text-lg hidden sm:block">Blockchain Academy</span>
      </div>
      <ConnectWallet />
    </header>
  );
}
