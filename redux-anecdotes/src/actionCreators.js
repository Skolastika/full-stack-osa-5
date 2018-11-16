const getId = () => (100000*Math.random()).toFixed(0)

const actionFor = {
  voting(id) {
    return {
      type: 'VOTE',
      data: { id }
    }
  },
  creating(content) {
    return {
      type: 'CREATE',
      data: {
        content,
        id: getId(),
        votes: 0
      }
    }
  }
}

export default actionFor