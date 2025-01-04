import QuranPlayer from '@/components/QuranPlayer'
import Image from 'next/image';

export default function Home() {

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  return (
    <main className="p-8 min-h-screen flex items-center justify-center bg-custom-gradient">
      <div className="w-full mx-auto">
        {/* <h1 className="text-3xl font-bold text-center mb-8">Quran Player</h1> */}
        <Image
          src={`${basePath}/assets/logo.png`}
          alt="Quran Logo"
          className="mx-auto mb-8 w-60"
          width={240}
          height={60}
          priority
        />
        <QuranPlayer />
      </div>
    </main>
  )
}