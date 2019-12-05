# lecturebot


## Diagnostics & Operators Notes

Get debug logs via the `debug` package.

For example, you can set env vars like:

```sh
# For all app messaging (VERY verbose)
DEBUG=lecturebot*
# Only include namespaces with `user` and `app`
DEBUG=lecturebot:user*,lecturebot:app* 
```
