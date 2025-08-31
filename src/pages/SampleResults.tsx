import { OptimizedResultsDisplay } from "../components/results/optimized/OptimizedResultsDisplay";
import type { IN8nUserResponse } from "../types";

const mockResults: IN8nUserResponse[] = [
  {
    user: "mock_user_id",
    jdContext: {
      jobDescription:
        "A mock job description for a Senior Software Engineer role requiring expertise in React, Node.js, and cloud technologies. The ideal candidate will be a team player with strong problem-solving skills.",
      jobDetails: {
        positionTitle: "Senior Software Engineer",
        requiredSkills: ["React", "Node.js", "TypeScript", "GraphQL", "AWS"],
        coreResponsibilities: [
          "Design, develop, and maintain high-quality web applications.",
          "Collaborate with product managers, designers, and other engineers to deliver compelling user-facing products.",
          "Write clean, maintainable, and well-tested code.",
          "Mentor junior engineers and contribute to a culture of technical excellence.",
        ],
        seniorityLevel: "Senior",
        preferredLocation: "Remote (US)",
        minimumExperience: "5+ years",
        educationRequirement:
          "Bachelor's degree in Computer Science or a related field",
        bonusSkills: ["Next.js", "Docker", "Kubernetes", "Terraform"],
      },
    },
    candidateResume: {
      candidateDetails: {
        "Candidate Name": "Jane Doe",
        "Candidate Email": "jane.doe@example.com",
        "Candidate Contact": "555-123-4567",
        Education: [
          {
            Degree: "Master of Science in Software Engineering",
            Institution: "Example University",
            "Graduation Year": "2016",
          },
          {
            Degree: "Bachelor of Science in Computer Science",
            Institution: "State College",
            "Graduation Year": "2014",
          },
        ],
        "Technical Skills": {
          "Programming Languages": ["JavaScript", "TypeScript", "Python", "Go"],
          Frameworks: ["React", "Node.js", "Express.js", "Next.js"],
          Databases: ["PostgreSQL", "MongoDB", "Redis"],
          Tools: ["Git", "Docker", "Kubernetes", "Jenkins", "Webpack"],
          Methodologies: ["Agile", "Scrum", "Kanban"],
        },
        Experience: [
          {
            "Job Title": "Senior Software Engineer",
            Company: "Innovate Inc.",
            "Start Date": "June 2018",
            "End Date": "Present",
            Responsibilities: [
              "Led the development of a new microservices-based platform.",
              "Architected and implemented a scalable and resilient infrastructure on AWS.",
              "Mentored a team of 4 junior engineers.",
            ],
            Achievements: [
              "Reduced API response times by 50% through performance optimizations.",
              "Achieved 99.99% uptime for the platform.",
            ],
          },
          {
            "Job Title": "Software Engineer",
            Company: "Solutions Co.",
            "Start Date": "July 2016",
            "End Date": "May 2018",
            Responsibilities: [
              "Developed and maintained features for a large-scale monolithic application.",
              "Wrote unit and integration tests to ensure code quality.",
            ],
            Achievements: [
              "Refactored a legacy module, improving its maintainability and performance.",
            ],
          },
        ],
        Projects: [
          {
            "Project Name": "Real-time Analytics Dashboard",
            Objective:
              "To build a dashboard for visualizing real-time data streams.",
            "Technologies Used": ["React", "WebSocket", "Node.js", "Redis"],
            Outcome:
              "Delivered a highly performant and visually appealing dashboard that provided valuable insights to stakeholders.",
          },
        ],
        "Certifications & Training": [
          {
            Certification: "Certified Kubernetes Application Developer (CKAD)",
            "Issuing Organization": "The Linux Foundation",
            Year: "2022",
          },
          {
            Certification: "Google Professional Cloud Architect",
            "Issuing Organization": "Google Cloud",
            Year: "2021",
          },
        ],
        "Other Notable Information": {
          Awards: [
            {
              name: "Innovator of the Year",
              year: "2021",
              issuer: "Innovate Inc.",
            },
            {
              name: "Top Performer Award",
              year: "2019",
              issuer: "Innovate Inc.",
            },
          ],
          Publications: [
            {
              title: "A Practical Guide to Microservices",
              year: "2020",
              journalOrVenue: "InfoQ",
            },
          ],
          "Volunteer Work": ["Mentor at Girls Who Code"],
          "Open Source Contributions": [
            {
              projectName: "Kubernetes",
              repository: "https://github.com/kubernetes/kubernetes",
            },
          ],
          Languages: ["English (Native)", "German (Professional)"],
        },
        "Resume Summary":
          "A results-oriented Senior Software Engineer with a passion for building scalable, distributed systems. Proven ability to lead projects and mentor junior engineers.",
      },
    },
    results: {
      final_score: "95",
      confidence_score: "98",
      recommendation: "Excellent Match",
      justification:
        "The candidate's profile is an excellent match for the role. They possess all the required skills and have extensive experience in the relevant domains. Their project experience and certifications further strengthen their profile.",
      key_strengths: [
        "Extensive experience with the entire modern web stack.",
        "Proven leadership and mentoring skills.",
        "Strong understanding of cloud-native technologies and architecture.",
        "Excellent problem-solving and communication skills.",
      ],
      key_gaps: [
        "No direct experience with GraphQL, although has strong API design skills.",
      ],
      hard_blockers: [
        "Candidate is not available to start until one month after the proposed start date.",
      ],
    },
    createdAt: new Date(),
  },
];

const SampleResultsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="text-center mt-12 mb-4">
        <div className="container mx-auto px-6 pt-8 pb-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-2">
              Sample Screening Results
            </h1>
            <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
              This is a sample page to demonstrate how the screening results
              will be displayed.
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 pb-12 pt-6">
        <div className="max-w-6xl mx-auto">
          <OptimizedResultsDisplay results={mockResults} />
        </div>
      </div>
    </div>
  );
};

export default SampleResultsPage;
