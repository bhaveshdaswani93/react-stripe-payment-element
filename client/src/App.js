import "./App.css";
import Payment from "./Payment";
import Completion from "./Completion";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SaveCardForm from './StripeCardToken';
import PaymentCard from './PaymentCard';
import CardToken from './CardToken';

function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Payment />} />
          <Route path="/completion" element={<Completion />} />
          <Route path="/card-token" element={<PaymentCard />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
