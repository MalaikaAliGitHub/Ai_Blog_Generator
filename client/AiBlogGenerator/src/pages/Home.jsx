import { useState, useEffect } from "react";

export default function Home({ setPage }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="home-page">
      {/* Navigation */}
    
      <nav className={`landing-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          <div className="nav-brand">
            <div className="brand-logo">✨</div>
            <h1>AI Blogs</h1>
          </div>
          <div className="nav-actions flex gap-3">
            <button onClick={() => setPage("login")} className="btn btn-outline">
              Sign In
            </button>
            <button onClick={() => setPage("signup")} className="btn btn-primary">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text space-y-8">
            <h1 className="hero-title">Create Amazing Blog Posts with AI</h1>
            <p className="hero-subtitle">
              Generate high-quality, engaging blog content in seconds. Perfect for content creators, businesses, and writers who want to save time and scale their output.
            </p>
            <div className="hero-buttons flex flex-wrap gap-4">
              <button onClick={() => setPage("signup")} className="btn btn-primary btn-lg">
                Start Creating Free
              </button>
              <button onClick={() => setPage("login")} className="btn btn-outline btn-lg">
                Sign In to Dashboard
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-graphic">
              <div className="floating-card card-1">
                <div className="card-icon">📝</div>
                <p>AI-Powered Writing</p>
              </div>
              <div className="floating-card card-2">
                <div className="card-icon">⚡</div>
                <p>Lightning Fast</p>
              </div>
              <div className="floating-card card-3">
                <div className="card-icon">🎨</div>
                <p>Beautiful Design</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <h2 className="section-title">Why Choose AI Blogs?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚙️</div>
            <h3>Smart Generation</h3>
            <p>Our advanced AI engine creates unique, SEO-friendly blog posts tailored to your topic in seconds.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Save Time</h3>
            <p>Reduce hours of writing to just minutes. Perfect for busy entrepreneurs and content teams.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>High Quality</h3>
            <p>Generate engaging, professional-grade content that resonates with your audience.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💾</div>
            <h3>Organize & Edit</h3>
            <p>Store all your blogs in one place. Edit, update, or delete anytime you want.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Private</h3>
            <p>Your content is 100% private and secure. Only you can access your blogs.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌟</div>
            <h3>Easy to Use</h3>
            <p>Intuitive interface makes it simple for anyone to create professional blogs.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how" className="how-it-works-section">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Sign Up</h3>
            <p>Create your free account in seconds</p>
          </div>
          <div className="step-divider"></div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Enter Your Topic</h3>
            <p>Tell us what you want to write about</p>
          </div>
          <div className="step-divider"></div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Generate Content</h3>
            <p>AI creates your blog post instantly</p>
          </div>
          <div className="step-divider"></div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Publish & Share</h3>
            <p>Edit and save your amazing blogs</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stat-item">
          <h3>50K+</h3>
          <p>Active Users</p>
        </div>
        <div className="stat-item">
          <h3>1M+</h3>
          <p>Blogs Generated</p>
        </div>
        <div className="stat-item">
          <h3>4.8★</h3>
          <p>User Rating</p>
        </div>
        <div className="stat-item">
          <h3>99.9%</h3>
          <p>Uptime</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Start Creating?</h2>
        <p>Join thousands of content creators using AI Blogs today</p>
        <button onClick={() => setPage("signup")} className="btn btn-primary btn-lg">
          Get Started Free
        </button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>AI Blogs</h4>
            <p>Create amazing blog content with AI power</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#how">How It Works</a></li>
              <li><a href="#pricing">Pricing</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 AI Blogs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
