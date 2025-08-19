
export default function About() {
  const skills = [
    "JavaScript", "TypeScript", "React", "Node.js", "Python", "Java",
    "AWS", "Docker", "MongoDB", "PostgreSQL", "Redis", "GraphQL"
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">About Me</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            I'm a passionate software engineer with expertise in building scalable web applications
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-dark mb-6">My Journey</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              With over 5 years of experience in software development, I've worked with startups and 
              established companies to build robust, user-friendly applications. My passion lies in 
              creating elegant solutions to complex problems.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              I specialize in full-stack development with expertise in modern JavaScript frameworks, 
              cloud technologies, and database design. I believe in writing clean, maintainable code 
              and following best practices in software development.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source 
              projects, or sharing my knowledge through technical writing and mentoring.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200 text-center"
              >
                Let's Work Together
              </a>
              <a
                href="/resume.pdf"
                className="border-2 border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary hover:text-white transition-colors duration-200 text-center"
              >
                Download Resume
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-dark mb-6">Skills & Technologies</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-gray-light p-4 rounded-lg text-center font-medium text-gray-700 hover:bg-primary hover:text-white transition-colors duration-200"
                >
                  {skill}
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-primary to-blue-600 p-6 rounded-xl text-white">
              <h4 className="text-xl font-bold mb-3">Currently Learning</h4>
              <p className="mb-4">Always staying updated with the latest technologies and best practices</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Machine Learning & AI</li>
                <li>Blockchain Development</li>
                <li>Advanced System Design</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
