import test from 'ava'
import SpotifyWebHelper from '../index'

let spotify

test.beforeEach(() => {
  spotify = new SpotifyWebHelper()
})

test('ensureSpotifyWebHelper works as expected', async t => {
  let promise = spotify.ensureSpotifyWebHelper()
  t.true(promise instanceof Promise, 'Doesn\'t return a promise')

  let response = await promise
  t.true(typeof response === 'boolean', 'Doesn\'t resolve a boolean')
})

test('generateSpotifyUrl works as expected', t => {
  let urlPath = '/some/url/to/test.filetype'
  let generatedUrl = spotify.generateSpotifyUrl(urlPath)
  let port = (/:(\d+)(\/)?/gi).exec(generatedUrl)[1]

  t.regex(generatedUrl, /^(http(s)?:\/\/)(127\.0\.0\.1)(:)([0-9]{1,5})(\/[A-z0-9]+)+(\.[A-z0-9]+)+$/g, 'Not a valid url')
  t.true(port >= 1 && port <= 65535, 'Not a valid port')
  t.true(port >= 4370 && port <= 4389, 'Not a valid Spotify port')
  t.true(generatedUrl.endsWith(urlPath), 'Generated url doesn\'t match')
})
