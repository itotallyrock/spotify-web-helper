import test from 'ava'
import sinon from 'sinon'
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

test('checkForError works as expected', t => {
  let testError = 'Testing Error'
  let loggedOutError = 'No user logged in'
  let workingStatus = {
    open_graph_state: {}
  }
  let loggedOutStatus = {}
  let errorStatus = {
    open_graph_state: {},
    error: new Error(testError)
  }

  let errorEmitted = sinon.spy()
  spotify.player.on('error', errorEmitted)

  t.is(spotify.checkForError(workingStatus), false)
  t.true(errorEmitted.notCalled)

  t.is(spotify.checkForError(loggedOutStatus), true)
  t.true(errorEmitted.calledOnce)
  t.is(errorEmitted.lastCall.args[0].message, loggedOutError)

  t.is(spotify.checkForError(errorStatus), true)
  t.true(errorEmitted.calledTwice)
  t.is(errorEmitted.lastCall.args[0].message, testError)
})
