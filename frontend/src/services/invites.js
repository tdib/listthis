import api from '.'

export const createInviteLink = async ({ inviteID, listID, expiry }) => {
  const { data } = await api.post(`/invite/${listID}`, { inviteID, expiry })
  return data
}

export const getListByInviteID = async inviteID => {
  const { data } = await api.get(`/invite/join/${inviteID}`)
  return data
}
