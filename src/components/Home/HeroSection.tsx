import React from 'react';

export function HeroSection() {
  return (
    <section className="relative h-[60vh] sm:h-[350px] sm:w-full mx-auto rounded-none sm:rounded-2xl overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(../images/hero-building.jpg)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-condo-dark/90 via-condo-dark/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-8">
        <div className="max-w-2xl space-y-4 sm:space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-base-white font-logo">
            Velkommen til <br className="sm:hidden"/> din digitale bakgård
          </h1>
          <p className="text-sm sm:text-xl text-gray-200 leading-relaxed sm:leading-normal sm:pb-2 pb-2 word-spacing-[30px]">
            En interaktiv modell som gir deg innsikt i hvordan sameier og borettslag kan organiseres og optimaliseres for trivsel og effektivitet.
          </p>
        </div>
      </div>
    </section>
  );
}