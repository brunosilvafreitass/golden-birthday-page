import { MapPin, Navigation, Clock, Calendar } from 'lucide-react';

const LocationSection = () => {
  const eventDetails = {
    venue: "Salão de Festas Elegance",
    address: "Rua das Flores, 123 - Centro",
    city: "São Paulo, SP",
    date: "15 de Fevereiro de 2025",
    time: "20:00",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Salão+de+Festas+São+Paulo"
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card rounded-2xl border border-primary/20 overflow-hidden">
        {/* Map Preview */}
        <div className="relative h-48 md:h-64 bg-muted overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1975659893394!2d-46.65563492392784!3d-23.56150056115698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1706000000000!5m2!1spt-BR!2sbr"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização do evento"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        </div>

        {/* Details */}
        <div className="p-6 md:p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-xl text-foreground">{eventDetails.venue}</h3>
              <p className="text-muted-foreground font-body">{eventDetails.address}</p>
              <p className="text-muted-foreground font-body">{eventDetails.city}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-sm font-body text-foreground">{eventDetails.date}</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-sm font-body text-foreground">{eventDetails.time}</span>
            </div>
          </div>

          <a
            href={eventDetails.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-primary text-primary-foreground font-display tracking-wide hover:bg-primary/90 transition-colors"
          >
            <Navigation className="w-4 h-4" />
            Como Chegar
          </a>
        </div>
      </div>
    </div>
  );
};

export default LocationSection;
