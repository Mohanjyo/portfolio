import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { HiCode, HiLightBulb, HiAcademicCap, HiSparkles } from 'react-icons/hi';


const highlights = [
  {
    icon: HiAcademicCap,
    title: 'B.Tech Student',
    description: 'Specializing in AI & Data Science',
  },
  {
    icon: HiCode,
    title: 'Full-Stack Development',
    description: 'Building scalable web applications',
  },
  {
    icon: HiLightBulb,
    title: 'Problem Solver',
    description: 'Analytical thinking & creative solutions',
  },
  {
    icon: HiSparkles,
    title: 'Quick Learner',
    description: 'Always exploring new technologies',
  },
];

const About = () => {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  return (
    <section id="about" className="py-24 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />


      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="section-container relative z-10"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-secondary/10 text-secondary border border-secondary/20 mb-4">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Get to Know <span className="gradient-text">Me Better</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A passionate developer with a keen interest in technology and innovation
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 gradient-text">Hello! 👋</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I'm <span className="text-foreground font-semibold">Kucharlapati Hari Rammohan Raju</span>, 
                a B.Tech student specializing in Artificial Intelligence and Data Science. I'm passionate 
                about leveraging technology to solve real-world problems and create impactful solutions.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                My journey in tech started with curiosity about how things work, which led me to 
                explore software engineering, web development, and the fascinating world of AI. 
                I believe in continuous learning and staying updated with the latest industry trends.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to 
                open-source projects, or working on personal projects that challenge my skills and 
                push my boundaries.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: '10+', label: 'Projects' },
                { value: '5+', label: 'Technologies' },
                { value: '100%', label: 'Dedication' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="glass-card rounded-xl p-4 text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Highlight Cards */}
          <motion.div variants={itemVariants} className="grid sm:grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                className="glass-card rounded-2xl p-6 group cursor-pointer"
                whileHover={{ scale: 1.02, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
