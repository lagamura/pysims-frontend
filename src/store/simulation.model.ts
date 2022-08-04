export interface UserSimulation {
  id: number
  name: string
  model_name: string
  json_data: string // type JSONValue disabled because of infinite loop
  namespace: string[]
  params: {
  }
}

export interface Simulation {
  user: string
  timestamp: Date
  simulation_name: string
  model_name: string
  params: {
  }
}
