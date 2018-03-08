import anecdoteService from './../services/anecdotes'

const anecdoteReducer = (store = [], action) => {
  if (action.type === 'VOTE') {
    const old = store.filter(a => a.id !== action.anecdote.id)
    return [...old, action.anecdote]
  }
  if (action.type === 'CREATE') {
    return [...store, action.anecdote]
  }
  if (action.type === 'INIT') {
    return action.data
  }

  return store
}

export const anecdoteInitialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export const anecdoteCreation = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.create(content)
    dispatch({
      type: 'CREATE',
      anecdote
    })
  }
}

export const anecdoteVote = (anecdote) => {
  return async (dispatch) => {
    const updated = await anecdoteService.update(anecdote)
    dispatch({
      type: 'VOTE',
      anecdote: updated
    })
  }
}

export default anecdoteReducer