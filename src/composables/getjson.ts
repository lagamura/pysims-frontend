export async function useGetJsonData(id: number): Promise<string> {
  const url = 'http://127.0.0.1:8000/get_simul_res_json/' + id

  const response = await fetch(url)
  console.log(response)

  if (response.ok) {
    const data: string = await response.json()
    // const data_string = JSON.stringify(data)
    const data_obj = JSON.parse(data)
    // console.log(`data in data_string is: ${data_string}`)
    console.log(`data in data_obj is: ${data_obj}`)

    return data_obj
  } else {
    return Promise.reject(
      new Error(
        `Something went wrong with fetching json data - maybe there is no simulation with id: "${id}"}`
      )
    )
  }
}

async function postSim() {
  fetch('https://example.com/profile', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data)
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}
