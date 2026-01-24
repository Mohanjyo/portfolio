import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaPython, FaGitAlt, FaDatabase 
} from 'react-icons/fa';
import { 
  SiTailwindcss, SiTypescript, SiTensorflow 
} from 'react-icons/si';
import { HiChip } from 'react-icons/hi';

const skills = [
  { name: 'HTML5', icon: FaHtml5, level: 90, color: '#E34F26' },
  { name: 'CSS3', icon: FaCss3Alt, level: 85, color: '#1572B6' },
  { name: 'JavaScript', icon: FaJs, level: 80, color: '#F7DF1E' },
  { name: 'React', icon: FaReact, level: 75, color: '#61DAFB' },
  { name: 'TypeScript', icon: SiTypescript, level: 65, color: '#3178C6' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, level: 80, color: '#06B6D4' },
  { name: 'Python', icon: FaPython, level: 75, color: '#3776AB' },
  { name: 'Git', icon: FaGitAlt, level: 70, color: '#F05032' },
  { name: 'Databases', icon: FaDatabase, level: 65, color: '#00D4FF' },
  { name: 'TensorFlow', icon: SiTensorflow, level: 55, color: '#FF6F00' },
  { name: 'AI/ML Basics', icon: HiChip, level: 60, color: '#A855F7' },
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  return (
    <section id="skills" className="py-24 relative">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="section-container"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-4">
            Skills & Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              className="glass-card rounded-2xl p-6 group cursor-pointer"
              whileHover={{ scale: 1.03, y: -5 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ 
                    backgroundColor: `${skill.color}15`,
                    boxShadow: `0 0 20px ${skill.color}20`
                  }}
                >
                  <skill.icon 
                    className="w-6 h-6 transition-colors" 
                    style={{ color: skill.color }} 
                  />
                </div>
                <div>
                  <h4 className="font-semibold group-hover:text-primary transition-colors">
                    {skill.name}
                  </h4>
                  <span className="text-sm text-muted-foreground">{skill.level}%</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="skill-bar">
                <motion.div
                  className="skill-bar-fill"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ 
                    duration: 1, 
                    delay: 0.3 + index * 0.1,
                    ease: 'easeOut'
                  }}
                  style={{
                    background: `linear-gradient(90deg, ${skill.color}, ${skill.color}99)`
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div 
          variants={itemVariants}
          className="mt-12 text-center"
        >
          <div className="glass-card rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold mb-3">Always Learning 📚</h3>
            <p className="text-muted-foreground">
              I'm constantly expanding my skill set and exploring new technologies. 
              Currently diving deeper into cloud technologies, advanced AI/ML concepts, 
              and system design principles.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;
