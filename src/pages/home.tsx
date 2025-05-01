import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <h1>Mentoria Ikigai</h1>
      <p>Descubra seu propósito e transforme sua carreira com a metodologia Ikigai.</p>
      <button onClick={() => router.push('/comunidade')}>
        Começar Agora
      </button>
    </div>
  );
} 