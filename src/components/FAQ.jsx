import { useState } from "react";
import Navbar from "./Navbar";
import "./FAQ.css";
import Footer from "../components/Footer";
export default function FAQ() {

  const [active, setActive] = useState(null);

  const faqs = [
    {
      question: "How do I place an order?",
      answer:
        "Browse the menu, select your favorite items, add them to cart and proceed to checkout. Complete the payment and your order will be placed."
    },
    {
      question: "What payment methods are available?",
      answer:
        "We accept Cash on Delivery, Wallet, Credit/Debit Cards, Google Pay, Apple Pay, and PayPal."
    },
    {
      question: "Can I cancel my order?",
      answer:
        "Yes, you can cancel your order before it is dispatched. Once shipped, cancellation may not be possible."
    },
    {
      question: "How can I track my order?",
      answer:
        "You can track your order from your profile page under 'Order Summary'."
    },
    {
      question: "Do I need to register to order?",
      answer:
        "Yes, you need to login or register before placing an order."
    },
    {
      question: "How long does delivery take?",
      answer:
        "Delivery usually takes 30–45 minutes depending on your location."
    }
  ];

  const toggle = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <>
      <Navbar />

      <div className="faq-container">

        <h1 className="faq-title">Frequently Asked Questions</h1>

        <div className="faq-box">
          {faqs.map((item, index) => (
            <div
              key={index}
              className={`faq-item ${active === index ? "active" : ""}`}
            >
              <div
                className="faq-question"
                onClick={() => toggle(index)}
              >
                <h3>{item.question}</h3>
                <span>{active === index ? "-" : "+"}</span>
              </div>

              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
      <Footer/>
    </>
  );
}