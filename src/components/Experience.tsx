import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { HiAcademicCap, HiBadgeCheck, HiCode, HiLightningBolt } from 'react-icons/hi';

const experiences = [
  {
    type: 'education',
    title: 'B.Tech in AI & Data Science',
    organization: 'University',
    period: '2022 - Present',
    description: 'Pursuing Bachelor of Technology specializing in Artificial Intelligence and Data Science with focus on machine learning, deep learning, and software engineering.',
    icon: HiAcademicCap,
  },
  {
    type: 'certification',
    title: 'Python for Data Science',
    organization: 'Online Platform',
    period: '2023',
    description: 'Comprehensive certification covering Python programming, data manipulation with Pandas, and data visualization techniques.',
    icon: HiBadgeCheck,
  },
  {
    type: 'project',
    title: 'Open Source Contributor',
    organization: 'GitHub',
    period: '2023 - Present',
    description: 'Active contributor to open source projects, collaborating with developers worldwide and improving codebases.',
    icon: HiCode,
  },
  {
    type: 'achievement',
    title: 'Hackathon Participant',
    organization: 'Various Tech Events',
    period: '2023',
    description: 'Participated in multiple hackathons, building innovative solutions under time constraints and learning collaborative development.',
    icon: HiLightningBolt,
  },
];

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  return (
    <section id="experience" className="py-24 relative">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="section-container"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-secondary/10 text-secondary border border-secondary/20 mb-4">
            Journey
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Experience & <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My academic journey, certifications, and achievements
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              variants={itemVariants}
              className={`relative flex flex-col md:flex-row gap-4 md:gap-8 mb-12 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-primary to-secondary ring-4 ring-background z-10" />

              {/* Content Card */}
              <motion.div
                className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] glass-card rounded-2xl p-6 ${
                  index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                }`}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                    <exp.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h4 className="text-lg font-semibold">{exp.title}</h4>
                    </div>
                    <p className="text-sm text-primary mb-1">{exp.organization}</p>
                    <p className="text-xs text-muted-foreground mb-3">{exp.period}</p>
                    <p className="text-sm text-muted-foreground">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;
