import React from 'react';
import { Mail, Phone, Clock, MapPin, AlertTriangle, Lightbulb } from 'lucide-react';
import { Card } from '../ui/Card';
import { Link } from 'react-router-dom';

export function ContactInfo() {
  const contactItems = [
    {
      icon: Mail,
      title: 'E-post',
      items: [
        { value: 'kontakt@mincondo.no', showLabel: false, fullWidth: true, isEmail: true }
      ]
    },
    {
      icon: Phone,
      title: 'Telefon',
      items: [
        { label: 'Styreleder', value: '412 25 243', showLabel: true },
        { label: 'Vaktmester', value: '468 39 838', showLabel: true }
      ]
    },
    {
      icon: MapPin,
      title: 'Adresse',
      items: [
        { value: 'Digitalgården 1', showLabel: false, fullWidth: true },
        { value: '0123 Oslo', showLabel: false, fullWidth: true }
      ]
    }
  ];

  return (
  <div className="sm:space-y-8 space-y-3">
    <Card>
      <div className="sm:p-6 p-3">
        <h2 className="sm:text-xl text-base font-semibold sm:mb-6 
          mb-2">Kontaktinformasjon</h2>

        <div className="sm:space-y-6 space-y-3 
          flex flex-col w-full h-full px-2">
          {contactItems.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.title} className="flex justify-between items-center gap-3 mt-2">
                {/* Left: Labels & Values */}
                <div className="flex-1">
                  <h3 className="font-medium sm:text-base text-sm">{section.title}</h3>
                  <div className="space-y-1 mt-1">
                    {section.items.map((item, index) => (
                      <div key={index} className="text-sm">
                        {item.showLabel ? (
                          <div className="flex items-center">
                            <span className="text-gray-800">{item.label}:</span>
                            <span className="text-gray-800 ml-1">{item.value}</span>
                          </div>
                        ) : (
                          <div className={`text-gray-800 ${item.fullWidth ? 'text-left' : 'text-right'}`}>
                            {item.isEmail ? (
                              <a 
                                href={`mailto:${item.value}`}
                                className="text-condo-dark hover:text-condo-med transition-colors"
                              >
                                {item.value}
                              </a>
                            ) : (
                              item.value
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Icon */}
                <div className="p-2 bg-gray-50 rounded-lg flex-shrink-0">
                  <Icon className="h-5 w-5 text-gray-600" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>

      <div className="space-y-4 px-1 ml-2 hidden sm:block" id="userContactCondo">
        <h3 className="mt-auto text-lg mb-4 font-semibold">Tilbakemelding på Condo</h3>
        <Link
          to="/rapporter"
          className="flex items-center gap-3 text-gray-600 hover:text-orange-8 transition-colors"
        >
          <AlertTriangle className="h-5 w-5" />
          <span>Rapporter et problem med nettsiden</span>
        </Link>

        <Link
          to="/produktutvikling"
          className="flex items-center gap-3 text-gray-600 hover:text-condo-med transition-colors"
        >
          <Lightbulb className="h-5 w-5" />
          <span>Hjelp oss å bli bedre</span>
        </Link>
      </div>
    </div>
  );
}