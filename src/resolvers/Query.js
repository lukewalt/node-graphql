function feed(root, args, context, info) {
  const where = args.filter
  ? {
    OR: [
      { url_contains: args.filter },
      { description_contains: args.filter },
    ],
  }
  : {}

  return context.db.query.links({ where }, info)
}

function users(root, args, context, info) {
  return context.db.query.users({}, info)
}

module.exports = {
  feed,
  users
}
