import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SubmitProject } from './components/SubmitProject';
import { ProjectList } from './components/ProjectList';
import { DistributePrize } from './components/DistributePrize';
import { Footer } from './components/Footer';
import { BlockchainCubes } from './components/BlockchainCubes';
import { NetworkWarning } from './components/NetworkWarning';

function App() {
  return (
    <>
      <BlockchainCubes />
      <div className="relative z-10 flex flex-col min-h-screen">
        <NetworkWarning />
        <Header />
        <main className="flex-grow">
          <Hero />
          <SubmitProject />
          <ProjectList />
          <DistributePrize />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
