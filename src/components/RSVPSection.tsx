import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Users, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const rsvpSchema = z.object({
  name: z.string().trim().min(1, "Por favor, insira seu nome").max(100, "Nome muito longo"),
  guests: z.number().min(1, "Mínimo 1 convidado").max(10, "Máximo 10 convidados"),
});

const RSVPSection = () => {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState(1);
  const { toast } = useToast();

  // Número do WhatsApp do aniversariante (com código do país)
  const whatsappNumber = "5516993103661"; // Altere para o número correto

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = rsvpSchema.safeParse({ name: name.trim(), guests });

    if (!result.success) {
      toast({
        title: "Erro",
        description: result.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    const guestText = guests === 1 ? "1 pessoa" : `${guests} pessoas`;
    const message = encodeURIComponent(
      `Olá Andresa! 🎉\n\n` +
      `Presença confirmada! 🥳\n\n` +
      `🙋 ${name.trim()}\n` +
      `👥 ${guestText}\n\n` +
      `Até lá! 🎂🎈`
    );


    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");

    toast({
      title: "Redirecionando...",
      description: "Você será direcionado para o WhatsApp!",
    });
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20 max-w-md mx-auto">
      <CardContent className="p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground font-body flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              Seu Nome
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-background/50 border-primary/30 focus:border-primary text-foreground placeholder:text-muted-foreground"
              maxLength={100}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="guests" className="text-foreground font-body flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              Quantidade de Pessoas
            </Label>
            <Input
              id="guests"
              type="number"
              min={1}
              max={10}
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
              className="bg-background/50 border-primary/30 focus:border-primary text-foreground"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-body text-lg py-6 gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Confirmar pelo WhatsApp
          </Button>
        </form>

        <p className="text-center text-muted-foreground text-sm mt-4 font-body">
          Ao clicar, você será redirecionado para o WhatsApp
        </p>
      </CardContent>
    </Card>
  );
};

export default RSVPSection;
