export interface UserSimulation {
  id: number
  name: string
  model_name: string
  json_data: string // type JSONValue disabled because of infinite loop
  params: {}
}

export interface Simulation {
  user: string
  timestamp: Date
  simulation_name: string
  model_name: string
  params: {}
  components: {
    Real_Name: string
    Py_Name: string
    Subscripts: any
    Units: string
    Limits: [number, number]
    Type: string
    Subtype: string
    Comment: string
    student_control: boolean
    _value: number
  }[]
  start_time: number
  end_time: number | undefined
}
