import {PieChart, Pie, Legend, Cell} from 'recharts'

const VaccinationByGender = props => {
  const {data} = props

  return (
    <div className="graph-container">
      <h1 className="graph-heading">Vaccination by Gender</h1>
      <PieChart data={data} margin={{top: 15}} width={1000} height={400}>
        <Pie
          cx="50%"
          data={data}
          startAngle={180}
          endAngle={0}
          innerRadius="40%"
          dataKey="count"
        >
          <Cell name="Male" fill="#f54394" />
          <Cell name="Female" fill="#5a8dee" />
          <Cell name="Others" fill="#2cc6c6" />
        </Pie>
        <Legend iconType="circle" />
      </PieChart>
    </div>
  )
}

export default VaccinationByGender
