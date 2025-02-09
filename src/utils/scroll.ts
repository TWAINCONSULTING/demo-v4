export function scrollToSection(sectionId: string) {
  // Wait for next render cycle to ensure element exists
  requestAnimationFrame(() => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Add offset for header/navigation
      const offset = 80; 
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
}