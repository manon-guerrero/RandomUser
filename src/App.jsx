import { useState, useEffect, useCallback } from 'react'
import './App.css'

// Fallback sample data when API is down
const sampleEmployees = [
  {
    name: {
      first: "John",
      last: "Doe"
    },
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    location: {
      city: "New York",
      country: "United States"
    },
    picture: {
      large: "https://via.placeholder.com/150?text=John"
    }
  },
  {
    name: {
      first: "Jane",
      last: "Smith"
    },
    email: "jane.smith@example.com",
    phone: "(555) 987-6543",
    location: {
      city: "London",
      country: "United Kingdom"
    },
    picture: {
      large: "https://via.placeholder.com/150?text=Jane"
    }
  },
  {
    name: {
      first: "Michael",
      last: "Johnson"
    },
    email: "michael.johnson@example.com",
    phone: "(555) 246-8135",
    location: {
      city: "Sydney",
      country: "Australia"
    },
    picture: {
      large: "https://via.placeholder.com/150?text=Michael"
    }
  },
  {
    name: {
      first: "Emily",
      last: "Williams"
    },
    email: "emily.williams@example.com",
    phone: "(555) 369-1472",
    location: {
      city: "Toronto",
      country: "Canada"
    },
    picture: {
      large: "https://via.placeholder.com/150?text=Emily"
    }
  }
]

// City and country pairs for JSONPlaceholder API
const locations = [
  { city: "New York", country: "USA" },
  { city: "London", country: "UK" },
  { city: "Paris", country: "France" },
  { city: "Tokyo", country: "Japan" },
  { city: "Sydney", country: "Australia" },
  { city: "Berlin", country: "Germany" },
  { city: "Toronto", country: "Canada" },
  { city: "Mumbai", country: "India" },
  { city: "São Paulo", country: "Brazil" },
  { city: "Cape Town", country: "South Africa" }
]

function App() {
  const [employee, setEmployee] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [usingSampleData, setUsingSampleData] = useState(false)

  const getRandomSampleEmployee = () => {
    const randomIndex = Math.floor(Math.random() * sampleEmployees.length)
    return sampleEmployees[randomIndex]
  }

  const getRandomLocation = () => {
    const randomIndex = Math.floor(Math.random() * locations.length)
    return locations[randomIndex]
  }

  const fetchEmployee = useCallback(async () => {
    setLoading(true)
    setUsingSampleData(false)
    
    try {
      // Using JSONPlaceholder API for users
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      
      if (!response.ok) {
        throw new Error('Failed to fetch employee data')
      }
      
      const users = await response.json()
      
      // Get a random user from the response
      const randomIndex = Math.floor(Math.random() * users.length)
      const user = users[randomIndex]
      
      // Format the data to match our application's structure
      const randomLocation = getRandomLocation()
      const formattedEmployee = {
        name: {
          first: user.name.split(' ')[0],
          last: user.name.split(' ')[1] || user.name.split(' ')[0]
        },
        email: user.email,
        phone: user.phone,
        location: {
          city: randomLocation.city,
          country: randomLocation.country
        },
        picture: {
          large: `https://avatars.dicebear.com/api/initials/${user.name.split(' ')[0]}.svg`
        }
      }
      
      setEmployee(formattedEmployee)
      setError(null)
    } catch (err) {
      console.error("API Error:", err.message)
      setError("JSONPlaceholder API is unavailable. Using local sample data instead.")
      setEmployee(getRandomSampleEmployee())
      setUsingSampleData(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchEmployee()
  }, [fetchEmployee])

  return (
    <div className="container">
      <h1>Employee Profile</h1>
      
      {loading && <p>Loading...</p>}
      
      {error && <p className="error">{error}</p>}
      
      {employee && !loading && (
        <div className="employee-card">
          <img 
            src={employee.picture.large} 
            alt={`${employee.name.first} ${employee.name.last}`} 
            className="employee-image"
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop
              e.target.src = `https://via.placeholder.com/150?text=${employee.name.first}`;
            }}
          />
          <h2>{employee.name.first} {employee.name.last}</h2>
          <p>Email: {employee.email}</p>
          <p>Phone: {employee.phone}</p>
          <p>Location: {employee.location.city}, {employee.location.country}</p>
          {usingSampleData && (
            <p className="sample-data-notice">Note: Using sample data due to API unavailability</p>
          )}
        </div>
      )}

      <button onClick={fetchEmployee} disabled={loading}>
        {loading ? 'Loading...' : 'Get New Employee'}
      </button>
    </div>
  )
}

export default App
