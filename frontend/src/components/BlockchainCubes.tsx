export function BlockchainCubes() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated floating cubes */}
      <div className="cube cube-1" />
      <div className="cube cube-2" />
      <div className="cube cube-3" />
      <div className="cube cube-4" />
      <div className="cube cube-5" />
      <div className="cube cube-6" />

      <style>{`
        .cube {
          position: absolute;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, rgba(107, 33, 168, 0.3) 0%, rgba(107, 33, 168, 0.1) 100%);
          border: 1px solid rgba(168, 85, 247, 0.3);
          border-radius: 8px;
          animation: float 20s ease-in-out infinite;
          transform-style: preserve-3d;
        }

        .cube::before {
          content: '';
          position: absolute;
          top: -10px;
          left: 10px;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, rgba(107, 33, 168, 0.2) 0%, rgba(107, 33, 168, 0.05) 100%);
          border: 1px solid rgba(168, 85, 247, 0.2);
          border-radius: 8px;
          transform: skewY(-5deg);
        }

        .cube-1 {
          top: 10%;
          left: 5%;
          animation-delay: 0s;
          opacity: 0.6;
        }

        .cube-2 {
          top: 60%;
          left: 10%;
          width: 40px;
          height: 40px;
          animation-delay: -3s;
          opacity: 0.4;
        }

        .cube-3 {
          top: 20%;
          right: 10%;
          width: 80px;
          height: 80px;
          animation-delay: -5s;
          opacity: 0.5;
        }

        .cube-4 {
          top: 70%;
          right: 5%;
          width: 50px;
          height: 50px;
          animation-delay: -8s;
          opacity: 0.4;
        }

        .cube-5 {
          top: 40%;
          left: 2%;
          width: 30px;
          height: 30px;
          animation-delay: -12s;
          opacity: 0.3;
        }

        .cube-6 {
          top: 85%;
          right: 20%;
          width: 45px;
          height: 45px;
          animation-delay: -15s;
          opacity: 0.35;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) rotate(5deg);
          }
          50% {
            transform: translateY(-10px) rotate(-3deg);
          }
          75% {
            transform: translateY(-25px) rotate(3deg);
          }
        }
      `}</style>
    </div>
  );
}
