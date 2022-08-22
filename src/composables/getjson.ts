import { createFetch } from '@vueuse/core'
import { ElMessage } from 'element-plus'

// used by the store init to fetch the user's simulation
export async function useInitState() {
  const url_endopoint = '/get_simuls'
  const { data, onFetchResponse, onFetchError } = await useMyFetch(url_endopoint).get().json()
  console.log(data.value)
  // model_doc.value = Object.values(data.value)
  // for (var obj of Object.values(data.value)){
  //   model_doc.push(obj)
  // }

  onFetchResponse((response) => {
    console.log(`data Fetched! ${response.status}`)
    //console.log(`data on Fetch Response ${model_doc.value}`)
  })

  onFetchError((error) => {
    console.log(error.message)
    console.error(error.message)
    ElMessage.error({
      message: 'Problem connecting to API',
      type: 'error'
    })
  })

  return data
}


function URL_() {
  if (import.meta.env.DEV) {
    return 'http://localhost:8000'
  } else {
    return 'https://pysims-github.herokuapp.com'
  }
}

const URL_BASIS: string = URL_()

export const useMyFetch = createFetch({
  baseUrl: URL_BASIS,
  options: {
    // async beforeFetch({ options }) {
    //   const myToken = await getMyToken()
    //   options.headers.Authorization = `Bearer ${myToken}`
    //   return { options }
    // }
  },
  fetchOptions: {
    mode: 'cors'
  }
})
