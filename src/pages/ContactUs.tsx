import type { FC } from "react";
import { FaEnvelope, FaLinkedin, FaGithub, FaLink } from "react-icons/fa";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Container } from "../components/layout";

const ContactUs: FC = () => {
  return (
    <Container className="py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold">About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I'm CVS Charan, a passionate Full Stack Developer with
                  expertise in building modern web applications and AI-powered
                  solutions. With a strong foundation in both frontend and
                  backend technologies, I create seamless digital experiences
                  that solve real-world problems.
                </p>
                <p>
                  My journey in tech has been driven by curiosity and a desire
                  to continuously learn and adapt to emerging technologies,
                  particularly in the AI space.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">My Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold">
                    Programming Languages
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {["JavaScript", "Python", "TypeScript"].map((skill) => (
                      <span
                        key={skill}
                        className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Web Development</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {[
                      "HTML",
                      "CSS",
                      "React JS",
                      "Node JS",
                      "Next JS",
                      "Bootstrap",
                      "Tailwind CSS",
                      "D3.js",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Mobile Development</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {["React Native"].map((skill) => (
                      <span
                        key={skill}
                        className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Databases</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {[
                      "PostgreSQL",
                      "MySQL",
                      "Snowflake",
                      "MongoDB",
                      "SQLite",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">AI & ML</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {[
                      "OpenAI API",
                      "LangChain",
                      "Pinecone",
                      "Prompt Engineering",
                      "Hugging Face (basic)",
                      "TensorFlow (basic)",
                      "RAG Architecture",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Cloud & Deployment</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {[
                      "Azure",
                      "AWS",
                      "GCP",
                      "Railway",
                      "Vercel",
                      "Render",
                      "Docker",
                      "Kubernetes (basic)",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    Tools & Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {[
                      "Power BI",
                      "Power Automate",
                      "Power Apps",
                      "Databricks",
                      "Git",
                      "Zapier",
                      "n8n",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Methodologies</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {["Agile (Scrum)"].map((skill) => (
                      <span
                        key={skill}
                        className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1 space-y-8 lg:sticky top-20 self-start">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Get in Touch</CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                Leave a Testimonial
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you enjoyed using the AI Screening Agent, I would love to
                hear your feedback!
              </p>
              <Link to="/testimonials">
                <Button variant="outline" className="w-full">
                  Leave a Testimonial
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default ContactUs;
