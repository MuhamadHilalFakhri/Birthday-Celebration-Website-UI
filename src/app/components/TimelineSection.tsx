import { motion } from "motion/react";

interface TimelineItem {
  id: number;
  year: string;
  title: string;
  description: string;
}

const timelineItems: TimelineItem[] = [
  { id: 1, year: "The Start", title: "A Star Was Born", description: "The world became a brighter place the day you arrived. Your journey began with love, hope, and endless possibilities." },
  { id: 2, year: "Growing Up", title: "Building Dreams", description: "Every step forward was a new adventure. Learning, exploring, and discovering what makes you uniquely you." },
  { id: 3, year: "Finding Joy", title: "Creating Memories", description: "Friendships formed, passions discovered, and countless moments that shaped who you are today." },
  { id: 4, year: "Becoming You", title: "Embracing Authenticity", description: "Finding your voice, following your heart, and inspiring everyone around you with your genuine spirit." },
  { id: 5, year: "Today", title: "The Celebration", description: "A special day to honor the amazing person you've become and all the incredible moments yet to come." },
];

export function TimelineSection() {
  return (
    <section id="timeline" className="bg-surface-soft py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-4 text-center text-2xl text-ink md:text-3xl"
        >
          The Story So Far
        </motion.h2>

        <div className="relative">
          <div
            className="absolute top-0 bottom-0 left-4 w-0.5 md:left-1/2"
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(255, 144, 187, 0.92), transparent)",
            }}
          />

          <div className="space-y-12 md:space-y-16">
            {timelineItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.55 }}
                className={`relative flex flex-col items-start md:items-center md:gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div
                  className="absolute left-4 z-10 -ml-2 h-4 w-4 rounded-full md:left-1/2"
                  style={{
                    backgroundColor: "#FF90BB",
                    boxShadow: "0 0 20px rgba(255, 144, 187, 0.65), 0 0 38px rgba(255, 144, 187, 0.22)",
                  }}
                />

                <div
                  className={`ml-10 w-[calc(100%-2.5rem)] md:ml-0 md:w-5/12 ${
                    index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="rounded-[1.85rem] border border-border bg-white p-6 shadow-[0_18px_38px_rgba(255,144,187,0.12)] md:p-8"
                  >
                    <div
                      className={`mb-3 inline-block rounded-full bg-brand px-3 py-1 text-xs tracking-wider text-brand-foreground ${
                        index % 2 === 0 ? "md:float-right md:ml-4" : "md:float-left md:mr-4"
                      }`}
                    >
                      {item.year}
                    </div>

                    <h3 className="clear-both mb-3 text-xl text-ink md:text-2xl">{item.title}</h3>
                    <p className="leading-relaxed text-ink-soft">{item.description}</p>
                  </motion.div>
                </div>

                <div className="hidden w-5/12 md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
