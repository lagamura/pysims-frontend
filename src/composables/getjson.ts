import { createFetch } from '@vueuse/core'
import { ElMessage } from 'element-plus'

// used by the store init to fetch the user's simulation
export async function useInitState() {
  const url_endopoint = '/get_simuls'
  const { data, onFetchResponse, onFetchError } = await useMyFetch(url_endopoint).get().json()

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

export const URL_BASIS: string = URL_()

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

export function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

export function formatDate(date: Date) {
  return (
    [date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join(
      '-'
    ) +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds())
    ].join(':')
  );
}
