import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ScrollToTop } from './components/ScrollToTop';
import { ChatbotScripts } from './components/Chatbot/ChatbotScripts';
import { ConnectionStatus } from './components/ui/ConnectionStatus';
import Home from './pages/Home';
import Thanks from './pages/Thanks';
import Naboen from './pages/Naboen';
import MinBoligScroll from './pages/MinBoligScroll';
import Bofellesskapet from './pages/Bofellesskapet';
import Reservasjoner from './pages/Reservasjoner';
import FAQ from './pages/FAQ';
import Kontakt from './pages/Kontakt';
import ReportProblem from './pages/ReportProblem';
import Produktutvikling from './pages/Produktutvikling';
import { createClient } from "@supabase/supabase-js";

export default App;

const supabase = createClient("https://sb1-k9cym2kg.supabase.co", "sb1-k9cym2kg");

export function App() {
  // Show connection status if Supabase URL is not set
  const showConnectionStatus = !import.meta.env.VITE_SUPABASE_URL;

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="naboen" element={<Naboen />} />
          <Route path="min-bolig" element={<MinBoligScroll />} />
          <Route path="bofellesskapet" element={<Bofellesskapet />} />
          <Route path="reservasjoner" element={<Reservasjoner />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="kontakt" element={<Kontakt />} />
          <Route path="rapporter" element={<ReportProblem />} />
          <Route path="produktutvikling" element={<Produktutvikling />} />
        </Route>
        <Route path="/takk" element={<Thanks />} />
      </Routes>
      <ChatbotScripts />
      {showConnectionStatus && <ConnectionStatus />}
    </BrowserRouter>
  );
}