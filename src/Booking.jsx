import { useState } from 'react'

function Booking({ destination, onClose }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [travelDate, setTravelDate] = useState('')
  const [travelers, setTravelers] = useState(1)

  const totalPrice = destination.price * travelers

  const handleBooking = (e) => {
    e.preventDefault()

    alert(`Booking successful!\nDestination: ${destination.name}\nTravelers: ${travelers}\nTotal: ₹${totalPrice}`)

    onClose()
  }

  return (
    <div className="booking-overlay">
      <div className="booking-modal">

        <button className="booking-close" onClick={onClose}>
          ✕
        </button>

        <p className="section-tag">PLAN YOUR TRIP</p>

        <h2>Book Your Journey</h2>

        <p className="booking-place">
          📍 {destination.name}, {destination.location}
        </p>

        <form onSubmit={handleBooking}>

          <label>Your Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Travel Date</label>
          <input
            type="date"
            min={new Date().toISOString().split('T')[0]}
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            required
          />

          <label>Number of Travelers</label>
          <input
            type="number"
            min="1"
            max="20"
            value={travelers}
            onChange={(e) => setTravelers(Number(e.target.value))}
            required
          />

          <div className="booking-total">
            <span>Total Amount</span>
            <h3>₹{totalPrice}</h3>
          </div>

          <button type="submit" className="booking-submit">
            Confirm Booking →
          </button>

        </form>
      </div>
    </div>
  )
}

export default Booking