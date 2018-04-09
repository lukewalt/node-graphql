async function feed(root, args, context, info) {
  const where = args.filter
  ? {
    OR: [
      { url_contains: args.filter },
      { description_contains: args.filter },
    ],
  }
  : {};

  const queriedLinks = await context.db.query.links(
    { where, skip: args.skip, first: args.first, orderBy: args.orderBy },
    `{ id }`,
  )

  const countSelectionSet = `
    {
      aggregate {
        count
      }
    }
  `

  const linkConnection = await context.db.query.linksConnection({}, countSelectionSet)

  return {
    count: linkConnection.aggregate.count,
    linkIds: queriedLinks.map(link => link.id),
  }

}

function users(root, args, context, info) {
  return context.db.query.users({}, info)
}

module.exports = {
  feed,
  users
}
