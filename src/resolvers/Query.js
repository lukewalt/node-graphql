async function feed(parent, args, context, info) {
  const { filter, first, skip } = args // destructure input arguments
  const where = filter
    ? { OR: [{ url_contains: filter }, { description_contains: filter }] }
    : {}

  const allLinks = await context.db.query.links({})
  const count = allLinks.length

  const queriedLinkes = await context.db.query.links({ where, skip, first })

  return {
    linkIds: queriedLinkes.map(link => link.id),
    count
  }
}

module.exports = {
  feed,
}
