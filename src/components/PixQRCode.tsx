import { Gift } from 'lucide-react';

const PixQRCode = () => {
  // Placeholder QR code - in production, generate with actual PIX data
  const qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=00020126580014br.gov.bcb.pix0136exemplo-chave-pix-aniversariante5204000053039865802BR5925Nome%20do%20Aniversariante6009SAO%20PAULO62070503***6304";

  return (
    <div className="flex flex-col items-center">
      <div className="relative p-1 rounded-2xl glow-gold">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold via-gold-light to-gold opacity-20" />
        <div className="relative bg-card p-6 rounded-xl border border-primary/30">
          <div className="bg-white p-3 rounded-lg">
            <img
              src={qrCodeUrl}
              alt="QR Code PIX"
              className="w-48 h-48 md:w-56 md:h-56"
            />
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">Escaneie para presentear</p>
            <p className="text-primary font-display text-lg mt-1">PIX</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 text-muted-foreground">
        <Gift className="w-5 h-5 text-primary" />
        <span className="text-sm font-body">Sua presença é o maior presente!</span>
      </div>
    </div>
  );
};

export default PixQRCode;
