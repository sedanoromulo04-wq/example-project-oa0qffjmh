const path = require('path')

const { handleHttpRequest } = require(
  path.join(
    __dirname,
    '..',
    'Antigravity Skill',
    'Antigravity skills',
    'torq-central',
    'backend',
    'src',
    'app',
  ),
)

module.exports = async (req, res) => {
  await handleHttpRequest(req, res)
}
