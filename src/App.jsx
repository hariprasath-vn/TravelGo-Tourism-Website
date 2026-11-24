import { useEffect, useState } from 'react'
import './App.css'
import Booking from './Booking'

function App() {
  const [destinations, setDestinations] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [selectedDestination, setSelectedDestination] = useState(null)
  const [category, setCategory] = useState('All')

  useEffect(() => {
    fetch('http://localhost:8081/api/destinations')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch destinations')
        return res.json()
      })
      .then(data => setDestinations(data))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show')
          }
        })
      },
      { threshold: 0.15 }
    )

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [destinations])

const filteredDestinations = destinations.filter(destination => {
  const matchesSearch =
    destination.name?.toLowerCase().includes(search.toLowerCase()) ||
    destination.location?.toLowerCase().includes(search.toLowerCase())

  const matchesCategory =
  category === 'All' ||
  destination.category?.trim().toLowerCase() === category.trim().toLowerCase()

  return matchesSearch && matchesCategory
})

  const reviews = [
    {
      name: 'Arun Kumar',
      place: 'Chennai',
      text: 'Amazing travel experience! The destinations were beautiful and the service was excellent.',
      rating: '★★★★★'
    },
    {
      name: 'Priya Sharma',
      place: 'Bangalore',
      text: 'TravelGo made our holiday memorable. Everything was well organized.',
      rating: '★★★★★'
    },
    {
      name: 'Rahul Raj',
      place: 'Coimbatore',
      text: 'Beautiful places, affordable prices and a wonderful experience!',
      rating: '★★★★★'
    }
  ]

  return (
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">
        <a href="#home" className="logo">Pola<span>Ma.</span></a>

        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#destinations">Destinations</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#reviews">Reviews</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <a href="#destinations" className="nav-btn">Explore Now ↗</a>
      </nav>

      {/* Hero */}
      <section className="hero" id="home">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <p className="hero-tag">✈ EXPLORE THE WORLD</p>

          <h1>
            Discover Your Next
            <span> Adventure.</span>
          </h1>

          <p className="hero-description">
            Explore beautiful destinations, experience new cultures
            and create unforgettable memories with PolaMa.
          </p>

          <div className="search-box">
            <span>📍</span>
            <input
              type="text"
              placeholder="Where do you want to go?"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button onClick={() =>
              document.getElementById('destinations').scrollIntoView({
                behavior: 'smooth'
              })
            }>
              Search →
            </button>
          </div>

          <div className="hero-stats">
            <div><h3>500+</h3><p>Destinations</p></div>
            <div><h3>10K+</h3><p>Happy Travelers</p></div>
            <div><h3>4.9★</h3><p>Customer Rating</p></div>
          </div>
        </div>

        <div className="hero-floating-card">
          <span>🌍</span>
          <div>
            <h4>Explore the world</h4>
            <p>Your journey starts here</p>
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="destinations" id="destinations">
        <div className="section-heading reveal">
          <p className="section-tag">DISCOVER PLACES</p>
          <h2>Popular Destinations</h2>
          <p>Find your perfect destination and start your journey.</p>
        </div>

        {loading && <p className="status">Loading destinations...</p>}

        {!loading && filteredDestinations.length === 0 && (
          <p className="status">No destinations found. Add destinations using Postman.</p>
        )}

        <div className="category-filter">
  {['All', 'Hill Station', 'Beach', 'Nature', 'Historical'].map(item => (
    <button
      key={item}
      className={category === item ? 'active' : ''}
      onClick={() => setCategory(item)}
    >
      {item}
    </button>
  ))}
</div>

        <div className="cards">
          {filteredDestinations.map(destination => (
            <div className="card reveal" key={destination.id}>
              <div className="card-image">
                <img
                  src={destination.imageUrl}
                  alt={destination.name}
                />
                <span className="image-label">POPULAR PLACE</span>
              </div>

              <div className="card-content">
                <p className="location">📍 {destination.location}</p>
                <h3>{destination.name}</h3>
                <p className="card-description">{destination.description}</p>

                <div className="card-bottom">
                  <div>
                    <small>Starting from</small>
                    <h3>₹{destination.price}</h3>
                  </div>
                  <button onClick={() => setSelectedDestination(destination)}>
                       Book Now ↗
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="features reveal">
        <div className="section-heading">
          <p className="section-tag">WHY CHOOSE US</p>
          <h2>Travel With Confidence</h2>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <span>🌍</span>
            <h3>Best Destinations</h3>
            <p>Discover amazing destinations around the world.</p>
          </div>

          <div className="feature-card">
            <span>💰</span>
            <h3>Affordable Prices</h3>
            <p>Enjoy memorable trips at budget-friendly prices.</p>
          </div>

          <div className="feature-card">
            <span>🛡️</span>
            <h3>Safe Travel</h3>
            <p>Travel confidently with a comfortable experience.</p>
          </div>

          <div className="feature-card">
            <span>🎧</span>
            <h3>24/7 Support</h3>
            <p>We're here to help you throughout your journey.</p>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="about reveal" id="about">
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900"
            alt="Mountain travel"
          />
        </div>

        <div className="about-content">
          <p className="section-tag">ABOUT TRAVELGO</p>
          <h2>Travel More.<br /><span>Worry Less.</span></h2>
          <p>
            TravelGo helps you discover amazing places, explore
            beautiful destinations and make every journey memorable.
            Your dream vacation is just one step away.
          </p>
          <a href="#destinations" className="about-btn">Discover More ↗</a>
        </div>
      </section>

      {/* Reviews */}
      <section className="reviews" id="reviews">
        <div className="section-heading reveal">
          <p className="section-tag">TESTIMONIALS</p>
          <h2>What Travelers Say</h2>
          <p>Real experiences from people who explored with us.</p>
        </div>

        <div className="review-grid">
          {reviews.map((review, index) => (
            <div className="review-card reveal" key={index}>
              <div className="stars">{review.rating}</div>
              <p>"{review.text}"</p>
              <h3>{review.name}</h3>
              <small>{review.place}</small>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta reveal">
        <p>YOUR NEXT ADVENTURE AWAITS</p>
        <h2>Ready To Explore The World?</h2>
        <a href="#destinations">Start Your Journey ↗</a>
      </section>

      {/* Footer */}
      <footer id="contact">
        <div className="footer-content">
          <div>
            <h2 className="footer-logo">Pola<span>Ma.</span></h2>
            <p>Discover the world. Create memories.<br />Travel without limits.</p>
          </div>

          <div>
            <h3>Quick Links</h3>
            <a href="#home">Home</a>
            <a href="#destinations">Destinations</a>
            <a href="#about">About Us</a>
            <a href="#reviews">Reviews</a>
          </div>

          <div>
            <h3>Contact</h3>
            <p>📧 support@PolaMa.com</p>
            <p>📍 India</p>
            <p>☎ +91 98765 43210</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 PolaMa. All Rights Reserved.</p>
          <p>Made with ❤️ for Travelers</p>
        </div>
      </footer>
      {selectedDestination && (
       <Booking
    destination={selectedDestination}
    onClose={() => setSelectedDestination(null)}
  />
     )}
    </div>
  )
}

export default App