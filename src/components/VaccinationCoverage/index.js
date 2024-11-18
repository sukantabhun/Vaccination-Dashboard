import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'
import './index.css'

const VaccinationCoverage = ({data}) => {
  const DataFormatter = number => {
    if (number === 0) {
      return `0`
    }
    return `${number.toString()}000k`
  }

  return (
    <div className="graph-container">
      <h1 className="graph-heading">Vaccination Coverage</h1>
      <BarChart data={data} margin={{top: 15}} width={1000} height={400}>
        <XAxis dataKey="vaccineDate" />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{stroke: 'gray', strokeWidth: 0}}
        />
        <Legend wrapperStyle={{padding: 30}} />
        <Bar dataKey="dose_1" name="Dose 1" fill="#1f77b4" barSize={40} />
        <Bar dataKey="dose_2" name="Dose 2" fill="#f54394" barSize={40} />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
