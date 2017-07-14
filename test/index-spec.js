import test from 'ava'
import SpotifyWebHelper from '../index'

let spotify

test.beforeEach(() => {
  spotify = new SpotifyWebHelper()
})

test('generateSpotifyUrl works as expected', t => {
  let url = '/some/url/to/test.filetype'
  let generatedUrl = spotify.generateSpotifyUrl(url)
  // NOTE: This is a rough regex, we may want to check ports more precisely
  t.regex(generatedUrl, /^(http(s)?:\/\/)(127\.0\.0\.1)(:)([0-9]{1,5})(\/[A-z0-9]+)+(\.[A-z0-9]+)+$/g, 'Not a valid url')
  t.true(generatedUrl.endsWith(url), 'Generated url doesn\'t match')
})
