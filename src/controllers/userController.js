const profile = (req, res) => {
  const { id, username, email } = req.user
  return res.status(200).json({ id, username, email })
}

module.exports = {
  profile,
}
