import { AnimatePresence, motion } from "motion/react"

export function Sidebar({
  side,
  isOpen,
  onClose,
  children,
}: {
  side?: "left" | "right"
  isOpen: boolean
  onClose: () => void
  children?: React.ReactNode
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className={`absolute top-0 h-full w-sm bg-white/80 backdrop-blur-sm p-6 ${side === "right" ? "right-0" : "left-0"}`}
            initial={{ x: side === "right" ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: side === "right" ? "100%" : "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
          <motion.div
            className="fixed inset-0 bg-black/50 -z-10"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
