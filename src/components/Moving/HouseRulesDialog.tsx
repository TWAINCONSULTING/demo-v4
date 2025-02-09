import React from 'react';
import { X } from 'lucide-react';
import { Card } from '../ui/Card';

interface HouseRulesDialogProps {
  onClose: () => void;
}

export function HouseRulesDialog({ onClose }: HouseRulesDialogProps) {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
          <h2 className="sm:text-lg text-base font-semibold">Husordensregler for Digitalgården</h2>          
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="sm:p-6 p-3 sm:space-y-6 space-y-4">
          <p className="text-gray-600 sm:text-base text-sm">
            Styret i Digitalgården har utarbeidet følgende husordensregler for å sikre et trivelig, 
            trygt og ryddig bomiljø for alle beboere. Alle beboere forplikter seg til å følge disse 
            reglene, som er ment å fremme respekt, samarbeid og god kommunikasjon i fellesskapet.
          </p>

          <div className="sm:space-y-6 space-y-4">
            <section>
              <h3 className="font-semibold sm:text-lg text-base sm:mb-3 mb-2">1. Generelle regler</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 sm:text-base text-sm">
                <li>Alle beboere skal vise hensyn til naboene og bidra til et godt bomiljø.</li>
                <li>Det skal være ro i boligene og fellesområdene mellom kl. 23.00 og 07.00 på hverdager, og mellom kl. 00.00 og 08.00 i helgene.</li>
                <li>Ved eventuelle festligheter eller aktiviteter som kan forstyrre naboene, skal dette varsles på forhånd.</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold sm:text-lg text-base sm:mb-3 mb-2">2. Fellesområder</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 sm:text-base text-sm">
                <li>Fellesrom skal holdes ryddige og i orden til enhver tid.</li>
                <li>Alle beboere har ansvar for å rydde etter seg i fellesområdene.</li>
                <li>Bruk av fellesutstyr (som vaskemaskiner, verktøy, osv.) skal reserveres og benyttes etter gjeldende retningslinjer.</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold sm:text-lg text-base sm:mb-3 mb-2">3. Søppel og resirkulering</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 sm:text-base text-sm">
                <li>Søppel skal kastes i de riktige avfallsdunkene og i henhold til gjeldende kildesortering.</li>
                <li>Alle beboere skal bidra til at fellesområdene holdes rene og frie for søppel.</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold sm:text-lg text-base sm:mb-3 mb-2">4. Dyrehold</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 sm:text-base text-sm">
                <li>Dyrehold i bofellesskapet tillates kun etter godkjenning fra styret.</li>
                <li>Alle kjæledyr skal tas godt vare på og ikke forstyrre andre beboere.</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold sm:text-lg text-base sm:mb-3 mb-2">5. Parkering og sykkelparkering</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 sm:text-base text-sm">
                <li>Parkeringsplasser skal benyttes på en ryddig og respektfull måte.</li>
                <li>Sykkelparkering skal skje i de avsatte områdene, og syklene skal ikke blokkerer innganger eller gangveier.</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold sm:text-lg text-base sm:mb-3 mb-2">6. Støy og utendørsområder</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 sm:text-base text-sm">
                <li>Utendørs områder som hager og balkonger skal benyttes med respekt for naboene. Høyt støynivå og forstyrrelser skal unngås.</li>
                <li>Alle beboere skal være oppmerksomme på bruken av utendørsplasser, spesielt om kvelden og helger.</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold sm:text-lg text-base sm:mb-3 mb-2">7. Skader og vedlikehold</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 sm:text-base text-sm">
                <li>Eventuelle skader på bygningen eller fellesområder skal rapporteres til styret umiddelbart.</li>
                <li>Beboere er ansvarlige for å vedlikeholde egne boenheter.</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold sm:text-lg text-base sm:mb-3 mb-2">8. Styrets rolle og ansvar</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 sm:text-base text-sm">
                <li>Styret er ansvarlig for å håndheve husordensreglene og vil ta nødvendige tiltak ved brudd på reglene.</li>
                <li>Beboere kan kontakte styret for spørsmål eller bekymringer angående husordensreglene.</li>
              </ul>
            </section>

            <section>
              <p className="text-gray-600 sm:text-base text-sm">
                Vi ønsker alle beboere velkommen til å bidra til et positivt og trivelig bomiljø. 
                Husk at husordensreglene er laget for å ivareta alles interesser og sikre at alle 
                trives i vårt bofellesskap. Takk for at du respekterer reglene og bidrar til fellesskapet!
              </p>
            </section>
          </div>
        </div>
      </Card>
    </div>
  );
}