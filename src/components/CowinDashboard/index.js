import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const CowinDashboard = () => {
  const [isLoading, setLoading] = useState(false)
  const [vaccinationData, setVaccinationData] = useState(null)
  const [error, setError] = useState(false)

  const fetchApiUrl = async () => {
    setLoading(true)
    const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    try {
      const response = await fetch(apiUrl)
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const data = await response.json()
      console.log(data)
      const convertKeysToCamelCase = obj => {
        if (Array.isArray(obj)) {
          return obj.map(item => convertKeysToCamelCase(item))
        }
        if (obj !== null && typeof obj === 'object') {
          return Object.keys(obj).reduce((acc, key) => {
            const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) =>
              letter.toUpperCase(),
            )
            return {...acc, [camelCaseKey]: convertKeysToCamelCase(obj[key])}
          }, {})
        }
        return obj
      }

      setVaccinationData(convertKeysToCamelCase(data))
      setError(false)
    } catch (e) {
      setError(true)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchApiUrl()
  }, [])

  const renderContent = () => {
    if (isLoading) {
      return (
        <div data-testid="loader" className="content-center">
          <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
        </div>
      )
    }
    if (error) {
      return (
        <div className="content-center">
          <img
            src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
            alt="failure view"
            className="error-image"
          />
          <h1>Something went wrong</h1>
        </div>
      )
    }
    if (vaccinationData) {
      console.log(vaccinationData)
      return (
        <div className="content-center">
          <VaccinationCoverage data={vaccinationData.last_7DaysVaccination} />
          <VaccinationByGender data={vaccinationData.vaccinationByGender} />
          <VaccinationByAge data={vaccinationData.vaccinationByAge} />
        </div>
      )
    }
    return null
  }

  return (
    <div className="main-container">
      <div className="internal-container">
        <div className="heading-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="logo"
          />
          <h1>Co-Win</h1>
        </div>
        <h1>CoWIN Vaccination in India</h1>
        {renderContent()}
      </div>
    </div>
  )
}

export default CowinDashboard
