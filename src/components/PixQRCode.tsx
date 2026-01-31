import { Gift, Copy, Check } from "lucide-react";
import { useState } from "react";

function calcularCRC(payload: string): string {
  const polinomio = 0x1021;
  let resultado = 0xffff;

  for (let i = 0; i < payload.length; i++) {
    resultado ^= payload.charCodeAt(i) << 8;

    for (let j = 0; j < 8; j++) {
      if ((resultado & 0x8000) !== 0) {
        resultado = ((resultado << 1) ^ polinomio) & 0xffff;
      } else {
        resultado = (resultado << 1) & 0xffff;
      }
    }
  }

  return resultado.toString(16).toUpperCase().padStart(4, "0");
}

function gerarPixPayload(chave: string, nome: string, cidade: string): string {
  let payload = "";

  payload += "000201"; // Payload Format Indicator
  payload += "010212"; // Dinâmico

  // Merchant Account Information (26)
  let merchant = "";
  merchant += "0014BR.GOV.BCB.PIX";
  merchant += `01${chave.length.toString().padStart(2, "0")}${chave}`;
  payload += `26${merchant.length.toString().padStart(2, "0")}${merchant}`;

  payload += "52040000"; // MCC
  payload += "5303986"; // BRL
  payload += "5802BR"; // País

  payload += `59${nome.length.toString().padStart(2, "0")}${nome}`;
  payload += `60${cidade.length.toString().padStart(2, "0")}${cidade}`;

  payload += "62070503***"; // TXID padrão
  payload += "6304"; // CRC placeholder

  payload += calcularCRC(payload);

  return payload;
}

const PixQRCode = () => {
  const [copiado, setCopiado] = useState<boolean>(false);

  const pixPayload = gerarPixPayload(
    "26118641870",
    "Andresa",
    "RIBEIRAO PRETO",
  );

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    pixPayload,
  )}`;

  const copiarPix = async (): Promise<void> => {
    await navigator.clipboard.writeText(pixPayload);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

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

          <p className="text-center mt-4 text-primary font-display text-lg">
            PIX • Vale Presente
          </p>

          <button
            onClick={copiarPix}
            className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
          >
            {copiado ? (
              <>
                <Check className="w-4 h-4" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copiar PIX
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 text-muted-foreground">
        {/*<Gift className="w-5 h-5 text-primary" />*/}
        <span className="text-sm font-body">
          {/*Sua presença é o maior presente!*/}
        </span>
      </div>
    </div>
  );
};

export default PixQRCode;
