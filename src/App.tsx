import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import WhatsAppPage from './pages/WhatsAppPage';
import CallPage from './pages/CallPage';
import EmailPage from './pages/EmailPage';
import BookingPage from './pages/BookingPage';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-savanna-off-white">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/whatsapp" element={<WhatsAppPage />} />
              <Route path="/call" element={<CallPage />} />
              <Route path="/email" element={<EmailPage />} />
              <Route path="/book" element={<BookingPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
