import React from 'react';
import './BlogSection.css';

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Top 10 Real Estate Investment Tips for 2024',
      excerpt: 'Discover the latest strategies for making smart real estate investments in today\'s market. From location analysis to financing options, we cover everything you need to know.',
      category: 'investment',
      author: 'Rajesh Kumar',
      date: '2024-01-15',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      featured: true
    },
    {
      id: 2,
      title: 'Sustainable Construction: Building for the Future',
      excerpt: 'Learn about eco-friendly construction practices and how green building technologies are shaping the future of residential and commercial development.',
      category: 'construction',
      author: 'Priya Sharma',
      date: '2024-01-10',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      featured: false
    },
    {
      id: 3,
      title: 'Gurugram Real Estate Market Analysis 2024',
      excerpt: 'An in-depth analysis of the Gurugram real estate market trends, price movements, and upcoming developments that are set to transform the region.',
      category: 'market',
      author: 'Amit Agarwal',
      date: '2024-01-08',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      featured: true
    },
    {
      id: 4,
      title: 'Smart Home Technologies in Modern Apartments',
      excerpt: 'Explore the latest smart home innovations being integrated into luxury apartments and how they enhance the living experience for residents.',
      category: 'technology',
      author: 'Neha Gupta',
      date: '2024-01-05',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      featured: false
    },
    {
      id: 5,
      title: 'Financing Your Dream Home: A Complete Guide',
      excerpt: 'Navigate the complex world of home financing with our comprehensive guide covering loans, EMIs, and financial planning strategies.',
      category: 'finance',
      author: 'Vikash Singh',
      date: '2024-01-03',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      featured: false
    },
    
  ];

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  const handleReadMore = (postId) => {
    console.log(`Reading post ${postId}`);
    // Add navigation to full blog post
  };

  return (
    <section className="blog-section">
      <div className="blog-container">
        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="featured-posts-section">
            <h3 className="section-title">Featured Blogs</h3>
            <div className="featured-posts-grid">
              {featuredPosts.map(post => (
                <article key={post.id} className="featured-post-card">
                  <div className="post-image">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="post-image-img"
                      loading="lazy"
                    />
                    <div className="featured-badge">Featured</div>
                  </div>
                  <div className="post-content">
                    <div className="post-meta">
                      <span className="post-category">{post.category}</span>
                      <span className="post-date">{new Date(post.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}</span>
                    </div>
                    <h4 className="post-title">{post.title}</h4>
                    <p className="post-excerpt">{post.excerpt}</p>
                    <div className="post-footer">
                      <div className="author-info">
                        <span className="author-name">By {post.author}</span>
                        <span className="read-time">{post.readTime}</span>
                      </div>
                      <button 
                        className="read-more-btn"
                        onClick={() => handleReadMore(post.id)}
                      >
                        Read More
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts */}
        <div className="regular-posts-section">
          <div className="posts-grid">
            {regularPosts.map(post => (
              <article key={post.id} className="post-card">
                <div className="post-image-small">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="post-image-small-img"
                    loading="lazy"
                  />
                </div>
                <div className="post-content-small">
                  <div className="post-meta-small">
                    <span className="post-category-small">{post.category}</span>
                    <span className="post-date-small">{new Date(post.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <h4 className="post-title-small">{post.title}</h4>
                  <p className="post-excerpt-small">{post.excerpt}</p>
                  <div className="post-footer-small">
                    <div className="author-info-small">
                      <span className="author-name-small">{post.author}</span>
                      <span className="read-time-small">{post.readTime}</span>
                    </div>
                    <button 
                      className="read-more-btn-small"
                      onClick={() => handleReadMore(post.id)}
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="blog-cta">
          <button className="view-all-btn">
            View All Articles
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
