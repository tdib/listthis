import api from '.'

export const getGoogleClientID = async () => {
  const { data } = await api.get('/google/clientid').then(x => x.data)
  // console.log(GOOGLE_CLIENT_ID)
  return data
}
