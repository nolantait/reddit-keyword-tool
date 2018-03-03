# Reddit Keyword Grabber

This is the Reddit keyword grabbing tool.

Getting comments or keywords over N days was removed by the Reddit Web API so
this tool is focused on letting you choose the threads or subreddits and then
submitting it to the API to retrieve the most used keywords in the following
format:

```json
[
  {"value": "dog", "count": 4}
]
```

## Using the API

```bash
npm start
```

Which will allow you to open your web browser to localhost:3000 and see the
listed endpoints.

## Running Tests

```bash
npm test
```

Running tests will take a longer time as they are hitting live servers.
Ideally I would like to record these, but after going through a couple of
HTTP recorders that were not very nice, I would save this for a further
iteration.

## Assumptions

My assumptions in building this API were that:

- Usage would be low, non mission critical, can evolve over time to meet demand
- Users prioritized atomic usage so users can choose between extracting keywords
  from threads or from subreddits and choose how to consume that within their
app.

