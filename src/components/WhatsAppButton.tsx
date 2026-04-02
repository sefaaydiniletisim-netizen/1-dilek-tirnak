"use client";

import { motion } from "framer-motion";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" width="28" height="28" fill="white">
      <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.129 6.744 3.047 9.381L1.054 31.28l6.12-1.96A15.912 15.912 0 0016.004 32C24.826 32 32 24.826 32 16.004 32 7.176 24.826 0 16.004 0zm9.288 22.604c-.392 1.104-1.936 2.02-3.168 2.288-.844.18-1.944.324-5.652-1.216-4.748-1.968-7.804-6.784-8.04-7.1-.228-.316-1.916-2.552-1.916-4.868 0-2.316 1.212-3.456 1.644-3.928.392-.428 1.04-.612 1.66-.612.2 0 .38.02.54.036.472.02.708.048 1.02.788.392.924 1.344 3.28 1.46 3.52.12.24.24.56.08.876-.148.324-.28.524-.52.808-.24.284-.492.504-.732.764-.24.24-.492.496-.208.968.284.472 1.264 2.084 2.716 3.376 1.864 1.66 3.372 2.196 3.9 2.42.392.168.86.128 1.152-.188.372-.404.832-1.072 1.3-1.732.332-.472.752-.528 1.184-.352.44.168 2.784 1.312 3.26 1.552.476.24.792.36.908.556.116.2.116 1.12-.276 2.224z" />
    </svg>
  );
}

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/905443210681"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.4, type: "spring" }}
      className="fixed bottom-6 right-6 z-40 group"
      aria-label="WhatsApp ile iletisime gecin"
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />

      {/* Button */}
      <div className="relative w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_30px_rgba(37,211,102,0.6)] hover:scale-110 transition-all duration-300">
        <WhatsAppIcon />
      </div>

      {/* Tooltip */}
      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-4 py-2 bg-white rounded-xl shadow-lg border border-border/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        <p className="font-body text-sm text-foreground">Bize yazin!</p>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-white border-r border-b border-border/50 rotate-[-45deg]" />
      </div>
    </motion.a>
  );
}
