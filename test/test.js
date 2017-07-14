import test from 'ava'
import SpotifyWebHelper from '../index'

test.beforeEach(t => {
  t.context.spotify = new SpotifyWebHelper()
})

test('SpotifyWebHelper is an object', t => {
  let {spotify} = t.context
  t.plan(1)
  t.true(typeof spotify === 'object', 'Spotify is not an object')
})
