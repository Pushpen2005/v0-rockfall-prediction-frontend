"use client"

import React, { useEffect, useState } from "react"
import Lottie from "lottie-react"
import { motion, AnimatePresence } from "framer-motion"

const minimalBell = {
  v: "5.7.6",
  fr: 30,
  ip: 0,
  op: 45,
  w: 64,
  h: 64,
  nm: "bell",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "circle",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [32, 32, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 1, k: [
          { t: 0, s: [90, 90, 100] },
          { t: 22, s: [110, 110, 100] },
          { t: 45, s: [90, 90, 100] }
        ] },
      },
      shapes: [
        { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [40, 40] }, nm: "Ellipse Path 1" },
        { ty: "st", c: { a: 0, k: [0.93, 0.26, 0.26, 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: 4 }, lc: 2, lj: 2, nm: "Stroke 1" },
      ],
      ip: 0,
      op: 45,
      st: 0,
      bm: 0,
    },
  ],
}

export function AlertBadge({ className }) {
  return (
    <div className={"inline-flex items-center gap-2 " + (className ?? "") }>
      <div className="h-6 w-6">
        <Lottie animationData={minimalBell} loop autoplay style={{ width: "100%", height: "100%" }} />
      </div>
      <span className="text-sm font-medium">New Alert</span>
    </div>
  )
}

export function SlideInPanel({ isOpen, onClose, title = "Alerts", children }) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            className="fixed inset-0 bg-black/30 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-background border-l border-border z-50 shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6">
                  <Lottie animationData={minimalBell} loop autoplay style={{ width: "100%", height: "100%" }} />
                </div>
                <h3 className="font-semibold">{title}</h3>
              </div>
              <button onClick={onClose} className="text-sm text-muted-foreground hover:text-foreground">Close</button>
            </div>
            <div className="p-4 overflow-auto h-[calc(100%-56px)]">{children}</div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  )
}

export function AIAssistantPlaceholder() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const id = setTimeout(() => setOpen(true), 800)
    return () => clearTimeout(id)
  }, [])
  return (
    <motion.div className="rounded-lg border border-dashed border-border bg-muted/20 p-4" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5">
            <Lottie animationData={minimalBell} loop autoplay style={{ width: "100%", height: "100%" }} />
          </div>
          <h4 className="font-medium">Aura Assistant (Coming Soon)</h4>
        </div>
        <button onClick={() => setOpen((v) => !v)} className="text-xs text-muted-foreground hover:text-foreground">
          {open ? "Hide" : "Show"}
        </button>
      </div>
      <AnimatePresence>
        {open ? (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="text-sm text-muted-foreground">
            Lightweight placeholder for future AI chat panel. This will host quick insights and Q&A without adding heavy runtime costs today.
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  )
}

