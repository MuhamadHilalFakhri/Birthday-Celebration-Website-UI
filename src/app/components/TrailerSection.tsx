import { motion } from "motion/react";

export function TrailerSection() {
  return (
    <section className="bg-background py-12 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-3 text-center text-2xl text-ink md:text-3xl"
        >
          One More Sweet Pause
        </motion.h2>
        <p className="mx-auto mb-8 max-w-2xl text-center text-sm leading-relaxed text-ink-soft md:text-base">
          Semua video sudah dipindahkan ke section `Featured Episodes of Your Life`, jadi bagian ini tetap jadi jeda manis sebelum kejutan terakhir.
        </p>
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-white via-surface-soft to-soft-highlight p-8 text-center shadow-[0_24px_54px_rgba(255,144,187,0.16)]"
        >
          <p className="text-sm tracking-[0.22em] text-brand">BIRTHDAY MOMENT</p>
          <h3 className="mt-3 text-2xl text-ink md:text-3xl">Cerita utamanya ada di atas</h3>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft md:text-base">
            Scroll kembali ke `Featured Episodes of Your Life` kalau ingin memutar video kenangan, lalu lanjut ke surprise section untuk penutupnya.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
