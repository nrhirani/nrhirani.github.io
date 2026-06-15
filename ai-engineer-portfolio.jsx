import React, { useState } from 'react';
import { Menu, X, ExternalLink } from 'lucide-react';

export default function AIEngineerPortfolio() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="bg-white text-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold">Nishit Hirani</div>
          <div className="hidden md:flex gap-8">
            {['expertise', 'work', 'articles', 'experience'].map(item => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-sm font-medium hover:text-blue-600 transition"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-gray-50 border-t border-gray-200 p-4">
            {['expertise', 'work', 'articles', 'experience'].map(item => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full text-left py-2 hover:text-blue-600"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-32 text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            NISHIT HIRANI
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 mb-6">
            VP Engineering | AI Systems & Leadership
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            AI engineer focused on building intelligent systems from design to production. Specializing in LLM applications, system architecture, and advanced AI engineering. Leading high-performing engineering teams and translating complex AI challenges into scalable solutions. 11+ years driving innovation across AI systems, software engineering, and organizational leadership.
          </p>
        </div>
      </section>

      {/* EXPERTISE SECTION */}
      <section id="expertise" className="bg-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl md:text-5xl font-bold mb-20 text-center">My Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Engineering Leadership',
                desc: 'Building and scaling high-performing engineering teams. Cross-functional collaboration, strategic planning, organizational growth, and aligning technical initiatives with business goals. Leading product delivery and innovation across organizations.'
              },
              {
                title: 'AI Engineering',
                desc: 'End-to-end AI system design and implementation. LLM architecture, intelligent system design, and context management. Building production-grade AI applications with advanced optimization techniques. AI deployment, orchestration with Harness, and intelligent system architecture.'
              },
              {
                title: 'Software Engineering',
                desc: 'Full-stack development across modern tech stacks. Python, Node.js, React, Ruby on Rails, PHP. DevOps practices, CI/CD pipelines, cloud infrastructure, and scalable backend architecture. Building robust, production-grade systems.'
              }
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK SECTION */}
      <section id="work" className="bg-gray-50 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl md:text-5xl font-bold mb-20 text-center">My Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'LLM-Powered Intelligent System',
                desc: 'Architected and built a production AI platform leveraging LLMs for intelligent decision-making. Designed sophisticated system architecture, context management, and optimization techniques for real-world applications including vendor analysis and contract processing.',
                tech: ['Python', 'LLMs', 'AI Architecture', 'System Design']
              },
              {
                title: 'Multi-SaaS Product Ecosystem & Team Leadership',
                desc: 'Led engineering at KeepWorks for 9+ years, managing multiple SaaS products and global clients including Fortune 50 companies. Scaled teams, established engineering practices, and delivered high-availability solutions with focus on cost optimization. Experience spans full-stack development to AI-driven transformations.',
                tech: ['Team Leadership', 'SaaS Products', 'Enterprise Solutions', 'Scalability']
              },
              {
                title: 'AI Engineering Framework & Implementation',
                desc: 'Developed comprehensive AI engineering framework for designing, testing, and optimizing intelligent systems. Implemented advanced techniques for LLM applications, system optimization, and production-grade AI solutions with robust architecture patterns.',
                tech: ['Python', 'AI Systems', 'LLMs', 'System Optimization']
              },
              {
                title: 'Harness-Integrated AI Deployment Pipeline',
                desc: 'Architected end-to-end deployment and orchestration for AI systems using Harness. Automated model serving, version management, and continuous deployment of intelligent applications with monitoring and rollback capabilities.',
                tech: ['Harness', 'Python', 'CI/CD', 'AI Deployment']
              }
            ].map((project, i) => (
              <div key={i} className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-4">{project.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, j) => (
                    <span key={j} className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLES SECTION - NEW */}
      <section id="articles" className="bg-white py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl md:text-5xl font-bold mb-20 text-center">Articles & Writing</h2>
          <div className="space-y-12">
            {[
              {
                title: 'AI Engineering: Building Production-Grade Intelligent Systems',
                excerpt: 'Comprehensive guide to AI engineering for production systems. Covering system architecture, LLM integration, optimization techniques, and best practices for building scalable, robust intelligent applications in real-world scenarios.',
                date: 'Coming Soon',
                readTime: '15 min read'
              },
              {
                title: 'LLM Architecture & System Design for Production AI',
                excerpt: 'Deep dive into architecting AI systems with large language models. Learn design patterns, context management, system optimization, and techniques for building efficient, scalable AI applications with advanced capabilities.',
                date: 'Coming Soon',
                readTime: '14 min read'
              },
              {
                title: 'Deploying AI Systems with Harness: A Complete Guide',
                excerpt: 'End-to-end guide to deploying and managing AI applications using Harness. Covering model serving, continuous deployment, monitoring, rollback strategies, and best practices for production AI infrastructure.',
                date: 'Coming Soon',
                readTime: '13 min read'
              }
            ].map((article, i) => (
              <article key={i} className="border-b border-gray-200 pb-12 last:border-b-0">
                <h3 className="text-2xl font-semibold mb-3 hover:text-blue-600 cursor-pointer transition">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="bg-gray-50 py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl md:text-5xl font-bold mb-20 text-center">Professional Experience</h2>
          <div className="space-y-8">
            {[
              {
                role: 'Vice President of Engineering',
                company: 'Alt',
                period: 'June 2025 - Present',
                location: 'Bengaluru, India'
              },
              {
                role: 'Associate Director - Engineering',
                company: 'Aerchain',
                period: 'May 2024 - May 2025',
                location: 'Bengaluru, India'
              },
              {
                role: 'Director of Engineering',
                company: 'Intugine - Logistics through Innovation',
                period: 'April 2023 - May 2024',
                location: 'Bengaluru, India'
              },
              {
                role: 'Head of Engineering',
                company: 'KeepWorks Technologies',
                period: 'May 2021 - April 2023',
                location: 'Bengaluru, India'
              },
              {
                role: 'VP of Engineering',
                company: 'KeepWorks Technologies',
                period: 'September 2016 - May 2021',
                location: 'Bengaluru, India'
              }
            ].map((exp, i) => (
              <div key={i} className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-md transition">
                <h3 className="text-xl font-semibold mb-2">{exp.role}</h3>
                <p className="text-gray-600 mb-1">{exp.company}</p>
                <p className="text-sm text-gray-500">{exp.period} • {exp.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="bg-gray-900 text-white py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">Let's Connect & Collaborate</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            I enjoy helping others solve complex AI engineering challenges, discussing LLM architecture and system design, and sharing insights on building production-grade intelligent systems. Open to mentoring, technical discussions, collaborative open source projects, and research.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition inline-flex items-center gap-2">
            Reach Out
            <ExternalLink size={20} />
          </button>
          <div className="mt-12 flex justify-center gap-6 text-gray-400">
            <a href="#" className="hover:text-white transition">GitHub</a>
            <a href="#" className="hover:text-white transition">LinkedIn</a>
            <a href="#" className="hover:text-white transition">Twitter</a>
            <a href="#" className="hover:text-white transition">Email</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-950 text-gray-400 py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm">
          <p>© 2024 Nishit Hirani. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
