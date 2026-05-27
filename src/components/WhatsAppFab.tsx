import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { WhatsAppIcon } from "./ui/icons";
import { whatsappUrl } from "@/data/site";

export function WhatsAppFab() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > 600));

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Escríbenos por WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] py-3.5 pl-3.5 pr-4 text-sm font-semibold text-black shadow-[0_8px_30px_-4px_rgba(37,211,102,0.5)] sm:bottom-7 sm:right-7"
        >
          <span className="relative flex h-6 w-6 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black/20" />
            <WhatsAppIcon className="relative h-6 w-6" />
          </span>
          <span className="hidden sm:inline">Escríbenos</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
