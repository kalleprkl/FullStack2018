const anecdoteReducer = (store = [], action) => {
  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !==action.anecdote.id)
    
    return [...old, action.anecdote ]
  }
  if (action.type === 'CREATE') {

    return [...store, action.content ]
  }
  if (action.type === 'INIT') {
    return action.data
  }

  return store
}

export const anecdoteInitialization = (data) => {
  return {
    type: 'INIT',
    data
  }
}

export const anecdoteCreation = (content) => {
  return {
    type: 'CREATE',
    content
  }
}

export const anecdoteVote = (anecdote) => {
  return {
    type: 'VOTE',
    anecdote
  }
}

export default anecdoteReducer