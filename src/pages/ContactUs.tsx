import type { FC } from "react";
import { FaEnvelope, FaLinkedin, FaGithub, FaLink } from "react-icons/fa";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ContactUs: FC = () => {
  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 bg-card p-8 rounded-2xl shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                I'm CVS Charan, a passionate Full Stack Developer with expertise
                in building modern web applications and AI-powered solutions.
                With a strong foundation in both frontend and backend
                technologies, I create seamless digital experiences that solve
                real-world problems.
              </p>
              <p>
                My journey in tech has been driven by curiosity and a desire to
                continuously learn and adapt to emerging technologies,
                particularly in the AI space.
              </p>
            </div>

            <h3 className="text-2xl font-bold mt-10 mb-6">My Skills</h3>
            <div className="flex flex-wrap gap-3">
              {[
                "React",
                "Redux",
                "JavaScript",
                "TypeScript",
                "Bootstrap",
                "Tailwind CSS",
                "Material-UI",
                "Node.js",
                "Express",
                "Python",
                "Django",
                "Flask",
                "React Native",
                "Flutter",
                "MongoDB",
                "MySQL",
                "PostgreSQL",
                "Firebase",
                "AWS",
                "Azure",
                "Docker",
                "Kubernetes",
                "Jenkins",
                "Pandas",
                "NumPy",
                "Scikit-learn",
                "TensorFlow",
              ].map((skill) => (
                <span
                  key={skill}
                  className="bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-card p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <a
                  href="mailto:charan.cvs@gmail.com"
                  className="flex items-center space-x-4 text-muted-foreground hover:text-primary transition-colors"
                >
                  <FaEnvelope className="h-6 w-6" />
                  <span>charan.cvs@gmail.com</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/charan-cvs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 text-muted-foreground hover:text-primary transition-colors"
                >
                  <FaLinkedin className="h-6 w-6" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://github.com/CVSCharan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 text-muted-foreground hover:text-primary transition-colors"
                >
                  <FaGithub className="h-6 w-6" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.charan-cvs.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 text-muted-foreground hover:text-primary transition-colors"
                >
                  <FaLink className="h-6 w-6" />
                  <span>Portfolio</span>
                </a>
              </div>
            </div>

            <div className="bg-card p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Leave a Testimonial</h3>
              <p className="text-muted-foreground mb-4">
                If you enjoyed using the AI Screening Agent, I would love to
                hear your feedback!
              </p>
              <Link to="/testimonials">
                <Button variant="outline" className="w-full">
                  Leave a Testimonial
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
