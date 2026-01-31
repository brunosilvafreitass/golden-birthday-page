import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Users, User, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const rsvpSchema = z.object({
  name: z.string().trim().min(1, "Por favor, insira seu nome").max(100, "Nome muito longo"),
  guests: z.number().min(1, "Mínimo 1 convidado").max(10, "Máximo 10 convidados"),
});

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx2pnRCPoWJH9zq47RUvdUAc5orcuUYbML5sWhdS29wtAD-OEH5eRd-0ATutLNWmfUclA/exec";

const RSVPSection = () => {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
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

    setIsLoading(true);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          guests: guests,
        }),
      });

      toast({
        title: "Presença Confirmada! 🎉",
        description: "Sua confirmação foi registrada com sucesso!",
      });

      // Reset form
      setName("");
      setGuests(1);
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      toast({
        title: "Erro",
        description: "Não foi possível enviar sua confirmação. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
              disabled={isLoading}
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
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body text-lg py-6 gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Confirmar Presença
              </>
            )}
          </Button>
        </form>

        <p className="text-center text-muted-foreground text-sm mt-4 font-body">
          Sua confirmação será salva automaticamente
        </p>
      </CardContent>
    </Card>
  );
};

export default RSVPSection;
