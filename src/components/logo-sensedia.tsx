import Image from 'next/image';

interface LogoSendediaProps {
  type?: 'full' | 'icon';
}

export default function LogoSensedia({ type = 'full' }: LogoSendediaProps) {
  if (type === 'icon') {
    return <Image src="/icon-sensedia.png" alt="Icone da Sensedia" width={27} height={27} />;
  }

  return <Image src="/logo-sensedia.png" alt="Logo da Sensedia" width={140} height={39} />;
}
