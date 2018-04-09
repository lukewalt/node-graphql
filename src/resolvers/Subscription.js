// --- LINK SUB ---
function newLinkSubscribe (root, args, context, info) {
  return context.db.subscription.link(
    { },
    info,
  )
}

const newLink = {
  subscribe: newLinkSubscribe
}

// --- VOTE SUB ---
function newVoteSubscribe (root, args, context, info){
  return context.db.subscription.vote(
    { },
    info,
  )
}

const newVote = {
  subscribe: newVoteSubscribe
}

module.exports = {
  newLink,
  newVote,
}
