import {PieChart, Pie, Legend, Cell} from 'recharts'

const VaccinationByAge = props => {
  const {data} = props

  return (
    <div className="graph-container">
      <h1 className="graph-heading">Vaccination by age</h1>
      <PieChart data={data} margin={{top: 15}} width={1000} height={400}>
        <Pie
          cx="50%"
          cy="50%"
          data={data}
          startAngle={0}
          endAngle={360}
          dataKey="count"
        >
          <Cell name="18-44" fill="#2d87bb" />
          <Cell name="45-60" fill="#a3df9f" />
          <Cell name="Above 60" fill="#64c2a6" />
        </Pie>
        <Legend iconType="circle" />
      </PieChart>
    </div>
  )
}

export default VaccinationByAge
