import Link from 'next/link';
import Image from 'next/image';
import {
  BookOpen,
  BrainCircuit,
  Lightbulb,
  BookCheck,
  ArrowRight,
  ChevronRight,
  Check,
  Star
} from 'lucide-react';
import { NotificationButton } from './_components/NotificationButton';

interface Link {
  name: string;
  href: string;
}

interface FooterLinkGroupProps {
  title: string;
  links: Link[];
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface StepCardProps {
  number: string;
  title: string;
  description: string;
}

interface TestimonialCardProps {
  quote: string;
  author: string;
  title: string;
  rating: number;
}

interface SocialIconProps {
  href: string;
  icon: string;
}

export default function HomePage() {
  return (
    <div className="bg-newbg">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-violet-600 rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute top-1/2 -left-48 w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-10 animate-pulse-slow delay-2"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-800 rounded-full blur-3xl opacity-10 animate-pulse-slow delay-4"></div>

        {/* Grid background */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:30px_30px]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block mb-6 px-4 py-1.5 bg-violet-800/30 border border-violet-500/20 rounded-full backdrop-blur-sm animate-fade-in">
              <span className="text-violet-300 text-sm font-medium flex items-center">
                <span className="flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute h-2 w-2 rounded-full bg-violet-400 opacity-75"></span>
                  <span className="relative rounded-full h-2 w-2 bg-violet-500"></span>
                </span>
                Elevate Your Study Experience
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight tracking-tight animate-fade-in-up">
              Transform Your <span className="bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent">Learning Process</span>
            </h1>

            <p className="text-xl text-violet-100/70 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-1">
              An intelligent study platform powered by AI to help you understand, organize,
              and master your course materials more efficiently than ever before.
            </p>

            <div className="flex flex-wrap gap-5 justify-center animate-fade-in-up delay-2">
              <NotificationButton
                className="px-8 py-4 bg-gradient-to-r from-violet-700 to-indigo-600 hover:from-violet-600 hover:to-indigo-500 text-white font-medium rounded-xl transition-all flex items-center group shadow-lg shadow-violet-900/30 hover:shadow-violet-800/40"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </NotificationButton>

              <a
                href="https://github.com/saymanq/study-platform"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-slate-800/50 hover:bg-slate-700/50 border border-violet-500/20 text-white font-medium rounded-xl transition-all shadow-lg shadow-slate-900/20 backdrop-blur-sm"
              >
                View on GitHub
              </a>
            </div>

            <div className="mt-10 flex items-center justify-center space-x-6 text-sm text-violet-300/70 animate-fade-in-up delay-3">
              <div className="flex items-center">
                <Check className="h-4 w-4 mr-1.5 text-green-400" />
                Free to start
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 mr-1.5 text-green-400" />
                No credit card required
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 mr-1.5 text-green-400" />
                Cancel anytime
              </div>
            </div>
          </div>

          {/* Dashboard Preview Image */}
          <div className="max-w-5xl mx-auto relative animate-fade-in-up delay-4">
            <div className="bg-gradient-to-b from-violet-600/20 to-transparent p-1 rounded-2xl shadow-2xl">
              <div className="relative rounded-xl overflow-hidden border border-slate-700/50">
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/20 via-transparent to-indigo-900/20"></div>
                <Image
                  src="/dashboard-preview.png"
                  alt="StudySync Dashboard Preview"
                  width={1200}
                  height={675}
                  className="w-full h-auto"
                // This is a placeholder. Replace with an actual screenshot image of your platform
                />
              </div>
            </div>

            {/* Decorative elements for the image */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-violet-500 blur-2xl rounded-full opacity-30"></div>
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-indigo-500 blur-2xl rounded-full opacity-30"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Features Designed for <span className="text-violet-400">Modern Learning</span>
            </h2>
            <p className="text-xl text-violet-100/60 max-w-2xl mx-auto">
              Our platform integrates powerful tools to help you study smarter, not harder.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <FeatureCard
              icon={<BookOpen className="h-6 w-6" />}
              title="Smart Summaries"
              description="Get concise summaries of your lecture notes and study materials with our AI technology"
            />
            <FeatureCard
              icon={<Lightbulb className="h-6 w-6" />}
              title="Interactive Flashcards"
              description="Create and study with AI-enhanced flashcards that adapt to your learning progress"
            />
            <FeatureCard
              icon={<BrainCircuit className="h-6 w-6" />}
              title="Dynamic Mindmaps"
              description="Visualize complex topics with automatically generated mind maps that connect concepts"
            />
            <FeatureCard
              icon={<BookCheck className="h-6 w-6" />}
              title="Customized Quizzes"
              description="Test your knowledge with personalized quizzes tailored to your study materials"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-slate-900/50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"></div>

        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              How <span className="text-violet-400">StudySync</span> Works
            </h2>
            <p className="text-xl text-violet-100/60 max-w-2xl mx-auto">
              A simple 3-step process to transform your study habits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <StepCard
              number="01"
              title="Upload Your Materials"
              description="Import lecture notes, textbooks, or any study materials in various formats"
            />
            <StepCard
              number="02"
              title="AI Processing"
              description="Our AI analyzes your content and converts it into structured knowledge"
            />
            <StepCard
              number="03"
              title="Study Smarter"
              description="Use our interactive tools to learn more efficiently and retain information longer"
            />
          </div>

          <div className="text-center mt-16">
            <NotificationButton
              className="inline-flex items-center px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-lg transition-all group"
            >
              Start Your Journey
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </NotificationButton>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              What <span className="text-violet-400">Students Say</span>
            </h2>
            <p className="text-xl text-violet-100/60 max-w-2xl mx-auto">
              Join thousands of students who have transformed their study habits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <TestimonialCard
              quote="StudySync helped me ace my finals. The smart summaries saved me countless hours of reviewing lecture notes."
              author="Alex Johnson"
              title="Computer Science Student"
              rating={5}
            />
            <TestimonialCard
              quote="The mind maps feature changed how I understand complex topics. Concepts just click better when I can visualize them."
              author="Samantha Lee"
              title="Biology Major"
              rating={5}
            />
            <TestimonialCard
              quote="I love how the flashcards adapt to what I'm struggling with. It's like having a personal tutor available 24/7."
              author="Marcus Chen"
              title="Business Student"
              rating={4}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-900/20 to-indigo-900/20"></div>
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:30px_30px]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto bg-gradient-to-b from-slate-800/80 to-slate-900/80 p-10 md:p-16 rounded-3xl border border-violet-500/20 backdrop-blur-sm">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Ready to Transform Your Study Habits?
              </h2>
              <p className="text-xl text-violet-100/70 max-w-2xl mx-auto">
                Join StudySync today and experience the future of learning.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NotificationButton
                className="px-8 py-4 bg-gradient-to-r from-violet-700 to-indigo-600 hover:from-violet-600 hover:to-indigo-500 text-white font-medium rounded-xl transition-all flex items-center justify-center group shadow-lg shadow-violet-900/30 hover:shadow-violet-800/40"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </NotificationButton>

              <Link
                href="/demo"
                className="px-8 py-4 bg-transparent hover:bg-slate-700/50 border border-violet-500/20 text-white font-medium rounded-xl transition-all flex items-center justify-center"
              >
                View Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-slate-900/70 border-t border-slate-700/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <Link href="/" className="inline-block mb-6">
                <h3 className="text-2xl font-bold text-white">StudySync</h3>
              </Link>
              <p className="text-violet-200/60 mb-6">
                Transforming how students learn with AI-powered study tools.
              </p>
              <div className="flex space-x-4">
                <SocialIcon href="#" icon="twitter" />
                <SocialIcon href="#" icon="github" />
                <SocialIcon href="#" icon="linkedin" />
              </div>
            </div>

            <FooterLinkGroup
              title="Product"
              links={[
                { name: "Features", href: "#" },
                { name: "Pricing", href: "#" },
                { name: "Demo", href: "#" },
                { name: "Roadmap", href: "#" },
              ]}
            />

            <FooterLinkGroup
              title="Resources"
              links={[
                { name: "Documentation", href: "#" },
                { name: "Tutorials", href: "#" },
                { name: "Blog", href: "#" },
                { name: "Support", href: "#" },
              ]}
            />

            <FooterLinkGroup
              title="Company"
              links={[
                { name: "About Us", href: "#" },
                { name: "Careers", href: "#" },
                { name: "Privacy", href: "#" },
                { name: "Terms", href: "#" },
              ]}
            />
          </div>

          <div className="mt-16 pt-8 border-t border-slate-800 text-center text-violet-200/40 text-sm">
            <p>&copy; {new Date().getFullYear()} StudySync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-slate-800/40 backdrop-blur-sm border border-violet-500/20 p-8 rounded-2xl hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 group hover:bg-slate-800/60">
      <div className="p-4 rounded-xl bg-gradient-to-br from-violet-600/50 to-indigo-700/50 w-fit mb-6 group-hover:from-violet-500/50 group-hover:to-indigo-600/50 transition-all">
        <div className="text-violet-100">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-violet-200/70 leading-relaxed">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }: StepCardProps) {
  return (
    <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 p-8 rounded-2xl relative hover:border-violet-500/30 transition-all group">
      <div className="text-4xl font-bold text-violet-500/20 mb-6 group-hover:text-violet-500/30 transition-all">{number}</div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-violet-200/70 leading-relaxed">{description}</p>

      <div className="absolute top-6 right-6 w-10 h-10 rounded-full border border-violet-500/20 flex items-center justify-center">
        <div className="w-6 h-6 rounded-full bg-violet-500/20 group-hover:bg-violet-500/30 transition-all"></div>
      </div>
    </div>
  );
}

function TestimonialCard({ quote, author, title, rating }: TestimonialCardProps) {
  return (
    <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 p-8 rounded-2xl hover:border-violet-500/20 transition-all">
      <div className="flex mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
        ))}
      </div>
      <p className="text-violet-100 leading-relaxed mb-6 italic">&ldquo;{quote}&rdquo;</p>
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-violet-500/20 mr-3"></div>
        <div>
          <p className="font-semibold text-white">{author}</p>
          <p className="text-sm text-violet-200/60">{title}</p>
        </div>
      </div>
    </div>
  );
}

function SocialIcon({ href, icon }: SocialIconProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-violet-900/50 transition-all border border-slate-700/50"
    >
      <span className="text-violet-200">{icon}</span>
    </a>
  );
}

function FooterLinkGroup({ title, links }: FooterLinkGroupProps) {
  return (
    <div>
      <h4 className="font-semibold text-white mb-4">{title}</h4>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.name}>
            <Link href={link.href} className="text-violet-200/60 hover:text-violet-300 transition-colors">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}