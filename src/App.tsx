import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Programs from "@/components/Programs";
import Schedule from "@/components/Schedule";
import Coaches from "@/components/Coaches";
import News from "@/components/News";
import NewsLive from "@/components/NewsLive";
import Gallery from "@/components/Gallery";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";
import ParentCabinet from "@/components/cabinets/ParentCabinet";
import CoachCabinet from "@/components/cabinets/CoachCabinet";

export type Page =
  | "home"
  | "about"
  | "programs"
  | "schedule"
  | "coaches"
  | "news"
  | "gallery"
  | "contacts"
  | "parent-cabinet"
  | "coach-cabinet";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [cabinetRole, setCabinetRole] = useState<"parent" | "coach" | null>(null);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <TooltipProvider>
      <Toaster />
      <div className="min-h-screen bg-background">
        <Header currentPage={currentPage} navigate={navigate} cabinetRole={cabinetRole} setCabinetRole={setCabinetRole} />

        {currentPage === "home" && (
          <>
            <Hero navigate={navigate} />
            <About navigate={navigate} />
            <Programs navigate={navigate} />
            <Schedule />
            <NewsLive navigate={navigate} />
            <Coaches navigate={navigate} />
            <Contacts />
          </>
        )}

        {currentPage === "about" && <About navigate={navigate} full />}
        {currentPage === "programs" && <Programs navigate={navigate} full />}
        {currentPage === "schedule" && <Schedule full />}
        {currentPage === "coaches" && <Coaches navigate={navigate} full />}
        {currentPage === "news" && <News navigate={navigate} full />}
        {currentPage === "gallery" && <Gallery />}
        {currentPage === "contacts" && <Contacts full />}
        {currentPage === "parent-cabinet" && <ParentCabinet navigate={navigate} />}
        {currentPage === "coach-cabinet" && <CoachCabinet navigate={navigate} />}

        {currentPage !== "parent-cabinet" && currentPage !== "coach-cabinet" && (
          <Footer navigate={navigate} />
        )}
      </div>
    </TooltipProvider>
  );
}