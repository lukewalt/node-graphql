function feed(root, args, context, info) {
  return context.db.query.links({}, info)
}

function users(root, args, context, info) {
  return context.db.query.users({}, info)
}

module.exports = {
  feed,
  users
}
