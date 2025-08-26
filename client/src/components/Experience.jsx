
export default function Experience() {
  const experiences = [
    {
      title: "Senior Software Engineer",
      company: "Tech Corp",
      period: "2022 - Present",
      description: "Led development of microservices architecture serving 1M+ users. Implemented CI/CD pipelines and improved system performance by 40%.",
      technologies: ["React", "Node.js", "AWS", "Docker", "MongoDB"]
    },
    {
      title: "Full Stack Developer",
      company: "StartupXYZ",
      period: "2020 - 2022",
      description: "Built and maintained web applications from scratch. Collaborated with design team to implement responsive UI/UX designs.",
      technologies: ["JavaScript", "Python", "PostgreSQL", "Redis", "GraphQL"]
    },
    {
      title: "Frontend Developer",
      company: "Digital Agency",
      period: "2019 - 2020",
      description: "Developed responsive websites and web applications for various clients. Focused on performance optimization and accessibility.",
      technologies: ["React", "TypeScript", "SASS", "Webpack", "Firebase"]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-gray-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">Experience</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            My professional journey and the amazing teams I've worked with
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-dark mb-2">{exp.title}</h3>
                  <p className="text-lg font-medium text-primary mb-2">{exp.company}</p>
                </div>
                <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-medium">
                  {exp.period}
                </div>
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">{exp.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/resume.pdf"
            className="inline-flex items-center bg-primary text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            View Full Resume
          </a>
        </div>
      </div>
    </section>
  );
}
