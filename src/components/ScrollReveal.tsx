"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    // Cari semua elemen dengan class fade-in-up
    const elements = document.querySelectorAll(".fade-in-up");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Setelah terlihat, kita tidak perlu mengobservasi lagi agar animasi hanya jalan sekali
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, // Element terlihat 10% baru animasi berjalan
        rootMargin: "0px 0px -50px 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));

    // Cleanup saat komponen di-unmount
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return null; // Komponen ini hanya menjalankan logic JS, tidak merender UI tambahan
}
