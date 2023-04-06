# Plausible mock server

This mock server implements (part of) the Plausible API required to test the
Plausible app. Only the bare minimal functionality required to execute the e2e
tests is implemented in this server. There is no error handling whatsoever, so
development should always be done against a real Plausible server.

Currently, the following endpoints are supported:

- `/api/v1/stats/aggregate`
- `/api/v1/stats/breakdown`
- `/api/v1/stats/realtime/visitors`
- `/api/v1/stats/timeseries` _(With period=30d)_

- `/login`
- `/sites`
