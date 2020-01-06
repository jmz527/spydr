## error_logs dir

##### setup
Create a JSON file in this repo named `error_log.json`, and inside that file save this code:

```
{
    "log": []
}
```

##### description
This directory is where we will save errors if and when they do occur.

All errors will be added to the beginning of the `log` within the `error_log.json` file. Each error will include a timestamp, the error message, the method used (get, post, patch, etc.), the endpoint it hit, and the config of axios (our http client) at the time.
