import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <motion.div
        className="flex gap-2"
        initial="start"
        animate="end"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-primary rounded-full"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </motion.div>
    </div>
  )
}
