'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10 flex flex-col gap-10">
      {/* 🔓 Seção de Impacto */}
      <section className="text-center">
        <h1 className="text-5xl font-extrabold mb-6">CENTRAL DE FUGAS</h1>
        <p className="text-xl">Bem-vindo ao centro onde vidas comuns evaporam. Aqui começa sua fuga mental.</p>
        <Button className="mt-6 bg-purple-600 hover:bg-purple-800" onClick={() => router.push('/quiz')}>
          Fazer Diagnóstico de Prisão
        </Button>
      </section>

      {/* ☕ Conteúdo Gratuito */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-900 p-6 rounded-xl shadow-xl">
          <h2 className="text-2xl font-bold">Café com Tijolada</h2>
          <p className="mt-2">Vídeos curtos que jogam verdades na sua cara. Pílulas de brutalidade mental.</p>
        </div>
        <div className="bg-zinc-900 p-6 rounded-xl shadow-xl">
          <h2 className="text-2xl font-bold">Provo Café</h2>
          <p className="mt-2">Mini podcast semanal pra fazer seu cérebro pedir socorro.</p>
        </div>
      </section>

      {/* 📥 Pré-venda do Livro */}
      <section className="bg-yellow-800 p-8 rounded-xl text-center">
        <h2 className="text-3xl font-bold mb-4">PRÉ-VENDA LIBERADA DIA 21</h2>
        <p className="mb-4">O livro que vai destruir suas amarras internas. Se prepara pra ser desmontado página por página.</p>
        <Button className="bg-black hover:bg-white text-yellow-400 hover:text-black" onClick={() => router.push('/livro')}>
          Quero Ser o Primeiro a Fugir
        </Button>
      </section>

      {/* 💸 Portais */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/conteudo">
          <div className="bg-zinc-800 p-6 rounded-xl block">
            <h2 className="text-xl font-bold">🧠 Conteúdo Gratuito</h2>
            <p>Comece a viciar no plano mental da fuga.</p>
          </div>
        </Link>
        <Link href="/mentorias">
          <div className="bg-zinc-800 p-6 rounded-xl block">
            <h2 className="text-xl font-bold">🔥 Mentorias & IA</h2>
            <p>Transformação guiada, baseada em caos e consciência.</p>
          </div>
        </Link>
        <Link href="/produtos">
          <div className="bg-zinc-800 p-6 rounded-xl block">
            <h2 className="text-xl font-bold">📦 Produtos Digitais</h2>
            <p>Pegue os materiais secretos que já estão quebrando mentes.</p>
          </div>
        </Link>
        <Link href="/agencia">
          <div className="bg-zinc-800 p-6 rounded-xl block">
            <h2 className="text-xl font-bold">🚀 Agência de IA</h2>
            <p>Crie sua própria fuga automatizada com nosso time.</p>
          </div>
        </Link>
      </section>

      {/* 📣 Rodapé */}
      <footer className="text-center mt-10 border-t border-zinc-700 pt-6">
        <p className="text-sm text-zinc-400">Não fuja depois. Fuja agora. A liberdade tem prazo.</p>
      </footer>
    </div>
  )
} 