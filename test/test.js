import test from 'ava'
import SpotifyWebHelper from '../index'

let spotify

test.beforeEach(() => {
  spotify = new SpotifyWebHelper()
})

test('SpotifyWebHelper is an object', t => {
  t.plan(1)
  t.true(typeof spotify === 'object', 'Spotify is not an object')
})
